# Codebase Context

> The complete architectural mental model for AI agents and developers. Covers the tech stack, data flow, state management, tricky edge cases, and non-obvious behaviors.

---

**⚠️ If an AI agent is asked to add a feature to this repository, read this file and the companion files ([system-rules.md](./system-rules.md), [architecture-map.md](./architecture-map.md)) first to ensure compliance with the established architecture.**

---

## Tech Stack Summary

| Layer | Technology | Version | Notes |
| ----- | ---------- | ------- | ----- |
| Runtime | Bun | ≥ 1.1 | Used as runtime, package manager, and dev server |
| Language | TypeScript | 5.x | Strict mode, ESM only, verbatim module syntax |
| Monorepo | Bun Workspaces | — | `"workspaces": ["packages/*"]` in root `package.json` |
| CLI Framework | OpenTUI | 0.3.x | Terminal UI renderer with React 19 bindings |
| CLI Routing | react-router | 7.x | In-memory router (no URL bar) |
| HTTP Framework | Hono | 4.x | Lightweight, type-safe web framework |
| AI SDK | Vercel AI SDK | 6.x | `streamText()`, tool definitions, provider adapters |
| ORM | Prisma | 7.x | With `@prisma/adapter-pg` driver adapter |
| Database | PostgreSQL | 15+ | Sessions + messages with JSON parts column |
| Validation | Zod | 4.x | Request validation, SSE event parsing, shared schemas |
| Observability | Sentry | 10.x | `@sentry/hono/bun` for server-side error tracking |

## Package Dependency Graph

```
@koda-arc/shared  ←──────────────────────────────────────┐
  (Zod, types, model registry)                            │
                                                          │
@koda-arc/database ←──────────────────┐                   │
  (Prisma client, enum re-exports)    │                   │
                                      │                   │
@koda-arc/server ─────────────────────┤───────────────────┤
  (Hono API, AI streaming, tools)     │                   │
                                      │                   │
@koda-arc/cli ────────────────────────┘───────────────────┘
  (React TUI, hooks, providers)       ↑ devDep for AppType only
```

---

## Data Flow Overview

### User submits a message → AI response

1. **CLI:** User types in `InputBar` on `Home` screen → navigates to `/sessions/new` with message in `location.state`
2. **CLI (`NewSession`):** Fires `POST /sessions` with `{ title, cwd: process.cwd(), initialMessage }` → gets back session object → navigates to `/sessions/:id`
3. **CLI (`Session`):** `useChats` hook detects last message is from user → auto-fires `POST /chat/:sessionId/resume`
4. **Server (`chat.ts`):** Loads session + messages → builds conversation history → constructs system prompt → resolves model → calls `streamText()` → iterates `fullStream` → emits SSE events
5. **CLI (`useChats`):** Parses SSE via `EventSourceParserStream` → accumulates `ClientMessagePart[]` → updates streaming state → React re-renders `BotMessage`
6. **Server:** On stream completion → persists assistant message to DB with `COMPLETE` status → emits `done` SSE event
7. **CLI:** On `done` → commits message to `messages` array → clears streaming state

### User interrupts (ESC key)

1. **CLI:** `useKeyboard` handler detects ESC during streaming → calls `interrupt()` → `stopActiveStream(true)`
2. **CLI:** `captureInterruptedMessage()` snapshots current parts → appends to messages with `interrupted: true`
3. **CLI:** `AbortController.abort()` cancels the fetch request
4. **Server:** SSE stream detects abort → `persistInterruptedMessage()` saves partial response with `INTERUPTED` status

---

## State Management Architecture (CLI)

Six React Context providers are composed in a fixed order in `RootLayout`:

```
ThemeProvider           → colors, currentTheme, setTheme, currentSpinner, setSpinner
  ToastProvider         → show({ message, variant?, duration? })
    KeyboardLayerProvider → push/pop/isTopLayer/setResponder (input focus stack)
      ClipboardProvider → copy/paste (delegates to system clipboard)
        DialogProvider  → open({ title, children }) / close()
          PromptConfigProvider → agentState, model, toggleAgentState, setModel
```

**Important:** The nesting order matters. Inner providers can access outer providers via hooks. For example, `PromptConfigProvider` could access `useTheme()` if needed, but `ThemeProvider` cannot access `usePromptConfig()`.

### KeyboardLayerProvider — Non-Obvious Behavior

The keyboard layer system is a stack-based input focus manager. When a dialog or command palette opens, it pushes a named layer. Keyboard events are only processed by the top layer. When ESC is pressed, the top layer's responder is called first; if it returns `true`, the layer handles the dismiss itself.

This prevents the ESC key from simultaneously dismissing a dialog AND interrupting an AI stream.

---

## Tricky Edge Cases

### 1. Session Resume Deduplication

The server maintains an in-memory `Set<string>` called `activeResumeSessionIds`. If a resume request arrives for a session that already has an active resume stream, it returns `409`. This prevents duplicate AI responses when:
- The client reconnects after a network blip
- The `useChats` auto-resume fires twice due to React strict mode

### 2. `useChats` Request ID Tracking

Each stream is assigned a `crypto.randomUUID()` request ID stored in `activeStreamRef`. Every callback (`emitParts`, `clearStream`, `handleStream`) checks `isActiveRequest(requestId)` before proceeding. This ensures that if the user submits a new message while a previous stream is still active, stale events from the old stream don't corrupt the new message's state.

### 3. Empty Assistant Messages

The `buildConversationHistory()` function filters out assistant messages with empty content. This is important because interrupted responses may be persisted with zero text parts (if the interrupt happened before any text was generated).

### 4. Tool Call Validation

The `editFile` tool requires `oldString` to appear **exactly once** in the target file. If it appears zero times or more than once, the tool returns an error. This is a safety mechanism to prevent accidental bulk replacements.

### 5. Prisma Client Singleton

The `db` export in `packages/database/src/client.ts` is a module-level singleton. It is instantiated once when the module is first imported. Both the server routes and any other consumers share the same Prisma client instance and connection pool.

### 6. `.env` File Resolution

The database client resolves the `.env` file using a relative path from its own location: `path.resolve(import.meta.dirname, "../../../.env")`. This means the `.env` must be at the monorepo root. If you move the database package or restructure the monorepo, this path will break.

### 7. Hono RPC Type Safety

The CLI imports `AppType` from `@koda-arc/server` purely for type-level inference. The `hc<AppType>()` call generates a fully typed API client at compile time. This means the server's route types and the CLI's API calls are always in sync — if you add a route parameter or change a response shape, the CLI will get a type error.

### 8. Model ID as String in Database

The `model` field on the `Message` table is a plain `string`, not an enum. This is intentional — it allows adding new models without a database migration. The validation happens at the API layer (Zod `.refine(isSupportedModel)`), not at the database layer.

### 9. `parts` Column is Nullable JSON

The `parts` column on `Message` is `Json?` in Prisma. Old messages or messages without structured parts will have `null`. The CLI handles this gracefully by checking `m.parts == null` before parsing.

### 10. Exit Animation Uses Raw ANSI

The exit animation in `utils/exitAnimation.ts` writes directly to `process.stdout` using raw ANSI escape codes (not React/OpenTUI). This runs after the OpenTUI renderer is destroyed. It uses truecolor (`38;2;r;g;b`) for gradient rendering, with a fallback to basic ANSI codes if hex-to-RGB parsing fails.

---

## Important Configuration Values

| Constant | Location | Value | Purpose |
| -------- | -------- | ----- | ------- |
| `MAX_OUTPUT` | `tools/bash.ts` | 20,000 chars | Truncation limit for bash command output |
| `DEFAULT_TIMEOUT` | `tools/bash.ts` | 30,000 ms | Default timeout for bash commands |
| `MAX_FILE_SIZE` | `tools/readFile.ts` | 10,000 chars | Truncation limit for file reads |
| `MAX_RESULTS` | `tools/glob.ts` | 200 files | Max glob results before truncation |
| `MAX_MATCHES` | `tools/grep.ts` | 50 matches | Max grep matches before truncation |
| `stepCountIs(50)` | `routes/chat.ts` | 50 steps | Max tool call steps per AI request |
| `idleTimeout` | `server/index.ts` | 255 seconds | Bun server idle timeout for long AI streams |
| `targetFps` | `cli/index.tsx` | 60 FPS | OpenTUI render target frame rate |
| `CONFIG_DIR` | `lib/preferences.ts` | `~/.koda-arc/` | User preference storage directory |

---

## What the System Prompt Tells the AI Agent

The system prompt (`packages/server/src/system-prompt.ts`) is assembled dynamically based on `cwd` and `agentState`. It establishes:

1. **Identity:** "You are Koda — a senior software engineer"
2. **Core behavioral rules:** Understand before acting, minimal changes, respect conventions, no filler
3. **Mode-specific instructions:** PLAN mode gets a 5-step structured response format; BUILD mode gets a verification workflow
4. **Tool documentation:** Available tools are listed with usage rules specific to the mode
5. **Safety rules:** Destructive command warnings, no `rm -rf` without confirmation

The system prompt is NOT stored in the database — it's regenerated for each request. This means changes to the system prompt affect all future requests without migration.

# Architecture

> System-level design of KodaArc — how the four packages connect, how data flows from user input to AI response, and why the architecture is shaped this way.

---

## High-Level Overview

KodaArc follows a **client-server monorepo** pattern. The CLI is a standalone terminal application that communicates with a local HTTP API server over `localhost:6969`. Both share type definitions and validation schemas through a common `shared` package, and both read from the same PostgreSQL database through the `database` package.

```
┌─────────────────────────────────────────────────────────────────┐
│                        User's Terminal                          │
│                                                                 │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │                    @koda-arc/cli                         │  │
│   │  React 19 + OpenTUI (TUI renderer @ 60 FPS)             │  │
│   │  ┌────────┐  ┌──────────┐  ┌────────────────────────┐   │  │
│   │  │Screens │  │  Hooks   │  │     Providers          │   │  │
│   │  │Home    │  │useChats  │  │Theme, Dialog, Toast,   │   │  │
│   │  │Session │  │useCmd    │  │Clipboard, Keyboard,    │   │  │
│   │  │NewSess.│  │useTheme  │  │PromptConfig            │   │  │
│   │  └────────┘  └──────────┘  └────────────────────────┘   │  │
│   │         │           │                                    │  │
│   │         └─────┬─────┘                                    │  │
│   │               │ Hono RPC Client (type-safe)              │  │
│   └───────────────┼──────────────────────────────────────────┘  │
│                   │ HTTP + SSE                                   │
│   ┌───────────────┼──────────────────────────────────────────┐  │
│   │               ▼                                          │  │
│   │                    @koda-arc/server                       │  │
│   │  Hono HTTP Framework (Bun runtime, port 6969)            │  │
│   │  ┌────────────┐  ┌──────────────┐  ┌────────────────┐   │  │
│   │  │  Routes    │  │   AI Core    │  │    Tools       │   │  │
│   │  │/sessions   │  │streamText()  │  │readFile, bash  │   │  │
│   │  │/chat/:id   │  │systemPrompt  │  │editFile, glob  │   │  │
│   │  │/chat/resume│  │modelResolver │  │grep, writeFile │   │  │
│   │  └────────────┘  └──────────────┘  │listDir, git    │   │  │
│   │                                     └────────────────┘   │  │
│   └───────────────┬──────────────────────────────────────────┘  │
│                   │ Prisma Client                                │
│   ┌───────────────┼──────────────────────────────────────────┐  │
│   │               ▼                                          │  │
│   │              @koda-arc/database                           │  │
│   │  Prisma 7 + @prisma/adapter-pg → PostgreSQL              │  │
│   │  ┌─────────┐  ┌───────────┐                             │  │
│   │  │ Session │◄─┤  Message  │                              │  │
│   │  └─────────┘  └───────────┘                             │  │
│   └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │              @koda-arc/shared                             │  │
│   │  Zod schemas, model registry, TypeScript types           │  │
│   │  (consumed by both cli and server)                       │  │
│   └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Package Dependency Graph

```
@koda-arc/cli
├── @koda-arc/shared      (model IDs, Zod schemas, stream event types)
├── @koda-arc/database     (enum re-exports: Role, AgentState, MessageStatus)
└── @koda-arc/server       (devDep — only for AppType type export via Hono RPC)

@koda-arc/server
├── @koda-arc/shared       (model registry, schema validation)
└── @koda-arc/database     (Prisma client for DB reads/writes, enum imports)

@koda-arc/database
└── (no workspace deps — leaf package)

@koda-arc/shared
└── (no workspace deps — leaf package)
```

The dependency graph is **acyclic**: `shared` and `database` are pure leaf packages, `server` depends on both leaves, and `cli` depends on all three (with `server` as a dev dependency only for its type export).

---

## Data Flow: User Prompt → AI Response

### 1. User Types a Message (CLI)

The user types in the `InputBar` component on the `Home` screen. On submit, React Router navigates to `/sessions/new` with the message text, agent state (`PLAN`/`BUILD`), and selected model ID in location state.

### 2. Session Creation (CLI → Server)

The `NewSession` screen fires a `POST /sessions` request via the Hono RPC client. The server validates the request with Zod, creates a `Session` row and an initial `Message` row in PostgreSQL, then returns the session object. The CLI navigates to `/sessions/:id` with the session data prefetched in location state.

### 3. Streaming AI Response (Server)

The `Session` screen's `useChats` hook detects that the last message is from the user (with no assistant reply) and auto-triggers a `POST /chat/:sessionId/resume` request.

The server's `chat.ts` route handler:

1. Loads the session and all messages from the database
2. Builds a conversation history array (filtering out `ERROR` messages and empty assistant messages)
3. Constructs the system prompt via `buildSystemPrompt()`, which assembles identity, rules, mode-specific instructions, and available tools based on the `AgentState`
4. Resolves the model ID to a concrete `LanguageModel` instance via `resolveChatModel()`, along with provider-specific options (e.g., Anthropic extended thinking, Google thinking config, OpenAI reasoning effort)
5. Calls `streamText()` from the Vercel AI SDK with the resolved model, system prompt, history, tools, and a step count limit of 50
6. Iterates the `fullStream` async generator, processing each part type:
   - `reasoning-delta` → Accumulates reasoning text, emits SSE event
   - `text-delta` → Accumulates response text, emits SSE event
   - `tool-call` → Records tool invocation with ID, name, and args, emits SSE event
   - `tool-result` → Attaches result to the matching tool call part, emits SSE event
   - `error` → Throws to trigger error handling
7. On completion, persists the assistant message (with full text, validated parts JSON, duration, and `COMPLETE` status) and emits a `done` SSE event
8. On abort/interrupt, persists with `INTERUPTED` status instead

### 4. Client-Side Stream Processing (CLI)

The `useChats` hook:

1. Opens the SSE response body as an `EventSourceParserStream`
2. Parses each SSE event with `ChatStreamEventSchema` (Zod discriminated union)
3. Accumulates `ClientMessagePart[]` (same as server parts, but with a `status` field on tool calls: `"calling"` → `"done"`)
4. Calls `emitParts()` on each update, which sets streaming state to trigger React re-renders
5. On `done` event, commits the full message to the messages array
6. On `error` event, appends an error message

### 5. Rendering (CLI)

The `Session` screen renders:

- All committed messages via `ChatMessage` (dispatches to `UserMessage`, `BotMessage`, or `ErrorMessage`)
- The active streaming parts via a second `BotMessage` with `streaming={true}`
- A bottom bar with `InputBar`, loading spinner, and interrupt instructions

---

## Tool Execution Model

Tools are created via factory functions (`createReadFileTool(cwd)`, etc.) that close over the working directory. Every tool enforces path sandboxing: resolved paths must start with `cwd` to prevent directory traversal.

The tool set is **mode-dependent**:

| Tool            | PLAN           | BUILD     |
| --------------- | -------------- | --------- |
| `readFile`      | ✅             | ✅        |
| `listDirectory` | ✅             | ✅        |
| `grep`          | ✅             | ✅        |
| `glob`          | ✅             | ✅        |
| `gitHelper`     | ✅ (read-only) | ✅ (full) |
| `writeFile`     | ❌             | ✅        |
| `editFile`      | ❌             | ✅        |
| `bash`          | ❌             | ✅        |

In `PLAN` mode, the `gitHelper` tool blocks mutating subcommands (`commit`, `branch` with a name) and returns an error message.

---

## State Management (CLI)

The CLI uses **React Context** for global state, organized into six providers composed in `RootLayout`:

```
ThemeProvider
  └── ToastProvider
       └── KeyboardLayerProvider
            └── ClipboardProvider
                 └── DialogProvider
                      └── PromptConfigProvider
                           └── ThemedRoot
                                └── <Outlet /> (screens)
```

| Provider                | Purpose                                         | Persistence             |
| ----------------------- | ----------------------------------------------- | ----------------------- |
| `ThemeProvider`         | Color theme + spinner selection                 | `~/.koda-arc/pref.json` |
| `ToastProvider`         | Transient toast notifications                   | In-memory only          |
| `KeyboardLayerProvider` | Keyboard input layer stack (for dialogs, menus) | In-memory only          |
| `ClipboardProvider`     | System clipboard read/write                     | N/A (delegates to OS)   |
| `DialogProvider`        | Modal dialog open/close state                   | In-memory only          |
| `PromptConfigProvider`  | Active agent state + selected model             | In-memory only          |

---

## Routing (CLI)

The CLI uses `react-router` with an in-memory router (no browser URL bar). Three routes:

| Path            | Screen       | Purpose                                                         |
| --------------- | ------------ | --------------------------------------------------------------- |
| `/`             | `Home`       | Landing page with ASCII header and input bar                    |
| `/sessions/new` | `NewSession` | Transient screen that creates a session via API, then redirects |
| `/sessions/:id` | `Session`    | Full chat interface with message history and streaming          |

Navigation uses `location.state` to pass prefetched data between routes, avoiding redundant API calls.

---

## Error Handling Strategy

- **Server:** Global `app.onError` handler distinguishes `HTTPException` (logged as warning, returned as structured JSON) from unhandled errors (logged via Sentry, returned as generic 500). AI stream errors are caught per-request and persisted as `ERROR` role messages.
- **CLI:** The `useChats` hook handles network failures, SSE parse errors, and abort signals. All errors surface as `ErrorMessage` components in the chat history. Non-streaming API errors (session fetch, session create) use toast notifications.
- **Database:** Missing `DATABASE_URL` throws at startup. Prisma client is a singleton instantiated once in `client.ts`.

---

## Observability

- **Sentry** is integrated in the server via `@sentry/hono/bun`. It wraps every request, logs structured events (session CRUD, validation failures, unhandled errors), and supports `tracesSampleRate: 1.0` for full trace coverage.
- Console logging is captured via `consoleLoggingIntegration` at `log`, `warn`, and `error` levels.

# @koda-arc/server

> HTTP API server for KodaArc — handles session management, AI model orchestration, tool execution, and real-time streaming.

---

## Responsibility

This package is the **backend brain** of KodaArc. It exposes a Hono HTTP API that:

1. **Manages sessions** — CRUD operations for conversation sessions stored in PostgreSQL
2. **Orchestrates AI responses** — Resolves model IDs to live provider instances, builds dynamic system prompts, and streams responses via SSE
3. **Executes tools** — Provides sandboxed filesystem, shell, and git tools that the AI model can invoke during BUILD mode
4. **Handles observability** — Integrates Sentry for structured logging and error tracking

---

## Tech Stack

| Technology | Purpose |
| ---------- | ------- |
| Hono 4.x | HTTP framework with type-safe routing |
| Vercel AI SDK 6.x | `streamText()`, tool definitions, multi-provider support |
| @ai-sdk/anthropic | Claude model integration |
| @ai-sdk/openai | GPT model integration |
| @ai-sdk/google | Gemini model integration |
| @hono/zod-validator | Request body validation middleware |
| @sentry/hono | Error tracking and structured logging |
| Zod 4.x | Schema validation |
| Bun | Runtime with hot-reload dev server |

---

## Internal Structure

```
src/
├── index.ts                    # App setup, Sentry middleware, error handler, route mount
├── system-prompt.ts            # Dynamic system prompt builder (identity, rules, tools)
├── routes/
│   ├── sessions.ts             # GET/POST/DELETE /sessions
│   └── chat.ts                 # POST /chat/:id, POST /chat/:id/resume (SSE streaming)
├── tools/
│   ├── index.ts                # Tool factory — assembles tool set by agent state
│   ├── readFile.ts             # Read file contents (10K char limit)
│   ├── writeFile.ts            # Create/overwrite files
│   ├── editFile.ts             # Surgical string replacement
│   ├── listDir.ts              # Directory listing
│   ├── glob.ts                 # Glob pattern matching (Bun.Glob)
│   ├── grep.ts                 # Regex content search (system grep)
│   ├── bash.ts                 # Shell command execution (Bun.spawn)
│   └── gitHealper.ts           # Structured git operations
└── lib/
    ├── models.ts               # Model ID → LanguageModel resolution
    ├── type.modelId.ts         # Provider-specific model ID types
    └── providerOptions/
        ├── index.ts
        ├── anthropicProviderOptions.ts
        ├── googleProviderOptions.ts
        └── openAiProviderOptions.ts
```

---

## Dependencies

### Workspace Dependencies

| Package | Usage |
| ------- | ----- |
| `@koda-arc/database` | Prisma client (`db`) for session/message persistence, enum imports |
| `@koda-arc/shared` | Model registry (`findSupportedChatModelById`), Zod schemas (`messagePartsSchema`, `toolCallArgsSchema`), types |

### Key External Dependencies

| Package | Usage |
| ------- | ----- |
| `ai` | Core AI SDK — `streamText()`, `tool()`, `stepCountIs()` |
| `hono` | HTTP framework, SSE streaming (`streamSSE`) |
| `@hono/zod-validator` | Zod-based request validation middleware |
| `@sentry/hono/bun` | Sentry integration for Bun+Hono |

---

## API Endpoints

| Method | Path | Description |
| ------ | ---- | ----------- |
| `GET` | `/sessions` | List all sessions (newest first) |
| `GET` | `/sessions/:id` | Get session with full message history |
| `POST` | `/sessions` | Create session (optionally with initial message) |
| `DELETE` | `/sessions/:id` | Delete session and all messages |
| `POST` | `/chat/:sessionId` | Submit message and stream AI response (SSE) |
| `POST` | `/chat/:sessionId/resume` | Resume session with pending user message (SSE) |

---

## How It Connects to the System

- **Inbound:** The CLI sends HTTP requests using a Hono RPC client (`hc<AppType>`) that infers types from this package's `AppType` export.
- **Outbound:** Reads/writes to PostgreSQL via the `@koda-arc/database` client. Calls external AI APIs (Anthropic, OpenAI, Google) via the Vercel AI SDK.
- **Type Export:** Exports `AppType` (the typed route tree) which the CLI imports as a dev dependency for compile-time type safety.

---

## Key Design Decisions

1. **SSE over WebSockets:** Server-Sent Events were chosen because they work naturally with HTTP, require no upgrade negotiation, and Hono has first-class `streamSSE` support.
2. **Tool factories:** Each tool is a factory function `createXxxTool(cwd)` that closes over the working directory. This ensures path sandboxing without passing `cwd` through every tool call.
3. **Active resume tracking:** An in-memory `Set<string>` prevents duplicate concurrent resume streams for the same session. This is a simple, pragmatic solution that works for single-server deployment.
4. **Dynamic system prompt:** The system prompt is rebuilt per-request (not stored), so changes take effect immediately without database migration.

---

## Running

```bash
# From monorepo root
bun run dev:server

# From this package
bun run dev
```

Starts on `http://localhost:3000` with Bun's `--hot` flag. The `idleTimeout` is set to 255 seconds to accommodate long AI responses.

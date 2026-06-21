# Setup & Deployment

> Everything you need to get KodaArc running locally, from prerequisites to environment configuration to database setup.

---

## Prerequisites

| Requirement | Minimum Version | Notes |
| ----------- | --------------- | ----- |
| **Bun** | 1.1+ | Runtime, package manager, and dev server. Install via `curl -fsSL https://bun.sh/install \| bash` |
| **PostgreSQL** | 15+ | Used for session and message persistence. A hosted option like [Neon](https://neon.tech) or [Supabase](https://supabase.com) works perfectly. |
| **Node.js** | 18+ | Peer dependency for TypeScript and some tooling |
| **Git** | 2.30+ | Required by the `gitHelper` tool at runtime |
| **grep** (system) | Any | Required by the `grep` tool. Pre-installed on macOS/Linux; on Windows, use WSL or Git Bash |

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/aarabii/KodaArc.git
cd KodaArc
```

### 2. Install Dependencies

```bash
bun install
```

This installs dependencies for all four workspace packages (`cli`, `server`, `database`, `shared`) in a single step.

---

## Environment Configuration

### Create the `.env` File

```bash
cp .env.example .env
```

### Required Variables

| Variable | Description | Example |
| -------- | ----------- | ------- |
| `API_URL` | URL the CLI uses to reach the server | `http://localhost:3000` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/kodaarc` |

### AI Provider API Keys

You need at least one provider key. Set them as environment variables (they are read by the Vercel AI SDK automatically):

| Variable | Provider | Required For |
| -------- | -------- | ------------ |
| `ANTHROPIC_API_KEY` | Anthropic | Claude Sonnet 4-6, Claude Haiku 4-5, Claude Opus 4-6 |
| `OPENAI_API_KEY` | OpenAI | GPT-5.4, GPT-5.4-mini, GPT-5.4-nano |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google | Gemini 3.5 Flash, Gemini 3.1 Flash Lite, Gemini 2.5 Flash |

### Optional Variables

| Variable | Description | Default |
| -------- | ----------- | ------- |
| `SENTRY_DNS` | Sentry DSN for error tracking and structured logging | None (Sentry disabled) |

---

## Database Setup

KodaArc uses **Prisma 7** with the `@prisma/adapter-pg` driver adapter for PostgreSQL.

### 1. Generate the Prisma Client

```bash
cd packages/database
bunx prisma generate
```

This generates the typed Prisma client into `packages/database/generated/prisma/`.

### 2. Push the Schema to the Database

```bash
bunx prisma db push
```

This creates the `Session`, `Message` tables and all enums (`Role`, `AgentState`, `MessageStatus`) directly in your database.

> **Note:** `db push` is used for prototyping. For production, consider switching to `prisma migrate dev` for versioned migrations.

### Schema Overview

```
Session
├── id         (cuid, PK)
├── userId     (string, indexed)
├── title      (string)
├── cwd        (string, nullable — project directory)
├── createdAt  (datetime)
├── updatedAt  (datetime, auto)
└── messages   (Message[], cascade delete)

Message
├── id         (cuid, PK)
├── sessionId  (string, FK → Session, indexed)
├── role       (enum: USER | ASSISTANT | ERROR)
├── status     (enum: COMPLETE | INTERUPTED)
├── content    (string — full text content)
├── parts      (JSON, nullable — structured message parts)
├── model      (string — model ID used for this message)
├── agentState (enum: BUILD | PLAN)
├── duration   (int, nullable — response time in seconds)
└── createdAt  (datetime)
```

---

## Running Locally

KodaArc requires **two processes** running simultaneously:

### Start the API Server

```bash
bun run dev:server
```

This starts the Hono server on `http://localhost:3000` with Bun's `--hot` flag for automatic reloading. The server binds to port 3000 with an `idleTimeout` of 255 seconds (to accommodate long-running AI responses).

### Start the CLI

```bash
bun run dev:cli
```

This starts the OpenTUI-based terminal application with Bun's `--watch` flag for file-change reloading. The CLI renders at 60 FPS with a max of 120 FPS.

### Alternative: Run from Package Directories

```bash
# Server
cd packages/server && bun run dev

# CLI
cd packages/cli && bun run dev
```

---

## Configuration Files

### `tsconfig.base.json` (Shared TypeScript Config)

All packages extend this base configuration:

| Setting | Value | Rationale |
| ------- | ----- | --------- |
| `target` | `ESNext` | Bun supports the latest ES features |
| `module` | `Preserve` | Bundler mode — no module transformation |
| `moduleResolution` | `bundler` | Enables `.ts` extension imports |
| `strict` | `true` | Full TypeScript strict mode |
| `noFallthroughCasesInSwitch` | `true` | Prevents missing `break` in switch cases |
| `noUncheckedIndexedAccess` | `true` | Array/object index access returns `T \| undefined` |
| `noImplicitOverride` | `true` | Requires `override` keyword on method overrides |
| `verbatimModuleSyntax` | `true` | Enforces `import type` for type-only imports |
| `noEmit` | `true` | Bun runs `.ts` directly; no compilation step |

### `prisma.config.ts`

The Prisma configuration file resolves the `.env` file from the monorepo root (two levels up from `packages/database/`) using `dotenv`:

```ts
dotenv.config({
  path: path.resolve(import.meta.dirname, "../../.env"),
});
```

---

## User Preferences

KodaArc stores user preferences at `~/.koda-arc/pref.json`:

```json
{
  "themeName": "Arc Dark",
  "spinnerName": "arc"
}
```

This file is created automatically when the user changes their theme or spinner via the command palette. If the file doesn't exist or is invalid, the app falls back to the default theme.

---

## Troubleshooting

### Server Timeouts on Long AI Responses

If the AI model takes a long time to respond (especially with extended thinking enabled), you may see connection timeouts. Increase the `idleTimeout` value in `packages/server/src/index.ts`:

```ts
export default {
  port: 3000,
  fetch: app.fetch,
  idleTimeout: 255, // Increase this value (in seconds)
};
```

### `DATABASE_URL is missing` Error

Ensure your `.env` file exists at the monorepo root and contains a valid `DATABASE_URL`. The database client resolves the `.env` path relative to `packages/database/src/`, looking for `../../../.env`.

### `grep` Tool Fails on Windows

The `grep` tool shells out to the system `grep` binary, which is not available on Windows natively. Use WSL, Git Bash, or install GnuWin32 grep.

### Prisma Client Not Found

Run `bunx prisma generate` from the `packages/database/` directory. The generated client is gitignored and must be regenerated after cloning.

# @koda-arc/database

> Data layer for KodaArc — Prisma 7 schema, PostgreSQL client, and enum re-exports for session and message persistence.

---

## Responsibility

This package is the **data access layer** of KodaArc. It provides:

1. **Prisma schema** — Defines the `Session` and `Message` models with their relationships, enums, and indexes
2. **Database client** — A singleton `PrismaClient` instance configured with the `@prisma/adapter-pg` driver adapter
3. **Type re-exports** — Generated Prisma types and enums exposed via clean entry points for other packages

This is a **leaf package** — it has zero workspace dependencies and is consumed by both `@koda-arc/server` and `@koda-arc/cli`.

---

## Tech Stack

| Technology | Purpose |
| ---------- | ------- |
| Prisma 7.x | ORM and schema management |
| @prisma/adapter-pg | PostgreSQL driver adapter (replaces default query engine) |
| @prisma/client | Generated type-safe database client |
| PostgreSQL 15+ | Database engine |
| dotenv | Environment variable loading |

---

## Internal Structure

```
├── prisma/
│   └── schema.prisma           # Database schema definition
├── prisma.config.ts             # Prisma configuration (schema path, datasource URL)
├── generated/                   # Generated Prisma client (gitignored)
│   └── prisma/
│       ├── client/              # PrismaClient, model types
│       └── enums/               # Role, AgentState, MessageStatus
└── src/
    ├── index.ts                 # Re-exports everything from generated client
    ├── client.ts                # Singleton PrismaClient instance
    └── enums.ts                 # Re-exports Role, AgentState, MessageStatus
```

---

## Schema

### Enums

```prisma
enum Role {
  USER        // Messages from the user
  ASSISTANT   // AI-generated responses
  ERROR       // System or AI error messages
}

enum AgentState {
  BUILD       // Full read/write/execute mode
  PLAN        // Read-only analysis mode
}

enum MessageStatus {
  COMPLETE    // Response fully generated
  INTERUPTED  // Response was interrupted by the user
}
```

### Models

#### Session

| Column | Type | Description |
| ------ | ---- | ----------- |
| `id` | `String @id @default(cuid())` | Unique identifier |
| `userId` | `String` (indexed) | User identifier (currently hardcoded to `"DEV_MOCK_USER"`) |
| `title` | `String` | Session title (typically first 100 chars of initial prompt) |
| `cwd` | `String?` | Working directory for file/tool operations |
| `createdAt` | `DateTime @default(now())` | Creation timestamp |
| `updatedAt` | `DateTime @updatedAt` | Last update timestamp |
| `messages` | `Message[]` | Related messages (cascade delete) |

#### Message

| Column | Type | Description |
| ------ | ---- | ----------- |
| `id` | `String @id @default(cuid())` | Unique identifier |
| `sessionId` | `String` (indexed, FK → Session) | Parent session |
| `role` | `Role` | Message author role |
| `status` | `MessageStatus` | Completion status |
| `content` | `String` | Full text content of the message |
| `parts` | `Json?` | Structured message parts (reasoning, tool calls, text) |
| `model` | `String` | Model ID used for this message |
| `agentState` | `AgentState` | Agent mode used for this message |
| `duration` | `Int?` | Response time in seconds |
| `createdAt` | `DateTime @default(now())` | Creation timestamp |

The `parts` JSON column stores an array of discriminated union objects:

```ts
type MessagePart =
  | { type: "reasoning"; text: string }
  | { type: "tool_call"; id: string; name: string; args: Record<string, unknown>; result?: string }
  | { type: "text"; text: string }
```

---

## Package Exports

This package exposes three entry points via `package.json` `exports`:

| Import Path | File | What It Exports |
| ----------- | ---- | --------------- |
| `@koda-arc/database` | `src/index.ts` | Everything from the generated Prisma client (types, model types, `Prisma` namespace) |
| `@koda-arc/database/client` | `src/client.ts` | `db` — the singleton `PrismaClient` instance |
| `@koda-arc/database/enums` | `src/enums.ts` | `Role`, `AgentState`, `MessageStatus` enum objects |

---

## Client Configuration

The database client is configured in `src/client.ts`:

```ts
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({ connectionString: databaseURL });
export const db = new PrismaClient({ adapter });
```

Key details:
- Uses `@prisma/adapter-pg` instead of the default Prisma query engine — this connects directly via the `pg` driver
- The `.env` file is resolved from the monorepo root: `path.resolve(import.meta.dirname, "../../../.env")`
- Throws immediately at import time if `DATABASE_URL` is not set
- The `db` export is a **module-level singleton** — all consumers share one connection pool

---

## Commands

```bash
# Generate the Prisma client (required after cloning or schema changes)
bun run db:generate

# Push the schema to the database (creates/updates tables)
bun run db:push
```

Both scripts use `bunx prisma` to run Prisma CLI commands.

---

## How It Connects to the System

- **Consumed by `@koda-arc/server`:** The server imports `db` from `@koda-arc/database/client` to perform all database operations (session CRUD, message persistence). It imports enums from `@koda-arc/database/enums` for type-safe role and status comparisons.
- **Consumed by `@koda-arc/cli`:** The CLI imports enums from `@koda-arc/database/enums` for UI rendering (e.g., checking `MessageStatus.INTERUPTED` to show interrupt indicators). The CLI does **not** import the database client — all data access goes through the server API.
- **No upstream dependencies:** This package has zero workspace dependencies.

# Koda-Arc Monorepo File Structure Guidelines

This directory contains the files specifying the architectural guidelines and structural conventions for the Koda-Arc monorepo. Agents working on this project must read and follow these rules to ensure cleanliness, prevent regression, and preserve decoupling boundaries.

## Monorepo Layout Overview

The Koda-Arc monorepo uses Bun workspaces configured in the root `package.json` under `packages/*`.

```
KodaArc/
├── Agent/
│   └── file_structure/
│       ├── README.md       # This file (overview)
│       ├── cli.md          # CLI / TUI interface structure rules
│       ├── server.md       # [Future] Backend server structure rules
│       ├── db.md           # [Future] Database engine structure rules
│       └── schema.md       # [Future] Shared validation & types structure rules
├── packages/
│   ├── cli/                # Command Line / Terminal User Interface (Active)
│   ├── server/             # [Future] Elysia/Bun-powered backend REST & WS API
│   ├── db/                 # [Future] Database connector engine
│   └── schema/             # [Future] Shared type contracts & validation schemas
├── package.json            # Root workspace config & scripts
└── tsconfig.base.json      # Shared TS compiler rules
```

## Future Packages Rules of Coupling
1. **`@koda-arc/schema`** has **zero** internal dependencies. It must not import from `cli`, `server`, or `db`.
2. **`@koda-arc/db`** imports schemas from `@koda-arc/schema` but must not import from `cli` or `server`.
3. **`@koda-arc/server`** imports schemas from `@koda-arc/schema` and db models from `@koda-arc/db`, but must not import from `cli`.
4. **`@koda-arc/cli`** is the consumer client. It imports from `@koda-arc/schema` for contracts, and talks to `@koda-arc/server` via HTTP/WebSockets. It must not import directly from `db` or `server` codebases (only client wrappers).

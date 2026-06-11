# Koda-Arc DB File Structure Guidelines

This document details the structural guidelines for the database package (`packages/db`), which encapsulates connections, query bindings, and repositories.

## 1. Directory Structure

The database engine package should be organized as follows:

```
packages/db/src/
├── connection.ts       # Main client instantiation & pooling setup
├── repositories/       # Data Access Layer (DAL) representing entities (CRUD operations)
│   ├── base.ts         # Generic Abstract Repository class
│   ├── session.ts      # Session CRUD logic
│   └── user.ts         # User settings and profile CRUD logic
├── migrations/         # Database migration SQL files or scripts
├── types/              # Database-specific TS declarations and models
├── index.ts            # Main barrel export exposing repositories and clients
└── seed.ts             # Seeding utility script for dev environments
```

---

## 2. Key Architectural Guidelines

### 2.1 Decoupling via Repositories
- **Rule:** Do not write SQL queries directly in `server` or `cli`. Always access data through a repository class in `packages/db`.
- **Rationale:** If the database engine changes (e.g. from SQLite to PostgreSQL or a custom filesystem store), you only need to modify repositories inside this package without touching the server's business logic.

### 2.2 Re-exporting Main Client
- The entry point `/src/index.ts` must expose helper instances and database client getters:
  ```typescript
  export { db } from "./connection";
  export * from "./repositories";
  ```
- Any model maps must extend schemas defined in `@koda-arc/schema`.

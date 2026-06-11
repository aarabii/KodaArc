# Koda-Arc Server File Structure Guidelines

This document details the structural guidelines for the backend server package (`packages/server`), which will handle REST endpoints, WebSocket connections, and background workers.

## 1. Directory Structure

The backend server project should be organized as follows:

```
packages/server/src/
├── config/             # Environment variables, server configuration settings
├── controllers/        # Express/Elysia controller layers (parses requests, calls services)
├── routes/             # Route declaration directories (e.g. authRoutes.ts, sessionRoutes.ts)
├── services/           # Business logic layer (computes results, queries DB via @koda-arc/db)
├── types/              # Server-specific TypeScript declarations
├── utils/              # Generic server-wide utility helper scripts
├── index.ts            # Entry point of the server application (Bun.serve or Elysia instance)
└── index.test.ts       # Main integration testing entry file
```

---

## 2. Key Architectural Guidelines

### 2.1 Elysia or Native Bun Setup
- Use Bun's fast HTTP capabilities (e.g., Elysia or Bun native server).
- In `index.ts`, define standard middleware: CORS, logging, error handlers, and route mounts.

### 2.2 Controller/Service Split
- **Controllers** should handle request payload parsing, contract validation (using schemas from `@koda-arc/schema`), calling corresponding service functions, and responding with HTTP status codes.
- **Services** should execute the actual business flow (e.g., executing shell scripts, querying database, communicating with LLM APIs). Services **must not** contain any HTTP-specific requests/responses.

### 2.3 Shared Contract Validation
- Import request and response schemas directly from `@koda-arc/schema`.
- All routes must validate their parameters and body payloads against these shared validation contracts to ensure end-to-end type safety.

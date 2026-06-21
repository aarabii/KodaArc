# System Rules

> Coding standards, naming conventions, architectural patterns, and guardrails for any developer or AI agent contributing to KodaArc.

---

**⚠️ If an AI agent is asked to add a feature to this repository, read this file and the companion files ([codebase-context.md](./codebase-context.md), [architecture-map.md](./architecture-map.md)) first to ensure compliance with the established architecture.**

---

## Language & Runtime

- **TypeScript only.** No plain JavaScript files. All source files use `.ts` or `.tsx` extensions.
- **Bun runtime.** The project runs on Bun, not Node.js. Use Bun APIs (e.g., `Bun.spawn`, `Bun.Glob`) where they are already used. Do not introduce Node.js-specific alternatives for things Bun handles natively.
- **ESM exclusively.** All packages use `"type": "module"`. Use `import`/`export` syntax. Never use `require()`.

## TypeScript Conventions

- **Strict mode is non-negotiable.** The base `tsconfig.base.json` enables `strict: true`, `noUncheckedIndexedAccess`, `noFallthroughCasesInSwitch`, and `noImplicitOverride`. Do not disable these.
- **`verbatimModuleSyntax` is enabled.** Use `import type { ... }` for type-only imports. Mixing value and type imports in a single statement will cause errors.
- **No `any`.** Use `unknown` and narrow with type guards. The only exception is in `catch` blocks where Prisma or external libraries force `any` (see existing patterns in `gitHealper.ts`).
- **`noEmit: true`.** Bun runs TypeScript directly. There is no compilation step. Never add a `build` script that emits JavaScript.

## Naming Conventions

| Thing | Convention | Example |
| ----- | ---------- | ------- |
| Files (components) | `camelCase.tsx` | `sessionShell.tsx`, `botMessage.tsx` |
| Files (utilities) | `camelCase.ts` | `apiClient.ts`, `exitAnimation.ts` |
| Files (hooks) | `useXxx.ts` | `useChats.ts`, `useTheme.ts` |
| Files (providers) | `camelCase.tsx` | `clipboard.tsx`, `theme.tsx` |
| React components | `PascalCase` | `SessionShell`, `BotMessage` |
| Hooks | `useCamelCase` | `useChats`, `useCommandMenu` |
| Constants | `UPPER_SNAKE_CASE` | `SUPPORTED_CHAT_MODELS`, `MAX_OUTPUT` |
| Types/Interfaces | `PascalCase` | `ThemeColorProps`, `StreamingState` |
| Enums (Prisma) | `UPPER_SNAKE_CASE` values | `AgentState.BUILD`, `Role.USER` |
| Zod schemas | `camelCase` | `messagePartSchema`, `submitSchema` |
| Tool factory functions | `createXxxTool` | `createReadFileTool`, `createBashTool` |
| Route handlers | Default export of `Hono` instance | `export default app` |

## Code Organization

### Barrel Exports

Every directory with multiple files has an `index.ts` barrel that re-exports public symbols. Consumers import from the barrel, never from internal files directly.

```ts
// ✅ Correct
import { useChats, useTheme } from "../hooks";

// ❌ Wrong — importing from internal file
import { useChats } from "../hooks/useChats";
```

Exception: The `@koda-arc/database` package exposes multiple entry points (`"."`, `"./client"`, `"./enums"`) which are imported by path.

### Package Boundaries

- `@koda-arc/shared` and `@koda-arc/database` are **leaf packages** with zero workspace dependencies. Keep them that way.
- `@koda-arc/server` depends on `shared` and `database`. It must never import from `cli`.
- `@koda-arc/cli` depends on `shared` and `database` at runtime, and on `server` as a **dev dependency only** (for the `AppType` type used by Hono RPC). It must never import server runtime code.

### No Circular Dependencies

The dependency graph is acyclic. Any change that introduces a circular workspace dependency is a hard reject.

## React Patterns (CLI)

- **Functional components only.** No class components.
- **Context over prop drilling.** Use the existing provider pattern (see `providers/` directory). If you need new global state, create a new context + provider + hook triplet.
- **Hooks are thin wrappers.** Hooks like `useTheme()`, `useToast()`, `useDialog()` are one-liners that call `useContext()` with a null check. Follow this pattern.
- **`useCallback` and `useMemo` where appropriate.** The existing code uses them consistently for event handlers and derived data. Continue this pattern.
- **No external state libraries.** No Redux, Zustand, Jotai, or similar. React Context is the state management solution for this project.

## Server Patterns

- **Hono is the framework.** Do not introduce Express, Fastify, or other HTTP frameworks.
- **Zod for all validation.** Request bodies are validated with `@hono/zod-validator`. Define schemas inline in route files, not in separate schema files (the shared package schemas are the exception — they're shared between client and server).
- **Tool functions are factories.** Each tool is a function that takes `cwd` (and optionally `agentState`) and returns a Vercel AI SDK `tool()` instance. Follow this pattern.
- **Path sandboxing is mandatory.** Every tool that touches the filesystem must resolve paths against `cwd` and verify the resolved path starts with `cwd`. No exceptions.
- **Sentry logging is structured.** Use `Sentry.logger.info/warn/error` with object payloads, not string interpolation.

## Prohibited Patterns

| Pattern | Why |
| ------- | --- |
| `console.log` in server code | Use `Sentry.logger` instead |
| `try/catch` that silently swallows errors | Always log or return the error |
| Direct file system access without path sandboxing | Security vulnerability |
| Importing from `node_modules` internals | Use public package exports |
| Adding new `dependencies` without flagging it | Discuss dependency additions first |
| `rm -rf` or destructive commands in tool implementations | The `bash` tool already handles this via the system prompt's safety rules |
| Storing secrets in code | Use environment variables |
| Mutating function arguments | Create new objects/arrays instead |

## Git Conventions

- **Commit messages:** Use imperative mood. Be specific. Example: `add gemini-3.5-flash to supported models` not `updated stuff`.
- **Branch names:** `feat/`, `fix/`, `refactor/`, `docs/` prefixes.
- **No force pushes** to main.

## Testing

There are currently no tests in the repository. When tests are added, they should:
- Use Bun's built-in test runner (`bun test`)
- Follow the `*.test.ts` naming convention
- Be colocated with the code they test or in a `__tests__/` directory

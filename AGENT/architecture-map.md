# Architecture Map

> Quick-reference index of every critical file and entry point in the KodaArc monorepo. Designed for fast orientation when working on a specific feature.

---

**⚠️ If an AI agent is asked to add a feature to this repository, read this file and the companion files ([system-rules.md](./system-rules.md), [codebase-context.md](./codebase-context.md)) first to ensure compliance with the established architecture.**

---

## Root Configuration

| File | Purpose |
| ---- | ------- |
| `package.json` | Workspace root — defines `workspaces: ["packages/*"]` and top-level dev scripts |
| `tsconfig.base.json` | Shared TypeScript config — strict mode, ESM, bundler resolution |
| `.env.example` | Environment variable template (`API_URL`, `DATABASE_URL`) |
| `.gitignore` | Ignores `node_modules`, `generated/`, `.env`, build artifacts |

---

## `packages/server/` — HTTP API & AI Orchestration

### Entry Point

| File | Role |
| ---- | ---- |
| `src/index.ts` | Hono app setup, Sentry middleware, global error handler, route registration, Bun server export (port 3000) |

### Routes

| File | Endpoints | Description |
| ---- | --------- | ----------- |
| `src/routes/sessions.ts` | `GET /sessions`, `GET /sessions/:id`, `POST /sessions`, `DELETE /sessions/:id` | Session CRUD with Zod validation and Sentry logging |
| `src/routes/chat.ts` | `POST /chat/:sessionId`, `POST /chat/:sessionId/resume` | AI streaming via SSE, message persistence, interrupt handling |

### AI Core

| File | Role |
| ---- | ---- |
| `src/system-prompt.ts` | Builds the dynamic system prompt based on `cwd` and `agentState` — identity, rules, mode instructions, tool docs |
| `src/lib/models.ts` | Model resolution pipeline — maps model IDs to Vercel AI SDK `LanguageModel` instances with provider options |
| `src/lib/type.modelId.ts` | TypeScript utility types — `AnthropicModelId`, `OpenAIModelId`, `GoogleModelId` extracted from the shared model registry |
| `src/lib/providerOptions/index.ts` | Barrel export for all provider option configs |
| `src/lib/providerOptions/anthropicProviderOptions.ts` | Extended thinking config for Claude Opus and Sonnet (10K token budget) |
| `src/lib/providerOptions/googleProviderOptions.ts` | Thinking config for Gemini models |
| `src/lib/providerOptions/openAiProviderOptions.ts` | Reasoning effort config for GPT models |

### Tools

| File | Tool Name | Mode | Description |
| ---- | --------- | ---- | ----------- |
| `src/tools/index.ts` | — | — | Factory function that assembles the tool set based on `agentState` |
| `src/tools/readFile.ts` | `readFile` | PLAN, BUILD | Read file contents (10K char limit) |
| `src/tools/writeFile.ts` | `writeFile` | BUILD | Create/overwrite files with parent directory creation |
| `src/tools/editFile.ts` | `editFile` | BUILD | Surgical string replacement (unique match enforcement) |
| `src/tools/listDir.ts` | `listDirectory` | PLAN, BUILD | Directory listing (skips hidden files and `node_modules`) |
| `src/tools/glob.ts` | `glob` | PLAN, BUILD | Glob pattern matching via `Bun.Glob` (200 file limit) |
| `src/tools/grep.ts` | `grep` | PLAN, BUILD | Regex content search via system `grep` (50 match limit) |
| `src/tools/bash.ts` | `bash` | BUILD | Shell command execution via `Bun.spawn` (30s timeout, 20K output) |
| `src/tools/gitHealper.ts` | `gitHelper` | PLAN (read-only), BUILD | Structured git operations (status, diff, log, show, commit, branch) |

---

## `packages/cli/` — Terminal User Interface

### Entry Point

| File | Role |
| ---- | ---- |
| `src/index.tsx` | Creates OpenTUI renderer (60 FPS), sets cursor style, renders `<App />` |
| `src/app.tsx` | In-memory `react-router` with three routes: `/`, `/sessions/new`, `/sessions/:id` |

### Screens

| File | Route | Description |
| ---- | ----- | ----------- |
| `src/screens/home.tsx` | `/` | Landing page — ASCII header, input bar, agent mode hint |
| `src/screens/newSession.tsx` | `/sessions/new` | Transient screen — creates session via API, redirects to session view |
| `src/screens/session.tsx` | `/sessions/:id` | Main chat interface — message history, streaming, interrupt |

### Hooks

| File | Hook | Description |
| ---- | ---- | ----------- |
| `src/hooks/useChats.ts` | `useChats` | Core chat logic — SSE streaming, message accumulation, submit/abort/interrupt/resume |
| `src/hooks/useCommandMenu.ts` | `useCommandMenu` | Slash command palette state — filtering, keyboard navigation, selection |
| `src/hooks/useTheme.ts` | `useTheme` | Thin context wrapper for `ThemeContext` |
| `src/hooks/useToast.ts` | `useToast` | Thin context wrapper for `ToastContext` |
| `src/hooks/useDialog.ts` | `useDialog` | Thin context wrapper for `DialogContext` |
| `src/hooks/useClipboard.ts` | `useClipboard` | Thin context wrapper for `ClipboardContext` |
| `src/hooks/useKeyboardLayer.ts` | `useKeyboardLayer` | Thin context wrapper for `KeyboardLayerContext` |
| `src/hooks/usePromptConfig.ts` | `usePromptConfig` | Thin context wrapper for `PromptConfigContext` |

### Providers

| File | Provider | State Managed |
| ---- | -------- | ------------- |
| `src/providers/theme.tsx` | `ThemeProvider` | Color theme, spinner animation, persistence to `~/.koda-arc/pref.json` |
| `src/providers/toast.tsx` | `ToastProvider` | Transient toast notifications (message, variant, duration) |
| `src/providers/keyboard.tsx` | `KeyboardLayerProvider` | Input focus layer stack for dialogs and menus |
| `src/providers/clipboard.tsx` | `ClipboardProvider` | System clipboard read/write |
| `src/providers/dialog.tsx` | `DialogProvider` | Modal dialog open/close with title and children |
| `src/providers/promptConfig.tsx` | `PromptConfigProvider` | Active `AgentState` and selected `SupportedChatModelId` |
| `src/providers/context.ts` | — | React context definitions for all providers |
| `src/providers/types.ts` | — | TypeScript types for all context values |

### Layout

| File | Component | Description |
| ---- | --------- | ----------- |
| `src/layout/rootLayout.tsx` | `RootLayout` | Provider composition tree + `<Outlet />` |
| `src/layout/sessionShell.tsx` | `SessionShell` | Chat layout shell — scrollable message area, input bar, status bar |
| `src/layout/themedRoot.tsx` | `ThemedRoot` | Applies theme background color to the root box |

### Components

| Directory | Contains |
| --------- | -------- |
| `src/components/common/` | Shared UI primitives (Header, etc.) |
| `src/components/input/` | InputBar component |
| `src/components/feedback/` | Spinner component |
| `src/components/message/` | UserMessage, BotMessage, ErrorMessage components |
| `src/components/commandPalette/` | CommandMenu component and types |

### Dialogs

| File | Dialog | Opened By |
| ---- | ------ | --------- |
| `src/dialogs/agentsDialog.tsx` | Agent selection | `/agents` command |
| `src/dialogs/modelDialog.tsx` | Model selection | `/models` command |
| `src/dialogs/themeDialog.tsx` | Theme picker | `/theme` command |
| `src/dialogs/spinnerDialog.tsx` | Spinner picker | `/spinner` command |
| `src/dialogs/sessionDialog.tsx` | Session history browser | `/sessions` command |
| `src/dialogs/helpDialog.tsx` | FAQ and help | `/help` command |
| `src/dialogs/exitDialog.tsx` | Exit confirmation | `/exit` command |
| `src/dialogs/faqData.ts` | FAQ content data | Used by helpDialog |

### Utilities

| File | Purpose |
| ---- | ------- |
| `src/utils/exitAnimation.ts` | Animated exit screen — gradient ASCII logo, typewriter quote, time-aware greeting |
| `src/utils/ansi.ts` | ANSI escape code helpers — hex-to-RGB conversion, color formatting |
| `src/utils/filterCommand.ts` | Command palette filtering logic |

### Library

| File | Purpose |
| ---- | ------- |
| `src/lib/apiClient.ts` | Hono RPC client — type-safe HTTP client generated from server's `AppType` |
| `src/lib/httpErrors.ts` | Error message extraction from API responses |
| `src/lib/preferences.ts` | Theme/spinner persistence — read/write `~/.koda-arc/pref.json` |

### Assets & Themes

| File | Purpose |
| ---- | ------- |
| `src/assets/ascii.ts` | ASCII art logo lines for the exit animation |
| `src/themes/definitions.ts` | All theme color definitions (~59KB, multiple themes) |
| `src/themes/types.ts` | `ThemeColorProps` and `ThemeProps` type definitions |

---

## `packages/database/` — Data Layer

| File | Purpose |
| ---- | ------- |
| `prisma/schema.prisma` | Database schema — `Session`, `Message` models, `Role`/`AgentState`/`MessageStatus` enums |
| `prisma.config.ts` | Prisma config — schema path, migration path, datasource URL from `.env` |
| `src/index.ts` | Re-exports everything from generated Prisma client |
| `src/client.ts` | Singleton `PrismaClient` instance with `@prisma/adapter-pg` |
| `src/enums.ts` | Re-exports `Role`, `AgentState`, `MessageStatus` from generated enums |

---

## `packages/shared/` — Cross-Package Types & Schemas

| File | Purpose |
| ---- | ------- |
| `src/index.ts` | Barrel export — types, constants, schemas |
| `src/types/models.ts` | `ModelPricing`, `SupportedProvider` types |
| `src/constants/availableModels.ts` | `SUPPORTED_CHAT_MODELS` array, `DEFAULT_CHAT_MODEL_ID`, `findSupportedChatModelById()` |
| `src/schemas/streaming.ts` | `messagePartSchema`, `messagePartsSchema`, `ChatStreamEventSchema`, `toolCallArgsSchema` |

---

## Critical Paths for Common Tasks

### Adding a new AI tool
1. Create `src/tools/myTool.ts` in server package (follow `createXxxTool(cwd)` pattern)
2. Import and add to `createTools()` in `src/tools/index.ts` (decide PLAN vs BUILD availability)
3. Update the system prompt in `src/system-prompt.ts` to document the new tool

### Adding a new model
1. Add entry to `SUPPORTED_CHAT_MODELS` in `packages/shared/src/constants/availableModels.ts`
2. Optionally add provider options in `packages/server/src/lib/providerOptions/`

### Adding a new CLI dialog
1. Create `src/dialogs/myDialog.tsx` in CLI package
2. Export from `src/dialogs/index.ts`
3. Add a command entry that opens it via `useDialog().open()`

### Adding a new provider
1. Extend `src/providers/context.ts` with a new context
2. Extend `src/providers/types.ts` with the context value type
3. Create `src/providers/myProvider.tsx`
4. Export from `src/providers/index.ts`
5. Add to the composition tree in `src/layout/rootLayout.tsx`
6. Create `src/hooks/useMyProvider.ts` thin wrapper
7. Export from `src/hooks/index.ts`

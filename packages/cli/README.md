# @koda-arc/cli

> Terminal user interface for KodaArc — a React 19 TUI application built with OpenTUI that provides a rich, interactive chat experience directly in the terminal.

---

## Responsibility

This package is the **user-facing frontend** of KodaArc. It renders a full terminal UI at 60 FPS using React 19 and OpenTUI, providing:

1. **Chat interface** — Scrollable message history with user, assistant, and error messages rendered as styled terminal components
2. **Real-time streaming** — SSE stream consumption with live rendering of reasoning, text, tool calls, and tool results
3. **Command palette** — Slash-command system (`/models`, `/agents`, `/theme`, `/spinner`, `/sessions`, `/help`, `/exit`) for quick actions
4. **Dialog system** — Modal dialogs for model selection, theme picking, session browsing, and help
5. **Theming** — Multiple color themes and spinner animations persisted to disk
6. **Session management** — Create, browse, resume, and delete conversation sessions

---

## Tech Stack

| Technology | Purpose |
| ---------- | ------- |
| React 19 | Component model and state management |
| OpenTUI (core + react) | Terminal UI rendering at 60 FPS with JSX |
| react-router 7.x | In-memory routing (Home → NewSession → Session) |
| eventsource-parser | SSE stream parsing for AI responses |
| Hono Client | Type-safe HTTP client (RPC mode via `AppType`) |
| Zod 4.x | State validation, stream event parsing |
| date-fns | Date formatting |
| pretty-ms | Duration formatting |

---

## Internal Structure

```
src/
├── index.tsx                   # Entry point — creates OpenTUI renderer, renders <App />
├── app.tsx                     # React Router setup (3 routes)
├── screens/
│   ├── home.tsx                # Landing page with ASCII header and input bar
│   ├── newSession.tsx          # Session creation (transient, redirects on success)
│   └── session.tsx             # Main chat interface with streaming
├── hooks/
│   ├── useChats.ts             # Core chat logic — SSE streaming, submit, abort, interrupt, resume
│   ├── useCommandMenu.ts       # Command palette state and keyboard navigation
│   ├── useTheme.ts             # Context hook for ThemeProvider
│   ├── useToast.ts             # Context hook for ToastProvider
│   ├── useDialog.ts            # Context hook for DialogProvider
│   ├── useClipboard.ts         # Context hook for ClipboardProvider
│   ├── useKeyboardLayer.ts     # Context hook for KeyboardLayerProvider
│   ├── usePromptConfig.ts      # Context hook for PromptConfigProvider
│   └── types/                  # TypeScript types for hook internals
├── providers/
│   ├── context.ts              # React context definitions (6 contexts)
│   ├── types.ts                # Context value type definitions
│   ├── theme.tsx               # Theme + spinner state, disk persistence
│   ├── toast.tsx               # Transient notification state
│   ├── keyboard.tsx            # Input focus layer stack
│   ├── clipboard.tsx           # System clipboard wrapper
│   ├── dialog.tsx              # Modal dialog open/close state
│   └── promptConfig.tsx        # Agent state + model selection
├── layout/
│   ├── rootLayout.tsx          # Provider composition tree + <Outlet />
│   ├── sessionShell.tsx        # Chat layout — scrollbox, input bar, status bar
│   └── themedRoot.tsx          # Applies theme background to root element
├── components/
│   ├── common/                 # Shared UI primitives (Header, etc.)
│   ├── input/                  # InputBar component
│   ├── feedback/               # Spinner component
│   ├── message/                # UserMessage, BotMessage, ErrorMessage
│   └── commandPalette/         # CommandMenu + types
├── dialogs/
│   ├── agentsDialog.tsx        # Agent mode selection (/agents)
│   ├── modelDialog.tsx         # Model picker (/models)
│   ├── themeDialog.tsx         # Theme picker (/theme)
│   ├── spinnerDialog.tsx       # Spinner animation picker (/spinner)
│   ├── sessionDialog.tsx       # Session history browser (/sessions)
│   ├── helpDialog.tsx          # FAQ and help (/help)
│   ├── exitDialog.tsx          # Exit confirmation (/exit)
│   └── faqData.ts              # Static FAQ content
├── themes/
│   ├── definitions.ts          # All theme color definitions (~59KB)
│   └── types.ts                # ThemeColorProps, ThemeProps types
├── lib/
│   ├── apiClient.ts            # Hono RPC client (type-safe, from AppType)
│   ├── httpErrors.ts           # Error message extraction from responses
│   └── preferences.ts          # Theme/spinner persistence (~/.koda-arc/pref.json)
├── utils/
│   ├── exitAnimation.ts        # Animated exit screen (ANSI art, typewriter quotes)
│   ├── ansi.ts                 # ANSI escape code utilities
│   └── filterCommand.ts        # Command palette filtering
└── assets/
    └── ascii.ts                # ASCII art logo data
```

---

## Dependencies

### Workspace Dependencies

| Package | Import Path | Usage |
| ------- | ----------- | ----- |
| `@koda-arc/shared` | `@koda-arc/shared` | Model IDs, Zod schemas, ChatStreamEvent types |
| `@koda-arc/database` | `@koda-arc/database/enums` | `AgentState`, `MessageStatus`, `Role` enums |
| `@koda-arc/server` | `@koda-arc/server` (devDep) | `AppType` for Hono RPC type inference only |

### Key External Dependencies

| Package | Usage |
| ------- | ----- |
| `@opentui/core` | Terminal renderer, `TextAttributes`, `ScrollBoxRenderable` |
| `@opentui/react` | React bindings — `createRoot`, `useKeyboard` |
| `react` / `react-router` | Component model and client-side routing |
| `eventsource-parser` | SSE stream parsing (`EventSourceParserStream`) |
| `hono` | Client-side RPC (`hc<AppType>`) |

---

## Routing

| Path | Screen | Purpose |
| ---- | ------ | ------- |
| `/` | `Home` | ASCII header, centered input bar, "tab agents" hint |
| `/sessions/new` | `NewSession` | Creates session via API → redirects to `/sessions/:id` |
| `/sessions/:id` | `Session` | Full chat with message history, streaming, and interrupt |

Navigation passes data via `location.state` to avoid redundant API calls. The `NewSession` screen is a transient intermediary — the user never stays on it.

---

## State Management

Six React Context providers composed in `RootLayout` (order matters — inner providers can access outer ones):

```
ThemeProvider → ToastProvider → KeyboardLayerProvider → ClipboardProvider → DialogProvider → PromptConfigProvider
```

The `useChats` hook manages chat-specific state (messages, streaming status, abort controllers) locally within the `Session` screen using `useState` and `useRef`. It is not a global context.

---

## How It Connects to the System

- **Outbound:** Sends HTTP requests to `@koda-arc/server` via the Hono RPC client at `API_URL` (default: `http://localhost:3000`)
- **Type Safety:** Imports `AppType` from the server package at compile time, ensuring all API calls are type-checked against the server's actual route definitions
- **No Direct DB Access:** The CLI never touches the database directly — all data access goes through the server API

---

## Running

```bash
# From monorepo root
bun run dev:cli

# From this package
bun run dev
```

Starts the OpenTUI renderer with `--watch` for file-change reloading. The terminal must support ANSI escape codes and truecolor for full theme support.

# KodaArc Codebase File Structure Guide

This guide describes the file structure design system for KodaArc. It is designed to be read by AI coding agents and developers to maintain consistency when adding new features, files, or packages.

---

## Core Architecture Principles

1. **Monorepo Structure**: The project is a Bun monorepo composed of separate workspace packages:
   - `packages/cli`: React terminal UI app using OpenTUI (`@opentui/react`).
   - `packages/server`: Hono API server with session CRUD endpoints.
   - `packages/database`: Prisma schema and database client singleton.
   - `packages/shared`: Shared types, constants, and Zod validation schemas.

2. **Barrel Exports (`index.ts`)**:
   - Every source directory containing modules must expose them via a barrel `index.ts` file.
   - External consumers must import from the directory's barrel file (e.g. `import { useTheme } from "../hooks"`) instead of reaching into specific sub-files.
   - Sub-barrels are aggregated by the root barrel (e.g. `components/index.ts` re-exports everything from `components/common`, `components/input`, etc.).

3. **Domain Grouping**:
   - Components are grouped into directories representing functional areas (e.g. `components/common` for primitives, `components/feedback` for status/overlays, `components/input` for inputs).
   - Router-mapped screen views live in `screens/`.
   - General layouts (wrapper/shell containers) live in `layout/`.
   - React hooks live in `hooks/`.
   - Pure, stateless utility functions live in `utils/`.
   - Theme configurations live in `themes/`.

4. **Naming Conventions**:
   - All directories and source files use **camelCase** naming (e.g., `inputBar.tsx`, `rootLayout.tsx`, `commandPalette/`).
   - Component names use PascalCase matching their file name structure if they export a single main component.

---

## Packages Breakdown

### 1. CLI Package (`packages/cli/src`)

The source directory is structured as follows:

```
src/
├── index.tsx                 # Entry bootstrap only: calls createCliRenderer and renders App
├── app.tsx                   # Main App router setup (createMemoryRouter + RouterProvider)
│
├── assets/
│   ├── index.ts              # Re-exports ASCII/image assets
│   └── ascii.ts              # ASCII art lines
│
├── components/
│   ├── index.ts              # Aggregates and re-exports from all sub-barrels
│   ├── common/               # UI primitives and generic components
│   │   ├── index.ts
│   │   ├── border.ts         # Border characters (pure data, no JSX)
│   │   ├── spinner.tsx       # Standard loading spinner component
│   │   ├── header.tsx        # Logo title header
│   │   └── searchList.tsx    # Generic keyboard-navigable list searcher
│   │
│   ├── input/                # User input controls
│   │   ├── index.ts
│   │   └── inputBar.tsx      # Multi-line textarea prompt input + command menu trigger
│   │
│   ├── feedback/             # Contextual feedback overlays and indicators
│   │   ├── index.ts
│   │   ├── dialog.tsx        # Modal overlay window
│   │   ├── toast.tsx         # Notification popups
│   │   └── statusbar.tsx     # Session metadata indicator
│   │
│   ├── message/              # Chat message blocks
│   │   ├── index.ts
│   │   ├── botMessage.tsx
│   │   ├── errorMessage.tsx
│   │   └── userMessage.tsx
│   │
│   └── commandPalette/       # Command palette menu
│       ├── index.tsx         # CommandMenu dropdown component
│       └── commandItem.tsx   # Individual COMMANDS definitions and prompt actions
│
├── dialogs/                  # Modal contents
│   ├── index.ts
│   ├── themeDialog.tsx       # Theme chooser modal content
│   └── spinnerDialog.tsx     # Spinner chooser modal content
│
├── hooks/                    # Reusable React hooks
│   ├── index.ts
│   ├── useDialog.ts          # Access dialog manager context
│   ├── useKeyboardLayer.ts   # Access stack-based keyboard manager
│   ├── useTheme.ts           # Access current theme variables
│   ├── useToast.ts           # Access toast manager context
│   └── useCommandMenu.ts     # Tracks query state & keyboard handlers for commands
│
├── layout/                   # Layout wrappers and route shells
│   ├── index.ts
│   ├── rootLayout.tsx        # Injects all Context Providers in order
│   ├── themedRoot.tsx        # Manages background color wrapper
│   └── sessionShell.tsx      # Flex-based terminal layout wrapper for chat
│
├── lib/                      # External clients & I/O managers
│   ├── index.ts
│   ├── apiClient.ts          # Type-safe RPC API client using Hono hc
│   ├── httpErrors.ts         # API error helper utilities
│   └── preferences.ts        # Syncs user settings (~/.koda-arc/pref.json)
│
├── providers/                # Context Provider components
│   ├── index.ts
│   ├── dialog/               # Dialog state context
│   ├── keyboardLayer/        # Global keypress stack controller context
│   ├── theme/                # Theme colors context
│   └── toast/                # Toast list context
│
├── screens/                  # Top-level screen components mapped to router
│   ├── index.ts
│   ├── home.tsx              # Home view
│   ├── newSession.tsx        # New session initializer view
│   └── session.tsx           # Active session chat view
│
├── themes/                   # Application theme definitions
│   ├── index.ts
│   └── definitions.ts        # Predefined theme colors list (THEME, DEFAULT_THEME)
│
├── types/                    # TypeScript interfaces & types
│   ├── index.ts
│   ├── command.ts
│   ├── dialog.ts
│   ├── keyboard.ts
│   ├── theme.ts
│   └── toast.ts
│
└── utils/                    # Stateless utility helper functions
    ├── index.ts
    ├── ansi.ts               # Color conversion & ANSI escape sequences
    ├── filterCommand.ts      # Filters commands based on input queries
    └── exitAnimation.ts      # Custom graceful exit animation played onDestroy
```

### 2. Shared Package (`packages/shared/src`)

The shared package uses directories for types, schemas, and runtime constants:

```
src/
├── index.ts                  # Re-exports all sub-directories
│
├── types/
│   ├── index.ts
│   └── models.ts             # Type-only specifications (e.g. ModelPricing)
│
├── constants/
│   ├── index.ts
│   └── availableModels.ts    # Model configurations and lookup helpers
│
└── schemas/
    ├── index.ts
    └── streaming.ts          # Zod validation schemas for streaming protocol
```

---

## Guidelines for Future Enhancements

When creating new features, files, or packages, adhere to these rules:

1. **Add to Sub-Barrels First**: When creating a file (e.g., `hooks/useMyNewHook.ts`), export it in `hooks/index.ts`.
2. **Never Direct Import from Internals**: Direct imports like `import { something } from "../hooks/useDialog"` are disallowed. Use `import { something } from "../hooks"`.
3. **No JSX in `.ts` Files**: Use `.ts` for files that do not render JSX, and `.tsx` only when JSX tags are present.
4. **Clean up After Moves**: Always update the importing files when moving a component, hook, utility, or type. Ensure no circular dependencies are introduced.
5. **No Logic in Entry Bootstrapper**: `index.tsx` is only used to start up the renderer and mount the root component. All routing, layout, and page logic must live in `app.tsx`, `layout/`, and `screens/`.

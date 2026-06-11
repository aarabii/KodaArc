# Koda-Arc CLI File Structure Guidelines

This document details the architectural conventions for organizing the codebase inside `packages/cli/src` to preserve system structure and prevent regression in future refactoring cycles.

## 1. Directory Structure Conventions

The project follows a modular, layer-oriented structure:

```
packages/cli/src/
├── assets/         # Static visual assets (e.g., ASCII artwork, typography)
├── components/     # UI rendering components
│   ├── index.ts    # Barrel export for components
│   ├── dialog.tsx  # Extracted dialog UI view
│   ├── toast.tsx   # Extracted toast UI view
│   └── commands/   # Command bar & matching widgets
├── dialogs/        # Customized dialog content forms (e.g., Theme Dialog)
│   └── index.ts    # Barrel export for dialog contents
├── hooks/          # Custom standalone React hooks
│   ├── index.ts    # Barrel export for hooks
│   ├── useTheme.ts
│   ├── useDialog.ts
│   ├── useToast.ts
│   └── useKeyboardLayer.ts
├── layout/         # Route layouts & wrappers
├── providers/      # React context state managers
│   ├── index.ts    # Barrel export for providers
│   ├── theme/      # Theme context & provider
│   ├── dialog/     # Dialog context & provider
│   ├── toast/      # Toast context & provider
│   └── keyboardLayer/ # Keyboard event manager context & provider
├── screens/        # Screen level routes (e.g., Home, Sessions)
├── types/          # Centralized type definitions (prevents circular dependencies)
│   ├── index.ts    # Barrel export for types
│   ├── theme.ts
│   ├── dialog.ts
│   ├── toast.ts
│   ├── keyboard.ts
│   └── command.ts
└── utils/          # Pure helper utilities (e.g., ANSI colors, parser functions)
```

---

## 2. Rules for Micro-Refactoring & File Splitting

To ensure high cohesion, low coupling, and no circular dependencies:

### 2.1 Centralized Types (`/src/types`)
- **Rule:** Do not place type interfaces (`ThemeProps`, `DialogConfig`, etc.) inside the component, hook, or provider files. Place them under the `/src/types` directory.
- **Rationale:** Helps break circular dependencies when multiple hooks, components, and providers reference the same types.
- **Exporting:** Always add exports to `/src/types/index.ts`.

### 2.2 Separating Providers, Contexts, Hooks, and Views
For any stateful layer (e.g., Dialog, Toast, Theme, Keyboard Layer), split the monolithic files into 4 parts:
1. **Context Definition (`/src/providers/<domain>/context.ts`):** Creates and exports the React context object (e.g., `DialogContext`) using types imported from `/src/types`.
2. **Hook Definition (`/src/hooks/use<Domain>.ts`):** Implements the state consumer hook (e.g., `useDialog`) using the context from `/src/providers/<domain>/context.ts`.
3. **UI Renderer (`/src/components/<domain>.tsx`):** Purely declarative UI element rendering (e.g., `<Dialog />` modal markup or `<Toast />` popups).
4. **Provider Container (`/src/providers/<domain>/index.tsx`):** Implements state tracking, timeouts, event listeners, imports the context definition to provide values, and imports the UI renderer to mount it on the React tree.

---

## 3. Public APIs and Barrel Exports (`index.ts`)

Every major directory (`/src/components`, `/src/hooks`, `/src/providers`, `/src/types`) **MUST** expose an `index.ts` file. 

- All modules inside that directory must export their usable tokens.
- The `index.ts` file acts as the single gateway:
  ```typescript
  // Example packages/cli/src/hooks/index.ts
  export { useTheme } from "./useTheme";
  export { useDialog } from "./useDialog";
  export { useToast } from "./useToast";
  export { useKeyboardLayer } from "./useKeyboardLayer";
  ```
- **Rule:** Internal folder files can import using relative paths (e.g., `./context`), but external consumers must import from the parent barrel (e.g., `import { useTheme } from "../hooks"`).

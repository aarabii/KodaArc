# KodaArc UI Color Guidelines

This document serves as a reference for selecting and applying colors from the active theme. Always use values from the `colors` object returned by `useTheme()`.

## Theme Color Tokens Reference

### 1. Brand Identity
- **`colors.brand.primary`**: The signature/primary accent of the theme. Used for title boxes, highlighted borders, important selected list item text, logo artwork (`Koda`), and primary inputs.
- **`colors.brand.accent`**: A secondary pop color. Best for custom badges, secondary highlights, status changes, and custom bullet icons (e.g., bot response bullet).

### 2. Typography
- **`colors.text.primary`**: The standard color for body text, chat messages, and principal dialog contents.
- **`colors.text.secondary`**: Subdued labels, instructions, secondary header text, or secondary metadata.
- **`colors.text.muted`**: Very dim, de-emphasized text. Used for placeholders, "empty state" messages, key shortcuts (like exit/close indicators), and minor metadata.
- **`colors.text.inverse`**: Text color when overlaid on brand/primary backgrounds where text contrast is required.
- **`colors.text.code`**: Monospace or code block text.

### 3. Backgrounds
- **`colors.bg.base`**: The root viewport/shell background color.
- **`colors.bg.surface`**: Panel and list box background colors.
- **`colors.bg.elevated`**: Dialog box and menu backgrounds.
- **`colors.bg.input`**: Text input and textarea fields.
- **`colors.bg.code`**: Code snippet and command output blocks.

### 4. Borders & Dividers
- **`colors.border.default`**: Standard border for dialog frames or distinct sections.
- **`colors.border.strong`**: Highlighted, active, or thick borders.
- **`colors.border.focused`**: Border for currently focused elements.
- **`colors.border.dim`**: Very subtle separator lines (e.g., list division lines).

### 5. Interactive & Selection State
- **`colors.selection.bg`**: Background color for highlighted or cursor-selected items in lists/menus.
- **`colors.selection.text`**: Text color overlaying `colors.selection.bg` for high legibility.

### 6. Agent States
- **`colors.agent.plan`**: Accent color representing the planning/layout mode.
- **`colors.agent.thinking`**: Soft/dim color representing the AI thinking state (also utilized as subtle arrow connectors or loading statuses).
- **`colors.agent.executing`**: Alert/bright color when the agent is actively executing code or running tests.
- **`colors.agent.waiting`**: Color denoting that the agent is waiting on user input or manual confirmation.
- **`colors.agent.idle`**: The inactive, neutral state indicator.

### 7. Semantics (Alerts & Badges)
Each semantic block has a sub-structure containing: `{ accent, bg, border, text }`
- **`colors.success`**: Successful operations, checks passed, or saved profiles.
- **`colors.error`**: Failures, exceptions, and crash logs.
- **`colors.info`**: Tips, neutral informational callouts, and hints.
- **`colors.warning`**: Warnings, non-critical alerts, or destructive confirmations.

### 8. Git / Diff View
- **`colors.diff.added`**: `{ text, bg }` for newly added lines.
- **`colors.diff.removed`**: `{ text, bg }` for deleted lines.
- **`colors.diff.modified`**: `{ text, bg }` for modified lines.
- **`colors.diff.context`**: Default text color for surrounding unchanged lines.

---

## Code Example

```tsx
import { useTheme } from "../hooks";
import { TextAttributes } from "@opentui/core";

export function Component() {
  const { colors } = useTheme();

  return (
    <box backgroundColor={colors.bg.surface} padding={1}>
      <text fg={colors.brand.primary} attributes={TextAttributes.BOLD}>
        Title
      </text>
      <text fg={colors.text.secondary}>
        This is a descriptive text snippet.
      </text>
    </box>
  );
}
```

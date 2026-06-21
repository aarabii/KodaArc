import type { KeyBinding } from "@opentui/core";

export const TEXT_AREA_KEY_BINDINGS: KeyBinding[] = [
  // Submit / newline
  { name: "return", action: "submit" },
  { name: "enter", action: "submit" },
  { name: "return", shift: true, action: "newline" },
  { name: "enter", shift: true, action: "newline" },

  // Undo / redo
  { name: "z", ctrl: true, action: "undo" },
  { name: "y", ctrl: true, action: "redo" },

  // Select all
  { name: "a", ctrl: true, action: "select-all" },

  // Cursor movement
  { name: "left", action: "move-left" },
  { name: "right", action: "move-right" },
  { name: "up", action: "move-up" },
  { name: "down", action: "move-down" },

  // Selection via shift+arrows
  { name: "left", shift: true, action: "select-left" },
  { name: "right", shift: true, action: "select-right" },
  { name: "up", shift: true, action: "select-up" },
  { name: "down", shift: true, action: "select-down" },

  // Home / End
  { name: "home", action: "line-home" },
  { name: "end", action: "line-end" },
  { name: "home", shift: true, action: "select-line-home" },
  { name: "end", shift: true, action: "select-line-end" },

  // Buffer home / end (Ctrl+Home / Ctrl+End)
  { name: "home", ctrl: true, action: "buffer-home" },
  { name: "end", ctrl: true, action: "buffer-end" },
  { name: "home", ctrl: true, shift: true, action: "select-buffer-home" },
  { name: "end", ctrl: true, shift: true, action: "select-buffer-end" },

  // Word navigation (Ctrl+Left / Ctrl+Right)
  { name: "right", ctrl: true, action: "word-forward" },
  { name: "left", ctrl: true, action: "word-backward" },
  { name: "right", ctrl: true, shift: true, action: "select-word-forward" },
  { name: "left", ctrl: true, shift: true, action: "select-word-backward" },

  // Delete operations
  { name: "backspace", action: "backspace" },
  { name: "delete", action: "delete" },
  { name: "backspace", ctrl: true, action: "delete-word-backward" },
  { name: "delete", ctrl: true, action: "delete-word-forward" },

  // Line operations
  { name: "k", ctrl: true, shift: true, action: "delete-line" },
  { name: "k", ctrl: true, action: "delete-to-line-end" },
  { name: "u", ctrl: true, action: "delete-to-line-start" },
];

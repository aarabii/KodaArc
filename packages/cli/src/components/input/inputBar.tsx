import { useRef, useCallback, useEffect } from "react";
import type { TextareaRenderable } from "@opentui/core";
import { useRenderer, useKeyboard, usePaste } from "@opentui/react";
import { decodePasteBytes } from "@opentui/core";
import type { KeyBinding } from "@opentui/core";
import { EmptyBorder } from "../common";
import { StatusBar } from "../feedback";
import { CommandMenu } from "../commandPalette";
import { useNavigate } from "react-router";
import type { CommandType } from "../commandPalette/types";
import {
  useClipboard,
  useToast,
  useDialog,
  useKeyboardLayer,
  useTheme,
  useCommandMenu,
  usePromptConfig,
} from "../../hooks";
import { AgentState } from "@koda-arc/database/enums";

type InputBarProps = {
  onSubmit: (text: string) => void;
  disabled?: boolean;
};

const placeholderValues = [
  "What are we building today?",
  "Drop your idea, KodaArc handles the rest",
  "Describe a feature, bug, or idea...",
  "What do you want to ship today?",
  "// start with a prompt, end with production code",
  "Arc your next idea...",
  "Fix a bug, build a feature, refactor a mess",
  "What problem are we solving?",
  "Paste an error, describe a feature, or just start typing",
  "What does your codebase need today?",
];

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

export function InputBar({ onSubmit, disabled = false }: InputBarProps) {
  const { agentState, toggleAgentState, setAgentState, setModel } = usePromptConfig();
  const { paste: getClipboardText } = useClipboard();
  const { colors } = useTheme();
  const placeholderTxt =
    placeholderValues[Math.floor(Math.random() * placeholderValues.length)];

  const textareaRef = useRef<TextareaRenderable>(null);
  const onSubmitRef = useRef<() => void>(() => {});
  const renderer = useRenderer();
  const toast = useToast();
  const dialog = useDialog();
  const nav = useNavigate();
  const { isTopLayer, setResponder } = useKeyboardLayer();

  const {
    showCommandMenu,
    commandQuery,
    commandIdx,
    scrollRef,
    handleContentChange,
    resolveCommand,
    setSelectedCommandIdx,
  } = useCommandMenu();

  const handleCommandExecute = useCallback((idx: number) => {
    const cmd = resolveCommand(idx);
    if (cmd) {
      handleCommand(cmd);
    }
  }, []);

  const handleTxtAreaCntChange = useCallback(() => {
    const txtarea = textareaRef.current;
    if (!txtarea) return;

    handleContentChange(txtarea.plainText);
  }, []);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    const txtarea = textareaRef.current;
    if (!txtarea) return;

    const txt = txtarea.plainText.trim();
    if (txt.length === 0) return;

    onSubmit(txt);
    txtarea.setText("");
  }, [disabled, onSubmit]);

  const handleCommand = useCallback(
    (command: CommandType | undefined) => {
      const txtarea = textareaRef.current;
      if (!txtarea || !command) return;

      txtarea.setText("");

      if (command.action) {
        command.action({
          exit: () => renderer.destroy(),
          toast,
          dialog,
          nav,
          agentState,
          setAgentState,
          setModel,
        });
      } else {
        txtarea.insertText(command.value + " ");
      }
    },
    [renderer, toast, dialog, nav, agentState, setAgentState, setModel],
  );

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.onSubmit = () => {
      onSubmitRef.current();
    };
  }, []);

  onSubmitRef.current = () => {
    if (disabled) return;

    if (showCommandMenu) {
      const command = resolveCommand(commandIdx);
      if (command) {
        handleCommand(command);
      }
      return;
    }

    handleSubmit();
  };

  useKeyboard((key) => {
    if (disabled) return;
    if (!isTopLayer("base")) return;

    if (key.name == "tab") {
      key.preventDefault();
      toggleAgentState();
    }

    // Ctrl+V: paste from internal clipboard into the textarea
    if (key.ctrl && key.name === "v") {
      key.preventDefault();
      const txtarea = textareaRef.current;
      if (!txtarea) return;

      const clipboardText = getClipboardText();
      if (clipboardText.length > 0) {
        txtarea.insertText(clipboardText);
      }
    }
  });

  // Handle system bracketed paste events (terminal paste)
  usePaste((event) => {
    if (disabled) return;
    if (!isTopLayer("base")) return;

    const txtarea = textareaRef.current;
    if (!txtarea) return;

    const text = decodePasteBytes(event.bytes);
    if (text.length > 0) {
      event.preventDefault();
      txtarea.insertText(text);
    }
  });

  useEffect(() => {
    setResponder("base", () => {
      if (disabled) return false;
      const txtarea = textareaRef.current;

      if (txtarea && txtarea.plainText.length > 0) {
        txtarea.setText("");
        return true;
      }

      return false;
    });

    return () => setResponder("base", null);
  }, [disabled, setResponder]);

  return (
    <box width="100%" alignItems="center">
      <box
        border={["left"]}
        borderColor={
          agentState == AgentState.BUILD
            ? colors.agent.build
            : colors.agent.plan
        }
        width="100%"
        customBorderChars={{
          ...EmptyBorder,
          vertical: "┃",
          bottomLeft: "╹",
        }}
      >
        <box
          position="relative"
          justifyContent="center"
          paddingX={2}
          paddingY={1}
          backgroundColor={colors.bg.surface}
          width="100%"
          gap={1}
        >
          {showCommandMenu && (
            <box
              position="absolute"
              bottom="100%"
              left={0}
              width="100%"
              backgroundColor={colors.bg.elevated}
              zIndex={10}
            >
              <CommandMenu
                q={commandQuery}
                selectedIdx={commandIdx}
                scrollRef={scrollRef}
                onSelect={setSelectedCommandIdx}
                onExecute={handleCommandExecute}
              />
            </box>
          )}
          <textarea
            ref={textareaRef}
            onContentChange={handleTxtAreaCntChange}
            focused={(!disabled && isTopLayer("base")) || isTopLayer("command")}
            keyBindings={TEXT_AREA_KEY_BINDINGS}
            placeholder={placeholderTxt}
          />
          <StatusBar />
        </box>
      </box>
    </box>
  );
}

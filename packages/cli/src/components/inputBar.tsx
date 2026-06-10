import { useRef, useCallback, useEffect } from "react";
import type { TextareaRenderable } from "@opentui/core";
import { useRenderer } from "@opentui/react";
import type { KeyBinding } from "@opentui/core";
import { EmptyBorder } from "./border";
import { StatusBar } from "./statusbar";
import { CommandMenu } from "./commands";
import type { CommandType } from "./commands/type";
import { useCommandMenu } from "./commands/useCommandMenu";
import { useToast } from "../providers/toast";
import { useDialog } from "../providers/dialog";
import { useKeyboardLayer } from "../providers/keyboardLayer";

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
  { name: "return", action: "submit" },
  { name: "enter", action: "submit" },
  { name: "return", shift: true, action: "newline" },
  { name: "enter", shift: true, action: "newline" },
];

export function InputBar({ onSubmit, disabled = false }: InputBarProps) {
  const placeholderTxt =
    placeholderValues[Math.floor(Math.random() * placeholderValues.length)];

  const textareaRef = useRef<TextareaRenderable>(null);
  const onSubmitRef = useRef<() => void>(() => {});
  const renderer = useRenderer();
  const toast = useToast();
  const dialog = useDialog();
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
        });
      } else {
        txtarea.insertText(command.value + " ");
      }
    },
    [renderer, toast],
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
        borderColor="cyan"
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
          backgroundColor="#001219"
          width="100%"
          gap={1}
        >
          {showCommandMenu && (
            <box
              position="absolute"
              bottom="100%"
              left={0}
              width="100%"
              backgroundColor="#1A1A24"
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

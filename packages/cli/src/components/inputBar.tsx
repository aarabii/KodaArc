import type { KeyBinding } from "@opentui/core";
import { EmptyBorder } from "./border";
import { StatusBar } from "./statusbar";

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
          <textarea
            focused={!disabled}
            keyBindings={TEXT_AREA_KEY_BINDINGS}
            placeholder={placeholderTxt}
          />
          <StatusBar />
        </box>
      </box>
    </box>
  );
}

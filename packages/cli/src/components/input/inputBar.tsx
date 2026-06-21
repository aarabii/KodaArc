import { useState, useRef, useCallback, useEffect } from "react";
import {
  TextAttributes,
  decodePasteBytes,
  type TextareaRenderable,
  type ScrollBoxRenderable,
} from "@opentui/core";
import { useRenderer, useKeyboard, usePaste } from "@opentui/react";
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
import { TEXT_AREA_KEY_BINDINGS } from "./keybindings";
import {
  type MentionMatch,
  type MentionCandidate,
  findActiveMention,
  getMentionCandidates,
  FileMentionMenu,
} from "./mentions";

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

export function InputBar({ onSubmit, disabled = false }: InputBarProps) {
  const { agentState, toggleAgentState, setAgentState, setModel } =
    usePromptConfig();
  const { paste: getClipboardText } = useClipboard();
  const { colors } = useTheme();
  const [placeholderTxt] = useState(
    () => placeholderValues[Math.floor(Math.random() * placeholderValues.length)]
  );

  const textareaRef = useRef<TextareaRenderable>(null);
  const onSubmitRef = useRef<() => void>(() => {});
  const activeMentionRef = useRef<MentionMatch | null>(null);
  const mentionScrollRef = useRef<ScrollBoxRenderable>(null);
  const [activeMention, setActiveMention] = useState<MentionMatch | null>(null);
  const [mentionCandidates, setMentionCandidates] = useState<
    MentionCandidate[]
  >([]);
  const [mentionSelectedIndex, setMentionSelectedIndex] = useState(0);
  const renderer = useRenderer();
  const toast = useToast();
  const dialog = useDialog();
  const nav = useNavigate();
  const { isTopLayer, setResponder, pop, push } = useKeyboardLayer();

  const {
    showCommandMenu,
    commandQuery,
    commandIdx,
    scrollRef,
    handleContentChange,
    resolveCommand,
    setSelectedCommandIdx,
  } = useCommandMenu();

  const showMentionMenu = activeMention !== null;
  const closeMentionMenu = useCallback(() => {
    activeMentionRef.current = null;
    setActiveMention(null);
    setMentionCandidates([]);
    pop("mention");
  }, [pop]);
  const syncMentionMenu = useCallback(
    (text: string, cursorOffset: number) => {
      const nextMention = findActiveMention(text, cursorOffset);
      const previousMention = activeMentionRef.current;
      const mentionChanged =
        previousMention?.start !== nextMention?.start ||
        previousMention?.end !== nextMention?.end ||
        previousMention?.query !== nextMention?.query;
      if (!nextMention) {
        if (previousMention) {
          closeMentionMenu();
        }
        return;
      }
      activeMentionRef.current = nextMention;
      setActiveMention(nextMention);
      push("mention", () => {
        closeMentionMenu();
        return true;
      });
      if (mentionChanged) {
        setMentionSelectedIndex(0);
        mentionScrollRef.current?.scrollTo(0);
      }
    },
    [closeMentionMenu, push],
  );

  const handleCommandExecute = useCallback((idx: number) => {
    const cmd = resolveCommand(idx);
    if (cmd) {
      handleCommand(cmd);
    }
  }, []);

  const handleTxtAreaCntChange = useCallback(() => {
    const txtarea = textareaRef.current;
    if (!txtarea) return;

    const text = txtarea.plainText;

    handleContentChange(txtarea.plainText);
    syncMentionMenu(text, txtarea.cursorOffset);
  }, [handleContentChange, syncMentionMenu]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    const txtarea = textareaRef.current;
    if (!txtarea) return;

    const txt = txtarea.plainText.trim();
    if (txt.length === 0) return;

    onSubmit(txt);
    txtarea.setText("");
  }, [disabled, onSubmit]);

  const handleMentionExecute = useCallback(
    (index: number) => {
      const textarea = textareaRef.current;
      const mention = activeMentionRef.current;
      const candidate = mentionCandidates[index];
      if (!textarea || !mention || !candidate) return;
      const insertion =
        candidate.kind === "dir" ? candidate.path : `${candidate.path} `;
      const nextText = `${textarea.plainText.slice(0, mention.start)}@${insertion}${textarea.plainText.slice(mention.end)}`;
      textarea.replaceText(nextText);
      textarea.cursorOffset = mention.start + insertion.length + 1;
      syncMentionMenu(nextText, textarea.cursorOffset);
    },
    [mentionCandidates, syncMentionMenu],
  );
  const handleTextareaCursorChange = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    syncMentionMenu(textarea.plainText, textarea.cursorOffset);
  }, [syncMentionMenu]);

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
    if (!activeMention) {
      setMentionCandidates([]);
      return;
    }
    let ignore = false;
    const loadCandidates = async () => {
      const nextCandidates = await getMentionCandidates(activeMention.query);
      if (ignore) return;
      setMentionCandidates(nextCandidates);
      setMentionSelectedIndex((currentIndex) => {
        if (nextCandidates.length === 0) {
          return 0;
        }
        return Math.min(currentIndex, nextCandidates.length - 1);
      });
    };
    void loadCandidates();
    return () => {
      ignore = true;
    };
  }, [activeMention]);

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

    if (showMentionMenu) {
      const candidate = mentionCandidates[mentionSelectedIndex];
      if (candidate) {
        handleMentionExecute(mentionSelectedIndex);
        return;
      }
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

  useKeyboard((key) => {
    if (disabled) return;
    if (!showMentionMenu || !isTopLayer("mention")) return;
    if (key.name === "escape") {
      key.preventDefault();
      closeMentionMenu();
    } else if (key.name === "up") {
      key.preventDefault();
      setMentionSelectedIndex((currentIndex) => {
        const nextIndex = Math.max(0, currentIndex - 1);
        const scrollbox = mentionScrollRef.current;
        if (scrollbox && nextIndex < scrollbox.scrollTop) {
          scrollbox.scrollTo(nextIndex);
        }
        return nextIndex;
      });
    } else if (key.name === "down") {
      key.preventDefault();
      setMentionSelectedIndex((currentIndex) => {
        if (mentionCandidates.length === 0) {
          return 0;
        }
        const nextIndex = Math.min(
          mentionCandidates.length - 1,
          currentIndex + 1,
        );
        const scrollbox = mentionScrollRef.current;
        if (scrollbox) {
          const viewportHeight = scrollbox.viewport.height;
          const visibleEnd = scrollbox.scrollTop + viewportHeight - 1;
          if (nextIndex > visibleEnd) {
            scrollbox.scrollTo(nextIndex - viewportHeight + 1);
          }
        }
        return nextIndex;
      });
    }
  });

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
          {!showCommandMenu && showMentionMenu && (
            <box
              position="absolute"
              bottom="100%"
              left={0}
              width="100%"
              backgroundColor={colors.bg.elevated}
              zIndex={10}
            >
              <FileMentionMenu
                candidates={mentionCandidates}
                selectedIndex={mentionSelectedIndex}
                scrollRef={mentionScrollRef}
                onSelect={setMentionSelectedIndex}
                onExecute={handleMentionExecute}
              />
            </box>
          )}
          <textarea
            ref={textareaRef}
            onContentChange={handleTxtAreaCntChange}
            focused={
              !disabled &&
              (isTopLayer("base") ||
                isTopLayer("command") ||
                isTopLayer("mention"))
            }
            keyBindings={TEXT_AREA_KEY_BINDINGS}
            placeholder={placeholderTxt}
          />
          <StatusBar />
        </box>
      </box>
    </box>
  );
}

import { useState } from "react";
import { EmptyBorder, Spinner, Icon, type IconName } from "../common";
import { useTheme } from "../../hooks";
import type { ClientMessagePart, ClientToolCallPart } from "../../hooks/types";
import { AgentState } from "@koda-arc/database/enums";


import { TextAttributes } from "@opentui/core";

type Props = {
  parts: ClientMessagePart[];
  model: string;
  agentState: AgentState;
  duration?: string;
  streaming?: boolean;
  interrupted?: boolean;
};

function formatToolName(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

function formatToolArgs(tc: ClientToolCallPart): string {
  return Object.values(tc.args).map(String).join(" ");
}

function getToolIconName(name: string): IconName {
  const lower = name.toLowerCase();
  if (lower.includes("read") || lower.includes("view")) {
    return "FileText";
  }
  if (
    lower.includes("write") ||
    lower.includes("replace") ||
    lower.includes("edit") ||
    lower.includes("patch")
  ) {
    return "PenTool";
  }
  if (
    lower.includes("command") ||
    lower.includes("execute") ||
    lower.includes("run")
  ) {
    return "Terminal";
  }
  if (lower.includes("list") || lower.includes("dir")) {
    return "Folder";
  }
  if (
    lower.includes("search") ||
    lower.includes("grep") ||
    lower.includes("find")
  ) {
    return "Search";
  }
  if (lower.includes("agent") || lower.includes("invoke")) {
    return "Users";
  }
  if (
    lower.includes("ask") ||
    lower.includes("question") ||
    lower.includes("permission")
  ) {
    return "HelpCircle";
  }
  return "Wrench";
}


type PartGroup = {
  type: ClientMessagePart["type"];
  parts: ClientMessagePart[];
  key: string;
};

function groupConsecutiveParts(parts: ClientMessagePart[]): PartGroup[] {
  const groups: PartGroup[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]!;
    const lastGroup = groups[groups.length - 1];

    if (lastGroup && lastGroup.type === part.type) {
      lastGroup.parts.push(part);
    } else {
      const key =
        part.type === "tool_call"
          ? `group-tc-${part.id}`
          : `group-${part.type}-${i}`;
      groups.push({ type: part.type, parts: [part], key });
    }
  }

  return groups;
}

function renderFormattedText(text: string, colors: any, dimNormalText = false) {
  const TOKEN_REGEX = /(\*\*.*?\*\*|__.*?__|`.*?`|"[^"]+?"|\*.*?\*|_.*?_)/g;
  const tokens = text.split(TOKEN_REGEX);

  return tokens.map((token, index) => {
    if (token.startsWith("**") && token.endsWith("**")) {
      return (
        <span key={index} attributes={TextAttributes.BOLD}>
          {token.slice(2, -2)}
        </span>
      );
    }
    if (token.startsWith("__") && token.endsWith("__")) {
      return (
        <span key={index} attributes={TextAttributes.BOLD}>
          {token.slice(2, -2)}
        </span>
      );
    }
    if (token.startsWith("*") && token.endsWith("*")) {
      return (
        <span key={index} attributes={TextAttributes.ITALIC | (dimNormalText ? TextAttributes.DIM : 0)}>
          {token.slice(1, -1)}
        </span>
      );
    }
    if (token.startsWith("_") && token.endsWith("_")) {
      return (
        <span key={index} attributes={TextAttributes.ITALIC | (dimNormalText ? TextAttributes.DIM : 0)}>
          {token.slice(1, -1)}
        </span>
      );
    }
    if (token.startsWith("`") && token.endsWith("`")) {
      return (
        <span key={index} fg={colors.agent.build}>
          {token.slice(1, -1)}
        </span>
      );
    }
    if (token.startsWith('"') && token.endsWith('"')) {
      return (
        <span key={index} fg={colors.brand.primary} attributes={TextAttributes.BOLD}>
          {token}
        </span>
      );
    }
    return (
      <span key={index} attributes={dimNormalText ? TextAttributes.DIM : 0}>
        {token}
      </span>
    );
  });
}

export function BotMessage({
  parts,
  model,
  agentState,
  duration,
  streaming = false,
  interrupted = false,
}: Props) {
  const { colors } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <box width="100%" alignItems="center">
      {groupConsecutiveParts(parts).map((group) => (
        <box key={group.key} paddingY={1} width="100%">
          {group.parts.map((part, j) => {
            if (part.type === "reasoning") {
              const isRunning = streaming && part === parts[parts.length - 1];

              if (!isExpanded) {
                return (
                  <box key={`reasoning-${j}`} flexDirection="row" gap={1} alignItems="center">
                    {isRunning ? (
                      <Spinner agentState={agentState} />
                    ) : (
                      <Icon name="Sparkles" fg={colors.agent.thinking} />
                    )}
                    <text
                      fg={colors.agent.thinking}
                      attributes={TextAttributes.UNDERLINE}
                      onMouseDown={() => setIsExpanded(true)}
                    >
                      Click here to see the thinking
                    </text>
                  </box>
                );
              }

              return (
                <box key={`reasoning-${j}`} flexDirection="column" gap={1} width="100%">
                  <box flexDirection="row" gap={1} alignItems="center">
                    {isRunning ? (
                      <Spinner agentState={agentState} />
                    ) : (
                      <Icon name="Sparkles" fg={colors.agent.thinking} />
                    )}
                    <text fg={colors.agent.thinking} attributes={TextAttributes.BOLD}>
                      Thinking:
                    </text>
                  </box>

                  <box
                    border={["left"]}
                    borderColor={colors.agent.thinking}
                    customBorderChars={{
                      ...EmptyBorder,
                      vertical: "│",
                    }}
                    width="100%"
                    paddingX={2}
                  >
                    <text>{renderFormattedText(part.text, colors, true)}</text>
                  </box>

                  <box paddingLeft={2}>
                    <text
                      fg={colors.agent.thinking}
                      attributes={TextAttributes.DIM | TextAttributes.UNDERLINE}
                      onMouseDown={() => setIsExpanded(false)}
                    >
                      [Hide thinking]
                    </text>
                  </box>
                </box>
              );
            }

            if (part.type === "tool_call") {
              return (
                <box
                  key={part.id}
                  border={["left"]}
                  borderColor={colors.agent.thinking}
                  customBorderChars={{
                    ...EmptyBorder,
                    vertical: "│",
                  }}
                  width="100%"
                  paddingX={2}
                  flexDirection="row"
                  gap={1}
                  alignItems="center"
                >
                  <Icon
                    name={getToolIconName(part.name)}
                    fg={colors.agent.build}
                  />
                  <text attributes={TextAttributes.DIM}>
                    <em fg={colors.agent.build}>
                      {formatToolName(part.name)}:
                    </em>{" "}
                    {formatToolArgs(part)}
                    {part.status === "calling" ? " …" : ""}
                  </text>
                </box>
              );
            }

            if (part.type === "text") {
              return (
                <box key={`text-${j}`} paddingX={3} width="100%">
                  <text>{renderFormattedText(part.text, colors, false)}</text>
                </box>
              );
            }

            return null;
          })}
        </box>
      ))}

      <box paddingX={3} paddingBottom={1} gap={1} width="100%">
        <box flexDirection="row" gap={2} alignItems="center">
          {interrupted ? (
            <Icon name="AlertTriangle" fg={colors.toast.error.accent} />
          ) : agentState === AgentState.PLAN ? (
            <Icon name="Compass" fg={colors.agent.plan} />
          ) : (
            <Icon name="Hammer" fg={colors.agent.build} />
          )}

          <box flexDirection="row" gap={1} alignItems="center">
            <text attributes={interrupted ? TextAttributes.DIM : 0}>
              {agentState === AgentState.PLAN ? "Plan" : "Build"}
            </text>

            <text attributes={TextAttributes.DIM} fg={colors.agent.thinking}>
              ›
            </text>
            <text attributes={TextAttributes.DIM}>{model}</text>
            {(duration || interrupted) && (
              <>
                <text attributes={TextAttributes.DIM} fg={colors.agent.thinking}>
                  ›
                </text>
                <text attributes={TextAttributes.DIM}>
                  {interrupted ? "interrupted" : duration}
                </text>
              </>
            )}
          </box>
        </box>
      </box>
    </box>
  );
}

import { useState } from "react";
import { EmptyBorder, Spinner } from "../common";
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

function renderFormattedText(text: string, colors: any) {
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
        <span key={index} attributes={TextAttributes.ITALIC | TextAttributes.DIM}>
          {token.slice(1, -1)}
        </span>
      );
    }
    if (token.startsWith("_") && token.endsWith("_")) {
      return (
        <span key={index} attributes={TextAttributes.ITALIC | TextAttributes.DIM}>
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
      <span key={index} attributes={TextAttributes.DIM}>
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
                      <text fg={colors.agent.thinking}>✔</text>
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
                      <text fg={colors.agent.thinking}>✔</text>
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
                    <text>{renderFormattedText(part.text, colors)}</text>
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
                >
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
                  <text>{part.text}</text>
                </box>
              );
            }

            return null;
          })}
        </box>
      ))}

      <box paddingX={3} paddingBottom={1} gap={1} width="100%">
        <box flexDirection="row" gap={2}>
          <text
            attributes={interrupted ? TextAttributes.DIM : 0}
            fg={
              interrupted
                ? undefined
                : agentState === AgentState.PLAN
                  ? colors.agent.plan
                  : colors.brand.primary
            }
          >
            ◉
          </text>

          <box flexDirection="row" gap={1}>
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

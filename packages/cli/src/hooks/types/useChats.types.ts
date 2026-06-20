import type { ClientResponse } from "hono/client";
import type { AgentState } from "@koda-arc/database/enums";
import type { SupportedChatModelId } from "@koda-arc/shared";

export type ClientToolCallPart = {
  type: "tool_call";
  id: string;
  name: string;
  args: Record<string, unknown>;
  result?: string;
  status: "calling" | "done";
};

export type ClientMessagePart =
  | { type: "reasoning"; text: string }
  | ClientToolCallPart
  | { type: "text"; text: string };

export type Message =
  | {
      id: string;
      role: "user";
      content: string;
      agentState: AgentState;
      model: SupportedChatModelId;
    }
  | {
      id: string;
      role: "assistant";
      content: string;
      agentState: AgentState;
      model: SupportedChatModelId;
      parts: ClientMessagePart[];
      duration?: string;
      interrupted?: boolean;
    }
  | { id: string; role: "error"; content: string };

export type StreamingState =
  | { status: "idle" }
  | {
      status: "streaming";
      parts: ClientMessagePart[];
      agentState: AgentState;
      model: SupportedChatModelId;
    };

export type ActiveStream = {
  requestId: string;
  controller: AbortController;
  agentState: AgentState;
  model: SupportedChatModelId;
  parts: ClientMessagePart[];
  interruptedCaptured: boolean;
};

export type SubmitParams = {
  userText: string;
  agentState: AgentState;
  model: SupportedChatModelId;
};

export type RunStreamParams = {
  agentState: AgentState;
  model: SupportedChatModelId;
  request: (controller: AbortController) => Promise<ClientResponse<unknown>>;
};

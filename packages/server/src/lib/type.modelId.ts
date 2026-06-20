import type { SupportedChatModel } from "@koda-arc/shared";

export type AnthropicModelId = Extract<
  SupportedChatModel,
  { provider: "anthropic" }
>["id"];

export type OpenAIModelId = Extract<
  SupportedChatModel,
  { provider: "openai" }
>["id"];

export type GoogleModelId = Extract<
  SupportedChatModel,
  { provider: "google" }
>["id"];

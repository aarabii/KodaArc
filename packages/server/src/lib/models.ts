import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";

import {
  findSupportedChatModelById,
  type SupportedChatModel,
  type SupportedChatModelId,
  type SupportedProvider,
} from "@koda-arc/shared";
import type { LanguageModel } from "ai";

type AnthropicModelId = Extract<
  SupportedChatModel,
  { provider: "anthropic" }
>["id"];
type OpenAIModelId = Extract<SupportedChatModel, { provider: "openai" }>["id"];
type GoogleModelId = Extract<SupportedChatModel, { provider: "google" }>["id"];

export type ResolveModel = {
  model: LanguageModel;
  provider: SupportedProvider;
  modelID: SupportedChatModelId;
};

function assertUnsupportedProvider(provider: never): never {
  throw new Error(`Unsupported provider: ${provider}`);
}

function resolveAnthropicModel(modelID: AnthropicModelId): ResolveModel {
  return {
    model: anthropic(modelID),
    provider: "anthropic",
    modelID,
  };
}

function resolveOpenAIModel(modelID: OpenAIModelId): ResolveModel {
  return {
    model: openai(modelID),
    provider: "openai",
    modelID,
  };
}

function resolveGoogleModel(modelID: GoogleModelId): ResolveModel {
  return {
    model: google(modelID),
    provider: "google",
    modelID,
  };
}

function resolveSupportedChatModel(model: SupportedChatModel): ResolveModel {
  const provider = model.provider;

  switch (provider) {
    case "anthropic":
      return resolveAnthropicModel(model.id);
    case "openai":
      return resolveOpenAIModel(model.id);
    case "google":
      return resolveGoogleModel(model.id);
    default:
      return assertUnsupportedProvider(provider);
  }
}

export function isSupportedModel(
  modelId: string,
): modelId is SupportedChatModelId {
  return findSupportedChatModelById(modelId) != null;
}

export function resolveChatModel(modelId: string): ResolveModel {
  const model = findSupportedChatModelById(modelId);

  if (!model) {
    throw new Error(`Unsupported model: ${modelId}`);
  }

  return resolveSupportedChatModel(model);
}

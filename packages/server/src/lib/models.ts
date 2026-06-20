import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import type { ProviderOptions } from "@ai-sdk/provider-utils";
import {
  findSupportedChatModelById,
  type SupportedChatModel,
  type SupportedChatModelId,
  type SupportedProvider,
} from "@koda-arc/shared";
import type { LanguageModel } from "ai";
import type {
  AnthropicModelId,
  OpenAIModelId,
  GoogleModelId,
} from "./type.modelId";
import {
  ANTHROPIC_PROVIDER_OPTIONS,
  GOOGLE_PROVIDER_OPTIONS,
  OPEN_AI_PROVIDER_OPTIONS,
} from "./providerOptions";

export type ResolveModel = {
  model: LanguageModel;
  provider: SupportedProvider;
  modelID: SupportedChatModelId;
  providerOptions?: ProviderOptions;
};

function assertUnsupportedProvider(provider: never): never {
  throw new Error(`Unsupported provider: ${provider}`);
}

function resolveAnthropicModel(modelID: AnthropicModelId): ResolveModel {
  return {
    model: anthropic(modelID),
    provider: "anthropic",
    modelID,
    providerOptions: ANTHROPIC_PROVIDER_OPTIONS[modelID],
  };
}

function resolveOpenAIModel(modelID: OpenAIModelId): ResolveModel {
  return {
    model: openai(modelID),
    provider: "openai",
    modelID,
    providerOptions: OPEN_AI_PROVIDER_OPTIONS[modelID],
  };
}

function resolveGoogleModel(modelID: GoogleModelId): ResolveModel {
  return {
    model: google(modelID),
    provider: "google",
    modelID,
    providerOptions: GOOGLE_PROVIDER_OPTIONS[modelID],
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

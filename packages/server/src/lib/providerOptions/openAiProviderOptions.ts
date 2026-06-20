import type { ProviderOptions } from "@ai-sdk/provider-utils";
import type { OpenAIModelId } from "../type.modelId";

export const OPEN_AI_PROVIDER_OPTIONS: Partial<
  Record<OpenAIModelId, ProviderOptions>
> = {
  "gpt-5.4": {
    openai: {
      reasoningEffort: "high",
    },
  },
  "gpt-5.4-mini": {
    openai: {
      reasoningEffort: "medium",
    },
  },
};

import type { ProviderOptions } from "@ai-sdk/provider-utils";
import type { GoogleModelId } from "../type.modelId";

export const GOOGLE_PROVIDER_OPTIONS: Partial<
  Record<GoogleModelId, ProviderOptions>
> = {
  "gemini-3.5-flash": {
    google: {
      thinkingConfig: {
        thinkingLevel: "high",
        includeThoughts: true,
      },
    },
  },
  "gemini-2.5-flash": {
    google: {
      thinkingConfig: {
        thinkingBudget: 1024,
        includeThoughts: true,
      },
    },
  },
};

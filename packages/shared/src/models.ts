export type ModelPricing = {
  inputUSDperMillionTokens: number;
  outputUSDperMillionTokens: number;
};

export type SupportedProvider = "openai" | "anthropic" | "google";

type SupportedChatModelDefinition = {
  id: string;
  provider: SupportedProvider;
  pricing: ModelPricing;
};

export const SUPPORTED_CHAT_MODELS = [
  {
    id: "claude-sonnet-4-6",
    provider: "anthropic",
    pricing: {
      inputUSDperMillionTokens: 3,
      outputUSDperMillionTokens: 15,
    },
  },
  {
    id: "claude-haiku-4-5",
    provider: "anthropic",
    pricing: {
      inputUSDperMillionTokens: 1,
      outputUSDperMillionTokens: 5,
    },
  },
  {
    id: "claude-opus-4-6",
    provider: "anthropic",
    pricing: {
      inputUSDperMillionTokens: 5,
      outputUSDperMillionTokens: 25,
    },
  },
  {
    id: "gpt-5.4",
    provider: "openai",
    pricing: {
      inputUSDperMillionTokens: 2.5,
      outputUSDperMillionTokens: 15,
    },
  },
  {
    id: "gpt-5.4-mini",
    provider: "openai",
    pricing: {
      inputUSDperMillionTokens: 0.75,
      outputUSDperMillionTokens: 4.5,
    },
  },
  {
    id: "gpt-5.4-nano",
    provider: "openai",
    pricing: {
      inputUSDperMillionTokens: 0.2,
      outputUSDperMillionTokens: 1.25,
    },
  },
  {
    id: "gemini-3.5-flash",
    provider: "google",
    pricing: {
      inputUSDperMillionTokens: 1.5,
      outputUSDperMillionTokens: 9,
    },
  },
  {
    id: "gemini-3.1-flash-lite",
    provider: "google",
    pricing: {
      inputUSDperMillionTokens: 0.25,
      outputUSDperMillionTokens: 1.5,
    },
  },
  {
    id: "gemini-3.1-flash-live-preview",
    provider: "google",
    pricing: {
      inputUSDperMillionTokens: 0.75,
      outputUSDperMillionTokens: 4.5,
    },
  },
] as const satisfies readonly SupportedChatModelDefinition[];

export type SupportedChatModel = (typeof SUPPORTED_CHAT_MODELS)[number];
export type SupportedChatModelId = SupportedChatModel["id"];

export function findSupportedChatModelById(
  modelId: string,
): SupportedChatModel | undefined {
  return SUPPORTED_CHAT_MODELS.find((model) => model.id === modelId);
}

export const DEFAULT_CHAT_MODEL_ID: SupportedChatModelId =
  SUPPORTED_CHAT_MODELS[0].id;

# AI Models & Provider Configuration

> How KodaArc resolves model IDs to live AI providers, what extended thinking options are configured, and how to add new models.

---

## Model Registry

All supported models are defined in `@koda-arc/shared` at `packages/shared/src/constants/availableModels.ts`. This single registry is the source of truth consumed by both the server (for model resolution) and the CLI (for model selection UI).

Each model entry contains:

```ts
type SupportedChatModelDefinition = {
  id: string;              // Unique identifier used in API requests and DB storage
  provider: SupportedProvider;  // "anthropic" | "openai" | "google"
  pricing: ModelPricing;   // Token pricing for display purposes
};
```

### Currently Registered Models

| Model ID | Provider | Input $/1M tokens | Output $/1M tokens | Extended Thinking |
| -------- | -------- | ------------------ | ------------------- | ----------------- |
| `claude-sonnet-4-6` | Anthropic | $3.00 | $15.00 | ✅ (10K token budget) |
| `claude-haiku-4-5` | Anthropic | $1.00 | $5.00 | — |
| `claude-opus-4-6` | Anthropic | $5.00 | $25.00 | ✅ (10K token budget) |
| `gpt-5.4` | OpenAI | $2.50 | $15.00 | Reasoning: `high` |
| `gpt-5.4-mini` | OpenAI | $0.75 | $4.50 | Reasoning: `medium` |
| `gpt-5.4-nano` | OpenAI | $0.20 | $1.25 | — |
| `gemini-3.5-flash` | Google | $1.50 | $9.00 | Thinking: `high` |
| `gemini-3.1-flash-lite` | Google | $0.25 | $1.50 | — |
| `gemini-3.1-flash-live-preview` | Google | $0.75 | $4.50 | — |
| `gemini-2.5-flash` | Google | Free | Free | Thinking: 1024 token budget |

The **default model** is `gemini-2.5-flash`.

---

## Model Resolution Pipeline

When a chat request arrives at the server, the model ID goes through a multi-step resolution:

```
model ID (string)
  │
  ▼
findSupportedChatModelById()    ← @koda-arc/shared
  │  Returns: SupportedChatModel | undefined
  ▼
resolveSupportedChatModel()     ← @koda-arc/server/lib/models.ts
  │  Dispatches by provider to:
  │    resolveAnthropicModel()  → anthropic(modelID) from @ai-sdk/anthropic
  │    resolveOpenAIModel()     → openai(modelID) from @ai-sdk/openai
  │    resolveGoogleModel()     → google(modelID) from @ai-sdk/google
  │
  ▼
ResolveModel {
  model: LanguageModel,          // Vercel AI SDK model instance
  provider: SupportedProvider,   // Provider name
  modelID: SupportedChatModelId, // Original model ID
  providerOptions?: ProviderOptions  // Per-model configuration
}
```

The resolution uses an **exhaustive switch** with `assertUnsupportedProvider()` to ensure every provider variant is handled at compile time.

---

## Provider Options

Provider-specific options are defined in `packages/server/src/lib/providerOptions/` and keyed by model ID. These options are passed to the Vercel AI SDK's `streamText()` call.

### Anthropic

```ts
// packages/server/src/lib/providerOptions/anthropicProviderOptions.ts
{
  "claude-opus-4-6": {
    anthropic: {
      thinking: { type: "enabled", budgetTokens: 10000 }
    }
  },
  "claude-sonnet-4-6": {
    anthropic: {
      thinking: { type: "enabled", budgetTokens: 10000 }
    }
  }
}
```

Extended thinking is enabled for Opus and Sonnet models with a 10,000-token thinking budget. The thinking output is streamed to the client as `reasoning-delta` SSE events and stored in message parts as `{ type: "reasoning", text: "..." }`.

### OpenAI

```ts
// packages/server/src/lib/providerOptions/openAiProviderOptions.ts
{
  "gpt-5.4": {
    openai: { reasoningEffort: "high" }
  },
  "gpt-5.4-mini": {
    openai: { reasoningEffort: "medium" }
  }
}
```

### Google

```ts
// packages/server/src/lib/providerOptions/googleProviderOptions.ts
{
  "gemini-3.5-flash": {
    google: {
      thinkingConfig: { thinkingLevel: "high", includeThoughts: true }
    }
  },
  "gemini-2.5-flash": {
    google: {
      thinkingConfig: { thinkingBudget: 1024, includeThoughts: true }
    }
  }
}
```

---

## Adding a New Model

To add a new model to KodaArc:

### 1. Register in the Model Array

Add an entry to `SUPPORTED_CHAT_MODELS` in `packages/shared/src/constants/availableModels.ts`:

```ts
{
  id: "your-new-model-id",
  provider: "anthropic",  // or "openai" or "google"
  pricing: {
    inputUSDperMillionTokens: 2.0,
    outputUSDperMillionTokens: 10.0,
  },
},
```

The `as const satisfies` pattern ensures the model ID and provider are narrowed to literal types automatically.

### 2. Add Provider Options (Optional)

If the model needs specific configuration (extended thinking, reasoning effort, etc.), add an entry in the corresponding provider options file under `packages/server/src/lib/providerOptions/`.

### 3. That's It

No other files need to change. The type system propagates the new model ID through:
- `SupportedChatModelId` (union type of all model IDs)
- `SupportedChatModel` (union of model definition objects)
- `AnthropicModelId` / `OpenAIModelId` / `GoogleModelId` (provider-specific ID types via `Extract`)
- `isSupportedModel()` validation in both routes
- `findSupportedChatModelById()` lookup function
- CLI model selection dialog

### Adding a New Provider

If you need to add an entirely new provider (e.g., Mistral):

1. Add the provider name to `SupportedProvider` in `packages/shared/src/types/models.ts`
2. Install the AI SDK provider package (e.g., `@ai-sdk/mistral`)
3. Create a `resolveMistralModel()` function in `packages/server/src/lib/models.ts`
4. Add the case to the switch in `resolveSupportedChatModel()`
5. Create a provider options file if needed
6. Add a `MistralModelId` type in `type.modelId.ts`

---

## API Key Configuration

The Vercel AI SDK automatically reads API keys from environment variables:

| Provider | Environment Variable | SDK Package |
| -------- | ------------------- | ----------- |
| Anthropic | `ANTHROPIC_API_KEY` | `@ai-sdk/anthropic` |
| OpenAI | `OPENAI_API_KEY` | `@ai-sdk/openai` |
| Google | `GOOGLE_GENERATIVE_AI_API_KEY` | `@ai-sdk/google` |

These are **not** configured in the KodaArc `.env` file — they should be set as system environment variables or in your shell profile.

---

## Tool Step Limit

The AI agent is limited to **50 tool call steps** per request via `stopWhen: stepCountIs(50)`. This prevents infinite loops where the model keeps calling tools without converging on an answer. The limit only applies when tools are available (i.e., when a `cwd` is set on the session).

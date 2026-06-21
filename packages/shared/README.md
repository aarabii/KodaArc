# @koda-arc/shared

> Cross-package types, Zod validation schemas, and the model registry shared between the CLI and server.

---

## Responsibility

This package is the **contract layer** of KodaArc. It defines the types and schemas that both the CLI and server depend on, ensuring they agree on:

1. **Model registry** — The canonical list of supported AI models with their IDs, providers, and pricing
2. **Streaming schemas** — Zod schemas for SSE event payloads and message part structures
3. **TypeScript types** — Provider types and pricing structures used across the codebase

This is a **leaf package** — it has zero workspace dependencies and is consumed by both `@koda-arc/server` and `@koda-arc/cli`.

---

## Tech Stack

| Technology | Purpose |
| ---------- | ------- |
| Zod 4.x | Runtime schema validation and type inference |
| TypeScript 5.x | Static type definitions |

---

## Internal Structure

```
src/
├── index.ts                    # Barrel export — everything public
├── types/
│   ├── index.ts                # Re-exports from models.ts
│   └── models.ts               # ModelPricing, SupportedProvider types
├── constants/
│   ├── index.ts                # Re-exports from availableModels.ts
│   └── availableModels.ts      # SUPPORTED_CHAT_MODELS array, lookup function, default model
└── schemas/
    ├── index.ts                # Re-exports from streaming.ts
    └── streaming.ts            # Zod schemas for message parts and SSE events
```

---

## Exports

Everything is exported from the package root (`@koda-arc/shared`):

### Types

| Export | Type | Description |
| ------ | ---- | ----------- |
| `SupportedProvider` | `"openai" \| "anthropic" \| "google"` | Discriminator for AI provider |
| `ModelPricing` | `{ inputUSDperMillionTokens: number; outputUSDperMillionTokens: number }` | Per-model token pricing |
| `SupportedChatModel` | Union of model definition objects | Full model metadata type |
| `SupportedChatModelId` | Union of model ID string literals | Narrowed string type for model IDs |
| `MessagePart` | Zod-inferred discriminated union | Structured message part (reasoning, tool_call, text) |
| `ChatStreamEvent` | Zod-inferred discriminated union | SSE event payload type |

### Constants

| Export | Value | Description |
| ------ | ----- | ----------- |
| `SUPPORTED_CHAT_MODELS` | `readonly` array | All registered models with IDs, providers, and pricing |
| `DEFAULT_CHAT_MODEL_ID` | `"gemini-2.5-flash"` | Default model used when none is specified |

### Functions

| Export | Signature | Description |
| ------ | --------- | ----------- |
| `findSupportedChatModelById` | `(modelId: string) => SupportedChatModel \| undefined` | Lookup a model by its ID string |

### Zod Schemas

| Export | Validates | Used By |
| ------ | --------- | ------- |
| `toolCallArgsSchema` | `Record<string, unknown>` | Server (chat route), CLI (useChats) |
| `messagePartSchema` | Single `MessagePart` | Server (parts validation) |
| `messagePartsSchema` | `MessagePart[]` | Server (DB persistence), CLI (DB message parsing) |
| `ChatStreamEventSchema` | SSE event payload | CLI (stream event parsing in useChats) |

---

## Model Registry

The `SUPPORTED_CHAT_MODELS` array uses `as const satisfies readonly SupportedChatModelDefinition[]` to get both:
- **Literal type narrowing** — model IDs are literal strings, not `string`
- **Runtime validation** — the `satisfies` clause ensures every entry matches the expected shape

Currently registered models:

| ID | Provider | Pricing (Input / Output per 1M tokens) |
| -- | -------- | --------------------------------------- |
| `claude-sonnet-4-6` | Anthropic | $3.00 / $15.00 |
| `claude-haiku-4-5` | Anthropic | $1.00 / $5.00 |
| `claude-opus-4-6` | Anthropic | $5.00 / $25.00 |
| `gpt-5.4` | OpenAI | $2.50 / $15.00 |
| `gpt-5.4-mini` | OpenAI | $0.75 / $4.50 |
| `gpt-5.4-nano` | OpenAI | $0.20 / $1.25 |
| `gemini-3.5-flash` | Google | $1.50 / $9.00 |
| `gemini-3.1-flash-lite` | Google | $0.25 / $1.50 |
| `gemini-3.1-flash-live-preview` | Google | $0.75 / $4.50 |
| `gemini-2.5-flash` | Google | Free / Free |

---

## SSE Event Schema

The `ChatStreamEventSchema` is a Zod discriminated union covering all SSE events emitted by the server:

| Event Type | Fields | Description |
| ---------- | ------ | ----------- |
| `text-delta` | `text: string` | Chunk of the model's text response |
| `reasoning-delta` | `text: string` | Chunk of the model's reasoning/thinking output |
| `tool_call` | `toolCallId, toolName, args` | Model invoked a tool |
| `tool_result` | `toolCallId, result` | Tool execution completed |
| `done` | `messageId, durationMs` | Response complete and persisted |
| `error` | `message: string` | Error during streaming |

---

## How It Connects to the System

- **Consumed by `@koda-arc/server`:** The server uses `findSupportedChatModelById()` for model validation, `messagePartsSchema` for persisting structured message parts, and `SupportedChatModel` types for model resolution.
- **Consumed by `@koda-arc/cli`:** The CLI uses `ChatStreamEventSchema` to parse incoming SSE events, `SupportedChatModelId` for type-safe model selection, and `messagePartsSchema` to parse stored message parts from the API.
- **No upstream dependencies:** This package depends only on `zod`. It does not import from any workspace package.

---

## Adding a New Model

Add an entry to the `SUPPORTED_CHAT_MODELS` array in `src/constants/availableModels.ts`. The type system will automatically propagate the new model ID through `SupportedChatModelId`, making it available in both the server's model resolver and the CLI's model picker.

import { Hono } from "hono";
import { streamSSE } from "hono/streaming";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { streamText as aiStreamText } from "ai";
import { db } from "@koda-arc/database/client";
import { Mode, MessageStatus } from "@koda-arc/database/enums";
import type { ChartStreamEvent } from "@koda-arc/shared";
import { isSupportedModel, resolveChatModel } from "../lib/models";

const submitSchema = z.object({
  message: z.string(),
  mode: z.enum(Mode),
  model: z.string().refine(isSupportedModel, "Unsupported model"),
});

const submitValidator = zValidator("json", submitSchema, (res, c) => {
  if (!res.success) {
    return c.json(
      {
        error: "Invalid request body",
      },
      400,
    );
  }
});

function buildConversationHistory(
  messages: {
    role: "USER" | "ASSISTANT" | "ERROR";
    content: string;
    status: MessageStatus;
  }[],
) {
  return messages.flatMap((m) => {
    if (m.role === "ERROR") return [];
    if (m.role === "ASSISTANT" && m.content.length === 0) return [];

    return [
      {
        role: m.role === "USER" ? ("user" as const) : ("assistant" as const),
        content: m.content,
      },
    ];
  });
}

type StreamParam = {
  sessionId: string;
  model: string;
  history: {
    role: "user" | "assistant";
    content: string;
  }[];
  mode: Mode;
  abortController: AbortController;
};

async function streamAiRes(
  stream: Parameters<Parameters<typeof streamSSE>[1]>[0],
  params: StreamParam,
) {
  const { sessionId, model, history, mode, abortController } = params;
  const startTime = Date.now();
  const resolveModel = resolveChatModel(model);
  let fullText = "";

  try {
    const res = aiStreamText({
      model: resolveModel.model,
      messages: history,
      abortSignal: abortController.signal,
    });

    for await (const part of res.fullStream) {
      if (stream.aborted) break;

      if (part.type === "text-delta") {
        fullText += part.text;

        const event: ChartStreamEvent = {
          type: "text-delta",
          text: part.text,
        };

        await stream.writeSSE({
          event: "text-delta",
          data: JSON.stringify(event),
        });
      }

      if (part.type == "error") {
        throw part.error;
      }
    }

    if (stream.aborted || abortController.signal.aborted) return;

    const elapsedMs = Date.now() - startTime;

    const assistantMessage = await db.message.create({
      data: {
        sessionId,
        role: "ASSISTANT",
        status: MessageStatus.COMPLETE,
        model,
        content: fullText,
        mode,
        duration: Math.round(elapsedMs / 1000),
      },
    });

    const doneEvent: ChartStreamEvent = {
      type: "done",
      messageId: assistantMessage.id,
      durationMs: elapsedMs,
    };

    await stream.writeSSE({ event: "done", data: JSON.stringify(doneEvent) });
  } catch (err) {
    if (abortController.signal.aborted) return;

    const message = err instanceof Error ? err.message : String(err);

    await db.message.create({
      data: {
        sessionId,
        role: "ERROR",
        status: MessageStatus.COMPLETE,
        model,
        content: message,
        mode,
      },
    });

    const errorEvent: ChartStreamEvent = {
      type: "error",
      message,
    };

    await stream.writeSSE({
      event: "error",
      data: JSON.stringify(errorEvent),
    });
  }
}

const app = new Hono()
  .post("/:sessionId/resume", async (c) => {
    const sessionId = c.req.param("sessionId");

    const session = await db.session.findUnique({
      where: { id: sessionId },
      include: { messages: { orderBy: { createdAt: "asc" } } },
    });

    if (!session) return c.json({ error: "Session not found" }, 404);

    const lastMessage = session.messages[session.messages.length - 1];

    if (!lastMessage || lastMessage.role !== "USER") {
      return c.json(
        { error: "Session has no pending user message to resume" },
        409,
      );
    }

    if (!isSupportedModel(lastMessage.model)) {
      return c.json(
        { error: `Session uses unsupported model: ${lastMessage.model}` },
        409,
      );
    }

    const history = buildConversationHistory(session.messages);
    const abortController = new AbortController();

    return streamSSE(
      c,
      async (stream) => {
        stream.onAbort(() => {
          abortController.abort();
        });

        await streamAiRes(stream, {
          sessionId,
          model: lastMessage.model,
          history,
          mode: lastMessage.mode,
          abortController,
        });
      },
      async (err, stream) => {
        const message = err instanceof Error ? err.message : String(err);
        const errEvent: ChartStreamEvent = {
          type: "error",
          message,
        };
        await stream.writeSSE({
          event: "error",
          data: JSON.stringify(errEvent),
        });
      },
    );
  })
  .post("/:sessionId", submitValidator, async (c) => {
    const sessionId = c.req.param("sessionId");

    const session = await db.session.findUnique({
      where: { id: sessionId },
      include: { messages: { orderBy: { createdAt: "asc" } } },
    });

    if (!session) return c.json({ error: "Session not found" }, 400);

    const res = c.req.valid("json");

    await db.message.create({
      data: {
        sessionId,
        role: "USER",
        status: MessageStatus.COMPLETE,
        model: res.model,
        content: res.message,
        mode: res.mode,
      },
    });

    const history = buildConversationHistory([
      ...session.messages,
      {
        role: "USER" as const,
        content: res.message,
        status: MessageStatus.COMPLETE,
      },
    ]);

    const abortController = new AbortController();

    return streamSSE(
      c,
      async (stream) => {
        stream.onAbort(() => {
          abortController.abort();
        });

        await streamAiRes(stream, {
          sessionId,
          model: res.model,
          history,
          mode: res.mode,
          abortController,
        });
      },
      async (err, stream) => {
        const message = err instanceof Error ? err.message : String(err);
        const errorEvent: ChartStreamEvent = {
          type: "error",
          message,
        };
        await stream.writeSSE({
          event: "error",
          data: JSON.stringify(errorEvent),
        });
      },
    );
  });

export default app;

import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { db } from "@koda-arc/database";
import { Role, Mode, MessageStatus } from "@koda-arc/database/enums";
import { findSupportedChatModelById } from "@koda-arc/shared";

const createSessionSchema = z.object({
  title: z.string(),
  cwd: z.string().optional(),
  initialMessage: z
    .object({
      role: z.enum(Role),
      content: z.string(),
      mode: z.enum(Mode),
      model: z
        .string()
        .refine((id) => !!findSupportedChatModelById(id), "unsupported model"),
    })
    .optional(),
});

const createSessionValidator = zValidator(
  "json",
  createSessionSchema,
  (res, c) => {
    if (!res.success) {
      return c.json(
        {
          error: "Invalid request body",
        },
        400,
      );
    }
  },
);

const app = new Hono()
  .get("/", async (c) => {
    const session = await db.session.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    });

    return c.json(session);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const session = await db.session.findUnique({
      where: { id },
      include: {
        messages: { orderBy: { createdAt: "asc" } },
      },
    });

    if (!session) {
      return c.json(
        {
          error: "Session not found",
        },
        404,
      );
    }

    return c.json(session);
  })
  .post("/", createSessionValidator, async (c) => {
    const { initialMessage, ...data } = c.req.valid("json");

    const session = await db.session.create({
      data: {
        ...data,
        userId: "DEV_MOCK_USER",
        ...(initialMessage && {
          messages: {
            create: {
              ...initialMessage,
              status: MessageStatus.COMPLETE,
              parts: {
                create: [
                  {
                    content: initialMessage.content,
                  },
                ],
              },
            },
          },
        }),
      },
      include: { messages: true },
    });

    return c.json(session, 201);
  });

export default app;

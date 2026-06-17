import { useState, useEffect, useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import { z } from "zod";
import type { InferResponseType } from "hono/client";
import { useKeyboard } from "@opentui/react";
import prettyMs from "pretty-ms";
import {
  DEFAULT_CHAT_MODEL_ID,
  type SupportedChatModelId,
} from "@koda-arc/shared";
import { UserMessage, BotMessage, ErrorMessage } from "../components";
import { SessionShell } from "../layout";
import { useToast } from "../hooks";
import { apiClient, getErrorMessage } from "../lib";
import { useChats } from "../hooks";
import type { Message, ClientMessagePart } from "../hooks/useChats";
import { MessageStatus } from "@koda-arc/database/enums";
import { useKeyboardLayer } from "../hooks";

type SessionData = InferResponseType<
  (typeof apiClient.sessions)[":id"]["$get"],
  200
>;

const sessionLocationSchema = z.object({
  session: z.custom<SessionData>(
    (val) => val != null && typeof val === "object" && "id" in val,
  ),
});

function mapDbMessages(dbMessages: SessionData["messages"]): Message[] {
  return dbMessages.map((m): Message => {
    if (m.role === "ERROR") {
      return { id: m.id, role: "error", content: m.content };
    }
    if (m.role === "USER") {
      return {
        id: m.id,
        role: "user",
        content: m.content,
        agentState: m.agentState,
        model: m.model as SupportedChatModelId,
      };
    }
    return {
      id: m.id,
      role: "assistant",
      content: m.content,
      model: m.model as SupportedChatModelId,
      agentState: m.agentState,
      parts: [{ type: "text", text: m.content }],
      ...(m.duration != null ? { duration: prettyMs(m.duration * 1000) } : {}),
      interrupted: m.status === MessageStatus.INTERUPTED,
    };
  });
}

function ChatMessage({ msg }: { msg: Message }) {
  if (msg.role === "user") return <UserMessage message={msg.content} />;
  if (msg.role === "error") return <ErrorMessage message={msg.content} />;

  return (
    <BotMessage
      parts={msg.parts}
      model={msg.model}
      agentState={msg.agentState}
      duration={msg.duration}
      streaming={false}
      interrupted={msg.interrupted}
    />
  );
}

function SessionChat({ session }: { session: SessionData }) {
  const [initialMessages] = useState(() => mapDbMessages(session.messages));
  const { isTopLayer } = useKeyboardLayer();
  const { messages, streaming, submit, abort, interrupt } = useChats(
    session.id,
    initialMessages,
  );
  // Stop the pending reply when the user leaves this session.
  useEffect(() => {
    return () => abort();
  }, [abort]);
  // Let the user cancel a reply even before the first streamed chunk arrives.
  useKeyboard((key) => {
    if (
      key.name === "escape" &&
      isTopLayer("base") &&
      streaming.status === "streaming"
    ) {
      key.preventDefault();
      interrupt();
    }
  });

  return (
    <SessionShell
      onSubmit={(text) =>
        submit({ userText: text, agentState: "BUILD", model: DEFAULT_CHAT_MODEL_ID })
      }
      loading={streaming.status === "streaming"}
      interruptible={streaming.status === "streaming"}
    >
      {messages.map((msg: Message) => (
        <ChatMessage key={msg.id} msg={msg} />
      ))}
      {streaming.status === "streaming" && streaming.parts.length > 0 && (
        <BotMessage
          parts={streaming.parts}
          model={streaming.model}
          agentState={streaming.agentState}
          streaming
        />
      )}
    </SessionShell>
  );
}

export function Session() {
  const { id } = useParams();
  const location = useLocation();
  const nav = useNavigate();
  const toast = useToast();

  const prefetched = useMemo(() => {
    const parsed = sessionLocationSchema.safeParse(location.state);
    return parsed.success ? parsed.data.session : null;
  }, [location.state]);

  const [session, setSession] = useState<SessionData | null>(prefetched);

  useEffect(() => {
    if (prefetched) return;

    if (!id) return;

    let ignore = false;
    const fetchedSession = async () => {
      try {
        const res = await apiClient.sessions[":id"].$get({
          param: { id: id },
        });

        if (ignore) return;

        if (!res.ok) throw new Error(await getErrorMessage(res));

        setSession(await res.json());
      } catch (err) {
        if (ignore) return;

        toast.show({
          variant: "error",
          message:
            err instanceof Error ? err.message : "Failed to load session",
        });

        nav("/", { replace: true });
      }
    };

    fetchedSession();
    return () => {
      ignore = true;
    };
  }, [id, prefetched, toast, nav]);

  if (!session) {
    return <SessionShell onSubmit={() => {}} inputDisabled loading />;
  }

  return <SessionChat key={session.id} session={session} />;
}

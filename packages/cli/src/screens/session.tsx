import { useState, useEffect, useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import { z } from "zod";
import { useKeyboard } from "@opentui/react";
import prettyMs from "pretty-ms";
import {
  messagePartsSchema,
  type SupportedChatModelId,
} from "@koda-arc/shared";
import type { InferResponseType } from "hono/client";
import { SessionShell } from "../layout";
import { UserMessage, BotMessage, ErrorMessage } from "../components/message";
import {
  useToast,
  useChats,
  usePromptConfig,
  useKeyboardLayer,
} from "../hooks";
import type { Message, ClientMessagePart } from "../hooks/types";
import { apiClient, getErrorMessage } from "../lib/";
import { MessageStatus } from "@koda-arc/database/enums";

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

    const parsedParts =
      m.parts == null ? null : messagePartsSchema.safeParse(m.parts);
    const parts: ClientMessagePart[] = parsedParts?.success
      ? parsedParts.data.map((p) =>
          p.type === "tool_call" ? { ...p, status: "done" as const } : p,
        )
      : [];

    return {
      id: m.id,
      role: "assistant",
      content: m.content,
      model: m.model as SupportedChatModelId,
      agentState: m.agentState,
      parts,
      ...(m.duration != null ? { duration: prettyMs(m.duration * 1000) } : {}),
      interrupted: m.status === MessageStatus.INTERUPTED,
    };
  });
}

function ChatMessage({ msg }: { msg: Message }) {
  if (msg.role === "user") {
    return <UserMessage message={msg.content} agentState={msg.agentState} />;
  }

  if (msg.role === "error") {
    return <ErrorMessage message={msg.content} />;
  }

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
  const { agentState, model } = usePromptConfig();
  const { isTopLayer } = useKeyboardLayer();
  const { messages, streaming, submit, abort, interrupt } = useChats(
    session.id,
    initialMessages,
  );

  useEffect(() => {
    return () => abort();
  }, [abort]);

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
      onSubmit={(text) => submit({ userText: text, agentState, model })}
      loading={streaming.status === "streaming"}
      interruptible={streaming.status === "streaming"}
    >
      {messages.map((msg) => (
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
  const navigate = useNavigate();
  const toast = useToast();

  const prefetched = useMemo(() => {
    const parsed = sessionLocationSchema.safeParse(location.state);
    return parsed.success ? parsed.data.session : null;
  }, [location.state]);

  const [session, setSession] = useState<SessionData | null>(prefetched);

  useEffect(() => {
    if (prefetched) return;

    setSession(null);

    if (!id) return;

    let ignore = false;
    const fetchSession = async () => {
      try {
        const res = await apiClient.sessions[":id"].$get({
          param: { id },
        });
        if (ignore) return;
        if (!res.ok) throw new Error(await getErrorMessage(res));
        const resolved = await res.json();
        setSession(resolved);
      } catch (err) {
        if (ignore) return;
        toast.show({
          variant: "error",
          message:
            err instanceof Error ? err.message : "Failed to load session",
        });
        navigate("/", { replace: true });
      }
    };

    fetchSession();
    return () => {
      ignore = true;
    };
  }, [id, prefetched, toast, navigate]);

  if (!session) {
    return <SessionShell onSubmit={() => {}} inputDisabled loading />;
  }

  return <SessionChat key={session.id} session={session} />;
}

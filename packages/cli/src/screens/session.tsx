import { useState, useEffect, useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import { z } from "zod";
import type { InferResponseType } from "hono/client";

import {
  UserMessage,
  BotMessage,
  ErrorMessage,
} from "../components";
import { SessionShell } from "../layout";
import { useToast } from "../hooks";
import { apiClient, getErrorMessage } from "../lib";

type SessionData = InferResponseType<
  (typeof apiClient.sessions)[":id"]["$get"],
  200
>;

const sessionLocationSchema = z.object({
  session: z.custom<SessionData>(
    (val) => val != null && typeof val === "object" && "id" in val,
  ),
});

function ChatMessage({ msg }: { msg: SessionData["messages"][number] }) {
  if (msg.role === "USER") return <UserMessage message={msg.content} />;
  if (msg.role === "BOT")
    return <BotMessage message={msg.content} model={msg.model} />;

  return <ErrorMessage message={msg.content} />;
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

  return (
    <SessionShell onSubmit={() => {}} inputDisabled>
      {session.messages.map((msg) => (
        <ChatMessage key={msg.id} msg={msg} />
      ))}
    </SessionShell>
  );
}

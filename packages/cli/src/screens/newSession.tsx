import { useEffect, useMemo, useRef } from "react";
import { z } from "zod";
import { AgentState } from "@koda-arc/database/enums";
import { useNavigate, useLocation } from "react-router";
import { SessionShell } from "../layout";
import { UserMessage } from "../components";
import { useToast } from "../hooks";
import { apiClient, getErrorMessage } from "../lib";

const newSessionStateSchema = z.object({
  message: z.string(),
  agentState: z.enum(AgentState),
  model: z.string(),
});

export function NewSession() {
  const nav = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const hasStartedRef = useRef(false);

  const state = useMemo(() => {
    const parsed = newSessionStateSchema.safeParse(location.state);
    return parsed.success ? parsed.data : null;
  }, [location.state]);

  useEffect(() => {
    if (!state) {
      nav("/", { replace: true });
    }
  }, [state, nav]);

  useEffect(() => {
    if (!state || hasStartedRef.current) return;

    hasStartedRef.current = true;

    let ignore = false;
    const createSession = async () => {
      try {
        const res = await apiClient.sessions.$post({
          json: {
            title: state.message.slice(0, 100),
            cwd: process.cwd(),
            initialMessage: {
              role: "USER",
              content: state.message,
              agentState: state.agentState,
              model: state.model,
            },
          },
        });

        if (ignore) return;

        if (!res.ok) {
          throw new Error(await getErrorMessage(res));
        }
        const session = await res.json();
        nav(`/sessions/${session.id}`, {
          replace: true,
          state: { session },
        });
      } catch (error) {
        if (ignore) return;
        toast.show({
          variant: "error",
          message:
            error instanceof Error ? error.message : "Failed to create session",
        });
        nav("/", { replace: true });
      }
    };

    createSession();
    return () => {
      ignore = true;
    };
  }, [state, nav, toast]);

  if (!state) return null;

  return (
    <SessionShell onSubmit={() => {}} inputDisabled loading>
      <UserMessage message={state.message} agentState={state.agentState} />
    </SessionShell>
  );
}

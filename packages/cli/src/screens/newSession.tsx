import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useTheme } from "../hooks";
import {
  ErrorMessage,
  UserMessage,
  BotMessage,
  SessionShell,
} from "../components";

export function NewSession() {
  const nav = useNavigate();
  const location = useLocation();
  const { colors } = useTheme();

  const state = location.state as { message?: string } | null;

  useEffect(() => {
    if (!state?.message) {
      nav("/", { replace: true });
    }
  }, [state, nav]);

  if (!state?.message) return null;

  return (
    <SessionShell onSubmit={() => {}} inputDisabled loading>
      <UserMessage message={state.message} />
      <BotMessage message="Sample bot response" model="opus 4.8" />
      <ErrorMessage message="Errors are on the way" />
    </SessionShell>
  );
}

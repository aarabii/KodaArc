import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useTheme } from "../hooks";

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
    <box flexGrow={1} padding={2} flexDirection="column" gap={1}>
      <text>Creating Session...</text>
      <text>{state.message}</text>
    </box>
  );
}

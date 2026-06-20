import type { ReactNode } from "react";
import {
  ThemeDialogContent,
  SpinnerDialogContent,
  SessionDialog,
  AgentDialogContent,
  ModelDialogContent,
  HelpDialogContent,
  ExitDialogContent,
} from "../../dialogs";
import { useTheme } from "../../hooks";
import type { CommandType } from "./types";
import { SUPPORTED_CHAT_MODELS } from "@koda-arc/shared";

type DialogTextVariant = "primary" | "muted" | "success" | "brand";

function DialogText({
  variant = "primary",
  children,
  ...props
}: {
  variant?: DialogTextVariant;
  children: ReactNode;
} & any) {
  const { colors } = useTheme();

  const colorMap: Record<DialogTextVariant, string> = {
    primary: colors.text.primary,
    muted: colors.text.muted,
    success: colors.toast.success.accent,
    brand: colors.brand.primary,
  };

  return (
    <text fg={colorMap[variant as DialogTextVariant]} {...props}>
      {children}
    </text>
  );
}

export const COMMANDS: CommandType[] = [
  {
    name: "new",
    desc: "Clear context and start a fresh conversation",
    value: "/new",
    action: (ctx) => {
      ctx.nav("/");
    },
  },
  {
    name: "help",
    desc: "Get help and view frequently asked questions",
    value: "/help",
    action: (ctx) => {
      ctx.dialog.open({
        title: "Help & FAQs",
        children: <HelpDialogContent />,
      });
    },
  },
  {
    name: "agents",
    desc: "Switch to a different KodaArc agent",
    value: "/agent",
    action: (ctx) => {
      ctx.dialog.open({
        title: "Select Agent",
        children: (
          <AgentDialogContent
            currentAgentState={ctx.agentState}
            onSelectAgentState={ctx.setAgentState}
          />
        ),
      });
    },
  },
  {
    name: "models",
    desc: "Choose the LLM powering your session",
    value: "/models",
    action: (ctx) => {
      ctx.dialog.open({
        title: "Select Model",
        children: (
          <ModelDialogContent
            models={SUPPORTED_CHAT_MODELS.map((model) => model.id)}
            onSelectModel={ctx.setModel}
          />
        ),
      });
    },
  },
  {
    name: "sessions",
    desc: "View and restore past conversations",
    value: "/sessions",
    action: (ctx) => {
      ctx.dialog.open({
        title: "Past Sessions",
        children: <SessionDialog />,
      });
    },
  },
  {
    name: "theme",
    desc: "Customize the editor color theme",
    value: "/theme",
    action: (ctx) => {
      ctx.dialog.open({
        title: "Select Theme",
        children: <ThemeDialogContent />,
      });
    },
  },
  {
    name: "spinner",
    desc: "Choose your preferred loading spinner",
    value: "/spinner",
    action: (ctx) => {
      ctx.dialog.open({
        title: "Select Spinner",
        children: <SpinnerDialogContent />,
      });
    },
  },
  {
    name: "login",
    desc: "Authenticate your account via browser",
    value: "/login",
    action: (ctx) => {
      ctx.toast.show({
        variant: "info",
        message: "Opening browser for authentication...",
      });
    },
  },
  {
    name: "logout",
    desc: "Sign out of your KodaArc account",
    value: "/logout",
    action: (ctx) => {
      ctx.dialog.open({
        title: "Sign Out",
        children: (
          <box flexDirection="column" gap={1}>
            <DialogText variant="primary">
              Are you sure you want to sign out of KodaArc?
            </DialogText>
            <DialogText variant="muted">
              Your local sessions will remain saved.
            </DialogText>
          </box>
        ),
      });
    },
  },
  {
    name: "upgrade",
    desc: "Purchase credits or upgrade your plan",
    value: "/upgrade",
    action: (ctx) => {
      ctx.toast.show({
        variant: "info",
        message: "Opening upgrade portal in browser...",
      });
    },
  },
  {
    name: "usage",
    desc: "Open billing and usage portal in browser",
    value: "/usage",
    action: (ctx) => {
      ctx.toast.show({
        variant: "info",
        message: "Opening billing portal in browser...",
      });
    },
  },
  {
    name: "exit",
    desc: "Quit KodaArc",
    value: "/exit",
    action: (ctx) => {
      ctx.dialog.open({
        title: "Quit KodaArc",
        children: <ExitDialogContent onConfirm={ctx.exit} />,
      });
    },
  },
];

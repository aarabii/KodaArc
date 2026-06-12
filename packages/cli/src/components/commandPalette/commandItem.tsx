import type { ReactNode } from "react";
import { ThemeDialogContent, SpinnerDialogContent } from "../../dialogs";
import { useTheme } from "../../hooks";
import type { CommandType } from "../../types";
import { HelpDialogContent } from "./help";

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
    success: colors.success.accent,
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
      ctx.dialog.open({
        title: "Start New Conversation",
        children: (
          <box flexDirection="column" gap={1}>
            <DialogText variant="primary">
              This will clear your current context and message history.
            </DialogText>
            <DialogText variant="muted">This action cannot be undone.</DialogText>
          </box>
        ),
      });
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
          <box flexDirection="column" gap={1}>
            <DialogText variant="primary">Choose an agent for your session:</DialogText>
            <box flexDirection="column" gap={1} paddingTop={1}>
              <DialogText variant="success">› Code General coding assistant</DialogText>
              <DialogText variant="primary"> Debug Root cause and fix errors</DialogText>
              <DialogText variant="primary"> Architect System design and planning</DialogText>
              <DialogText variant="primary"> Review Code review and feedback</DialogText>
            </box>
          </box>
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
          <box flexDirection="column" gap={1}>
            <DialogText variant="primary">Choose the model for generation:</DialogText>
            <box flexDirection="column" gap={1} paddingTop={1}>
              <DialogText variant="success">› claude-sonnet-4 Recommended</DialogText>
              <DialogText variant="primary"> claude-opus-4 Most capable</DialogText>
              <DialogText variant="primary"> claude-haiku-4 Fastest</DialogText>
            </box>
            <DialogText variant="muted" paddingTop={1}>
              Current model will apply to new messages only.
            </DialogText>
          </box>
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
        children: (
          <box flexDirection="column" gap={1}>
            <DialogText variant="primary">Your recent sessions:</DialogText>
            <box flexDirection="column" gap={1} paddingTop={1}>
              <DialogText variant="brand">› Today 14:32 Refactoring auth module</DialogText>
              <DialogText variant="primary"> Today 09:11 Fix pagination bug</DialogText>
              <DialogText variant="primary"> Yesterday Setup CI pipeline</DialogText>
            </box>
            <DialogText variant="muted" paddingTop={1}>
              Sessions are stored in ~/.kodaarc/sessions
            </DialogText>
          </box>
        ),
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
            <DialogText variant="muted">Your local sessions will remain saved.</DialogText>
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
        children: (
          <box flexDirection="column" gap={1}>
            <DialogText variant="primary">Are you sure you want to exit?</DialogText>
            <DialogText variant="muted">Your current session will be saved.</DialogText>
          </box>
        ),
      });
    },
  },
];

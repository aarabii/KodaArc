import type { ReactNode } from "react";
import { ThemeDialogContent } from "../../dialogs";
import { useTheme } from "../../hooks";
import type { CommandType } from "../../types";

function DialogText({ fg, children, ...props }: { fg?: string; children: ReactNode } & any) {
  const { colors } = useTheme();
  let color = fg;
  if (fg === "#d0cfcc") {
    color = "white";
  } else if (fg === "#3f5466") {
    color = colors.thinking;
  } else if (fg === "#82E0AA") {
    color = colors.success.accent;
  } else if (fg === "#56D6C2") {
    color = colors.primary;
  }
  return <text fg={color} {...props}>{children}</text>;
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
            <DialogText fg="#d0cfcc">
              This will clear your current context and message history.
            </DialogText>
            <DialogText fg="#3f5466">This action cannot be undone.</DialogText>
          </box>
        ),
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
            <DialogText fg="#d0cfcc">Choose an agent for your session:</DialogText>
            <box flexDirection="column" gap={1} paddingTop={1}>
              <DialogText fg="#82E0AA">› Code General coding assistant</DialogText>
              <DialogText fg="#d0cfcc"> Debug Root cause and fix errors</DialogText>
              <DialogText fg="#d0cfcc"> Architect System design and planning</DialogText>
              <DialogText fg="#d0cfcc"> Review Code review and feedback</DialogText>
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
            <DialogText fg="#d0cfcc">Choose the model for generation:</DialogText>
            <box flexDirection="column" gap={1} paddingTop={1}>
              <DialogText fg="#82E0AA">› claude-sonnet-4 Recommended</DialogText>
              <DialogText fg="#d0cfcc"> claude-opus-4 Most capable</DialogText>
              <DialogText fg="#d0cfcc"> claude-haiku-4 Fastest</DialogText>
            </box>
            <DialogText fg="#3f5466" paddingTop={1}>
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
            <DialogText fg="#d0cfcc">Your recent sessions:</DialogText>
            <box flexDirection="column" gap={1} paddingTop={1}>
              <DialogText fg="#56D6C2">› Today 14:32 Refactoring auth module</DialogText>
              <DialogText fg="#d0cfcc"> Today 09:11 Fix pagination bug</DialogText>
              <DialogText fg="#d0cfcc"> Yesterday Setup CI pipeline</DialogText>
            </box>
            <DialogText fg="#3f5466" paddingTop={1}>
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
            <DialogText fg="#d0cfcc">
              Are you sure you want to sign out of KodaArc?
            </DialogText>
            <DialogText fg="#3f5466">Your local sessions will remain saved.</DialogText>
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
            <DialogText fg="#d0cfcc">Are you sure you want to exit?</DialogText>
            <DialogText fg="#3f5466">Your current session will be saved.</DialogText>
          </box>
        ),
      });
    },
  },
];

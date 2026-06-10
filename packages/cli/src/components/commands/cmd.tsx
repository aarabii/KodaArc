import type { CommandType } from "./type";

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
            <text fg="#d0cfcc">
              This will clear your current context and message history.
            </text>
            <text fg="#3f5466">This action cannot be undone.</text>
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
            <text fg="#d0cfcc">Choose an agent for your session:</text>
            <box flexDirection="column" gap={1} paddingTop={1}>
              <text fg="#82E0AA">› Code General coding assistant</text>
              <text fg="#d0cfcc"> Debug Root cause and fix errors</text>
              <text fg="#d0cfcc"> Architect System design and planning</text>
              <text fg="#d0cfcc"> Review Code review and feedback</text>
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
            <text fg="#d0cfcc">Choose the model for generation:</text>
            <box flexDirection="column" gap={1} paddingTop={1}>
              <text fg="#82E0AA">› claude-sonnet-4 Recommended</text>
              <text fg="#d0cfcc"> claude-opus-4 Most capable</text>
              <text fg="#d0cfcc"> claude-haiku-4 Fastest</text>
            </box>
            <text fg="#3f5466" paddingTop={1}>
              Current model will apply to new messages only.
            </text>
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
            <text fg="#d0cfcc">Your recent sessions:</text>
            <box flexDirection="column" gap={1} paddingTop={1}>
              <text fg="#56D6C2">› Today 14:32 Refactoring auth module</text>
              <text fg="#d0cfcc"> Today 09:11 Fix pagination bug</text>
              <text fg="#d0cfcc"> Yesterday Setup CI pipeline</text>
            </box>
            <text fg="#3f5466" paddingTop={1}>
              Sessions are stored in ~/.kodaarc/sessions
            </text>
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
        children: (
          <box flexDirection="column" gap={1}>
            <text fg="#d0cfcc">Choose a color theme:</text>
            <box flexDirection="column" gap={1} paddingTop={1}>
              <text fg="#82E0AA">› Arc Dark Default</text>
              <text fg="#d0cfcc"> Arc Midnight High contrast</text>
              <text fg="#d0cfcc"> Arc Soft Easy on eyes</text>
            </box>
          </box>
        ),
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
            <text fg="#d0cfcc">
              Are you sure you want to sign out of KodaArc?
            </text>
            <text fg="#3f5466">Your local sessions will remain saved.</text>
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
            <text fg="#d0cfcc">Are you sure you want to exit?</text>
            <text fg="#3f5466">Your current session will be saved.</text>
          </box>
        ),
      });
    },
  },
];

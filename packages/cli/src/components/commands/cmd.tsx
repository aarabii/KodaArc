import type { CommandType } from "./type";

export const COMMANDS: CommandType[] = [
  {
    name: "new",
    desc: "Clear context and start a fresh conversation",
    value: "/new",
    action: (ctx) => {
      ctx.toast.show({
        variant: "info",
        message: "Starting a new conversation...",
      });
    },
  },
  {
    name: "agents",
    desc: "Switch to a different KodaArc agent",
    value: "/agent",
    action: (ctx) => {
      ctx.toast.show({
        variant: "info",
        message: "Opening agent selector...",
      });
    },
  },
  {
    name: "models",
    desc: "Choose the LLM powering your session",
    value: "/models",
    action: (ctx) => {
      ctx.toast.show({
        variant: "info",
        message: "Opening model selector...",
      });
    },
  },
  {
    name: "sessions",
    desc: "View and restore past conversations",
    value: "/sessions",
    action: (ctx) => {
      ctx.toast.show({
        variant: "info",
        message: "Loading past sessions...",
      });
    },
  },
  {
    name: "theme",
    desc: "Customize the editor color theme",
    value: "/theme",
    action: (ctx) => {
      ctx.toast.show({
        variant: "info",
        message: "Opening theme settings...",
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
      ctx.toast.show({
        variant: "warning",
        message: "Signing out of KodaArc...",
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
      ctx.toast.show({
        variant: "warning",
        message: "Goodbye! See you next time.",
        duration: 800,
      });
      ctx.exit();
    },
  },
];

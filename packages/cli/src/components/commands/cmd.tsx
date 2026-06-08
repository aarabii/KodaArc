import type { CommandType } from "./type";

export const COMMANDS: CommandType[] = [
  {
    name: "new",
    desc: "Clear context and start a fresh conversation",
    value: "/new",
  },
  {
    name: "agents",
    desc: "Switch to a different KodaArc agent",
    value: "/agent",
  },
  {
    name: "models",
    desc: "Choose the LLM powering your session",
    value: "/models",
  },
  {
    name: "sessions",
    desc: "View and restore past conversations",
    value: "/sessions",
  },
  {
    name: "theme",
    desc: "Customize the editor color theme",
    value: "/theme",
  },
  {
    name: "login",
    desc: "Authenticate your account via browser",
    value: "/login",
  },
  {
    name: "logout",
    desc: "Sign out of your KodaArc account",
    value: "/logout",
  },
  {
    name: "upgrade",
    desc: "Purchase credits or upgrade your plan",
    value: "/upgrade",
  },
  {
    name: "usage",
    desc: "Open billing and usage portal in browser",
    value: "/usage",
  },
  {
    name: "exit",
    desc: "Quit KodaArc",
    value: "/exit",
    action: (ctx) => {
      ctx.exit();
    },
  },
];

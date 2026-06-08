import type { Command } from "./type";

export const COMMANDS: Command[] = [
  {
    name: "new",
    desc: "Start a new conversation",
    value: "/new",
  },
  {
    name: "exit",
    desc: "Quit the application",
    value: "/exit",
    action: (ctx) => {
      ctx.exit();
    },
  },
];

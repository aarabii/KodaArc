import { COMMANDS } from "./cmd";
import type { CommandType } from "./type";

export function getFilterCommands(q: string): CommandType[] {
  if (q.length === 0) return COMMANDS;
  return COMMANDS.filter((cmd) =>
    cmd.name.toLowerCase().startsWith(q.toLowerCase()),
  );
}

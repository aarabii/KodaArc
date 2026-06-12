import { COMMANDS } from "./commandItem";
import type { CommandType } from "../../types";

export function getFilterCommands(q: string): CommandType[] {
  if (q.length === 0) return COMMANDS;
  return COMMANDS.filter((cmd) =>
    cmd.name.toLowerCase().startsWith(q.toLowerCase()),
  );
}

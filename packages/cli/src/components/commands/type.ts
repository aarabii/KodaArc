export type CommandContext = {
  exit: () => void;
};

export type CommandType = {
  name: string;
  desc: string;
  value: string;
  action?: (ctx: CommandContext) => void | Promise<void>;
};

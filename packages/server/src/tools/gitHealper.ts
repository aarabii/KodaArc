import { tool } from "ai";
import { z } from "zod";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import type { AgentState } from "@koda-arc/database/enums";

const execAsync = promisify(exec);

export function createGitHelperTool(cwd: string, agentState: AgentState) {
  return tool({
    description:
      "Execute structured Git operations in the working directory, such as checking status, reviewing diffs, viewing history, committing changes, and managing branches.",
    inputSchema: z.object({
      subcommand: z
        .enum(["status", "diff", "log", "commit", "branch", "show"])
        .describe("The Git operation to perform"),
      message: z
        .string()
        .optional()
        .describe("Commit message (required when subcommand is 'commit')"),
      staged: z
        .boolean()
        .optional()
        .describe("If true, show staged diff (for 'diff' subcommand)"),
      filePath: z
        .string()
        .optional()
        .describe("Optional specific file path to show diff for"),
      count: z
        .number()
        .optional()
        .describe("Number of commits to show in log (default: 10)"),
      ref: z
        .string()
        .optional()
        .describe("Git commit hash or ref (required for 'show' subcommand)"),
      name: z
        .string()
        .optional()
        .describe(
          "Branch name to switch/checkout to (for 'branch' subcommand)",
        ),
      create: z
        .boolean()
        .optional()
        .describe("Create a new branch (for 'branch' subcommand)"),
    }),
    execute: async ({
      subcommand,
      message,
      staged,
      filePath,
      count = 10,
      ref,
      name,
      create,
    }) => {
      // Security: Check if action modifies git state in PLAN mode
      if (agentState === "PLAN") {
        if (subcommand === "commit" || (subcommand === "branch" && name)) {
          return {
            error: `Subcommand '${subcommand}' is not allowed in PLAN mode. Only status, diff, log, and show are permitted.`,
          };
        }
      }

      try {
        let cmd = "git";

        switch (subcommand) {
          case "status":
            cmd = "git status --porcelain";
            break;

          case "diff":
            const stagedFlag = staged ? " --staged" : "";
            const fileFlag = filePath ? ` -- "${filePath}"` : "";
            cmd = `git diff${stagedFlag}${fileFlag}`;
            break;

          case "log":
            cmd = `git log --oneline -n ${count}`;
            break;

          case "commit":
            if (!message) {
              return {
                error: "Commit message is required for 'commit' subcommand.",
              };
            }
            // Add all files and commit
            cmd = `git add -A && git commit -m ${JSON.stringify(message)}`;
            break;

          case "branch":
            if (name) {
              const createFlag = create ? " -b" : "";
              cmd = `git checkout${createFlag} ${name}`;
            } else {
              cmd = "git branch -a";
            }
            break;

          case "show":
            if (!ref) {
              return {
                error: "Commit hash or ref is required for 'show' subcommand.",
              };
            }
            cmd = `git show ${ref}`;
            break;

          default:
            return { error: `Unsupported git subcommand: ${subcommand}` };
        }

        const { stdout, stderr } = await execAsync(cmd, { cwd });
        return {
          stdout: stdout.trim(),
          stderr: stderr.trim(),
        };
      } catch (err: any) {
        return {
          error: err.message || String(err),
          stdout: err.stdout?.trim() || "",
          stderr: err.stderr?.trim() || "",
        };
      }
    },
  });
}

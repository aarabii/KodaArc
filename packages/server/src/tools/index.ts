import type { AgentState } from "@koda-arc/database/enums";
import { createReadFileTool } from "./readFile";
import { createListDirectoryTool } from "./listDir";
import { createWriteFileTool } from "./writeFile";
import { createEditFileTool } from "./editFile";
import { createGrepTool } from "./grep";
import { createGlobTool } from "./glob";
import { createBashTool } from "./bash";
import { createGitHelperTool } from "./gitHealper";

export function createTools(cwd: string, agentState: AgentState) {
  const readOnlyTools = {
    readFile: createReadFileTool(cwd),
    listDirectory: createListDirectoryTool(cwd),
    grep: createGrepTool(cwd),
    glob: createGlobTool(cwd),
    gitHealper: createGitHelperTool(cwd, agentState),
  };

  if (agentState === "PLAN") {
    return readOnlyTools;
  }

  return {
    ...readOnlyTools,
    writeFile: createWriteFileTool(cwd),
    editFile: createEditFileTool(cwd),
    bash: createBashTool(cwd),
  };
}

import { useCallback } from "react";
import { useDialog, useTheme } from "../hooks";
import { SearchList } from "../components";
import { AgentState } from "@koda-arc/database/enums";

const AVAILABLE_AGENT_STATES: AgentState[] = [AgentState.BUILD, AgentState.PLAN];

type AgentsDialogContextProps = {
  currentAgentState: AgentState;
  onSelectAgentState: (agentState: AgentState) => void;
};

function getAgentStateLabel(agentState: AgentState) {
  return agentState === AgentState.PLAN ? "Plan" : "Build";
}

export const AgentDialogContent = ({
  currentAgentState,
  onSelectAgentState,
}: AgentsDialogContextProps) => {
  const dialog = useDialog();
  const { colors } = useTheme();

  const handleSelect = useCallback(
    (nextState: AgentState) => {
      onSelectAgentState(nextState);
      dialog.close();
    },
    [onSelectAgentState, dialog],
  );
  return (
    <SearchList
      items={AVAILABLE_AGENT_STATES}
      onSelect={handleSelect}
      filterFn={(item, q) =>
        getAgentStateLabel(item).toLowerCase().includes(q.toLowerCase())
      }
      renderItem={(item, isSelected) => (
        <text selectable={false} fg={isSelected ? colors.selection.text : colors.text.primary}>
          {item === currentAgentState ? "" : ""}
          {getAgentStateLabel(item)}
        </text>
      )}
      getKey={(item) => item}
      placeholder="Search of different agents"
      emptyText="No matching agents found."
    />
  );
};

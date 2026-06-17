import { useCallback } from "react";
import { useDialog, useTheme } from "../hooks";
import { SearchList } from "../components";
import { Mode } from "@koda-arc/database/enums";

const AVAILABLE_MODES: Mode[] = [Mode.BUILD, Mode.PLAN];

type AgentsDialogContextProps = {
  currentMode: Mode;
  onSelectMode: (mode: Mode) => void;
};

function getModelLabel(mode: Mode) {
  return mode === Mode.PLAN ? "Plan" : "Build";
}

export const AgentDialogContent = ({
  currentMode,
  onSelectMode,
}: AgentsDialogContextProps) => {
  const dialog = useDialog();

  const handleSelect = useCallback(
    (nextMode: Mode) => {
      onSelectMode(nextMode);
      dialog.close();
    },
    [onSelectMode, dialog],
  );
  return (
    <SearchList
      items={AVAILABLE_MODES}
      onSelect={handleSelect}
      filterFn={(item, q) =>
        getModelLabel(item).toLowerCase().includes(q.toLowerCase())
      }
      renderItem={(item, isSelected) => (
        <text selectable={false} fg={isSelected ? "black" : "white"}>
          {item === currentMode ? "" : ""}
          {getModelLabel(item)}
        </text>
      )}
      getKey={(item) => item}
      placeholder="Search of different agents"
      emptyText="No matching agents found."
    />
  );
};

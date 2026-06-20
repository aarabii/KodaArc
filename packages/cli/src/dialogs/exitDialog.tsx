import { useCallback } from "react";
import { useDialog, useTheme } from "../hooks";
import { SearchList } from "../components";

type ExitDialogContentProps = {
  onConfirm: () => void;
};

export const ExitDialogContent = ({ onConfirm }: ExitDialogContentProps) => {
  const dialog = useDialog();
  const { colors } = useTheme();

  const handleSelect = useCallback(
    (option: string) => {
      dialog.close();
      if (option === "Yes") {
        onConfirm();
      }
    },
    [onConfirm, dialog],
  );

  return (
    <SearchList
      items={["Yes", "No"]}
      onSelect={handleSelect}
      filterFn={(item, q) => item.toLowerCase().includes(q.toLowerCase())}
      renderItem={(item, isSelected) => (
        <text
          selectable={false}
          fg={isSelected ? colors.selection.text : colors.text.primary}
        >
          {item}
        </text>
      )}
      getKey={(item) => item}
      placeholder="Type Yes/No or select"
      emptyText="No option found."
    />
  );
};

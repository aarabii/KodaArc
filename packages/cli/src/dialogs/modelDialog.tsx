import { useCallback } from "react";
import { useDialog, useTheme } from "../hooks";
import { SearchList } from "../components";
import type { SupportedChatModelId } from "@koda-arc/shared";

type ModelDialogContextProps = {
  models: SupportedChatModelId[];
  onSelectModel: (modelId: SupportedChatModelId) => void;
};

export const ModelDialogContent = ({
  models,
  onSelectModel,
}: ModelDialogContextProps) => {
  const dialog = useDialog();

  const handleSelect = useCallback(
    (nextModel: SupportedChatModelId) => {
      onSelectModel(nextModel);
      dialog.close();
    },
    [onSelectModel, dialog],
  );
  return (
    <SearchList
      items={models}
      onSelect={handleSelect}
      filterFn={(modelId, q) => modelId.toLowerCase().includes(q.toLowerCase())}
      renderItem={(modelId, isSelected) => (
        <text selectable={false} fg={isSelected ? "black" : "white"}>
          {modelId}
        </text>
      )}
      getKey={(modelId) => modelId}
      placeholder="Search of different models"
      emptyText="No matching model found."
    />
  );
};

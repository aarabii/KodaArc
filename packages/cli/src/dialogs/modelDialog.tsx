import { useCallback } from "react";
import { useDialog, useTheme } from "../hooks";
import { SearchList, Icon } from "../components";
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
  const { colors } = useTheme();

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
        <box flexDirection="row" gap={1} alignItems="center">
          <Icon
            name="Sparkles"
            fg={isSelected ? colors.selection.text : colors.brand.primary}
          />
          <text selectable={false} fg={isSelected ? colors.selection.text : colors.text.primary}>
            {modelId}
          </text>
        </box>
      )}
      getKey={(modelId) => modelId}
      placeholder="Search of different models"
      emptyText="No matching model found."
    />
  );
};

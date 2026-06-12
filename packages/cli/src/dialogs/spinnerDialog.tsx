import { useCallback, useEffect, useRef, useState } from "react";
import { useDialog, useTheme } from "../hooks";
import { SearchList, SPINNER_NAMES } from "../components";
import "opentui-spinner/react";
import { TextAttributes } from "@opentui/core";

export const SpinnerDialogContent = () => {
  const dialog = useDialog();
  const { setSpinner, currentSpinner, colors } = useTheme();
  const originalSpinnerRef = useRef(currentSpinner);
  const [highlightedSpinner, setHighlightedSpinner] = useState(currentSpinner);
  const confirmRef = useRef(false);

  useEffect(() => {
    return () => {
      if (!confirmRef.current) {
        setSpinner(originalSpinnerRef.current);
      }
    };
  }, [setSpinner]);

  const handleSelect = useCallback(
    (spinnerName: string) => {
      confirmRef.current = true;
      setSpinner(spinnerName);
      dialog.close();
    },
    [setSpinner, dialog],
  );

  const handleHighlight = useCallback(
    (spinnerName: string) => {
      setHighlightedSpinner(spinnerName);
      setSpinner(spinnerName);
    },
    [setSpinner],
  );

  return (
    <box flexDirection="row" gap={3} width="100%">
      <box flexGrow={1} flexDirection="column">
        <SearchList
          items={SPINNER_NAMES}
          onSelect={handleSelect}
          onHighlight={handleHighlight}
          filterFn={(name, q) => name.toLowerCase().includes(q.toLowerCase())}
          renderItem={(name, isSelected) => (
            <text selectable={false} fg={isSelected ? colors.brand.primary : colors.text.primary}>
              {name === originalSpinnerRef.current
                ? "\u0020\u2022\u0020"
                : "\u0020\u0020\u0020"}
              {name}
            </text>
          )}
          getKey={(name) => name}
          placeholder="Search for a spinner"
          emptyText="No matching spinner found."
        />
      </box>
      <box
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        border={["left"]}
        borderColor={colors.border.default}
        paddingLeft={3}
        width={18}
        flexShrink={0}
      >
        <text selectable={false} attributes={TextAttributes.BOLD} fg={colors.text.secondary}>
          Preview
        </text>
        <box height={1} />
        <spinner name={highlightedSpinner as any} color={colors.brand.primary} />
        <box height={1} />
        <text selectable={false} fg={colors.text.muted}>
          {highlightedSpinner}
        </text>
      </box>
    </box>
  );
};

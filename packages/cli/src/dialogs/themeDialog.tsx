import { useCallback, useEffect, useRef } from "react";
import { TextAttributes } from "@opentui/core";
import { useDialog, useTheme } from "../hooks";
import { SearchList, Icon } from "../components";
import { THEME } from "../themes";
import type { ThemeProps } from "../themes";

export const ThemeDialogContent = () => {
  const dialog = useDialog();
  const { setTheme, currentTheme, colors } = useTheme();
  const originalThemeRef = useRef(currentTheme);
  const confirmRef = useRef(false);

  useEffect(() => {
    return () => {
      if (!confirmRef.current) {
        setTheme(originalThemeRef.current);
      }
    };
  }, [setTheme]);

  const handleSelect = useCallback(
    (theme: ThemeProps) => {
      confirmRef.current = true;
      setTheme(theme);
      dialog.close();
    },
    [setTheme, dialog],
  );

  const handleHighlight = useCallback(
    (theme: ThemeProps) => {
      setTheme(theme);
    },
    [setTheme],
  );

  return (
    <SearchList
      items={THEME}
      onSelect={handleSelect}
      onHighlight={handleHighlight}
      filterFn={(t, q) => t.name.toLowerCase().includes(q.toLowerCase())}
      renderItem={(theme, isSelected) => {
        const isActive = theme.name === originalThemeRef.current.name;
        return (
          <box flexDirection="row" gap={1} alignItems="center">
            <Icon
              name="Paintbrush"
              fg={
                isActive
                  ? colors.brand.primary
                  : isSelected
                    ? colors.selection.text
                    : colors.text.muted
              }
              attributes={isActive ? 0 : TextAttributes.DIM}
            />
            <text selectable={false} fg={isSelected ? colors.selection.text : colors.text.primary}>
              {theme.name}
            </text>
          </box>
        );
      }}
      getKey={(t) => t.name}
      placeholder="Search for the different color theme"
      emptyText="No matching theme found."
    />
  );
};

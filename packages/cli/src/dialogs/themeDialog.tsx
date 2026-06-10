import { useCallback, useEffect, useRef } from "react";
import { useDialog } from "../providers/dialog";
import { useTheme } from "../providers/theme";
import { DialogSearchList } from "../components/commands/dialogSearchList";
import { THEME } from "../theme";
import type { ThemeProps } from "../theme";

export const ThemeDialogContent = () => {
  const dialog = useDialog();
  const { setTheme, currentTheme } = useTheme();
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
    <DialogSearchList
      items={THEME}
      onSelect={handleSelect}
      onHighlight={handleHighlight}
      filterFn={(t, q) => t.name.toLowerCase().includes(q.toLowerCase())}
      renderItem={(theme, isSelected) => {
        <text selectable={false} fg={isSelected ? "black" : "white"}>
          {theme.name === originalThemeRef.current.name
            ? "\u0020\u2022\u0020"
            : "\u0020\u0020\u0020"}
          {theme.name}
        </text>;
      }}
      getKey={(t) => t.name}
      placeholder="Search for the different color theme"
      emptyText="No matching theme found."
    />
  );
};

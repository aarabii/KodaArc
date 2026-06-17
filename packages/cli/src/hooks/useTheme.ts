import { useContext } from "react";
import { ThemeContext } from "../providers/context";
import type { ThemeContextValue } from "../providers/types";

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

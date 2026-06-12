import { useState, useCallback, type ReactNode } from "react";
import type { ThemeProps } from "../../types";
import { ThemeContext } from "./context";
import {
  getInitialTheme,
  getInitialSpinner,
  persistPreferences,
} from "../../lib/preferences";

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrTheme] = useState<ThemeProps>(getInitialTheme);
  const [currentSpinner, setCurrSpinner] = useState<string>(getInitialSpinner);

  const setTheme = useCallback(
    (theme: ThemeProps) => {
      setCurrTheme(theme);
      persistPreferences(theme.name, currentSpinner);
    },
    [currentSpinner],
  );

  const setSpinner = useCallback(
    (spinnerName: string) => {
      setCurrSpinner(spinnerName);
      persistPreferences(currentTheme.name, spinnerName);
    },
    [currentTheme],
  );

  return (
    <ThemeContext.Provider
      value={{
        colors: currentTheme.colors,
        currentTheme,
        setTheme,
        currentSpinner,
        setSpinner,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

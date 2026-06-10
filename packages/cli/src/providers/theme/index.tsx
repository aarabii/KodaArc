import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { ThemeColorProps, ThemeProps } from "../../theme";
import { THEME, DEFAULT_THEME } from "../../theme";

const CONFIG_DIR = join(homedir(), ".koda-arc");
const THEME_PREFERENCES_PATH = join(CONFIG_DIR, "pref.json");

type ThemePreferences = {
  themeName: string;
};

export function getInitialTheme(): ThemeProps {
  const fallbackTheme = DEFAULT_THEME ?? THEME[2];

  if (!fallbackTheme) {
    throw new Error("No theme configuration available");
  }

  try {
    const preferences = JSON.parse(
      readFileSync(THEME_PREFERENCES_PATH, "utf-8"),
    ) as Partial<ThemePreferences>;

    const savedTheme = THEME.find(
      (theme) => theme.name === preferences.themeName,
    );

    return savedTheme ?? fallbackTheme;
  } catch {
    return fallbackTheme;
  }
}

function persistTheme(theme: ThemeProps) {
  try {
    mkdirSync(CONFIG_DIR, { recursive: true });
    writeFileSync(
      THEME_PREFERENCES_PATH,
      JSON.stringify(
        { themeName: theme.name } satisfies ThemePreferences,
        null,
        2,
      ),
      "utf-8",
    );
  } catch {
    // ....
  }
}

type ThemeContextValue = {
  colors: ThemeColorProps;
  currentTheme: ThemeProps;
  setTheme: (theme: ThemeProps) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);

  if (!value) {
    throw new Error("UseTheme must be used within a ThemeProvide");
  }

  return value;
}

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrTheme] = useState<ThemeProps>(getInitialTheme);

  const setTheme = useCallback((theme: ThemeProps) => {
    setCurrTheme(theme);
    persistTheme(theme);
  }, []);

  return (
    <ThemeContext.Provider
      value={{ colors: currentTheme.colors, currentTheme, setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

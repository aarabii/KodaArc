import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import type { ThemeProps } from "../types";
import { THEME, DEFAULT_THEME } from "../themes";

const CONFIG_DIR = join(homedir(), ".koda-arc");
const THEME_PREFERENCES_PATH = join(CONFIG_DIR, "pref.json");

type ThemePreferences = {
  themeName: string;
  spinnerName?: string;
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

export function getInitialSpinner(): string {
  try {
    const preferences = JSON.parse(
      readFileSync(THEME_PREFERENCES_PATH, "utf-8"),
    ) as Partial<ThemePreferences>;

    return preferences.spinnerName ?? "arc";
  } catch {
    return "arc";
  }
}

export function persistPreferences(themeName: string, spinnerName: string): void {
  try {
    mkdirSync(CONFIG_DIR, { recursive: true });
    writeFileSync(
      THEME_PREFERENCES_PATH,
      JSON.stringify(
        { themeName, spinnerName } satisfies ThemePreferences,
        null,
        2,
      ),
      "utf-8",
    );
  } catch {
    // IGNORE
  }
}

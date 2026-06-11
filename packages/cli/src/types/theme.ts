export type ThemeColorProps = {
  primary: string;
  planMode: string;
  selection: string;
  thinking: string;
  success: { accent: string; bg: string; border: string };
  error: { accent: string; bg: string; border: string };
  info: { accent: string; bg: string; border: string };
  warning: { accent: string; bg: string; border: string };
  background: string;
  surface: string;
  dialogSurface: string;
  thinkingBorder: string;
  dimSeparator: string;
};

export type ThemeProps = {
  name: string;
  colors: ThemeColorProps;
};

export type ThemeContextValue = {
  colors: ThemeColorProps;
  currentTheme: ThemeProps;
  setTheme: (theme: ThemeProps) => void;
};

export type SemanticColor = {
  accent: string;
  bg: string;
  border: string;
  text: string;
};

export type DiffSlot = {
  text: string;
  bg: string;
};

export type ThemeColorProps = {
  brand: {
    primary: string;
    accent: string;
  };

  text: {
    primary: string;
    secondary: string;
    muted: string;
    inverse: string;
    code: string;
  };

  bg: {
    base: string;
    surface: string;
    elevated: string;
    input: string;
    code: string;
  };

  border: {
    default: string;
    focused: string;
    dim: string;
    strong: string;
  };

  agent: {
    plan: string;
    thinking: string;
    executing: string;
    waiting: string;
    idle: string;
  };

  selection: {
    bg: string;
    text: string;
  };

  success: SemanticColor;
  error: SemanticColor;
  info: SemanticColor;
  warning: SemanticColor;

  diff: {
    added: DiffSlot;
    removed: DiffSlot;
    modified: DiffSlot;
    context: string;
  };

  input: {
    border: string;
    borderFocused: string;
    placeholder: string;
    cursor: string;
  };

  scrollbar: {
    track: string;
    thumb: string;
    thumbActive: string;
  };
};

export type ThemeProps = {
  name: string;
  colors: ThemeColorProps;
};

export type ThemeContextValue = {
  colors: ThemeColorProps;
  currentTheme: ThemeProps;
  setTheme: (theme: ThemeProps) => void;
  currentSpinner: string;
  setSpinner: (spinner: string) => void;
};

export type ToastColors = {
  bg: string;      // Background color of the toast notification box
  border: string;  // Border color of the toast notification box
  accent: string;  // Alert message text color (foreground)
  text: string;    // Secondary description or details text color inside the toast
};

export type ThemeColorProps = {
  brand: {
    primary: string;   // Main brand color ("Arc" in Header, active buttons, exit logo end state)
    secondary: string; // Secondary brand color ("Koda" in Header, exit logo start state, block backgrounds)
  };

  text: {
    primary: string;   // Standard text color across all panels/inputs
    secondary: string; // Sub-headers and secondary labels/descriptions (like unselected options description)
    muted: string;     // Shortcuts, placeholders, disabled text, and close buttons
    inverse: string;   // Text color inside active selections or inverted backgrounds
  };

  bg: {
    base: string;     // Main application screen background (ThemedRoot)
    surface: string;  // Input block background (InputBar bottom panel)
    elevated: string; // Dialogs and dropdown list background (Command Palette popup list, dialog internal content box)
  };

  border: {
    default: string; // Panel separators and preview borders (SpinnerDialog preview panel)
    dim: string;     // Subtle horizontal dividers (Help dialog separator)
  };

  agent: {
    plan: string;     // Active color for PLAN state (indicator, status bar, spinner)
    build: string;    // Active color for BUILD state (indicator, status bar, spinner)
    thinking: string; // Color for reasoning boxes (border, "Thinking:" tag)
    idle: string;     // Spinner color in inactive or idle states
  };

  selection: {
    bg: string;   // Active highlighted list item background (SearchList, Command Palette selection)
    text: string; // Active highlighted list item text (SearchList, Command Palette selection)
  };

  toast: {
    success: ToastColors; // Success notifications
    error: ToastColors;   // Error notifications
    info: ToastColors;    // Info notifications
    warning: ToastColors; // Warning notifications
  };

  errorMessage: {
    bg: string;     // Background color of the error log message box
    border: string; // Left indicator border color of the error box
    text: string;   // Foreground color of the error description text
  };
};

export type ThemeProps = {
  name: string;
  colors: ThemeColorProps;
};


import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { Header } from "./components/header";
import { InputBar } from "./components/inputBar";
import { ToastProvider } from "./providers/toast";
import { KeyboardLayerProvider } from "./providers/keyboardLayer";
import { DialogProvider } from "./providers/dialog";
import { ThemeProvider, useTheme } from "./providers/theme";

function RootAPP() {
  const { colors } = useTheme();

  return (
    <box
      alignItems="center"
      justifyContent="center"
      flexGrow={1}
      backgroundColor={colors.background}
      width="100%"
      height="100%"
      gap={2}
    >
      <Header />
      <box width="100%" maxWidth={78} paddingX={2}>
        <InputBar onSubmit={() => {}} />
      </box>
    </box>
  );
}

function App() {
  return (
    <ThemeProvider>
      <KeyboardLayerProvider>
        <DialogProvider>
          <ToastProvider>
            <RootAPP />
          </ToastProvider>
        </DialogProvider>
      </KeyboardLayerProvider>
    </ThemeProvider>
  );
}

const renderer = await createCliRenderer({
  targetFps: 60,
  maxFps: 120,
  exitOnCtrlC: false,
  onDestroy: async () => {
    const lines = [
      "",
      "  ██╗  ██╗ ██████╗ ██████╗  █████╗           █████╗ ██████╗  ██████╗",
      "  ██║ ██╔╝██╔═══██╗██╔══██╗██╔══██╗         ██╔══██╗██╔══██╗██╔════╝",
      "  █████╔╝ ██║   ██║██║  ██║███████║ ███████ ███████║██████╔╝██║     ",
      "  ██╔═██╗ ██║   ██║██║  ██║██╔══██║         ██╔══██║██╔══██╗██║     ",
      "  ██║  ██╗╚██████╔╝██████╔╝██║  ██║         ██║  ██║██║  ██║╚██████╗",
      "  ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝         ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝",
      "",
      "        Session Ended • Thanks for building with KodaArc            ",
      "         Github: https://github.com/aarabii/KodaArc                 ",
    ];
    lines.forEach((line) => process.stdout.write(`\x1b[36m${line}\x1b[0m\n`));
  },
});
createRoot(renderer).render(<App />);

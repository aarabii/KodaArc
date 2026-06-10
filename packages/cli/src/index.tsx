import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { Header } from "./components/header";
import { InputBar } from "./components/inputBar";
import { ToastProvider } from "./providers/toast";
import { KeyboardLayerProvider } from "./providers/keyboardLayer";
import { DialogProvider } from "./providers/dialog";
import { ThemeProvider, useTheme, getInitialTheme } from "./providers/theme";
import { toAnsi } from "./utils/ansi";
import { mascotFrames } from "./assets/mascot";
import { asciiLines } from "./assets/ascii";

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
    const theme = getInitialTheme();
    const primary = toAnsi(theme.colors.primary, "36");
    const thinking = toAnsi(theme.colors.thinking, "35");
    const success = toAnsi(theme.colors.success.accent, "32");
    const info = toAnsi(theme.colors.info.accent, "36");
    const dim = toAnsi(theme.colors.dimSeparator, "90");

    // Hide terminal cursor
    process.stdout.write("\x1b[?25l");

    const totalFrames = 12;
    const frameDelay = 150; // ms

    process.stdout.write("\n");

    for (let frameIdx = 0; frameIdx < totalFrames; frameIdx++) {
      const isLastFrame = frameIdx === totalFrames - 1;
      const frame = mascotFrames[isLastFrame ? 0 : frameIdx % mascotFrames.length]!;

      for (let lineIdx = 0; lineIdx < asciiLines.length; lineIdx++) {
        const mascotLine = frame[lineIdx] ?? "";
        const logoLine = asciiLines[lineIdx] ?? "";
        const left = logoLine.substring(0, 44);
        const right = logoLine.substring(44);

        process.stdout.write(
          `\r\x1b[K\x1b[${success}m${mascotLine}\x1b[0m \x1b[${thinking}m${left}\x1b[${primary}m${right}\x1b[0m\n`
        );
      }

      if (!isLastFrame) {
        process.stdout.write("\x1b[6A");
        await new Promise((resolve) => setTimeout(resolve, frameDelay));
      }
    }

    // Show terminal cursor back
    process.stdout.write("\x1b[?25h");

    process.stdout.write("\n");
    process.stdout.write(
      `                       \x1b[1m\x1b[${success}mSession Ended\x1b[0m \x1b[${dim}m•\x1b[0m \x1b[1mThanks for building with KodaArc\x1b[0m\n`
    );
    process.stdout.write(
      `                        \x1b[2mGithub:\x1b[0m \x1b[4m\x1b[${info}mhttps://github.com/aarabii/KodaArc\x1b[0m\n\n`
    );
  },
});
createRoot(renderer).render(<App />);

import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { Header } from "./components/header";
import { InputBar } from "./components/inputBar";

const sessionStartTime = Date.now();

const formatDuration = (ms: number): string => {
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ${s % 60}s`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
};

function App() {
  return (
    <box
      alignItems="center"
      justifyContent="center"
      flexGrow={1}
      backgroundColor="black"
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

const renderer = await createCliRenderer({
  targetFps: 60,
  maxFps: 120,
  exitOnCtrlC: false,
  onDestroy: async () => {
    const duration = formatDuration(Date.now() - sessionStartTime);
    const lines = [
      "",
      "  ██╗  ██╗ ██████╗ ██████╗  █████╗           █████╗ ██████╗  ██████╗",
      "  ██║ ██╔╝██╔═══██╗██╔══██╗██╔══██╗         ██╔══██╗██╔══██╗██╔════╝",
      "  █████╔╝ ██║   ██║██║  ██║███████║ ███████ ███████║██████╔╝██║     ",
      "  ██╔═██╗ ██║   ██║██║  ██║██╔══██║         ██╔══██║██╔══██╗██║     ",
      "  ██║  ██╗╚██████╔╝██████╔╝██║  ██║         ██║  ██║██║  ██║╚██████╗",
      "  ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝         ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝",
      "",
      `  Session: ${duration}  •  Thanks for building with KodaArc`,
      "",
    ];
    process.stdout.write("\x1b[0m\n");
    lines.forEach((line) => process.stdout.write(`\x1b[36m${line}\x1b[0m\n`));
    renderer.triggerNotification("KodaArc session ended", "KodaArc");
    process.stdout.write("\x1b[?25h\x1b[0m");
  },
});
createRoot(renderer).render(<App />);

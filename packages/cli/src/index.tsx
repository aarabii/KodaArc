import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { App } from "./app";
import { runExitAnimation } from "./utils";

const renderer = await createCliRenderer({
  targetFps: 60,
  maxFps: 120,
  exitOnCtrlC: false,
  onDestroy: runExitAnimation,
});

createRoot(renderer).render(<App />);

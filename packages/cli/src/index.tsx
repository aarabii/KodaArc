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

renderer.setCursorStyle({
  style: "line",
  blinking: true,
});

createRoot(renderer).render(<App />);

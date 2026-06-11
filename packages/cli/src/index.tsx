import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { hexToRgb, toAnsi } from "./utils/ansi";
import { asciiLines } from "./assets/ascii";
import { getInitialTheme } from "./providers/theme";
import { createMemoryRouter, RouterProvider } from "react-router";
import { RootLayout } from "./layout/root";
import { Home } from "./screens/home";

const router = createMemoryRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "sessions/new",
        element: (
          <box>
            <text>sessions</text>
          </box>
        ),
      },
      {
        path: "sessions/:id",
        element: (
          <box>
            <text>session/id</text>
          </box>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
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

    const primaryRgb = hexToRgb(theme.colors.primary);
    const thinkingRgb = hexToRgb(theme.colors.thinking);

    /** Smooth truecolor interpolation: thinking → primary */
    function gradientAnsi(t: number): string {
      if (!primaryRgb || !thinkingRgb) return t < 0.5 ? thinking : primary;
      const r = Math.round(thinkingRgb.r + (primaryRgb.r - thinkingRgb.r) * t);
      const g = Math.round(thinkingRgb.g + (primaryRgb.g - thinkingRgb.g) * t);
      const b = Math.round(thinkingRgb.b + (primaryRgb.b - thinkingRgb.b) * t);
      return `38;2;${r};${g};${b}`;
    }

    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    // ── Dev wisdom — a different thought every exit ──
    const thoughts = [
      {
        text: "Make it work, make it right, make it fast.",
        author: "Kent Beck",
      },
      {
        text: "Simplicity is the ultimate sophistication.",
        author: "Leonardo da Vinci",
      },
      {
        text: "First, solve the problem. Then, write the code.",
        author: "John Johnson",
      },
      {
        text: "The only way to go fast is to go well.",
        author: "Robert C. Martin",
      },
      { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
      {
        text: "Programs must be written for people to read.",
        author: "Hal Abelson",
      },
      { text: "The best code is no code at all.", author: "Jeff Atwood" },
      {
        text: "Weeks of coding can save you hours of planning.",
        author: "Anonymous",
      },
      { text: "Every expert was once a beginner.", author: "Helen Hayes" },
      { text: "Done is better than perfect.", author: "Sheryl Sandberg" },
      {
        text: "Debugging is twice as hard as writing the code.",
        author: "Brian Kernighan",
      },
      { text: "Move fast and fix things.", author: "GitHub Engineering" },
    ];

    // ── Time-aware farewell ──
    const hour = new Date().getHours();
    const greeting =
      hour < 6
        ? "Late night session. Rest well, builder."
        : hour < 12
          ? "Morning session wrapped. Make today count."
          : hour < 18
            ? "Afternoon flow complete. Keep shipping."
            : "Evening wrap-up. Great work today.";

    // ═══════════════════════════════════════════
    //  RENDER EXIT SCREEN
    // ═══════════════════════════════════════════

    process.stdout.write("\x1b[?25l"); // hide cursor
    process.stdout.write("\n");

    // ── 1. Logo with smooth truecolor gradient ──
    const maxLineLen = Math.max(...asciiLines.map((l) => l.length));
    for (const line of asciiLines) {
      let rendered = "";
      for (let i = 0; i < line.length; i++) {
        const t = line.length > 1 ? i / (line.length - 1) : 0;
        rendered += `\x1b[${gradientAnsi(t)}m${line[i]}`;
      }
      process.stdout.write(`${rendered}\x1b[0m\n`);
    }

    // ── 2. Animated gradient separator (draws left → right) ──
    process.stdout.write("\n  ");
    const sepWidth = maxLineLen - 2;
    for (let i = 0; i < sepWidth; i++) {
      const t = sepWidth > 1 ? i / (sepWidth - 1) : 0;
      process.stdout.write(`\x1b[${gradientAnsi(t)}m─\x1b[0m`);
      if (i % 4 === 0) await sleep(10);
    }
    process.stdout.write("\n\n");

    // ── 3. Session status + time-aware greeting ──
    process.stdout.write(
      `  \x1b[1m\x1b[${success}m✦\x1b[0m \x1b[1mSession Complete\x1b[0m  \x1b[${dim}m·\x1b[0m  \x1b[2m${greeting}\x1b[0m\n`,
    );

    // ── 4. Typewriter wisdom quote ──
    const thought = thoughts[Math.floor(Math.random() * thoughts.length)]!;
    const quoteText = `  \u201c${thought.text}\u201d`;

    process.stdout.write("\n");
    for (const char of quoteText) {
      process.stdout.write(`\x1b[${primary}m${char}\x1b[0m`);
      await sleep(18);
    }
    process.stdout.write("\n");

    // Author (appears after a pause)
    await sleep(400);
    process.stdout.write(
      `  \x1b[2m\x1b[${dim}m\u2014 ${thought.author}\x1b[0m\n`,
    );

    // ── 5. GitHub link ──
    await sleep(300);
    process.stdout.write("\n");
    process.stdout.write(
      `  \x1b[2mStar us \u2192\x1b[0m \x1b[4m\x1b[${info}mhttps://github.com/aarabii/KodaArc\x1b[0m\n\n`,
    );

    process.stdout.write("\x1b[?25h"); // show cursor
  },
});
createRoot(renderer).render(<App />);

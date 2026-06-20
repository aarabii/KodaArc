import type { ThemeColorProps, ThemeProps } from "./types";

export const THEME: ThemeProps[] = [
  // ─────────────────────────────────────────────────────────
  // 1. Arc Dark
  //    Dominant: Deep indigo-charcoal neutrals
  //    Supporting: Steel blue-grays
  //    Accents: Electric cyan, coral, amber
  //    Mood: The signature dark theme — confident, focused, professional
  // ─────────────────────────────────────────────────────────
  {
    name: "Arc Dark",
    colors: {
      brand: {
        primary: "#6ea2f7",
        secondary: "#a78bfa",
      },
      text: {
        primary: "#e2e4e9",
        secondary: "#9ba1b0",
        muted: "#5c6170",
        inverse: "#0f1117",
      },
      bg: {
        base: "#0f1117",
        surface: "#181a24",
        elevated: "#212433",
      },
      border: {
        default: "#2a2e3e",
        dim: "#1e2130",
      },
      agent: {
        plan: "#6ea2f7",
        build: "#34d399",
        thinking: "#a78bfa",
        idle: "#4a5068",
      },
      selection: {
        bg: "#293256",
        text: "#e2e4e9",
      },
      toast: {
        success: {
          bg: "#0d2818",
          border: "#166534",
          accent: "#4ade80",
          text: "#a7f3d0",
        },
        error: {
          bg: "#2a0f14",
          border: "#991b1b",
          accent: "#f87171",
          text: "#fecaca",
        },
        info: {
          bg: "#0c1a2e",
          border: "#1e40af",
          accent: "#60a5fa",
          text: "#bfdbfe",
        },
        warning: {
          bg: "#2a1f06",
          border: "#92400e",
          accent: "#fbbf24",
          text: "#fde68a",
        },
      },
      errorMessage: {
        bg: "#1f1015",
        border: "#e34667",
        text: "#f9a8ba",
      },
    },
  },

  // ─────────────────────────────────────────────────────────
  // 2. Solstice
  //    Dominant: Warm onyx / dark chocolate neutrals
  //    Supporting: Burnished amber and bronze
  //    Accents: Golden wheat, rust, sage
  //    Mood: Warm evenings, golden hour, crafted luxury
  // ─────────────────────────────────────────────────────────
  {
    name: "Solstice",
    colors: {
      brand: {
        primary: "#e4a853",
        secondary: "#c47d3b",
      },
      text: {
        primary: "#ede5d8",
        secondary: "#a89e8d",
        muted: "#6b6358",
        inverse: "#1a1510",
      },
      bg: {
        base: "#131110",
        surface: "#1d1a17",
        elevated: "#272320",
      },
      border: {
        default: "#33302b",
        dim: "#262320",
      },
      agent: {
        plan: "#e4a853",
        build: "#7dba6e",
        thinking: "#d48c5c",
        idle: "#524d46",
      },
      selection: {
        bg: "#3d3020",
        text: "#ede5d8",
      },
      toast: {
        success: {
          bg: "#132210",
          border: "#2d6a24",
          accent: "#7dba6e",
          text: "#bae0b2",
        },
        error: {
          bg: "#2b1210",
          border: "#9b2c20",
          accent: "#e85d4a",
          text: "#f5b4aa",
        },
        info: {
          bg: "#161920",
          border: "#3a5a8c",
          accent: "#6b9fd4",
          text: "#b3d4f0",
        },
        warning: {
          bg: "#2b2210",
          border: "#8a6818",
          accent: "#e4a853",
          text: "#f0d89a",
        },
      },
      errorMessage: {
        bg: "#241411",
        border: "#c94d3a",
        text: "#f0a899",
      },
    },
  },

  // ─────────────────────────────────────────────────────────
  // 3. Meridian
  //    Dominant: Deep ocean blue-blacks
  //    Supporting: Teal and cyan undertones
  //    Accents: Seafoam green, coral, warm white
  //    Mood: Deep water, navigation, serene depth
  // ─────────────────────────────────────────────────────────
  {
    name: "Meridian",
    colors: {
      brand: {
        primary: "#3ec9b0",
        secondary: "#2d8fa7",
      },
      text: {
        primary: "#dce8eb",
        secondary: "#8ea7ae",
        muted: "#50696f",
        inverse: "#0b1416",
      },
      bg: {
        base: "#0b1416",
        surface: "#11202a",
        elevated: "#172d37",
      },
      border: {
        default: "#213a45",
        dim: "#182c35",
      },
      agent: {
        plan: "#3ec9b0",
        build: "#5dd4a8",
        thinking: "#5ba3c4",
        idle: "#3a5860",
      },
      selection: {
        bg: "#163840",
        text: "#dce8eb",
      },
      toast: {
        success: {
          bg: "#0a2018",
          border: "#1a6b4a",
          accent: "#4ad4a0",
          text: "#a3f0d2",
        },
        error: {
          bg: "#231014",
          border: "#8c2535",
          accent: "#e65c6e",
          text: "#f4b0ba",
        },
        info: {
          bg: "#0c1820",
          border: "#1a5580",
          accent: "#4aa8e0",
          text: "#a8d8f5",
        },
        warning: {
          bg: "#221c0c",
          border: "#846218",
          accent: "#d4a640",
          text: "#efd48c",
        },
      },
      errorMessage: {
        bg: "#1e1015",
        border: "#d4546a",
        text: "#f0a5b4",
      },
    },
  },

  // ─────────────────────────────────────────────────────────
  // 4. Obsidian
  //    Dominant: Pure carbon blacks with cool undertones
  //    Supporting: Anthracite and steel grays
  //    Accents: Violet, electric blue, fuchsia
  //    Mood: Monolithic, premium, night architecture
  // ─────────────────────────────────────────────────────────
  {
    name: "Obsidian",
    colors: {
      brand: {
        primary: "#8b7cf6",
        secondary: "#c678dd",
      },
      text: {
        primary: "#e1e3ea",
        secondary: "#8e92a4",
        muted: "#525668",
        inverse: "#0c0d12",
      },
      bg: {
        base: "#0c0d12",
        surface: "#14161e",
        elevated: "#1c1f2b",
      },
      border: {
        default: "#282b3a",
        dim: "#1f2230",
      },
      agent: {
        plan: "#8b7cf6",
        build: "#56d4a5",
        thinking: "#c678dd",
        idle: "#3d4058",
      },
      selection: {
        bg: "#2c2858",
        text: "#e1e3ea",
      },
      toast: {
        success: {
          bg: "#0c2016",
          border: "#1b6640",
          accent: "#56d4a5",
          text: "#a4ebd0",
        },
        error: {
          bg: "#261018",
          border: "#8b2040",
          accent: "#e8507a",
          text: "#f4a8be",
        },
        info: {
          bg: "#0e1528",
          border: "#2844a0",
          accent: "#6580f0",
          text: "#b0c0f8",
        },
        warning: {
          bg: "#26200e",
          border: "#8c6c18",
          accent: "#e0b040",
          text: "#f0d888",
        },
      },
      errorMessage: {
        bg: "#1e0e1a",
        border: "#c050a0",
        text: "#e8a8d4",
      },
    },
  },

  // ─────────────────────────────────────────────────────────
  // 5. Boreal
  //    Dominant: Frosted navy and arctic blue-grays
  //    Supporting: Glacier blue and cool sage
  //    Accents: Aurora green, pale lavender, frost
  //    Mood: Northern lights, crisp air, Nordic clarity
  // ─────────────────────────────────────────────────────────
  {
    name: "Boreal",
    colors: {
      brand: {
        primary: "#81c8be",
        secondary: "#7aa2d4",
      },
      text: {
        primary: "#d8dee9",
        secondary: "#8896aa",
        muted: "#566072",
        inverse: "#1a2030",
      },
      bg: {
        base: "#1a2030",
        surface: "#212839",
        elevated: "#293344",
      },
      border: {
        default: "#33405a",
        dim: "#2a3548",
      },
      agent: {
        plan: "#81c8be",
        build: "#a3e48c",
        thinking: "#b4a0e0",
        idle: "#445068",
      },
      selection: {
        bg: "#2a3d56",
        text: "#d8dee9",
      },
      toast: {
        success: {
          bg: "#102818",
          border: "#1d6844",
          accent: "#66d4a0",
          text: "#a8ecc8",
        },
        error: {
          bg: "#281418",
          border: "#882430",
          accent: "#e06070",
          text: "#f4b0b8",
        },
        info: {
          bg: "#101c2c",
          border: "#244a80",
          accent: "#5498d4",
          text: "#a8d0f0",
        },
        warning: {
          bg: "#28220c",
          border: "#886818",
          accent: "#d8a840",
          text: "#f0d88c",
        },
      },
      errorMessage: {
        bg: "#241418",
        border: "#d05060",
        text: "#f0a8b0",
      },
    },
  },

  // ─────────────────────────────────────────────────────────
  // 6. Ember
  //    Dominant: Charred burgundy and deep mahogany
  //    Supporting: Smoky rose and muted crimson
  //    Accents: Bright coral, amber flame, warm cream
  //    Mood: Embers glowing, warmth, controlled intensity
  // ─────────────────────────────────────────────────────────
  {
    name: "Ember",
    colors: {
      brand: {
        primary: "#f07060",
        secondary: "#d4524a",
      },
      text: {
        primary: "#ece2de",
        secondary: "#a8948e",
        muted: "#685a54",
        inverse: "#141010",
      },
      bg: {
        base: "#141010",
        surface: "#1e1818",
        elevated: "#2a2222",
      },
      border: {
        default: "#3a302e",
        dim: "#2e2624",
      },
      agent: {
        plan: "#f07060",
        build: "#6cc490",
        thinking: "#d49870",
        idle: "#504444",
      },
      selection: {
        bg: "#4a2828",
        text: "#ece2de",
      },
      toast: {
        success: {
          bg: "#102016",
          border: "#266840",
          accent: "#6cc490",
          text: "#ade8c4",
        },
        error: {
          bg: "#2c1010",
          border: "#a02020",
          accent: "#f06060",
          text: "#f8b0b0",
        },
        info: {
          bg: "#10182a",
          border: "#28508c",
          accent: "#5c94d8",
          text: "#a8ccf0",
        },
        warning: {
          bg: "#2a2010",
          border: "#8c6820",
          accent: "#e0a844",
          text: "#f0d490",
        },
      },
      errorMessage: {
        bg: "#241214",
        border: "#d8403c",
        text: "#f09890",
      },
    },
  },

  // ─────────────────────────────────────────────────────────
  // 7. Zenith
  //    Dominant: Ultra-dark graphite with subtle blue cast
  //    Supporting: Silver and pearl gray tones
  //    Accents: Crisp white, electric indigo, soft gold
  //    Mood: Peak clarity, minimalist luxury, high-altitude
  // ─────────────────────────────────────────────────────────
  {
    name: "Zenith",
    colors: {
      brand: {
        primary: "#5b8def",
        secondary: "#9da8c0",
      },
      text: {
        primary: "#e8eaf0",
        secondary: "#a0a8b8",
        muted: "#606878",
        inverse: "#101218",
      },
      bg: {
        base: "#101218",
        surface: "#181c24",
        elevated: "#222830",
      },
      border: {
        default: "#2e3440",
        dim: "#242a34",
      },
      agent: {
        plan: "#5b8def",
        build: "#42d49a",
        thinking: "#8880d8",
        idle: "#444c5c",
      },
      selection: {
        bg: "#24345c",
        text: "#e8eaf0",
      },
      toast: {
        success: {
          bg: "#0e2418",
          border: "#1e6c48",
          accent: "#42d49a",
          text: "#a0eecc",
        },
        error: {
          bg: "#28101a",
          border: "#901838",
          accent: "#e84868",
          text: "#f4a0b4",
        },
        info: {
          bg: "#0e1830",
          border: "#1e3c90",
          accent: "#5b8def",
          text: "#a8c8f8",
        },
        warning: {
          bg: "#2a2210",
          border: "#8a6c1c",
          accent: "#dca84c",
          text: "#f0d898",
        },
      },
      errorMessage: {
        bg: "#201018",
        border: "#d04060",
        text: "#f09cb0",
      },
    },
  },

  // ─────────────────────────────────────────────────────────
  // 8. Mistveil
  //    Dominant: Dusty mauve and plum-gray
  //    Supporting: Muted lavender and heather
  //    Accents: Rose quartz, soft peach, lilac
  //    Mood: Twilight fog, soft mystery, poetic
  // ─────────────────────────────────────────────────────────
  {
    name: "Mistveil",
    colors: {
      brand: {
        primary: "#c4a0e0",
        secondary: "#9876b4",
      },
      text: {
        primary: "#e6dde8",
        secondary: "#a098aa",
        muted: "#605868",
        inverse: "#14101a",
      },
      bg: {
        base: "#14101a",
        surface: "#1c1824",
        elevated: "#261e30",
      },
      border: {
        default: "#342a40",
        dim: "#282035",
      },
      agent: {
        plan: "#c4a0e0",
        build: "#68c8a0",
        thinking: "#b088cc",
        idle: "#484058",
      },
      selection: {
        bg: "#382a50",
        text: "#e6dde8",
      },
      toast: {
        success: {
          bg: "#0e2018",
          border: "#206848",
          accent: "#68c8a0",
          text: "#a8e8cc",
        },
        error: {
          bg: "#28101c",
          border: "#8c2040",
          accent: "#e05878",
          text: "#f4a8be",
        },
        info: {
          bg: "#101428",
          border: "#304088",
          accent: "#6878d8",
          text: "#b0b8f0",
        },
        warning: {
          bg: "#2a2010",
          border: "#887020",
          accent: "#d8a848",
          text: "#f0d894",
        },
      },
      errorMessage: {
        bg: "#22101c",
        border: "#c44878",
        text: "#eca4c0",
      },
    },
  },

  // ─────────────────────────────────────────────────────────
  // 9. Ironwood
  //    Dominant: Forest-tinted dark grays
  //    Supporting: Olive, moss, deep sage
  //    Accents: Bright lime, tawny gold, stone
  //    Mood: Dense forest, grounded strength, earthy tech
  // ─────────────────────────────────────────────────────────
  {
    name: "Ironwood",
    colors: {
      brand: {
        primary: "#8cc084",
        secondary: "#5c9468",
      },
      text: {
        primary: "#dce0d8",
        secondary: "#96a08e",
        muted: "#586050",
        inverse: "#101410",
      },
      bg: {
        base: "#101410",
        surface: "#181e18",
        elevated: "#222a22",
      },
      border: {
        default: "#303830",
        dim: "#262e26",
      },
      agent: {
        plan: "#8cc084",
        build: "#60c8a0",
        thinking: "#88a4c0",
        idle: "#404840",
      },
      selection: {
        bg: "#283828",
        text: "#dce0d8",
      },
      toast: {
        success: {
          bg: "#0c2210",
          border: "#1e6c34",
          accent: "#60d480",
          text: "#a8eeb8",
        },
        error: {
          bg: "#281014",
          border: "#901828",
          accent: "#e04858",
          text: "#f4a0ac",
        },
        info: {
          bg: "#0e182c",
          border: "#1e4080",
          accent: "#4c8ce0",
          text: "#a8c8f0",
        },
        warning: {
          bg: "#2a2410",
          border: "#887018",
          accent: "#d8a840",
          text: "#f0d890",
        },
      },
      errorMessage: {
        bg: "#201210",
        border: "#c84830",
        text: "#f0a090",
      },
    },
  },

  // ─────────────────────────────────────────────────────────
  // 10. Lumina
  //     Dominant: Light pearl and cool white
  //     Supporting: Soft slate and cloud gray
  //     Accents: Sapphire blue, vivid teal, warm pink
  //     Mood: Daylight studio, bright clarity, open and airy
  // ─────────────────────────────────────────────────────────
  {
    name: "Lumina",
    colors: {
      brand: {
        primary: "#3a6ef2",
        secondary: "#7c5cc8",
      },
      text: {
        primary: "#1c1e28",
        secondary: "#50546a",
        muted: "#8890a4",
        inverse: "#f4f5f8",
      },
      bg: {
        base: "#f4f5f8",
        surface: "#eaedf2",
        elevated: "#ffffff",
      },
      border: {
        default: "#d0d5e0",
        dim: "#e2e5ec",
      },
      agent: {
        plan: "#3a6ef2",
        build: "#18a860",
        thinking: "#7c5cc8",
        idle: "#a0a8b8",
      },
      selection: {
        bg: "#d4dff8",
        text: "#1c1e28",
      },
      toast: {
        success: {
          bg: "#ecf8f0",
          border: "#4caf6c",
          accent: "#18784a",
          text: "#145838",
        },
        error: {
          bg: "#fdf0f0",
          border: "#e04848",
          accent: "#b42020",
          text: "#8c1818",
        },
        info: {
          bg: "#eef3fc",
          border: "#4882e0",
          accent: "#2050b0",
          text: "#183c80",
        },
        warning: {
          bg: "#fdf8ec",
          border: "#d09830",
          accent: "#9c6c10",
          text: "#785410",
        },
      },
      errorMessage: {
        bg: "#fceced",
        border: "#dc3a48",
        text: "#a02028",
      },
    },
  },
];

export const DEFAULT_THEME = THEME.find((t) => t.name === "Arc Dark");

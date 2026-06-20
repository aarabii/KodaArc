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

  // ── 1. Deep Tide ────────────────────────────────────────────────────────────
  // Origin: Abyssal Trench
  // Palette: Cold deep-ocean blues with a cyan primary and blush-pink secondary.
  // 60%: Near-black navy bg family (#01040F → #051338)
  // 30%: Ice-blue text, slate borders
  // 10%: Cyan brand, blush pink agent/toast accents
  {
    name: "Deep Tide",
    colors: {
      brand: {
        primary: "#00B4D8",
        secondary: "#F49CBB",
      },
      text: {
        primary: "#C8E6EC",
        secondary: "#7DA8B4",
        muted: "#3A5E6A",
        inverse: "#01040F",
      },
      bg: {
        base: "#01040F",
        surface: "#030A1F",
        elevated: "#051338",
      },
      border: {
        default: "#081B4B",
        dim: "#020614",
      },
      agent: {
        plan: "#F49CBB",
        build: "#FFB703",
        thinking: "#3A5257",
        idle: "#0A1A2E",
      },
      selection: {
        bg: "#002A33",
        text: "#E0F7FC",
      },
      toast: {
        success: {
          bg: "#061519",
          border: "#12373F",
          accent: "#48CAE4",
          text: "#7EDCEF",
        },
        error: {
          bg: "#1A0505",
          border: "#3D0E0E",
          accent: "#D62828",
          text: "#F06060",
        },
        info: {
          bg: "#000F17",
          border: "#00263A",
          accent: "#0077B6",
          text: "#4DA8D8",
        },
        warning: {
          bg: "#1F1600",
          border: "#473300",
          accent: "#FFB703",
          text: "#FFCE54",
        },
      },
      errorMessage: {
        bg: "#130303",
        border: "#D62828",
        text: "#F06060",
      },
    },
  },

  // ── 2. Warm Ember ───────────────────────────────────────────────────────────
  // Origin: Anthropic Dusk
  // Palette: Charcoal neutrals warmed by terracotta and amber — Anthropic's own
  //          brand tones brought into a refined dark workspace.
  // 60%: Near-black charcoal bg family (#191919 → #2B2B2B)
  // 30%: Dusty rose-cream text, neutral dark borders
  // 10%: Terracotta primary, amber secondary/agent
  {
    name: "Warm Ember",
    colors: {
      brand: {
        primary: "#D77757",
        secondary: "#E09A67",
      },
      text: {
        primary: "#E8D5CC",
        secondary: "#B39A8E",
        muted: "#6B5A50",
        inverse: "#191919",
      },
      bg: {
        base: "#191919",
        surface: "#222222",
        elevated: "#2B2B2B",
      },
      border: {
        default: "#3A3A3A",
        dim: "#2A2A2A",
      },
      agent: {
        plan: "#E09A67",
        build: "#FFC257",
        thinking: "#B392F0",
        idle: "#333333",
      },
      selection: {
        bg: "#3D2D27",
        text: "#F5E6DD",
      },
      toast: {
        success: {
          bg: "#1C3524",
          border: "#2A5C38",
          accent: "#4EBA65",
          text: "#7AD48D",
        },
        error: {
          bg: "#3D1B20",
          border: "#66242C",
          accent: "#FF6B80",
          text: "#FF9DAB",
        },
        info: {
          bg: "#162C3D",
          border: "#244561",
          accent: "#59B2FF",
          text: "#8DCAFF",
        },
        warning: {
          bg: "#382B16",
          border: "#5C451D",
          accent: "#FFC257",
          text: "#FFD88A",
        },
      },
      errorMessage: {
        bg: "#2E1418",
        border: "#FF6B80",
        text: "#FF9DAB",
      },
    },
  },

  // ── 3. Aqua Depths ──────────────────────────────────────────────────────────
  // Origin: Arc Dark
  // Palette: Midnight ocean with teal highlights and a soft lavender accent —
  //          cool-temperature depth, never cold.
  // 60%: Near-black teal-tinted bg family (#000D12 → #031E28)
  // 30%: Seafoam text, deep navy borders
  // 10%: Teal primary, lavender secondary/agent
  {
    name: "Aqua Depths",
    colors: {
      brand: {
        primary: "#56D6C2",
        secondary: "#A78BDB",
      },
      text: {
        primary: "#C5E8E2",
        secondary: "#7AAFA5",
        muted: "#3F6D65",
        inverse: "#000D12",
      },
      bg: {
        base: "#000D12",
        surface: "#001219",
        elevated: "#031E28",
      },
      border: {
        default: "#0E3050",
        dim: "#0D2030",
      },
      agent: {
        plan: "#A78BDB",
        build: "#E8A838",
        thinking: "#3F5466",
        idle: "#0D2030",
      },
      selection: {
        bg: "#1A3D4F",
        text: "#D8F5EF",
      },
      toast: {
        success: {
          bg: "#0A1F14",
          border: "#1A3D2B",
          accent: "#82E0AA",
          text: "#A8ECC4",
        },
        error: {
          bg: "#1F0A0D",
          border: "#3D1520",
          accent: "#E74C5E",
          text: "#F07A88",
        },
        info: {
          bg: "#0A1A1F",
          border: "#153040",
          accent: "#56D6C2",
          text: "#80E4D4",
        },
        warning: {
          bg: "#1F1608",
          border: "#3D2C10",
          accent: "#E8A838",
          text: "#F0C46A",
        },
      },
      errorMessage: {
        bg: "#18090B",
        border: "#E74C5E",
        text: "#F07A88",
      },
    },
  },

  // ── 4. Steel Harbor ─────────────────────────────────────────────────────────
  // Origin: Crimson Tide
  // Palette: Industrial dark blue with a steel-blue primary and warm orange
  //          as a contrasting accent — ocean-meet-port energy.
  // 60%: Dark slate-blue bg family (#060D17 → #122136)
  // 30%: Powder-blue text, navy borders
  // 10%: Steel blue primary, sandy orange agent/secondary
  {
    name: "Steel Harbor",
    colors: {
      brand: {
        primary: "#457B9D",
        secondary: "#F4A261",
      },
      text: {
        primary: "#BDD1DC",
        secondary: "#7A9AAE",
        muted: "#3D5E6E",
        inverse: "#060D17",
      },
      bg: {
        base: "#060D17",
        surface: "#0C1726",
        elevated: "#122136",
      },
      border: {
        default: "#192A42",
        dim: "#091221",
      },
      agent: {
        plan: "#F4A261",
        build: "#E9C46A",
        thinking: "#3D4E59",
        idle: "#091221",
      },
      selection: {
        bg: "#122533",
        text: "#D5E5EF",
      },
      toast: {
        success: {
          bg: "#0F191A",
          border: "#2D474A",
          accent: "#A8DADC",
          text: "#C4EAEC",
        },
        error: {
          bg: "#1F070A",
          border: "#421217",
          accent: "#E63946",
          text: "#F06E78",
        },
        info: {
          bg: "#040912",
          border: "#0D1C30",
          accent: "#457B9D",
          text: "#7AACCF",
        },
        warning: {
          bg: "#1F1A0E",
          border: "#42381E",
          accent: "#E9C46A",
          text: "#F2D898",
        },
      },
      errorMessage: {
        bg: "#180608",
        border: "#E63946",
        text: "#F06E78",
      },
    },
  },

  // ── 5. Night City ───────────────────────────────────────────────────────────
  // Origin: Cyberpunk Eclipse
  // Palette: Dracula-inspired dark purple canvas with neon pink and electric
  //          cyan — the canonical cyberpunk color grammar.
  // 60%: Deep purple-gray bg family (#0d0e15 → #1f233a)
  // 30%: Off-white text, dark purple borders
  // 10%: Hot pink primary, electric cyan secondary/agent
  {
    name: "Night City",
    colors: {
      brand: {
        primary: "#FF79C6",
        secondary: "#8BE9FD",
      },
      text: {
        primary: "#F8F8F2",
        secondary: "#BFBFB6",
        muted: "#6272A4",
        inverse: "#0D0E15",
      },
      bg: {
        base: "#0D0E15",
        surface: "#151726",
        elevated: "#1F233A",
      },
      border: {
        default: "#44475A",
        dim: "#282A36",
      },
      agent: {
        plan: "#8BE9FD",
        build: "#F1FA8C",
        thinking: "#BD93F9",
        idle: "#282A36",
      },
      selection: {
        bg: "#44475A",
        text: "#F8F8F2",
      },
      toast: {
        success: {
          bg: "#112C1A",
          border: "#1D4D2B",
          accent: "#50FA7B",
          text: "#7DFBA0",
        },
        error: {
          bg: "#331414",
          border: "#592222",
          accent: "#FF5555",
          text: "#FF8888",
        },
        info: {
          bg: "#132C33",
          border: "#224D59",
          accent: "#8BE9FD",
          text: "#B2F0FD",
        },
        warning: {
          bg: "#30321A",
          border: "#54572C",
          accent: "#F1FA8C",
          text: "#F6FCB4",
        },
      },
      errorMessage: {
        bg: "#281010",
        border: "#FF5555",
        text: "#FF8888",
      },
    },
  },

  // ── 6. Velvet Orchid ────────────────────────────────────────────────────────
  // Origin: Electric Orchid
  // Palette: Near-black with deep purple hues, a berry-magenta primary and
  //          soft lavender secondary — lush, intimate, editorial.
  // 60%: Darkest purple-black bg family (#0B0710 → #1C1325)
  // 30%: Dusty rose text, violet borders
  // 10%: Berry magenta primary, lavender secondary/agent
  {
    name: "Velvet Orchid",
    colors: {
      brand: {
        primary: "#BC5090",
        secondary: "#C095E4",
      },
      text: {
        primary: "#E8D4E0",
        secondary: "#A87C9A",
        muted: "#5E3D52",
        inverse: "#0B0710",
      },
      bg: {
        base: "#0B0710",
        surface: "#15101B",
        elevated: "#1C1325",
      },
      border: {
        default: "#3A2248",
        dim: "rgba(255,255,255,0.07)",
      },
      agent: {
        plan: "#893F71",
        build: "#FFB347",
        thinking: "#C095E4",
        idle: "#1A0F22",
      },
      selection: {
        bg: "rgba(188,80,144,0.18)",
        text: "#F0D8E8",
      },
      toast: {
        success: {
          bg: "rgba(52,211,153,0.13)",
          border: "#14532D",
          accent: "#34D399",
          text: "#6FE8BA",
        },
        error: {
          bg: "rgba(251,113,133,0.13)",
          border: "#7F1D1D",
          accent: "#FB7185",
          text: "#FCA0AD",
        },
        info: {
          bg: "rgba(141,183,210,0.13)",
          border: "#274C77",
          accent: "#8DB7D2",
          text: "#B2D0E2",
        },
        warning: {
          bg: "rgba(255,179,71,0.13)",
          border: "#92400E",
          accent: "#FFB347",
          text: "#FFCC80",
        },
      },
      errorMessage: {
        bg: "rgba(251,113,133,0.09)",
        border: "#FB7185",
        text: "#FCA0AD",
      },
    },
  },

  // ── 7. Amber Noir ───────────────────────────────────────────────────────────
  // Origin: Ember Noir
  // Palette: Blackened charcoal with scorched-orange and molten amber —
  //          fire light against soot.
  // 60%: Very dark brown-black bg family (#0E0A08 → #201815)
  // 30%: Warm cream text, burnt sienna borders
  // 10%: Flame orange primary, amber secondary/agent
  {
    name: "Amber Noir",
    colors: {
      brand: {
        primary: "#FF7700",
        secondary: "#F29F05",
      },
      text: {
        primary: "#F0D5BF",
        secondary: "#B0886A",
        muted: "#6B4E3A",
        inverse: "#0E0A08",
      },
      bg: {
        base: "#0E0A08",
        surface: "#171110",
        elevated: "#201815",
      },
      border: {
        default: "#3D2818",
        dim: "rgba(255,255,255,0.07)",
      },
      agent: {
        plan: "#F29F05",
        build: "#FBBF24",
        thinking: "#E04D01",
        idle: "#1C1410",
      },
      selection: {
        bg: "rgba(255,119,0,0.18)",
        text: "#FFF0E0",
      },
      toast: {
        success: {
          bg: "rgba(134,239,172,0.13)",
          border: "#14532D",
          accent: "#86EFAC",
          text: "#AEF5C8",
        },
        error: {
          bg: "rgba(255,107,107,0.13)",
          border: "#7F1D1D",
          accent: "#FF6B6B",
          text: "#FF9C9C",
        },
        info: {
          bg: "rgba(125,211,252,0.13)",
          border: "#0F4C75",
          accent: "#7DD3FC",
          text: "#A8E2FD",
        },
        warning: {
          bg: "rgba(251,191,36,0.13)",
          border: "#92400E",
          accent: "#FBBF24",
          text: "#FCD668",
        },
      },
      errorMessage: {
        bg: "rgba(255,107,107,0.09)",
        border: "#FF6B6B",
        text: "#FF9C9C",
      },
    },
  },

  // ── 8. Teal Shore ───────────────────────────────────────────────────────────
  // Origin: Emerald Coast
  // Palette: Deep coastal night with a muted jade primary and warm sand
  //          accent — where the sea meets warm evening light.
  // 60%: Near-black teal-tinted bg family (#081012 → #14242B)
  // 30%: Cool sage text, dark teal borders
  // 10%: Jade teal primary, sun-gold secondary/agent
  {
    name: "Teal Shore",
    colors: {
      brand: {
        primary: "#2A9D8F",
        secondary: "#E9C46A",
      },
      text: {
        primary: "#C0DDD8",
        secondary: "#739E96",
        muted: "#3E5F58",
        inverse: "#081012",
      },
      bg: {
        base: "#081012",
        surface: "#0D181C",
        elevated: "#14242B",
      },
      border: {
        default: "#192B30",
        dim: "#0E1517",
      },
      agent: {
        plan: "#E9C46A",
        build: "#F4A261",
        thinking: "#425C59",
        idle: "#0E1517",
      },
      selection: {
        bg: "#0E3430",
        text: "#D0F0EA",
      },
      toast: {
        success: {
          bg: "#06130E",
          border: "#163526",
          accent: "#52B788",
          text: "#7DD0A5",
        },
        error: {
          bg: "#1F0A06",
          border: "#401910",
          accent: "#E76F51",
          text: "#F09880",
        },
        info: {
          bg: "#050F13",
          border: "#0F222B",
          accent: "#2A9D8F",
          text: "#62C4B8",
        },
        warning: {
          bg: "#1F140A",
          border: "#442A14",
          accent: "#F4A261",
          text: "#F8C090",
        },
      },
      errorMessage: {
        bg: "#180805",
        border: "#E76F51",
        text: "#F09880",
      },
    },
  },

  // ── 9. Deep Forest ──────────────────────────────────────────────────────────
  // Origin: Forest Night
  // Palette: Blackened pine with sage-green primary and lime secondary —
  //          old-growth canopy at midnight.
  // 60%: Deep forest-black bg family (#07110D → #15211B)
  // 30%: Pale sage text, dark moss borders
  // 10%: Forest green primary, bright lime secondary/agent
  {
    name: "Deep Forest",
    colors: {
      brand: {
        primary: "#94BF73",
        secondary: "#B5EA8C",
      },
      text: {
        primary: "#D4E8C6",
        secondary: "#96B580",
        muted: "#4E6B3E",
        inverse: "#07110D",
      },
      bg: {
        base: "#07110D",
        surface: "#101915",
        elevated: "#15211B",
      },
      border: {
        default: "#294035",
        dim: "rgba(255,255,255,0.07)",
      },
      agent: {
        plan: "#526A40",
        build: "#FCD34D",
        thinking: "#B5EA8C",
        idle: "#131C16",
      },
      selection: {
        bg: "rgba(148,191,115,0.18)",
        text: "#E8F5DD",
      },
      toast: {
        success: {
          bg: "rgba(34,197,94,0.13)",
          border: "#14532D",
          accent: "#22C55E",
          text: "#5DDC88",
        },
        error: {
          bg: "rgba(251,113,133,0.13)",
          border: "#7F1D1D",
          accent: "#FB7185",
          text: "#FCA0AD",
        },
        info: {
          bg: "rgba(103,232,249,0.13)",
          border: "#155E75",
          accent: "#67E8F9",
          text: "#94F0FB",
        },
        warning: {
          bg: "rgba(252,211,77,0.13)",
          border: "#854D0E",
          accent: "#FCD34D",
          text: "#FDE180",
        },
      },
      errorMessage: {
        bg: "rgba(251,113,133,0.09)",
        border: "#FB7185",
        text: "#FCA0AD",
      },
    },
  },

  // ── 10. Green Terminal ──────────────────────────────────────────────────────
  // Origin: Matrix Volt
  // Palette: Pure black screen with phosphor lime-green and amber — the
  //          classic hacker terminal brought to life.
  // 60%: Pure black bg family (#000000 → #1e1e1e)
  // 30%: Pale lime text, graphite borders
  // 10%: Lime-green primary, amber secondary/agent
  {
    name: "Green Terminal",
    colors: {
      brand: {
        primary: "#A3E635",
        secondary: "#FBBF24",
      },
      text: {
        primary: "#E4F7C0",
        secondary: "#8AB44A",
        muted: "#4A6620",
        inverse: "#000000",
      },
      bg: {
        base: "#000000",
        surface: "#121212",
        elevated: "#1E1E1E",
      },
      border: {
        default: "#2A2A2A",
        dim: "#1A1A1A",
      },
      agent: {
        plan: "#FBBF24",
        build: "#EAB308",
        thinking: "#22D3EE",
        idle: "#262626",
      },
      selection: {
        bg: "#262626",
        text: "#E4F7C0",
      },
      toast: {
        success: {
          bg: "#14532D",
          border: "#15803D",
          accent: "#22C55E",
          text: "#5DDC88",
        },
        error: {
          bg: "#4C0519",
          border: "#9F1239",
          accent: "#F43F5E",
          text: "#F87088",
        },
        info: {
          bg: "#172554",
          border: "#1D4ED8",
          accent: "#60A5FA",
          text: "#93C0FC",
        },
        warning: {
          bg: "#422006",
          border: "#A16207",
          accent: "#EAB308",
          text: "#F3CF4A",
        },
      },
      errorMessage: {
        bg: "#3A0413",
        border: "#F43F5E",
        text: "#F87088",
      },
    },
  },

  // ── 11. Deep Navy ───────────────────────────────────────────────────────────
  // Origin: Midnight Ocean
  // Palette: Dark midnight blue with periwinkle highlights and a muted
  //          teal secondary — subdued, professional, nautical.
  // 60%: Ink-blue bg family (#08111A → #162131)
  // 30%: Pale periwinkle text, navy borders
  // 10%: Periwinkle primary, dark teal secondary/agent
  {
    name: "Deep Navy",
    colors: {
      brand: {
        primary: "#5E87F5",
        secondary: "#03658C",
      },
      text: {
        primary: "#C8D6F0",
        secondary: "#7E94C0",
        muted: "#3E5278",
        inverse: "#08111A",
      },
      bg: {
        base: "#08111A",
        surface: "#111A27",
        elevated: "#162131",
      },
      border: {
        default: "#20354F",
        dim: "rgba(255,255,255,0.07)",
      },
      agent: {
        plan: "#03658C",
        build: "#F59E0B",
        thinking: "#8BA0A4",
        idle: "#14202E",
      },
      selection: {
        bg: "rgba(94,135,245,0.18)",
        text: "#DDE5F8",
      },
      toast: {
        success: {
          bg: "rgba(52,211,153,0.13)",
          border: "#14532D",
          accent: "#34D399",
          text: "#6FE8BA",
        },
        error: {
          bg: "rgba(248,113,113,0.13)",
          border: "#7F1D1D",
          accent: "#F87171",
          text: "#FA9E9E",
        },
        info: {
          bg: "rgba(56,189,248,0.13)",
          border: "#0F4C75",
          accent: "#38BDF8",
          text: "#70D2FA",
        },
        warning: {
          bg: "rgba(245,158,11,0.13)",
          border: "#78350F",
          accent: "#F59E0B",
          text: "#F8BE56",
        },
      },
      errorMessage: {
        bg: "rgba(248,113,113,0.09)",
        border: "#F87171",
        text: "#FA9E9E",
      },
    },
  },

  // ── 12. Soft Plum ───────────────────────────────────────────────────────────
  // Origin: Midnight Plum
  // Palette: Dark indigo canvas with violet highlight and muted mauve secondary —
  //          restrained luxury, no chrome.
  // 60%: Near-black purple bg family (#080B12 → #151B2C)
  // 30%: Soft lavender text, indigo borders
  // 10%: Violet primary, dusty mauve secondary/agent
  {
    name: "Soft Plum",
    colors: {
      brand: {
        primary: "#B785FF",
        secondary: "#8A508F",
      },
      text: {
        primary: "#DDD0F0",
        secondary: "#9A88BC",
        muted: "#554870",
        inverse: "#080B12",
      },
      bg: {
        base: "#080B12",
        surface: "#101523",
        elevated: "#151B2C",
      },
      border: {
        default: "#2E2548",
        dim: "rgba(255,255,255,0.07)",
      },
      agent: {
        plan: "#8A508F",
        build: "#FBBF24",
        thinking: "#CFA093",
        idle: "#141820",
      },
      selection: {
        bg: "rgba(183,133,255,0.18)",
        text: "#EEE4FF",
      },
      toast: {
        success: {
          bg: "rgba(110,231,183,0.13)",
          border: "#22543D",
          accent: "#6EE7B7",
          text: "#9CF0D0",
        },
        error: {
          bg: "rgba(251,113,133,0.13)",
          border: "#7F1D1D",
          accent: "#FB7185",
          text: "#FCA0AD",
        },
        info: {
          bg: "rgba(125,211,252,0.13)",
          border: "#155E75",
          accent: "#7DD3FC",
          text: "#A8E2FD",
        },
        warning: {
          bg: "rgba(251,191,36,0.13)",
          border: "#7C4A03",
          accent: "#FBBF24",
          text: "#FCD668",
        },
      },
      errorMessage: {
        bg: "rgba(251,113,133,0.09)",
        border: "#FB7185",
        text: "#FCA0AD",
      },
    },
  },

  // ── 13. Dark Matter ─────────────────────────────────────────────────────────
  // Origin: Midnight Singularity
  // Palette: Almost-zero black with deep violet and a neon mint accent —
  //          the color of nothing, punctuated by something.
  // 60%: True near-void bg family (#020205 → #0A0A21)
  // 30%: Dusty purple text, darkest indigo borders
  // 10%: Deep violet primary, neon mint secondary/agent
  {
    name: "Dark Matter",
    colors: {
      brand: {
        primary: "#7B2CBF",
        secondary: "#00F5D4",
      },
      text: {
        primary: "#C8B8E0",
        secondary: "#8070A0",
        muted: "#453868",
        inverse: "#020205",
      },
      bg: {
        base: "#020205",
        surface: "#050512",
        elevated: "#0A0A21",
      },
      border: {
        default: "#111130",
        dim: "#03030A",
      },
      agent: {
        plan: "#00F5D4",
        build: "#FF9900",
        thinking: "#322047",
        idle: "#05050E",
      },
      selection: {
        bg: "#120524",
        text: "#D8C8F0",
      },
      toast: {
        success: {
          bg: "#041404",
          border: "#103310",
          accent: "#47D147",
          text: "#78E278",
        },
        error: {
          bg: "#140404",
          border: "#331010",
          accent: "#FF3333",
          text: "#FF7070",
        },
        info: {
          bg: "#040C14",
          border: "#101F33",
          accent: "#3399FF",
          text: "#70B8FF",
        },
        warning: {
          bg: "#140C00",
          border: "#331F00",
          accent: "#FF9900",
          text: "#FFB84D",
        },
      },
      errorMessage: {
        bg: "#100303",
        border: "#FF3333",
        text: "#FF7070",
      },
    },
  },

  // ── 14. Pure Ash ────────────────────────────────────────────────────────────
  // Origin: Nether Ash
  // Palette: True monochrome charcoal canvas with a singular violet accent —
  //          maximum restraint, one indulgence.
  // 60%: Near-black achromatic bg family (#040404 → #121212)
  // 30%: Light gray text, darkest gray borders
  // 10%: White-gray primary, violet secondary/agent
  {
    name: "Pure Ash",
    colors: {
      brand: {
        primary: "#E0E0E0",
        secondary: "#9B5DE5",
      },
      text: {
        primary: "#D0D0D0",
        secondary: "#8A8A8A",
        muted: "#4A4A4A",
        inverse: "#040404",
      },
      bg: {
        base: "#040404",
        surface: "#0A0A0A",
        elevated: "#121212",
      },
      border: {
        default: "#1A1A1A",
        dim: "#060606",
      },
      agent: {
        plan: "#9B5DE5",
        build: "#F4A261",
        thinking: "#424242",
        idle: "#0A0A0A",
      },
      selection: {
        bg: "#242424",
        text: "#F0F0F0",
      },
      toast: {
        success: {
          bg: "#041412",
          border: "#0D332F",
          accent: "#2A9D8F",
          text: "#5CC4B5",
        },
        error: {
          bg: "#140B08",
          border: "#331B14",
          accent: "#E76F51",
          text: "#F09880",
        },
        info: {
          bg: "#050F12",
          border: "#0F242C",
          accent: "#264653",
          text: "#5B8290",
        },
        warning: {
          bg: "#140E0A",
          border: "#332318",
          accent: "#F4A261",
          text: "#F8C090",
        },
      },
      errorMessage: {
        bg: "#100907",
        border: "#E76F51",
        text: "#F09880",
      },
    },
  },

  // ── 15. Steel Frost ─────────────────────────────────────────────────────────
  // Origin: Nordic Frost
  // Palette: Dark arctic navy with cool slate primary and a warm gold accent —
  //          Scandinavian minimalism at night.
  // 60%: Dark blue-gray bg family (#070E17 → #142136)
  // 30%: Cool silver-blue text, slate-navy borders
  // 10%: Slate blue primary, golden amber secondary/agent
  {
    name: "Steel Frost",
    colors: {
      brand: {
        primary: "#778DA9",
        secondary: "#E9C46A",
      },
      text: {
        primary: "#C5D0DC",
        secondary: "#8A9AAE",
        muted: "#4A5868",
        inverse: "#070E17",
      },
      bg: {
        base: "#070E17",
        surface: "#0D1624",
        elevated: "#142136",
      },
      border: {
        default: "#1B2A42",
        dim: "#0B111A",
      },
      agent: {
        plan: "#E9C46A",
        build: "#F6AE2D",
        thinking: "#485361",
        idle: "#0B111A",
      },
      selection: {
        bg: "#1E2733",
        text: "#D8E2EE",
      },
      toast: {
        success: {
          bg: "#0C140B",
          border: "#1E331B",
          accent: "#5FAD56",
          text: "#88C680",
        },
        error: {
          bg: "#1F0D03",
          border: "#441E0A",
          accent: "#F26419",
          text: "#F6904D",
        },
        info: {
          bg: "#0A0E13",
          border: "#18222D",
          accent: "#415A77",
          text: "#708AA5",
        },
        warning: {
          bg: "#1F1605",
          border: "#44310D",
          accent: "#F6AE2D",
          text: "#FAC860",
        },
      },
      errorMessage: {
        bg: "#170B03",
        border: "#F26419",
        text: "#F6904D",
      },
    },
  },

  // ── 16. Mint Noir ───────────────────────────────────────────────────────────
  // Origin: Obsidian Pulse
  // Palette: Near-void obsidian with neon mint and magenta — the sharpest
  //          contrast ratio of the collection.
  // 60%: True-dark green-black bg family (#020504 → #0C1712)
  // 30%: Pale mint text, deepest green borders
  // 10%: Neon mint primary, hot magenta secondary/agent
  {
    name: "Mint Noir",
    colors: {
      brand: {
        primary: "#00FFB3",
        secondary: "#D147A3",
      },
      text: {
        primary: "#C0F5E0",
        secondary: "#70B898",
        muted: "#387058",
        inverse: "#020504",
      },
      bg: {
        base: "#020504",
        surface: "#060D0A",
        elevated: "#0C1712",
      },
      border: {
        default: "#10211A",
        dim: "#040806",
      },
      agent: {
        plan: "#D147A3",
        build: "#F39C12",
        thinking: "#284039",
        idle: "#040806",
      },
      selection: {
        bg: "#031F16",
        text: "#D0FFEE",
      },
      toast: {
        success: {
          bg: "#03140A",
          border: "#0B3018",
          accent: "#2ECC71",
          text: "#68E09A",
        },
        error: {
          bg: "#170503",
          border: "#380F0B",
          accent: "#E74C3C",
          text: "#F07A6E",
        },
        info: {
          bg: "#030F17",
          border: "#0B2538",
          accent: "#3498DB",
          text: "#6AB8E8",
        },
        warning: {
          bg: "#170E02",
          border: "#382205",
          accent: "#F39C12",
          text: "#F7BD55",
        },
      },
      errorMessage: {
        bg: "#120404",
        border: "#E74C3C",
        text: "#F07A6E",
      },
    },
  },

  // ── 17. Northern Lights ─────────────────────────────────────────────────────
  // Origin: Oceanic Aurora
  // Palette: Slate-blue canvas with sky-blue and emerald — aurora borealis
  //          over open water.
  // 60%: Deep slate bg family (#0f172a → #334155)
  // 30%: Silver-blue text, steel borders
  // 10%: Sky blue primary, emerald secondary/agent
  {
    name: "Northern Lights",
    colors: {
      brand: {
        primary: "#38BDF8",
        secondary: "#34D399",
      },
      text: {
        primary: "#E2E8F0",
        secondary: "#94A3B8",
        muted: "#64748B",
        inverse: "#0F172A",
      },
      bg: {
        base: "#0F172A",
        surface: "#1E293B",
        elevated: "#334155",
      },
      border: {
        default: "#475569",
        dim: "#263244",
      },
      agent: {
        plan: "#34D399",
        build: "#F59E0B",
        thinking: "#A78BFA",
        idle: "#1E293B",
      },
      selection: {
        bg: "#334155",
        text: "#E2E8F0",
      },
      toast: {
        success: {
          bg: "#064E3B",
          border: "#047857",
          accent: "#10B981",
          text: "#4ADED0",
        },
        error: {
          bg: "#7F1D1D",
          border: "#B91C1C",
          accent: "#EF4444",
          text: "#F87171",
        },
        info: {
          bg: "#1E3A8A",
          border: "#1D4ED8",
          accent: "#3B82F6",
          text: "#7AACF9",
        },
        warning: {
          bg: "#78350F",
          border: "#B45309",
          accent: "#F59E0B",
          text: "#F8C050",
        },
      },
      errorMessage: {
        bg: "#5F1616",
        border: "#EF4444",
        text: "#F87171",
      },
    },
  },

  // ── 18. Hot Magenta ─────────────────────────────────────────────────────────
  // Origin: Phantom Core
  // Palette: Void-black with electric hot-pink and chrome-yellow —
  //          maximum contrast, zero subtlety (and proud of it).
  // 60%: Near-void crimson-black bg family (#050203 → #1A0A0E)
  // 30%: Rose-cream text, darkest crimson borders
  // 10%: Hot pink primary, chrome yellow secondary/agent
  {
    name: "Hot Magenta",
    colors: {
      brand: {
        primary: "#FF2E93",
        secondary: "#FFCC00",
      },
      text: {
        primary: "#F0C8DC",
        secondary: "#B06888",
        muted: "#6A3050",
        inverse: "#050203",
      },
      bg: {
        base: "#050203",
        surface: "#0F0508",
        elevated: "#1A0A0E",
      },
      border: {
        default: "#240D15",
        dim: "#0A0305",
      },
      agent: {
        plan: "#FFCC00",
        build: "#FFA000",
        thinking: "#4A2033",
        idle: "#0A0305",
      },
      selection: {
        bg: "#330319",
        text: "#FFD8EC",
      },
      toast: {
        success: {
          bg: "#00140A",
          border: "#00331A",
          accent: "#00E676",
          text: "#50F0A0",
        },
        error: {
          bg: "#140500",
          border: "#330F00",
          accent: "#FF3D00",
          text: "#FF7545",
        },
        info: {
          bg: "#000E14",
          border: "#002433",
          accent: "#00B0FF",
          text: "#50CCFF",
        },
        warning: {
          bg: "#140D00",
          border: "#332000",
          accent: "#FFA000",
          text: "#FFC050",
        },
      },
      errorMessage: {
        bg: "#100400",
        border: "#FF3D00",
        text: "#FF7545",
      },
    },
  },

  // ── 19. Royal Indigo ────────────────────────────────────────────────────────
  // Origin: Royal Velvet
  // Palette: Deep indigo-black with a blue primary and hot-pink accent —
  //          regal authority with a subversive edge.
  // 60%: Near-black violet-indigo bg family (#060214 → #180C4A)
  // 30%: Cool periwinkle text, deepest indigo borders
  // 10%: Electric blue primary, hot pink secondary/agent
  {
    name: "Royal Indigo",
    colors: {
      brand: {
        primary: "#4361EE",
        secondary: "#F72585",
      },
      text: {
        primary: "#C8C8F0",
        secondary: "#8080B8",
        muted: "#404070",
        inverse: "#060214",
      },
      bg: {
        base: "#060214",
        surface: "#0F072E",
        elevated: "#180C4A",
      },
      border: {
        default: "#1E0E5C",
        dim: "#0A041F",
      },
      agent: {
        plan: "#F72585",
        build: "#FFB703",
        thinking: "#384061",
        idle: "#0A041F",
      },
      selection: {
        bg: "#11183B",
        text: "#D8D8FF",
      },
      toast: {
        success: {
          bg: "#071A1F",
          border: "#164452",
          accent: "#4CC9F0",
          text: "#80DAF5",
        },
        error: {
          bg: "#1A010B",
          border: "#3D041A",
          accent: "#B7094C",
          text: "#D84888",
        },
        info: {
          bg: "#0F011A",
          border: "#2A0442",
          accent: "#7209B7",
          text: "#A050D8",
        },
        warning: {
          bg: "#1F1600",
          border: "#473300",
          accent: "#FFB703",
          text: "#FFCE54",
        },
      },
      errorMessage: {
        bg: "#140109",
        border: "#B7094C",
        text: "#D84888",
      },
    },
  },

  // ── 20. Tokyo Night ─────────────────────────────────────────────────────────
  // Origin: Tokyo Night Storm
  // Palette: The canonical Tokyo Night palette — deep blue-purple midnight
  //          with periwinkle type and a warm peach accent.
  // 60%: Blue-purple bg family (#1a1b26 → #2f354f)
  // 30%: Cool lavender text, dark blue borders
  // 10%: Periwinkle primary, warm peach secondary/agent
  {
    name: "Tokyo Night",
    colors: {
      brand: {
        primary: "#7AA2F7",
        secondary: "#FF9E64",
      },
      text: {
        primary: "#C0CAF5",
        secondary: "#8892B8",
        muted: "#565F89",
        inverse: "#1A1B26",
      },
      bg: {
        base: "#1A1B26",
        surface: "#24283B",
        elevated: "#2F354F",
      },
      border: {
        default: "#3B4261",
        dim: "#262C42",
      },
      agent: {
        plan: "#FF9E64",
        build: "#E0AF68",
        thinking: "#BB9AF3",
        idle: "#262C42",
      },
      selection: {
        bg: "#33467C",
        text: "#C0CAF5",
      },
      toast: {
        success: {
          bg: "#1C2B24",
          border: "#324A38",
          accent: "#9ECE6A",
          text: "#B8DD90",
        },
        error: {
          bg: "#331C24",
          border: "#522735",
          accent: "#F7768E",
          text: "#F9A0B0",
        },
        info: {
          bg: "#1A2B3D",
          border: "#29435C",
          accent: "#7DCFFF",
          text: "#A6DFFF",
        },
        warning: {
          bg: "#2D261C",
          border: "#473C28",
          accent: "#E0AF68",
          text: "#ECC890",
        },
      },
      errorMessage: {
        bg: "#281518",
        border: "#F7768E",
        text: "#F9A0B0",
      },
    },
  },

  // ── 21. Cyan Void ───────────────────────────────────────────────────────────
  // Origin: Void Nebula
  // Palette: Void-black with pure neon cyan and hot-pink — the alien
  //          spectrum, high frequency, maximum saturation.
  // 60%: Near-void teal-black bg family (#030105 → #140A21)
  // 30%: Ice-teal text, deepest purple borders
  // 10%: Neon cyan primary, hot pink secondary/agent
  {
    name: "Cyan Void",
    colors: {
      brand: {
        primary: "#00FFFF",
        secondary: "#FF007F",
      },
      text: {
        primary: "#C8F0F0",
        secondary: "#70B0B0",
        muted: "#3A6868",
        inverse: "#030105",
      },
      bg: {
        base: "#030105",
        surface: "#09040F",
        elevated: "#140A21",
      },
      border: {
        default: "#1A0D2B",
        dim: "#06020A",
      },
      agent: {
        plan: "#FF007F",
        build: "#FDE68A",
        thinking: "#243D3D",
        idle: "#06020A",
      },
      selection: {
        bg: "#002424",
        text: "#D0FFFF",
      },
      toast: {
        success: {
          bg: "#04170F",
          border: "#0D3A27",
          accent: "#A7F3D0",
          text: "#C8F8E2",
        },
        error: {
          bg: "#1C0808",
          border: "#451616",
          accent: "#FCA5A5",
          text: "#FDC4C4",
        },
        info: {
          bg: "#08131F",
          border: "#162E47",
          accent: "#93C5FD",
          text: "#B8D8FE",
        },
        warning: {
          bg: "#1C1907",
          border: "#453E11",
          accent: "#FDE68A",
          text: "#FEF0B4",
        },
      },
      errorMessage: {
        bg: "#160606",
        border: "#FCA5A5",
        text: "#FDC4C4",
      },
    },
  },
];

export const DEFAULT_THEME = THEME.find((t) => t.name === "Arc Dark");

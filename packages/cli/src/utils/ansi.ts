export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleaned = hex.replace(/^#/, "");
  if (cleaned.length === 3) {
    const r = parseInt(cleaned.charAt(0) + cleaned.charAt(0), 16);
    const g = parseInt(cleaned.charAt(1) + cleaned.charAt(1), 16);
    const b = parseInt(cleaned.charAt(2) + cleaned.charAt(2), 16);
    return { r, g, b };
  }
  if (cleaned.length === 6) {
    const r = parseInt(cleaned.substring(0, 2), 16);
    const g = parseInt(cleaned.substring(2, 4), 16);
    const b = parseInt(cleaned.substring(4, 6), 16);
    return { r, g, b };
  }
  const match = hex.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (match) {
    const [, rStr = "0", gStr = "0", bStr = "0"] = match;
    return {
      r: parseInt(rStr, 10),
      g: parseInt(gStr, 10),
      b: parseInt(bStr, 10),
    };
  }
  return null;
}

export function toAnsi(hex: string, fallback = "36"): string {
  const rgb = hexToRgb(hex);
  return rgb ? `38;2;${rgb.r};${rgb.g};${rgb.b}` : fallback;
}

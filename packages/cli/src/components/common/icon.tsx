import * as LucideIcons from "lucide";
import { useTheme } from "../../hooks";

export type IconName =
  | "Compass"
  | "Hammer"
  | "Cpu"
  | "FolderOpen"
  | "Paintbrush"
  | "Loader2"
  | "BookOpen"
  | "HelpCircle"
  | "Fingerprint"
  | "Power"
  | "Coins"
  | "Activity"
  | "LogOut"
  | "Bot"
  | "User"
  | "Sparkles"
  | "Check"
  | "AlertTriangle"
  | "FileText"
  | "PenTool"
  | "Terminal"
  | "Folder"
  | "Search"
  | "Users"
  | "Wrench";

const GLYPH_MAP: Record<IconName, { glyph: string }> = {
  Compass: { glyph: "" },       // Planning / Navigation
  Hammer: { glyph: "" },        // Building / Construction
  Cpu: { glyph: "" },            // Compute / Models
  FolderOpen: { glyph: "" },     // Sessions
  Paintbrush: { glyph: "" },     // Themes
  Loader2: { glyph: "" },         // Loading
  BookOpen: { glyph: "" },       // Help / FAQ
  HelpCircle: { glyph: "" },     // Question / Tool asking
  Fingerprint: { glyph: "" },    // Login
  Power: { glyph: "" },          // Exit
  Coins: { glyph: "" },          // Billing / Upgrade
  Activity: { glyph: "" },       // Usage
  LogOut: { glyph: "" },         // Logout
  Bot: { glyph: "" },            // Bot message header
  User: { glyph: "" },           // User message header
  Sparkles: { glyph: "" },       // Reasoning / AI
  Check: { glyph: "✔" },
  AlertTriangle: { glyph: "" },   // Error / Warn
  FileText: { glyph: "" },       // Read file tool
  PenTool: { glyph: "" },        // Write/edit file tool
  Terminal: { glyph: "" },       // Execute command tool
  Folder: { glyph: "" },         // List dir tool
  Search: { glyph: "" },         // Search/grep tool
  Users: { glyph: "" },          // Subagent tool
  Wrench: { glyph: "" },         // Generic tool call
};

interface IconProps {
  name: IconName;
  fg?: string;
  attributes?: number;
}

export function Icon({ name, fg, attributes }: IconProps) {
  const { colors } = useTheme();
  
  // Type check and compile check to verify it is a valid lucide import
  const _lucideIcon = LucideIcons[name];
  if (!_lucideIcon) {
    return null;
  }

  const glyph = GLYPH_MAP[name]?.glyph || "•";
  
  return (
    <text fg={fg || colors.text.primary} attributes={attributes}>
      {glyph}
    </text>
  );
}

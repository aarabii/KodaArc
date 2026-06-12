export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "what-is-kodaarc",
    question: "What is KodaArc?",
    answer: "KodaArc is a terminal-based AI coding assistant. It integrates agents, LLM models, and project analysis into a cohesive developer workspace.",
  },
  {
    id: "how-to-use",
    question: "How do I use KodaArc?",
    answer: "Type your query in the prompt line, or press '/' to open the command palette. Use commands to switch agents, change models, customize settings, or exit.",
  },
  {
    id: "change-agent",
    question: "How do I switch agents?",
    answer: "Type /agents in the command palette. You can select between Code (general tasks), Debug (troubleshooting), Architect (planning), and Review (code review) agents.",
  },
  {
    id: "change-model",
    question: "How do I change the LLM model?",
    answer: "Select the /models command. You can choose from recommended models like Claude 3.5 Sonnet, Claude 3 Opus, or Claude 3.5 Haiku.",
  },
  {
    id: "sessions",
    question: "Where are my sessions saved?",
    answer: "Your conversation history is stored locally in your home directory at ~/.kodaarc/sessions, enabling you to resume past sessions with /sessions.",
  },
  {
    id: "theme-spinner",
    question: "How do I customize the interface?",
    answer: "Use /theme to select a color theme (e.g., Arc Dark, Abyssal Trench) and /spinner to choose a preferred loading spinner animation.",
  },
  {
    id: "billing",
    question: "How do I manage billing & credits?",
    answer: "Use /usage to view your billing portal or /upgrade to purchase credits and upgrade your plan.",
  },
];

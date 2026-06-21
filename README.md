<p align="center">
  <strong>🧠 KodaArc</strong>
</p>

<p align="center">
  <em>A terminal-native AI coding assistant that thinks before it ships.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/runtime-Bun-f472b6?style=flat-square&logo=bun" alt="Bun" />
  <img src="https://img.shields.io/badge/language-TypeScript-3178c6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/framework-Hono-e36002?style=flat-square" alt="Hono" />
  <img src="https://img.shields.io/badge/ORM-Prisma%207-2d3748?style=flat-square&logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/UI-React%2019%20(OpenTUI)-61dafb?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/AI-Vercel%20AI%20SDK-000?style=flat-square" alt="AI SDK" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License" />
</p>

---

## What is KodaArc?

KodaArc is a **terminal-first AI coding assistant** built for developers who live in the terminal. It pairs a rich, React-powered TUI (terminal user interface) with a multi-model AI backend that can read your codebase, write files, run shell commands, and manage git — all through a conversational interface.

Unlike browser-based AI tools, KodaArc operates directly in your project directory. It sees what you see. It runs where your code runs.

### Key Capabilities

- **Dual-Mode AI Agent** — Switch between `PLAN` (read-only analysis & proposals) and `BUILD` (full read/write/execute implementation) modes on the fly.
- **Multi-Provider Model Support** — Anthropic (Claude), OpenAI (GPT), and Google (Gemini) models with per-model provider options like extended thinking and reasoning effort.
- **8 Built-in Tools** — `readFile`, `writeFile`, `editFile`, `listDirectory`, `glob`, `grep`, `bash`, and `gitHelper` — all sandboxed to the project directory.
- **Real-time Streaming** — SSE-based streaming with reasoning deltas, text deltas, tool calls, and tool results rendered live in the terminal.
- **Session Persistence** — Every conversation is persisted to PostgreSQL with full message history, parts, durations, and interrupt states.
- **Themeable Interface** — Multiple color themes and spinner animations, persisted to `~/.koda-arc/pref.json`.
- **Command Palette** — Slash-command system (`/models`, `/agents`, `/theme`, `/spinner`, `/sessions`, `/help`, `/exit`) for quick actions.
- **Graceful Exit** — Animated farewell screen with gradient ASCII art, typewriter wisdom quotes, and time-aware greetings.

---

## Architecture at a Glance

KodaArc is a **Bun monorepo** with four packages:

```
packages/
├── cli/        → React 19 TUI (OpenTUI) — screens, hooks, providers, theming
├── server/     → Hono HTTP API — AI streaming, tool execution, session CRUD
├── database/   → Prisma 7 + PostgreSQL — schema, client, enum re-exports
└── shared/     → Zod schemas, model registry, TypeScript types
```

> **Deep Dive:** [Architecture Details →](./DOCS/architecture.md)

---

## Quick Start

### Prerequisites

| Tool                                      | Version | Purpose                        |
| ----------------------------------------- | ------- | ------------------------------ |
| [Bun](https://bun.sh)                     | ≥ 1.1   | Runtime & package manager      |
| [PostgreSQL](https://www.postgresql.org/) | ≥ 15    | Session & message storage      |
| Node.js                                   | ≥ 18    | Peer dependency for some tools |

### 1. Clone & Install

```bash
git clone https://github.com/aarabii/KodaArc.git
cd KodaArc
bun install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```env
API_URL=http://localhost:6969
DATABASE_URL=postgresql://user:password@localhost:5432/kodaarc
```

You will also need API keys for at least one provider set as environment variables:

| Variable                       | Provider          |
| ------------------------------ | ----------------- |
| `ANTHROPIC_API_KEY`            | Anthropic         |
| `OPENAI_API_KEY`               | OpenAI            |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google            |
| `SENTRY_DNS`                   | Sentry (optional) |

### 3. Set Up the Database

```bash
cd packages/database
bunx prisma generate
bunx prisma db push
```

### 4. Run

Open **two terminal windows**:

```bash
# Terminal 1 — Start the API server
bun run dev:server

# Terminal 2 — Start the CLI
bun run dev:cli
```

> **Full guide:** [Setup & Deployment →](./DOCS/setup-and-deployment.md)

---

## Supported Models

| Model ID                        | Provider  | Input $/1M | Output $/1M |
| ------------------------------- | --------- | ---------- | ----------- |
| `claude-sonnet-4-6`             | Anthropic | $3.00      | $15.00      |
| `claude-haiku-4-5`              | Anthropic | $1.00      | $5.00       |
| `claude-opus-4-6`               | Anthropic | $5.00      | $25.00      |
| `gpt-5.4`                       | OpenAI    | $2.50      | $15.00      |
| `gpt-5.4-mini`                  | OpenAI    | $0.75      | $4.50       |
| `gpt-5.4-nano`                  | OpenAI    | $0.20      | $1.25       |
| `gemini-3.5-flash`              | Google    | $1.50      | $9.00       |
| `gemini-3.1-flash-lite`         | Google    | $0.25      | $1.50       |
| `gemini-3.1-flash-live-preview` | Google    | $0.75      | $4.50       |
| `gemini-2.5-flash` _(default)_  | Google    | Free       | Free        |

> **Details:** [AI Models & Provider Configuration →](./DOCS/ai-models-and-providers.md)

---

## Documentation Index

| Document                                                   | Description                                                            |
| ---------------------------------------------------------- | ---------------------------------------------------------------------- |
| [Architecture](./DOCS/architecture.md)                     | System architecture, data flow diagrams, package dependency graph      |
| [Setup & Deployment](./DOCS/setup-and-deployment.md)       | Environment setup, database config, running locally, production notes  |
| [AI Models & Providers](./DOCS/ai-models-and-providers.md) | Supported models, provider options, extended thinking configuration    |
| [API Reference](./DOCS/api-reference.md)                   | All HTTP endpoints, request/response schemas, SSE event formats        |
| [AI Agent Context](./AGENT/system-rules.md)                | Coding standards and guardrails for AI agents working on this codebase |

### Package Documentation

| Package              | README                                                       |
| -------------------- | ------------------------------------------------------------ |
| `@koda-arc/cli`      | [packages/cli/README.md](./packages/cli/README.md)           |
| `@koda-arc/server`   | [packages/server/README.md](./packages/server/README.md)     |
| `@koda-arc/database` | [packages/database/README.md](./packages/database/README.md) |
| `@koda-arc/shared`   | [packages/shared/README.md](./packages/shared/README.md)     |

---

## Project Structure

```
KodaArc/
├── .env.example                    # Environment variable template
├── package.json                    # Workspace root (Bun workspaces)
├── tsconfig.base.json              # Shared TypeScript strict config
├── DOCS/                           # Deep-dive documentation
│   ├── architecture.md
│   ├── setup-and-deployment.md
│   ├── ai-models-and-providers.md
│   └── api-reference.md
├── AGENT/                          # AI agent knowledge base
│   ├── system-rules.md
│   ├── codebase-context.md
│   └── architecture-map.md
└── packages/
    ├── cli/                        # Terminal UI application
    ├── server/                     # HTTP API + AI orchestration
    ├── database/                   # Prisma schema + client
    └── shared/                     # Cross-package types & schemas
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/your-feature`)
3. Follow the coding standards in [AGENT/system-rules.md](./AGENT/system-rules.md)
4. Commit with clear, descriptive messages
5. Open a Pull Request

---

## License

MIT © [aarabii](https://github.com/aarabii)

---

<p align="center">
  <sub>Built with 🧠 by developers, for developers who think in terminals.</sub>
</p>

# D2A — Target Account Intelligence · NOVATEK Agentic OS

A demonstration **Agentic Operating System**: the **D2A Target Account Intelligence Agent** profiles
enterprise accounts, detects buying triggers, routes to the right executive, and scores pursuit priority
with the **ABCD** method — grounded in live web research. Built by **NOVATEK** for **Lungile Mginqi**.

## What's in here

| Path | What it is |
|---|---|
| [`d2a-web/`](./d2a-web) | The **live web app** — Next.js + Anthropic Messages API, streaming, two-pass research agent → ABCD scoring. Deployable to Vercel. **Start here.** |
| `index.html` | The original single-file **static demo** (design reference; scripted, no backend). |
| [`docs/`](./docs) | The **Agentic OS planning docs** — design notes, the enterprise PRD, and the GSD requirements register. |
| `.claude/skills/` | **Skills** that streamline repetitive processes: `run-d2a-sweep`, `deploy-to-vercel`, `add-d2a-agent`, `update-aos-docs`. |

## Quick start (the app)

```bash
cd d2a-web
npm install
cp .env.example .env.local     # set ANTHROPIC_API_KEY
npm run dev                     # http://localhost:3000
```

Full setup, the **two-pass research-agent** design, deployment, and the `maxDuration` / web-search
controls are documented in **[`d2a-web/README.md`](./d2a-web/README.md)**.

## The Agentic OS docs (`docs/`)

- `agentic-os-design-notes.md` — hybrid synthesis of three source videos + a mapping onto Lungile's
  named frameworks.
- `PRD-Agentic-Operating-System.md` — the enterprise PRD (sections 0–16, 71 requirements).
- `REQUIREMENTS.md` — GSD-format requirements register, 1:1 with the PRD, with a traceability matrix.

## Skills

The repo doubles as a small Claude Code operating system. Open it in Claude Code and the
`.claude/skills/` files become available to streamline the recurring jobs (running a sweep, deploying,
adding an agent, keeping the docs consistent).

## Credits

- Scaffolding patterns informed by the **AIS-OS** starter kit by Nate Herk
  (<https://github.com/nateherkai/AIS-OS>, MIT) and its companion masterclass videos.
- Brand: NOVATEK (navy `#1e3a5f` / cobalt `#2563eb`).

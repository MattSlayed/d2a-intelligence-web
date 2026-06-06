# D2A — Target Account Intelligence (NOVATEK Agentic OS)

A client-facing web console for the **D2A Target Account Intelligence Agent**. It profiles
enterprise accounts, detects buying triggers, routes to the right executive, and scores
pursuit priority with the **ABCD** method — grounded in **live web search**.

Built with **Next.js (App Router) + the Anthropic Messages API**, streaming, and the
`web_search` server tool. Deploys cleanly to **Vercel**. NOVATEK-branded (navy/cobalt).

---

## Architecture (and why not the Agent SDK)

The Claude **Agent SDK** (`@anthropic-ai/claude-agent-sdk`) spawns a Claude Code **subprocess**
and is **not compatible with Vercel serverless functions** (no subprocess/binary support, read-only
FS). To deliver the same agentic behaviour on Vercel, this app uses the **Anthropic Messages API**
with streaming and the **`web_search` server tool**. The sweep runs as **two passes in one streamed
request**: a dedicated **research agent** (heavy web search) gathers grounded, citable findings, then a
**synthesis pass** scores the ABCD board from those findings. Fully serverless, no subprocess.

> If you ever need the *full* Agent SDK (filesystem, bash, MCP, long Claude Code sessions), host a
> separate always-on backend (Render / Railway / Fly) and point the frontend at it. That was the
> "Vercel + persistent backend" option; this build is the "Vercel + Agent SDK behaviour via Messages API" path.

```
d2a-web/
├─ app/
│  ├─ api/run/route.ts     # 2-pass: research agent (web search) → ABCD synthesis + JSON
│  ├─ api/chat/route.ts    # streams the analyst co-pilot chat
│  ├─ globals.css          # NOVATEK navy/cobalt dark console theme
│  ├─ layout.tsx
│  └─ page.tsx             # console shell + streaming/parse logic
├─ components/             # Sidebar, RunConsole, PursuitBoard, Inspector, ChatDock
├─ lib/
│  ├─ agents.ts            # the 10-agent roster + 9-stage pipeline
│  ├─ prompts.ts           # research + synthesis prompts, ABCD methodology, JSON contract
│  ├─ anthropic.ts         # shared client, model + web-search config
│  └─ types.ts
└─ .env.example
```

---

## Local development

```bash
cd d2a-web
npm install
cp .env.example .env.local      # then edit .env.local and set ANTHROPIC_API_KEY
npm run dev                      # http://localhost:3000
```

Requires Node 18+ (Node 20+ recommended).

### Environment variables

| Variable | Required | Default | Notes |
|---|---|---|---|
| `ANTHROPIC_API_KEY` | **yes** | — | from console.anthropic.com |
| `MODEL` | no | `claude-sonnet-4-6` | use `claude-opus-4-8` for deeper reasoning (higher cost) |
| `ENABLE_WEB_SEARCH` | no | `false` | `true` turns on the research agent's live web search — needs Anthropic **Tier 2+** (see Research mode) |
| `WEB_SEARCH_TOOL` | no | `web_search_20260209` | update to the current tool version string if a deploy rejects it |

> The API routes **degrade gracefully**: if the web-search tool is rejected, they retry the same
> request without tools and continue, so the demo never hard-fails on a tool-version mismatch.

---

## Deploy to Vercel

This app lives in the **`d2a-web/` subfolder** of the D2A repo, so set the **Root Directory** in Vercel.

1. Push this repo to GitHub (the `d2a-web` folder must be included).
2. In Vercel → **Add New Project** → import the repo.
3. **Root Directory** → set to `d2a-web`. Framework preset auto-detects **Next.js**.
4. **Environment Variables** → add `ANTHROPIC_API_KEY` (and optionally `MODEL`, etc.).
5. **Deploy.** You get a public URL.

**Function duration:** the sweep route sets `maxDuration = 300` (`app/api/run/route.ts`) and chat sets
`120` (`app/api/chat/route.ts`) — the research agent needs the headroom. **300s requires Vercel Pro**
(Hobby caps lower, ~60s); lower the value to fit your plan if needed. Vercel **Fluid Compute** (default)
covers the long streaming response. See *Research mode & function duration* below.

### Deploy via CLI (alternative)

```bash
npm i -g vercel
cd d2a-web
vercel            # first run links the project; set Root Directory to "." since you're inside d2a-web
vercel env add ANTHROPIC_API_KEY
vercel --prod
```

---

## Research mode & function duration

The sweep is a **two-pass research agent**:

1. **Research pass** — a dedicated research agent runs `web_search` (up to ~8 targeted queries) to gather
   grounded, citable findings on the candidate accounts. You'll see `## Research agent` then
   `[web] searching…` lines stream in.
2. **Synthesis pass** — `## Scoring pipeline`: a second pass (no search) scores the ABCD board from
   the research, streaming the `STEP k/9` markers and the final JSON.

Because the research agent searches as deeply as it needs, a sweep typically takes **~1–4 minutes** —
that is why `maxDuration` is **300s** on `/api/run`.

**To change the duration:** edit `export const maxDuration` at the top of `app/api/run/route.ts`
(research + synthesis) and `app/api/chat/route.ts` (chat). Keep it within your Vercel plan's limit —
**Hobby ≈ 60s, Pro = 300s, Enterprise = 900s**.

**Web grounding is OFF by default** (`ENABLE_WEB_SEARCH=false`) for reliability — the research agent
then works from the model's own knowledge and the sweep finishes in ~30s. Set `ENABLE_WEB_SEARCH=true`
to turn live search on.

> **API tier matters.** Deep web search needs a higher **Anthropic usage tier**. On **Tier 1**
> (30,000 input tokens/min) a heavy sweep injects large search results and hits a `429` rate limit.
> The routes **degrade gracefully**: if the `web_search` tool is rejected **or** a rate limit is hit,
> the research agent automatically falls back to search-free mode and the sweep still completes. For
> full live grounding, raise your tier at console.anthropic.com (Tier 2+).

---

## Access & cost

- **Open link** — there is no auth gate. Anyone with the URL can run sweeps and chat, which **spends
  your Anthropic credits**. For a controlled client demo, add a shared access code (a simple
  middleware password) or Vercel password protection before sharing widely.
- **Cost control** — defaults to **Sonnet**. The research agent may run up to ~8 web searches per
  sweep and profiles ~8–12 accounts, so deeper grounding costs more. Set `ENABLE_WEB_SEARCH=false` for
  fast, search-free sweeps, or switch `MODEL` to Opus only when you need it.

---

## How it works

- **Run sweep** → `POST /api/run` streams **two passes**: a research agent (`## Research agent`, web
  search) then a synthesis pass (`## Scoring pipeline`) that emits `STEP k/9` markers (driving the
  pipeline strip and agent highlight) and ends with a fenced `json` block of scored accounts, which the
  client parses into the ABCD pursuit board.
- **Inspect** → click any account to see its brief (trigger, executive route, first wedge, rationale)
  and the **evidence** (claims + source URLs + confidence).
- **Chat** → `POST /api/chat` streams the analyst co-pilot, web-grounded, focused on the selected account.

The scoring methodology (7 weighted dimensions, the hard A-class rule, executive routing, evidence
discipline) lives in `lib/prompts.ts` — edit there to tune the agent's behaviour.

---

## Note on OneDrive

This folder sits under OneDrive. `node_modules` is git-ignored, but OneDrive may still try to sync it,
which slows local installs. If local `npm install` is slow, either pause OneDrive sync during install,
or develop/build from a path outside OneDrive. Vercel builds remotely, so this only affects local dev.

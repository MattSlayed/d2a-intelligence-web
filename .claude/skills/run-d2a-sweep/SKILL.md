---
name: run-d2a-sweep
description: Run a D2A Target Account Intelligence sweep end-to-end — start the app, set the engagement brief, choose research depth, run the two-pass (research → ABCD scoring), and read the pursuit board and evidence. Use when someone asks to "run a sweep", "profile target accounts", or "score accounts with ABCD".
---

# Run a D2A Intelligence Sweep

The D2A console (`d2a-web/`) runs a **two-pass** sweep: a research agent (web search) gathers grounded
findings, then a synthesis pass scores accounts into the **ABCD** pursuit board.

## 1 — Prerequisites
- `d2a-web/.env.local` exists with `ANTHROPIC_API_KEY=sk-ant-...` (git-ignored; never commit it).
- Node 20+. From `d2a-web/`: `npm install` once.

## 2 — Start the app
```bash
cd d2a-web
npm run dev            # http://localhost:3000  (hot reload)
# or, to mirror production:
npm run build && npx next start -p 3100
```

## 3 — Run the sweep
1. Open the console. The **engagement brief** textarea is pre-filled (SA enterprise, ABCD, 24-month
   triggers). Edit it to change geography, sectors, decision routes, or exclusions.
2. Click **Run sweep**. Watch two phases stream in the log:
   - `## Research agent` → `[web] searching…` (the research pass).
   - `## Scoring pipeline` → `STEP 1/9 … 9/9`, then the board populates.
3. Click any account on the **pursuit board** to open its **brief** and **evidence** (claims + source
   URLs + confidence) in the inspector. Use the A/B/C/D filters. Open **Chat** to interrogate an account.

## 4 — Tuning knobs
| Want | Change |
|---|---|
| Faster, no web calls (~30s) | `ENABLE_WEB_SEARCH=false` in `.env.local` (restart) |
| Deeper grounding | raise `webSearchTool(15)` in `app/api/run/route.ts`; raise `maxDuration` |
| More/fewer accounts | the "Profile 8 to 12…" line in `lib/prompts.ts` (`JSON_CONTRACT`) |
| Stronger reasoning | `MODEL=claude-opus-4-8` in `.env.local` (higher cost) |
| Scoring rules | the `METHODOLOGY` block in `lib/prompts.ts` (weights, hard A-class rule, routing) |

## 5 — Verify / troubleshoot
- **No accounts appear** → check the log for `ERROR:`. A `401` means the API key is wrong; a tool error
  auto-falls back to search-free mode.
- **Times out on Vercel** → the sweep exceeds the function limit; lower web depth or raise `maxDuration`
  to your plan's max (see `deploy-to-vercel`).
- A quick scripted check lives at `C:\Users\user-pc\AppData\Local\d2a-pw\sweep.mjs` (Playwright).

# Changelog — D2A Target Account Intelligence Agent

All notable changes to the D2A web app are recorded here.
Format follows [Keep a Changelog](https://keepachangelog.com/); this product
versions by iteration (v1.0 → v1.1 …).

---

## v1.1 — UX Upgrade (Step 1) · 2026-06-13

The "make the agent inspectable, not a black box" release. This is **Step 1** of
the V1.1 iteration defined in the *UX Transition Note* — a frontend-only upgrade
of the existing prototype with **no backend / API rebuild**. The campaign-grade
backend (Step 2 of the Campaign-Grade FRS Rev 2.5) is intentionally out of scope.

> Scope decisions for this release: **frontend only**; interactive where the work
> is client-side, backend-dependent actions surfaced as marked **"Step 2 preview"**;
> the pipeline strip and agent grid **unified** into one clickable stage set.

### Added
- **Configuration summary** panel below the brief — geography, industries, revenue
  band, employee range, offer routes, trigger window, exclusions, contact-enrichment
  gate and the Hot Pursuit evidence gate, all read live from a client-side run config.
- **Save as default / Save as scenario** — run configuration persists to
  `localStorage` (`d2a.runConfig.default`, `d2a.runConfig.scenarios`) and restores
  on reload.
- **Agent Configuration Card** per stage (right-rail) with eleven shelves: Purpose,
  Default assumptions, Editable settings, Locked guardrails, Inputs, Outputs,
  Source/tool preferences, Confidence rules, Status, Last-run summary, Issues/gaps.
- **Editable stage settings** as real controls bound to the run config (geography,
  industries, revenue band, employee range, routes, trigger window, evidence gate,
  contact-enrichment toggle) — edits update the Configuration summary live.
- **Execution controls** — `Run full pipeline` (live) plus `Run selected step`,
  `Rerun from step`, `Pause`, `Resume` rendered as disabled **"Step 2 preview"**
  controls (wire up with the Step-2 backend).
- **Tile status indicators** (Idle / Running / Complete / Gated) and per-stage
  input/output chips (sample volumes, marked preview until the backend emits real
  per-stage counts).
- **Stage output summary** strip — real pursuit-board counts after a run.
- New modules: `lib/abcd.ts`, `lib/runConfig.ts`, `lib/tileConfig.ts`; new
  components: `PipelineTiles`, `TileInspector`, `ConfigSummary`.
- Three icons: `pause`, `lock`, `sliders`.

### Changed
- **"Intelligence sweep"** → **"Targeting Brief"** with subtitle "Sets the narrative
  and guardrails for this sweep."
- **All ten agent tiles renamed** to business-readable names (Orchestrator, Company
  Universe Builder, Company Profile Builder, Buying Signal Finder, Offer Route
  Selector, Pursuit Priority Scorer, First Conversation Recommender, Evidence
  Checker, Pursuit Brief Builder, Buyer Contact Finder). Agent IDs unchanged.
- **Pursuit class labels** (display only): A → **Hot Pursuit**, B → **Active
  Nurture**, C → **Watchlist**, D → **Exclude / Defer**. The underlying ABCD model,
  scoring and filtering are unchanged.
- **Unified pipeline** — the separate 9-node progress strip and 10-card agent grid
  are merged into one set of clickable stage tiles; the Orchestrator is the master
  control element (live meter + progress + execution controls).
- **Right-hand Inspector is now dual-mode** — shows a stage's Configuration Card or
  a selected account's brief/evidence. On narrow screens (<1180px) it reveals as a
  dismissible overlay and stays open until closed.

### Notes
- No backend/API changes. The `brief` textarea remains the real driver of a sweep;
  the run configuration is display/edit/persist only in this release.
- Verified: `tsc --noEmit` clean, production build green, end-to-end UI walkthrough
  via Playwright (renames, dual-mode rail, live config binding, scenario persistence,
  responsive overlay). No console errors.

---

## v1.0 — Baseline · 2026-05

Initial Target Account Intelligence Agent.

- Engagement brief → two-pass pipeline (research → ABCD scoring) streamed from
  `/api/run`, with live `STEP k/9` progress.
- Pursuit Board of scored accounts across classes A/B/C/D, account Inspector with
  brief + evidence, analyst co-pilot chat (`/api/chat`).
- Dashboard, Pursuit, Memory (roadmap), Skills, MCP, Settings and Terminal views.
- NOVATEK "mission-control" dark theme (navy / cobalt), vanilla CSS, Next.js 15 +
  React 19 + TypeScript, Anthropic Messages API with web search.

---
name: add-d2a-agent
description: Add or modify a specialist agent in the D2A pipeline — update the roster, the visible pipeline, and the scoring methodology, then rebuild and test. Use when someone asks to "add an agent", "add a pipeline stage", or "change the D2A agent roster".
---

# Add a D2A Specialist Agent

The roster and pipeline are data-driven, so the UI updates automatically when you edit the data.

## Where things live (`d2a-web/`)
- `lib/agents.ts` — `AGENTS` (the roster shown in the agent grid) and `PIPELINE` (the 9-stage strip).
- `lib/prompts.ts` — `METHODOLOGY` (pipeline stages + 7 scoring dimensions + hard A-class rule) and the
  research/synthesis system prompts.
- The agent grid renders from `AGENTS`; the run strip renders from `PIPELINE`; the synthesis pass emits
  `STEP k/9` markers parsed by `app/page.tsx`.

## Steps
1. **Add to the roster** — append an entry to `AGENTS` in `lib/agents.ts`:
   ```ts
   { id: "xyz", name: "New Agent", role: "What it does", glyph: "◆" }
   ```
   (Set `master: true` only for the orchestrator.)
2. **If it is a new visible pipeline stage**, add to `PIPELINE` (this changes the step count). Then:
   - Update the `STEP k/N` count everywhere in `lib/prompts.ts` (the `JSON_CONTRACT` says `STEP k/9`)
     and the regex `/STEP\s+(\d)\s*\/\s*9/` in `app/page.tsx` if N ≠ 9.
   - Add the stage to the `METHODOLOGY` "Pipeline" list in `lib/prompts.ts`.
3. **If it changes scoring**, update the seven weighted dimensions or the routing rules in `METHODOLOGY`.
4. **Rebuild & test**: `npm run build`, then run a sweep (`run-d2a-sweep`) and confirm the new agent
   appears and the board still parses.

## Guardrails
- Keep the pipeline count and the `STEP k/N` markers in sync, or the run strip will mis-render.
- Don't invent scoring frameworks — extend the existing 7-dimension model.
- Keep British English and the evidence-discipline rule (every claim carries a source + confidence).

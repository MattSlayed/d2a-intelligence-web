---
name: update-aos-docs
description: Keep the Agentic OS planning docs consistent — the design notes, the PRD, and the GSD requirements register. Use when someone asks to update the PRD, add requirements, or regenerate the Agentic OS design notes.
---

# Update the Agentic OS Docs

Three companion documents must stay aligned:

| Doc (`docs/`) | What it is |
|---|---|
| `agentic-os-design-notes.md` | Hybrid synthesis of the 3 source videos + a Lungile-framework appendix |
| `PRD-Agentic-Operating-System.md` | The canonical enterprise PRD — **71 requirements**, sections 0–16 |
| `REQUIREMENTS.md` | GSD-format register — a **1:1** restatement of the PRD's 71 requirement IDs + a traceability matrix |

## Rules of the road
- **The PRD is canonical.** Requirement IDs use `CATEGORY-NN` with prefixes
  `FND / MEM / SKL / GOV / TEAM / AUT / OPS`. If you add/renumber in the PRD, mirror it 1:1 in
  `REQUIREMENTS.md` and update the traceability matrix (every ID appears once).
- **Whitelisted frameworks only** — AIEA, AaaS, SCALE, VRI, A-E Pattern, DAL, Value Architecting,
  Strategic Hedging. Do not invent frameworks.
- **Keep the verified corrections:** the Nexus ontology is **five spines** (`content-ip`,
  `business-operating`, `platform-product`, `external`, `profile`) — flag the 4-spine MOC simplification;
  **CTES Core is a node inside `platform-product`**, not a spine (7 components).
- **British English**; avoid the banned hype words (leverage, synergy, paradigm shift, journey,
  game-changer, disruptive).
- **Brand**: navy `#1e3a5f` / cobalt `#2563eb`; the D2A demo's cyan is off-brand — note it, don't adopt it.

## Steps
1. Edit the PRD first; keep section numbering (0–16) intact.
2. Reconcile `REQUIREMENTS.md` to the PRD's exact ID set (count + meaning), refresh the matrix.
3. Re-check the design notes' crosswalk table still matches the frameworks referenced.
4. Sanity pass: counts agree (PRD IDs == REQUIREMENTS IDs), no orphan/duplicate IDs.

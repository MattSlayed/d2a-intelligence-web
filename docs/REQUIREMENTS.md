# Requirements — Enterprise Agentic Operating System

**Defined:** 2026-06-06
**Status:** DRAFT
**Companion document:** `docs/PRD-Agentic-Operating-System.md`
**Core Value:** Build a governed, evidence-first Agentic Operating System (AOS) — an intelligent layer between the user and the enterprise's systems — on the AIS-OS scaffold, so that every agent run produces a board-defensible artefact. A team works inside a single interface (Claude Code), shares a knowledge-graph memory without exposing private data, dials autonomy under a kill switch on evidence, and remains portable through durable markdown. The system traces cleanly to the three source videos, the AIS-OS starter kit, and Lungile Mginqi's eight named frameworks.

## How to read this document

This register is a **1:1 restatement** of the PRD's canonical requirement set. The PRD (`docs/PRD-Agentic-Operating-System.md`) is the source of truth: every ID, its meaning, and its ordering are taken from the PRD and are not renumbered or invented here. Requirements use the `CATEGORY-NN` identifier scheme established in v1.0 (uppercase 3–4 letter prefix, zero-padded number). v1.0 used `EXTR/VALT/VINT/GRPH/TWIN`; v2 reserved `RAG/MAINT/EVOL`. This milestone continues the scheme with seven prefixes mapped to the PRD's seven requirement clusters:

| Prefix | Category | PRD section | Count |
|--------|----------|-------------|-------|
| FND | Foundation / scaffold (incl. the Four-Cs sub-cluster FND-11..14) | §6 Foundation, §7 Four-Cs build sequence | 14 |
| MEM | Knowledge-graph memory | §9 Memory subsystem | 13 |
| SKL | Skills / sub-agents / capability | §8 Skills & capability layer | 10 |
| GOV | Governance / evidence | §12 Evidence & governance layer | 11 |
| TEAM | Multi-user / RLS | §10 Team / multi-user & RLS | 11 |
| AUT | Autonomy / safety | §11 Autonomy & safety model | 8 |
| OPS | Sync / portability | §13 Phased roadmap (OPS requirements) | 4 |

**Note on the FND prefix:** the PRD carries the Four-Cs build sequence (Context, Connections, Capabilities, Cadence) under the FND prefix as FND-11..14 (PRD §7), distinct from the scaffold requirements FND-01..10 (PRD §6). Both belong to the FND category here.

Each requirement records a **Priority** (Must / Should / Could — MoSCoW), 1–3 testable **Acceptance Criteria** lifted from the PRD's acceptance criterion, a **Source** (which of the three source videos, the AIS-OS starter kit, and/or which Lungile framework it traces to), and a **Maps-to-phase** value against the PRD roadmap.

**PRD roadmap (phase numbering):**

- **P1 — Scaffold:** clone and extend AIS-OS; re-author `CLAUDE.md`; adapt `/onboard`, `/audit`, `/level-up`; Four-Cs baseline.
- **P2 — Memory:** the knowledge-graph memory layer (flattened many-to-many node graph, summary indexes, the Nexus ontology, agent/tool/output node types, zero orphans).
- **P3 — Skills:** skills, sub-agents and capability discovery; three-tier progressive disclosure; hooks; central provisioning.
- **P4 — Evidence:** governance, auto-archived output, the seven CTES components, VRI scoring, Inspector traceability.
- **P5 — Autonomy:** the L0–L4 autonomy ladder, EAD, the Intern Rule, HITL gates, the kill switch, stateless-run safeguards.
- **P6 — Team/RLS:** multi-user three-tier sync, Row-Level Security by client tag, repo scoping mirroring drive permissions.
- **P7 — Portability:** durable markdown portability, bidirectional three-tier sync, repo promotion across tiers.

**Source legend:**

- **V1** = *Build & Sell Claude Code Operating Systems (2+ Hour Course)*
- **V2** = *I Made Claude Code FOR TEAMS*
- **V3** = *I Turned Karpathy's Second Brain Into an AI Operating System (the "Infinite Brain")*
- **AIS-OS** = Nate Herk's lean MIT Claude Code AOS starter kit (cloned reference implementation)
- **Frameworks** = Lungile's whitelisted eight: **AIEA, AaaS, SCALE, VRI, A-E Pattern, DAL, Value Architecting, Strategic Hedging**.

---

## FND — Foundation / Scaffold

The foundation layer clones and extends the AIS-OS scaffold, preserves what works, and re-authors the operating manual in Lungile's voice and doctrine (PRD §6). Its second half is the Four-Cs build sequence (FND-11..14, PRD §7): the **Four Cs of an AIOS** (Nate Herk; attributed) ordered Context (non-skippable) → Connections and Capabilities (parallel) → Cadence (last), with Cadence tied to Lungile's 90-Day Cadence. In Four-Cs terms, **Context** must exist before any other C is built. The scaffold mirrors the AIS-OS starter kit (`CLAUDE.md`, `EXPANSIONS.md`, `connections.md`, `aios-intake.md`, `context/`, `references/`, `decisions/`, `archives/`, `.claude/skills/`) and Lungile's **A-E Pattern** "Aim" stage.

- [ ] **FND-01** — Clone and preserve the AIS-OS scaffold contract
  - **Description:** Clone AIS-OS into `Agentic-OS/` and preserve its directory contract (`.claude/skills/`, `context/`, `references/`, `decisions/`, `archives/`, `CLAUDE.md`, `EXPANSIONS.md`, `connections.md`, `aios-intake.md`).
  - **Priority:** Must
  - **Acceptance Criteria:**
    - All scaffold folders are present after the clone.
    - The AIS-OS MIT `LICENSE` is retained and attributed.
  - **Source:** AIS-OS; V1 (clone and extend the starter kit)
  - **Maps-to-phase:** P1

- [ ] **FND-02** — Keep the Three Ms framework note as the operator brain
  - **Description:** Keep `references/3ms-framework.md` as the operator brain so capability-discovery skills can cite it downstream.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - `references/3ms-framework.md` is present and referenced by `/level-up`.
    - The Three Ms trademark attribution to Nate Herk is retained.
  - **Source:** AIS-OS (`references/3ms-framework.md`); V1 (Three Ms); A-E Pattern (crosswalk)
  - **Maps-to-phase:** P1

- [ ] **FND-03** — Re-author `CLAUDE.md` as Lungile's AOS master prompt
  - **Description:** Re-author `CLAUDE.md` as Lungile's AOS master prompt — the Value Architect role, the evidence-over-theatre doctrine, British English, and the banned-word list.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - `CLAUDE.md` states the fiduciary Value Architect role and points to the memory layer and the frameworks.
    - The master prompt passes the Digital Twin voice self-check.
  - **Source:** V1 (CLAUDE.md = master prompt); AIS-OS; Value Architecting; A-E Pattern (Aim)
  - **Maps-to-phase:** P1

- [ ] **FND-04** — Decision log wired as the upstream feed to the DAL
  - **Description:** Keep `decisions/log.md` as the append-only decision record and wire it as the upstream feed to the DAL.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - Every decision entry carries a date.
    - Entries are convertible to DAL rows (Decision, Assumption, Owner, Evidence-By).
  - **Source:** V1 (decisions/, audit trail); AIS-OS; DAL
  - **Maps-to-phase:** P1

- [ ] **FND-05** — Archives as the auto-archive destination feeding the Evidence Index
  - **Description:** Keep `archives/` and make it the auto-archive destination for all AI Output, feeding the Evidence Index.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - Every AI-generated artefact is written to `archives/` with a timestamp.
    - Nothing is deleted, only moved.
  - **Source:** V1 (archives/, context-rot countermeasure); AIS-OS; crosswalk (auto-archive → Evidence Index — strong fit)
  - **Maps-to-phase:** P1

- [ ] **FND-06** — Adapt `/onboard`, the idempotent Day-1 wizard
  - **Description:** Adapt `/onboard` — the idempotent Day-1 wizard with a hard cap of seven questions, backing up overwrites to `archives/intake-{date}/`.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - Re-running `/onboard` is non-destructive.
    - Prior context is backed up before any overwrite.
  - **Source:** V1 (7-question onboarding interview); AIS-OS (`/onboard`)
  - **Maps-to-phase:** P1

- [ ] **FND-07** — Adapt `/audit` to recognise the memory layer and CTES instrumentation
  - **Description:** Adapt `/audit` — the weekly read-only Four-Cs 100-point gap analysis — to recognise the AOS memory layer and CTES instrumentation.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - `/audit` runs read-only and returns a score out of 100 with a stage label.
    - `/audit` detects the `memory/` graph as Context evidence.
  - **Source:** V1 (/audit Four Cs score /100); AIS-OS (`/audit`); Value Architecting (crosswalk: adopt Four Cs as-is)
  - **Maps-to-phase:** P1

- [ ] **FND-08** — Adapt `/level-up` to tie candidates to VRI and CTES
  - **Description:** Adapt `/level-up` — the weekly automation-discovery skill — to tie every candidate to a VRI dimension and a CTES output.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - `/level-up` ships one artefact per run, scoped through Mindset → Method → Machine.
    - Each candidate carries a named VRI tie.
  - **Source:** V1 (/level-up; Three Ms; EAD); AIS-OS (`/level-up`); VRI; A-E Pattern (Build); SCALE (Automation Depth)
  - **Maps-to-phase:** P1

- [ ] **FND-09** — Extend `EXPANSIONS.md` with AOS growth paths
  - **Description:** Keep `EXPANSIONS.md` as the growth ledger and extend it with AOS-specific expansion paths.
  - **Priority:** Should
  - **Acceptance Criteria:**
    - `EXPANSIONS.md` lists the MEM, SKL, GOV, TEAM, AUT, OPS clusters as recognised growth paths.
  - **Source:** V1 (EXPANSIONS.md growth guide); AIS-OS (`EXPANSIONS.md`)
  - **Maps-to-phase:** P1

- [ ] **FND-10** — Maintain the seven-domain `connections.md` registry
  - **Description:** Maintain the `connections.md` registry across the seven Tier-1 data domains (Revenue, Customer, Calendar, Communication, Tasks, Meetings, Knowledge).
  - **Priority:** Must
  - **Acceptance Criteria:**
    - Each reachable connection is documented.
    - At least one connection can write, not only read.
  - **Source:** V1 (7 Tier-1 buckets; connection registry); AIS-OS (`connections.md`)
  - **Maps-to-phase:** P1

- [ ] **FND-11** — Four Cs: Context (non-skippable)
  - **Description:** The AOS knows the business — identity, voice, priorities, decisions, and the memory graph — before any other C is built.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - `/audit` scores Context ≥ 20/25.
    - `context/` is populated and the `memory/` graph is reachable.
  - **Source:** V1 (Four Cs: Context non-skippable); AIS-OS (`/audit`); Value Architecting + 90-Day Cadence (crosswalk: adopt Four Cs as-is)
  - **Maps-to-phase:** P1

- [ ] **FND-12** — Four Cs: Connections
  - **Description:** The AOS reaches the user's systems across the seven Tier-1 domains, each with a reference guide and a freshness signal.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - `/audit` scores Connections ≥ 18/25.
    - At least 4 Tier-1 domains are reachable and at least 1 is write-capable.
  - **Source:** V1 (Four Cs: Connections; 7 Tier-1 domains); AIS-OS; AIEA (Integration Layer)
  - **Maps-to-phase:** P1

- [ ] **FND-13** — Four Cs: Capabilities
  - **Description:** The AOS knows how to do work — skills and sub-agents (detailed in SKL).
  - **Priority:** Must
  - **Acceptance Criteria:**
    - `/audit` scores Capabilities ≥ 18/25.
    - At least 1 user-built skill and at least 1 sub-agent are present.
  - **Source:** V1 (Four Cs: Capabilities); AIS-OS; SCALE (Standardisation)
  - **Maps-to-phase:** P1

- [ ] **FND-14** — Four Cs: Cadence
  - **Description:** The AOS runs without being asked, on a rhythm anchored to the 90-Day Cadence and the Scale/Fix/Stop review.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - `/audit` scores Cadence ≥ 15/25.
    - A recurring trigger exists and a 90-day review ritual is scheduled.
  - **Source:** V1 (Four Cs: Cadence); AIS-OS; Value Architecting (90-Day Cadence; Scale/Fix/Stop)
  - **Maps-to-phase:** P1

---

## MEM — Knowledge-Graph Memory

The memory layer is the system — "the brain eats the operating system" (PRD §9). It is built by lifting the Nexus ontology approach wholesale: an AI-first read/write markdown wiki, a flattened many-to-many node graph, the `ontology-schema.yaml` (10 node types, 15 edge types), the generator pattern (the graph is generated from frontmatter and wikilinks, never hand-maintained), MOC-style summary indexes, two-step traversal, typed edges, progressive loading, and zero orphans. The cluster extends the ontology with the AOS-operational node types the Nexus graph currently lacks (agent, tool, output) and flags the four-spine simplification against the authoritative five-spine schema.

- [ ] **MEM-01** — AI-first read/write markdown wiki
  - **Description:** Implement the memory as an AI-first read/write markdown wiki — the AI opens, reads, and writes notes, not only humans.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - Agents can create and update memory notes.
    - Every write is archived.
  - **Source:** V3 (AI-first second brain; LLM wiki of linked markdown); V1 (read/write markdown)
  - **Maps-to-phase:** P2

- [ ] **MEM-02** — Flattened many-to-many node graph (non-hierarchical)
  - **Description:** Structure the memory as a flattened many-to-many node graph, not a hierarchical folder tree.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - A note may reference any number of other nodes regardless of folder.
    - No forced hierarchy is imposed by folder placement.
  - **Source:** V3 (flattened many-to-many node graph); V1 (LLM wiki of linked markdown)
  - **Maps-to-phase:** P2

- [ ] **MEM-03** — Reuse the Nexus ontology schema
  - **Description:** Reuse the Nexus ontology schema (`ontology-schema.yaml`) — 10 node types and 15 edge types (9 backbone + 6 vault-derived).
  - **Priority:** Must
  - **Acceptance Criteria:**
    - The AOS memory validates against the schema.
    - Node and edge types match the schema definition.
  - **Source:** V3 (entity ontology); Nexus ontology (`ontology-schema.yaml`); SCALE (Standardisation)
  - **Maps-to-phase:** P2

- [ ] **MEM-04** — Define the AOS-operational node types (agent, tool, output)
  - **Description:** Define the AOS-operational node types absent from the Nexus graph — **agent**, **tool**, **output** — extending, not replacing, the existing types.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - The schema gains agent/tool/output node types with defined properties and edges.
    - Existing node types are unchanged.
  - **Source:** V3 (entity ontology types); crosswalk GAP (AOS-operational node types not in Nexus)
  - **Maps-to-phase:** P2

- [ ] **MEM-05** — Generate the graph programmatically (generator pattern)
  - **Description:** Generate the graph programmatically (the generator pattern) from frontmatter and wikilinks; never hand-maintain it.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - A re-runnable generator produces the graph.
    - Manual graph edits are prohibited.
  - **Source:** V3 (generated from frontmatter and wikilinks); Nexus generator pattern
  - **Maps-to-phase:** P2

- [ ] **MEM-06** — MOC-style summary indexes
  - **Description:** Provide summary indexes (MOC-style) so the agent reads short note-summaries to decide which full docs to inject.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - The agent selects full docs from summaries without exceeding context limits across thousands of notes.
  - **Source:** V3 (summary indexes); V1 (progressive context loading); crosswalk (lift Lungile's MOC indexes — strong fit)
  - **Maps-to-phase:** P2

- [ ] **MEM-07** — Two-step traversal retrieval
  - **Description:** Implement two-step traversal — scan the graph for relevant nodes, then synthesise — per the `nexus-navigation.md` protocol.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - A query first identifies nodes by edge traversal, then loads only the 2–3 most relevant files.
  - **Source:** V3 (two-step traversal); crosswalk (`nexus-navigation.md` traversal — strong fit)
  - **Maps-to-phase:** P2

- [ ] **MEM-08** — Typed edges drive traversal
  - **Description:** Use typed edges to define relationships; traversal follows edge types, not free text.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - Queries traverse named edges (e.g. `uses_framework`, `belongs_to_spine`, `component_of`).
  - **Source:** V3 (edge types define relationships); Nexus ontology (15 edge types)
  - **Maps-to-phase:** P2

- [ ] **MEM-09** — Progressive loading
  - **Description:** Implement progressive loading — load node summaries first, full notes second, heavy references last.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - The context budget is respected.
    - Full notes load only when the summary selects them.
  - **Source:** V3 (progressive loading); V1 (progressive context loading); crosswalk (3-tier kernel disclosure — strong fit)
  - **Maps-to-phase:** P2

- [ ] **MEM-10** — Auto-archive every AI Output to an `output` node and `archives/`
  - **Description:** Auto-archive every AI Output into an `output`-typed node and into `archives/`, feeding the Evidence Index.
  - **Priority:** Should
  - **Acceptance Criteria:**
    - No AI output is lost.
    - Each output is a retrievable node and an archived file.
  - **Source:** V3 (auto-archive everything into Output); crosswalk (Evidence Index + Proof Pack — strong fit); SCALE (Evidence Production)
  - **Maps-to-phase:** P2

- [ ] **MEM-11** — Zero orphans and wiki health-checks
  - **Description:** Maintain zero orphans and run wiki health-checks (lint) on the graph.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - Orphan count = 0 after each generation.
    - Broken-link count = 0.
  - **Source:** V1 (automatic linting; wiki health-checks; pitfall: context rot); V3 (zero orphans)
  - **Maps-to-phase:** P2

- [ ] **MEM-12** — Problem-to-component ingestion
  - **Description:** Convert a described problem into components and store them (problem-to-component ingestion).
  - **Priority:** Should
  - **Acceptance Criteria:**
    - An operator describes a problem in English; the agent decomposes it into nodes and stores them.
  - **Source:** V3 (problem-to-component conversion; human gives English context, AI indexes)
  - **Maps-to-phase:** P2

- [ ] **MEM-13** — Flag the four-spine simplification against the five-spine schema
  - **Description:** Flag the four-spine simplification wherever the human-facing MOCs present it, citing the authoritative five-spine schema.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - Every simplified-view surface carries a note that `external` is omitted and that CTES Core is a node, not a spine.
  - **Source:** Nexus ontology (`ontology-schema.yaml` five-spine authority); correction (four-spine MOC simplification flagged; CTES Core is a node inside platform-product)
  - **Maps-to-phase:** P2

---

## SKL — Skills / Sub-Agents / Capability

The capability layer is built as reusable markdown SOPs with progressive disclosure, delegating token-heavy work to sub-agents and reusing the Digital Twin's three-tier kernel pattern (PRD §8). The Digital Twin already proves the pattern: a persona kernel under 2,000 tokens loads first, the ontology loads on activation, and vault files load on demand per query; the AOS generalises that three-tier disclosure to every skill. It traces to the AIS-OS skill triad and to Lungile's **SCALE** (which governs Agent Skills) and **A-E Pattern** ("Build" / "Construct").

- [ ] **SKL-01** — Skills as `SKILL.md` with YAML frontmatter and optional `reference/`
  - **Description:** Every skill is a `SKILL.md` with YAML frontmatter (name, description, model) plus an optional `reference/` directory for heavy detail.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - A skill loads name and description first, full body second, and `reference/` only when needed.
  - **Source:** V1 (skills = reusable markdown SOPs; YAML frontmatter; progressive disclosure); AIS-OS; SCALE (Standardisation)
  - **Maps-to-phase:** P3

- [ ] **SKL-02** — Three-tier progressive disclosure on every skill
  - **Description:** Implement three-tier progressive disclosure on every skill, mirroring the Digital Twin kernel pattern.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - Tier 1 (frontmatter) ≤ ~200 words; Tier 2 (body) is the SOP; Tier 3 (`reference/`) loads only on demand.
  - **Source:** V1 (progressive disclosure); Digital Twin three-tier kernel; crosswalk (3-tier kernel disclosure — strong fit)
  - **Maps-to-phase:** P3

- [ ] **SKL-03** — Sub-agents for token-heavy delegation
  - **Description:** Delegate token-heavy or context-polluting tasks to **sub-agents** in `.claude/agents/` to protect the main agent's context.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - At least one sub-agent is defined.
    - The main-agent context is not flooded by delegated work.
  - **Source:** V1 (sub-agents protect main context; pitfalls: context rot, token waste); AIS-OS
  - **Maps-to-phase:** P3

- [ ] **SKL-04** — Slash commands as explicit triggers
  - **Description:** Provide slash commands as explicit triggers (`/onboard`, `/audit`, `/level-up`, and AOS additions).
  - **Priority:** Must
  - **Acceptance Criteria:**
    - Each command is discoverable and idempotent where stated.
  - **Source:** V1 (slash commands = explicit triggers); AIS-OS
  - **Maps-to-phase:** P3

- [ ] **SKL-05** — Hooks for automated behaviours
  - **Description:** Support hooks for automated behaviours (lint/health-check on save, archive on output).
  - **Priority:** Should
  - **Acceptance Criteria:**
    - Hooks are configured in settings.
    - Firing is logged.
  - **Source:** V1 (hooks for automated behaviours)
  - **Maps-to-phase:** P3

- [ ] **SKL-06** — Skill-building workflow (run manually, then promote)
  - **Description:** Skill-building workflow: run a task manually with the agent, then convert it into a `SKILL.md`.
  - **Priority:** Should
  - **Acceptance Criteria:**
    - A demonstrated manual task can be promoted to a skill in one operator step.
  - **Source:** V1 (skill-building: run manually then turn into a skill)
  - **Maps-to-phase:** P3

- [ ] **SKL-07** — SCALE Standardisation and a central skill registry
  - **Description:** Apply SCALE Standardisation — a common skill standard and a central skill registry.
  - **Priority:** Should
  - **Acceptance Criteria:**
    - All skills conform to a single frontmatter schema.
    - The Skills console lists them centrally.
  - **Source:** V1 (skill standard); SCALE (Standardisation, Central Provisioning)
  - **Maps-to-phase:** P3

- [ ] **SKL-08** — Skills declare an autonomy ceiling in frontmatter
  - **Description:** Skills must declare their autonomy ceiling (L0–L4, AUT cluster) in frontmatter.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - Every `SKILL.md` carries an `autonomy-max` field.
    - No skill exceeds it at runtime.
  - **Source:** V1 (Autonomy L0–L4); SCALE (Automation Depth)
  - **Maps-to-phase:** P3

- [ ] **SKL-09** — Lightest effective construction ladder
  - **Description:** Capability building prefers the lightest effective construction: L0/L1 prompt template → L2 deterministic skill → L3 AI-assisted skill → L4 sub-agent as last resort.
  - **Priority:** Should
  - **Acceptance Criteria:**
    - `/level-up` selects the lowest-cost construction that meets the requirement.
  - **Source:** V1 (build ladder; L4 sub-agent last resort); AIS-OS (`/level-up`); SCALE (Automation Depth)
  - **Maps-to-phase:** P3

- [ ] **SKL-10** — Digital Twin registered as the persona and voice authority
  - **Description:** The Digital Twin skill is registered as the AOS's persona and voice authority for all branded output.
  - **Priority:** Should
  - **Acceptance Criteria:**
    - Branded artefacts pass the Twin's five-point voice and framework self-check.
  - **Source:** Digital Twin persona kernel; Value Architecting; framework whitelist guard
  - **Maps-to-phase:** P3

---

## GOV — Governance / Evidence

Governance makes evidence the default output of the system (PRD §12). Every run emits, or contributes to, at least one of the seven CTES components; every feature is scored by the VRI; **Value Architecting** governs through its three pillars (Value, Cost, Governance); and the **A-E Pattern** sequences execution so the decision lands after construction. The seven CTES components are Scorecard, 90-Day Plan, DAL, Proof Pack, Evidence Index, Exception Register, and the Scale/Fix/Stop rhythm. CTES Core is a node (subtype `ctes_core`) inside the `platform-product` spine, not a spine.

- [ ] **GOV-01** — Every run emits a CTES component
  - **Description:** Every agent run emits, or contributes to, at least one of the seven CTES components.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - No run completes without writing a CTES artefact.
    - Runs that produce none are flagged as theatre.
  - **Source:** Value Architecting; SCALE (Evidence Production); crosswalk (Evidence Index + Proof Pack — strong fit); correction (CTES Core is a node inside platform-product)
  - **Maps-to-phase:** P4

- [ ] **GOV-02** — Maintain the Scorecard
  - **Description:** Maintain a Scorecard as the board-level measurement instrument for the AOS portfolio.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - A current Scorecard exists with quantified value entries, not narrative.
  - **Source:** Value Architecting (Scorecard); CTES Core
  - **Maps-to-phase:** P4

- [ ] **GOV-03** — Drive execution on a 90-Day Plan
  - **Description:** Drive execution on a 90-Day Plan with measurable milestones.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - A live 90-day plan exists.
    - Milestones are dated and measurable.
  - **Source:** Value Architecting (90-Day Cadence); CTES Core (90-Day Plan)
  - **Maps-to-phase:** P4

- [ ] **GOV-04** — Maintain the DAL fed by `decisions/log.md`
  - **Description:** Maintain the DAL as the live assumption ledger; the `decisions/log.md` feeds it.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - Every decision has a DAL row.
    - Assumptions carry an owner and an evidence-by date.
  - **Source:** DAL; V1 (audit trail); crosswalk (Intern Rule → DAL owner + evidence-by — partial)
  - **Maps-to-phase:** P4

- [ ] **GOV-05** — Assemble a Proof Pack on demand
  - **Description:** Assemble a Proof Pack on demand from the Evidence Index for board presentation.
  - **Priority:** Should
  - **Acceptance Criteria:**
    - A Proof Pack can be generated from current evidence without manual reconstruction.
  - **Source:** Value Architecting (Proof Pack); crosswalk (Proof Pack — strong fit)
  - **Maps-to-phase:** P4

- [ ] **GOV-06** — Maintain the Evidence Index, traceable spend-to-outcome
  - **Description:** Maintain the Evidence Index as the master register of all artefacts, traceable from spend to outcome.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - Every artefact is indexed.
    - The chain spend → decision → action → outcome is walkable in the Inspector.
  - **Source:** V3 (auto-archive Output); SCALE (Evidence Production); crosswalk (Evidence Index — strong fit)
  - **Maps-to-phase:** P4

- [ ] **GOV-07** — Maintain the Exception Register
  - **Description:** Maintain an Exception Register of deviations, risks, and unresolved items.
  - **Priority:** Should
  - **Acceptance Criteria:**
    - Open exceptions are visible.
    - Nothing material is hidden from the register.
  - **Source:** Value Architecting (Exception Register); crosswalk (Kill Switch / HITL → Exception Register — partial)
  - **Maps-to-phase:** P4

- [ ] **GOV-08** — Run the Scale/Fix/Stop rhythm on every initiative
  - **Description:** Run the Scale/Fix/Stop rhythm on every initiative.
  - **Priority:** Should
  - **Acceptance Criteria:**
    - Each initiative is triaged scale/fix/stop on a defined cadence.
    - The decision is recorded.
  - **Source:** Value Architecting (90-Day Cadence; Scale/Fix/Stop); crosswalk (Embed + Scale/Fix/Stop — partial)
  - **Maps-to-phase:** P4

- [ ] **GOV-09** — Score every feature with the VRI before promotion
  - **Description:** Score every feature and initiative with the VRI before promotion.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - No feature is promoted without a VRI score across all five dimensions.
  - **Source:** VRI; Value Architecting (Value pillar)
  - **Maps-to-phase:** P4

- [ ] **GOV-10** — Govern the programme by Value Architecting
  - **Description:** Govern the programme by Value Architecting — the Value, Cost, and Governance pillars instrumented.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - Cost is transparent (TBM/FinOps); value is measured (VRI); governance is forensic (DAL + cadence).
  - **Source:** Value Architecting (three pillars); VRI; DAL; TBM (attributed to Gartner)
  - **Maps-to-phase:** P4

- [ ] **GOV-11** — Sequence delivery by the A-E Pattern
  - **Description:** Sequence delivery by the A-E Pattern — decide after construction, not before.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - Decisions are recorded at the D step, citing evidence constructed at the C step.
  - **Source:** A-E Pattern (Aim → Build → Construct → Decide → Embed); Value Architecting
  - **Maps-to-phase:** P4

---

## TEAM — Multi-User / RLS

A team OS must share memory without exposing private data, let non-technical members improve the rules without code, and isolate tenants programmatically (PRD §10). This cluster is mostly net-new and anchors its semantics in **SCALE** (Central Provisioning, Lifecycle Management) and the **DAL** audit trail. The governance model is the three-tier architecture: Tier 1 Human-Maintained (Notion/Google Drive, the source of truth), Tier 2 Agent-Maintained (the Claude Code environment, holding YAML-heavy skills), and Tier 3 GitHub (the ultimate backup). Row-Level Security provides the tenancy guarantee: a client-scoped employee is programmatically refused another client's data. It traces almost entirely to V2.

- [ ] **TEAM-01** — Three-tier sync model
  - **Description:** Implement the three-tier sync model: Tier 1 Human-Maintained source of truth, Tier 2 Agent-Maintained environment, Tier 3 GitHub backup.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - Each tier holds its defined content.
    - YAML-heavy skills live in Tier 2, not Notion.
  - **Source:** V2 (three-tier architecture)
  - **Maps-to-phase:** P6

- [ ] **TEAM-02** — Merge global and local rules
  - **Description:** Merge global and local rules: global `CLAUDE.md` (shared, inherited) overlaid by private `CLAUDE.local.md` (git-ignored, in the user's private repo).
  - **Priority:** Must
  - **Acceptance Criteria:**
    - Local overrides take precedence.
    - Private overrides never leave the user's private repo.
  - **Source:** V2 (Global CLAUDE.md < Local CLAUDE.local.md)
  - **Maps-to-phase:** P6

- [ ] **TEAM-03** — One GitHub repo per client, scoped to drive access
  - **Description:** Enforce one GitHub repository per client, scoped to people with that client's drive access.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - Repo membership is provisioned per client.
    - Access mirrors drive permissions.
  - **Source:** V2 (one GitHub repo per client; membership mirrors drive permissions)
  - **Maps-to-phase:** P6

- [ ] **TEAM-04** — Memory Row-Level Security by client tag
  - **Description:** Implement memory Row-Level Security on Postgres/Supabase, filtered by client tag.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - A client-scoped query returns only that client's rows.
    - Cross-tenant reads return nothing.
  - **Source:** V2 (memory Row-Level Security; programmatic refusal); crosswalk (RLS / multi-tenancy — largest enterprise add); SCALE (Central Provisioning)
  - **Maps-to-phase:** P6

- [ ] **TEAM-05** — Local memory index from permitted files only
  - **Description:** Build the local memory index only from files the user's token permits — isolation for free.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - A user's local index contains no file outside their permitted scope.
  - **Source:** V2 (token-based syncing; local machine holds only permitted files; free isolation)
  - **Maps-to-phase:** P6

- [ ] **TEAM-06** — Automate repo scoping to mirror drive permissions
  - **Description:** Automate repo scoping so GitHub membership mirrors drive permissions.
  - **Priority:** Should
  - **Acceptance Criteria:**
    - Adding a person to a client's drive folder provisions their repo access; removal revokes it.
  - **Source:** V2 (GitHub membership mirrors drive permissions); SCALE (Central Provisioning)
  - **Maps-to-phase:** P6

- [ ] **TEAM-07** — Non-technical rule updates via Tier 1
  - **Description:** Allow non-technical rule updates by editing the Tier 1 source (Notion/Drive), with outputs pushed back read-only.
  - **Priority:** Should
  - **Acceptance Criteria:**
    - A non-technical member updates a rule without touching code; the change propagates.
  - **Source:** V2 (non-technical rule updates; outputs pushed back read-only)
  - **Maps-to-phase:** P6

- [ ] **TEAM-08** — SCALE Central Provisioning
  - **Description:** Apply SCALE Central Provisioning — a single registry from which skills and rules are provisioned to tenants.
  - **Priority:** Should
  - **Acceptance Criteria:**
    - Skills and global rules are provisioned centrally, not copied ad hoc per repo.
  - **Source:** SCALE (Central Provisioning); V2 (shared rules)
  - **Maps-to-phase:** P6

- [ ] **TEAM-09** — SCALE Lifecycle Management
  - **Description:** Apply SCALE Lifecycle Management — versioning, deprecation, and updates of provisioned skills and rules.
  - **Priority:** Should
  - **Acceptance Criteria:**
    - Each provisioned asset carries a version.
    - Deprecation is recorded in the DAL.
  - **Source:** SCALE (Lifecycle Management); DAL
  - **Maps-to-phase:** P6

- [ ] **TEAM-10** — Record tenancy decisions in the DAL
  - **Description:** Record every tenancy and provisioning decision in the DAL with owner and evidence-by date.
  - **Priority:** Should
  - **Acceptance Criteria:**
    - RLS configuration changes appear as DAL rows.
    - Unvalidated assumptions past date become liabilities.
  - **Source:** DAL; V2 (RLS configuration); SCALE (Central Provisioning)
  - **Maps-to-phase:** P6

- [ ] **TEAM-11** — Markdown portability for memory and rules
  - **Description:** Ensure markdown portability so memory and rules are not locked to any vendor.
  - **Priority:** Should
  - **Acceptance Criteria:**
    - Memory and rules export as plain markdown/YAML and re-import without loss.
  - **Source:** V2 (prevent vendor lock-in via portable markdown); Strategic Hedging
  - **Maps-to-phase:** P6

---

## AUT — Autonomy / Safety

Autonomy is dialled in deliberately and seated above a kill switch (PRD §11). The cluster authors the explicit **L0–L4 ladder** against SCALE Automation Depth (which names the dimension but leaves the ladder unspecified): L0 Manual, L1 Suggested, L2 Drafted, L3 Supervised, L4 Autonomous. The ladder defaults to the lowest effective level and is raised only on evidence. **EAD** (Eliminate > Automate > Delegate; attributed) decides whether a task should exist at all; the **Intern Rule** (attributed) treats the AI like a new hire; and the **Kill Switch** dismantles any automation needing constant patching or costing more than it saves. It traces almost entirely to V1.

- [ ] **AUT-01** — Implement the L0–L4 autonomy ladder
  - **Description:** Implement the L0–L4 ladder as the AOS autonomy model, governed by SCALE Automation Depth.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - Every agent action runs at a declared level.
    - The level is recorded in the audit trail.
  - **Source:** V1 (Autonomy L0–L4; default to lowest effective); crosswalk GAP (explicit L0–L4 ladder must be authored); SCALE (Automation Depth)
  - **Maps-to-phase:** P5

- [ ] **AUT-02** — Default to the lowest effective level; raise on evidence
  - **Description:** Default every task to the lowest effective level; raise only on evidence.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - New tasks start at L0/L1 unless evidence justifies higher.
    - Raises are logged in the DAL.
  - **Source:** V1 (default to lowest effective); DAL; SCALE (Automation Depth)
  - **Maps-to-phase:** P5

- [ ] **AUT-03** — Apply EAD before automating
  - **Description:** Apply EAD before automating — eliminate the task, else automate, else delegate.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - `/level-up` records an EAD decision per candidate before construction.
  - **Source:** V1 (EAD = Eliminate > Automate > Delegate); crosswalk GAP (adopt as-is)
  - **Maps-to-phase:** P5

- [ ] **AUT-04** — Enforce the Intern Rule
  - **Description:** Enforce the Intern Rule — own identity and credentials, read-only default, no human impersonation, audit trail, minimal scope.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - Agents act under their own identity.
    - Write scope is granted explicitly; impersonation is blocked.
  - **Source:** V1 (Intern Rule); crosswalk (Intern Rule → DAL + HITL — partial)
  - **Maps-to-phase:** P5

- [ ] **AUT-05** — HITL gates at L2 and above
  - **Description:** Provide HITL gates at L2 and above; nothing leaves the system at L2 without human review.
  - **Priority:** Should
  - **Acceptance Criteria:**
    - An L2 action blocks on human approval.
    - The approval is recorded.
  - **Source:** V1 (supervised levels; audit trail); crosswalk (Kill Switch / HITL → DAL + Exception Register — partial)
  - **Maps-to-phase:** P5

- [ ] **AUT-06** — Implement a kill switch
  - **Description:** Implement a kill switch that dismantles any automation needing constant patching or costing more than it saves.
  - **Priority:** Should
  - **Acceptance Criteria:**
    - The CIO can disable any automation from Settings.
    - Disablement is recorded in the Exception Register.
  - **Source:** V1 (Kill Switch); crosswalk (Kill Switch — partial)
  - **Maps-to-phase:** P5

- [ ] **AUT-07** — Safeguard stateless remote runs
  - **Description:** Safeguard stateless remote runs — pass required context explicitly; never assume local state.
  - **Priority:** Could
  - **Acceptance Criteria:**
    - A scheduled remote run carries its full context.
    - A missing-context run fails closed, not open.
  - **Source:** V1 (remote routines; pitfall: stateless remote runs)
  - **Maps-to-phase:** P5

- [ ] **AUT-08** — Record autonomy and kill-switch actions in the DAL and Exception Register
  - **Description:** Record every autonomy-level change and kill-switch action in the DAL and Exception Register.
  - **Priority:** Should
  - **Acceptance Criteria:**
    - Each change is traceable to an owner, a reason, and a date.
  - **Source:** V1 (audit trail); DAL; Exception Register
  - **Maps-to-phase:** P5

---

## OPS — Sync / Portability

Portability is the anti-lock-in guarantee: durable, tool-agnostic markdown that survives a change of model or vendor, kept in bidirectional three-tier sync, with remote scheduled routines and permission-based repo promotion (PRD §13). This cluster maps to P7 and traces to all three videos and to Lungile's **A-E Pattern** "Embed" stage and **Strategic Hedging** (avoiding single-vendor dependence). Live bidirectional three-tier sync is specified here but phased to P7, after the AOS core is governed and proven.

- [ ] **OPS-01** — Bidirectional three-tier sync (phased to P7)
  - **Description:** Implement bidirectional three-tier sync (Tier 1 Notion/Drive ↔ Tier 2 Claude Code ↔ Tier 3 GitHub), phased to P7.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - A change in one tier propagates to the others per the defined direction rules.
  - **Source:** V2 (multi-tier bidirectional markdown sync); V1 (GitHub sync); V3 (model-agnostic markdown)
  - **Maps-to-phase:** P7

- [ ] **OPS-02** — Markdown/YAML portability — no vendor lock-in
  - **Description:** Guarantee markdown/YAML portability — no vendor lock-in for memory or rules.
  - **Priority:** Must
  - **Acceptance Criteria:**
    - Full export and re-import with zero loss.
    - No proprietary format is required to read the memory.
  - **Source:** V1 (tool-agnostic durable markdown; boring-is-beautiful); V2 (prevent vendor lock-in); V3 (model-agnostic via markdown); Strategic Hedging
  - **Maps-to-phase:** P7

- [ ] **OPS-03** — Remote scheduled routines run statelessly with explicit context
  - **Description:** Support remote scheduled routines that run statelessly with explicit context.
  - **Priority:** Should
  - **Acceptance Criteria:**
    - A scheduled run executes in the cloud carrying its full context.
    - Missing context fails closed.
  - **Source:** V1 (remote routines; deterministic 24/7 scripts; pitfall: stateless remote runs)
  - **Maps-to-phase:** P7

- [ ] **OPS-04** — Permission-based repo promotion (Personal → Department → Company)
  - **Description:** Implement permission-based repo promotion (Personal → Department → Company), reviewed by an AI Architect before promotion.
  - **Priority:** Should
  - **Acceptance Criteria:**
    - No pattern is promoted without an AI Architect review and a passing verification gate.
  - **Source:** V3 (multi-tier repos; promote successful patterns; AI Architects review); V2 (repo scoping); A-E Pattern (Embed); crosswalk (Embed + verify gates — partial)
  - **Maps-to-phase:** P7

---

## Brand and language conventions

- All rendered UI for this system follows the NOVATEK brand: navy `#1e3a5f`, cobalt `#2563eb`, charcoal `#334155` — never pure black; shadows use navy-tinted rgba; the "NOVATEK" wordmark is uppercase with "TEK" accented in cobalt on light backgrounds. The D2A demo console's information architecture (nav: Dashboard, Agents, Chat, Swarm, Tasks, Memory, Inspector, Skills, MCP, Settings, Terminal) is proven and may be reused, but its off-brand cyan `#00f0ff` sci-fi theme must be re-skinned to brand before anything ships.
- British English throughout (organise, optimise, prioritise, behaviour, colour, artefact, licence as a noun). Banned hype words: leverage, synergy, paradigm shift, journey, game-changer, disruptive.

## Ontology note (navigational simplification flag)

The authoritative Nexus ontology (`ontology-schema.yaml`) has **five** spine instances: content-ip, business-operating, platform-product, external, and profile. Human-facing MOCs present a simplified **four-spine** view (Content/IP, CTES Core, Business/Operating, Platform) that **omits `external`** and treats CTES Core as if it were a spine. This is a deliberate navigational simplification and **contradicts the authoritative `ontology-schema.yaml`**: CTES Core is in fact a node (subtype `ctes_core`) inside the platform-product spine, with its seven components attached by `component_of` edges. Any memory-layer work (MEM-13 in particular, and the schema reuse in MEM-03/MEM-04) must encode the five-spine truth and flag the four-spine view as a presentation-only simplification.

---

## Out of Scope

| Feature | Reason |
|---------|--------|
| Fine-tuned LLM | Claude plus skill files plus the governed markdown memory achieves persona and task fidelity without fine-tuning; a fine-tuned model is a liability the evidence does not yet justify. |
| Heavyweight graph database (Neo4j and similar) | At this scale (the Nexus graph holds 114 nodes and 524 edges) a YAML ontology plus markdown is the correct instrument; a graph database is over-provisioning, not governance. |
| Live bidirectional Notion sync | Phased, not committed. v1.0 treated Notion as a one-time transfer with the vault as source of truth; live three-tier sync (TEAM/OPS) is specified but deferred to the later phases. |
| Platform/Portal software and client portal | Phased. The Platform/Portal remains a placeholder spine; its software build and the buyer-facing portal are deferred to a later programme, after the AOS core is governed and proven. |
| Book v3 authoring | Blocked until Business v2 consolidation per the Nexus build-order rule; commercial architecture precedes thought-leadership packaging. |
| IT EXEC (Horizon T) integration | External, rented execution/measurement tool with no platform integration in scope. |
| Cross-client data sharing | Forbidden by RLS (TEAM-04); explicitly out of scope. |
| Replacing Lungile's eight frameworks | The whitelist is fixed (AIEA, AaaS, SCALE, VRI, A-E Pattern, DAL, Value Architecting, Strategic Hedging); this system extends and operationalises them, it does not invent new ones. |

---

## Traceability Matrix

Each row pins a requirement ID to its phase, its PRD section number (0–16), and its source. Every one of the 71 canonical IDs appears exactly once.

| Requirement | Phase | PRD Section | Source |
|-------------|-------|-------------|--------|
| FND-01 | P1 | §6 | AIS-OS; V1 |
| FND-02 | P1 | §6 | AIS-OS; V1; A-E Pattern |
| FND-03 | P1 | §6 | V1; AIS-OS; Value Architecting |
| FND-04 | P1 | §6 | V1; AIS-OS; DAL |
| FND-05 | P1 | §6 | V1; AIS-OS |
| FND-06 | P1 | §6 | V1; AIS-OS |
| FND-07 | P1 | §6 | V1; AIS-OS; Value Architecting |
| FND-08 | P1 | §6 | V1; AIS-OS; VRI; A-E Pattern; SCALE |
| FND-09 | P1 | §6 | V1; AIS-OS |
| FND-10 | P1 | §6 | V1; AIS-OS |
| FND-11 | P1 | §7 | V1; AIS-OS; Value Architecting |
| FND-12 | P1 | §7 | V1; AIS-OS; AIEA |
| FND-13 | P1 | §7 | V1; AIS-OS; SCALE |
| FND-14 | P1 | §7 | V1; AIS-OS; Value Architecting |
| MEM-01 | P2 | §9 | V3; V1 |
| MEM-02 | P2 | §9 | V3; V1 |
| MEM-03 | P2 | §9 | V3; Nexus ontology; SCALE |
| MEM-04 | P2 | §9 | V3; crosswalk GAP |
| MEM-05 | P2 | §9 | V3; Nexus generator pattern |
| MEM-06 | P2 | §9 | V3; V1; crosswalk (strong fit) |
| MEM-07 | P2 | §9 | V3; crosswalk (strong fit) |
| MEM-08 | P2 | §9 | V3; Nexus ontology |
| MEM-09 | P2 | §9 | V3; V1; crosswalk (strong fit) |
| MEM-10 | P2 | §9 | V3; SCALE; crosswalk (strong fit) |
| MEM-11 | P2 | §9 | V1; V3 |
| MEM-12 | P2 | §9 | V3 |
| MEM-13 | P2 | §9 | Nexus ontology; correction (four-spine flag) |
| SKL-01 | P3 | §8 | V1; AIS-OS; SCALE |
| SKL-02 | P3 | §8 | V1; Digital Twin; crosswalk (strong fit) |
| SKL-03 | P3 | §8 | V1; AIS-OS |
| SKL-04 | P3 | §8 | V1; AIS-OS |
| SKL-05 | P3 | §8 | V1 |
| SKL-06 | P3 | §8 | V1 |
| SKL-07 | P3 | §8 | V1; SCALE |
| SKL-08 | P3 | §8 | V1; SCALE |
| SKL-09 | P3 | §8 | V1; AIS-OS; SCALE |
| SKL-10 | P3 | §8 | Digital Twin; Value Architecting |
| GOV-01 | P4 | §12 | Value Architecting; SCALE; correction (CTES node) |
| GOV-02 | P4 | §12 | Value Architecting; CTES Core |
| GOV-03 | P4 | §12 | Value Architecting; CTES Core |
| GOV-04 | P4 | §12 | DAL; V1 |
| GOV-05 | P4 | §12 | Value Architecting; crosswalk (strong fit) |
| GOV-06 | P4 | §12 | V3; SCALE; crosswalk (strong fit) |
| GOV-07 | P4 | §12 | Value Architecting; crosswalk (partial) |
| GOV-08 | P4 | §12 | Value Architecting; crosswalk (partial) |
| GOV-09 | P4 | §12 | VRI; Value Architecting |
| GOV-10 | P4 | §12 | Value Architecting; VRI; DAL; TBM (attributed) |
| GOV-11 | P4 | §12 | A-E Pattern; Value Architecting |
| TEAM-01 | P6 | §10 | V2 |
| TEAM-02 | P6 | §10 | V2 |
| TEAM-03 | P6 | §10 | V2 |
| TEAM-04 | P6 | §10 | V2; SCALE; crosswalk (largest add) |
| TEAM-05 | P6 | §10 | V2 |
| TEAM-06 | P6 | §10 | V2; SCALE |
| TEAM-07 | P6 | §10 | V2 |
| TEAM-08 | P6 | §10 | SCALE; V2 |
| TEAM-09 | P6 | §10 | SCALE; DAL |
| TEAM-10 | P6 | §10 | DAL; V2; SCALE |
| TEAM-11 | P6 | §10 | V2; Strategic Hedging |
| AUT-01 | P5 | §11 | V1; SCALE; crosswalk GAP |
| AUT-02 | P5 | §11 | V1; DAL; SCALE |
| AUT-03 | P5 | §11 | V1; crosswalk GAP (adopt as-is) |
| AUT-04 | P5 | §11 | V1; crosswalk (partial) |
| AUT-05 | P5 | §11 | V1; crosswalk (partial) |
| AUT-06 | P5 | §11 | V1; crosswalk (partial) |
| AUT-07 | P5 | §11 | V1 |
| AUT-08 | P5 | §11 | V1; DAL; Exception Register |
| OPS-01 | P7 | §13 | V2; V1; V3 |
| OPS-02 | P7 | §13 | V1; V2; V3; Strategic Hedging |
| OPS-03 | P7 | §13 | V1 |
| OPS-04 | P7 | §13 | V3; V2; A-E Pattern; crosswalk (partial) |

**Coverage:**
- Total requirements: 71
- Per category: FND 14, MEM 13, SKL 10, GOV 11, TEAM 11, AUT 8, OPS 4
- Mapped to phases: 71
- Unmapped: 0

**Priority distribution:**
- Must: 48
- Should: 22
- Could: 1

---
*Requirements defined: 2026-06-06. 1:1 restatement of the canonical register in `docs/PRD-Agentic-Operating-System.md`.*
*Companion to: `docs/PRD-Agentic-Operating-System.md` (phases P1 Scaffold → P2 Memory → P3 Skills → P4 Evidence → P5 Autonomy → P6 Team/RLS → P7 Portability)*

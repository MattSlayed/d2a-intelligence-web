# Product Requirements Document — Enterprise Agentic Operating System

> An evidence-first Agentic Operating System (AOS) for the enterprise, built on the AIS-OS scaffold and governed by Lungile Mginqi's intellectual architecture: the Digital Twin, the Nexus Architecture of Work, the CTES evidence system, and the eight named frameworks.

---

## 0. Document Control

| Field | Detail |
|-------|--------|
| **Title** | Product Requirements Document — Enterprise Agentic Operating System |
| **Version** | 0.1 — **DRAFT** |
| **Status** | Draft for review. Not yet approved. Not yet baselined. |
| **Owner** | Lungile Mginqi (CIO / fiduciary owner, acting as Value Architect) |
| **Author** | Lungile Mginqi Digital Twin (NOVATEK LLC), under human direction |
| **Audience** | CIO, AI Architect, operators/analysts, client tenants |
| **Language** | British English throughout — organise, optimise, prioritise, behaviour, colour, artefact, licence (noun). |
| **Banned vocabulary** | leverage, synergy, paradigm shift, journey, game-changer, disruptive. These do not appear in this document by design. |
| **Brand note** | If any part of this PRD is rendered as HTML or a console, it follows the NOVATEK brand: Primary Navy `#1e3a5f`, Primary Cobalt `#2563eb`, Charcoal `#334155`. Never pure black; shadows use navy-tinted rgba. "NOVATEK" is always uppercase with "TEK" accented in cobalt on light backgrounds. The cyan `#00f0ff` sci-fi theme of the D2A demo console is **off-brand** and must be re-skinned. |
| **Provenance** | This PRD derives from three sources: (1) the AOS design-notes document and the three source videos in the NotebookLM notebook *The Infinite Brain* — *Build & Sell Claude Code Operating Systems*, *I Made Claude Code FOR TEAMS*, and *I Turned Karpathy's Second Brain Into an AI Operating System*; (2) the cloned **AIS-OS** scaffold (Nate Herk's lean MIT Claude Code starter kit); and (3) Lungile Mginqi's existing intellectual property — the Digital Twin persona kernel, the Nexus ontology (`ontology-schema.yaml`), the CTES evidence system, the eight named frameworks in `vault/framework-portfolio/`, and the GSD planning method. |
| **Whitelisted frameworks** | Only Lungile's eight named frameworks are referenced as his: **AIEA, AaaS, SCALE, VRI, A-E Pattern, DAL, Value Architecting, Strategic Hedging.** Third-party concepts (the Three Ms, the Four Cs, EAD, the Bike Method, the Intern Rule, Row-Level Security) are attributed to their sources and never claimed as Lungile's work. |

---

## 1. Context & Problem

Put enterprise AI on trial, and the prosecution rests its case in a single sentence: **there is activity, but there is no evidence.**

Agents are busy. Dashboards glow. Demonstrations dazzle. Yet when the board asks the only question that matters — *can you prove the value, and can the proof survive cross-examination?* — the room goes quiet. This is **theatre**: the rituals, status decks, and governance forums that create the appearance of control without producing evidence of outcomes. It is the central disease the Mginqi Doctrine names. The gap between activity and value is the disease; theatre is its symptom; evidence is the cure.

The current generation of enterprise agent tooling deepens the disease rather than treating it. Three failures recur:

1. **No evidence.** An agent acts, but the action leaves no board-defensible artefact behind. There is a transcript, perhaps a log — but a transcript is not a scorecard, and a log is not a Proof Pack. The output cannot be admitted as an exhibit.
2. **No traceability.** When an outcome is questioned, the chain from spend to decision to action to result cannot be walked. The value tree has no strength. Assumptions were never recorded, owned, or time-bound — so when they fail, no one is accountable.
3. **No tenancy controls.** Memory is shared without isolation. An agent serving one client can read another client's context. There is no programmatic refusal, only a policy nobody enforces.

The Mginqi Doctrine is unambiguous: the CIO is a **fiduciary officer of enterprise value**, and the sacred duty is to produce evidence — not theatre — that every rand spent and every outcome promised can survive cross-examination in the boardroom court. An Agentic Operating System that cannot meet that standard is not an asset. It is a liability wearing the costume of one.

The **theatre-versus-evidence** distinction is therefore not a stylistic preference. It is the governing axis of this entire specification. Every requirement in this document exists to move one mark along that axis — away from performance, towards proof.

---

## 2. Vision

A **governed Agentic Operating System** where every agent action produces a board-defensible artefact.

The vision rests on three convictions, each drawn directly from the source material and from Lungile's methodology.

**First — the memory layer is the system.** The power of an AOS is not the model; it is the customised operating layer that structures how the model receives information. The brain eats the operating system. A knowledge-graph memory of linked markdown — AI-first, model-agnostic, traceable — is the durable asset. Models are rented and replaced; the governed memory persists. This is the single largest reusable component, and Lungile already owns a mature instance of it in the Nexus ontology.

**Second — every run emits evidence.** Activity is not the unit of value; the artefact is. Each agent run produces, or contributes to, the seven components of the CTES evidence system: Scorecard, 90-Day Plan, DAL, Proof Pack, Evidence Index, Exception Register, and the Scale/Fix/Stop rhythm. An action that produces no admissible exhibit is theatre and is treated as such by the system.

**Third — autonomy is dial-able under a kill switch.** Autonomy is not a binary and it is not a destiny. It is a dial, set per task to the lowest effective level, raised only on evidence, and always seated above a kill switch. An automation that needs constant patching, or that costs more than it saves, is dismantled — not defended.

The result is an AOS that a fiduciary owner can stand behind in front of a board: governed, traceable, isolated by tenant, and instrumented to produce evidence by default rather than on demand.

---

## 3. Goals & Non-Goals

### 3.1 Goals

| # | Goal |
|---|------|
| G1 | Stand up an evidence-first AOS on the AIS-OS scaffold without discarding Lungile's existing IP. |
| G2 | Make the Nexus knowledge-graph memory the operational core — AI-first read/write, progressive loading, zero orphans. |
| G3 | Ensure every agent run is instrumented to emit, or contribute to, the seven CTES components. |
| G4 | Author an explicit autonomy ladder (L0–L4) seated above a kill switch, governed by SCALE Automation Depth. |
| G5 | Provide multi-user governance and tenant isolation via Row-Level Security, one repo per client, mirroring drive permissions. |
| G6 | Score every feature and initiative with the VRI before it is promoted. |
| G7 | Express the build as GSD phases with full CONTEXT → VERIFICATION discipline. |

### 3.2 Non-Goals (carried forward from v1.0 out-of-scope discipline)

The v1.0 milestone earned its discipline by refusing scope it did not need. That discipline carries forward.

| Non-Goal | Reason |
|----------|--------|
| **Fine-tuned model** | Claude plus skill files plus the governed markdown memory achieves persona and task fidelity without fine-tuning. A fine-tuned model is a liability the evidence does not yet justify. |
| **Heavyweight graph database (Neo4j and similar)** | At this scale — the Nexus graph holds 114 nodes and 524 edges — a YAML ontology plus markdown is the correct instrument. A graph database is over-provisioning, not governance. |
| **Live bidirectional Notion sync** | **Phased, not committed.** v1.0 treated Notion as a one-time transfer with the vault as source of truth. Live three-tier sync is specified here (TEAM/OPS) but deferred to the later phases. |
| **Platform/Portal software and client portal** | **Phased.** The Platform/Portal is the living execution layer in the Nexus diagram; it remains a placeholder spine. Its software build and the buyer-facing portal are deferred to a later programme, after the AOS core is governed and proven. |
| **Book v3 authoring** | Blocked until Business v2 consolidation per the Nexus build-order rule. Commercial architecture precedes thought-leadership packaging. |
| **IT EXEC (Horizon T) integration** | External, rented execution/measurement tool with no platform integration in scope. |

---

## 4. Personas

| Persona | Role | Needs from the AOS | Maps to |
|---------|------|--------------------|---------|
| **CIO / fiduciary owner** | Owns enterprise value; the Value Architect. Decides after construction, not before. | Board-defensible evidence on demand; VRI per initiative; a kill switch they control; cost transparency. | Value Architecting; the A-E Pattern; CTES Scorecard and Proof Pack. |
| **AI Architect** | Reviews individual repos and promotes proven patterns upward (Personal → Department → Company). | Visibility into repo health; promotion gates; verification evidence before promotion. | SCALE Lifecycle Management; A-E "Embed"; GSD verify gates; Scale/Fix/Stop rhythm. |
| **Operator / analyst** | Runs day-to-day agent work; builds and improves skills. | Low-friction skill authoring; progressive context loading; clear autonomy levels; the Four-Cs `/audit`. | The Four Cs; the autonomy ladder; SKL requirements. |
| **Client tenant** | A client (or a client's staff) whose work the AOS serves, scoped by Row-Level Security. | Programmatic guarantee they see only their own data; no cross-tenant leakage. | TEAM/RLS requirements; SCALE Central Provisioning; DAL audit trail. |

---

## 5. AOS Reference Architecture

### 5.1 The Layered Model

The AOS is a stack of seven governed layers. Each maps to a requirement cluster (Section 6–12) and to one or more of Lungile's frameworks.

| Layer | Purpose | Requirement cluster | Framework anchor |
|-------|---------|---------------------|------------------|
| **L7 — Governance & Evidence** | Every run emits CTES evidence; features scored by VRI. | GOV | Value Architecting, VRI, CTES, A-E Pattern |
| **L6 — Autonomy & Safety** | L0–L4 dial; kill switch; HITL gates; Intern Rule. | AUT | SCALE Automation Depth, DAL |
| **L5 — Team & Tenancy** | RLS, one-repo-per-client, three-tier sync. | TEAM | SCALE Central Provisioning, DAL |
| **L4 — Capabilities** | Skills, sub-agents, slash commands, hooks. | SKL | SCALE Standardisation, the Four Cs (Capabilities) |
| **L3 — Knowledge-Graph Memory** | AI-first markdown wiki; flattened graph; typed edges; progressive loading. | MEM | Nexus ontology, the Four Cs (Context) |
| **L2 — Foundation** | The AIS-OS scaffold extended and re-skinned. | FND | The Three Ms, the Four Cs |
| **L1 — Connections** | Reach to the seven Tier-1 data domains. | (FND/TEAM) | The Four Cs (Connections), AIEA Integration Layer |

This layered model is congruent with **AIEA**, Lungile's five-layer AI-adoption blueprint: Data Foundation (L3 memory) → AI Orchestration (L4 capabilities) → Integration and API (L1 connections) → Governance and Security (L5–L7) → Business Alignment (the VRI apex, mapping every capability to board-level outcomes).

### 5.2 Console Information Architecture

The AOS console reuses the **proven information architecture** of the D2A demo console — the navigation has been validated — but is **re-skinned to the NOVATEK brand**. The D2A cyan `#00f0ff` sci-fi theme is off-brand and must not ship.

| Nav item | Function | Backing cluster |
|----------|----------|-----------------|
| **Dashboard** | VRI per initiative; CTES evidence completeness; Four-Cs trend; autonomy distribution. | GOV |
| **Agents** | Registry of agents and sub-agents; identity, scope, autonomy level. | SKL, AUT |
| **Chat** | Operator conversation with the main agent. | SKL |
| **Swarm** | Multi-agent and sub-agent orchestration view. | SKL |
| **Tasks** | Work items, HITL gates awaiting approval, Scale/Fix/Stop triage. | AUT, GOV |
| **Memory** | The knowledge-graph wiki — nodes, typed edges, summary indexes, MOCs. | MEM |
| **Inspector** | Traceability view — walk the chain from spend to outcome; Evidence Index. | GOV, MEM |
| **Skills** | Skill registry; SKILL.md frontmatter; central provisioning. | SKL |
| **MCP** | Connection registry; freshness; read/write balance. | FND, TEAM |
| **Settings** | Global rules, local overrides, RLS configuration, kill switch. | TEAM, AUT |
| **Terminal** | Direct command surface. | FND |

**Brand re-skin requirement:** navy `#1e3a5f` chrome, cobalt `#2563eb` accents and active states, charcoal `#334155` text, navy-tinted shadows. No pure black. The "NOVATEK" wordmark uppercase with "TEK" in cobalt.

### 5.3 Mapping to the AIS-OS Folder Layout

The AOS extends the AIS-OS scaffold rather than replacing it:

```
Agentic-OS/                      (the AOS root)
  CLAUDE.md                      master prompt — re-authored as Lungile's Value Architect
  CLAUDE.local.md                git-ignored private overrides (net-new)
  EXPANSIONS.md                  growth guide (kept)
  connections.md                 7-domain registry (kept)
  aios-intake.md                 7-question intake (adapted)
  .claude/skills/                onboard, audit, level-up (adapted) + new skills (SKL)
  .claude/agents/                sub-agents (net-new, SKL)
  context/                       about-me, about-business, priorities (kept)
  references/                    3ms-framework.md (kept) + API + ontology references
  decisions/log.md               append-only decision record (kept; feeds DAL)
  memory/                        the Nexus knowledge-graph wiki (MEM, net-new at this layer)
  archives/                      auto-archive of all AI Output (kept; feeds Evidence Index)
  .planning/                     GSD phases (net-new — mirrors v1.0 discipline)
```

---

## 6. Foundation Requirements (FND)

**Intent:** Clone and extend the AIS-OS scaffold; preserve what works; re-author the operating manual in Lungile's voice and doctrine.

| ID | Requirement | Acceptance criterion |
|----|-------------|----------------------|
| **FND-01** | Clone AIS-OS into `Agentic-OS/` and preserve its directory contract (`.claude/skills/`, `context/`, `references/`, `decisions/`, `archives/`, `CLAUDE.md`, `EXPANSIONS.md`, `connections.md`, `aios-intake.md`). | All scaffold folders present; the AIS-OS MIT `LICENSE` retained and attributed. |
| **FND-02** | Keep `references/3ms-framework.md` as the operator brain. | File present and referenced by `/level-up`; the Three Ms trademark attribution to Nate Herk retained. |
| **FND-03** | Re-author `CLAUDE.md` as Lungile's AOS master prompt — Value Architect role, evidence-over-theatre doctrine, British English, banned-word list. | `CLAUDE.md` states the fiduciary role, points to memory and frameworks, and passes the Digital Twin voice self-check. |
| **FND-04** | Keep `decisions/log.md` as the append-only decision record and wire it as the upstream feed to the DAL. | Every decision entry carries a date; entries are convertible to DAL rows (Decision, Assumption, Owner, Evidence-By). |
| **FND-05** | Keep `archives/` and make it the auto-archive destination for all AI Output, feeding the Evidence Index. | Every AI-generated artefact is written to `archives/` with a timestamp; nothing is deleted, only moved. |
| **FND-06** | Adapt `/onboard` — the idempotent Day-1 wizard, hard cap of seven questions, backing up overwrites to `archives/intake-{date}/`. | Re-running `/onboard` is non-destructive; prior context is backed up before overwrite. |
| **FND-07** | Adapt `/audit` — the weekly read-only Four-Cs 100-point gap analysis — to recognise the AOS memory layer and CTES instrumentation. | `/audit` runs read-only, returns a score out of 100 with stage label, and detects the `memory/` graph as Context evidence. |
| **FND-08** | Adapt `/level-up` — the weekly automation-discovery skill — to tie every candidate to a VRI dimension and a CTES output. | `/level-up` ships one artefact per run, scoped through Mindset → Method → Machine, with a named VRI tie. |
| **FND-09** | Keep `EXPANSIONS.md` as the growth ledger and extend it with AOS-specific expansion paths. | `EXPANSIONS.md` lists the MEM, SKL, GOV, TEAM, AUT, OPS clusters as recognised growth paths. |
| **FND-10** | Maintain the `connections.md` registry across the seven Tier-1 data domains (Revenue, Customer, Calendar, Communication, Tasks, Meetings, Knowledge). | Each reachable connection documented; at least one connection can write, not only read. |

---

## 7. The Four-Cs Build Sequence as Requirements

The **Four Cs of an AIOS** (Nate Herk; trademark attributed) structure the build into four requirement clusters with a fixed dependency order: **Context** (non-skippable) → **Connections** and **Capabilities** (parallel) → **Cadence** (last). The AOS reuses the AIS-OS Four Cs and its `/audit` instrument, and ties Cadence to Lungile's **90-Day Cadence**.

> **Note on the FND prefix:** FND-11..14 below are the Four-Cs cluster carried under the FND prefix. The FND prefix therefore spans both the scaffold (FND-01..10, Section 6) and the Four-Cs build sequence (FND-11..14, this section); a reader tracing an `FND-` ID should check both sections.

| ID | Cluster | Requirement | Acceptance criterion |
|----|---------|-------------|----------------------|
| **FND-11** | **Context** | The AOS knows the business — identity, voice, priorities, decisions, and the memory graph — before any other C is built. | `/audit` scores Context ≥ 20/25; `context/` populated and the `memory/` graph reachable. |
| **FND-12** | **Connections** | The AOS reaches the user's systems across the seven Tier-1 domains, each with a reference guide and freshness signal. | `/audit` Connections ≥ 18/25; ≥ 4 Tier-1 domains reachable; ≥ 1 write-capable. |
| **FND-13** | **Capabilities** | The AOS knows how to do work — skills and sub-agents (detailed in SKL). | `/audit` Capabilities ≥ 18/25; ≥ 1 user-built skill and ≥ 1 sub-agent present. |
| **FND-14** | **Cadence** | The AOS runs without being asked, on a rhythm anchored to the 90-Day Cadence and the Scale/Fix/Stop review. | `/audit` Cadence ≥ 15/25; a recurring trigger exists and a 90-day review ritual is scheduled. |

The Four-Cs `/audit` score is a **success metric** (Section 14), tracked as a trend, not a one-off.

---

## 8. Skills, Sub-Agents & Capability Layer (SKL)

**Intent:** Build the capability layer as reusable markdown SOPs with progressive disclosure, delegating token-heavy work to sub-agents, and reusing the Digital Twin's three-tier kernel pattern.

The Digital Twin already proves the pattern this layer requires: a **persona kernel under 2,000 tokens** loads first (TWIN-02), the ontology loads on activation, and vault files load on demand per query (TWIN-03). The AOS generalises that three-tier disclosure to every skill.

| ID | Requirement | Acceptance criterion |
|----|-------------|----------------------|
| **SKL-01** | Every skill is a `SKILL.md` with YAML frontmatter (name, description, model) plus an optional `reference/` directory for heavy detail. | Skill loads name and description first; full body second; `reference/` only when needed. |
| **SKL-02** | Implement three-tier progressive disclosure on every skill, mirroring the Digital Twin kernel pattern. | Tier 1 (frontmatter) ≤ ~200 words; Tier 2 (body) the SOP; Tier 3 (`reference/`) loaded only on demand. |
| **SKL-03** | Delegate token-heavy or context-polluting tasks to **sub-agents** in `.claude/agents/` to protect the main agent's context. | At least one sub-agent defined; main-agent context is not flooded by delegated work. |
| **SKL-04** | Provide slash commands as explicit triggers (`/onboard`, `/audit`, `/level-up`, and AOS additions). | Each command is discoverable and idempotent where stated. |
| **SKL-05** | Support hooks for automated behaviours (lint/health-check on save, archive on output). | Hooks configured in settings; firing is logged. |
| **SKL-06** | Skill-building workflow: run a task manually with the agent, then convert it into a `SKILL.md`. | A demonstrated manual task can be promoted to a skill in one operator step. |
| **SKL-07** | Apply SCALE Standardisation — a common skill standard and a central skill registry. | All skills conform to a single frontmatter schema; the Skills console lists them centrally. |
| **SKL-08** | Skills must declare their autonomy ceiling (L0–L4, Section 11) in frontmatter. | Every `SKILL.md` carries an `autonomy-max` field; no skill exceeds it at runtime. |
| **SKL-09** | Capability building prefers the lightest effective construction: L0/L1 prompt template → L2 deterministic skill → L3 AI-assisted skill → L4 sub-agent as last resort. | `/level-up` selects the lowest-cost construction that meets the requirement. |
| **SKL-10** | The Digital Twin skill is registered as the AOS's persona and voice authority for all branded output. | Branded artefacts pass the Twin's five-point voice and framework self-check. |

---

## 9. Knowledge-Graph Memory Subsystem (MEM)

**Intent:** Build the AI-first knowledge-graph memory — the single biggest reusable asset — by lifting the Nexus ontology approach wholesale. The memory layer is the system.

The source material and Lungile's existing work converge here more strongly than anywhere else. The Nexus ontology already implements a flattened many-to-many graph with summary indexes (MOCs), two-step traversal, typed edges, progressive loading, and zero orphans. The AOS reuses `ontology-schema.yaml`, the generator pattern (the graph is **generated** from frontmatter and wikilinks, not hand-maintained), the MOC indexes, and the `nexus-navigation.md` traversal protocol.

**Correction baked in — the authoritative spine count.** The Nexus ontology defines **five spine instances**: `content-ip`, `business-operating`, `platform-product`, `external`, and `profile`. The common "four-spine" description and the human-facing MOCs (Content/IP, CTES Core, Business/Operating, Platform) present a **simplified four-spine view** that omits `external` and mislabels CTES Core as a spine. **CTES Core is not a spine** — it is a node (subtype `ctes_core`) inside the `platform-product` spine, with its seven components attached by `component_of` edges. The simplified view is a navigational convenience that **contradicts the authoritative `ontology-schema.yaml`** and must be flagged as such wherever it appears.

| ID | Requirement | Acceptance criterion |
|----|-------------|----------------------|
| **MEM-01** | Implement the memory as an AI-first read/write markdown wiki — the AI opens, reads, and writes notes, not only humans. | Agents can create and update memory notes; every write is archived. |
| **MEM-02** | Structure the memory as a flattened many-to-many node graph, not a hierarchical folder tree. | A note may reference any number of other nodes regardless of folder; no forced hierarchy. |
| **MEM-03** | Reuse the Nexus ontology schema (`ontology-schema.yaml`) — 10 node types, 15 edge types (9 backbone + 6 vault-derived). | The AOS memory validates against the schema; node and edge types match. |
| **MEM-04** | Define the AOS-operational node types absent from the Nexus graph — **agent**, **tool**, **output** — extending, not replacing, the existing types. | The schema gains agent/tool/output node types with defined properties and edges; existing types unchanged. |
| **MEM-05** | Generate the graph programmatically (the generator pattern) from frontmatter and wikilinks; never hand-maintain it. | A re-runnable generator produces the graph; manual graph edits are prohibited. |
| **MEM-06** | Provide summary indexes (MOC-style) so the agent reads short note-summaries to decide which full docs to inject. | The agent selects full docs from summaries without exceeding context limits across thousands of notes. |
| **MEM-07** | Implement two-step traversal — scan the graph for relevant nodes, then synthesise — per the `nexus-navigation.md` protocol. | A query first identifies nodes by edge traversal, then loads only the 2–3 most relevant files. |
| **MEM-08** | Use typed edges to define relationships; traversal follows edge types, not free text. | Queries traverse named edges (e.g. `uses_framework`, `belongs_to_spine`, `component_of`). |
| **MEM-09** | Implement progressive loading — load node summaries first, full notes second, heavy references last. | Context budget is respected; full notes load only when the summary selects them. |
| **MEM-10** | Auto-archive every AI Output into an `output`-typed node and into `archives/`, feeding the Evidence Index. | No AI output is lost; each is a retrievable node and an archived file. |
| **MEM-11** | Maintain zero orphans and run wiki health-checks (lint) on the graph. | Orphan count = 0 after each generation; broken-link count = 0. |
| **MEM-12** | Convert a described problem into components and store them (problem-to-component ingestion). | An operator describes a problem in English; the agent decomposes it into nodes and stores them. |
| **MEM-13** | Flag the four-spine simplification wherever the human-facing MOCs present it, citing the authoritative five-spine schema. | Every simplified-view surface carries a note that `external` is omitted and CTES Core is a node, not a spine. |

---

## 10. Team / Multi-User Governance & RLS (TEAM)

**Intent:** Share memory without exposing private data; let non-technical members improve rules without code; isolate tenants programmatically. This cluster is mostly net-new; it anchors its semantics in SCALE (Central Provisioning, Lifecycle Management) and the DAL audit trail.

The governance model is the three-tier architecture from the team source: **Tier 1 Human-Maintained** (Notion/Google Drive — the source of truth for global rules, agent identity, brand, and client detail); **Tier 2 Agent-Maintained** (the Claude Code environment — skills, settings, memory, kept here to avoid Notion formatting errors on YAML-heavy skills); **Tier 3 GitHub** (the ultimate backup and version control). Row-Level Security provides the tenancy guarantee: a client-scoped employee is **programmatically refused** another client's data.

| ID | Requirement | Acceptance criterion |
|----|-------------|----------------------|
| **TEAM-01** | Implement the three-tier sync model: Tier 1 Human-Maintained source of truth, Tier 2 Agent-Maintained environment, Tier 3 GitHub backup. | Each tier holds its defined content; YAML-heavy skills live in Tier 2, not Notion. |
| **TEAM-02** | Merge global and local rules: global `CLAUDE.md` (shared, inherited) overlaid by private `CLAUDE.local.md` (git-ignored, in the user's private repo). | Local overrides take precedence; private overrides never leave the user's private repo. |
| **TEAM-03** | Enforce one GitHub repository per client, scoped to people with that client's drive access. | Repo membership is provisioned per client; access mirrors drive permissions. |
| **TEAM-04** | Implement memory Row-Level Security on Postgres/Supabase, filtered by client tag. | A client-scoped query returns only that client's rows; cross-tenant reads return nothing. |
| **TEAM-05** | Build the local memory index only from files the user's token permits — isolation for free. | A user's local index contains no file outside their permitted scope. |
| **TEAM-06** | Automate repo scoping so GitHub membership mirrors drive permissions. | Adding a person to a client's drive folder provisions their repo access; removal revokes it. |
| **TEAM-07** | Allow non-technical rule updates by editing the Tier 1 source (Notion/Drive), with outputs pushed back read-only. | A non-technical member updates a rule without touching code; the change propagates. |
| **TEAM-08** | Apply SCALE Central Provisioning — a single registry from which skills and rules are provisioned to tenants. | Skills and global rules are provisioned centrally, not copied ad hoc per repo. |
| **TEAM-09** | Apply SCALE Lifecycle Management — versioning, deprecation, and updates of provisioned skills and rules. | Each provisioned asset carries a version; deprecation is recorded in the DAL. |
| **TEAM-10** | Record every tenancy and provisioning decision in the DAL with owner and evidence-by date. | RLS configuration changes appear as DAL rows; unvalidated assumptions past date become liabilities. |
| **TEAM-11** | Ensure markdown portability so memory and rules are not locked to any vendor. | Memory and rules export as plain markdown/YAML and re-import without loss. |

---

## 11. Autonomy & Safety Model (AUT)

**Intent:** Author an explicit autonomy ladder against SCALE **Automation Depth**, seat it above a kill switch, and govern stateless remote runs. SCALE names Automation Depth as a dimension but leaves the ladder unspecified; this cluster authors it.

The ladder defaults to the **lowest effective level** and is raised only on evidence. **EAD** (Eliminate > Automate > Delegate; attributed) governs whether a task should exist at all before it is automated. The **Intern Rule** (attributed) treats the AI like a new hire — own identity and credentials, read-only by default, never impersonating a human, full audit trail, minimal scope — and is partially served by the DAL's owner and evidence-by columns plus a HITL gate. The **Kill Switch** dismantles any automation that needs constant patching or costs more than it saves.

**The L0–L4 ladder (authored against SCALE Automation Depth):**

| Level | Name | Behaviour | Default gate |
|-------|------|-----------|--------------|
| **L0** | Manual | Human does the work; the agent observes. | n/a |
| **L1** | Suggested | Agent suggests; human executes. | n/a |
| **L2** | Drafted | Agent drafts; human reviews before anything leaves the system. | HITL review |
| **L3** | Supervised | Agent acts under monitoring; human can interrupt. | Monitoring + kill switch |
| **L4** | Autonomous | Agent acts unattended within a bounded scope. | Kill switch + audit + scope cap |

| ID | Requirement | Acceptance criterion |
|----|-------------|----------------------|
| **AUT-01** | Implement the L0–L4 ladder as the AOS autonomy model, governed by SCALE Automation Depth. | Every agent action runs at a declared level; the level is recorded in the audit trail. |
| **AUT-02** | Default every task to the lowest effective level; raise only on evidence. | New tasks start at L0/L1 unless evidence justifies higher; raises are logged in the DAL. |
| **AUT-03** | Apply EAD before automating — eliminate the task, else automate, else delegate. | `/level-up` records an EAD decision per candidate before construction. |
| **AUT-04** | Enforce the Intern Rule — own identity and credentials, read-only default, no human impersonation, audit trail, minimal scope. | Agents act under their own identity; write scope is granted explicitly; impersonation is blocked. |
| **AUT-05** | Provide HITL gates at L2 and above; nothing leaves the system at L2 without human review. | An L2 action blocks on human approval; the approval is recorded. |
| **AUT-06** | Implement a kill switch that dismantles any automation needing constant patching or costing more than it saves. | The CIO can disable any automation from Settings; disablement is recorded in the Exception Register. |
| **AUT-07** | Safeguard stateless remote runs — pass required context explicitly; never assume local state. | A scheduled remote run carries its full context; a missing-context run fails closed, not open. |
| **AUT-08** | Record every autonomy-level change and kill-switch action in the DAL and Exception Register. | Each change is traceable to an owner, a reason, and a date. |

---

## 12. Evidence & Governance Layer (GOV)

**Intent:** Make evidence the default output of the system. Every run emits, or contributes to, the seven CTES components; every feature is scored by VRI; Value Architecting governs; the A-E Pattern sequences execution so the decision comes after construction.

**The CTES evidence system — seven components** (CTES Core is a node inside the `platform-product` spine, not a spine):

| Component | Role |
|-----------|------|
| **Scorecard** | The board-level measurement instrument that replaces narrative status reporting with quantified value evidence. |
| **90-Day Plan** | The cadence-driven execution rhythm forcing quarterly deliverables with measurable milestones. |
| **DAL** | The ledger recording Decision, Assumption, Owner, and Evidence-By date; every assumption is validated or killed. |
| **Proof Pack** | The curated evidence bundle assembled for the board — exhibits proving delivery, not a deck of activities. |
| **Evidence Index** | The master register of all evidence artefacts, enabling traceability from spend to outcome. |
| **Exception Register** | The honest ledger of deviations, risks, and unresolved items — surfacing what is not working. |
| **Scale/Fix/Stop Rhythm** | The triage decision: scale (invest more), fix (remediate), or stop (kill) per initiative. |

**Value Architecting** is the governing discipline: three pillars — **Value** (measurable via VRI), **Cost** (transparent via TBM/FinOps principles; TBM attributed to Gartner), and **Governance** (forensic via DAL and the 90-Day Cadence). The CIO is the Value Architect — the designer of the evidence-producing system, not merely a value creator.

**VRI scoring** is applied to every feature and initiative across its five weighted dimensions: Strategic Alignment, Value Tree Strength, Assumption Discipline, Evidence Quality, and Risk-Adjusted Outcomes — aggregated into a single board-trackable index.

**The A-E Pattern** sequences the work so the decision lands after construction: **A**im (scorecard one board-level outcome) → **B**uild (the 90-day plan) → **C**onstruct (the evidence and the ledger) → **D**ecide (close bets with cadence, on evidence) → **E**mbed (make it the way the enterprise runs).

| ID | Requirement | Acceptance criterion |
|----|-------------|----------------------|
| **GOV-01** | Every agent run emits, or contributes to, at least one of the seven CTES components. | No run completes without writing a CTES artefact; runs that produce none are flagged as theatre. |
| **GOV-02** | Maintain a Scorecard as the board-level measurement instrument for the AOS portfolio. | A current Scorecard exists with quantified value entries, not narrative. |
| **GOV-03** | Drive execution on a 90-Day Plan with measurable milestones. | A live 90-day plan exists; milestones are dated and measurable. |
| **GOV-04** | Maintain the DAL as the live assumption ledger; the `decisions/log.md` feeds it. | Every decision has a DAL row; assumptions carry an owner and evidence-by date. |
| **GOV-05** | Assemble a Proof Pack on demand from the Evidence Index for board presentation. | A Proof Pack can be generated from current evidence without manual reconstruction. |
| **GOV-06** | Maintain the Evidence Index as the master register of all artefacts, traceable from spend to outcome. | Every artefact is indexed; the chain spend → decision → action → outcome is walkable in the Inspector. |
| **GOV-07** | Maintain an Exception Register of deviations, risks, and unresolved items. | Open exceptions are visible; nothing material is hidden from the register. |
| **GOV-08** | Run the Scale/Fix/Stop rhythm on every initiative. | Each initiative is triaged scale/fix/stop on a defined cadence; the decision is recorded. |
| **GOV-09** | Score every feature and initiative with the VRI before promotion. | No feature is promoted without a VRI score across all five dimensions. |
| **GOV-10** | Govern the programme by Value Architecting — Value, Cost, Governance pillars instrumented. | Cost is transparent (TBM/FinOps); value is measured (VRI); governance is forensic (DAL + cadence). |
| **GOV-11** | Sequence delivery by the A-E Pattern — decide after construction, not before. | Decisions are recorded at the D step, citing evidence constructed at the C step. |

---

## 13. Phased Roadmap mapped to GSD

Each phase is expressed in **GSD form** — an `NN-slug` directory under `.planning/` carrying the standard artefacts: CONTEXT, RESEARCH, PLAN, SUMMARY, VALIDATION, VERIFICATION. This mirrors the v1.0 milestone discipline, where 38 requirements were traced across phases with full verification gates.

| Phase | Directory | Cluster | Scope | Verification gate |
|-------|-----------|---------|-------|-------------------|
| **P1** | `01-scaffold` | FND | Clone and extend AIS-OS; re-author `CLAUDE.md`; adapt `/onboard`, `/audit`, `/level-up`; Four-Cs baseline. | `/audit` returns a baseline score; scaffold contract intact. |
| **P2** | `02-memory-graph` | MEM | Stand up the knowledge-graph memory; reuse the Nexus ontology and generator; add agent/tool/output node types; zero orphans. | Graph generates from frontmatter; orphan count = 0; two-step traversal demonstrated. |
| **P3** | `03-skills-subagents` | SKL | Build the capability layer; three-tier disclosure; sub-agents; hooks; central provisioning. | ≥ 1 user-built skill and ≥ 1 sub-agent; `/audit` Capabilities ≥ 18/25. |
| **P4** | `04-evidence-layer` | GOV | Instrument every run to emit CTES outputs; VRI scoring; Inspector traceability. | A sample run emits a CTES artefact; the spend-to-outcome chain is walkable. |
| **P5** | `05-autonomy-safety` | AUT | Author the L0–L4 ladder; EAD; Intern Rule; HITL gates; kill switch; stateless-run safeguards. | A kill switch disables an automation; an L2 action blocks on HITL approval. |
| **P6** | `06-team-rls` | TEAM | Three-tier sync; one-repo-per-client; RLS by client tag; automated repo scoping. | A cross-tenant query returns nothing; repo access mirrors drive permissions. |
| **P7** | `07-portability-sync` | OPS | Portability and live three-tier sync (Notion ↔ Claude Code ↔ GitHub); export/import without loss. | Memory and rules round-trip as markdown/YAML with no data loss. |

| ID | Requirement | Acceptance criterion |
|----|-------------|----------------------|
| **OPS-01** | Implement bidirectional three-tier sync (Tier 1 Notion/Drive ↔ Tier 2 Claude Code ↔ Tier 3 GitHub), phased to P7. | A change in one tier propagates to the others per the defined direction rules. |
| **OPS-02** | Guarantee markdown/YAML portability — no vendor lock-in for memory or rules. | Full export and re-import with zero loss; no proprietary format required to read the memory. |
| **OPS-03** | Support remote scheduled routines that run statelessly with explicit context. | A scheduled run executes in the cloud carrying its full context; missing context fails closed. |
| **OPS-04** | Implement permission-based repo promotion (Personal → Department → Company), reviewed by an AI Architect before promotion. | No pattern is promoted without an AI Architect review and a passing verification gate. |

---

## 14. Success Metrics

| Metric | Definition | Target direction |
|--------|------------|------------------|
| **VRI per initiative** | The aggregate Value Realisation Index across the five weighted dimensions, per initiative. | Rising; no promotion below an agreed threshold. |
| **% agent runs with complete evidence** | Share of runs that emit, or contribute to, a CTES component. | Towards 100%; runs with no evidence are theatre and are driven down. |
| **Four-Cs `/audit` trend** | The weekly Four-Cs score out of 100, tracked over time across the four stages (Foundation 0–39, Built 40–69, Compounding 70–89, Autonomous 90–100). | Climbing week on week. |
| **Autonomy distribution** | The spread of agent actions across L0–L4. | Deliberate, evidence-led shift upward — never a leap to L4 without proof. |
| **Orphan / context-rot metrics** | Orphan-node count and broken-link count on the memory graph; staleness of notes. | Orphans = 0; broken links = 0; staleness flagged and cleared. |
| **RLS isolation test pass rate** | Share of cross-tenant access tests that correctly return nothing. | 100% — a single failure is a cross-tenant leak and a board-level exception. |

---

## 15. Risks

Each risk maps to a **DAL row** (Decision, Assumption, Owner, Evidence-By) and an **Exception Register** entry. The DAL holds the assumption that the mitigation works until evidence is produced; the Exception Register holds the risk as an open item until it is closed.

| Risk | Description | Mitigation | DAL assumption (Owner, Evidence-By) | Exception Register entry |
|------|-------------|------------|-------------------------------------|--------------------------|
| **Context rot** | The memory graph degrades — stale notes, orphans, drifting summaries. | MEM-11 health-checks; orphan = 0 invariant; staleness flags. | "Health-checks keep the graph clean." (AI Architect; quarterly) | EXC: open until two consecutive clean health-checks. |
| **Dark code** | Automations no one understands or maintains accumulate. | Kill switch (AUT-06); Scale/Fix/Stop (GOV-08); EAD before building. | "Unmaintained automations are dismantled, not patched." (CIO; per 90-day review) | EXC: each flagged automation logged until scaled, fixed, or stopped. |
| **Token waste** | Loading heavy context needlessly inflates cost. | Progressive loading (MEM-09); three-tier disclosure (SKL-02); summary indexes (MEM-06). | "Progressive loading holds cost within budget." (Operator; monthly) | EXC: open until cost-per-run is within the agreed band. |
| **Stateless remote runs** | A scheduled run assumes local state that is not there. | Explicit context passing; fail-closed (AUT-07, OPS-03). | "Remote runs fail closed on missing context." (AI Architect; on first remote run) | EXC: open until a missing-context run is shown to fail safely. |
| **RLS misconfiguration / cross-tenant leakage** | A client sees another client's data. | RLS by client tag (TEAM-04); isolation tests (Section 14); local index from permitted files only (TEAM-05). | "RLS refuses cross-tenant reads." (CIO; before any client is onboarded) | EXC: board-level — open until isolation test pass rate = 100%. |
| **Framework hallucination** | The AOS invents a framework not on the whitelist. | Digital Twin hallucination guard; the eight-framework whitelist; load the vault file before applying. | "Only the eight whitelisted frameworks are referenced as Lungile's." (Digital Twin owner; continuous) | EXC: each hallucination instance logged and corrected. |
| **Persona / voice drift** | Branded output reverts to generic consulting prose or American English. | Digital Twin five-point self-check; banned-word list; British English invariant. | "Branded output passes the voice self-check." (Digital Twin owner; per artefact) | EXC: each drift instance logged and rewritten. |

---

## 16. Appendices

### Appendix A — Framework Crosswalk

Mapping each source concept to its closest Lungile asset and the resulting gap. **Only the eight whitelisted frameworks are Lungile's**; the left column lists third-party concepts attributed to their sources.

| Source concept (attributed) | Closest Lungile asset | Gap / disposition |
|------------------------------|------------------------|-------------------|
| Three Ms (Nate Herk) | A-E Pattern (Aim → Build → Construct → Decide → Embed) | Partial overlap — keep the Three Ms as operator brain; the A-E Pattern governs execution. |
| Four Cs (Nate Herk) | Value Architecting + 90-Day Cadence | Adopt the Four Cs as-is for build sequencing. |
| Entity ontology (8 operational types) | Nexus ontology (10 node / 15 edge types) | GAP — agent/tool/output node types are not in the Nexus graph and must be defined (MEM-04). |
| Autonomy L0–L4 | SCALE Automation Depth | GAP — the explicit L0–L4 ladder must be authored (AUT-01). |
| Intern Rule | DAL (owner + evidence-by) + HITL | Partial — DAL and HITL cover audit and accountability; identity/scope rules authored in AUT-04. |
| EAD (Eliminate > Automate > Delegate) | No precise equivalent | GAP — adopt EAD as-is (AUT-03). |
| Bike Method (4 phases) | A-E Pattern + GSD phase method | Partial — phased rollout covered by GSD verification gates and A-E sequencing. |
| Three-tier team sync | Dual-purpose vault (adjacent) | GAP — net-new (TEAM-01). |
| RLS / multi-tenancy | SCALE Central Provisioning + DAL audit | GAP — the largest enterprise addition (TEAM-04). |
| Repo promotion (Personal → Dept → Company; AI Architects) | A-E "Embed" + Scale/Fix/Stop + GSD verify gates | Partial — promotion gated by AI Architect review (OPS-04). |
| Auto-archive all Output | CTES Evidence Index + Proof Pack | Strong fit — auto-archive feeds the Evidence Index (MEM-10, GOV-06). |
| Kill Switch / HITL | DAL + Exception Register | Partial — kill switch and HITL authored in AUT-05/06. |
| Two-step traversal + summary indexes + progressive loading | `nexus-navigation.md` traversal + MOC indexes + 3-tier kernel disclosure | Strong fit — Lungile's instance is more mature; lift it (MEM-06/07/09). |

### Appendix B — AIS-OS Extension Plan

| AIS-OS element | Disposition | Notes |
|----------------|-------------|-------|
| `CLAUDE.md` | **Adapt** | Re-author as Lungile's Value Architect master prompt; British English; banned-word list. |
| `references/3ms-framework.md` | **Keep as-is** | Operator brain; trademark attributed to Nate Herk. |
| `context/` (about-me, about-business, priorities) | **Keep** | Populated by adapted `/onboard`. |
| `connections.md` (7 domains) | **Keep** | Maintained across the seven Tier-1 domains. |
| `aios-intake.md` (7-question intake) | **Adapt** | Hard cap of seven questions retained; questions tuned to the enterprise context. |
| `decisions/log.md` | **Keep** | Append-only; wired as the upstream feed to the DAL. |
| `archives/` | **Keep** | Auto-archive destination for all AI Output; feeds the Evidence Index. |
| `EXPANSIONS.md` | **Keep** | Extended with the MEM/SKL/GOV/TEAM/AUT/OPS expansion paths. |
| `/onboard`, `/audit`, `/level-up` | **Adapt** | `/audit` recognises the memory layer; `/level-up` ties candidates to VRI and CTES. |
| MIT `LICENSE` | **Keep** | Retained and attributed. |
| `memory/` knowledge graph | **Net-new (at this layer)** | Lifted from the Nexus ontology approach; extended with agent/tool/output types. |
| `.claude/agents/` sub-agents | **Net-new** | Token-heavy delegation. |
| `CLAUDE.local.md` | **Net-new** | Git-ignored private overrides. |
| Three-tier sync, RLS, repo scoping | **Net-new** | TEAM/OPS clusters; the largest enterprise additions. |
| L0–L4 ladder, kill switch, HITL gates | **Net-new** | AUT cluster, authored against SCALE Automation Depth. |
| CTES instrumentation, VRI scoring, Inspector | **Net-new (wiring) / reuse (definitions)** | GOV cluster; CTES and VRI definitions reused from Lungile's IP. |
| `.planning/` GSD phases | **Net-new** | Mirrors v1.0 phase discipline. |

### Appendix C — Ontology Schema Reference

Authoritative source: `vault/ontology-schema.yaml`. Statistics: **114 nodes, 524 edges, 0 orphans.**

**Five spine instances** (authoritative): `content-ip`, `business-operating`, `platform-product`, `external`, `profile`.
*Navigational simplification flagged:* the human-facing MOCs present a four-spine view (Content/IP, CTES Core, Business/Operating, Platform) that omits `external` and treats CTES Core as a spine. CTES Core is a node (`ctes_core`) inside `platform-product`.

**10 node types:** framework, article, competitor, profile_layer, database_entry, concept, spine, domain, moc, nexus_node.
**AOS extension (MEM-04):** add `agent`, `tool`, `output` operational node types.

**15 edge types:**
- **9 backbone:** distills_into, informs, defines_method, publishes_as, refines, improves, monetises_through, feeds_and_proves, component_of.
- **6 vault-derived:** uses_framework, belongs_to_spine, maps_to_domain, references, related_to, has_moc.

**CTES Core components (7, by `component_of` edge to `ctes-core`):** Scorecard, 90-Day Plan, DAL, Proof Pack, Evidence Index, Exception Register, Scale/Fix/Stop Rhythm.

**Backbone:** 22 nodes, 30 edges (manually encoded from the Nexus diagram). The full graph (114 nodes / 524 edges) adds the auto-generated vault-derived layer.

### Appendix D — Glossary (British English)

| Term | Definition |
|------|------------|
| **AOS** | Agentic Operating System — the governed intelligent layer between the user and the enterprise's systems. |
| **AIS-OS** | The cloned MIT Claude Code starter scaffold (Nate Herk) on which this AOS is built. |
| **Theatre** | Governance rituals that create the appearance of control without producing evidence of outcomes. Always the negative pole. |
| **Evidence** | Board-defensible artefacts that survive cross-examination. Always the positive pole. |
| **Mginqi Doctrine** | The gap between activity and value is the central disease of enterprise IT; the CIO's duty is to replace theatre with evidence. |
| **CTES** | The evidence system — seven components: Scorecard, 90-Day Plan, DAL, Proof Pack, Evidence Index, Exception Register, Scale/Fix/Stop. A node inside the `platform-product` spine, not a spine. |
| **VRI** | Value Realisation Index — a board-level score across five weighted dimensions, aggregated into a single trackable index. |
| **DAL** | Decision and Assumption Ledger — columns Decision, Assumption, Owner, Evidence-By date. |
| **Value Architecting** | The discipline of governing IT value through evidence, not enthusiasm — three pillars: Value, Cost, Governance. |
| **A-E Pattern** | Aim → Build → Construct → Decide → Embed — decide after construction, not before. |
| **AIEA** | AI-Integrated Enterprise Architecture — a five-layer CIO blueprint for AI adoption. |
| **AaaS** | Agents-as-a-Service — the shift from app-first to agent-first architecture, governed at each stage. |
| **SCALE** | Standardisation, Central Provisioning, Automation Depth, Lifecycle Management, Evidence Production — governs Agent Skills. |
| **Strategic Hedging** | A dual-track approach — maintain legacy while building AI-native — neither cannibalising the other without board evidence. |
| **Nexus Architecture of Work** | Lungile's intellectual operating system; the knowledge graph organising insight from raw intelligence to market-ready output. |
| **Spine** | A first-class structural value chain in the Nexus ontology. There are five: content-ip, business-operating, platform-product, external, profile. |
| **MOC** | Map of Content — a summary index note used for navigation and progressive loading. |
| **GSD** | The phased planning method (CONTEXT → RESEARCH → PLAN → SUMMARY → VALIDATION → VERIFICATION) used to express the roadmap. |
| **Four Cs** | Context → Connections + Capabilities → Cadence — the AIOS build sequence (Nate Herk; attributed). |
| **Three Ms** | Mindset, Method, Machine — the operator's way of thinking about AI work (Nate Herk; attributed). |
| **EAD** | Eliminate > Automate > Delegate — the order in which work is considered before it is automated (attributed). |
| **Intern Rule** | Treat the AI like a new hire — own identity and credentials, read-only by default, no impersonation, audit trail, minimal scope (attributed). |
| **Kill Switch** | The mechanism that dismantles any automation needing constant patching or costing more than it saves. |
| **RLS** | Row-Level Security — database isolation filtering by client tag so a tenant is programmatically refused another tenant's data. |
| **HITL** | Human-in-the-loop — a review gate at autonomy level L2 and above. |
| **Digital Twin** | The persona-faithful co-pilot that reasons, advises, and produces artefacts in Lungile's voice and frameworks. |

---

*End of document. Version 0.1 — DRAFT. Prepared by the Lungile Mginqi Digital Twin for NOVATEK LLC. British English throughout. Evidence over theatre.*

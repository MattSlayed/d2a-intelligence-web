---
title: "Agentic OS — Design Notes"
author: "NOVATEK LLC"
date: 2026-06-06
status: "Design notes — synthesis of 3 source videos; not a specification"
provenance:
  source: "NotebookLM notebook — 'The Infinite Brain'"
  videos:
    - "Video 1 — Build & Sell Claude Code Operating Systems (2+ Hour Course)"
    - "Video 2 — I Made Claude Code FOR TEAMS"
    - "Video 3 — I Turned Karpathy's Second Brain Into an AI Operating System ('The Infinite Brain')"
  supporting_repo: "AIS-OS (Nate Herk's lean MIT Claude Code AIOS starter kit)"
language: "British English"
---

# Agentic OS — Design Notes

> **Framing:** HYBRID. Part 1 is a neutral, source-faithful synthesis of the three videos. Part 2 is an appendix that maps the neutral pattern onto Lungile Mginqi's existing frameworks and Nexus Architecture. Read Part 1 to understand the reusable design principles; read Part 2 to understand how those principles are already partly built — and where the genuine gaps are.

---

## PART 0 — Purpose & Reading Guide

### What this is

This document distils **reusable Agentic OS (AOS) design principles** from three source videos and one reference starter kit. It is a set of design notes — patterns, primitives, operating frameworks, and pitfalls — captured at the level of "how to think about building an agentic operating system", not "what we will build for a specific client".

The intended use is twofold:

1. As a **neutral reference** (Part 1) that any AOS build can draw on, regardless of client or brand.
2. As a **mapping aid** (Part 2) showing how the neutral pattern relates to Lungile Mginqi's intellectual architecture — his eight named frameworks, the five-spine Nexus, and the CTES Core evidence system.

### What this is **not**

- This is **not the PRD.** It does not contain requirement IDs, acceptance criteria, scope boundaries, or a build plan. It is upstream of the PRD — the design thinking that a PRD would formalise.
- It is **not a specification.** Nothing here is binding. Where the videos disagree or leave gaps, this document records that honestly rather than resolving it by fiat.
- It does **not invent frameworks.** Part 2 references only Lungile's eight whitelisted frameworks (AIEA, AaaS, SCALE, VRI, A-E Pattern, DAL, Value Architecting, Strategic Hedging). Where the neutral pattern has no Lungile equivalent, the document says so plainly rather than fabricating one.

### How Part 1 and Part 2 relate

- **Part 1 (neutral synthesis)** is brand-neutral and source-faithful. It reports what the three videos say, consolidates them into one reference architecture, and flags the cross-cutting pitfalls. A reader with no knowledge of Lungile could use Part 1 on its own.
- **Part 2 (Lungile mapping)** is the appendix. It takes each neutral concept and asks: *does Lungile already have an asset for this?* The crosswalk table is the heart of Part 2. It produces a short list of **genuine gaps** — the net-new work that the neutral pattern demands but Lungile's current architecture does not yet cover.

The two parts are deliberately separable. If the neutral pattern is later applied to a different engagement, Part 1 travels unchanged and a new Part 2 is written for that context.

### Pointer to the PRD

The formal product requirements live (or will live) at:

```
C:\Users\user-pc\OneDrive\Documents\NOVATEK LLC\02 CLIENTS\Client Profiling\Lungile\Agentic-OS\docs\PRD-Agentic-Operating-System.md
```

> **Provenance note:** at the time of writing (2026-06-06) the PRD file above was **not yet present** on disk, nor was its parent `Agentic-OS\docs\` directory. This pointer is therefore forward-looking — these design notes are intended to feed the PRD when it is authored, not to summarise an existing one. The requirement-ID scheme that the PRD should adopt is set out in Part 2.4.

---

# PART 1 — NEUTRAL SYNTHESIS OF THE THREE VIDEOS

*Source-faithful and brand-neutral. This part reports the three videos and the AIS-OS reference kit. It does not adopt any client's voice or framework set.*

## 1.1 Core thesis: the Agentic OS — "the brain eats the OS"

An **Agentic OS (AOS)**, also called an AIOS, is the intelligent layer that sits between the user and the computer. Its purpose is to eliminate *work about work* — the searching for files, the application-switching, the lost context — so that a user can spend the whole working day inside a single interface (in the source material, Claude Code) while being far more productive than they would be across a sprawl of disconnected apps.

Across the three videos this thesis hardens into a single principle, stated most sharply in Video 3: **"the brain eats the OS"**. The power of an AOS is not the model and not the chat window — it is the *customised operating-system layer that structures how the model receives information*. The memory layer **is** the system. Qualitative knowledge lives in the brain (markdown); quantitative data lives in SQL. Because the structure is plain markdown, the whole arrangement is model-agnostic: swap the model, keep the brain.

The corollary that runs through all three videos: durable value sits in the **structure and the memory**, not in any one tool. Tools are interchangeable; the organised brain is the asset.

## 1.2 Primitives of a Claude-Code AOS (Video 1)

Video 1 ("Build & Sell Claude Code Operating Systems") sets out the building blocks. The AIS-OS starter kit (Nate Herk's lean MIT-licensed kit) is the concrete reference implementation of these primitives.

| Primitive | Role |
|-----------|------|
| **`CLAUDE.md` (master prompt)** | Defines the AI's role as a *thought partner*; lists available skills and states *where data lives*. The constitutional document of the AOS. |
| **Skills** | Reusable markdown SOPs stored in `.claude/skills/`. Each skill is a self-contained procedure the agent can run on demand. |
| **Sub-agents** | Specialised agents spun up for token-heavy tasks, to protect the **main agent's context window** from pollution. Used as a last resort, not a default. |
| **Slash commands** | Explicit triggers (e.g. `/audit`, `/loop`, `/onboard`, `/level-up`) that invoke a skill deterministically. |
| **MCP vs direct API + local reference** | Model Context Protocol connectors are available, but the videos often **prefer a direct API call plus a local markdown reference file** of endpoints, for token efficiency — loading a full MCP schema can be wasteful. |
| **Hooks + YAML frontmatter** | Each skill file carries frontmatter defining its `name`, `description`, and `model`. This drives discovery and progressive loading. |
| **Memory as an "LLM wiki"** | A linked web of markdown files — the second brain — that the agent reads and writes. |

**Canonical folder layout** (from the AIS-OS kit):

```
.claude/skills/        # reusable SOPs (onboard, audit, level-up, ...)
context/               # about-me.md, about-business.md, priorities.md
references/            # 3ms-framework.md, connection endpoint files
decisions/             # log.md — the decision record
archives/              # backed-up overwrites, dated intake folders
CLAUDE.md              # master prompt
EXPANSIONS.md
aios-intake.md         # 7-question intake
connections.md         # 7-domain connection registry
```

**Reference skills shipped in AIS-OS:**

- **`/onboard`** — an idempotent ~15-minute Day-1 wizard, hard-capped at **7 questions**, that takes raw pasted voice samples and batch-scaffolds six context files, backing up any overwrites to `archives/intake-{date}/`.
- **`/audit`** — a weekly **read-only** Four-Cs 100-point gap analysis (Context 25 / Connections 25 / Capabilities 25 / Cadence 25), staging the AOS as Foundation (0–39), Built (40–69), Compounding (70–89), or Autonomous (90–100).
- **`/level-up`** — a weekly automation-discovery routine running the **Three Ms** sequence (find a candidate → scope it → build it), shipping exactly **one artefact per run** with `bike-method-phase: 1` frontmatter.

## 1.3 Operating frameworks (Video 1)

Video 1 supplies a set of operating heuristics. Reported here as-is; they are third-party constructs (the **Three Ms** and **Four Cs** are trademarked © 2026 Nate Herk).

- **Three Ms** — *Mindset* (AI-first thinking) → *Method* (decide what to automate) → *Machine* (the actual build).
- **Four Cs** — *Context* / *Connections* / *Capabilities* / *Cadence*. Dependency order: **Context is non-skippable and comes first**; Connections and Capabilities run in parallel; **Cadence is last**.
- **Autonomy L0–L4** — a five-rung ladder: **L0 manual → L1 suggested → L2 drafted → L3 supervised → L4 autonomous**. Default to the *lowest effective* rung.
- **EAD** — *Eliminate > Automate > Delegate*. Before automating, ask whether the task can be eliminated entirely.
- **60/30/10 rule** — a rough split of effort/attention across the AOS portfolio.
- **Bike Method** — a four-phase rollout: (1) manual observation → (2) drafts reviewed → (3) autonomous with monitoring → (4) fully autonomous. **Start at ~10% of volume** and ramp.
- **Intern Rule** — treat the AI like a new hire: its own identity/credentials, **read-only by default**, never impersonate a human, full audit trail, minimal scope.
- **Kill Switch** — dismantle any automation that needs constant patching or costs more than it saves.
- **Default Shift** — refuse boring manual tasks by default; push the AI to handle 30–70% of a job ("mentor, not vending machine").
- **Function Breakdown** — a job is a tree of tasks; automate one chunk at a time rather than the whole tree at once.
- **Productivity Dip** — expect roughly a **20% drop** in output while building the AOS, followed by a **50%+ gain** once it compounds.

**Additional Video 1 patterns:** a 7-question onboarding interview that scaffolds context; the seven **Tier-1 buckets** of work (Revenue, Customer, Calendar, Comms, Tasks, Meetings, Knowledge); skill-building by running a task manually with the agent then asking it to *"turn this into a skill"*; and visual validation, where the agent screenshots its own artefacts and self-corrects.

## 1.4 From solo to team (Video 2)

Video 2 ("I Made Claude Code FOR TEAMS") extends the solo AOS into a multi-person, multi-client system. The thesis: a team AOS must **share memory without exposing private data**, let **non-technical members improve the AI's rules without writing code**, prevent context rot, and avoid vendor lock-in via portable markdown.

**Three-tier architecture:**

| Tier | Owner | Holds |
|------|-------|-------|
| **Tier 1 — Human-Maintained** | People, in Notion / Google Drive | The **source of truth**: global rules (`CLAUDE.md`), agent identity (`soul.md`), brand, client implementation details. |
| **Tier 2 — Agent-Maintained** | The Claude Code environment | Skills, settings, memory. **YAML-heavy skill files live here** to avoid Notion formatting errors. |
| **Tier 3 — GitHub** | Version control | The ultimate backup and version history of *everything*. |

**Rule layering:** members inherit **Global Shared Rules** from the company's Notion, then overlay personalised rules. Private overrides go in **`CLAUDE.local.md`** — git-ignored, kept in the user's private repo. The merge order is **Global `CLAUDE.md` < Local `CLAUDE.local.md`** (local wins).

**Non-technical collaboration:** rule updates are made by editing Notion / Drive; outputs are *pushed back into Notion read-only*; shared client context is controlled at the client level.

**The 4-level governance model:**

1. **Shared-drive permissions** — who can see which folders.
2. **Token-based syncing** — a local machine only holds the files its token permits; the local memory index is built only from syncable files (isolation comes for free).
3. **One GitHub repo per client** — scoped to the people who have that client's Notion access; GitHub membership mirrors drive permissions.
4. **Memory Row-Level Security (RLS)** — a Supabase/Postgres layer filters memory by **client tag**, so an Acme-only employee is *programmatically refused* another client's data.

**Portability** is treated as a first-class requirement throughout — markdown travels, so no single vendor can hold the system hostage.

> *Source note:* the Intern Rule, Kill Switch, remote routines, and audit-trail detail are **from Video 1**, not Video 2. Video 2 focuses on team sync, governance tiers, and RLS.

## 1.5 The AI-first second brain (Video 3)

Video 3 ("I Turned Karpathy's Second Brain Into an AI Operating System" — *The Infinite Brain*) is the memory-subsystem video. Its thesis: an **AI-first** second brain, where the AI opens, reads, and writes the brain — not just the human.

**Knowledge architecture — a flattened many-to-many graph (not hierarchical folders):**

A single note participates in many relationships at once. A *Klaviyo draft* note references a *Memorial Day* project, an *Email* tool, the *Marketing* department, and *Company Voice* — simultaneously. There is no folder tree to fight; there is a graph.

**Entity ontology (8 operational types):**

| Type | What it captures |
|------|------------------|
| **Agents** | The actors |
| **Skills** | Reusable procedures |
| **Workflows** | Multi-step sequences |
| **Rules** | Constraints and policy |
| **Tools** | Connectors and capabilities |
| **Knowledge** | Reference material |
| **Projects** | Units of work |
| **Output** | Everything the AI produces (auto-archived) |

**Ingestion** — *problem-to-component conversion*: the human describes a problem in plain English; the agent breaks it into components and stores them. Everything the AI creates is **auto-archived into the `Output` type**. The human gives context; the AI indexes and tracks.

**Retrieval** — three reinforcing mechanisms:

- **Summary indexes** — the agent reads short note-*summaries* first to decide which full documents to inject, so it never blows the prompt limit across thousands of notes.
- **Two-step traversal** — scan the graph for relevant nodes, *then* synthesise.
- **Edge types** — typed relationships define how nodes connect, so traversal is meaningful rather than keyword soup.
- **Progressive loading** — load the cheap layer (names/summaries) before the expensive layer (full documents).

**Scaling** — multi-tier repos: **Personal → Department → Company OS**. Successful patterns are *promoted* upward. **"AI Architects"** review individual repos before a pattern is promoted to a shared tier.

## 1.6 Cross-cutting pitfalls & safety

Five recurring failure modes appear across the videos:

- **Context rot** — the working context degrades as stale, irrelevant, or contradictory material accumulates. Counter with progressive loading, summary indexes, and sub-agents that quarantine token-heavy work.
- **Dark code** — automations nobody understands or maintains, running silently. Counter with the decision log and the Kill Switch.
- **Token waste** — loading full schemas or full documents when a summary would do. Counter with the MCP-vs-direct-API choice and progressive disclosure.
- **Stateless remote runs** — scheduled cloud routines that execute without the local brain's context, producing inconsistent or unsafe output. Counter by giving remote routines an explicit, minimal context bundle.

**Safety posture:** the **Kill Switch** and a **human-in-the-loop (HITL)** stance are the two non-negotiables. The Intern Rule (read-only default, own identity, audit trail, minimal scope) operationalises HITL; the Kill Switch operationalises the willingness to stop.

## 1.7 Consolidated neutral reference architecture

The three videos describe one system from three angles. Consolidated as a prose diagram — four concentric concerns, read from the centre outwards:

```
                ┌──────────────────────────────────────────────┐
                │            AUTONOMY CONTROL AXIS               │
                │   L0 manual → L1 → L2 → L3 → L4 autonomous     │
                │   (cuts through every layer; default lowest)   │
                └──────────────────────────────────────────────┘
                                    ▲
        ┌───────────────────────────┴───────────────────────────┐
        │              SYNC + GOVERNANCE RING                     │
        │   3-tier (Human / Agent / GitHub) · RLS by client tag  │
        │   permission-scoped repos · portable markdown          │
        └───────────────────────────┬───────────────────────────┘
                                    ▲
        ┌───────────────────────────┴───────────────────────────┐
        │                  CAPABILITY LAYER                       │
        │     Skills  ·  Sub-agents  ·  Slash commands            │
        │     (the things the AOS can DO, on demand)              │
        └───────────────────────────┬───────────────────────────┘
                                    ▲
        ┌───────────────────────────┴───────────────────────────┐
        │             MEMORY / KNOWLEDGE CORE                     │
        │   Flattened many-to-many markdown graph (the "brain")   │
        │   Entity ontology · summary indexes · edge types        │
        │   Qualitative in markdown · quantitative in SQL         │
        └────────────────────────────────────────────────────────┘
```

**Reading the diagram:**

1. **Memory / knowledge core** (centre) — the brain that eats the OS. Everything else exists to serve, protect, or act on this layer.
2. **Capability layer** — skills, sub-agents, and slash commands act on the core. They read context and write Output back into it.
3. **Sync + governance ring** — wraps the inner two layers so that a *team* can share the core without leaking it. Three tiers, RLS, scoped repos, portability.
4. **Autonomy control axis** — not a layer but a dial that runs through all three. Every capability is operated at an explicit L0–L4 setting, defaulting to the lowest effective rung, with the Kill Switch always reachable.

## 1.8 Tooling landscape (neutral list)

Tools named across the three videos and the AIS-OS kit. Listed for reference; all are interchangeable under the markdown-portability principle.

| Category | Tools cited |
|----------|-------------|
| Agent runtime / IDE | Claude Code (in VS Code), Codex |
| Knowledge / graph view | Obsidian, the markdown "LLM wiki" |
| Productivity & comms | ClickUp, Google Workspace CLI |
| Version control & remote | GitHub (sync + remote routines) |
| Deterministic scheduling | Trigger.dev, Modal (24/7 deterministic scripts) |
| Automation / self-host | n8n (self-hostable) |
| Voice & personas | Glido (voice), Paperclip (agent personas) |
| Data store | Supabase / Postgres (RLS, quantitative data) |
| Reference kit | AIS-OS (Nate Herk, MIT licence) |

---

# PART 2 — APPENDIX: MAPPING TO LUNGILE MGINQI'S FRAMEWORKS

*This appendix maps the neutral pattern of Part 1 onto Lungile Mginqi's existing intellectual architecture. It references only his eight whitelisted frameworks and his documented Nexus assets. Where the neutral pattern has no equivalent, that is named as a genuine gap — not papered over with an invented framework.*

## 2.1 Why the mapping

Lungile already runs a working AOS in miniature. He has a **Digital Twin** — a persona-faithful skill that reasons, advises, and produces artefacts in his voice — and a **Nexus Architecture of Work** with a 114-node, 524-edge ontology, zero orphans. Much of what Part 1 describes as aspirational, he has already built or specified.

The mapping exists to answer one question precisely: *which parts of the neutral AOS pattern are already covered by Lungile's assets, and which are genuinely new?* Answering it well prevents two failures — rebuilding what exists (waste) and assuming coverage that is not there (risk).

Primary cited sources for this appendix:

- Persona kernel — `C:\Users\user-pc\OneDrive\Documents\NOVATEK LLC\02 CLIENTS\Client Profiling\Lungile\.claude\skills\lungile-digital-twin\SKILL.md`
- Nexus navigation — `...\.claude\skills\lungile-digital-twin\reference\nexus-navigation.md`
- Authoritative ontology — `...\vault\ontology-schema.yaml`
- The eight frameworks — `...\vault\framework-portfolio\*.md`
- Requirement-ID scheme to mirror — `...\.planning\milestones\v1.0-REQUIREMENTS.md`
- Feedback-loop narrative — `...\Nexus System\Nexus Graph Explanation.txt`

## 2.2 Lungile asset inventory

A concise inventory of the assets the mapping draws on. Every row is grounded in a cited file.

| Asset | What it is | Cited path / source |
|-------|------------|---------------------|
| **8 named frameworks** | AIEA, AaaS, SCALE, VRI, A-E Pattern, DAL, Value Architecting, Strategic Hedging — the *only* frameworks Lungile has authored (hard whitelist; inventing others is forbidden) | `SKILL.md` (Framework Whitelist); `vault/framework-portfolio/*.md` |
| **Persona kernel** | The Digital Twin: Mginqi Doctrine (theatre vs evidence), value hierarchy, metaphor system (courtroom/trial), voice constraints, anti-drift countermeasures, framework hallucination guard, 3 operational modes | `.claude/skills/lungile-digital-twin/SKILL.md` |
| **3 operational modes** | Advisory Co-Pilot · Content Generator · Project Execution Partner — each with its own load pattern and constraints | `SKILL.md` §Operational Modes |
| **The Nexus — five spine instances** | `content-ip`, `business-operating`, `platform-product`, **`external`**, `profile` | `vault/ontology-schema.yaml` (`node_types.spine.instances`) |
| **CTES Core (7 components)** | Scorecard · 90-Day Plan · DAL · Proof Pack · Evidence Index · Exception Register · Scale/Fix/Stop Rhythm — the evidence-production system | `nexus-navigation.md` §CTES Core Components; `ontology-schema.yaml` (`ctes_component` instances) |
| **The 114/524 ontology** | 114 nodes, 524 edges, **0 orphans**; 10 node types; 15 edge types (9 backbone + 6 vault-derived); backbone is 22 nodes / 30 edges | `ontology-schema.yaml`; `nexus-navigation.md` §Ontology Summary |
| **GSD planning / requirement scheme** | `CATEGORY-NN` requirement IDs (uppercase 3–4 letter prefix + zero-padded number); v1.0 used EXTR/VALT/VINT/GRPH/TWIN | `.planning/milestones/v1.0-REQUIREMENTS.md` |
| **Feedback-loop narrative** | Everything converges into the Platform/Portal as the living execution layer; the Platform is the only node that sends `improves` edges (the self-healing mechanism) | `Nexus System\Nexus Graph Explanation.txt`; `nexus-navigation.md` §Feedback Loops |

### Two corrections to bake in (file-grounded)

These two points matter because the common shorthand contradicts the authoritative schema. State them explicitly wherever the Nexus is described.

1. **The Nexus has FIVE spine instances, not four.** The authoritative `ontology-schema.yaml` lists `content-ip`, `business-operating`, `platform-product`, **`external`**, and `profile`. The common *four-spine* description — and the human-facing MOCs, which present a simplified view of **Content/IP, CTES Core, Business/Operating, Platform** — **omit `external`** and re-cast CTES Core as if it were a spine. Treat the four-spine view as a *navigational simplification for human readers* that **contradicts the authoritative ontology**. When reasoning programmatically, use the five-spine truth.

2. **CTES Core is NOT a spine — it is a node.** In the authoritative schema, CTES Core is a `nexus_node` of subtype `ctes_core` living **inside the `platform-product` spine**, with seven `ctes_component` sub-nodes attached by `component_of` edges. The MOC view that elevates "CTES Core" to spine status is the same human-facing simplification flagged above.

## 2.3 The full framework crosswalk

The heart of the appendix. Each neutral concept from Part 1 is matched to its closest Lungile asset, with an honest verdict on fit. Where the verdict is **GAP**, the neutral construct must be authored fresh (Part 2.4). Where it is **Strong fit**, lift Lungile's existing — and usually more mature — version.

| Neutral AOS concept (Part 1) | Closest Lungile asset | Verdict |
|------------------------------|-----------------------|---------|
| **Three Ms** (Mindset → Method → Machine) | **A-E Pattern** (Aim → Build → Construct → Decide → Embed) | **Partial overlap** — both are build sequences, but A-E's defining move (decide *after* construction) is sharper |
| **Four Cs** (Context / Connections / Capabilities / Cadence) | **Value Architecting** + the **90-Day Cadence** | **Adopt Four Cs as-is** — no precise Lungile equivalent; clean addition |
| **Entity ontology** (8 operational types: Agents/Skills/Workflows/Rules/Tools/Knowledge/Projects/Output) | **Nexus ontology** (10 node types / 15 edge types) | **GAP** — AOS-operational node types (agent / tool / output) are **not** in Lungile's graph and must be defined |
| **Autonomy L0–L4** ladder | **SCALE** — the *Automation Depth* dimension | **GAP** — SCALE names "how autonomous", but the explicit **L0–L4 ladder must be authored** |
| **Intern Rule** (own identity, read-only default, audit trail, minimal scope) | **DAL** (owner + evidence-by date) + HITL posture | **Partial** — DAL gives accountability; identity/scope/read-only conventions need adding |
| **EAD** (Eliminate > Automate > Delegate) | *(no precise equivalent)* | **GAP — adopt as-is** |
| **Bike Method** (4 rollout phases, start at 10%) | **A-E Pattern** + GSD phase method | **Partial** — both phase a rollout; volume-ramp discipline is the missing piece |
| **Three-tier team sync** (Human / Agent / GitHub) | Dual-purpose vault (human + LLM consumption) — *adjacent only* | **GAP — net-new** |
| **RLS / multi-tenancy** (client-tag row-level security) | **SCALE** — *Central Provisioning* + **DAL** audit trail | **GAP — the largest enterprise add** |
| **Repo promotion** (Personal → Dept → Company; AI Architects review) | A-E **'Embed'** + Scale/Fix/Stop rhythm + GSD verify gates | **Partial** |
| **Auto-archive all Output** (everything the AI creates → Output type) | **CTES** *Evidence Index* + *Proof Pack* | **Strong fit** |
| **Kill Switch / HITL** | **DAL** + CTES *Exception Register* | **Partial** |
| **Two-step traversal + summary indexes + progressive loading** | `nexus-navigation.md` traversal + MOC indexes + 3-tier kernel disclosure | **Strong fit** — Lungile's version is *more mature*; lift it |

**How to read the verdicts:**

- **Strong fit** → reuse Lungile's asset directly; it is at least as good as the neutral pattern.
- **Partial** → Lungile has a foundation; extend it rather than replace it.
- **GAP** → net-new work; see Part 2.4.

## 2.4 Genuine gaps

Four gaps survive the crosswalk as genuinely net-new. These are the items a PRD must specify, because no current Lungile asset covers them.

1. **Team RLS multi-tenancy.** The single largest enterprise addition. Lungile's architecture is single-tenant (his own brain). A client-tag Row-Level Security layer (Supabase/Postgres) — where an Acme-only operator is *programmatically refused* another client's data — does not exist and must be built. SCALE's *Central Provisioning* and DAL's audit trail are the governance scaffolding around it, but the RLS mechanism itself is new.

2. **Three-tier human / agent / GitHub sync.** Lungile's vault is dual-purpose (human-readable in Obsidian, machine-readable by the Twin), which is *adjacent* to the three-tier model but not the same thing. The explicit **Tier 1 Human-Maintained (source of truth) → Tier 2 Agent-Maintained → Tier 3 GitHub** separation, with `CLAUDE.local.md` private overrides and bidirectional Notion↔Claude-Code sync, is net-new.

3. **Explicit autonomy ladder (L0–L4).** SCALE's *Automation Depth* dimension *names* the concept of "how autonomous an agent can be", but the discrete, operable five-rung ladder — manual → suggested → drafted → supervised → autonomous, defaulting to the lowest effective rung — must be authored as a first-class control.

4. **AOS-operational node types.** The Nexus ontology models *knowledge* (frameworks, articles, concepts, profile layers) and *architecture* (spines, nexus nodes). It does **not** model *operations* — there is no `agent`, `tool`, or `output` node type. To run as an AOS, the graph needs these operational types added, mapped onto the existing 10-type / 15-edge schema without breaking the 0-orphan invariant.

**Requirement-ID scheme for the PRD.** When these gaps become requirements, follow the established `CATEGORY-NN` convention (uppercase 3–4 letter prefix, zero-padded number). v1.0 used EXTR / VALT / VINT / GRPH / TWIN; the v2 RAG work used RAG / MAINT / EVOL. Continue with **new prefixes** for the AOS work — suggested: **FND** (foundation), **MEM** (memory/brain), **SKL** (skills/capability), **GOV** (governance), **TEAM** (team sync), **AUT** (autonomy ladder), **OPS** (operational node types). For example: `TEAM-01` for the three-tier sync, `GOV-01` for RLS, `AUT-01` for the L0–L4 ladder, `MEM-01` for operational node types.

## 2.5 Positioning note

The neutral pattern of Part 1 is competent but generic — it could be any consultant's AOS starter kit. What makes it *enterprise-grade and governed* — what would let it survive cross-examination in a boardroom — is exactly the layer Lungile already owns. Four mechanisms do the work:

- **Value Architecting** turns the AOS from a productivity toy into an instrumented system. Its three pillars — Value (measured via VRI), Cost (transparent via TBM/FinOps), Governance (forensic via DAL and the 90-day cadence) — are what a board needs before it will fund an agentic build. The neutral pattern has none of this; it assumes value rather than evidencing it.

- **The DAL** converts every automation decision and every autonomy-rung promotion into a recorded, owned, time-bound assumption. The neutral Kill Switch says "dismantle what does not pay"; the DAL says *who* decided, *what* they assumed, and *by when* it must be proven — turning a reflex into an audit trail.

- **The VRI** scores the whole AOS portfolio on five weighted dimensions (Strategic Alignment, Value Tree Strength, Assumption Discipline, Evidence Quality, Risk-Adjusted Outcomes) into a single board-trackable index. The neutral Four-Cs `/audit` produces a /100 maturity score; the VRI produces a *value* score the board can govern against. They are complementary — Four Cs measures whether the AOS is *built*; VRI measures whether it is *worth it*.

- **CTES evidence outputs** are where the neutral "auto-archive all Output" pattern becomes governed proof. Every artefact the AOS produces flows into the **Evidence Index** and is assembled, when needed, into a **Proof Pack** for the board — with the **Exception Register** holding the honest ledger of what is not working. This is a Strong fit per the crosswalk, and it is the difference between a folder of AI output and a defensible body of evidence.

In short: the neutral pattern supplies the *machinery*; Lungile's frameworks supply the *governance that makes the machinery fundable and defensible*. The AOS becomes evidence, not theatre.

---

## Appendix note — the D2A demo UI

A working AOS console already exists at `...\D2A-Agentic-OS-Demo\index.html`. Its **information architecture is proven and reusable** — the left-nav set (Dashboard, Agents, Chat, Swarm, Tasks, Memory, Inspector, Skills, MCP, Settings, Terminal) maps cleanly onto the neutral reference architecture of Part 1.7. Reuse that IA.

> **Brand caution — the demo theme is OFF-BRAND.** The `index.html` uses a cyan sci-fi palette (`--accent: #00f0ff`) with scanline and HUD overlays. This **conflicts with the NOVATEK brand**, whose primaries are navy `#1e3a5f`, cobalt `#2563eb`, and charcoal `#334155` (never pure black, with navy-tinted shadows). If any AOS console is rendered for a NOVATEK or client-facing context, **re-skin it to brand** — keep the cyan-theme console's *layout*, replace its *colours*.

---

*End of design notes. These notes feed the PRD; they are not the PRD. British English throughout. No frameworks beyond Lungile's eight whitelisted frameworks have been referenced.*

// ── Per-tile Agent Configuration Card content (V1.1 UX Transition Note, §6/§7) ──
//
// Hardcoded, keyed by agentId. The tile face shows displayName + subtitle; the
// right-rail Configuration Card renders the shelves below. `editable[]` carries a
// small typed control schema so a setting can render as a REAL control bound to
// RunConfig (interactive-where-free); unbound controls / empty lists are fine.

import type { RunConfig } from "./runConfig";
import {
  GEOGRAPHY_OPTIONS,
  INDUSTRY_OPTIONS,
  ROUTE_OPTIONS,
  REVENUE_BANDS,
  TRIGGER_WINDOWS,
  EVIDENCE_GATES,
} from "./runConfig";

export type SettingControl =
  | { kind: "chips"; multi: boolean; options: readonly string[]; configKey: keyof RunConfig }
  | { kind: "number"; min?: number; max?: number; configKey: keyof RunConfig }
  | { kind: "toggle"; onLabel: string; offLabel: string; configKey: keyof RunConfig };

export interface EditableSetting {
  id: string;
  label: string;
  control: SettingControl;
  hint?: string;
}

export interface TileConfig {
  agentId: string;
  displayName: string;
  subtitle: string;
  purpose: string;
  defaults: string[];
  editable: EditableSetting[];
  guardrails: string[];
  inputs: string[];
  outputs: string[];
  sources: string[];
  confidenceRules: string[];
  issues?: string[];
  /** Post-approval, human-gated stage — kept visible but never auto-runs. */
  gated?: boolean;
}

// Numeric trigger window rendered as "{n} months" chips, parsed back on change.
const TRIGGER_WINDOW_OPTIONS = TRIGGER_WINDOWS.map((m) => `${m} months`);

export const TILE_CONFIG: Record<string, TileConfig> = {
  d2a: {
    agentId: "d2a",
    displayName: "Orchestrator",
    subtitle: "Controls the full targeting run",
    purpose:
      "Coordinates the full targeting run — sequences every stage, enforces the run order, and holds the active targeting brief and configuration.",
    defaults: [
      "Active targeting brief drives the run",
      "Default pipeline order, all stages enabled",
      "Run mode: full pipeline",
    ],
    editable: [],
    guardrails: [
      "Human approval is required before any outreach",
      "Stages run in dependency order",
    ],
    inputs: ["Targeting brief", "Run configuration", "Saved scenario (optional)"],
    outputs: ["Sequenced stage runs", "Run status and progress", "Final pursuit board"],
    sources: ["Operator brief", "Run configuration"],
    confidenceRules: [
      "Surfaces per-stage confidence and blocks low-confidence accounts from Hot Pursuit",
    ],
  },

  cub: {
    agentId: "cub",
    displayName: "Company Universe Builder",
    subtitle: "Finds candidate companies",
    purpose:
      "Builds the candidate company universe from the brief — applies geography, industry, revenue and exclusion rules to produce a deduplicated account pool.",
    defaults: [
      "Geography: South Africa",
      "Category B priority (R200m – R5bn)",
      "Priority industries from the brief",
      "Excludes blue-chip multinationals and JSE Top 40",
    ],
    editable: [
      { id: "geography", label: "Geography", control: { kind: "chips", multi: true, options: GEOGRAPHY_OPTIONS, configKey: "geography" } },
      { id: "industries", label: "Priority industries", control: { kind: "chips", multi: true, options: INDUSTRY_OPTIONS, configKey: "industries" } },
      { id: "revenueBand", label: "Revenue band", control: { kind: "chips", multi: false, options: REVENUE_BANDS, configKey: "revenueBand" } },
      { id: "employeeMin", label: "Employees — minimum", control: { kind: "number", min: 0, max: 500000, configKey: "employeeMin" } },
      { id: "employeeMax", label: "Employees — maximum", control: { kind: "number", min: 0, max: 500000, configKey: "employeeMax" } },
    ],
    guardrails: [
      "Real, identifiable organisations only",
      "Honour the exclusion list",
      "Deduplicate by domain / registration",
    ],
    inputs: ["Targeting brief", "Geography, industry and revenue filters"],
    outputs: ["Candidate company list with account IDs", "New vs existing flag"],
    sources: ["Public web", "Approved enrichment sources", "Internal relationship list"],
    confidenceRules: ["Flags low-confidence company matches for review"],
    issues: ["Possible duplicates flagged for human merge"],
  },

  fre: {
    agentId: "fre",
    displayName: "Company Profile Builder",
    subtitle: "Adds size, ownership and complexity",
    purpose:
      "Enriches each company with revenue, headcount, ownership, parent/subsidiary status and the complexity indicators that justify CXO-level support.",
    defaults: [
      "Revenue, headcount, ownership and structure",
      "Public/private and parent/subsidiary status",
      "Missing fields flagged, never invented",
    ],
    editable: [
      { id: "revenueBand", label: "Revenue band", control: { kind: "chips", multi: false, options: REVENUE_BANDS, configKey: "revenueBand" } },
      { id: "employeeMin", label: "Employees — minimum", control: { kind: "number", min: 0, max: 500000, configKey: "employeeMin" } },
      { id: "employeeMax", label: "Employees — maximum", control: { kind: "number", min: 0, max: 500000, configKey: "employeeMax" } },
    ],
    guardrails: ["No fabricated firmographics", "Every field carries a source and confidence"],
    inputs: ["Candidate company list"],
    outputs: ["Enriched company profile", "Complexity indicators", "Field-level confidence"],
    sources: ["Apollo / equivalent", "Company websites and annual reports", "Public registries"],
    confidenceRules: ["High / medium / low per field; stale data flagged"],
    issues: ["Accounts missing revenue routed for review"],
  },

  trg: {
    agentId: "trg",
    displayName: "Buying Signal Finder",
    subtitle: "Finds why-now signals",
    purpose:
      "Finds the why-now signals — leadership change, finance pressure, AI governance, cyber, M&A and hiring — and attaches dated evidence to each.",
    defaults: [
      "Trigger window: last 18 months",
      "Signal families: interim exec, leadership departure, technology pressure, AI governance, cyber, M&A, finance stress, hiring",
      "Source-backed evidence required for every signal",
    ],
    editable: [
      { id: "triggerWindow", label: "Trigger window", control: { kind: "chips", multi: false, options: TRIGGER_WINDOW_OPTIONS, configKey: "triggerWindowMonths" } },
    ],
    guardrails: [
      "No Hot Pursuit without a validated, dated trigger",
      "Every signal needs a source URL and date",
    ],
    inputs: ["Enriched company profiles"],
    outputs: ["Trigger records: type, date, strength, confidence, recency", "Route implication per signal"],
    sources: ["Business media", "SENS / JSE announcements", "Company news and press"],
    confidenceRules: [
      "High / medium / low; low signals flagged, not removed",
      "Expired triggers cannot drive Hot Pursuit",
    ],
    issues: ["Accounts with no strong trigger moved to Watchlist"],
  },

  rou: {
    agentId: "rou",
    displayName: "Offer Route Selector",
    subtitle: "Chooses the best route to market",
    purpose:
      "Maps each account's visible issue to the best executive route — CIO/CTO, CFO, CAIO, CISO, Gigantiq, combined or exclude.",
    defaults: [
      "Routes: CIO/CTO, CFO, CAIO, CISO, Gigantiq, combined",
      "Primary and optional secondary route per account",
      "Exclude when no route fits",
    ],
    editable: [
      { id: "routes", label: "Active routes", control: { kind: "chips", multi: true, options: ROUTE_OPTIONS, configKey: "routes" } },
    ],
    guardrails: ["Route must map to a real executive issue", "No route invented without a signal"],
    inputs: ["Trigger and evidence records", "Company profile"],
    outputs: ["Primary route", "Optional secondary route", "Route rationale"],
    sources: ["Trigger evidence", "Executive / leadership pages"],
    confidenceRules: ["Route confidence tied to signal strength"],
  },

  sco: {
    agentId: "sco",
    displayName: "Pursuit Priority Scorer",
    subtitle: "Ranks accounts by pursuit priority",
    purpose:
      "Scores every account 0–100 across the weighted dimensions and assigns a pursuit class: Hot Pursuit, Active Nurture, Watchlist or Exclude / Defer.",
    defaults: [
      "Classes: Hot Pursuit, Active Nurture, Watchlist, Exclude / Defer",
      "Trigger strength and evidence weighted most heavily",
      "Hot Pursuit requires the evidence hard gate",
    ],
    editable: [
      { id: "evidenceGate", label: "Hot Pursuit evidence gate", control: { kind: "chips", multi: false, options: EVIDENCE_GATES, configKey: "evidenceGateHotPursuit" } },
    ],
    guardrails: [
      "Hard gate — Hot Pursuit needs trigger + route + wedge + buyer path + evidence",
      "Every score is explainable",
    ],
    inputs: ["Route, trigger, evidence and profile per account"],
    outputs: ["Total score (0–100)", "Pursuit class", "Score explanation"],
    sources: ["Upstream stage outputs"],
    confidenceRules: ["Evidence-confidence floor enforced for Hot Pursuit"],
  },

  wdg: {
    agentId: "wdg",
    displayName: "First Conversation Recommender",
    subtitle: "Suggests the best opening angle",
    purpose:
      "Recommends the first credible conversation — the wedge that maps the account's signal and route to a crisp opening angle.",
    defaults: [
      "Route-specific wedge families",
      "One wedge per account",
      "Proof required before a wedge is offered",
    ],
    editable: [],
    guardrails: ["Wedge must match the route and the evidenced signal"],
    inputs: ["Route and trigger per account"],
    outputs: ["First wedge", "Opening angle", "Rationale"],
    sources: ["Offer playbooks", "Route mapping"],
    confidenceRules: ["Wedge withheld when proof is weak"],
  },

  aud: {
    agentId: "aud",
    displayName: "Evidence Checker",
    subtitle: "Checks sources and confidence",
    purpose:
      "Verifies every material claim against its source, rates confidence, and holds or removes unsupported claims before they reach a brief or outreach.",
    defaults: [
      "Evidence required for Hot Pursuit",
      "Unsupported claims blocked from client-facing output",
      "Freshness checked per claim",
    ],
    editable: [],
    guardrails: [
      "No unsupported claim in any external output",
      "Every material claim needs a source URL",
    ],
    inputs: ["All claims and their sources"],
    outputs: ["Confidence rating per claim", "Held / removed unsupported claims"],
    sources: ["Cited source URLs", "Source-type hierarchy"],
    confidenceRules: ["High / medium / low; conflicts surfaced, not hidden"],
    issues: ["Unsupported claims held out of approved briefs"],
  },

  pkg: {
    agentId: "pkg",
    displayName: "Pursuit Brief Builder",
    subtitle: "Creates account briefs and action lists",
    purpose:
      "Packages the result — full briefs for Hot Pursuit accounts and summary rows for the rest — into Top 25, Next 75, Watchlist and Exclusions.",
    defaults: [
      "Top 25, Next 75, Watchlist and Exclusions",
      "Full brief for Hot Pursuit; summary rows for the rest",
      "Each brief: why now, route, wedge, buyer, evidence, next action",
    ],
    editable: [],
    guardrails: ["Briefs reflect evidence-checked claims only"],
    inputs: ["Scored, routed, evidence-checked accounts"],
    outputs: ["Account briefs", "Pursuit board tiers", "Next actions"],
    sources: ["Upstream stage outputs"],
    confidenceRules: ["Evidence basis indicated on every brief"],
  },

  con: {
    agentId: "con",
    displayName: "Buyer Contact Finder",
    subtitle: "Finds buyer contacts after approval",
    purpose:
      "Finds named buyer and sponsor contacts — but only after the account is qualified and a human has approved pursuit.",
    defaults: [
      "Runs only after company qualification and human approval",
      "Contacts by route-specific role priority",
      "Respects opt-out and do-not-contact",
    ],
    editable: [
      { id: "contactGate", label: "Contact enrichment", control: { kind: "toggle", onLabel: "Gated (after approval)", offLabel: "Open", configKey: "contactEnrichmentGated" } },
    ],
    guardrails: [
      "No contact enrichment before account qualification",
      "No outreach to suppressed records",
    ],
    inputs: ["Approved Hot Pursuit (and selected Active Nurture) accounts"],
    outputs: ["Named contacts with role and source", "Verification status"],
    sources: ["Apollo / RocketReach / Lusha", "Company websites"],
    confidenceRules: ["Contact verification and freshness enforced"],
    issues: ["Gated — does not run until pursuit is approved"],
    gated: true,
  },
};

export function agentDisplayName(id: string): string {
  return TILE_CONFIG[id]?.displayName ?? id;
}

export function tileConfigFor(id: string | null): TileConfig | undefined {
  return id ? TILE_CONFIG[id] : undefined;
}

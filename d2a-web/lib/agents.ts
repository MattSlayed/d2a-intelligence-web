import type { AgentDef } from "./types";

// The D2A roster: a master orchestrator + 9 specialist agents.
export const AGENTS: AgentDef[] = [
  { id: "d2a", name: "D2A Orchestrator", role: "Master · pipeline control", glyph: "◆", master: true },
  { id: "cub", name: "Universe Builder", role: "Candidate universe", glyph: "▣" },
  { id: "fre", name: "Firmographic Enricher", role: "Revenue · headcount · ownership", glyph: "▤" },
  { id: "trg", name: "Trigger Detector", role: "Buying signals (24m)", glyph: "◎" },
  { id: "rou", name: "Executive Issue Router", role: "CFO / CIO / CAIO routing", glyph: "⇄" },
  { id: "sco", name: "ABCD Classifier", role: "7-dimension scoring", glyph: "◐" },
  { id: "wdg", name: "Wedge Recommender", role: "First-wedge offer", glyph: "➤" },
  { id: "aud", name: "Evidence Auditor", role: "Claim ↔ source audit", glyph: "✓" },
  { id: "pkg", name: "Pursuit Packager", role: "Class-A briefs", glyph: "▦" },
  { id: "con", name: "Contact Enricher", role: "Gated · post-approval", glyph: "◌" },
];

// The visible 9-stage pipeline (drives the run strip).
export const PIPELINE: { id: string; label: string; agentId: string }[] = [
  { id: "s1", label: "Universe", agentId: "cub" },
  { id: "s2", label: "Firmographics", agentId: "fre" },
  { id: "s3", label: "Triggers", agentId: "trg" },
  { id: "s4", label: "Routing", agentId: "rou" },
  { id: "s5", label: "Scoring", agentId: "sco" },
  { id: "s6", label: "Wedges", agentId: "wdg" },
  { id: "s7", label: "Evidence", agentId: "aud" },
  { id: "s8", label: "Packaging", agentId: "pkg" },
  { id: "s9", label: "Review gate", agentId: "con" },
];

export const AGENT_BY_ID: Record<string, AgentDef> = Object.fromEntries(
  AGENTS.map((a) => [a.id, a]),
);

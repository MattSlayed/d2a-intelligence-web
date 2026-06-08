// Static catalogue data for the Skills and MCP views.
// A hosted app cannot introspect the operator's local `.claude/skills` or MCP
// config, so these are presented as polished, accurate read-only catalogues
// of what powers the D2A Agentic OS.

import type { IconKey } from "@/components/Icon";

export interface SkillEntry {
  id: string;
  name: string;
  icon: IconKey;
  purpose: string; // one-line purpose
  streamlines: string; // the repetitive process it removes
  tags: string[];
}

export interface McpEntry {
  id: string;
  name: string;
  icon: IconKey;
  purpose: string;
  capability: string;
  status: "connected" | "available";
}

// ── Project skills (Claude Code skills wired to this OS) ──
export const SKILLS: SkillEntry[] = [
  {
    id: "run-d2a-sweep",
    name: "run-d2a-sweep",
    icon: "bolt",
    purpose: "Kick off a full Target Account Intelligence sweep from a brief.",
    streamlines:
      "Removes the manual two-pass research → scoring choreography: builds the universe, enriches, detects triggers, routes executives, scores ABCD and packages Class-A briefs in one command.",
    tags: ["pipeline", "research", "scoring"],
  },
  {
    id: "deploy-to-vercel",
    name: "deploy-to-vercel",
    icon: "package",
    purpose: "Ship the console to Vercel with a green, deploy-safe build.",
    streamlines:
      "Standardises the build → type-check → deploy loop so every release stays vanilla-CSS, dependency-clean and production-ready without hand-holding.",
    tags: ["devops", "release"],
  },
  {
    id: "add-d2a-agent",
    name: "add-d2a-agent",
    icon: "agents",
    purpose: "Scaffold a new specialist agent into the D2A roster.",
    streamlines:
      "Wires a new agent into `lib/agents.ts`, the pipeline strip and the inline-SVG icon set consistently — no more copy-paste drift across the roster.",
    tags: ["agents", "scaffold"],
  },
  {
    id: "update-aos-docs",
    name: "update-aos-docs",
    icon: "skills",
    purpose: "Keep the Agentic OS documentation in lockstep with the code.",
    streamlines:
      "Regenerates phase notes, methodology references and the brand-aligned docs from the live system so the narrative never drifts from what shipped.",
    tags: ["docs", "knowledge-base"],
  },
];

// ── MCP servers wired to this OS ──
export const MCP_SERVERS: McpEntry[] = [
  {
    id: "magic",
    name: "21st.dev Magic",
    icon: "skills",
    purpose: "On-demand React component generation and refinement.",
    capability:
      "Generates production-grade UI components from intent and refines existing ones — the component foundry behind the console's mission-control surfaces.",
    status: "connected",
  },
  {
    id: "playwright",
    name: "Playwright",
    icon: "inspector",
    purpose: "Browser automation and end-to-end verification.",
    capability:
      "Drives a real browser to click through the console, validate the sweep flow and capture visual evidence — the live verification harness for each build.",
    status: "connected",
  },
  {
    id: "context7",
    name: "Context7",
    icon: "memory",
    purpose: "Live, version-accurate library documentation.",
    capability:
      "Fetches up-to-date docs for Next.js, React and the rest of the stack at build time so generated code tracks the current APIs, not stale training data.",
    status: "connected",
  },
];

// ── Engagement-brief presets for Settings (client-side, call setBrief) ──
export interface BriefPreset {
  id: string;
  label: string;
  hint: string;
  brief: string;
}

export const BRIEF_PRESETS: BriefPreset[] = [
  {
    id: "default-sa",
    label: "SA enterprise · broad",
    hint: "The default cross-sector South African sweep.",
    brief: [
      "South African enterprise and upper-mid-market.",
      "Category B priority. Decision routes: CIO, CFO, CAIO.",
      "Trigger window: last 24 months. Exclude blue-chip multinationals.",
      "Focus sectors: financial services, mining & resources, retail, telco, healthcare, public-sector-adjacent.",
    ].join(" "),
  },
  {
    id: "financial-services",
    label: "Financial services only",
    hint: "Banks, insurers and asset managers — CFO/CAIO led.",
    brief: [
      "South African financial services — banks, insurers, asset managers and fintech challengers.",
      "Decision routes: CFO and CAIO first, CIO second.",
      "Trigger window: last 18 months — regulatory change, leadership moves, AI and risk-modernisation initiatives.",
      "Exclude pure payment processors and blue-chip multinationals.",
    ].join(" "),
  },
  {
    id: "mining-resources",
    label: "Mining & resources",
    hint: "Resource majors and suppliers — operational triggers.",
    brief: [
      "South African mining, resources and heavy industry — operators and tier-1 suppliers.",
      "Decision routes: CIO/CTO and COO-adjacent buyers; CFO on capital programmes.",
      "Trigger window: last 24 months — commodity-cycle capex, safety/ESG mandates, digital-twin and automation programmes.",
      "Exclude junior explorers without revenue.",
    ].join(" "),
  },
];

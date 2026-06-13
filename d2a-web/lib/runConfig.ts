// ── Client-side run configuration (V1.1 UX Transition Note, Change 4/5/6) ──
//
// STEP-1 SCOPE: RunConfig is display / edit / persist only. It does NOT (yet)
// change the prompt sent to /api/run — the `brief` textarea remains the real
// driver of a sweep. Editing config drives the Configuration summary and the
// per-tile Configuration Cards so the pipeline stops being a black box.
// Wiring RunConfig into the actual run is Step 2 (backend work).

export interface RunConfig {
  geography: string[];
  revenueBand: string;
  employeeMin: number;
  employeeMax: number;
  industries: string[];
  routes: string[];
  triggerWindowMonths: number;
  exclusions: string[];
  evidenceGateHotPursuit: "high" | "medium" | "low";
  contactEnrichmentGated: boolean;
}

// Defaults seeded from the spec's worked example (Operating Aspiration, slide 5).
export const DEFAULT_RUN_CONFIG: RunConfig = {
  geography: ["South Africa"],
  revenueBand: "R200m – R5bn",
  employeeMin: 200,
  employeeMax: 10000,
  industries: ["Manufacturing", "Mining", "Financial services", "Retail", "Telco"],
  routes: ["CIO/CTO", "CFO", "CAIO", "CISO", "Gigantiq"],
  triggerWindowMonths: 18,
  exclusions: ["Blue-chip multinationals", "JSE Top 40"],
  evidenceGateHotPursuit: "high",
  contactEnrichmentGated: true,
};

export const GEOGRAPHY_OPTIONS = [
  "South Africa",
  "SADC",
  "Sub-Saharan Africa",
  "Pan-African",
];

export const INDUSTRY_OPTIONS = [
  "Manufacturing",
  "Mining",
  "Financial services",
  "Retail",
  "Telco",
  "Healthcare",
  "Logistics",
  "Energy",
  "Public sector",
  "Technology",
];

export const ROUTE_OPTIONS = ["CIO/CTO", "CFO", "CAIO", "CISO", "Gigantiq", "Combined"];

export const REVENUE_BANDS = [
  "R50m – R750m",
  "R200m – R5bn",
  "R750m – R5bn",
  "Above R5bn",
];

export const TRIGGER_WINDOWS = [6, 12, 18, 24, 36];

export const EVIDENCE_GATES = ["high", "medium", "low"] as const;

export interface SavedScenario {
  id: string;
  name: string;
  config: RunConfig;
  savedAt: number;
}

const LS_DEFAULT = "d2a.runConfig.default";
const LS_SCENARIOS = "d2a.runConfig.scenarios";

// All localStorage access is window-guarded and called only from effects /
// handlers (never module scope / render) so SSR stays safe.

export function loadDefaultConfig(): RunConfig | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LS_DEFAULT);
    if (!raw) return null;
    return { ...DEFAULT_RUN_CONFIG, ...(JSON.parse(raw) as Partial<RunConfig>) };
  } catch {
    return null;
  }
}

export function saveDefaultConfig(config: RunConfig): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_DEFAULT, JSON.stringify(config));
  } catch {
    /* ignore quota / privacy-mode errors */
  }
}

export function loadScenarios(): SavedScenario[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LS_SCENARIOS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SavedScenario[]) : [];
  } catch {
    return [];
  }
}

export function saveScenarios(scenarios: SavedScenario[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_SCENARIOS, JSON.stringify(scenarios));
  } catch {
    /* ignore */
  }
}

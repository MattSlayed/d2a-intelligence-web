// Shared types for the D2A console and its API routes.

export type AbcdClass = "A" | "B" | "C" | "D";

export interface EvidenceItem {
  claim: string;
  url: string;
  confidence?: "high" | "medium" | "low";
}

export interface Account {
  id: string;
  name: string;
  sector: string;
  abcd: AbcdClass;
  score: number; // 0-100
  trigger: string; // the buying signal
  buyer: string; // primary executive route (CFO / CIO / CAIO ...)
  wedge: string; // recommended first wedge
  rationale: string;
  evidence: EvidenceItem[];
}

export type StepStatus = "idle" | "active" | "done";

export interface RunStepState {
  id: string;
  label: string;
  agentId: string;
  status: StepStatus;
  detail?: string;
}

export interface AgentDef {
  id: string;
  name: string;
  role: string;
  glyph: string;
  master?: boolean;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Shape the model must emit in its final fenced ```json block.
export interface RunResult {
  accounts: Account[];
}

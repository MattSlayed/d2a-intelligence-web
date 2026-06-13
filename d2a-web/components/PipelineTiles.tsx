"use client";

import { TILE_CONFIG, agentDisplayName } from "@/lib/tileConfig";
import { ABCD_LABEL } from "@/lib/abcd";
import type { Account, AbcdClass, RunStepState } from "@/lib/types";
import Icon from "./Icon";

type Counts = Record<AbcdClass, number> & { total: number };

/* Unified clickable pipeline (V1.1 UX Transition Note — merges the old 9-node
   runstrip and the separate 10-card agent grid). The Orchestrator is the master
   control element; the 9 stages are clickable tiles that open their Configuration
   Card in the right rail. Live STEP k/9 progress (from page.tsx) drives status. */

// Representative per-stage In/Out volumes for the preview chips. These are NOT
// live — /api/run only streams STEP k/9 + the final board — so they are marked
// "preview" until the Step-2 backend emits real per-stage counts. The final
// board counts (shown in Stage output + each Config Card) ARE real.
const STAGE_PREVIEW: Record<string, { in: string; out: string; summary: string }> = {
  cub: { in: "brief", out: "1,240", summary: "1,240 found · 680 Category B · 92 excluded by brief rules" },
  fre: { in: "1,240", out: "1,050", summary: "1,050 enriched · 190 missing revenue flagged" },
  trg: { in: "1,050", out: "312", summary: "312 with signals · 118 no strong trigger → Watchlist" },
  rou: { in: "312", out: "312", summary: "CIO/CTO 134 · CFO 96 · CAIO 52 · CISO 30" },
  sco: { in: "312", out: "312", summary: "scored 0–100 across 8 weighted dimensions" },
  wdg: { in: "312", out: "312", summary: "one first-conversation wedge per account" },
  aud: { in: "312", out: "312", summary: "80% high · 15% medium · 5% unsupported held" },
  pkg: { in: "312", out: "Top 25", summary: "Top 25 · Next 75 · Watchlist · Exclusions" },
  con: { in: "approved", out: "gated", summary: "runs only after human approval" },
};

const STATUS_LABEL: Record<string, string> = { idle: "Idle", active: "Running", done: "Complete" };

const PREVIEW_CONTROLS = [
  { id: "step", icon: "play", label: "Run selected step" },
  { id: "rerun", icon: "play", label: "Rerun from step" },
  { id: "pause", icon: "pause", label: "Pause" },
  { id: "resume", icon: "play", label: "Resume" },
];

function realSummary(counts: Counts): string {
  return `${counts.total} accounts · ${ABCD_LABEL.A} ${counts.A} · ${ABCD_LABEL.B} ${counts.B} · ${ABCD_LABEL.C} ${counts.C} · ${ABCD_LABEL.D} ${counts.D}`;
}

export default function PipelineTiles({
  steps,
  running,
  accounts,
  counts,
  activeAgentId,
  selectedTileId,
  onSelectTile,
}: {
  steps: RunStepState[];
  running: boolean;
  accounts: Account[];
  counts: Counts;
  activeAgentId: string | null;
  selectedTileId: string | null;
  onSelectTile: (agentId: string) => void;
}) {
  const hasRun = accounts.length > 0;
  const doneCount = steps.filter((s) => s.status === "done").length;
  const activeCount = steps.filter((s) => s.status === "active").length;
  const pct = Math.round((doneCount / steps.length) * 100);
  const fillPct = Math.round(((doneCount + activeCount * 0.5) / steps.length) * 100);
  const currentStep = Math.min(doneCount + (running ? 1 : 0), steps.length);
  const latest = [...steps].reverse().find((s) => s.status === "active");
  const orch = TILE_CONFIG.d2a;

  return (
    <div className={"pipeline" + (running ? " is-running" : "")}>
      {/* ── Orchestrator master control ── */}
      <button
        type="button"
        className={
          "pipeline-master" +
          (selectedTileId === "d2a" ? " is-selected" : "") +
          (running ? " active" : "")
        }
        onClick={() => onSelectTile("d2a")}
        aria-pressed={selectedTileId === "d2a"}
        aria-label="Orchestrator — open configuration"
      >
        <span className="pmaster-ic">
          <Icon name="orchestrator" />
        </span>
        <span className="pmaster-body">
          <span className="pmaster-kicker">Master control</span>
          <span className="pmaster-name">{orch.displayName}</span>
          <span className="pmaster-sub">{orch.subtitle}</span>
        </span>
        <span className="pmaster-gauge" aria-hidden="true">
          <span className="pmaster-gauge-track">
            <span
              className="pmaster-gauge-fill"
              style={{ width: `${Math.max(fillPct, running ? 4 : 0)}%` }}
            />
          </span>
          <span className="pmaster-meter">
            step <b>{currentStep}</b> / {steps.length} · {pct}%
          </span>
        </span>
      </button>

      <div
        className="progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-label="Pipeline progress"
      >
        <div className="progress-fill" style={{ width: `${Math.max(fillPct, running ? 4 : 0)}%` }} />
      </div>

      {/* execution controls — the real "Run full pipeline" lives in the panel head;
          these stage-level controls are Step-2 preview. */}
      <div className="exec-bar" role="group" aria-label="Execution controls">
        <span className="exec-hint">Execution</span>
        {PREVIEW_CONTROLS.map((b) => (
          <button
            key={b.id}
            type="button"
            className="btn exec-btn"
            disabled
            aria-disabled="true"
            title="Step 2 preview — wires up with backend orchestration"
          >
            <Icon name={b.icon} /> {b.label}
            <span className="preview-badge">Step 2</span>
          </button>
        ))}
      </div>

      {/* ── unified clickable stage tiles, wired by a flow conduit ── */}
      <div className="ptiles">
        {steps.map((s, i) => {
          const name = agentDisplayName(s.agentId);
          const sub = TILE_CONFIG[s.agentId]?.subtitle ?? "";
          const gated = TILE_CONFIG[s.agentId]?.gated;
          const statusCls = gated && s.status !== "done" ? "gated" : s.status;
          const statusLabel = gated && s.status !== "done" ? "Gated" : STATUS_LABEL[s.status] ?? "Idle";
          const prev = STAGE_PREVIEW[s.agentId];
          const isActive = s.status === "active" || activeAgentId === s.agentId;
          // The conduit between stage i-1 → i is "charged" once the previous
          // stage is done; it carries a live packet while the run is in flight.
          const prevDone = i > 0 && steps[i - 1].status === "done";
          const linkLive = running && (prevDone || isActive);
          return (
            <button
              key={s.id}
              type="button"
              className={
                "ptile" +
                (selectedTileId === s.agentId ? " is-selected" : "") +
                (isActive ? " active" : "") +
                (s.status === "done" ? " is-done" : "") +
                (gated ? " is-gated" : "")
              }
              onClick={() => onSelectTile(s.agentId)}
              aria-pressed={selectedTileId === s.agentId}
              aria-label={`${name} — ${statusLabel}. Open configuration.`}
            >
              {i > 0 ? (
                <span
                  className={"ptile-link" + (prevDone ? " charged" : "") + (linkLive ? " live" : "")}
                  aria-hidden="true"
                >
                  <span className="ptile-packet" />
                </span>
              ) : null}
              <span className="ptile-head">
                <span className="ptile-ix">{s.status === "done" ? "✓" : i + 1}</span>
                <span className={"ptile-badge " + statusCls}>
                  <span className="ptile-badge-dot" />
                  {statusLabel}
                </span>
              </span>
              <span className="ptile-name">
                {gated ? (
                  <span className="ptile-lock" aria-hidden="true">
                    <Icon name="lock" />
                  </span>
                ) : null}
                {name}
              </span>
              <span className="ptile-sub">{sub}</span>
              <span className="ptile-foot">
                <span className="chip preview" title="Step 2 preview — sample volume">
                  in {prev?.in ?? "—"}
                </span>
                <span className="chip flow" aria-hidden="true">→</span>
                <span className="chip preview" title="Step 2 preview — sample volume">
                  out {prev?.out ?? "—"}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* ── stage output summary (D10) ── */}
      <div className="stage-out">
        <span className="stage-out-label">
          <Icon name="terminal" /> Stage output
        </span>
        {hasRun ? (
          <span className="stage-out-val">{realSummary(counts)}</span>
        ) : running && latest ? (
          <span className="stage-out-val">
            {agentDisplayName(latest.agentId)} · {STAGE_PREVIEW[latest.agentId]?.summary ?? "working…"}
            <span className="chip preview">preview</span>
          </span>
        ) : (
          <span className="stage-out-val muted">
            Run the pipeline to see live output. Per-stage volumes on the tiles are illustrative
            until the Step-2 backend lands.
          </span>
        )}
      </div>
    </div>
  );
}

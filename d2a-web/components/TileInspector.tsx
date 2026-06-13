"use client";

import type { EditableSetting, TileConfig } from "@/lib/tileConfig";
import type { RunConfig } from "@/lib/runConfig";
import type { Account, AbcdClass, RunStepState } from "@/lib/types";
import Icon from "./Icon";

type Counts = Record<AbcdClass, number> & { total: number };

/* Agent Configuration Card body (V1.1 UX Transition Note, §6). Renders the
   eleven shelves for a pipeline tile. Editable settings are REAL controls bound
   to RunConfig — changing one updates the Configuration summary live. */

function List({ items }: { items: string[] }) {
  return (
    <ul className="cfg-list">
      {items.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  );
}

function Control({
  setting,
  runConfig,
  onUpdateConfig,
}: {
  setting: EditableSetting;
  runConfig: RunConfig;
  onUpdateConfig: (patch: Partial<RunConfig>) => void;
}) {
  const { control } = setting;

  if (control.kind === "number") {
    const key = control.configKey;
    const val = runConfig[key] as number;
    return (
      <label className="cfg-num-row">
        <span className="cfg-ctrl-label">{setting.label}</span>
        <input
          type="number"
          className="cfg-num"
          value={val}
          min={control.min}
          max={control.max}
          onChange={(e) =>
            onUpdateConfig({ [key]: Number(e.target.value) || 0 } as Partial<RunConfig>)
          }
        />
      </label>
    );
  }

  if (control.kind === "toggle") {
    const key = control.configKey;
    const val = runConfig[key] as boolean;
    return (
      <div className="cfg-ctrl">
        <span className="cfg-ctrl-label">{setting.label}</span>
        <div className="cfg-chips" role="group" aria-label={setting.label}>
          <button
            type="button"
            className={"cfg-chip" + (val ? " on" : "")}
            aria-pressed={val}
            onClick={() => onUpdateConfig({ [key]: true } as Partial<RunConfig>)}
          >
            {control.onLabel}
          </button>
          <button
            type="button"
            className={"cfg-chip" + (!val ? " on" : "")}
            aria-pressed={!val}
            onClick={() => onUpdateConfig({ [key]: false } as Partial<RunConfig>)}
          >
            {control.offLabel}
          </button>
        </div>
      </div>
    );
  }

  // chips (single or multi select)
  const key = control.configKey;
  const raw = runConfig[key];
  return (
    <div className="cfg-ctrl">
      <span className="cfg-ctrl-label">{setting.label}</span>
      <div className="cfg-chips" role="group" aria-label={setting.label}>
        {control.options.map((opt) => {
          let on = false;
          if (control.multi && Array.isArray(raw)) on = raw.includes(opt);
          else if (key === "triggerWindowMonths") on = parseInt(opt, 10) === raw;
          else on = raw === opt;
          return (
            <button
              key={opt}
              type="button"
              className={"cfg-chip" + (on ? " on" : "")}
              aria-pressed={on}
              onClick={() => {
                if (control.multi && Array.isArray(raw)) {
                  const next = on ? raw.filter((x) => x !== opt) : [...raw, opt];
                  onUpdateConfig({ [key]: next } as Partial<RunConfig>);
                } else if (key === "triggerWindowMonths") {
                  onUpdateConfig({ triggerWindowMonths: parseInt(opt, 10) });
                } else {
                  onUpdateConfig({ [key]: opt } as Partial<RunConfig>);
                }
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function TileInspector({
  tile,
  runConfig,
  onUpdateConfig,
  steps,
  counts,
  accounts,
}: {
  tile: TileConfig;
  runConfig: RunConfig;
  onUpdateConfig: (patch: Partial<RunConfig>) => void;
  steps: RunStepState[];
  counts: Counts;
  accounts: Account[];
}) {
  const hasRun = accounts.length > 0;
  const running = steps.some((s) => s.status === "active");

  // Status shelf — derived from live run state.
  let statusCls = "idle";
  let statusText = "Idle — awaiting run";
  if (tile.gated) {
    statusCls = "gated";
    statusText = "Gated — runs only after human approval";
  } else if (tile.agentId === "d2a") {
    statusCls = running ? "active" : hasRun ? "done" : "idle";
    statusText = running ? "Running" : hasRun ? "Complete" : "Idle — awaiting run";
  } else {
    const st = steps.find((s) => s.agentId === tile.agentId);
    if (st) {
      statusCls = st.status;
      statusText = st.status === "done" ? "Complete" : st.status === "active" ? "Running" : "Idle — awaiting run";
    }
  }

  // Last-run summary — REAL board counts for orchestrator / scorer / packager.
  const realLine = `${counts.total} accounts · Hot Pursuit ${counts.A} · Active Nurture ${counts.B} · Watchlist ${counts.C} · Exclude/Defer ${counts.D}`;
  const realStages = tile.agentId === "d2a" || tile.agentId === "sco" || tile.agentId === "pkg";
  const lastRun = !hasRun
    ? "No run yet. Run the pipeline to populate this stage."
    : realStages
      ? realLine
      : "Live per-stage counts arrive with the Step-2 backend.";

  return (
    <div className="cfg-card">
      {/* Purpose */}
      <div className="bf">
        <div className="bf-label">
          <Icon name="target" /> Purpose
        </div>
        <div className="bf-val">{tile.purpose}</div>
      </div>

      {/* Default assumptions */}
      <div className="bf">
        <div className="bf-label">
          <Icon name="settings" /> Default assumptions
        </div>
        <List items={tile.defaults} />
      </div>

      {/* Editable settings */}
      <div className="bf">
        <div className="bf-label">
          <Icon name="sliders" /> Editable settings
        </div>
        {tile.editable.length === 0 ? (
          <div className="cfg-muted">No operator-editable settings for this stage.</div>
        ) : (
          <div className="cfg-controls">
            {tile.editable.map((s) => (
              <Control key={s.id} setting={s} runConfig={runConfig} onUpdateConfig={onUpdateConfig} />
            ))}
          </div>
        )}
      </div>

      {/* Locked guardrails */}
      <div className="bf">
        <div className="bf-label">
          <Icon name="lock" /> Locked guardrails
        </div>
        <ul className="cfg-list locked">
          {tile.guardrails.map((g, i) => (
            <li key={i}>
              <Icon name="lock" /> {g}
            </li>
          ))}
        </ul>
      </div>

      {/* Inputs / Outputs */}
      <div className="cfg-io">
        <div className="bf">
          <div className="bf-label">
            <Icon name="route" /> Inputs
          </div>
          <List items={tile.inputs} />
        </div>
        <div className="bf">
          <div className="bf-label">
            <Icon name="package" /> Outputs
          </div>
          <List items={tile.outputs} />
        </div>
      </div>

      {/* Source / tool preferences */}
      <div className="bf">
        <div className="bf-label">
          <Icon name="universe" /> Source / tool preferences
        </div>
        <List items={tile.sources} />
      </div>

      {/* Confidence rules */}
      <div className="bf">
        <div className="bf-label">
          <Icon name="audit" /> Confidence rules
        </div>
        <List items={tile.confidenceRules} />
      </div>

      {/* Status */}
      <div className="bf">
        <div className="bf-label">
          <Icon name="bolt" /> Status
        </div>
        <div className="cfg-status">
          <span className={"ptile-badge " + statusCls}>
            <span className="ptile-badge-dot" />
            {statusText}
          </span>
        </div>
      </div>

      {/* Last run summary */}
      <div className="bf">
        <div className="bf-label">
          <Icon name="terminal" /> Last run summary
        </div>
        <div className="bf-val">
          {lastRun}
          {hasRun && !realStages ? <span className="chip preview">preview</span> : null}
        </div>
      </div>

      {/* Issues / gaps */}
      {tile.issues && tile.issues.length ? (
        <div className="bf">
          <div className="bf-label">
            <Icon name="alert" /> Issues / gaps
          </div>
          <List items={tile.issues} />
        </div>
      ) : null}
    </div>
  );
}

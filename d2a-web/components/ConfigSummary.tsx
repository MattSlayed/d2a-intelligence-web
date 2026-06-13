"use client";

import { useEffect, useRef, useState } from "react";
import type { RunConfig } from "@/lib/runConfig";
import Icon from "./Icon";

/* Configuration summary (V1.1 UX Transition Note, Change 6).
   Sits below the Targeting Brief, above the pipeline. Reads the live RunConfig
   so the operator can see geography, industries, bands, routes, the trigger
   window, exclusions and the gates BEFORE a run — and save it as a default or a
   reusable scenario. Edits happen in each tile's Configuration Card; this panel
   reflects them live. */

function fmtList(items: string[], empty = "—"): string {
  return items.length ? items.join(", ") : empty;
}

export default function ConfigSummary({
  runConfig,
  scenarioCount,
  onSaveDefault,
  onSaveScenario,
  onEdit,
}: {
  runConfig: RunConfig;
  scenarioCount: number;
  onSaveDefault: () => void;
  onSaveScenario: () => void;
  onEdit: () => void;
}) {
  const [flash, setFlash] = useState<string | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  function flashNote(msg: string) {
    setFlash(msg);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setFlash(null), 1800);
  }

  const rows: { key: string; val: string; locked?: boolean }[] = [
    { key: "Geography", val: fmtList(runConfig.geography) },
    { key: "Industries", val: fmtList(runConfig.industries) },
    { key: "Revenue band", val: runConfig.revenueBand },
    { key: "Employee range", val: `${runConfig.employeeMin.toLocaleString()} – ${runConfig.employeeMax.toLocaleString()}` },
    { key: "Offer routes", val: fmtList(runConfig.routes) },
    { key: "Trigger window", val: `Last ${runConfig.triggerWindowMonths} months` },
    { key: "Exclusions", val: fmtList(runConfig.exclusions) },
    { key: "Hot Pursuit evidence gate", val: `${runConfig.evidenceGateHotPursuit} confidence`, locked: true },
    { key: "Contact enrichment", val: runConfig.contactEnrichmentGated ? "Gated · after approval" : "Open", locked: true },
  ];

  return (
    <div className="cfg-summary">
      <div className="cfg-summary-head">
        <span className="cfg-summary-title">
          <span className="cfg-summary-ic">
            <Icon name="sliders" />
          </span>
          Run configuration
        </span>
        <span className="cfg-summary-tag">
          <span className="info-flag-dot" />
          Pre-flight · {rows.length} parameters
        </span>
      </div>
      <p className="cfg-summary-copy">
        The guardrails and assumptions for this sweep. Edit any value in a stage&rsquo;s
        Configuration Card — the summary updates here before you run.
      </p>

      <div className="cfg-summary-grid">
        {rows.map((r, i) => (
          <div className={"cfg-summary-row" + (r.locked ? " is-locked" : "")} key={r.key}>
            <span className="cfg-summary-idx">{String(i + 1).padStart(2, "0")}</span>
            <span className="cfg-summary-key">
              {r.key}
              {r.locked ? <Icon name="lock" /> : null}
            </span>
            <span className="cfg-summary-val">{r.val}</span>
          </div>
        ))}
      </div>

      <div className="cfg-summary-foot">
        <button type="button" className="btn" onClick={onEdit}>
          <Icon name="sliders" /> Edit in pipeline
        </button>
        <span className="cfg-summary-spacer" />
        {flash ? <span className="cfg-summary-flash">{flash}</span> : null}
        <button
          type="button"
          className="btn"
          onClick={() => {
            onSaveDefault();
            flashNote("Saved as default");
          }}
        >
          Save as default
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            onSaveScenario();
            flashNote("Scenario saved");
          }}
        >
          Save as scenario{scenarioCount > 0 ? ` · ${scenarioCount}` : ""}
        </button>
      </div>
    </div>
  );
}

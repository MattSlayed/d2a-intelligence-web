"use client";

import { useEffect, useRef } from "react";
import type { Account, AbcdClass, RunStepState } from "@/lib/types";
import type { RunConfig } from "@/lib/runConfig";
import ConfigSummary from "./ConfigSummary";
import PipelineTiles from "./PipelineTiles";
import Icon from "./Icon";

type Counts = Record<AbcdClass, number> & { total: number };

/* Presentational-only classifier for a narration line. Does NOT alter the
   underlying `narration` string or the parse logic in page.tsx. */
function lineClass(line: string): string {
  const t = line.trim();
  if (/STEP\s+\d\s*\/\s*9/i.test(t)) return "l-step";
  if (/^\[web\]|searching|web search|query:/i.test(t)) return "l-web";
  if (/\b(done|complete|completed|finished|✓)\b/i.test(t)) return "l-done";
  return "l-prose";
}

export default function RunConsole({
  brief,
  setBrief,
  running,
  onRun,
  steps,
  narration,
  error,
  activeAgentId,
  accounts,
  counts,
  selectedTileId,
  onSelectTile,
  runConfig,
  scenarioCount,
  onSaveDefault,
  onSaveScenario,
}: {
  brief: string;
  setBrief: (b: string) => void;
  running: boolean;
  onRun: () => void;
  steps: RunStepState[];
  narration: string;
  error: string;
  activeAgentId: string | null;
  accounts: Account[];
  counts: Counts;
  selectedTileId: string | null;
  onSelectTile: (agentId: string) => void;
  runConfig: RunConfig;
  scenarioCount: number;
  onSaveDefault: () => void;
  onSaveScenario: () => void;
}) {
  const logRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [narration]);

  const lines = narration.length ? narration.split("\n") : [];

  return (
    <section className="panel">
      <div className="panel-head">
        <div>
          <div className="panel-title">Targeting Brief</div>
          <div className="panel-sub">Sets the narrative and guardrails for this sweep.</div>
        </div>
        <button className="btn btn-primary" onClick={onRun} disabled={running}>
          {running ? (
            <>
              <span className="spinner" /> Running…
            </>
          ) : (
            <>
              <Icon name="bolt" /> Run full pipeline
            </>
          )}
        </button>
      </div>
      <div className="panel-body">
        <textarea
          className="brief"
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          disabled={running}
          spellCheck={false}
          aria-label="Targeting brief"
        />
        <div className="run-actions">
          <span className="run-hint">
            Describe who to target and why. The agents profile and score live, grounded with web
            search — click any stage below to inspect or adjust it before you run.
          </span>
        </div>

        {/* Configuration summary — below the brief, above the pipeline (Change 6) */}
        <ConfigSummary
          runConfig={runConfig}
          scenarioCount={scenarioCount}
          onSaveDefault={onSaveDefault}
          onSaveScenario={onSaveScenario}
          onEdit={() => onSelectTile("cub")}
        />

        {/* Unified, clickable pipeline (master + stages + execution + output) */}
        <PipelineTiles
          steps={steps}
          running={running}
          accounts={accounts}
          counts={counts}
          activeAgentId={activeAgentId}
          selectedTileId={selectedTileId}
          onSelectTile={onSelectTile}
        />

        {error ? (
          <div className="log-err" role="alert">
            <Icon name="alert" />
            <span>{error}</span>
          </div>
        ) : null}

        <div className="log" ref={logRef}>
          {lines.length === 0 ? (
            <span className="log-empty">
              <span className="blink" />
              Idle. Enter a brief and run an intelligence sweep.
            </span>
          ) : (
            lines.map((ln, i) => (
              <span className={"log-line " + lineClass(ln)} key={i}>
                {ln || " "}
              </span>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

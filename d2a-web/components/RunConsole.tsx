"use client";

import { useEffect, useRef } from "react";
import { AGENTS } from "@/lib/agents";
import type { RunStepState } from "@/lib/types";
import Icon from "./Icon";

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
}: {
  brief: string;
  setBrief: (b: string) => void;
  running: boolean;
  onRun: () => void;
  steps: RunStepState[];
  narration: string;
  error: string;
  activeAgentId: string | null;
}) {
  const logRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [narration]);

  const doneCount = steps.filter((s) => s.status === "done").length;
  const activeCount = steps.filter((s) => s.status === "active").length;
  const pct = Math.round((doneCount / steps.length) * 100);
  // progress fill: count done fully + half-weight the active node for live feel
  const fillPct = Math.round(((doneCount + activeCount * 0.5) / steps.length) * 100);
  const currentStep = Math.min(doneCount + (running ? 1 : 0), steps.length);

  const lines = narration.length ? narration.split("\n") : [];

  return (
    <section className="panel">
      <div className="panel-head">
        <div>
          <div className="panel-title">Intelligence sweep</div>
          <div className="panel-sub">D2A · target account intelligence pipeline</div>
        </div>
        <button className="btn btn-primary" onClick={onRun} disabled={running}>
          {running ? (
            <>
              <span className="spinner" /> Running…
            </>
          ) : (
            <>
              <Icon name="bolt" /> Run sweep
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
          aria-label="Engagement brief"
        />
        <div className="run-actions">
          <span className="run-hint">
            Edit the engagement brief, then run. The agents profile and score live, grounded with web search.
          </span>
        </div>

        <div className={"runstrip" + (running ? " is-running" : "")}>
          <div className="runstrip-head">
            <span className="runstrip-title">Pipeline</span>
            <span className="runstrip-meter">
              step <b>{currentStep}</b> / {steps.length} · {pct}% complete
            </span>
          </div>
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
          <div className="steps">
            {steps.map((s, i) => (
              <div className={"step " + s.status} key={s.id}>
                <span className="step-ix">{s.status === "done" ? "✓" : i + 1}</span>
                <span className="step-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

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
                {ln || " "}
              </span>
            ))
          )}
        </div>

        <div className="agent-grid">
          {AGENTS.map((a) => (
            <div
              className={
                "agent-card" +
                (a.master ? " master" : "") +
                (activeAgentId === a.id ? " active" : "")
              }
              key={a.id}
            >
              <div className="agent-ic">
                <Icon name={a.icon ?? "target"} />
              </div>
              <div>
                <div className="agent-name">{a.name}</div>
                <div className="agent-role">{a.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

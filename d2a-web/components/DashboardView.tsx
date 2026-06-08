"use client";

import type { Account, AbcdClass, RunStepState, View } from "@/lib/types";
import { AGENTS } from "@/lib/agents";
import Icon from "./Icon";

const CLASSES: AbcdClass[] = ["A", "B", "C", "D"];
const CLASS_LABEL: Record<AbcdClass, string> = {
  A: "Pursue",
  B: "Develop",
  C: "Watch",
  D: "Park",
};

export default function DashboardView({
  accounts,
  counts,
  running,
  steps,
  error,
  activeAgentId,
  onNavigate,
  onSelect,
}: {
  accounts: Account[];
  counts: Record<AbcdClass, number> & { total: number };
  running: boolean;
  steps: RunStepState[];
  error: string;
  activeAgentId: string | null;
  onNavigate: (v: View) => void;
  onSelect: (id: string) => void;
}) {
  const hasRun = accounts.length > 0;
  const doneCount = steps.filter((s) => s.status === "done").length;
  const pct = Math.round((doneCount / steps.length) * 100);
  const activeStep = steps.find((s) => s.status === "active");

  // Top pursuits: highest-score A/B accounts as a shortlist.
  const shortlist = [...accounts]
    .filter((a) => a.abcd === "A" || a.abcd === "B")
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const runStatus = running
    ? "Sweep running"
    : error
      ? "Last sweep errored"
      : hasRun
        ? "Sweep complete"
        : "No sweep yet";

  return (
    <section className="panel dash" style={{ animation: "rise 0.5s var(--ease-out) both" }}>
      <div className="panel-head">
        <div>
          <div className="panel-title">Mission overview</div>
          <div className="panel-sub">D2A · target account intelligence at a glance</div>
        </div>
        <button className="btn btn-primary" onClick={() => onNavigate("agents")}>
          <Icon name="bolt" /> Open sweep console
        </button>
      </div>

      <div className="panel-body">
        {!hasRun && !running ? (
          <div className="dash-empty">
            <div className="dash-empty-ic">
              <Icon name="target" />
            </div>
            <div className="dash-empty-title">No intelligence on the board yet</div>
            <p className="dash-empty-copy">
              Run a Target Account Intelligence sweep to build a candidate universe, score it across
              the ABCD model and surface your Class-A pursuits. The dashboard will fill with live
              telemetry the moment a sweep begins.
            </p>
            <button className="btn btn-primary" onClick={() => onNavigate("agents")}>
              <Icon name="play" /> Start your first sweep
            </button>
          </div>
        ) : (
          <>
            {/* ABCD summary tiles */}
            <div className="dash-grid">
              {CLASSES.map((c) => (
                <button
                  key={c}
                  type="button"
                  className="dash-tile"
                  data-abcd={c}
                  onClick={() => onNavigate("pursuit")}
                  aria-label={`Class ${c}, ${counts[c]} accounts`}
                >
                  <span
                    className="dash-gauge"
                    data-abcd={c}
                    style={{
                      ["--p" as string]: counts.total
                        ? Math.round((counts[c] / counts.total) * 100)
                        : 0,
                    }}
                  >
                    <span className="dash-gauge-val">{counts[c]}</span>
                  </span>
                  <div className="dash-tile-meta">
                    <span className="dash-tile-class">Class {c}</span>
                    <span className="dash-tile-action">{CLASS_LABEL[c]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="dash-cols">
              {/* Top pursuits shortlist */}
              <div className="dash-card">
                <div className="dash-card-head">
                  <span className="dash-card-title">
                    <Icon name="target" /> Top pursuits
                  </span>
                  <button className="dash-link" onClick={() => onNavigate("pursuit")}>
                    View board →
                  </button>
                </div>
                {shortlist.length === 0 ? (
                  <div className="dash-note">
                    No Class A or B accounts in the current board. The sweep parked everything in C/D
                    — refine the brief in the sweep console and run again.
                  </div>
                ) : (
                  <div className="dash-shortlist">
                    {shortlist.map((a) => (
                      <button
                        key={a.id}
                        className="dash-row"
                        data-abcd={a.abcd}
                        onClick={() => onSelect(a.id)}
                        aria-label={`Inspect ${a.name}, score ${a.score}`}
                      >
                        <span className="gauge" data-abcd={a.abcd} style={{ ["--p" as string]: a.score }}>
                          <span className="gauge-val">{a.score}</span>
                        </span>
                        <span className="dash-row-body">
                          <span className="dash-row-name">{a.name}</span>
                          <span className="dash-row-meta">{a.sector}</span>
                        </span>
                        <span className="pill" data-abcd={a.abcd}>
                          {a.abcd}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Run status + pipeline at a glance */}
              <div className="dash-card">
                <div className="dash-card-head">
                  <span className="dash-card-title">
                    <Icon name="bolt" /> Last run
                  </span>
                  <span className={"dash-status" + (running ? " live" : "")}>
                    <span className="dash-status-dot" /> {runStatus}
                  </span>
                </div>

                <div className="dash-stats">
                  <div className="dash-stat">
                    <div className="dash-stat-val">{counts.total}</div>
                    <div className="dash-stat-label">accounts</div>
                  </div>
                  <div className="dash-stat">
                    <div className="dash-stat-val">{pct}%</div>
                    <div className="dash-stat-label">pipeline</div>
                  </div>
                  <div className="dash-stat">
                    <div className="dash-stat-val">{counts.A}</div>
                    <div className="dash-stat-label">class A</div>
                  </div>
                </div>

                <div className="dash-pipeline">
                  {steps.map((s) => (
                    <span
                      key={s.id}
                      className={"dash-node " + s.status}
                      title={`${s.label} · ${s.status}`}
                    />
                  ))}
                </div>
                <div className="dash-pipeline-cap">
                  {running && activeStep
                    ? `Active stage · ${activeStep.label}`
                    : hasRun
                      ? "All nine stages complete"
                      : "Pipeline idle"}
                </div>
              </div>
            </div>

            {/* Agent status strip */}
            <div className="dash-card">
              <div className="dash-card-head">
                <span className="dash-card-title">
                  <Icon name="agents" /> Agent roster
                </span>
                <button className="dash-link" onClick={() => onNavigate("agents")}>
                  Open console →
                </button>
              </div>
              <div className="dash-agents">
                {AGENTS.map((a) => (
                  <span
                    key={a.id}
                    className={
                      "dash-agent" +
                      (a.master ? " master" : "") +
                      (activeAgentId === a.id ? " active" : "")
                    }
                    title={a.role}
                  >
                    <Icon name={a.icon ?? "target"} />
                    {a.name}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

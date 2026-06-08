"use client";

import Icon from "./Icon";

const LAYERS = [
  {
    icon: "pursuit" as const,
    title: "Pursuit memory",
    status: "Roadmap",
    copy: "Every sweep, ABCD verdict and analyst note retained per account, so a re-run inherits prior context instead of starting cold.",
  },
  {
    icon: "audit" as const,
    title: "Evidence ledger",
    status: "Roadmap",
    copy: "A durable claim ↔ source ↔ confidence trail across runs — stale citations age out, contested claims get flagged on the next pass.",
  },
  {
    icon: "route" as const,
    title: "Relationship graph",
    status: "Roadmap",
    copy: "Executive buyers, trigger events and wedges linked over time, surfacing patterns the single-run view can't see.",
  },
];

export default function MemoryView() {
  return (
    <section className="panel" style={{ animation: "rise 0.5s var(--ease-out) both" }}>
      <div className="panel-head">
        <div>
          <div className="panel-title">Agent memory</div>
          <div className="panel-sub">D2A · persistent intelligence layer</div>
        </div>
        <span className="info-flag">
          <span className="info-flag-dot" /> Coming online
        </span>
      </div>

      <div className="panel-body">
        <div className="mem-hero">
          <div className="mem-hero-ic">
            <Icon name="memory" />
          </div>
          <div>
            <h3 className="mem-hero-title">Memory turns every sweep into compounding intelligence</h3>
            <p className="mem-hero-copy">
              Today each D2A sweep is stateless — it researches, scores and packages a pursuit board
              from the brief alone. The memory layer makes the OS <em>remember</em>: accounts,
              evidence and executive relationships persist between runs, so the system gets sharper
              the more you use it. This is an informational preview of what's being wired in.
            </p>
          </div>
        </div>

        <div className="mem-grid">
          {LAYERS.map((l, i) => (
            <div className="mem-card" key={l.title} style={{ animationDelay: `${0.06 * i}s` }}>
              <div className="mem-card-top">
                <span className="mem-card-ic">
                  <Icon name={l.icon} />
                </span>
                <span className="mem-badge">{l.status}</span>
              </div>
              <div className="mem-card-title">{l.title}</div>
              <p className="mem-card-copy">{l.copy}</p>
            </div>
          ))}
        </div>

        <div className="mem-note">
          <Icon name="alert" />
          <span>
            Memory persistence is not active in this demo build — sweeps remain stateless and nothing
            is stored between sessions. The layers above describe the roadmap.
          </span>
        </div>
      </div>
    </section>
  );
}

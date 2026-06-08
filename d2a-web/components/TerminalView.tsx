"use client";

import { useEffect, useMemo, useRef } from "react";
import Icon from "./Icon";

type EventKind = "step" | "web" | "info";

// Derive a timestamped event log from the raw narration. This is purely
// presentational — it reads the same `narration` string the parse logic uses
// and never mutates it.
function deriveEvents(narration: string): { t: string; kind: EventKind; text: string }[] {
  if (!narration.trim()) return [];
  const base = Date.now();
  const lines = narration.split("\n").filter((l) => l.trim().length > 0);
  return lines.map((line, i) => {
    const t = line.trim();
    let kind: EventKind = "info";
    if (/STEP\s+\d\s*\/\s*9/i.test(t)) kind = "step";
    else if (/^\[web\]|web[_\s]search|searching|query:/i.test(t)) kind = "web";
    // Synthetic, monotonic timestamps so the log reads like a real console.
    const ts = new Date(base + i * 900);
    const stamp = ts.toLocaleTimeString("en-GB", { hour12: false });
    return { t: stamp, kind, text: t };
  });
}

export default function TerminalView({
  narration,
  running,
}: {
  narration: string;
  running: boolean;
}) {
  const events = useMemo(() => deriveEvents(narration), [narration]);
  const rawRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    rawRef.current?.scrollTo({ top: rawRef.current.scrollHeight });
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [narration]);

  const hasOutput = narration.trim().length > 0;

  return (
    <section className="panel" style={{ animation: "rise 0.5s var(--ease-out) both" }}>
      <div className="panel-head">
        <div>
          <div className="panel-title">Terminal</div>
          <div className="panel-sub">D2A · raw run stream &amp; event log</div>
        </div>
        <span className={"info-flag" + (running ? " live" : "")}>
          <span className="info-flag-dot" /> {running ? "streaming" : "read-only"}
        </span>
      </div>

      <div className="panel-body">
        <div className="term-cols">
          {/* Raw narration stream */}
          <div className="term-pane">
            <div className="term-pane-head">
              <span className="term-dots">
                <i /> <i /> <i />
              </span>
              <span className="term-pane-title">d2a@sweep — narration</span>
            </div>
            <div className="term-console" ref={rawRef}>
              {hasOutput ? (
                <pre className="term-raw">{narration}</pre>
              ) : (
                <span className="term-idle">
                  <span className="term-cursor" /> idle — run a sweep from the Agents console to
                  stream output here
                </span>
              )}
            </div>
          </div>

          {/* Timestamped event log */}
          <div className="term-pane">
            <div className="term-pane-head">
              <span className="term-pane-title alt">event log</span>
              <span className="term-count">{events.length} events</span>
            </div>
            <div className="term-console" ref={logRef}>
              {events.length === 0 ? (
                <span className="term-idle">
                  <span className="term-cursor" /> no events yet
                </span>
              ) : (
                events.map((e, i) => (
                  <div className={"term-evt " + e.kind} key={i}>
                    <span className="term-ts">{e.t}</span>
                    <span className="term-kind">
                      {e.kind === "step" ? (
                        <Icon name="bolt" />
                      ) : e.kind === "web" ? (
                        <Icon name="link" />
                      ) : (
                        <Icon name="terminal" />
                      )}
                    </span>
                    <span className="term-msg">{e.text}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

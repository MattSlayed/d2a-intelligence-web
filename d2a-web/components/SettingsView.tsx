"use client";

import { useState } from "react";
import { BRIEF_PRESETS } from "@/lib/catalog";
import Icon from "./Icon";

export default function SettingsView({
  brief,
  setBrief,
  modelLabel,
  running,
}: {
  brief: string;
  setBrief: (b: string) => void;
  modelLabel: string;
  running: boolean;
}) {
  // Purely client-side density toggle — drives a data attribute on the view root.
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");

  const activePreset = BRIEF_PRESETS.find((p) => p.brief.trim() === brief.trim());

  return (
    <section
      className="panel"
      data-density={density}
      style={{ animation: "rise 0.5s var(--ease-out) both" }}
    >
      <div className="panel-head">
        <div>
          <div className="panel-title">Settings</div>
          <div className="panel-sub">D2A · engagement &amp; console configuration</div>
        </div>
      </div>

      <div className="panel-body set-body">
        {/* Engagement brief presets — LIVE */}
        <div className="set-block">
          <div className="set-block-head">
            <span className="set-block-title">
              <Icon name="target" /> Engagement-brief presets
            </span>
            <span className="set-tag live">Live</span>
          </div>
          <p className="set-block-copy">
            Swap the active engagement brief used by the next sweep. Selecting a preset updates the
            brief in the sweep console immediately.
          </p>
          <div className="set-presets">
            {BRIEF_PRESETS.map((p) => {
              const active = activePreset?.id === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  className={"set-preset" + (active ? " active" : "")}
                  onClick={() => setBrief(p.brief)}
                  disabled={running}
                  aria-pressed={active}
                >
                  <span className="set-preset-top">
                    <span className="set-preset-label">{p.label}</span>
                    {active ? <span className="set-preset-check">active</span> : null}
                  </span>
                  <span className="set-preset-hint">{p.hint}</span>
                </button>
              );
            })}
          </div>
          {running ? (
            <div className="set-inline-note">Presets are locked while a sweep is running.</div>
          ) : null}
        </div>

        {/* Density toggle — LIVE, client-side only */}
        <div className="set-block">
          <div className="set-block-head">
            <span className="set-block-title">
              <Icon name="dashboard" /> Layout density
            </span>
            <span className="set-tag live">Live</span>
          </div>
          <p className="set-block-copy">
            A client-side display preference for this view. Does not affect the sweep.
          </p>
          <div className="set-seg" role="group" aria-label="Layout density">
            {(["comfortable", "compact"] as const).map((d) => (
              <button
                key={d}
                type="button"
                className={"set-seg-btn" + (density === d ? " active" : "")}
                onClick={() => setDensity(d)}
                aria-pressed={density === d}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Current config — DISPLAY ONLY */}
        <div className="set-block">
          <div className="set-block-head">
            <span className="set-block-title">
              <Icon name="settings" /> Current configuration
            </span>
            <span className="set-tag display">Display only</span>
          </div>
          <p className="set-block-copy">
            These are set server-side for this deployment and shown for reference.
          </p>
          <div className="set-config">
            <div className="set-config-row">
              <span className="set-config-key">Model</span>
              <span className="set-config-val">{modelLabel}</span>
            </div>
            <div className="set-config-row">
              <span className="set-config-key">Web search</span>
              <span className="set-config-val">
                <span className="set-dot on" /> Enabled (server-set)
              </span>
            </div>
            <div className="set-config-row">
              <span className="set-config-key">Run flow</span>
              <span className="set-config-val">Two-pass · research → scoring</span>
            </div>
            <div className="set-config-row">
              <span className="set-config-key">Build</span>
              <span className="set-config-val">D2A · 2026.06 · Vercel</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

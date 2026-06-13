"use client";

import { useState } from "react";
import type { Account, AbcdClass, RunStepState } from "@/lib/types";
import type { RunConfig } from "@/lib/runConfig";
import { ABCD_LABEL } from "@/lib/abcd";
import { tileConfigFor } from "@/lib/tileConfig";
import { AGENT_BY_ID } from "@/lib/agents";
import TileInspector from "./TileInspector";
import Icon from "./Icon";

type Counts = Record<AbcdClass, number> & { total: number };

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").split("/")[0] || url;
  }
}

export default function Inspector({
  account,
  tileAgentId,
  runConfig,
  onUpdateConfig,
  steps,
  counts,
  accounts,
  innerRef,
  focused,
  open,
  onClose,
}: {
  account: Account | null;
  tileAgentId: string | null;
  runConfig: RunConfig;
  onUpdateConfig: (patch: Partial<RunConfig>) => void;
  steps: RunStepState[];
  counts: Counts;
  accounts: Account[];
  innerRef?: React.Ref<HTMLElement>;
  /** transient attention pulse (sidebar Inspector button) */
  focused?: boolean;
  /** persistent reveal of the rail as an overlay on narrow screens */
  open?: boolean;
  onClose?: () => void;
}) {
  const [tab, setTab] = useState<"brief" | "evidence">("brief");

  const tile = tileConfigFor(tileAgentId);
  const mode: "tile" | "account" | "empty" = tile ? "tile" : account ? "account" : "empty";
  const tileIcon = tile ? AGENT_BY_ID[tile.agentId]?.icon ?? "orchestrator" : "orchestrator";

  return (
    <aside
      className={"inspector" + (focused ? " focused" : "") + (open ? " open" : "")}
      ref={innerRef}
      aria-label={mode === "tile" ? "Agent configuration" : "Account inspector"}
    >
      <div className="insp-head">
        <div className="insp-head-row">
          {mode === "account" && account ? (
            <span
              className="insp-gauge"
              data-abcd={account.abcd}
              style={{ ["--p" as string]: account.score }}
            >
              <span className="insp-gauge-val">{account.score}</span>
            </span>
          ) : mode === "tile" ? (
            <span className={"insp-tile-ic" + (tile?.gated ? " gated" : "")}>
              <Icon name={tileIcon} />
            </span>
          ) : null}
          <div style={{ minWidth: 0, flex: 1 }}>
            {mode === "tile" && tile ? (
              <div className="insp-kicker">
                {tile.gated ? "Gated stage" : tile.agentId === "d2a" ? "Master control" : "Pipeline stage"}
              </div>
            ) : null}
            <div className="insp-title">
              {mode === "tile" && tile ? tile.displayName : account ? account.name : "Inspector"}
            </div>
            <div className="insp-sub">
              {mode === "tile" && tile
                ? tile.subtitle
                : account
                  ? `${account.sector} · score ${account.score}/100`
                  : "Select a stage or an account"}
            </div>
          </div>
          {onClose ? (
            <button className="insp-x" onClick={onClose} aria-label="Close inspector">
              <Icon name="close" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Account mode keeps its Brief / Evidence tabs; tile mode has none. */}
      {mode === "account" && account ? (
        <div className="insp-tabs">
          <button
            className={"itab" + (tab === "brief" ? " active" : "")}
            onClick={() => setTab("brief")}
            aria-pressed={tab === "brief"}
          >
            BRIEF
          </button>
          <button
            className={"itab" + (tab === "evidence" ? " active" : "")}
            onClick={() => setTab("evidence")}
            aria-pressed={tab === "evidence"}
          >
            EVIDENCE
            {account.evidence.length ? ` · ${account.evidence.length}` : ""}
          </button>
        </div>
      ) : null}

      <div className="insp-body" key={mode + (tile?.agentId ?? account?.id ?? "") + tab}>
        {mode === "tile" && tile ? (
          <TileInspector
            tile={tile}
            runConfig={runConfig}
            onUpdateConfig={onUpdateConfig}
            steps={steps}
            counts={counts}
            accounts={accounts}
          />
        ) : mode === "empty" ? (
          <div className="insp-empty">
            <div className="insp-empty-ic">
              <Icon name="inspector" />
            </div>
            Click any pipeline stage to inspect and configure it, or run a sweep and select an
            account on the pursuit board to see its brief and evidence.
          </div>
        ) : account && tab === "brief" ? (
          <>
            <div className="bf hero">
              <span
                className="insp-gauge"
                data-abcd={account.abcd}
                style={{ ["--p" as string]: account.score }}
              >
                <span className="insp-gauge-val">{account.score}</span>
              </span>
              <div className="bf-body">
                <span className="pill" data-abcd={account.abcd}>
                  {ABCD_LABEL[account.abcd]}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)" }}>
                  pursuit score {account.score} / 100
                </span>
              </div>
            </div>
            <div className="bf">
              <div className="bf-label">
                <Icon name="trigger" /> Trigger
              </div>
              <div className="bf-val">{account.trigger}</div>
            </div>
            <div className="bf">
              <div className="bf-label">
                <Icon name="route" /> Executive route
              </div>
              <div className="bf-val">{account.buyer}</div>
            </div>
            <div className="bf">
              <div className="bf-label">
                <Icon name="wedge" /> First wedge
              </div>
              <div className="bf-val">{account.wedge}</div>
            </div>
            <div className="bf">
              <div className="bf-label">
                <Icon name="score" /> Rationale
              </div>
              <div className="bf-val">{account.rationale}</div>
            </div>
          </>
        ) : account ? (
          <>
            {account.evidence.length === 0 ? (
              <div className="insp-empty">
                <div className="insp-empty-ic">
                  <Icon name="audit" />
                </div>
                No evidence captured for this account.
              </div>
            ) : (
              account.evidence.map((e, i) => (
                <div className="ev-item" key={i} style={{ animationDelay: `${Math.min(i * 0.05, 0.4)}s` }}>
                  <div className="ev-claim">{e.claim}</div>
                  <div className="ev-foot">
                    {e.confidence ? (
                      <span className={"ev-conf " + e.confidence}>{e.confidence}</span>
                    ) : null}
                    {e.url ? (
                      <a className="ev-src" href={e.url} target="_blank" rel="noreferrer" title={e.url}>
                        <Icon name="link" />
                        <span>{hostOf(e.url)}</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              ))
            )}
          </>
        ) : null}
      </div>
    </aside>
  );
}

"use client";

import { useState } from "react";
import type { Account } from "@/lib/types";
import Icon from "./Icon";

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").split("/")[0] || url;
  }
}

export default function Inspector({
  account,
  innerRef,
  focused,
}: {
  account: Account | null;
  innerRef?: React.Ref<HTMLElement>;
  focused?: boolean;
}) {
  const [tab, setTab] = useState<"brief" | "evidence">("brief");

  return (
    <aside className={"inspector" + (focused ? " focused" : "")} ref={innerRef}>
      <div className="insp-head">
        <div className="insp-head-row">
          {account ? (
            <span className="insp-gauge" data-abcd={account.abcd} style={{ ["--p" as string]: account.score }}>
              <span className="insp-gauge-val">{account.score}</span>
            </span>
          ) : null}
          <div style={{ minWidth: 0 }}>
            <div className="insp-title">{account ? account.name : "Inspector"}</div>
            <div className="insp-sub">
              {account ? `${account.sector} · score ${account.score}/100` : "Select an account"}
            </div>
          </div>
        </div>
      </div>
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
          {account && account.evidence.length ? ` · ${account.evidence.length}` : ""}
        </button>
      </div>
      <div className="insp-body" key={tab}>
        {!account ? (
          <div className="insp-empty">
            <div className="insp-empty-ic">
              <Icon name="inspector" />
            </div>
            No account selected. Run a sweep, then click any account on the pursuit board to inspect
            its brief and the evidence behind its score.
          </div>
        ) : tab === "brief" ? (
          <>
            <div className="bf hero">
              <span className="insp-gauge" data-abcd={account.abcd} style={{ ["--p" as string]: account.score }}>
                <span className="insp-gauge-val">{account.score}</span>
              </span>
              <div className="bf-body">
                <span className="pill" data-abcd={account.abcd}>
                  CLASS {account.abcd}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)" }}>
                  pursuit score {account.score} / 100
                </span>
              </div>
            </div>
            <div className="bf">
              <div className="bf-label"><Icon name="trigger" /> Trigger</div>
              <div className="bf-val">{account.trigger}</div>
            </div>
            <div className="bf">
              <div className="bf-label"><Icon name="route" /> Executive route</div>
              <div className="bf-val">{account.buyer}</div>
            </div>
            <div className="bf">
              <div className="bf-label"><Icon name="wedge" /> First wedge</div>
              <div className="bf-val">{account.wedge}</div>
            </div>
            <div className="bf">
              <div className="bf-label"><Icon name="score" /> Rationale</div>
              <div className="bf-val">{account.rationale}</div>
            </div>
          </>
        ) : (
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
        )}
      </div>
    </aside>
  );
}

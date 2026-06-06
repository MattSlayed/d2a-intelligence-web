"use client";

import { useState } from "react";
import type { Account } from "@/lib/types";

export default function Inspector({ account }: { account: Account | null }) {
  const [tab, setTab] = useState<"brief" | "evidence">("brief");

  return (
    <aside className="inspector">
      <div className="insp-head">
        <div className="insp-title">{account ? account.name : "Inspector"}</div>
        <div className="insp-sub">
          {account ? `${account.sector} · score ${account.score}/100` : "Select an account"}
        </div>
      </div>
      <div className="insp-tabs">
        <span className={"itab" + (tab === "brief" ? " active" : "")} onClick={() => setTab("brief")}>
          BRIEF
        </span>
        <span
          className={"itab" + (tab === "evidence" ? " active" : "")}
          onClick={() => setTab("evidence")}
        >
          EVIDENCE
        </span>
      </div>
      <div className="insp-body">
        {!account ? (
          <div className="insp-empty">
            No account selected. Run a sweep, then click any account on the pursuit board to inspect
            its brief and the evidence behind its score.
          </div>
        ) : tab === "brief" ? (
          <>
            <div className="bf">
              <div className="bf-label">Class</div>
              <div className="bf-val">
                <span className="pill" data-abcd={account.abcd}>
                  CLASS {account.abcd}
                </span>
                &nbsp; {account.score}/100
              </div>
            </div>
            <div className="bf">
              <div className="bf-label">Trigger</div>
              <div className="bf-val">{account.trigger}</div>
            </div>
            <div className="bf">
              <div className="bf-label">Executive route</div>
              <div className="bf-val">{account.buyer}</div>
            </div>
            <div className="bf">
              <div className="bf-label">First wedge</div>
              <div className="bf-val">{account.wedge}</div>
            </div>
            <div className="bf">
              <div className="bf-label">Rationale</div>
              <div className="bf-val">{account.rationale}</div>
            </div>
          </>
        ) : (
          <>
            {account.evidence.length === 0 ? (
              <div className="insp-empty">No evidence captured for this account.</div>
            ) : (
              account.evidence.map((e, i) => (
                <div className="ev-item" key={i}>
                  <div className="ev-claim">{e.claim}</div>
                  {e.url ? (
                    <div className="ev-src">
                      <a href={e.url} target="_blank" rel="noreferrer">
                        {e.url}
                      </a>
                    </div>
                  ) : null}
                  {e.confidence ? (
                    <span className={"ev-conf " + e.confidence}>{e.confidence} confidence</span>
                  ) : null}
                </div>
              ))
            )}
          </>
        )}
      </div>
    </aside>
  );
}

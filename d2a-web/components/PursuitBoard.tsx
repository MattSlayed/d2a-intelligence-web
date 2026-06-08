"use client";

import type { Account, AbcdClass } from "@/lib/types";
import Icon from "./Icon";

const CLASSES: AbcdClass[] = ["A", "B", "C", "D"];
const LABEL: Record<AbcdClass, string> = {
  A: "Class A · Pursue",
  B: "Class B · Develop",
  C: "Class C · Watch",
  D: "Class D · Park",
};
// action verb derived from LABEL (kept consistent with the original map)
const ACTION: Record<AbcdClass, string> = {
  A: "Pursue now",
  B: "Develop",
  C: "Watch",
  D: "Park",
};

export default function PursuitBoard({
  accounts,
  filter,
  setFilter,
  selectedId,
  onSelect,
  counts,
}: {
  accounts: Account[];
  filter: "ALL" | AbcdClass;
  setFilter: (f: "ALL" | AbcdClass) => void;
  selectedId: string | null;
  onSelect: (id: string) => void;
  counts: Record<AbcdClass, number> & { total: number };
}) {
  const visibleClasses = filter === "ALL" ? CLASSES : [filter];

  return (
    <section className="panel">
      <div className="panel-head" style={{ flexDirection: "column", alignItems: "stretch" }}>
        <div>
          <div className="panel-title">Pursuit board</div>
          <div className="panel-sub">ABCD classification · {counts.total} accounts</div>
        </div>
        <div className="board-head" style={{ marginTop: 14 }}>
          <div className="counters">
            {CLASSES.map((c) => (
              <div className="counter" data-abcd={c} key={c}>
                <div className="counter-val">{counts[c]}</div>
                <div className="counter-label">CLASS {c}</div>
              </div>
            ))}
          </div>
          <div className="filters" role="tablist" aria-label="Filter by class">
            {(["ALL", ...CLASSES] as const).map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                className={"filter" + (filter === f ? " active" : "")}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="panel-body">
        {accounts.length === 0 ? (
          <div className="insp-empty">
            <div className="insp-empty-ic">
              <Icon name="pursuit" />
            </div>
            No accounts yet. Run an intelligence sweep to populate the board.
          </div>
        ) : (
          <div
            className="board"
            style={{ gridTemplateColumns: `repeat(${visibleClasses.length}, minmax(0, 1fr))` }}
          >
            {visibleClasses.map((c) => {
              const list = accounts.filter((a) => a.abcd === c);
              return (
                <div className="col" data-abcd={c} key={c}>
                  <div className="col-head">
                    <span className="col-chip" />
                    <div style={{ display: "flex", flexDirection: "column", gap: 1, minWidth: 0 }}>
                      <span className="col-title">{LABEL[c].split(" · ")[0]}</span>
                      <span className="col-action">{ACTION[c]}</span>
                    </div>
                    <span className="col-count">{list.length}</span>
                  </div>
                  <div className="col-list">
                    {list.length === 0 ? (
                      <div className="col-empty">No accounts in this class</div>
                    ) : (
                      list.map((a, idx) => {
                        const hint = a.trigger && a.trigger !== "—" ? a.trigger : a.buyer;
                        return (
                          <button
                            key={a.id}
                            data-abcd={a.abcd}
                            className={"acc" + (selectedId === a.id ? " selected" : "")}
                            style={{ animationDelay: `${Math.min(idx * 0.04, 0.4)}s` }}
                            onClick={() => onSelect(a.id)}
                            aria-label={`${a.name}, score ${a.score} of 100`}
                          >
                            <span
                              className="gauge"
                              style={{ ["--p" as string]: a.score }}
                            >
                              <span className="gauge-val">{a.score}</span>
                            </span>
                            <span className="acc-body">
                              <span className="acc-name">{a.name}</span>
                              <span className="acc-meta">{a.sector}</span>
                              {hint && hint !== "—" ? (
                                <span className="acc-hint">
                                  <Icon name="trigger" />
                                  {hint}
                                </span>
                              ) : null}
                            </span>
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

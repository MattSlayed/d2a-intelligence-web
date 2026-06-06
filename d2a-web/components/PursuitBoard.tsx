"use client";

import type { Account, AbcdClass } from "@/lib/types";

const CLASSES: AbcdClass[] = ["A", "B", "C", "D"];
const LABEL: Record<AbcdClass, string> = {
  A: "Class A · Pursue",
  B: "Class B · Develop",
  C: "Class C · Watch",
  D: "Class D · Park",
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
        <div className="board-head" style={{ marginTop: 12 }}>
          <div className="counters">
            {CLASSES.map((c) => (
              <div className="counter" data-abcd={c} key={c}>
                <div className="counter-val">{counts[c]}</div>
                <div className="counter-label">CLASS {c}</div>
              </div>
            ))}
          </div>
          <div className="filters">
            {(["ALL", ...CLASSES] as const).map((f) => (
              <button
                key={f}
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
                    <span className="col-title">{LABEL[c]}</span>
                    <span className="col-count">{list.length}</span>
                  </div>
                  <div className="col-list">
                    {list.length === 0 ? (
                      <div className="col-empty">—</div>
                    ) : (
                      list.map((a) => (
                        <button
                          key={a.id}
                          className={"acc" + (selectedId === a.id ? " selected" : "")}
                          onClick={() => onSelect(a.id)}
                        >
                          <span className="acc-name">{a.name}</span>
                          <span className="acc-row">
                            <span className="acc-meta">{a.sector}</span>
                            <span className="acc-score">{a.score}</span>
                          </span>
                        </button>
                      ))
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

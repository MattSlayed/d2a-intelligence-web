"use client";

import { useMemo, useState } from "react";
import Sidebar from "@/components/Sidebar";
import RunConsole from "@/components/RunConsole";
import PursuitBoard from "@/components/PursuitBoard";
import Inspector from "@/components/Inspector";
import ChatDock from "@/components/ChatDock";
import Icon from "@/components/Icon";
import { PIPELINE } from "@/lib/agents";
import { DEFAULT_BRIEF } from "@/lib/prompts";
import type { Account, AbcdClass, ChatMessage, RunStepState } from "@/lib/types";

const MODEL_LABEL = "Claude · Messages API + web search";

function freshSteps(): RunStepState[] {
  return PIPELINE.map((p) => ({ id: p.id, label: p.label, agentId: p.agentId, status: "idle" }));
}

function highestStep(raw: string): number {
  let k = 0;
  const re = /STEP\s+(\d)\s*\/\s*9/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw)) !== null) {
    const n = parseInt(m[1], 10);
    if (n > k) k = n;
  }
  return k;
}

function stripJson(raw: string): string {
  const idx = raw.indexOf("```json");
  const cut = idx >= 0 ? raw.slice(0, idx) : raw;
  return cut.replace(/```[a-z]*\s*$/i, "").trim();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sanitise(arr: any[]): Account[] {
  const ok: AbcdClass[] = ["A", "B", "C", "D"];
  return arr.filter(Boolean).map((a, i) => ({
    id: String(a.id ?? `acct-${i}`),
    name: String(a.name ?? "Unknown"),
    sector: String(a.sector ?? "—"),
    abcd: (ok.includes(a.abcd) ? a.abcd : "D") as AbcdClass,
    score: Math.max(0, Math.min(100, Number(a.score) || 0)),
    trigger: String(a.trigger ?? "—"),
    buyer: String(a.buyer ?? "—"),
    wedge: String(a.wedge ?? "—"),
    rationale: String(a.rationale ?? ""),
    evidence: Array.isArray(a.evidence)
      ? a.evidence
          .filter(Boolean)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((e: any) => ({
            claim: String(e.claim ?? ""),
            url: String(e.url ?? ""),
            confidence: e.confidence,
          }))
      : [],
  }));
}

function tryParseAccounts(txt: string): Account[] | null {
  const t = txt.trim();
  try {
    const o = JSON.parse(t);
    if (Array.isArray(o?.accounts)) return sanitise(o.accounts);
  } catch {
    /* fall through to repair */
  }
  // Repair a truncated array: keep up to the last complete object, then close it.
  const lastObj = t.lastIndexOf("}");
  if (lastObj > 0) {
    const repaired = t.slice(0, lastObj + 1).replace(/,\s*$/, "") + "]}";
    try {
      const o = JSON.parse(repaired);
      if (Array.isArray(o?.accounts)) return sanitise(o.accounts);
    } catch {
      /* give up */
    }
  }
  return null;
}

function extractAccounts(raw: string): Account[] | null {
  // 1) closed fenced ```json blocks (prefer the last one that mentions accounts)
  const blocks = [...raw.matchAll(/```(?:json)?\s*([\s\S]*?)```/g)].map((m) => m[1]);
  for (let i = blocks.length - 1; i >= 0; i--) {
    if (!blocks[i].includes("accounts")) continue;
    const p = tryParseAccounts(blocks[i]);
    if (p) return p;
  }
  // 2) unclosed/truncated fence or bare object: take from the last "accounts" region to the end
  const at = raw.lastIndexOf('"accounts"');
  if (at >= 0) {
    const start = raw.lastIndexOf("{", at);
    if (start >= 0) {
      const tail = raw.slice(start).replace(/```[\s\S]*$/, "");
      const p = tryParseAccounts(tail);
      if (p) return p;
    }
  }
  return null;
}

export default function Page() {
  const [brief, setBrief] = useState(DEFAULT_BRIEF);
  const [running, setRunning] = useState(false);
  const [steps, setSteps] = useState<RunStepState[]>(freshSteps());
  const [narration, setNarration] = useState("");
  const [runError, setRunError] = useState("");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [filter, setFilter] = useState<"ALL" | AbcdClass>("ALL");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatBusy, setChatBusy] = useState(false);

  const counts = useMemo(() => {
    const c = { A: 0, B: 0, C: 0, D: 0, total: accounts.length } as Record<AbcdClass, number> & {
      total: number;
    };
    for (const a of accounts) c[a.abcd]++;
    return c;
  }, [accounts]);

  const selected = useMemo(
    () => accounts.find((a) => a.id === selectedId) ?? null,
    [accounts, selectedId],
  );

  const activeAgentId = useMemo(() => {
    const active = steps.find((s) => s.status === "active");
    if (active) return active.agentId;
    return running ? "d2a" : null;
  }, [steps, running]);

  async function onRun() {
    if (running) return;
    setRunning(true);
    setRunError("");
    setNarration("");
    setAccounts([]);
    setSelectedId(null);
    setSteps(freshSteps());
    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief }),
      });
      if (!res.ok || !res.body) throw new Error(`Request failed (${res.status})`);
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let raw = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        raw += dec.decode(value, { stream: true });
        const k = highestStep(raw);
        if (k > 0) {
          setSteps((prev) =>
            prev.map((s, i) => ({
              ...s,
              status: i < k - 1 ? "done" : i === k - 1 ? "active" : "idle",
            })),
          );
        }
        setNarration(stripJson(raw));
      }
      const parsed = extractAccounts(raw);
      const errMatch = raw.match(/ERROR:\s*(.+)/);
      if (parsed && parsed.length) {
        setAccounts(parsed);
        setSteps((prev) => prev.map((s) => ({ ...s, status: "done" })));
      } else if (errMatch) {
        setRunError(errMatch[1].trim());
      } else {
        setRunError("The sweep finished but no pursuit board could be parsed. See the narration above.");
      }
    } catch (e) {
      setRunError(String((e as Error)?.message ?? e));
    } finally {
      setRunning(false);
    }
  }

  async function onSend(text: string) {
    if (chatBusy) return;
    const next: ChatMessage[] = [...chatMessages, { role: "user", content: text }];
    setChatMessages([...next, { role: "assistant", content: "" }]);
    setChatBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, account: selected?.name }),
      });
      if (!res.ok || !res.body) throw new Error(`Request failed (${res.status})`);
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setChatMessages((m) => {
          const c = [...m];
          c[c.length - 1] = { role: "assistant", content: acc };
          return c;
        });
      }
    } catch (e) {
      setChatMessages((m) => {
        const c = [...m];
        c[c.length - 1] = { role: "assistant", content: "Error: " + String((e as Error)?.message ?? e) };
        return c;
      });
    } finally {
      setChatBusy(false);
    }
  }

  return (
    <div className="app">
      <Sidebar counts={counts} onOpenChat={() => setChatOpen(true)} />

      <header className={"topbar" + (running ? " running" : "")}>
        <div className="crumb">
          <span>NOVATEK Agentic OS</span>
          <span className="sep">/</span>
          <span>D2A</span>
          <span className="sep">/</span>
          <span className="here">Target Account Intelligence</span>
        </div>
        <div className="top-right">
          <div className="stat live">
            <span className={"dot" + (running ? "" : " idle")} /> {running ? "sweep running" : "idle"}
          </div>
          <div className="stat">{MODEL_LABEL}</div>
          <button className="btn" onClick={() => setChatOpen(true)} aria-label="Open analyst chat">
            <Icon name="chat" /> Chat
          </button>
        </div>
      </header>

      <main className="main">
        <RunConsole
          brief={brief}
          setBrief={setBrief}
          running={running}
          onRun={onRun}
          steps={steps}
          narration={narration}
          error={runError}
          activeAgentId={activeAgentId}
        />
        <PursuitBoard
          accounts={accounts}
          filter={filter}
          setFilter={setFilter}
          selectedId={selectedId}
          onSelect={(id) => setSelectedId(id)}
          counts={counts}
        />
      </main>

      <Inspector account={selected} />

      <ChatDock
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        messages={chatMessages}
        onSend={onSend}
        busy={chatBusy}
        accountName={selected?.name}
      />
    </div>
  );
}

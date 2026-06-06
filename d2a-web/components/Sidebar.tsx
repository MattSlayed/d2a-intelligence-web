"use client";

import { AGENTS } from "@/lib/agents";
import type { AbcdClass } from "@/lib/types";

export default function Sidebar({
  counts,
  onOpenChat,
}: {
  counts: Record<AbcdClass, number> & { total: number };
  onOpenChat: () => void;
}) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">D2A</div>
        <div className="brand-text">
          <div className="wordmark">
            <span className="nova">NOVA</span>
            <span className="tek">TEK</span>
          </div>
          <div className="brand-sub">Agentic OS</div>
        </div>
      </div>

      <nav className="nav-group">
        <div className="nav-head">Workspace</div>
        <div className="nav-item">
          <span className="nav-ico">▦</span> Dashboard
        </div>
        <div className="nav-item active">
          <span className="nav-ico">◈</span> Agents <span className="nav-badge">{AGENTS.length}</span>
        </div>
        <div className="nav-item" style={{ cursor: "pointer" }} onClick={onOpenChat}>
          <span className="nav-ico">▶</span> Chat
        </div>
        <div className="nav-item">
          <span className="nav-ico">▤</span> Pursuit <span className="nav-badge">{counts.total}</span>
        </div>
      </nav>

      <nav className="nav-group">
        <div className="nav-head">Intelligence</div>
        <div className="nav-item"><span className="nav-ico">◯</span> Memory</div>
        <div className="nav-item"><span className="nav-ico">⌖</span> Inspector</div>
        <div className="nav-item"><span className="nav-ico">≡</span> Skills</div>
        <div className="nav-item"><span className="nav-ico">⎈</span> MCP</div>
      </nav>

      <nav className="nav-group">
        <div className="nav-head">System</div>
        <div className="nav-item"><span className="nav-ico">⚙</span> Settings</div>
        <div className="nav-item"><span className="nav-ico">⎙</span> Terminal</div>
      </nav>

      <div className="side-foot">
        <div className="acct">
          <div className="acct-av">LM</div>
          <div className="acct-who">
            <strong>Lungile Mginqi</strong>
            <span>NOVATEK · owner</span>
          </div>
        </div>
        <div className="side-note">D2A · build 2026.06</div>
      </div>
    </aside>
  );
}

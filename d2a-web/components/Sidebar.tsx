"use client";

import { AGENTS } from "@/lib/agents";
import type { AbcdClass } from "@/lib/types";
import Icon from "./Icon";

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
        <button type="button" className="nav-item">
          <span className="nav-ico"><Icon name="dashboard" /></span> Dashboard
        </button>
        <button type="button" className="nav-item active" aria-current="page">
          <span className="nav-ico"><Icon name="agents" /></span> Agents
          <span className="nav-badge">{AGENTS.length}</span>
        </button>
        <button type="button" className="nav-item" onClick={onOpenChat}>
          <span className="nav-ico"><Icon name="chat" /></span> Chat
        </button>
        <button type="button" className="nav-item">
          <span className="nav-ico"><Icon name="pursuit" /></span> Pursuit
          <span className="nav-badge">{counts.total}</span>
        </button>
      </nav>

      <nav className="nav-group">
        <div className="nav-head">Intelligence</div>
        <button type="button" className="nav-item"><span className="nav-ico"><Icon name="memory" /></span> Memory</button>
        <button type="button" className="nav-item"><span className="nav-ico"><Icon name="inspector" /></span> Inspector</button>
        <button type="button" className="nav-item"><span className="nav-ico"><Icon name="skills" /></span> Skills</button>
        <button type="button" className="nav-item"><span className="nav-ico"><Icon name="mcp" /></span> MCP</button>
      </nav>

      <nav className="nav-group">
        <div className="nav-head">System</div>
        <button type="button" className="nav-item"><span className="nav-ico"><Icon name="settings" /></span> Settings</button>
        <button type="button" className="nav-item"><span className="nav-ico"><Icon name="terminal" /></span> Terminal</button>
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

"use client";

import { AGENTS } from "@/lib/agents";
import type { AbcdClass, View } from "@/lib/types";
import Icon from "./Icon";
import type { IconKey } from "./Icon";

export default function Sidebar({
  counts,
  view,
  onNavigate,
  onOpenChat,
  onFocusInspector,
  mobileOpen = false,
  onNavClose,
}: {
  counts: Record<AbcdClass, number> & { total: number };
  view: View;
  onNavigate: (v: View) => void;
  onOpenChat: () => void;
  onFocusInspector: () => void;
  /** ≤820px: when true, the sidebar is shown as a slide-in drawer. */
  mobileOpen?: boolean;
  /** Close the mobile drawer (no-op contribution on desktop). */
  onNavClose?: () => void;
}) {
  // Every navigation action closes the mobile drawer; on desktop this is a no-op.
  const navigate = (v: View) => {
    onNavigate(v);
    onNavClose?.();
  };
  const openChat = () => {
    onOpenChat();
    onNavClose?.();
  };
  const focusInspector = () => {
    onFocusInspector();
    onNavClose?.();
  };

  // Small helper to keep every nav item consistent + accessible.
  const NavItem = ({
    target,
    icon,
    label,
    badge,
  }: {
    target: View;
    icon: IconKey;
    label: string;
    badge?: number;
  }) => {
    const active = view === target;
    return (
      <button
        type="button"
        className={"nav-item" + (active ? " active" : "")}
        aria-current={active ? "page" : undefined}
        onClick={() => navigate(target)}
      >
        <span className="nav-ico">
          <Icon name={icon} />
        </span>{" "}
        {label}
        {badge !== undefined ? <span className="nav-badge">{badge}</span> : null}
      </button>
    );
  };

  return (
    <div
      className={"side-scrim" + (mobileOpen ? " open" : "")}
      onClick={onNavClose}
      aria-hidden={!mobileOpen}
    >
    <aside className="sidebar" onClick={(e) => e.stopPropagation()}>
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
        <NavItem target="dashboard" icon="dashboard" label="Dashboard" />
        <NavItem target="agents" icon="agents" label="Agents" badge={AGENTS.length} />
        <button type="button" className="nav-item" onClick={openChat}>
          <span className="nav-ico">
            <Icon name="chat" />
          </span>{" "}
          Chat
        </button>
        <NavItem target="pursuit" icon="pursuit" label="Pursuit" badge={counts.total} />
      </nav>

      <nav className="nav-group">
        <div className="nav-head">Intelligence</div>
        <NavItem target="memory" icon="memory" label="Memory" />
        <button type="button" className="nav-item" onClick={focusInspector}>
          <span className="nav-ico">
            <Icon name="inspector" />
          </span>{" "}
          Inspector
        </button>
        <NavItem target="skills" icon="skills" label="Skills" />
        <NavItem target="mcp" icon="mcp" label="MCP" />
      </nav>

      <nav className="nav-group">
        <div className="nav-head">System</div>
        <NavItem target="settings" icon="settings" label="Settings" />
        <NavItem target="terminal" icon="terminal" label="Terminal" />
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
    </div>
  );
}

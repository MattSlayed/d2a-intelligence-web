import type { ReactElement } from "react";

/* Inline-SVG icon set for the D2A console — no icon dependency.
   All icons inherit `currentColor` and a 1.6 stroke for a precise,
   instrument-panel feel. Keys cover nav, agents, and UI affordances. */

type IconKey =
  // nav
  | "dashboard" | "agents" | "chat" | "pursuit"
  | "memory" | "inspector" | "skills" | "mcp"
  | "settings" | "terminal"
  // agents
  | "orchestrator" | "universe" | "firmo" | "trigger" | "route"
  | "score" | "wedge" | "audit" | "package" | "contact"
  // ui
  | "bolt" | "send" | "close" | "link" | "alert" | "target" | "play";

const P: Record<IconKey, ReactElement> = {
  // ── nav ──
  dashboard: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /></>,
  agents: <><circle cx="12" cy="7" r="3" /><path d="M5 20a7 7 0 0 1 14 0" /><path d="M12 10v4" /></>,
  chat: <><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-5A8 8 0 1 1 21 12Z" /></>,
  pursuit: <><path d="M4 6h16M4 12h16M4 18h10" /></>,
  memory: <><rect x="4" y="4" width="16" height="16" rx="2.5" /><path d="M9 4v-1M15 4v-1M9 21v-1M15 21v-1M4 9H3M4 15H3M21 9h-1M21 15h-1" /><rect x="9" y="9" width="6" height="6" rx="1" /></>,
  inspector: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>,
  skills: <><path d="m12 3 2.6 5.6L21 9.3l-4.5 4.2 1.1 6.1L12 16.8 6.4 19.6l1.1-6.1L3 9.3l6.4-.7Z" /></>,
  mcp: <><circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.8 2.8M16.2 16.2 19 19M19 5l-2.8 2.8M7.8 16.2 5 19" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H1a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 2.6 7a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 7 2.6h.1A1.6 1.6 0 0 0 9 1.1V1a2 2 0 1 1 4 0v.1A1.6 1.6 0 0 0 17 2.6a1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H23a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z" transform="scale(0.82) translate(2.6 2.6)" /></>,
  terminal: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m7 9 3 3-3 3M13 15h4" /></>,

  // ── agents ──
  orchestrator: <><path d="m12 2 9 5v10l-9 5-9-5V7Z" /><path d="M12 22V12M21 7l-9 5M3 7l9 5" /></>,
  universe: <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="9" ry="4" /><path d="M12 3v18" /></>,
  firmo: <><path d="M3 21h18M5 21V8l5-3 5 3v13M9 21v-4h2v4M9 11h.01M13 11h.01M9 14h.01M13 14h.01" /></>,
  trigger: <><path d="M13 2 4 14h7l-1 8 9-12h-7Z" /></>,
  route: <><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M8.5 6H16a2.5 2.5 0 0 1 0 5H8a2.5 2.5 0 0 0 0 5h7.5" /></>,
  score: <><path d="M3 12a9 9 0 1 1 18 0" /><path d="M12 12 16 8" /><circle cx="12" cy="12" r="1.4" /></>,
  wedge: <><path d="M5 12h12M13 6l6 6-6 6" /></>,
  audit: <><path d="M9 11.5 11 13.5 15.5 9" /><path d="M20 12c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3Z" /></>,
  package: <><path d="m3.3 7 8.7 5 8.7-5M12 12v10" /><path d="m12 2 9 5v10l-9 5-9-5V7Z" /></>,
  contact: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /><path d="M16 5h5M18.5 2.5v5" /></>,

  // ── ui ──
  bolt: <><path d="M13 2 4 14h7l-1 8 9-12h-7Z" /></>,
  send: <><path d="M22 2 11 13M22 2l-7 20-4-9-9-4Z" /></>,
  close: <><path d="M6 6l12 12M18 6 6 18" /></>,
  link: <><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" /></>,
  alert: <><path d="M12 9v4M12 17h.01" /><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" /></>,
  play: <><path d="M7 4v16l13-8Z" /></>,
};

export default function Icon({
  name,
  className,
}: {
  name: IconKey | string;
  className?: string;
}) {
  const path = P[name as IconKey] ?? P.target;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {path}
    </svg>
  );
}

export type { IconKey };

"use client";

import { MCP_SERVERS } from "@/lib/catalog";
import Icon from "./Icon";

export default function McpView() {
  return (
    <section className="panel" style={{ animation: "rise 0.5s var(--ease-out) both" }}>
      <div className="panel-head">
        <div>
          <div className="panel-title">MCP servers</div>
          <div className="panel-sub">D2A · Model Context Protocol connections</div>
        </div>
        <span className="info-flag">
          <span className="info-flag-dot" /> {MCP_SERVERS.length} wired
        </span>
      </div>

      <div className="panel-body">
        <div className="cat-grid">
          {MCP_SERVERS.map((m, i) => (
            <div className="cat-card" key={m.id} style={{ animationDelay: `${0.06 * i}s` }}>
              <div className="cat-card-head">
                <span className="cat-ic">
                  <Icon name={m.icon} />
                </span>
                <div className="cat-id">
                  <span className="cat-name plain">{m.name}</span>
                  <span className="cat-purpose">{m.purpose}</span>
                </div>
                <span className={"mcp-state " + m.status}>
                  <span className="mcp-state-dot" /> {m.status}
                </span>
              </div>
              <p className="cat-copy">{m.capability}</p>
            </div>
          ))}
        </div>
        <div className="mem-note">
          <Icon name="alert" />
          <span>
            Read-only catalogue. MCP servers are configured at the operator's Claude Code workstation,
            not from the hosted app — connection state here reflects the project's wiring.
          </span>
        </div>
      </div>
    </section>
  );
}

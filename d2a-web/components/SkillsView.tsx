"use client";

import { SKILLS } from "@/lib/catalog";
import Icon from "./Icon";

export default function SkillsView() {
  return (
    <section className="panel" style={{ animation: "rise 0.5s var(--ease-out) both" }}>
      <div className="panel-head">
        <div>
          <div className="panel-title">Skills</div>
          <div className="panel-sub">D2A · Claude Code skills wired to this OS</div>
        </div>
        <span className="info-flag">
          <span className="info-flag-dot" /> {SKILLS.length} skills
        </span>
      </div>

      <div className="panel-body">
        <div className="cat-grid">
          {SKILLS.map((s, i) => (
            <div className="cat-card" key={s.id} style={{ animationDelay: `${0.06 * i}s` }}>
              <div className="cat-card-head">
                <span className="cat-ic">
                  <Icon name={s.icon} />
                </span>
                <div className="cat-id">
                  <code className="cat-name">{s.name}</code>
                  <span className="cat-purpose">{s.purpose}</span>
                </div>
              </div>
              <p className="cat-copy">{s.streamlines}</p>
              <div className="cat-tags">
                {s.tags.map((t) => (
                  <span className="cat-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mem-note">
          <Icon name="alert" />
          <span>
            Read-only catalogue. A hosted console can't introspect your local{" "}
            <code>.claude/skills</code> directory — this reflects the skills configured for the D2A
            project.
          </span>
        </div>
      </div>
    </section>
  );
}

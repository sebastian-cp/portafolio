"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { ExperienceEntry } from "@/data/profile";

export function Experience({ entries }: { entries: ExperienceEntry[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent) => {
    const last = entries.length - 1;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight" ? (active === last ? 0 : active + 1)
      : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (active === 0 ? last : active - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  const entry = entries[active];

  return (
    <div className="grid gap-6 md:grid-cols-[16rem_1fr]">
      <div role="tablist" aria-label="Experiencia laboral" aria-orientation="vertical" onKeyDown={onKeyDown} className="flex gap-2 overflow-x-auto md:flex-col">
        {entries.map((e, i) => (
          <button
            key={e.id}
            ref={(el) => { tabs.current[i] = el; }}
            role="tab"
            id={`tab-${e.id}`}
            aria-selected={active === i}
            aria-controls={`panel-${e.id}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className="shrink-0 rounded-lg border border-border px-4 py-3 text-left transition-colors aria-selected:border-accent aria-selected:bg-surface"
          >
            <span className="block font-semibold">{e.company}</span>
            <span className="block text-xs text-muted">{e.period}</span>
          </button>
        ))}
      </div>

      <div key={entry.id} role="tabpanel" id={`panel-${entry.id}`} aria-labelledby={`tab-${entry.id}`} tabIndex={0} className="panel-in rounded-xl border border-border bg-surface p-6">
        <h3 className="text-xl font-semibold">{entry.role}</h3>
        <p className="mt-1 text-sm text-accent">{entry.project}</p>
        {entry.sections.map((s) => (
          <div key={s.title} className="mt-5">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted">{s.title}</h4>
            <ul className="mt-2 space-y-2">
              {s.items.map((it) => (
                <li key={it.label} className="text-sm leading-relaxed">
                  <strong>{it.label}:</strong> <span className="text-muted">{it.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

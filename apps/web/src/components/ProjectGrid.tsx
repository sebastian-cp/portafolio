"use client";

import { useState, type ReactNode } from "react";
import type { Content } from "@/i18n";

type Filter = "all" | "react" | "angular";

export interface GridItem {
  slug: string;
  stack: "react" | "angular";
  /** Tarjeta ya renderizada en el servidor: así los logos de stack no viajan al cliente. */
  card: ReactNode;
}

/** Con un número impar de tarjetas, el hueco de la última fila lo ocupa una invitación a GitHub. */
export function ProjectGrid({ items, t, github }: { items: GridItem[]; t: Content["projectsUi"]; github: string }) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? items : items.filter((p) => p.stack === filter);
  const filters: Filter[] = ["all", "react", "angular"];

  return (
    <div>
      <div role="group" aria-label={t.filterLabel} className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className="rounded-full border border-border px-4 py-1.5 text-sm text-muted transition-colors hover:text-foreground aria-pressed:border-transparent aria-pressed:bg-accent-fill aria-pressed:font-medium aria-pressed:text-accent-fill-text"
          >
            {t[f]}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {(visible.length === 1 ? t.shownOne : t.shownMany).replace("{n}", String(visible.length))}
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {visible.map((p) => <div key={p.slug} className="contents">{p.card}</div>)}
        {visible.length % 2 === 1 && (
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="group hidden flex-col justify-center rounded-2xl border border-dashed border-border p-8 transition-colors hover:border-accent/60 hover:bg-accent-soft md:flex"
          >
            <span className="t-sub">{t.more.title}</span>
            <span className="mt-2 max-w-sm text-muted">{t.more.text}</span>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
              {t.more.cta}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
            </span>
          </a>
        )}
      </div>
    </div>
  );
}

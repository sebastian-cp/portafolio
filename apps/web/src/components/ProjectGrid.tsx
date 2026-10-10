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

export function ProjectGrid({ items, t }: { items: GridItem[]; t: Content["projectsUi"] }) {
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
            className="rounded-full border border-border px-4 py-1.5 text-sm text-muted transition-colors hover:text-foreground aria-pressed:border-transparent aria-pressed:bg-accent aria-pressed:text-accent-contrast"
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
      </div>
    </div>
  );
}

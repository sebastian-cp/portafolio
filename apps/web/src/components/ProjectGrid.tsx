"use client";

import { useState } from "react";
import type { Content } from "@/i18n";
import { ProjectCard } from "./ProjectCard";

type Filter = "all" | "react" | "angular";

export function ProjectGrid({ projects, t }: { projects: Content["projects"]; t: Content["projectsUi"] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? projects : projects.filter((p) => p.stack === filter);
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
            className="rounded-full border border-border px-4 py-1.5 text-sm transition-colors aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-accent-contrast"
          >
            {t[f]}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {(visible.length === 1 ? t.shownOne : t.shownMany).replace("{n}", String(visible.length))}
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {visible.map((p) => <ProjectCard key={p.slug} project={p} t={t} />)}
      </div>
    </div>
  );
}

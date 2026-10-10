"use client";

import { useState } from "react";
import type { Project, Stack } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

const filters: { value: Stack | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "react", label: "React / Next.js" },
  { value: "angular", label: "Angular" },
];

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Stack | "all">("all");
  const visible = filter === "all" ? projects : projects.filter((p) => p.stack === filter);

  return (
    <div>
      <div role="group" aria-label="Filtrar proyectos por tecnología" className="flex flex-wrap gap-2">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
            className="rounded-full border border-border px-4 py-1.5 text-sm transition-colors aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-accent-contrast"
          >
            {label}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {visible.length} proyecto{visible.length === 1 ? "" : "s"} mostrado{visible.length === 1 ? "" : "s"}
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {visible.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}

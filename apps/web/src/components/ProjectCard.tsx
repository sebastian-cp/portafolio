import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  const { title, stack, summary, highlights, tech, demo, repo } = project;
  return (
    <article className="flex h-full flex-col rounded-xl border border-border bg-surface p-6">
      <header className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-muted">
          {stack}
        </span>
      </header>
      <p className="mt-3 text-muted">{summary}</p>
      <ul className="mt-4 list-disc space-y-1 pl-5 text-sm">
        {highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tecnologías">
        {tech.map((t) => (
          <li key={t} className="rounded bg-background px-2 py-1 font-mono text-xs text-muted">
            {t}
          </li>
        ))}
      </ul>
      <footer className="mt-auto flex gap-4 pt-6 text-sm font-medium">
        {demo && (
          <a className="text-accent underline underline-offset-4" href={demo} target="_blank" rel="noopener noreferrer">
            Ver demo<span className="sr-only"> de {title}</span>
          </a>
        )}
        {repo && (
          <a className="text-accent underline underline-offset-4" href={repo} target="_blank" rel="noopener noreferrer">
            Código<span className="sr-only"> de {title}</span>
          </a>
        )}
      </footer>
    </article>
  );
}

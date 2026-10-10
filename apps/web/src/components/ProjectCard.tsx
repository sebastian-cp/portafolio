import type { Content } from "@/i18n";
import { Badge } from "@/ui/Badge";

type Project = Content["projects"][number];

export function ProjectCard({ project, t }: { project: Project; t: Content["projectsUi"] }) {
  const { title, stack, summary, highlights, tech, demo, repo } = project;
  const link = "text-accent underline underline-offset-4";
  return (
    <article className="flex h-full flex-col rounded-xl border border-border bg-surface p-6">
      <header className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-muted">{stack}</span>
      </header>
      <p className="mt-3 text-muted">{summary}</p>
      <ul className="mt-4 list-disc space-y-1 pl-5 text-sm">
        {highlights.map((h) => <li key={h}>{h}</li>)}
      </ul>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label={t.techLabel}>
        {tech.map((x) => <li key={x}><Badge mono>{x}</Badge></li>)}
      </ul>
      <footer className="mt-auto flex gap-4 pt-6 text-sm font-medium">
        {demo && <a className={link} href={demo} target="_blank" rel="noopener noreferrer">{t.demo}<span className="sr-only"> {t.of} {title}</span></a>}
        {repo && <a className={link} href={repo} target="_blank" rel="noopener noreferrer">{t.code}<span className="sr-only"> {t.of} {title}</span></a>}
      </footer>
    </article>
  );
}

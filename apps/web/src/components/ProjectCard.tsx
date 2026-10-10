import type { Content } from "@/i18n";
import { Card } from "@/ui/Card";
import { TechChip } from "@/ui/TechChip";
import { DemoDialog } from "./DemoDialog";

type Project = Content["projects"][number];

export function ProjectCard({ project, t }: { project: Project; t: Content["projectsUi"] }) {
  const { title, stack, summary, highlights, tech, demo, repo } = project;
  // Las demos de Angular son otra app: se abren embebidas en un modal en vez de en otra pestaña.
  const embed = stack === "angular";
  const link = "text-accent underline underline-offset-4";
  return (
    <Card as="article" className="flex h-full flex-col">
      <header className="flex items-center justify-between gap-3">
        <h3 className="t-card">{title}</h3>
        <span className="chip shrink-0 uppercase tracking-wider">{stack}</span>
      </header>
      <p className="mt-3 text-sm leading-relaxed text-muted">{summary}</p>
      <ul className="mt-4 space-y-1.5 text-sm text-muted">
        {highlights.map((h) => (
          <li key={h} className="flex gap-2">
            <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
            {h}
          </li>
        ))}
      </ul>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label={t.techLabel}>
        {tech.map((x) => <li key={x}><TechChip name={x} /></li>)}
      </ul>
      <footer className="mt-auto flex gap-4 border-t border-border pt-4 text-sm font-medium" style={{ marginTop: "1.5rem" }}>
        {demo && embed && <DemoDialog src={demo} title={title} t={t} className={`${link} cursor-pointer`} />}
        {demo && !embed && <a className={link} href={demo} target="_blank" rel="noopener noreferrer">{t.demo}<span className="sr-only"> {t.of} {title}</span></a>}
        {repo && <a className={link} href={repo} target="_blank" rel="noopener noreferrer">{t.code}<span className="sr-only"> {t.of} {title}</span></a>}
      </footer>
    </Card>
  );
}

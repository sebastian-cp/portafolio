import { CommandPalette } from "@/components/CommandPalette";
import { Counter } from "@/components/Counter";
import { Experience } from "@/components/Experience";
import { ProjectGrid } from "@/components/ProjectGrid";
import { RagDemo } from "@/components/RagDemo";
import { Reveal } from "@/components/Reveal";
import { RotatingWord } from "@/components/RotatingWord";
import { ThemeToggle } from "@/components/ThemeToggle";
import { projects } from "@/data/projects";
import { education, experience, profile, skills, stats } from "@/data/profile";

const nav = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#demo-rag", label: "Demo IA" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
];

const heading = "text-2xl font-bold";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
          <span className="font-semibold">SC</span>
          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex gap-6 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <a className="text-muted hover:text-foreground" href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <CommandPalette email={profile.email} github={profile.github} linkedin={profile.linkedin} cv={profile.cv} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main id="contenido" className="mx-auto max-w-5xl space-y-24 px-6 pb-24">
        <section className="relative pt-16 sm:pt-24">
          <div className="aurora" aria-hidden="true" />
          <p className="font-mono text-sm text-accent">{profile.location}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">{profile.name}</h1>
          <p className="mt-3 text-xl text-muted">
            {profile.role} · <RotatingWord words={["Angular", "React", "Node.js", "IA aplicada"]} />
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">{profile.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#proyectos" className="rounded-lg bg-accent px-5 py-2.5 font-medium text-accent-contrast">Ver proyectos</a>
            <a href="#demo-rag" className="rounded-lg border border-border px-5 py-2.5 font-medium">Probar demo IA</a>
            <a href={profile.cv} download className="rounded-lg border border-border px-5 py-2.5 font-medium">Descargar CV</a>
          </div>
        </section>

        <section id="sobre-mi" aria-labelledby="h-about">
          <Reveal>
            <h2 id="h-about" className={heading}>Sobre mí</h2>
            <dl className="mt-6 grid gap-4 sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-border bg-surface p-5">
                  <dd className="text-4xl font-bold text-accent"><Counter to={s.value} suffix={s.suffix} /></dd>
                  <dt className="mt-1 text-sm text-muted">{s.label}</dt>
                </div>
              ))}
            </dl>
            <h3 className="mt-10 text-lg font-semibold">Stack</h3>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              {skills.map((s) => (
                <div key={s.group} className="rounded-xl border border-border bg-surface p-5">
                  <dt className="font-semibold">{s.group}</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {s.items.map((i) => (
                      <span key={i} className="rounded bg-background px-2 py-1 font-mono text-xs text-muted">{i}</span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-muted">
              {education.title} · {education.place} ({education.year}) · {education.cert}
            </p>
          </Reveal>
        </section>

        <section id="experiencia" aria-labelledby="h-exp">
          <Reveal>
            <h2 id="h-exp" className={heading}>Experiencia</h2>
            <div className="mt-6"><Experience entries={experience} /></div>
          </Reveal>
        </section>

        <section id="demo-rag" aria-labelledby="h-rag">
          <Reveal>
            <h2 id="h-rag" className={heading}>Pregúntale a mi CV</h2>
            <div className="mt-6"><RagDemo /></div>
          </Reveal>
        </section>

        <section id="proyectos" aria-labelledby="h-projects">
          <Reveal>
            <h2 id="h-projects" className={heading}>Proyectos</h2>
            <div className="mt-6"><ProjectGrid projects={projects} /></div>
          </Reveal>
        </section>

        <section id="contacto" aria-labelledby="h-contact">
          <Reveal>
            <h2 id="h-contact" className={heading}>Contacto</h2>
            <p className="mt-4 text-muted">¿Tienes un proyecto o una vacante? Escríbeme.</p>
            <ul className="mt-4 space-y-1">
              <li><a className="text-accent underline underline-offset-4" href={`mailto:${profile.email}`}>{profile.email}</a></li>
              <li>{profile.phone}</li>
              <li><a className="text-accent underline underline-offset-4" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a className="text-accent underline underline-offset-4" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </>
  );
}

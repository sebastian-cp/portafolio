import { ProjectGrid } from "@/components/ProjectGrid";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/data/projects";
import { profile, skills } from "@/data/profile";

const nav = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
];

export default function Home() {
  return (
    <>
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <span className="font-semibold">SC</span>
        <nav aria-label="Principal">
          <ul className="flex gap-6 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <a className="text-muted hover:text-foreground" href={n.href}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="contenido" className="mx-auto max-w-5xl space-y-24 px-6 pb-24">
        <section className="pt-12 sm:pt-20">
          <p className="font-mono text-sm text-accent">{profile.location}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">{profile.name}</h1>
          <p className="mt-2 text-xl text-muted">{profile.role}</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">{profile.summary}</p>
          <div className="mt-8 flex gap-3">
            <a
              href="#proyectos"
              className="rounded-lg bg-accent px-5 py-2.5 font-medium text-accent-contrast"
            >
              Ver proyectos
            </a>
            <a href={profile.github} className="rounded-lg border border-border px-5 py-2.5 font-medium">
              GitHub
            </a>
          </div>
        </section>

        <section id="sobre-mi" aria-labelledby="h-skills">
          <Reveal>
            <h2 id="h-skills" className="text-2xl font-bold">
              Stack
            </h2>
            <dl className="mt-6 grid gap-6 sm:grid-cols-2">
              {skills.map((s) => (
                <div key={s.group} className="rounded-xl border border-border bg-surface p-5">
                  <dt className="font-semibold">{s.group}</dt>
                  <dd className="mt-2 text-sm text-muted">{s.items.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        <section id="proyectos" aria-labelledby="h-projects">
          <Reveal>
            <h2 id="h-projects" className="text-2xl font-bold">
              Proyectos
            </h2>
            <div className="mt-6">
              <ProjectGrid projects={projects} />
            </div>
          </Reveal>
        </section>

        <section id="contacto" aria-labelledby="h-contact">
          <Reveal>
            <h2 id="h-contact" className="text-2xl font-bold">
              Contacto
            </h2>
            <p className="mt-4 text-muted">¿Tienes un proyecto o una vacante? Escríbeme.</p>
            <ul className="mt-4 space-y-1">
              <li>
                <a className="text-accent underline underline-offset-4" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </li>
              <li>{profile.phone}</li>
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

import { notFound } from "next/navigation";
import { A11yPlayground } from "@/components/A11yPlayground";
import { CommandPalette } from "@/components/CommandPalette";
import { Counter } from "@/components/Counter";
import { Experience } from "@/components/Experience";
import { ProjectGrid } from "@/components/ProjectGrid";
import { RagDemo } from "@/components/RagDemo";
import { Reveal } from "@/components/Reveal";
import { RotatingWord } from "@/components/RotatingWord";
import { ThemeToggle } from "@/components/ThemeToggle";
import { WebVitals } from "@/components/WebVitals";
import { getContent, isLocale } from "@/i18n";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";

const h2 = "text-2xl font-bold";
const h3 = "text-xl font-semibold";
const link = "text-accent underline underline-offset-4";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getContent(locale);
  const { profile, ui } = t;

  const nav = [
    { href: "#sobre-mi", label: ui.nav.about },
    { href: "#experiencia", label: ui.nav.experience },
    { href: "#demos", label: ui.nav.demos },
    { href: "#proyectos", label: ui.nav.projects },
    { href: "#contacto", label: ui.nav.contact },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
          <span className="font-semibold">SC</span>
          <nav aria-label={ui.mainNav} className="hidden md:block">
            <ul className="flex gap-6 text-sm">
              {nav.map((n) => (
                <li key={n.href}><a className="text-muted hover:text-foreground" href={n.href}>{n.label}</a></li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <CommandPalette t={t.palette} profile={profile} otherLocale={ui.lang.other} />
            <a
              href={`/${ui.lang.other}`}
              lang={ui.lang.other}
              hrefLang={ui.lang.other}
              aria-label={ui.lang.aria}
              className="rounded-lg border border-border px-3 py-1.5 text-sm text-muted hover:text-foreground"
            >
              {ui.lang.other.toUpperCase()}
            </a>
            <ThemeToggle label={ui.themeToggle} />
          </div>
        </div>
      </header>

      <main id="contenido" className="mx-auto max-w-5xl space-y-24 px-6 pb-24">
        <section className="relative pt-16 sm:pt-24">
          <div className="aurora" aria-hidden="true" />
          <p className="font-mono text-sm text-accent">{profile.location}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">{profile.name}</h1>
          <p className="mt-3 text-xl text-muted">
            {profile.role} · <RotatingWord words={profile.rotating} />
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">{profile.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#proyectos">{ui.cta.projects}</Button>
            <Button href="#demos" variant="secondary">{ui.cta.demos}</Button>
            <Button href={profile.cv} download variant="secondary">{ui.cta.cv}</Button>
          </div>
        </section>

        <section id="sobre-mi" aria-labelledby="h-about">
          <Reveal>
            <h2 id="h-about" className={h2}>{ui.sections.about}</h2>
            <dl className="mt-6 grid gap-4 sm:grid-cols-3">
              {t.stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-border bg-surface p-5">
                  <dd className="text-4xl font-bold text-accent"><Counter to={s.value} suffix={s.suffix} /></dd>
                  <dt className="mt-1 text-sm text-muted">{s.label}</dt>
                </div>
              ))}
            </dl>
            <h3 className={`${h3} mt-10`}>{ui.sections.stack}</h3>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              {t.skills.map((s) => (
                <div key={s.group} className="rounded-xl border border-border bg-surface p-5">
                  <dt className="font-semibold">{s.group}</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {s.items.map((i) => <Badge key={i} mono>{i}</Badge>)}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-muted">{t.education.text}</p>
          </Reveal>
        </section>

        <section id="experiencia" aria-labelledby="h-exp">
          <Reveal>
            <h2 id="h-exp" className={h2}>{ui.sections.experience}</h2>
            <div className="mt-6"><Experience entries={t.experience} label={t.experienceUi.label} /></div>
          </Reveal>
        </section>

        <section id="demos" aria-labelledby="h-demos" className="space-y-16">
          <h2 id="h-demos" className={h2}>{ui.sections.demos}</h2>
          <Reveal>
            <div id="demo-rag" className="scroll-mt-20">
              <h3 className={h3}>{ui.sections.rag}</h3>
              <div className="mt-4"><RagDemo t={t.rag} /></div>
            </div>
          </Reveal>
          <Reveal>
            <div id="demo-vitals" className="scroll-mt-20">
              <h3 className={h3}>{ui.sections.vitals}</h3>
              <div className="mt-4"><WebVitals t={t.vitals} /></div>
            </div>
          </Reveal>
          <Reveal>
            <div id="demo-a11y" className="scroll-mt-20">
              <h3 className={h3}>{ui.sections.a11y}</h3>
              <div className="mt-4"><A11yPlayground t={t.a11y} /></div>
            </div>
          </Reveal>
        </section>

        <section id="proyectos" aria-labelledby="h-projects">
          <Reveal>
            <h2 id="h-projects" className={h2}>{ui.sections.projects}</h2>
            <div className="mt-6"><ProjectGrid projects={t.projects} t={t.projectsUi} /></div>
          </Reveal>
        </section>

        <section id="contacto" aria-labelledby="h-contact">
          <Reveal>
            <h2 id="h-contact" className={h2}>{ui.sections.contact}</h2>
            <p className="mt-4 text-muted">{ui.contactIntro}</p>
            <ul className="mt-4 space-y-1">
              <li><a className={link} href={`mailto:${profile.email}`}>{profile.email}</a></li>
              <li>{profile.phone}</li>
              <li><a className={link} href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a className={link} href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted">
        © {new Date().getFullYear()} {profile.name} · {ui.rights}
      </footer>
    </>
  );
}

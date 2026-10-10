import { notFound } from "next/navigation";
import { A11yPlayground } from "@/components/A11yPlayground";
import { CommandPalette } from "@/components/CommandPalette";
import { Counter } from "@/components/Counter";
import { Experience } from "@/components/Experience";
import { HeroCard } from "@/components/HeroCard";
import { Hobbies } from "@/components/Hobbies";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectGrid } from "@/components/ProjectGrid";
import { RagDemo } from "@/components/RagDemo";
import { Reveal } from "@/components/Reveal";
import { RotatingWord } from "@/components/RotatingWord";
import { SectionHeader } from "@/components/SectionHeader";
import { SiteNav } from "@/components/SiteNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { WebVitals } from "@/components/WebVitals";
import { getContent, isLocale } from "@/i18n";
import { Button } from "@/ui/Button";
import { Card } from "@/ui/Card";
import { CertBadge } from "@/ui/CertBadge";
import { ChileFlag } from "@/ui/Flag";
import { OrgLogo } from "@/ui/OrgLogo";
import { TechChip } from "@/ui/TechChip";
import { ORG_LOGOS } from "@/data/logos";

const link = "text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getContent(locale);
  const { profile, ui } = t;

  const nav = [
    { href: "#trabajo", label: ui.nav.about },
    { href: "#experiencia", label: ui.nav.experience },
    { href: "#demos", label: ui.nav.demos },
    { href: "#proyectos", label: ui.nav.projects },
    { href: "#hobbies", label: ui.nav.hobbies },
    { href: "#contacto", label: ui.nav.contact },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <a href="#contenido" className="group flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-surface font-display text-sm font-semibold tracking-tight">
              SC
            </span>
            <span className="hidden font-mono text-xs text-faint sm:block">sebastian-cofre</span>
          </a>

          <SiteNav items={nav} label={ui.mainNav} />

          <div className="flex items-center gap-2">
            <CommandPalette t={t.palette} profile={profile} otherLocale={ui.lang.other} />
            <a
              href={`/${ui.lang.other}`}
              lang={ui.lang.other}
              hrefLang={ui.lang.other}
              aria-label={ui.lang.aria}
              className="rounded-lg border border-border px-2.5 py-2 font-mono text-xs text-muted transition-colors hover:text-foreground"
            >
              {ui.lang.other.toUpperCase()}
            </a>
            <ThemeToggle label={ui.themeToggle} />
          </div>
        </div>
      </header>

      <main id="contenido" className="mx-auto max-w-6xl px-6 pb-32">
        {/* ---------------- Hero ---------------- */}
        <section className="relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div className="grid-lines" aria-hidden="true" />

          <div>
            <p className="t-eyebrow flex items-center gap-2">
              <ChileFlag title="Chile" />
              {profile.location}
            </p>

            <h1 className="t-hero mt-5">{profile.name}</h1>

            <p className="mt-5 text-xl text-muted sm:text-2xl">
              {profile.role} · <RotatingWord words={profile.rotating} />
            </p>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              <span className="text-foreground">{ui.hero.kicker}</span> {profile.summary}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="#trabajo">{ui.cta.projects}</Button>
              <Button href="#demos" variant="secondary">{ui.cta.demos}</Button>
              <Button href={profile.cv} download variant="ghost">{ui.cta.cv}</Button>
            </div>

            <p className="mt-8 hidden items-center gap-2 font-mono text-xs text-faint lg:flex">
              <kbd>Ctrl</kbd> <kbd>K</kbd> {ui.hero.paletteHint}
            </p>
          </div>

          <div className="lg:pl-4">
            <HeroCard profile={profile} experience={t.experience} />
          </div>
        </section>

        {/* ---------------- Sobre mí ---------------- */}
        <section id="trabajo" aria-labelledby="h-about" className="scroll-mt-24 pt-16">
          <Reveal>
            <SectionHeader id="h-about" index={ui.indexes.about} eyebrow={ui.eyebrows.about} title={ui.sections.about} />

            <ul className="grid gap-4 lg:grid-cols-3">
              {t.work.map((w) => (
                <Card as="li" key={w.id} padding="lg" className="flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <p className="t-eyebrow text-accent">{w.domain}</p>
                    {ORG_LOGOS[w.id] && <OrgLogo logo={ORG_LOGOS[w.id]} />}
                  </div>
                  <h3 className="t-card mt-4 text-xl">{w.product}</h3>
                  <p className="mt-1 text-sm text-faint">{w.org}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{w.line}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {w.tech.map((x) => <li key={x}><TechChip name={x} /></li>)}
                  </ul>
                </Card>
              ))}
            </ul>

            <Card as="div" padding="lg" className="mt-4">
              <dl className="grid gap-6 sm:grid-cols-3 sm:items-center">
                <div className="flex items-center gap-4">
                  <dd className="t-stat text-gradient text-[2.5rem]">
                    <Counter to={t.years.value} suffix={t.years.suffix} />
                  </dd>
                  <dt className="text-sm leading-snug text-muted">{t.years.label}</dt>
                </div>
                <div>
                  <dt className="t-eyebrow">{t.education.label}</dt>
                  <dd className="mt-1.5">
                    <span className="t-card block">{t.education.degree}</span>
                    <span className="text-sm text-muted">{t.education.place}</span>
                  </dd>
                </div>
                <div>
                  <dt className="t-eyebrow">{t.education.certLabel}</dt>
                  <dd className="mt-2">
                    <CertBadge code="AZ-900" title={t.education.certTitle} issuer="Microsoft Certified" />
                  </dd>
                </div>
              </dl>
            </Card>

            <h3 className="t-eyebrow mt-12">{ui.sections.stack}</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {t.skills.map((s, i) => (
                <Card key={s.group} as="div" className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
                  <h4 className="t-card">{s.group}</h4>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {s.items.map((x) => <li key={x}><TechChip name={x} /></li>)}
                  </ul>
                </Card>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ---------------- Experiencia ---------------- */}
        <section id="experiencia" aria-labelledby="h-exp" className="scroll-mt-24 pt-28">
          <Reveal>
            <SectionHeader id="h-exp" index={ui.indexes.experience} eyebrow={ui.eyebrows.experience} title={ui.sections.experience} />
            <Experience entries={t.experience} label={t.experienceUi.label} />
          </Reveal>
        </section>

        {/* ---------------- Demos ---------------- */}
        <section id="demos" aria-labelledby="h-demos" className="scroll-mt-24 pt-28">
          <Reveal>
            <SectionHeader
              id="h-demos"
              index={ui.indexes.demos}
              eyebrow={ui.eyebrows.demos}
              title={ui.sections.demos}
              aside={<span className="chip">{ui.asides.demos}</span>}
            />
          </Reveal>

          <div className="space-y-14">
            <Reveal>
              <div id="demo-rag" className="scroll-mt-24">
                <h3 className="t-card mb-4">{ui.sections.rag}</h3>
                <RagDemo t={t.rag} />
              </div>
            </Reveal>
            <Reveal>
              <div id="demo-vitals" className="scroll-mt-24">
                <h3 className="t-card mb-4">{ui.sections.vitals}</h3>
                <WebVitals t={t.vitals} />
              </div>
            </Reveal>
            <Reveal>
              <div id="demo-a11y" className="scroll-mt-24">
                <h3 className="t-card mb-4">{ui.sections.a11y}</h3>
                <A11yPlayground t={t.a11y} />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------------- Proyectos ---------------- */}
        <section id="proyectos" aria-labelledby="h-projects" className="scroll-mt-24 pt-28">
          <Reveal>
            <SectionHeader
              id="h-projects"
              index={ui.indexes.projects}
              eyebrow={ui.eyebrows.projects}
              title={ui.sections.projects}
              aside={<span className="chip">{ui.asides.projects}</span>}
            />
            <ProjectGrid
              t={t.projectsUi}
              items={t.projects.map((p) => ({
                slug: p.slug,
                stack: p.stack,
                card: <ProjectCard project={p} t={t.projectsUi} />,
              }))}
            />
          </Reveal>
        </section>

        {/* ---------------- Hobbies ---------------- */}
        <section id="hobbies" aria-labelledby="h-hobbies" className="scroll-mt-24 pt-28">
          <Reveal>
            <SectionHeader id="h-hobbies" index={ui.indexes.hobbies} eyebrow={ui.eyebrows.hobbies} title={ui.sections.hobbies} />
            <Hobbies t={t.hobbies} />
          </Reveal>
        </section>

        {/* ---------------- Contacto ---------------- */}
        <section id="contacto" aria-labelledby="h-contact" className="scroll-mt-24 pt-28">
          <Reveal>
            <SectionHeader id="h-contact" index={ui.indexes.contact} eyebrow={ui.eyebrows.contact} title={ui.sections.contact} />
            <Card as="div" padding="lg" className="text-center">
              <p className="t-section mx-auto max-w-[18ch]">{ui.contactIntro}</p>
              <p className="mx-auto mt-4 max-w-md text-muted">{ui.contactSub}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href={`mailto:${profile.email}`}>{ui.contactCta}</Button>
                <Button href={profile.cv} download variant="secondary">{ui.cta.cv}</Button>
              </div>
              <p className="mt-6 font-mono text-sm text-muted">{profile.email}</p>
              <div className="mt-8 flex justify-center gap-6 text-sm">
                <a className={link} href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a className={link} href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </Card>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-8 font-mono text-xs text-faint">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>{ui.rights}</span>
        </div>
      </footer>
    </>
  );
}

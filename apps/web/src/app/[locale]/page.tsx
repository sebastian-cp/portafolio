import { notFound } from "next/navigation";
import { CommandPalette } from "@/components/CommandPalette";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { HeroCard } from "@/components/HeroCard";
import { HeroFacts } from "@/components/HeroFacts";
import { Hobbies } from "@/components/Hobbies";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectGrid } from "@/components/ProjectGrid";
import { RagDemo } from "@/components/RagDemo";
import { Reveal } from "@/components/Reveal";
import { RotatingWord } from "@/components/RotatingWord";
import { SectionHeader } from "@/components/SectionHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { WebVitals } from "@/components/WebVitals";
import { getContent, isLocale } from "@/i18n";
import { Button } from "@/ui/Button";
import { Card } from "@/ui/Card";
import { ChileFlag } from "@/ui/Flag";
import { OrgLogo } from "@/ui/OrgLogo";
import { TechChip } from "@/ui/TechChip";
import { ORG_LOGOS } from "@/data/logos";

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
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
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

      <main id="contenido" className="mx-auto max-w-7xl px-6 pb-32">
        {/* ---------------- Hero ---------------- */}
        <section className="relative grid content-center items-center gap-10 pt-6 pb-16 sm:pt-8 sm:pb-20 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-[1.35fr_1fr] lg:gap-x-16 lg:gap-y-8">
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

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#trabajo">{ui.cta.projects}</Button>
              <Button href="#demos" variant="secondary">{ui.cta.demos}</Button>
              <Button href={profile.cv} download variant="ghost">{ui.cta.cv}</Button>
            </div>

          </div>

          <div className="lg:pl-4">
            <HeroCard profile={profile} experience={t.experience} />
          </div>

          <div className="lg:col-span-2">
            <HeroFacts t={t} />
          </div>
        </section>

        {/* ---------------- Sobre mí ---------------- */}
        <section id="trabajo" aria-labelledby="h-about" className="scroll-mt-24 pt-16">
          <Reveal>
            <SectionHeader id="h-about" index={ui.indexes.about} eyebrow={ui.eyebrows.about} title={ui.sections.about} intro={ui.intros.about} />

            <ul className="grid gap-4 lg:grid-cols-3">
              {t.work.map((w) => (
                <Card as="li" key={w.id} padding="none" className="flex flex-col">
                  <div className="flex items-center justify-between gap-3 border-b border-border px-6 py-4">
                    <p className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-accent">{w.domain}</p>
                    {ORG_LOGOS[w.id] && <OrgLogo logo={ORG_LOGOS[w.id]} />}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="t-sub">{w.product}</h3>
                    <p className="mt-1.5 text-sm text-muted">{w.org}</p>
                    <p className="mt-1 font-mono text-xs text-muted">{w.role}</p>
                    <p className="mt-4 text-base leading-relaxed text-muted">{w.line}</p>
                    <ul className="mt-5 space-y-2 text-sm">
                      {w.points.map((pt) => (
                        <li key={pt} className="flex gap-2.5">
                          <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0 text-accent"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <ul aria-label={t.projectsUi.techLabel} className="mt-auto flex flex-wrap gap-1.5 pt-6">
                      {w.tech.map((x) => <li key={x}><TechChip name={x} /></li>)}
                    </ul>
                  </div>
                </Card>
              ))}
            </ul>

            <h3 className="t-sub mt-14">{ui.sections.stack}</h3>
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
        <section id="experiencia" aria-labelledby="h-exp" className="scroll-mt-24 pt-24">
          <Reveal>
            <SectionHeader id="h-exp" index={ui.indexes.experience} eyebrow={ui.eyebrows.experience} title={ui.sections.experience} intro={ui.intros.experience} />
            <Experience entries={t.experience} t={t.experienceUi} />
          </Reveal>
        </section>

        {/* ---------------- Demos ---------------- */}
        <section id="demos" aria-labelledby="h-demos" className="scroll-mt-24 pt-24">
          <Reveal>
            <SectionHeader
              id="h-demos"
              index={ui.indexes.demos}
              eyebrow={ui.eyebrows.demos}
              title={ui.sections.demos}
              intro={ui.intros.demos}
              aside={<span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3.5 py-1.5 text-sm font-medium text-accent"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />{ui.asides.demos}</span>}
            />
          </Reveal>

          <div className="space-y-14">
            <Reveal>
              <div id="demo-rag" className="scroll-mt-24">
                <h3 className="t-sub mb-5">{ui.sections.rag}</h3>
                <RagDemo t={t.rag} />
              </div>
            </Reveal>
            <Reveal>
              <div id="demo-vitals" className="scroll-mt-24">
                <h3 className="t-sub mb-5">{ui.sections.vitals}</h3>
                <WebVitals t={t.vitals} />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------------- Proyectos ---------------- */}
        <section id="proyectos" aria-labelledby="h-projects" className="scroll-mt-24 pt-24">
          <Reveal>
            <SectionHeader
              id="h-projects"
              index={ui.indexes.projects}
              eyebrow={ui.eyebrows.projects}
              title={ui.sections.projects}
              intro={ui.intros.projects}
              aside={<span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3.5 py-1.5 text-sm font-medium text-accent"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />{ui.asides.projects}</span>}
            />
            <ProjectGrid
              t={t.projectsUi}
              github={profile.github}
              items={t.projects.map((p) => ({
                slug: p.slug,
                stack: p.stack,
                card: <ProjectCard project={p} t={t.projectsUi} />,
              }))}
            />
          </Reveal>
        </section>

        {/* ---------------- Hobbies ---------------- */}
        <section id="hobbies" aria-labelledby="h-hobbies" className="scroll-mt-24 pt-24">
          <Reveal>
            <SectionHeader id="h-hobbies" index={ui.indexes.hobbies} eyebrow={ui.eyebrows.hobbies} title={ui.sections.hobbies} />
            <Hobbies t={t.hobbies} />
          </Reveal>
        </section>

        {/* ---------------- Contacto ---------------- */}
        <section id="contacto" aria-labelledby="h-contact" className="scroll-mt-24 pt-24">
          <Reveal>
            <SectionHeader id="h-contact" index={ui.indexes.contact} eyebrow={ui.eyebrows.contact} title={ui.sections.contact} />
            <Contact t={ui.contact} cta={ui.cta} profile={profile} />
          </Reveal>
        </section>
      </main>

      <SiteFooter locale={locale} name={profile.name} ui={ui} />
    </>
  );
}

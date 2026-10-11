import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getContent, isLocale, locales } from "@/i18n";
import { isLegalDoc, legal, legalDocs } from "@/i18n/legal";

export const generateStaticParams = () => locales.flatMap((locale) => legalDocs.map((doc) => ({ locale, doc })));

type Params = Promise<{ locale: string; doc: string }>;

const slug = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, doc } = await params;
  if (!isLocale(locale) || !isLegalDoc(doc)) return {};
  const page = legal[locale][doc];
  return {
    title: `${page.title} · Sebastián Cofré`,
    description: page.description,
    alternates: { languages: { es: `/es/legal/${doc}`, en: `/en/legal/${doc}` } },
  };
}

export default async function LegalPage({ params }: { params: Params }) {
  const { locale, doc } = await params;
  if (!isLocale(locale) || !isLegalDoc(doc)) notFound();
  const { ui, profile } = getContent(locale);
  const l = legal[locale];
  const page = l[doc];
  const other = doc === "terms" ? "privacy" : "terms";

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
          <a href={`/${locale}`} className="group flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-surface font-display text-sm font-semibold tracking-tight">
              SC
            </span>
            <span className="text-sm text-muted transition-colors group-hover:text-foreground">← {ui.footer.home}</span>
          </a>
          <div className="flex items-center gap-2">
            <a
              href={`/${ui.lang.other}/legal/${doc}`}
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

      <main id="contenido" className="mx-auto max-w-7xl px-6 pb-24 pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_16rem]">
          <article className="min-w-0 max-w-3xl">
            <p className="t-eyebrow">{ui.footer.label}</p>
            <h1 className="t-section mt-3">{page.title}</h1>
            <p className="mt-3 font-mono text-xs text-faint">
              {l.updatedLabel}: {page.updated}
            </p>
            <p className="mt-8 text-lg leading-relaxed text-muted">{page.intro}</p>

            {page.sections.map((s, i) => (
              <section key={s.title} aria-labelledby={slug(s.title)} className="mt-12 scroll-mt-24">
                <h2 id={slug(s.title)} className="t-sub flex items-baseline gap-3">
                  <span className="font-mono text-sm font-normal text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                {s.body.map((p) => (
                  <p key={p} className="mt-4 leading-relaxed text-muted">{p}</p>
                ))}
                {s.list && (
                  <ul className="mt-4 space-y-2">
                    {s.list.map((li) => (
                      <li key={li} className="flex gap-3 leading-relaxed text-muted">
                        <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {li}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <a href={`/${locale}/legal/${other}`} className="mt-16 block border-t border-border pt-6 font-medium text-accent hover:underline lg:hidden">
              {l.related}: {l[other].title} →
            </a>
          </article>

          <aside className="hidden lg:block">
            <nav aria-label={l.toc} className="sticky top-24">
              <p className="t-eyebrow">{l.toc}</p>
              <ol className="mt-4 space-y-2 border-l border-border text-sm">
                {page.sections.map((s) => (
                  <li key={s.title}>
                    <a href={`#${slug(s.title)}`} className="-ml-px block border-l border-transparent pl-4 text-muted transition-colors hover:border-accent hover:text-foreground">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
              <p className="t-eyebrow mt-10">{l.related}</p>
              <a href={`/${locale}/legal/${other}`} className="mt-3 block text-sm font-medium text-accent hover:underline">
                {l[other].title} →
              </a>
            </nav>
          </aside>
        </div>
      </main>

      <SiteFooter locale={locale} name={profile.name} ui={ui} />
    </>
  );
}

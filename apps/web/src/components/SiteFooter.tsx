import type { Content, Locale } from "@/i18n";

/** Pie común a la portada y a las páginas legales. */
export function SiteFooter({ locale, name, ui }: { locale: Locale; name: string; ui: Content["ui"] }) {
  const links = [
    { href: `/${locale}/legal/terms`, label: ui.footer.terms },
    { href: `/${locale}/legal/privacy`, label: ui.footer.privacy },
  ];

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {name} · {ui.rights}
        </p>
        <nav aria-label={ui.footer.label}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="underline-offset-4 transition-colors hover:text-foreground hover:underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}

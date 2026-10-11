import type { Content } from "@/i18n";
import { Tabs } from "@/ui/Tabs";

type Entry = Content["experience"][number];

function Detail({ e }: { e: Entry }) {
  return (
    <>
      {e.sections.map((s) => (
        <div key={s.title} className="mt-6 first:mt-0">
          <h4 className="t-eyebrow">{s.title}</h4>
          <ul className="mt-3 space-y-2.5">
            {s.items.map((it) => (
              <li key={it.label} className="text-base leading-relaxed">
                <strong className="font-semibold">{it.label}:</strong> <span className="text-muted">{it.text}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

/**
 * En escritorio son pestañas con un pie Anterior/Siguiente; en móvil, una lista
 * desplegable donde todas las experiencias se ven de entrada.
 */
export function Experience({ entries, t }: { entries: Content["experience"]; t: Content["experienceUi"] }) {
  const header = (
    <p className="text-sm text-muted">
      <span className="mb-1.5 block w-fit whitespace-nowrap rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-xs text-accent">
        {t.count.replace("{n}", String(entries.length))}
      </span>
      {t.pick}
    </p>
  );

  return (
    <>
      <div className="hidden md:block">
        <Tabs
          label={t.label}
          header={header}
          pager={{ prev: t.prev, next: t.next, of: t.of }}
          items={entries.map((e) => ({
            id: e.id,
            label: e.company,
            hint: e.period,
            content: (
              <>
                <h3 className="t-sub">{e.role}</h3>
                <p className="mt-1.5 text-sm text-muted">{e.project}</p>
                <div className="mt-6">
                  <Detail e={e} />
                </div>
              </>
            ),
          }))}
        />
      </div>

      <ol aria-label={t.label} className="space-y-3 md:hidden">
        {entries.map((e, i) => (
          <li key={e.id}>
            <details open={i === 0} className="group card overflow-hidden">
              <summary className="flex cursor-pointer list-none items-center gap-3 p-5 [&::-webkit-details-marker]:hidden">
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold tracking-tight group-open:text-accent">{e.company}</span>
                  <span className="mt-0.5 block text-sm text-muted">{e.role}</span>
                  <span className="mt-0.5 block font-mono text-xs text-faint">{e.period}</span>
                </span>
                <svg aria-hidden="true" viewBox="0 0 16 16" className="h-5 w-5 shrink-0 text-faint transition-transform group-open:rotate-180 group-open:text-accent">
                  <path d="M3.5 6L8 10.5 12.5 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <div className="border-t border-border p-5">
                <p className="mb-5 text-sm text-muted">{e.project}</p>
                <Detail e={e} />
              </div>
            </details>
          </li>
        ))}
      </ol>
    </>
  );
}

import type { Content } from "@/i18n";
import { Tabs } from "@/ui/Tabs";

export function Experience({ entries, label }: { entries: Content["experience"]; label: string }) {
  return (
    <Tabs
      label={label}
      items={entries.map((e) => ({
        id: e.id,
        label: e.company,
        hint: e.period,
        content: (
          <>
            <h3 className="text-xl font-semibold">{e.role}</h3>
            <p className="mt-1 text-sm text-accent">{e.project}</p>
            {e.sections.map((s) => (
              <div key={s.title} className="mt-5">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-muted">{s.title}</h4>
                <ul className="mt-2 space-y-2">
                  {s.items.map((it) => (
                    <li key={it.label} className="text-sm leading-relaxed">
                      <strong>{it.label}:</strong> <span className="text-muted">{it.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        ),
      }))}
    />
  );
}

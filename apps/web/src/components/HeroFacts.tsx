import type { ReactNode } from "react";
import type { Content } from "@/i18n";
import { CertBadge } from "@/ui/CertBadge";
import { Counter } from "./Counter";

const icons = {
  time: <path d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  layers: <path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5" />,
  cap: <path d="M3 9l9-5 9 5-9 5-9-5Zm4 2.5V16c0 1.5 2.2 3 5 3s5-1.5 5-3v-4.5M21 9v6" />,
};

function Fact({ icon, label, children }: { icon?: keyof typeof icons; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-3.5 bg-surface p-5">
      {icon && (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {icons[icon]}
          </svg>
        </span>
      )}
      <div className="min-w-0">
        <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">{label}</dt>
        <dd className="mt-1.5">{children}</dd>
      </div>
    </div>
  );
}

/** Franja de datos rápidos al pie del hero: experiencia, industrias, formación y certificación. */
export function HeroFacts({ t }: { t: Pick<Content, "years" | "facts" | "education"> }) {
  return (
    <dl className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-[var(--shadow)] sm:grid-cols-2 lg:grid-cols-4">
      <Fact icon="time" label={t.facts.experience}>
        <span className="block text-2xl font-semibold tracking-tight">
          <Counter to={t.years.value} suffix={t.years.suffix} /> {t.facts.yearsUnit}
        </span>
        <span className="text-sm text-muted">{t.facts.yearsSub}</span>
      </Fact>
      <Fact icon="layers" label={t.facts.industries}>
        <span className="block text-base font-semibold tracking-tight">{t.facts.industriesValue}</span>
        <span className="text-sm text-muted">{t.facts.industriesSub}</span>
      </Fact>
      <Fact icon="cap" label={t.education.label}>
        <span className="block text-base font-semibold tracking-tight">{t.education.degree}</span>
        <span className="text-sm text-muted">{t.education.place}</span>
      </Fact>
      <Fact label={t.education.certLabel}>
        <CertBadge code="AZ-900" title={t.education.certTitle} issuer="Microsoft Certified" />
      </Fact>
    </dl>
  );
}

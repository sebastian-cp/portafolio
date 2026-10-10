import type { ReactNode } from "react";
import { siGithub } from "simple-icons";
import type { Content } from "@/i18n";
import { Button } from "@/ui/Button";
import { Card } from "@/ui/Card";
import { ChileFlag } from "@/ui/Flag";
import { ContactDialog } from "./ContactDialog";
import { CopyEmail } from "./CopyEmail";

type Props = { t: Content["ui"]["contact"]; cta: Content["ui"]["cta"]; profile: Content["profile"] };

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 6 8.5-6" />
  </svg>
);

const FileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </svg>
);

/** LinkedIn ya no está en simple-icons; es el mismo glifo, dibujado a mano. */
const LinkedInIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.77 2.55 4.77 5.86v5.59h-4v-4.95c0-1.18-.02-2.7-1.7-2.7-1.7 0-1.96 1.28-1.96 2.61v5.04h-4v-11Z" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d={siGithub.path} />
  </svg>
);

const Arrow = ({ down }: { down?: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    {...stroke}
    strokeWidth={2}
    aria-hidden="true"
    className="hidden shrink-0 text-faint transition-[transform,color] duration-200 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:block"
  >
    {down ? <path d="M12 5v14m-6-6 6 6 6-6" /> : <path d="M7 17 17 7M8 7h9v9" />}
  </svg>
);

const pretty = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

/** Fila de un canal: toda la fila es el enlace (vía `after:inset-0`) y deja hueco para acciones encima. */
function Channel({ icon, label, value, href, extra, external, download, newTab }: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  extra?: ReactNode;
  external?: boolean;
  download?: boolean;
  newTab?: string;
}) {
  return (
    <li className="group relative flex items-center gap-3 rounded-xl border border-border bg-surface/70 p-3 sm:gap-4 sm:pr-4 transition-colors hover:border-accent/50 hover:bg-surface-2 focus-within:border-accent/60">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg sm:h-11 sm:w-11 bg-accent-soft text-accent">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="t-eyebrow block">{label}</span>
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...(download ? { download: "" } : {})}
          className="mt-0.5 block truncate text-sm font-medium sm:text-[0.9375rem] text-foreground outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:ring-2 focus-visible:after:ring-accent"
        >
          {value}
          {external && newTab && <span className="sr-only"> {newTab}</span>}
        </a>
      </span>
      {extra}
      <Arrow down={download} />
    </li>
  );
}

export function Contact({ t, cta, profile }: Props) {
  return (
    <Card as="div" padding="none" spot={false} className="overflow-hidden">
      <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="relative flex flex-col p-6 sm:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-70 blur-3xl"
            style={{ background: "radial-gradient(closest-side, var(--glow-1), transparent)" }}
          />

          <p className="relative inline-flex w-fit items-center gap-2 rounded-full border border-good/25 bg-good/10 px-3 py-1 text-xs font-medium text-good">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-good" aria-hidden="true" />
            {t.status}
          </p>

          <h3 className="t-section relative mt-6 max-w-[16ch] text-balance">{t.title}</h3>
          <p className="relative mt-4 max-w-md leading-relaxed text-muted">{t.sub}</p>

          <div className="relative mt-8 flex flex-wrap gap-3">
            <ContactDialog t={t.form} email={profile.email}>
              <MailIcon />
              {t.cta}
            </ContactDialog>
            <Button href={profile.cv} download variant="secondary">{cta.cv}</Button>
          </div>

          <p className="relative mt-10 flex items-center gap-2 border-t border-border pt-6 font-mono text-xs text-faint lg:mt-auto">
            <ChileFlag />
            {profile.location}
          </p>
        </div>

        <div className="border-t border-border bg-surface-2/40 p-5 sm:p-10 lg:border-l lg:border-t-0">
          <p className="t-eyebrow">{t.channels}</p>
          <ul className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-3">
            <Channel
              icon={<MailIcon />}
              label={t.email}
              value={profile.email}
              href={`mailto:${profile.email}`}
              extra={<CopyEmail email={profile.email} label={t.copy} done={t.copied} />}
            />
            <Channel icon={<LinkedInIcon />} label="LinkedIn" value={pretty(profile.linkedin)} href={profile.linkedin} external newTab={t.newTab} />
            <Channel icon={<GitHubIcon />} label="GitHub" value={pretty(profile.github)} href={profile.github} external newTab={t.newTab} />
            <Channel icon={<FileIcon />} label={t.cvLabel} value={t.cvValue} href={profile.cv} download />
          </ul>
        </div>
      </div>
    </Card>
  );
}

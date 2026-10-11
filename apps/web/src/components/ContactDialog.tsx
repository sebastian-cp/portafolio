"use client";

import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { Content } from "@/i18n";
import { Button } from "@/ui/Button";

type Status = "idle" | "sending" | "sent" | "error";
type Kind = "recruiter" | "person";
type T = Content["ui"]["contact"]["form"];

const field =
  "w-full rounded-xl border border-border bg-surface-2 px-4 py-2 text-foreground transition-colors placeholder:text-faint focus:border-accent/60";
const label = "grid gap-1.5 text-sm text-muted";

/** Select con chevron propio: el nativo queda pegado al borde y no respeta el padding del campo. */
function Select({ name, placeholder, options }: { name: string; placeholder: string; options: readonly string[] }) {
  return (
    <span className="relative block">
      <select name={name} defaultValue="" className={`${field} appearance-none pr-11`}>
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m4 6 4 4 4-4" />
      </svg>
    </span>
  );
}

/** Grupo de opciones tipo chip: radios nativos (teclado y lector de pantalla gratis) con aspecto de pastilla. */
function Choices({ name, legend, options, required }: { name: string; legend: string; options: readonly string[]; required?: boolean }) {
  return (
    <fieldset className="grid gap-2">
      <legend className="mb-1.5 text-sm text-muted">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input type="radio" name={name} value={o} required={required} className="peer sr-only" />
            {/* Sin la clase .chip: está fuera de las capas de Tailwind y taparía el estado peer-checked. */}
            <span className="inline-flex items-center rounded-full border border-border bg-surface-2 px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent/50 hover:text-foreground peer-checked:border-accent peer-checked:bg-accent-soft peer-checked:text-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-accent">
              {o}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** "Escríbeme" abre un formulario que envía el mensaje por /api/contact (Resend), sin salir de la página. */
export function ContactDialog({ t, email, children }: { t: T; email: string; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [kind, setKind] = useState<Kind>("recruiter");
  const titleId = useId();

  const close = () => dialog.current?.close();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, ...Object.fromEntries(new FormData(form)) }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const recruiter = kind === "recruiter";

  return (
    <>
      <Button onClick={() => { setStatus("idle"); dialog.current?.showModal(); }} aria-haspopup="dialog">
        {children}
      </Button>
      <dialog
        ref={dialog}
        aria-labelledby={titleId}
        onClick={(e) => { if (e.target === dialog.current) close(); }}
        className="panel-in m-auto max-h-[96dvh] w-[min(46rem,94vw)] overflow-hidden rounded-2xl border border-border bg-surface p-0 text-foreground shadow-[0_24px_80px_-20px_rgba(0,0,0,0.6)] backdrop:bg-black/60 backdrop:backdrop-blur-sm open:flex open:flex-col"
      >
        {/* Cabecera y pie fijos: si en pantallas bajas hay que desplazar, solo se mueven los campos. */}
        <div className="shrink-0 border-b border-border px-6 pb-4 pt-5 sm:px-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id={titleId} className="t-card">{t.title}</h2>
              <p className="mt-1 text-sm text-muted">{t.intro}</p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label={t.close}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-accent/50 hover:text-foreground"
            >
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
          </div>

          {status !== "sent" && (
            <div role="radiogroup" aria-label={t.who} className="mt-4 grid grid-cols-2 gap-1 rounded-xl border border-border bg-surface-2 p-1">
              {(["recruiter", "person"] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  role="radio"
                  aria-checked={kind === k}
                  onClick={() => setKind(k)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    kind === k ? "bg-accent-soft text-foreground shadow-[inset_0_0_0_1px_var(--accent)]" : "text-muted hover:text-foreground"
                  }`}
                >
                  {k === "recruiter" ? t.kindRecruiter : t.kindPerson}
                </button>
              ))}
            </div>
          )}
        </div>

        {status === "sent" ? (
          <div className="px-6 py-6 sm:px-7">
            <p role="status" className="leading-relaxed text-muted">{recruiter ? t.sentRecruiter : t.sentPerson}</p>
            <Button className="mt-6" onClick={close}>{t.close}</Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col">
            <div className="grid min-h-0 gap-3.5 overflow-y-auto px-6 py-4 sm:px-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className={label}>
                  {t.name}
                  <input name="name" required maxLength={100} autoComplete="name" className={field} />
                </label>
                <label className={label}>
                  {recruiter ? t.workEmail : t.email}
                  <input name="email" type="email" required maxLength={200} autoComplete="email" className={field} />
                </label>
              </div>

              {recruiter ? (
                <>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <label className={label}>
                      {t.company}
                      <input name="company" required maxLength={120} autoComplete="organization" className={field} />
                    </label>
                    <label className={label}>
                      {t.role}
                      <input name="role" maxLength={120} placeholder={t.rolePlaceholder} className={field} />
                    </label>
                    <label className={label}>
                      {t.link}
                      <input name="link" type="url" maxLength={300} placeholder="https://" className={field} />
                    </label>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Choices name="modality" legend={t.modality} options={t.modalityOptions} />
                    <Choices name="engagement" legend={t.engagement} options={t.engagementOptions} />
                  </div>
                </>
              ) : (
                <>
                  <Choices name="project" legend={t.project} options={t.projectOptions} />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className={label}>
                      {t.budget}
                      <Select name="budget" placeholder={t.optional} options={t.budgetOptions} />
                    </label>
                    <label className={label}>
                      {t.timeline}
                      <Select name="timeline" placeholder={t.optional} options={t.timelineOptions} />
                    </label>
                  </div>
                </>
              )}

              <label className={label}>
                {t.message}
                <textarea
                  name="message"
                  required
                  maxLength={5000}
                  rows={3}
                  placeholder={recruiter ? t.messageRecruiter : t.messagePerson}
                  className={`${field} resize-y`}
                />
              </label>

              {/* Campo trampa para bots: fuera de pantalla y fuera del orden de tabulación. */}
              <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />

              {status === "error" && (
                <p role="alert" className="text-sm text-bad">
                  {t.error} <a className="underline underline-offset-4" href={`mailto:${email}`}>{email}</a>
                </p>
              )}
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-3 border-t border-border px-6 py-4 sm:px-7">
              <Button type="submit" disabled={status === "sending"}>
                {status === "sending" ? t.sending : t.send}
              </Button>
              <span className="text-xs text-faint">
                {t.privacy}{" "}
                <a href={t.privacyHref} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-foreground">
                  {t.privacyLink}
                </a>
              </span>
            </div>
          </form>
        )}
      </dialog>
    </>
  );
}

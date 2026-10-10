"use client";

import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { Content } from "@/i18n";
import { Button } from "@/ui/Button";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 transition-colors placeholder:text-faint focus:border-accent/60";

/** "Escríbeme" abre un formulario que envía el mensaje por /api/contact (Resend), sin salir de la página. */
export function ContactDialog({ t, email, children }: { t: Content["ui"]["contact"]["form"]; email: string; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<Status>("idle");
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
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Button onClick={() => { setStatus("idle"); dialog.current?.showModal(); }} aria-haspopup="dialog">
        {children}
      </Button>
      <dialog
        ref={dialog}
        aria-labelledby={titleId}
        onClick={(e) => { if (e.target === dialog.current) close(); }}
        className="panel-in m-auto w-[min(32rem,94vw)] rounded-2xl border border-border bg-surface p-0 text-foreground shadow-[0_24px_80px_-20px_rgba(0,0,0,0.6)] backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2 id={titleId} className="t-card">{t.title}</h2>
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

          {status === "sent" ? (
            <div className="mt-6">
              <p role="status" className="leading-relaxed text-muted">{t.sent}</p>
              <Button className="mt-6" onClick={close}>{t.close}</Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 grid gap-4">
              <label className="grid gap-1.5 text-sm text-muted">
                {t.name}
                <input name="name" required maxLength={100} autoComplete="name" className={field} />
              </label>
              <label className="grid gap-1.5 text-sm text-muted">
                {t.email}
                <input name="email" type="email" required maxLength={200} autoComplete="email" className={field} />
              </label>
              <label className="grid gap-1.5 text-sm text-muted">
                {t.message}
                <textarea name="message" required maxLength={5000} rows={5} className={`${field} resize-y`} />
              </label>
              {/* Campo trampa para bots: fuera de pantalla y fuera del orden de tabulación. */}
              <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />

              {status === "error" && (
                <p role="alert" className="text-sm text-bad">
                  {t.error} <a className="underline underline-offset-4" href={`mailto:${email}`}>{email}</a>
                </p>
              )}

              <Button type="submit" disabled={status === "sending"} className="justify-self-start">
                {status === "sending" ? t.sending : t.send}
              </Button>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}

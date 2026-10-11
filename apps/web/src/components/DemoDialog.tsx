"use client";

import { useId, useRef, useState } from "react";
import type { Content } from "@/i18n";

interface Props {
  src: string;
  title: string;
  t: Content["projectsUi"];
  className?: string;
}

/** Abre una demo externa (la app de Angular) en un modal, sin salir del portafolio. */
export function DemoDialog({ src, title, t, className }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  // El iframe solo se monta al abrir: así la app de Angular no se descarga con la página.
  // `?embed` le dice a la demo que oculte su menú: aquí se ve una demo a la vez.
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const titleId = useId();

  const show = () => {
    setOpen(true);
    dialog.current?.showModal();
  };

  return (
    <>
      <button type="button" className={className} onClick={show} aria-haspopup="dialog">
        {t.demo}<span className="sr-only"> {t.of} {title}</span>
      </button>
      <dialog
        ref={dialog}
        aria-labelledby={titleId}
        onClose={() => { setOpen(false); setLoaded(false); }}
        onClick={(e) => { if (e.target === dialog.current) dialog.current?.close(); }}
        className="panel-in m-auto h-[min(52rem,92dvh)] w-[min(80rem,96vw)] overflow-hidden rounded-2xl border border-border bg-surface p-0 text-foreground shadow-[0_24px_80px_-20px_rgba(0,0,0,0.6)] backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        <div className="flex h-full flex-col">
          <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
            <h2 id={titleId} className="truncate text-sm font-semibold">{title}</h2>
            <div className="flex shrink-0 items-center gap-3 text-sm font-medium">
              <a className="text-accent underline underline-offset-4" href={src} target="_blank" rel="noopener noreferrer">
                {t.newTab}
              </a>
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                aria-label={t.close}
                className="grid h-8 w-8 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-accent/50 hover:text-foreground"
              >
                <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            </div>
          </header>
          <div className="relative flex-1 bg-background">
            {!loaded && (
              <p role="status" className="absolute inset-0 grid place-items-center text-sm text-muted">{t.loading}</p>
            )}
            {open && (
              <iframe
                src={`${src}${src.includes("?") ? "&" : "?"}embed&theme=${document.documentElement.dataset.theme ?? ""}`}
                title={title}
                onLoad={() => setLoaded(true)}
                className="relative h-full w-full border-0"
              />
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}

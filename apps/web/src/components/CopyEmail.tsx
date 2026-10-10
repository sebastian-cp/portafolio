"use client";

import { useEffect, useState } from "react";

/** Botón compacto que copia el correo y lo confirma en una región viva. */
export function CopyEmail({ email, label, done }: { email: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  return (
    <>
      <button
        type="button"
        onClick={() => navigator.clipboard?.writeText(email).then(() => setCopied(true))}
        aria-label={label}
        title={label}
        className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-surface text-muted transition-colors hover:border-accent/50 hover:text-foreground"
      >
        {copied ? (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" className="text-good" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="9" y="9" width="12" height="12" rx="2" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" strokeLinecap="round" />
          </svg>
        )}
      </button>
      <span role="status" className="sr-only">{copied ? done : ""}</span>
    </>
  );
}

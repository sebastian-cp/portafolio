"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { toggleTheme } from "@/lib/theme";

interface Action {
  id: string;
  label: string;
  run: () => void;
}

interface Props {
  email: string;
  github: string;
  linkedin: string;
  cv: string;
}

const fold = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export function CommandPalette({ email, github, linkedin, cv }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [notice, setNotice] = useState("");
  const listId = useId();

  const open = useCallback(() => {
    setQuery("");
    setActive(0);
    dialog.current?.showModal();
  }, []);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialog.current?.open) dialog.current.close();
        else open();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 2000);
    return () => clearTimeout(t);
  }, [notice]);

  const actions = useMemo<Action[]>(() => {
    const go = (id: string) => () => { window.location.hash = id; };
    const ext = (url: string) => () => { window.open(url, "_blank", "noopener,noreferrer"); };
    return [
      { id: "a-sobre", label: "Ir a Sobre mí", run: go("sobre-mi") },
      { id: "a-exp", label: "Ir a Experiencia", run: go("experiencia") },
      { id: "a-demo", label: "Probar demo RAG", run: go("demo-rag") },
      { id: "a-proy", label: "Ir a Proyectos", run: go("proyectos") },
      { id: "a-cont", label: "Ir a Contacto", run: go("contacto") },
      { id: "a-theme", label: "Cambiar tema claro/oscuro", run: () => { toggleTheme(); } },
      { id: "a-mail", label: "Copiar correo", run: () => { navigator.clipboard?.writeText(email).then(() => setNotice("Correo copiado")); } },
      { id: "a-cv", label: "Descargar CV (PDF)", run: () => { window.open(cv, "_blank"); } },
      { id: "a-gh", label: "Abrir GitHub", run: ext(github) },
      { id: "a-li", label: "Abrir LinkedIn", run: ext(linkedin) },
    ];
  }, [email, cv, github, linkedin]);

  const filtered = actions.filter((a) => fold(a.label).includes(fold(query)));

  const run = (a?: Action) => {
    if (!a) return;
    dialog.current?.close();
    a.run();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); run(filtered[active]); }
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-keyshortcuts="Control+K Meta+K"
        className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm text-muted hover:text-foreground"
      >
        Buscar <kbd className="hidden font-mono text-xs sm:inline">Ctrl K</kbd>
      </button>

      <dialog
        ref={dialog}
        aria-label="Paleta de comandos"
        onClick={(e) => { if (e.target === dialog.current) dialog.current?.close(); }}
        className="m-auto mt-[15vh] w-[min(32rem,92vw)] rounded-xl border border-border bg-surface p-0 text-foreground backdrop:bg-black/50"
      >
        <input
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={filtered[active] ? `${listId}-${active}` : undefined}
          aria-label="Buscar comando"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setActive(0); }}
          onKeyDown={onKeyDown}
          placeholder="Escribe un comando…"
          autoComplete="off"
          className="w-full rounded-t-xl border-b border-border bg-transparent px-4 py-3 outline-none"
        />
        <ul id={listId} role="listbox" aria-label="Comandos" className="max-h-72 overflow-y-auto p-2">
          {filtered.map((a, i) => (
            <li
              key={a.id}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseMove={() => setActive(i)}
              onClick={() => run(a)}
              className="cursor-pointer rounded-lg px-3 py-2 text-sm aria-selected:bg-accent aria-selected:text-accent-contrast"
            >
              {a.label}
            </li>
          ))}
          {filtered.length === 0 && <li className="px-3 py-2 text-sm text-muted">Sin resultados</li>}
        </ul>
      </dialog>

      <div role="status" className="sr-only">{notice}</div>
      {notice && (
        <div aria-hidden="true" className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-foreground px-4 py-2 text-sm text-background">
          {notice}
        </div>
      )}
    </>
  );
}

"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import type { Content, Locale } from "@/i18n";
import { toggleTheme } from "@/lib/theme";

interface Action {
  id: string;
  label: string;
  run: () => void;
}

interface Props {
  t: Content["palette"];
  profile: Content["profile"];
  otherLocale: Locale;
}

const fold = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export function CommandPalette({ t, profile, otherLocale }: Props) {
  const { email, github, linkedin, cv } = profile;
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
      { id: "a-sobre", label: t.actions.about, run: go("trabajo") },
      { id: "a-exp", label: t.actions.experience, run: go("experiencia") },
      { id: "a-demo", label: t.actions.rag, run: go("demo-rag") },
      { id: "a-vit", label: t.actions.vitals, run: go("demo-vitals") },
      { id: "a-a11y", label: t.actions.a11y, run: go("demo-a11y") },
      { id: "a-proy", label: t.actions.projects, run: go("proyectos") },
      { id: "a-hob", label: t.actions.hobbies, run: go("hobbies") },
      { id: "a-cont", label: t.actions.contact, run: go("contacto") },
      { id: "a-theme", label: t.actions.theme, run: () => { toggleTheme(); } },
      { id: "a-lang", label: t.actions.lang, run: () => { window.location.assign(`/${otherLocale}`); } },
      { id: "a-mail", label: t.actions.mail, run: () => { navigator.clipboard?.writeText(email).then(() => setNotice(t.copied)); } },
      { id: "a-cv", label: t.actions.cv, run: () => { window.open(cv, "_blank"); } },
      { id: "a-gh", label: t.actions.github, run: ext(github) },
      { id: "a-li", label: t.actions.linkedin, run: ext(linkedin) },
    ];
  }, [t, email, cv, github, linkedin, otherLocale]);

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
        aria-label={t.open}
        aria-keyshortcuts="Control+K Meta+K"
        className="flex items-center gap-2 rounded-lg border border-border bg-surface/60 py-2 pl-3 pr-2 text-sm text-muted transition-colors hover:border-accent/50 hover:text-foreground"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <span className="hidden sm:inline">{t.open}</span>
        <kbd className="hidden sm:inline">Ctrl K</kbd>
      </button>

      <dialog
        ref={dialog}
        aria-label={t.title}
        onClick={(e) => { if (e.target === dialog.current) dialog.current?.close(); }}
        className="panel-in m-auto mt-[14vh] w-[min(34rem,92vw)] rounded-2xl border border-border bg-surface p-0 text-foreground shadow-[0_24px_80px_-20px_rgba(0,0,0,0.6)] backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        <input
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={filtered[active] ? `${listId}-${active}` : undefined}
          aria-label={t.inputLabel}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setActive(0); }}
          onKeyDown={onKeyDown}
          placeholder={t.placeholder}
          autoComplete="off"
          className="w-full rounded-t-2xl border-b border-border bg-transparent px-4 py-3.5 outline-none placeholder:text-faint"
        />
        <ul id={listId} role="listbox" aria-label={t.list} className="max-h-72 overflow-y-auto p-2">
          {filtered.map((a, i) => (
            <li
              key={a.id}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseMove={() => setActive(i)}
              onClick={() => run(a)}
              className="cursor-pointer rounded-lg px-3 py-2 text-sm text-muted aria-selected:bg-accent-soft aria-selected:text-foreground"
            >
              {a.label}
            </li>
          ))}
          {filtered.length === 0 && <li className="px-3 py-2 text-sm text-faint">{t.empty}</li>}
        </ul>
      </dialog>

      <div role="status" className="sr-only">{notice}</div>
      {notice && (
        <div aria-hidden="true" className="panel-in fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]">
          {notice}
        </div>
      )}
    </>
  );
}

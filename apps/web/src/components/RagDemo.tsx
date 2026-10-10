"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Content } from "@/i18n";
import { retrieve, type Hit } from "@/lib/rag";
import { Button } from "@/ui/Button";

export function RagDemo({ t }: { t: Content["rag"] }) {
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<Hit[] | null>(null);
  const [answer, setAnswer] = useState("");
  const [shown, setShown] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);

  const words = answer.split(" ");
  const streaming = shown < words.length;

  useEffect(() => () => clearInterval(timer.current), []);

  const ask = (q: string) => {
    clearInterval(timer.current);
    const found = retrieve(q, t.knowledge);
    const text = found.length ? found[0].chunk.text : t.noAnswer;
    const n = text.split(" ").length;
    setHits(found);
    setAnswer(text);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return setShown(n);
    setShown(0);
    let i = 0;
    timer.current = setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= n) clearInterval(timer.current);
    }, 35);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) ask(query);
  };

  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <p className="text-sm text-muted">{t.intro}</p>

      <form onSubmit={onSubmit} className="mt-4 flex gap-2">
        <label htmlFor="rag-q" className="sr-only">{t.label}</label>
        <input
          id="rag-q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.placeholder}
          autoComplete="off"
          className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2"
        />
        <Button type="submit">{t.ask}</Button>
      </form>

      <ul className="mt-3 flex flex-wrap gap-2" aria-label={t.suggested}>
        {t.suggestions.map((s) => (
          <li key={s}>
            <button type="button" onClick={() => { setQuery(s); ask(s); }} className="rounded-full border border-border px-3 py-1 text-xs text-muted hover:text-foreground">
              {s}
            </button>
          </li>
        ))}
      </ul>

      {hits && (
        <div className="panel-in mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted">{t.retrieved}</h4>
            {hits.length === 0 && <p className="mt-2 text-sm text-muted">{t.none}</p>}
            <ol className="mt-2 space-y-3">
              {hits.map(({ chunk, score }) => (
                <li key={chunk.id} className="rounded-lg border border-border p-3 text-sm">
                  <div className="flex items-center justify-between gap-2 font-mono text-xs text-muted">
                    <span>{chunk.source}</span>
                    <span>{score.toFixed(2)}</span>
                  </div>
                  <div aria-hidden="true" className="mt-1 h-1 rounded bg-border">
                    <div className="h-full rounded bg-accent" style={{ width: `${Math.min(score * 100, 100)}%` }} />
                  </div>
                  <p className="mt-2 text-muted">{chunk.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted">{t.answer}</h4>
            <p className="mt-2 leading-relaxed" aria-hidden={streaming}>
              {words.slice(0, shown).join(" ")}
              {streaming && <span className="caret" />}
            </p>
            <p role="status" className="sr-only">{streaming ? "" : answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}

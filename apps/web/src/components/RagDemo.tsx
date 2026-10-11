"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Content } from "@/i18n";
import { retrieve, type Hit } from "@/lib/rag";
import { Button } from "@/ui/Button";
import { Card } from "@/ui/Card";

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
    <Card as="div" padding="lg" spot={false}>
      <p className="text-sm text-muted">{t.intro}</p>

      <form onSubmit={onSubmit} className="mt-4 flex gap-2">
        <label htmlFor="rag-q" className="sr-only">{t.label}</label>
        <input
          id="rag-q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.placeholder}
          autoComplete="off"
          className="min-w-0 flex-1 rounded-xl border border-border bg-surface-2 px-4 py-2.5 transition-colors placeholder:text-faint focus:border-accent/60"
        />
        <Button type="submit">{t.ask}</Button>
      </form>

      <p className="mt-4 text-xs text-faint">{t.suggested}</p>
      <ul className="mt-2 flex flex-wrap gap-2" aria-label={t.suggested}>
        {t.suggestions.map((s) => (
          <li key={s}>
            {/* Aspecto de botón (acento, flecha, hover marcado): como chip gris no parecía clickeable. */}
            <button
              type="button"
              onClick={() => { setQuery(s); ask(s); }}
              className="group inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-accent/40 bg-accent-soft px-3.5 py-1.5 text-sm font-medium text-accent transition-colors hover:border-accent hover:bg-accent/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {s}
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </button>
          </li>
        ))}
      </ul>

      {hits && (
        <div className="panel-in mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="t-eyebrow">{t.retrieved}</h4>
            {hits.length === 0 && <p className="mt-2 text-sm text-muted">{t.none}</p>}
            <ol className="mt-2 space-y-3">
              {hits.map(({ chunk, score }) => (
                <li key={chunk.id} className="rounded-xl border border-border bg-surface-2/60 p-3 text-sm">
                  <div className="flex items-center justify-between gap-2 font-mono text-xs text-muted">
                    <span>{chunk.source}</span>
                    <span>{score.toFixed(2)}</span>
                  </div>
                  <div aria-hidden="true" className="mt-1.5 h-1 overflow-hidden rounded-full bg-border">
                    <div className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2" style={{ width: `${Math.min(score * 100, 100)}%` }} />
                  </div>
                  <p className="mt-2 text-muted">{chunk.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h4 className="t-eyebrow">{t.answer}</h4>
            <p className="mt-2 text-lg leading-relaxed" aria-hidden={streaming}>
              {words.slice(0, shown).join(" ")}
              {streaming && <span className="caret" />}
            </p>
            <p role="status" className="sr-only">{streaming ? "" : answer}</p>
          </div>
        </div>
      )}
    </Card>
  );
}

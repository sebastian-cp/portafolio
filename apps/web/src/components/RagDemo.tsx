"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { knowledge, suggestions } from "@/data/knowledge";
import { retrieve, type Hit } from "@/lib/rag";

const NO_ANSWER = "No encontré eso en mi CV. Prueba preguntando por experiencia, tecnologías o proyectos.";

export function RagDemo() {
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
    const found = retrieve(q, knowledge);
    const text = found.length ? `${found[0].chunk.text}` : NO_ANSWER;
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
      <p className="text-sm text-muted">
        Simulación local de un flujo <abbr title="Retrieval-Augmented Generation">RAG</abbr>, como el que implementé en LUXXOR:
        tu pregunta se convierte en vector (TF-IDF), se buscan los fragmentos más cercanos de mi CV y se responde con el mejor. Sin APIs externas.
      </p>

      <form onSubmit={onSubmit} className="mt-4 flex gap-2">
        <label htmlFor="rag-q" className="sr-only">Pregunta sobre mi experiencia</label>
        <input
          id="rag-q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pregúntale a mi CV…"
          autoComplete="off"
          className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2"
        />
        <button type="submit" className="rounded-lg bg-accent px-4 py-2 font-medium text-accent-contrast">Preguntar</button>
      </form>

      <ul className="mt-3 flex flex-wrap gap-2" aria-label="Preguntas sugeridas">
        {suggestions.map((s) => (
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
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">1 · Fragmentos recuperados</h3>
            {hits.length === 0 && <p className="mt-2 text-sm text-muted">Ninguno superó el umbral de similitud.</p>}
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
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">2 · Respuesta</h3>
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

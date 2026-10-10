"use client";

import { useEffect, useRef, useState } from "react";
import type { Content } from "@/i18n";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";

type Key = "lcp" | "cls" | "inp" | "fcp" | "ttfb";
type Rating = "good" | "needs" | "poor";

const LIMITS: Record<Key, [number, number]> = {
  lcp: [2500, 4000],
  cls: [0.1, 0.25],
  inp: [200, 500],
  fcp: [1800, 3000],
  ttfb: [800, 1800],
};
const ORDER: Key[] = ["lcp", "cls", "inp", "fcp", "ttfb"];
const TONE = { good: "good", needs: "warn", poor: "bad" } as const;

export const rate = (k: Key, v: number): Rating => (v <= LIMITS[k][0] ? "good" : v <= LIMITS[k][1] ? "needs" : "poor");

const format = (k: Key, v: number) =>
  k === "cls" ? v.toFixed(3) : v >= 1000 ? `${(v / 1000).toFixed(2)} s` : `${Math.round(v)} ms`;

interface LayoutShiftEntry extends PerformanceEntry { value: number; hadRecentInput: boolean }
interface EventTimingEntry extends PerformanceEntry { interactionId?: number }

function useWebVitals() {
  const [v, setV] = useState<Partial<Record<Key, number>>>({ cls: 0 });

  useEffect(() => {
    const observers: PerformanceObserver[] = [];
    const set = (k: Key, val: number) => setV((p) => ({ ...p, [k]: val }));
    const observe = (type: string, cb: (e: PerformanceEntryList) => void, extra: object = {}) => {
      try {
        const o = new PerformanceObserver((l) => cb(l.getEntries()));
        o.observe({ type, buffered: true, ...extra } as PerformanceObserverInit);
        observers.push(o);
      } catch {
        /* métrica no soportada por este navegador */
      }
    };

    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (nav) set("ttfb", nav.responseStart);

    observe("paint", (es) => {
      const e = es.find((x) => x.name === "first-contentful-paint");
      if (e) set("fcp", e.startTime);
    });
    observe("largest-contentful-paint", (es) => set("lcp", es[es.length - 1].startTime));

    // CLS: ventana de sesión máxima (huecos < 1 s, duración < 5 s)
    let cur = 0, start = 0, last = 0, max = 0;
    observe("layout-shift", (es) => {
      for (const e of es as LayoutShiftEntry[]) {
        if (e.hadRecentInput) continue;
        if (cur && e.startTime - last < 1000 && e.startTime - start < 5000) cur += e.value;
        else { cur = e.value; start = e.startTime; }
        last = e.startTime;
        max = Math.max(max, cur);
      }
      set("cls", max);
    });

    // INP: duración por interacción; se toma un percentil alto
    const byId = new Map<number, number>();
    observe("event", (es) => {
      for (const e of es as EventTimingEntry[]) {
        if (!e.interactionId) continue;
        byId.set(e.interactionId, Math.max(byId.get(e.interactionId) ?? 0, e.duration));
      }
      const arr = [...byId.values()].sort((a, b) => b - a);
      if (arr.length) set("inp", arr[Math.min(Math.floor(arr.length / 50), arr.length - 1)]);
    }, { durationThreshold: 16 });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return v;
}

export function WebVitals({ t }: { t: Content["vitals"] }) {
  const values = useWebVitals();
  const [banner, setBanner] = useState(false);
  const [clicks, setClicks] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const insertBanner = () => {
    // Se inserta >500 ms después del clic: los shifts "con input reciente" no cuentan para CLS.
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setBanner(true), 800);
  };
  const slow = () => {
    const t0 = performance.now();
    while (performance.now() - t0 < 300) { /* bloquea el hilo a propósito */ }
    setClicks((c) => c + 1);
  };

  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <p className="text-sm text-muted">{t.intro}</p>

      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {ORDER.map((k) => {
          const val = values[k];
          const r = val === undefined ? null : rate(k, val);
          const pct = val === undefined ? 0 : Math.min((val / LIMITS[k][1]) * 100, 100);
          return (
            <li key={k} data-metric={k} className="rounded-lg border border-border p-3">
              <p className="font-mono text-xs text-muted" title={t.metrics[k].full}>
                <abbr title={t.metrics[k].full}>{t.metrics[k].name}</abbr>
              </p>
              <p className="mt-1 text-2xl font-bold tabular-nums">
                {val === undefined ? "—" : format(k, val)}
              </p>
              <div aria-hidden="true" className="mt-2 h-1 rounded bg-border">
                <div className="h-full rounded bg-accent transition-[width] duration-500" style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-2 min-h-6 text-xs">
                {r ? <Badge tone={TONE[r]}>{t.ratings[r]}</Badge> : <span className="text-muted">{k === "inp" ? t.interact : t.measuring}</span>}
              </p>
            </li>
          );
        })}
      </ul>

      <details className="mt-4 text-sm">
        <summary className="cursor-pointer text-accent">{t.metrics.lcp.full} · {t.metrics.cls.full} · {t.metrics.inp.full}</summary>
        <ul className="mt-2 space-y-1 text-muted">
          {ORDER.map((k) => (
            <li key={k}><strong className="text-foreground">{t.metrics[k].name}:</strong> {t.metrics[k].tip}</li>
          ))}
        </ul>
      </details>

      <h4 className="mt-6 text-sm font-semibold uppercase tracking-wide text-muted">{t.play}</h4>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button variant="secondary" size="sm" onClick={insertBanner} disabled={banner}>{t.shift}</Button>
        <Button variant="ghost" size="sm" onClick={() => { clearTimeout(timer.current); setBanner(false); }} disabled={!banner}>{t.shiftReset}</Button>
        <Button variant="secondary" size="sm" onClick={() => setClicks((c) => c + 1)}>{t.fast}</Button>
        <Button variant="secondary" size="sm" onClick={slow}>{t.slow}</Button>
        <span className="self-center text-xs text-muted">{t.clicks}: {clicks}</span>
      </div>

      <div className="mt-4 min-h-72 rounded-lg border border-dashed border-border p-4">
        {banner && (
          <div role="status" className="mb-4 flex h-40 items-center justify-center rounded-lg bg-accent text-center font-medium text-accent-contrast">
            {t.banner}
          </div>
        )}
        <p className="text-sm text-muted">{t.lorem}</p>
        <div className="mt-3 h-24 rounded bg-background" />
      </div>
      <p className="mt-3 text-xs text-muted">{t.note}</p>
    </div>
  );
}

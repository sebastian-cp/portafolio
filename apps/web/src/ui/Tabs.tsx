"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export interface TabItem {
  id: string;
  label: ReactNode;
  hint?: ReactNode;
  content: ReactNode;
}

interface Pager {
  prev: string;
  next: string;
  /** Separador del contador, p. ej. "de" en "1 de 3". */
  of: string;
}

interface Props {
  items: TabItem[];
  label: string;
  orientation?: "horizontal" | "vertical";
  /** Texto sobre la lista de pestañas: dice cuántas hay y que se pueden elegir. */
  header?: ReactNode;
  /** Botones Anterior/Siguiente al pie del panel, para recorrerlas sin volver a la lista. */
  pager?: Pager;
  className?: string;
}

const Chevron = ({ className = "" }: { className?: string }) => (
  <svg aria-hidden="true" viewBox="0 0 16 16" className={`h-4 w-4 shrink-0 ${className}`}>
    <path d="M6 3.5L10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Tabs WAI-ARIA: roving tabindex y navegación con flechas, Home y End. */
export function Tabs({ items, label, orientation = "vertical", header, pager, className = "" }: Props) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();
  const vertical = orientation === "vertical";
  const last = items.length - 1;

  const select = (i: number, focus = false) => {
    setActive(i);
    if (focus) refs.current[i]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const prevKey = vertical ? "ArrowUp" : "ArrowLeft";
    const nextKey = vertical ? "ArrowDown" : "ArrowRight";
    const next =
      e.key === nextKey ? (active === last ? 0 : active + 1)
      : e.key === prevKey ? (active === 0 ? last : active - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    select(next, true);
  };

  const current = items[active];

  return (
    <div className={`grid gap-6 ${vertical ? "md:grid-cols-[17rem_1fr]" : ""} ${className}`}>
      <div className="min-w-0">
        {header && <div className="mb-3">{header}</div>}
        <div role="tablist" aria-label={label} aria-orientation={orientation} onKeyDown={onKeyDown} className={`flex gap-2 overflow-x-auto ${vertical ? "md:flex-col" : ""}`}>
          {items.map((item, i) => (
            <button
              key={item.id}
              ref={(el) => { refs.current[i] = el; }}
              role="tab"
              type="button"
              id={`${uid}-tab-${item.id}`}
              aria-selected={active === i}
              aria-controls={`${uid}-panel-${item.id}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => select(i)}
              className="group relative flex shrink-0 cursor-pointer items-center gap-3 overflow-hidden rounded-xl border border-border bg-surface/60 py-3 pl-4 pr-3 text-left transition-colors hover:border-accent/50 hover:bg-surface aria-selected:border-accent/70 aria-selected:bg-surface aria-selected:shadow-[inset_0_1px_0_0_var(--hairline)]"
            >
              <span aria-hidden="true" className="absolute inset-y-2 left-0 w-[3px] rounded-r-full bg-accent opacity-0 transition-opacity group-aria-selected:opacity-100" />
              <span className="min-w-0 flex-1">
                <span className="block font-semibold tracking-tight transition-colors group-aria-selected:text-accent">{item.label}</span>
                {item.hint && <span className="mt-0.5 block text-xs text-muted">{item.hint}</span>}
              </span>
              <Chevron className="text-faint transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-foreground group-aria-selected:text-accent" />
            </button>
          ))}
        </div>
      </div>
      <div key={current.id} role="tabpanel" id={`${uid}-panel-${current.id}`} aria-labelledby={`${uid}-tab-${current.id}`} tabIndex={0} className="panel-in card flex flex-col p-6 sm:p-8">
        <div className="flex-1">{current.content}</div>
        {pager && items.length > 1 && (
          <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-5">
            <button
              type="button"
              onClick={() => select(active === 0 ? last : active - 1)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-muted transition-colors hover:border-accent/50 hover:text-foreground"
            >
              <Chevron className="rotate-180" />
              {pager.prev}
            </button>
            <span className="font-mono text-xs text-faint" aria-live="polite">
              {active + 1} {pager.of} {items.length}
            </span>
            <button
              type="button"
              onClick={() => select(active === last ? 0 : active + 1)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent-soft px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent"
            >
              {pager.next}
              <Chevron />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

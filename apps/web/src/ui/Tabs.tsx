"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export interface TabItem {
  id: string;
  label: ReactNode;
  hint?: ReactNode;
  content: ReactNode;
}

interface Props {
  items: TabItem[];
  label: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

/** Tabs WAI-ARIA: roving tabindex y navegación con flechas, Home y End. */
export function Tabs({ items, label, orientation = "vertical", className = "" }: Props) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();
  const vertical = orientation === "vertical";

  const onKeyDown = (e: KeyboardEvent) => {
    const last = items.length - 1;
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
    setActive(next);
    refs.current[next]?.focus();
  };

  const current = items[active];

  return (
    <div className={`grid gap-6 ${vertical ? "md:grid-cols-[16rem_1fr]" : ""} ${className}`}>
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
            onClick={() => setActive(i)}
            className="group shrink-0 rounded-xl border border-transparent px-4 py-3 text-left transition-colors hover:bg-surface-2 aria-selected:border-border aria-selected:bg-surface aria-selected:shadow-[inset_0_1px_0_0_var(--hairline)]"
          >
            <span className="block font-semibold tracking-tight transition-colors group-aria-selected:text-accent">{item.label}</span>
            {item.hint && <span className="mt-0.5 block font-mono text-xs text-faint">{item.hint}</span>}
          </button>
        ))}
      </div>
      <div key={current.id} role="tabpanel" id={`${uid}-panel-${current.id}`} aria-labelledby={`${uid}-tab-${current.id}`} tabIndex={0} className="panel-in card p-6 sm:p-8">
        {current.content}
      </div>
    </div>
  );
}

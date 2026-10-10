"use client";

import { useEffect, useState } from "react";

export interface NavItem {
  href: string;
  label: string;
}

/**
 * Nav con indicador de sección activa. Un IntersectionObserver con varios
 * umbrales en vez de escuchar el scroll: el navegador hace el trabajo.
 */
export function SiteNav({ items, label }: { items: NavItem[]; label: string }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = items
      .map((i) => document.querySelector<HTMLElement>(i.href))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(`#${e.target.id}`, e.isIntersecting ? e.intersectionRatio : 0);
        let best = "";
        let ratio = 0;
        for (const [id, r] of visible) if (r > ratio) { ratio = r; best = id; }
        if (best) setActive(best);
      },
      { threshold: [0, 0.15, 0.4, 0.75], rootMargin: "-20% 0px -45% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label={label} className="hidden lg:block">
      <ul className="flex items-center gap-1 rounded-full border border-border bg-surface/60 p-1 backdrop-blur">
        {items.map((n) => {
          const on = active === n.href;
          return (
            <li key={n.href}>
              <a
                href={n.href}
                aria-current={on ? "true" : undefined}
                className={`block rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  on ? "bg-accent-soft text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {n.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

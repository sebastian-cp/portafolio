"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Content } from "@/i18n";
import { speak } from "@/lib/a11y-speech";
import { buildTree, type A11yNode } from "@/lib/a11y-tree";
import { Badge } from "@/ui/Badge";
import { Card } from "@/ui/Card";

type Example = "button" | "field" | "disclosure";
type Mode = "bad" | "good";
const OBSERVED_ATTRS = ["role", "hidden", "aria-label", "aria-labelledby", "aria-describedby", "aria-expanded", "aria-pressed", "aria-invalid", "aria-checked", "aria-selected", "aria-hidden", "required", "disabled"];
const EXAMPLES: Example[] = ["button", "field", "disclosure"];
const MODES: Mode[] = ["bad", "good"];

const Heart = ({ on }: { on: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={on ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8Z" />
  </svg>
);

/** Parlante: tachado cuando el lector no anuncia un control. */
const Speaker = ({ muted }: { muted?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`mt-0.5 shrink-0 ${muted ? "text-faint" : "text-accent"}`}>
    <path d="M11 5 6 9H3v6h3l5 4z" />
    {muted ? <path d="m16 9 5 6m0-6-5 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />}
  </svg>
);

function DemoButton({ mode, t }: { mode: Mode; t: Content["a11y"] }) {
  const [on, setOn] = useState(false);
  const toggle = () => setOn((v) => !v);
  return mode === "bad" ? (
    <div data-fake-control onClick={toggle} className={`inline-flex cursor-pointer rounded-xl border border-border bg-surface-2 p-2.5 ${on ? "text-bad" : "text-muted"}`}>
      <Heart on={on} />
    </div>
  ) : (
    <button type="button" aria-label={t.favorite} aria-pressed={on} onClick={toggle} className={`inline-flex rounded-xl border border-border bg-surface-2 p-2.5 ${on ? "text-bad" : "text-muted"}`}>
      <Heart on={on} />
    </button>
  );
}

function DemoField({ mode, t }: { mode: Mode; t: Content["a11y"] }) {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const id = useId();
  const invalid = touched && !value.includes("@");
  const input = "w-full rounded-xl border bg-surface-2 px-3.5 py-2.5 " + (invalid ? "border-bad" : "border-border");
  return mode === "bad" ? (
    <div>
      <input placeholder={t.emailPlaceholder} value={value} onChange={(e) => setValue(e.target.value)} onBlur={() => setTouched(true)} className={input} />
      {invalid && <span className="mt-1.5 block text-sm text-bad">{t.emailError}</span>}
    </div>
  ) : (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">{t.emailLabel}</label>
      <input id={id} type="email" required placeholder={t.emailPlaceholder} value={value} onChange={(e) => setValue(e.target.value)} onBlur={() => setTouched(true)} aria-invalid={invalid} aria-describedby={invalid ? `${id}-err` : undefined} className={input} />
      {invalid && <p id={`${id}-err`} role="alert" className="mt-1.5 text-sm text-bad">{t.emailError}</p>}
    </div>
  );
}

function DemoDisclosure({ mode, t }: { mode: Mode; t: Content["a11y"] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return mode === "bad" ? (
    <div>
      <div data-fake-control onClick={() => setOpen((v) => !v)} className="cursor-pointer rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 font-medium">{t.faqQ}</div>
      {open && <div className="px-3 py-2 text-sm text-muted">{t.faqA}</div>}
    </div>
  ) : (
    <div>
      <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)} className="w-full rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-left font-medium">{t.faqQ}</button>
      <div id={id} hidden={!open} className="px-3 py-2 text-sm text-muted">{t.faqA}</div>
    </div>
  );
}

export function A11yPlayground({ t }: { t: Content["a11y"] }) {
  const [example, setExample] = useState<Example>("button");
  const [mode, setMode] = useState<Mode>("bad");
  const [tree, setTree] = useState<A11yNode[]>([]);
  const area = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = area.current;
    if (!el) return;
    // Solo actualiza si el árbol cambió: React reescribe atributos como name/type en cada render,
    // y sin esta guarda (y el attributeFilter) el observer re-renderizaba en bucle.
    const update = () => {
      const next = buildTree(el);
      setTree((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next));
    };
    update();
    const mo = new MutationObserver(update);
    mo.observe(el, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: OBSERVED_ATTRS });
    return () => mo.disconnect();
  }, [example, mode]);

  const spoken = speak(tree, t.speech);

  const pill = "rounded-full border border-border px-3.5 py-1.5 text-sm text-muted transition-colors hover:text-foreground aria-pressed:border-transparent aria-pressed:bg-accent aria-pressed:text-accent-contrast";

  return (
    <Card as="div" padding="lg" spot={false}>
      <p className="text-sm text-muted">{t.intro}</p>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
        <div role="group" aria-label={t.exampleLabel} className="flex flex-wrap gap-2">
          {EXAMPLES.map((e) => (
            <button key={e} type="button" aria-pressed={example === e} onClick={() => setExample(e)} className={pill}>{t.examples[e]}</button>
          ))}
        </div>
        <div role="group" aria-label={t.modeLabel} className="flex gap-2">
          {MODES.map((m) => (
            <button key={m} type="button" aria-pressed={mode === m} onClick={() => setMode(m)} className={pill}>{t.modes[m]}</button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-6 md:grid-cols-2">
        <section aria-label={t.demoArea}>
          <h4 className="t-eyebrow">{t.demoArea}</h4>
          <div ref={area} className="mt-3 min-h-36 rounded-xl border border-dashed border-border bg-surface-2/40 p-5" data-testid="a11y-demo">
            {example === "button" && <DemoButton key={mode} mode={mode} t={t} />}
            {example === "field" && <DemoField key={mode} mode={mode} t={t} />}
            {example === "disclosure" && <DemoDisclosure key={mode} mode={mode} t={t} />}
          </div>
          <p className="mt-2 text-xs text-muted">{t.keyboard}</p>
        </section>

        <section aria-label={t.hearTitle}>
          <h4 className="t-eyebrow">{t.hearTitle}</h4>
          <div data-testid="a11y-speech" className="mt-3 min-h-36 rounded-xl border border-border bg-background p-4">
            {spoken.length === 0 ? (
              <p className="flex items-center gap-2.5 text-muted"><Speaker muted />{t.silence}</p>
            ) : (
              <ul className="space-y-2">
                {spoken.map((s, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Speaker muted={s.plain} />
                    <span className={s.plain ? "text-muted" : "text-foreground"}>
                      «{s.text}»
                      {s.plain && <span className="ml-2 text-xs text-faint">{t.plainText}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p className={`mt-3 text-sm leading-relaxed ${mode === "bad" ? "text-bad" : "text-good"}`}>{t.verdicts[example][mode]}</p>

          <details className="group mt-3">
            <summary className="cursor-pointer text-xs text-muted hover:text-foreground">{t.treeTitle}</summary>
            <ul data-testid="a11y-tree" className="mt-2 space-y-1 rounded-xl border border-border bg-background p-4 font-mono text-xs">
              {tree.map((n, i) => (
                <li key={i} style={{ paddingLeft: `${n.depth * 1}rem` }} className="flex flex-wrap items-center gap-x-2">
                  <span className="text-accent">{n.role}</span>
                  {n.name && <span>&quot;{n.name}&quot;</span>}
                  {n.details.map((d) => <span key={d} className="text-muted">[{d}]</span>)}
                  {n.warn && <Badge tone="bad">{n.warn === "noName" ? t.noName : t.noRole}</Badge>}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-muted">{t.treeNote}</p>
          </details>
        </section>
      </div>
    </Card>
  );
}

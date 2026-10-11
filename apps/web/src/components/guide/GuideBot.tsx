"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { Locale } from "@/i18n";
import { getGuideContent, type GuideReaction, type GuideSection } from "@/i18n/content/guide";
import { GuideAvatar, type Expression, type Look } from "./GuideAvatar";

const SECTIONS: GuideSection[] = ["trabajo", "experiencia", "demos", "proyectos", "hobbies", "contacto"];
const MENU: GuideSection[] = ["trabajo", "experiencia", "demos", "proyectos", "hobbies"];
const SECTION_MOOD: Partial<Record<GuideSection, Expression>> = {
  demos: "surprised",
  proyectos: "curious",
  contacto: "happy",
};
const IDLE_WANDER_MS = 5000;
const IDLE_SLEEP_MS = 25000;

// Lo que no cuenta como "espacio vacío" al hacer clic.
const INTERACTIVE = "a, button, input, textarea, select, label, summary, dialog, img, video, svg, code, pre, kbd, [role], [tabindex], [contenteditable]";

// Cada cuánto puede repetir un comentario del mismo tipo (ms). Las demos responden a cada uso.
const REACTION_COOLDOWN: Record<GuideReaction, number> = {
  rag: 1000, vitals: 1000, copy: 1500, dark: 0, light: 0, empty: 3000, filter: 5000, hobbies: 5000, contact: 5000,
};

const clamp = (v: number) => Math.max(-1, Math.min(1, v));

// sessionStorage/localStorage pueden lanzar (modo privado, cookies bloqueadas): todo con try/catch.
const store = {
  get: (s: Storage | undefined, k: string) => { try { return s?.getItem(k) ?? null; } catch { return null; } },
  set: (s: Storage | undefined, k: string, v: string) => { try { s?.setItem(k, v); } catch { /* sin persistencia */ } },
};
const local = () => (typeof window === "undefined" ? undefined : window.localStorage);
const session = () => (typeof window === "undefined" ? undefined : window.sessionStorage);

/**
 * Bit, el guía flotante: sigue el cursor con la mirada, reacciona a la sección en pantalla,
 * saluda al llegar y ofrece atajos (secciones, paleta Ctrl+K, contacto).
 */
export function GuideBot({ locale }: { locale: Locale }) {
  const t = getGuideContent(locale);
  const [hidden, setHidden] = useState(true);
  const [open, setOpen] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);
  const [mood, setMood] = useState<Expression>("neutral");
  const [sleepy, setSleepy] = useState(false);
  const [hover, setHover] = useState(false);
  const [hop, setHop] = useState(0);
  const [hasPalette, setHasPalette] = useState(false);
  const [behindModal, setBehindModal] = useState(false);

  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const look = useRef<Look>({ x: -0.3, y: -0.2 });
  const moodTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const bubbleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const lastActive = useRef(0);
  const clicks = useRef<number[]>([]);
  const menuId = useId();

  const flash = useCallback((e: Expression, ms = 2200) => {
    clearTimeout(moodTimer.current);
    setMood(e);
    moodTimer.current = setTimeout(() => setMood("neutral"), ms);
  }, []);

  const say = useCallback((text: string, ms = 5000) => {
    clearTimeout(bubbleTimer.current);
    setBubble(text);
    bubbleTimer.current = setTimeout(() => setBubble(null), ms);
  }, []);

  // Se monta oculto y se decide en el cliente, para no desajustar la hidratación.
  useEffect(() => {
    if (store.get(session(), "guide-hidden") !== "1") setHidden(false);
  }, []);

  useEffect(() => () => { clearTimeout(moodTimer.current); clearTimeout(bubbleTimer.current); }, []);

  // Saludo: completo la primera vez, corto en las siguientes.
  useEffect(() => {
    if (hidden) return;
    const id = setTimeout(() => {
      const seen = store.get(local(), "guide-greeted") === "1";
      store.set(local(), "guide-greeted", "1");
      setHop((n) => n + 1);
      flash("happy", 2400);
      say(seen ? t.greetAgain : t.greet, seen ? 3500 : 6500);
    }, 1200);
    return () => clearTimeout(id);
  }, [hidden, flash, say, t.greet, t.greetAgain]);

  // Mirada: sigue al puntero; sin actividad, curiosea y termina por dormirse.
  useEffect(() => {
    if (hidden) return;
    lastActive.current = performance.now();
    const wake = () => {
      lastActive.current = performance.now();
      setSleepy((s) => {
        if (s) flash("surprised", 900);
        return false;
      });
    };
    const onMove = (e: PointerEvent) => {
      const r = root.current?.getBoundingClientRect();
      if (!r) return;
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      look.current = {
        x: clamp((e.clientX - cx) / (window.innerWidth * 0.45)),
        y: clamp((e.clientY - cy) / (window.innerHeight * 0.45)),
      };
      wake();
    };
    const tick = setInterval(() => {
      const idle = performance.now() - lastActive.current;
      if (idle > IDLE_SLEEP_MS) setSleepy(true);
      else if (idle > IDLE_WANDER_MS && Math.random() < 0.5) {
        look.current = { x: Math.random() * 1.6 - 0.8, y: Math.random() * 1.2 - 0.6 };
      }
    }, 2500);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("keydown", wake);
    window.addEventListener("scroll", wake, { passive: true });
    return () => {
      clearInterval(tick);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("keydown", wake);
      window.removeEventListener("scroll", wake);
    };
  }, [hidden, flash]);

  // Scroll: mira en la dirección del desplazamiento y comenta cada sección una vez.
  useEffect(() => {
    if (hidden) return;
    let lastY = window.scrollY;
    let scrolled = false;
    let settle: ReturnType<typeof setTimeout> | undefined;
    const seen = new Set<GuideSection>();
    const onScroll = () => {
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      if (Math.abs(dy) > 2) {
        scrolled = true;
        look.current = { x: look.current.x * 0.5, y: Math.sign(dy) * 0.7 };
        clearTimeout(settle);
        settle = setTimeout(() => { look.current = { x: look.current.x, y: 0 }; }, 400);
      }
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = e.target.id as GuideSection;
          if (!e.isIntersecting || !scrolled || seen.has(id)) continue;
          seen.add(id);
          const m = SECTION_MOOD[id];
          if (m) flash(m, 2600);
          say(t.sections[id].hint, 4500);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTIONS.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
    };
  }, [hidden, flash, say, t.sections]);

  // Reacciones a lo que hace el visitante: usar demos, filtrar, copiar, cambiar tema, clics al vacío.
  useEffect(() => {
    if (hidden) return;
    let lastSaid = 0;
    const lastByKey = new Map<GuideReaction, number>();
    const lastLine = new Map<GuideReaction, string>();
    const react = (key: GuideReaction, e: Expression) => {
      const now = performance.now();
      flash(e, e === "confused" ? 1600 : 2200);
      // El margen global evita la doble reacción de un mismo gesto (clic en "Preguntar" + submit).
      if (now - lastSaid < 800 || now - (lastByKey.get(key) ?? -Infinity) < REACTION_COOLDOWN[key]) return;
      lastSaid = now;
      lastByKey.set(key, now);
      // Una frase distinta a la anterior, para que cada pregunta se note.
      const lines = t.reactions[key].filter((l) => l !== lastLine.get(key));
      const line = lines[Math.floor(Math.random() * lines.length)] ?? t.reactions[key][0];
      lastLine.set(key, line);
      setHop((n) => n + 1);
      say(line, 3000);
    };

    const onClick = (e: MouseEvent) => {
      const el = e.target as Element | null;
      if (!el || root.current?.contains(el)) return;
      const hit = el.closest(INTERACTIVE);
      if (hit) {
        if (!hit.matches("button, a, label, [role=button]")) return;
        if (el.closest("#demo-rag")) react("rag", "happy");
        else if (el.closest("#demo-vitals")) react("vitals", "surprised");
        else if (el.closest("#proyectos [role=group]")) react("filter", "happy");
        else if (el.closest("#hobbies")) react("hobbies", "happy");
        else if (el.closest("#contacto")) react("contact", "happy");
        return;
      }
      if (window.getSelection()?.toString()) return;
      const hasText = Array.from(el.childNodes).some((n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim());
      if (!hasText) react("empty", "confused");
    };
    const onSubmit = (e: SubmitEvent) => {
      if ((e.target as Element).closest("#demo-rag")) react("rag", "happy");
    };
    const onCopy = () => react("copy", "happy");
    const theme = new MutationObserver(() => {
      react(document.documentElement.dataset.theme === "dark" ? "dark" : "light", "surprised");
    });
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    document.addEventListener("click", onClick);
    document.addEventListener("submit", onSubmit);
    document.addEventListener("copy", onCopy);
    return () => {
      theme.disconnect();
      document.removeEventListener("click", onClick);
      document.removeEventListener("submit", onSubmit);
      document.removeEventListener("copy", onCopy);
    };
  }, [hidden, flash, say, t.reactions]);

  // Los <dialog> modales viven en la capa superior del navegador: ningún z-index los supera y
  // el resto de la página queda inerte. Mientras haya uno abierto, Bit se aparta.
  useEffect(() => {
    if (hidden) return;
    const sync = () => {
      const modal = !!document.querySelector("dialog:modal");
      setBehindModal(modal);
      if (modal) setOpen(false);
    };
    const mo = new MutationObserver(sync);
    mo.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["open"] });
    sync();
    return () => mo.disconnect();
  }, [hidden]);

  // Menú: foco al primer atajo, Escape y clic fuera lo cierran.
  useEffect(() => {
    if (!open) return;
    menu.current?.querySelector<HTMLElement>("button, a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); trigger.current?.focus(); }
    };
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  if (hidden) return null;

  const onAvatarClick = () => {
    const now = performance.now();
    clicks.current = [...clicks.current.filter((c) => now - c < 1200), now];
    if (clicks.current.length >= 4) {
      clicks.current = [];
      setOpen(false);
      setHop((n) => n + 1);
      flash("happy", 1800);
      say(t.tickle, 2500);
      return;
    }
    setBubble(null);
    setHasPalette(!!document.querySelector('[aria-keyshortcuts~="Control+K"]'));
    setOpen((o) => !o);
  };

  const go = (id: string) => {
    setOpen(false);
    // El layout también envuelve páginas sin estas secciones (legal): ahí volvemos al inicio.
    if (document.getElementById(id)) window.location.hash = id;
    else window.location.assign(`/${locale}#${id}`);
  };

  const search = () => {
    setOpen(false);
    // La paleta escucha Ctrl/Cmd+K en window: basta con emitir el mismo atajo.
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true }));
  };

  const hide = () => {
    store.set(session(), "guide-hidden", "1");
    setOpen(false);
    setHidden(true);
  };

  const expression: Expression = hover || open ? "happy" : mood !== "neutral" ? mood : sleepy ? "sleepy" : "neutral";
  const item = "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm text-muted transition-colors hover:bg-surface-2 hover:text-foreground focus-visible:bg-surface-2 focus-visible:text-foreground";

  return (
    <div
      ref={root}
      className={`fixed bottom-4 right-4 z-40 flex flex-col items-end transition-[opacity,translate] duration-200 print:hidden sm:bottom-6 sm:right-6 ${behindModal ? "pointer-events-none translate-y-4 opacity-0" : ""}`}
    >
      <p
        aria-live="polite"
        className={`panel-in pointer-events-none mb-2 max-w-[15rem] rounded-2xl rounded-br-md border border-border bg-surface px-4 py-2.5 text-sm leading-snug shadow-[0_16px_40px_-16px_rgba(0,0,0,0.45)] ${bubble && !open ? "" : "sr-only"}`}
      >
        {bubble && !open ? bubble : ""}
      </p>

      {open && (
        <div
          ref={menu}
          id={menuId}
          role="dialog"
          aria-label={t.menuTitle}
          className="panel-in mb-2 w-60 rounded-2xl border border-border bg-surface p-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)]"
        >
          <div className="flex items-center justify-between px-3 pb-1.5 pt-1">
            <p className="font-mono text-xs text-faint">{t.menuTitle}</p>
            <button type="button" onClick={hide} className="rounded-md px-1.5 py-0.5 font-mono text-xs text-faint transition-colors hover:text-foreground">
              {t.hide}
            </button>
          </div>
          <ul>
            {MENU.map((id) => (
              <li key={id}>
                <button type="button" className={item} onClick={() => go(id)}>{t.sections[id].label}</button>
              </li>
            ))}
            <li className="my-1 border-t border-border" aria-hidden="true" />
            {hasPalette && (
              <li>
                <button type="button" className={item} onClick={search}>
                  {t.search}
                  <kbd>Ctrl K</kbd>
                </button>
              </li>
            )}
            <li>
              <button type="button" className={`${item} text-accent`} onClick={() => go("contacto")}>{t.contact}</button>
            </li>
            <li>
              <button type="button" className={item} onClick={() => { setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                {t.goTop}
              </button>
            </li>
          </ul>
        </div>
      )}

      <button
        ref={trigger}
        type="button"
        onClick={onAvatarClick}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        aria-label={open ? t.close : t.open}
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        title={t.name}
        className="rounded-full p-1 transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <GuideAvatar look={look} expression={expression} size={60} hop={hop} />
      </button>
    </div>
  );
}

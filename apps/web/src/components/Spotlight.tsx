"use client";

import { useEffect } from "react";

/**
 * Luz que sigue al cursor sobre las tarjetas. Un solo listener delegado,
 * limitado a un frame: solo escribe dos custom properties, nunca lee layout
 * en el handler (evita reflows y mantiene el INP bajo).
 */
export function Spotlight() {
  useEffect(() => {
    if (!matchMedia("(hover: hover)").matches) return;

    let frame = 0;
    let pending: { card: HTMLElement; x: number; y: number } | null = null;

    const paint = () => {
      frame = 0;
      if (!pending) return;
      const { card, x, y } = pending;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${x - r.left}px`);
      card.style.setProperty("--my", `${y - r.top}px`);
      pending = null;
    };

    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(".card[data-spot]");
      if (!card) return;
      pending = { card, x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(paint);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}

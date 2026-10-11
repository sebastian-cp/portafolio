"use client";

import { useEffect, useId, useRef, type MutableRefObject } from "react";

export type Expression = "neutral" | "happy" | "surprised" | "sleepy" | "curious" | "confused";

/** Hacia dónde mira la cabeza, en [-1, 1] por eje. La escribe el padre; el bucle la lee en cada frame. */
export interface Look {
  x: number;
  y: number;
}

interface Props {
  look: MutableRefObject<Look>;
  expression: Expression;
  size?: number;
  /** Incrementarlo dispara un saltito. */
  hop?: number;
}

const R = 46; // radio de la esfera dentro del viewBox de 120
const C = 60;
const MAX_YAW = 0.55; // rad
const MAX_PITCH = 0.4;
const EYE_AZ = 0.36; // separación horizontal de los ojos sobre la esfera
const EYE_EL = 0.1; // altura de los ojos sobre el ecuador

// Algunas expresiones fuerzan la mirada; el resto sigue al padre.
const LOOK_OVERRIDE: Partial<Record<Expression, Look>> = {
  curious: { x: 0.55, y: -0.6 },
  sleepy: { x: 0, y: 0.35 },
  confused: { x: -0.35, y: -0.25 },
};
// Inclinación lateral de la cabeza por expresión (rad).
const ROLL: Partial<Record<Expression, number>> = { confused: -0.22, curious: 0.08 };

/**
 * Proyecta un punto de la superficie de la esfera (azimut, elevación) tras girar la cabeza.
 * Devuelve posición en pantalla, escorzo por eje y si queda de cara al visitante.
 */
function project(az: number, el: number, yaw: number, pitch: number) {
  let x = Math.sin(az) * Math.cos(el);
  let y = Math.sin(el);
  let z = Math.cos(az) * Math.cos(el);
  // Cabeceo (eje X): pitch positivo = mirar hacia abajo.
  const cp = Math.cos(pitch), sp = Math.sin(pitch);
  [y, z] = [y * cp - z * sp, y * sp + z * cp];
  // Giro (eje Y): yaw positivo = mirar a la derecha.
  const cy = Math.cos(yaw), sy = Math.sin(yaw);
  [x, z] = [x * cy + z * sy, -x * sy + z * cy];
  return {
    px: C + R * x,
    py: C - R * y,
    sx: Math.sqrt(Math.max(0, 1 - x * x)),
    sy: Math.sqrt(Math.max(0, 1 - y * y)),
    front: z > 0,
  };
}

function EyeShape({ expression, side }: { expression: Expression; side: -1 | 1 }) {
  switch (expression) {
    case "happy":
      return <path d="M-6.5 3 Q0 -7 6.5 3" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />;
    case "surprised":
      return <rect x={-6.5} y={-14} width={13} height={28} rx={6.5} />;
    case "sleepy":
      return <rect x={-6} y={-2.5} width={12} height={5} rx={2.5} />;
    case "curious":
      // Un ojo algo más grande que el otro: cara de "mmm, ¿y eso?".
      return side === 1 ? <rect x={-5.5} y={-13} width={11} height={26} rx={5.5} /> : <rect x={-5} y={-9} width={10} height={18} rx={5} />;
    case "confused":
      // Un ojo entrecerrado y algo más alto, el otro abierto: "¿qué fue eso?".
      return side === -1 ? <rect x={-6} y={-8} width={12} height={6} rx={3} /> : <rect x={-5} y={-10} width={10} height={20} rx={5} />;
    default:
      return <rect x={-5} y={-11} width={10} height={22} rx={5} />;
  }
}

/**
 * Avatar procedural: una esfera con dos ojos que se desplazan sobre su superficie según
 * hacia dónde mira. Todo el movimiento va por un bucle rAF que escribe transformaciones
 * directamente en el DOM, sin re-renderizar React en cada frame.
 */
export function GuideAvatar({ look, expression, size = 64, hop = 0 }: Props) {
  const uid = useId().replace(/:/g, "");
  const body = useRef<SVGGElement>(null);
  const shadow = useRef<SVGEllipseElement>(null);
  const eyeL = useRef<SVGGElement>(null);
  const eyeR = useRef<SVGGElement>(null);
  const expr = useRef(expression);
  const hopAt = useRef(-Infinity);

  useEffect(() => { expr.current = expression; }, [expression]);
  useEffect(() => { if (hop) hopAt.current = performance.now(); }, [hop]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cur = { yaw: 0, pitch: 0, roll: 0 };
    let blinkAt = performance.now() + 1800;
    let raf = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const target = LOOK_OVERRIDE[expr.current] ?? look.current;
      const k = reduced ? 1 : 0.12;
      cur.yaw += (target.x * MAX_YAW - cur.yaw) * k;
      cur.pitch += (target.y * MAX_PITCH - cur.pitch) * k;
      cur.roll += ((ROLL[expr.current] ?? 0) - cur.roll) * k;

      // Parpadeo: cierre rápido cada pocos segundos (a veces doble).
      let lid = 1;
      if (now >= blinkAt) {
        const t = now - blinkAt;
        if (t < 160) lid = Math.max(0.08, Math.abs(1 - t / 80));
        else blinkAt = now + 2200 + Math.random() * 3800 - (Math.random() < 0.2 ? 2000 : 0);
      }
      if (expr.current === "happy") lid = 1;

      // Flotación suave + saltito al saludar.
      let dy = reduced ? 0 : Math.sin(now / 700) * 1.6;
      let squash = 1;
      const h = (now - hopAt.current) / 520;
      if (!reduced && h >= 0 && h < 1) {
        dy -= Math.sin(h * Math.PI) * 9;
        squash = 1 + Math.sin(h * Math.PI * 2) * 0.05;
      }
      body.current?.setAttribute("transform", `translate(0 ${dy.toFixed(2)}) translate(${C} 106) scale(${(2 - squash).toFixed(3)} ${squash.toFixed(3)}) translate(${-C} -106) rotate(${((cur.roll * 180) / Math.PI).toFixed(2)} ${C} ${C})`);
      const lift = Math.max(0, -dy) / 12;
      shadow.current?.setAttribute("transform", `translate(${C} 112) scale(${(1 - lift * 0.35).toFixed(3)} 1) translate(${-C} -112)`);
      if (shadow.current) shadow.current.style.opacity = String(0.22 - lift * 0.1);

      ([-1, 1] as const).forEach((side, i) => {
        const g = (i === 0 ? eyeL : eyeR).current;
        if (!g) return;
        const p = project(side * EYE_AZ, EYE_EL, cur.yaw, cur.pitch);
        g.setAttribute(
          "transform",
          `translate(${p.px.toFixed(2)} ${p.py.toFixed(2)}) scale(${p.sx.toFixed(3)} ${(p.sy * lid).toFixed(3)})`,
        );
        g.style.opacity = p.front ? "1" : "0";
      });
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [look]);

  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true" className="overflow-visible">
      <defs>
        <radialGradient id={`${uid}-hl`} cx="0.34" cy="0.3" r="0.6">
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-rim`} cx="0.45" cy="0.42" r="0.62">
          <stop offset="0.7" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.28" />
        </radialGradient>
        <clipPath id={`${uid}-clip`}>
          <circle cx={C} cy={C} r={R} />
        </clipPath>
      </defs>
      <ellipse ref={shadow} cx={C} cy={112} rx={30} ry={4.5} fill="#000" opacity={0.22} />
      <g ref={body}>
        <circle cx={C} cy={C} r={R} style={{ fill: "var(--accent)" }} />
        <g clipPath={`url(#${uid}-clip)`} style={{ fill: "var(--accent-contrast)", color: "var(--accent-contrast)" }}>
          <g ref={eyeL}><EyeShape expression={expression} side={-1} /></g>
          <g ref={eyeR}><EyeShape expression={expression} side={1} /></g>
        </g>
        <circle cx={C} cy={C} r={R} fill={`url(#${uid}-rim)`} />
        <circle cx={C} cy={C} r={R} fill={`url(#${uid}-hl)`} />
      </g>
      {expression === "confused" && (
        <text x={104} y={20} fontSize={26} fontWeight={700} textAnchor="middle" style={{ fill: "var(--accent)" }}>?</text>
      )}
    </svg>
  );
}

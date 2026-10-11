"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Bloques para las páginas MDX de la documentación. Usan estilos en línea para no
 * depender de que Tailwind vea estos archivos ni chocar con el tema de Storybook docs.
 */

const mono = "var(--font-jetbrains), ui-monospace, SFMono-Regular, Menlo, monospace";
const sans = "var(--font-instrument), ui-sans-serif, system-ui, sans-serif";

/** Lee el valor de una variable CSS en tema claro y oscuro, sin repintar: cambia y restaura en el mismo tick. */
function useTokenValues(names: string[]) {
  const [values, setValues] = useState<Record<string, { light: string; dark: string }>>({});
  const key = names.join(",");
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.dataset.theme;
    const read = (theme: string) => {
      root.dataset.theme = theme;
      const css = getComputedStyle(root);
      return Object.fromEntries(names.map((n) => [n, css.getPropertyValue(n).trim()]));
    };
    const light = read("light");
    const dark = read("dark");
    if (previous) root.dataset.theme = previous;
    else delete root.dataset.theme;
    setValues(Object.fromEntries(names.map((n) => [n, { light: light[n], dark: dark[n] }])));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return values;
}

export interface Token {
  name: string;
  usage: string;
  /** Clase de Tailwind que expone el token, p. ej. `bg-accent`. */
  utility?: string;
}

const cell: CSSProperties = { padding: "10px 12px", borderTop: "1px solid #e8e5dd", verticalAlign: "middle", fontSize: 14 };
const head: CSSProperties = { ...cell, borderTop: "none", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "#615e56", textAlign: "left" };

function Chip({ value, label }: { value: string; label: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <span
        aria-hidden="true"
        style={{ width: 28, height: 28, borderRadius: 8, background: value, border: "1px solid rgba(0,0,0,0.12)", flexShrink: 0 }}
      />
      <span style={{ fontFamily: mono, fontSize: 12 }}>
        <span style={{ color: "#615e56" }}>{label} </span>
        {value || "—"}
      </span>
    </span>
  );
}

/** Tabla de colores con su valor en ambos temas, leído en vivo de globals.css. */
export function ColorTable({ tokens }: { tokens: Token[] }) {
  const values = useTokenValues(tokens.map((t) => `--${t.name}`));
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", margin: "16px 0 32px", fontFamily: sans }}>
      <thead>
        <tr>
          <th style={head}>Token</th>
          <th style={head}>Claro</th>
          <th style={head}>Oscuro</th>
          <th style={head}>Uso</th>
        </tr>
      </thead>
      <tbody>
        {tokens.map((t) => {
          const v = values[`--${t.name}`];
          return (
            <tr key={t.name}>
              <td style={cell}>
                <code style={{ fontFamily: mono, fontSize: 13 }}>--{t.name}</code>
                {t.utility && (
                  <div style={{ fontFamily: mono, fontSize: 12, color: "#615e56", marginTop: 2 }}>{t.utility}</div>
                )}
              </td>
              <td style={cell}>{v && <Chip value={v.light} label="" />}</td>
              <td style={cell}>{v && <Chip value={v.dark} label="" />}</td>
              <td style={{ ...cell, color: "#3f3d38" }}>{t.usage}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export interface TypeStyle {
  className: string;
  sample: string;
  usage: string;
}

/** Muestrario de la escala tipográfica: cada fila se pinta con la clase real del sitio. */
export function TypeScale({ styles }: { styles: TypeStyle[] }) {
  return (
    <div style={{ margin: "16px 0 32px", border: "1px solid #e8e5dd", borderRadius: 12, overflow: "hidden" }}>
      {styles.map((s, i) => (
        <div
          key={s.className}
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 220px",
            gap: 24,
            alignItems: "center",
            padding: "20px 24px",
            borderTop: i ? "1px solid #e8e5dd" : "none",
            background: "#fff",
          }}
        >
          <div className={s.className} style={{ fontFamily: s.className === "t-eyebrow" ? undefined : sans, color: "#1b1a17", overflowWrap: "anywhere" }}>
            {s.sample}
          </div>
          <div style={{ fontFamily: sans, fontSize: 13, color: "#615e56" }}>
            <code style={{ fontFamily: mono, fontSize: 13, color: "#1b1a17" }}>.{s.className}</code>
            <div style={{ marginTop: 4 }}>{s.usage}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

type Tone = "info" | "warning" | "danger";
const toneColor: Record<Tone, string> = { info: "#0d6b61", warning: "#92400e", danger: "#b91c1c" };

/** Nota destacada, como los callouts de la documentación de Bootstrap. */
export function Callout({ tone = "info", title, children }: { tone?: Tone; title?: string; children: ReactNode }) {
  return (
    <div
      style={{
        margin: "20px 0",
        padding: "14px 18px",
        borderLeft: `4px solid ${toneColor[tone]}`,
        borderRadius: 8,
        background: "#f6f5f1",
        fontFamily: sans,
        fontSize: 15,
        lineHeight: 1.6,
        color: "#1b1a17",
      }}
    >
      {title && <strong style={{ display: "block", marginBottom: 4, color: toneColor[tone] }}>{title}</strong>}
      {children}
    </div>
  );
}

/** Párrafo de entrada bajo el título, como el `.lead` de Bootstrap. */
export function Lead({ children }: { children: ReactNode }) {
  return <p style={{ fontFamily: sans, fontSize: 20, lineHeight: 1.5, color: "#3f3d38", margin: "0 0 24px" }}>{children}</p>;
}

export interface PageLink {
  title: string;
  description: string;
  /** Id de la página de Storybook, p. ej. `componentes-button--docs`. */
  id: string;
}

/** Rejilla de accesos a otras páginas, para la portada de la documentación. */
export function LinkGrid({ links }: { links: PageLink[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12, margin: "16px 0 32px" }}>
      {links.map((l) => (
        <a
          key={l.id}
          href={`?path=/docs/${l.id}`}
          // La página vive en el iframe de preview: la navegación tiene que ocurrir en el manager.
          onClick={(e) => {
            if (!window.top || e.metaKey || e.ctrlKey) return;
            e.preventDefault();
            window.top.location.search = `?path=/docs/${l.id}`;
          }}
          style={{
            display: "block",
            padding: "16px 18px",
            border: "1px solid #dedad1",
            borderRadius: 12,
            background: "#fff",
            textDecoration: "none",
            fontFamily: sans,
          }}
        >
          <strong style={{ display: "block", fontSize: 16, color: "#0d6b61" }}>{l.title}</strong>
          <span style={{ display: "block", marginTop: 4, fontSize: 14, lineHeight: 1.5, color: "#3f3d38" }}>{l.description}</span>
        </a>
      ))}
    </div>
  );
}

/** Enlace en línea a otra página de la documentación. */
export function DocLink({ id, children }: { id: string; children: ReactNode }) {
  return (
    <a
      href={`?path=/docs/${id}`}
      style={{ color: "#0d6b61" }}
      onClick={(e) => {
        if (!window.top || e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        window.top.location.search = `?path=/docs/${id}`;
      }}
    >
      {children}
    </a>
  );
}

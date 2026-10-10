import type { A11yNode } from "./a11y-tree";

/** Vocabulario del lector de pantalla, por idioma. */
export interface SpeechWords {
  roles: Record<string, string>;
  pressed: string;
  notPressed: string;
  expanded: string;
  collapsed: string;
  required: string;
  invalid: string;
  noName: string;
}

export interface Utterance {
  /** Lo que se escucha. */
  text: string;
  /** Texto plano: se oye al leer la página, pero no se anuncia como control. */
  plain?: boolean;
}

/**
 * Traduce el árbol de accesibilidad a lo que diría un lector de pantalla, en el
 * orden típico de NVDA/VoiceOver: nombre, rol y estados. Un control falso (sin rol)
 * no produce nada como control: a lo sumo su texto se lee como texto plano.
 */
export function speak(nodes: A11yNode[], w: SpeechWords): Utterance[] {
  const out: Utterance[] = [];
  // El texto de una <label> ya se anuncia como nombre de su control: no se repite.
  const controlNames = new Set(nodes.filter((n) => n.role !== "text" && !n.warn).map((n) => n.name));
  for (const n of nodes) {
    // Una alerta se anuncia sola, en cuanto aparece, leyendo su contenido.
    if (n.role === "alert") {
      out.push({ text: `${w.roles.alert ?? "alert"}: ${n.name}` });
      continue;
    }
    if (n.warn === "noRole") {
      if (n.name) out.push({ text: n.name, plain: true });
      continue;
    }
    if (n.role === "text") {
      if (!controlNames.has(n.name)) out.push({ text: n.name, plain: true });
      continue;
    }
    const parts = [n.name || w.noName, w.roles[n.role] ?? n.role];
    for (const d of n.details) {
      const [key, value] = d.split("=");
      if (key === "pressed") parts.push(value === "true" ? w.pressed : w.notPressed);
      else if (key === "expanded") parts.push(value === "true" ? w.expanded : w.collapsed);
      else if (key === "invalid" && value === "true") parts.push(w.invalid);
      else if (key === "required") parts.push(w.required);
      else if (key === "description") parts.push(d.slice("description=".length).replace(/^"|"$/g, ""));
    }
    out.push({ text: parts.join(", ") });
  }
  return out;
}

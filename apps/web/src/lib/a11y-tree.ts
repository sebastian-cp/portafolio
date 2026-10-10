/**
 * Mini árbol de accesibilidad: aproxima rol y nombre accesible de un subárbol del DOM.
 * No reemplaza al algoritmo completo (accname), pero cubre los casos comunes de UI.
 */
export interface A11yNode {
  depth: number;
  role: string;
  name: string;
  details: string[];
  warn?: "noName" | "noRole";
}

const HEADING = /^h[1-6]$/;

function implicitRole(el: Element): string | null {
  const tag = el.tagName.toLowerCase();
  if (HEADING.test(tag)) return "heading";
  switch (tag) {
    case "button": return "button";
    case "a": return el.hasAttribute("href") ? "link" : null;
    case "input": {
      const type = (el as HTMLInputElement).type;
      return type === "checkbox" ? "checkbox" : type === "button" || type === "submit" ? "button" : "textbox";
    }
    case "textarea": return "textbox";
    case "select": return "combobox";
    case "img": return "img";
    case "ul": case "ol": return "list";
    case "li": return "listitem";
    case "nav": return "navigation";
    case "form": return "form";
    default: return null;
  }
}

const textOf = (el: Element): string => {
  let out = "";
  el.childNodes.forEach((n) => {
    if (n.nodeType === Node.TEXT_NODE) out += n.textContent ?? "";
    else if (n instanceof Element && n.getAttribute("aria-hidden") !== "true" && !n.hasAttribute("hidden")) out += ` ${textOf(n)} `;
  });
  return out.replace(/\s+/g, " ").trim();
};

function accessibleName(el: Element, role: string): string {
  const by = el.getAttribute("aria-labelledby");
  if (by) {
    const t = by.split(/\s+/).map((id) => el.ownerDocument.getElementById(id)).filter(Boolean).map((n) => textOf(n!)).join(" ").trim();
    if (t) return t;
  }
  const label = el.getAttribute("aria-label");
  if (label) return label.trim();
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
    const lbl = el.labels?.[0];
    if (lbl) return textOf(lbl);
    return "";
  }
  if (role === "img") return el.getAttribute("alt") ?? "";
  if (["button", "link", "heading", "listitem", "checkbox"].includes(role)) return textOf(el);
  return "";
}

function describedBy(el: Element): string {
  const ids = el.getAttribute("aria-describedby");
  if (!ids) return "";
  return ids.split(/\s+/).map((id) => el.ownerDocument.getElementById(id)).filter(Boolean).map((n) => textOf(n!)).join(" ");
}

const STATES = ["aria-expanded", "aria-pressed", "aria-invalid", "aria-checked", "aria-selected"] as const;

export function buildTree(root: Element): A11yNode[] {
  const out: A11yNode[] = [];

  const walk = (el: Element, depth: number) => {
    if (el.getAttribute("aria-hidden") === "true" || el.hasAttribute("hidden")) return;
    const role = el.getAttribute("role") ?? implicitRole(el);
    let nextDepth = depth;

    if (role && role !== "presentation" && role !== "none") {
      const name = accessibleName(el, role);
      const details: string[] = [];
      for (const s of STATES) if (el.hasAttribute(s)) details.push(`${s.replace("aria-", "")}=${el.getAttribute(s)}`);
      if ((el as HTMLInputElement).required) details.push("required");
      const desc = describedBy(el);
      if (desc) details.push(`description="${desc}"`);
      const needsName = ["button", "link", "textbox", "checkbox", "combobox", "img"].includes(role);
      out.push({ depth, role, name, details, warn: needsName && !name ? "noName" : undefined });
      nextDepth = depth + 1;
    } else if (el.hasAttribute("data-fake-control")) {
      out.push({ depth, role: "generic", name: textOf(el), details: [], warn: "noRole" });
      nextDepth = depth + 1;
    }

    // Texto directo de contenedores sin rol propio
    if (!role || role === "presentation" || role === "none") {
      const direct = Array.from(el.childNodes)
        .filter((n) => n.nodeType === Node.TEXT_NODE)
        .map((n) => n.textContent?.trim())
        .filter(Boolean)
        .join(" ");
      if (direct && !el.hasAttribute("data-fake-control")) out.push({ depth: nextDepth, role: "text", name: direct, details: [] });
    }

    for (const child of Array.from(el.children)) walk(child, nextDepth);
  };

  for (const child of Array.from(root.children)) walk(child, 0);
  return out;
}

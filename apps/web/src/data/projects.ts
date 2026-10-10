export type Stack = "react" | "angular";

export interface Project {
  slug: string;
  title: string;
  stack: Stack;
  summary: string;
  highlights: string[];
  tech: string[];
  /** Reemplaza por la URL real en producción */
  demo?: string;
  /** Reemplaza por el repositorio real */
  repo?: string;
}

// Edita esta lista con tus proyectos reales. Enlaza solo sitios en producción
// y repos propios: las vacantes piden evidencia verificable.
export const projects: Project[] = [
  {
    slug: "este-portafolio",
    title: "Este portafolio",
    stack: "react",
    summary:
      "Next.js 15 con App Router: Server Components por defecto y pequeñas islas cliente para lo interactivo (paleta Ctrl+K, tema, pestañas, demo RAG).",
    highlights: [
      "Animaciones con CSS + IntersectionObserver, sin librerías",
      "Tema claro/oscuro sin flash y respeto a prefers-reduced-motion",
      "Componentes accesibles: tabs, combobox, skip link; tests e2e con Playwright",
    ],
    tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind 4", "Playwright"],
    repo: "https://github.com/sebastian-cp/portafolio/tree/main/apps/web",
  },
  {
    slug: "demo-rag",
    title: "Demo RAG sobre mi CV",
    stack: "react",
    summary:
      "Versión didáctica, 100% en el navegador, del flujo RAG que implementé en LUXXOR: indexa fragmentos, recupera por similitud TF-IDF y responde con el mejor.",
    highlights: [
      "Muestra los fragmentos recuperados con su puntaje de similitud",
      "Respuesta en streaming, accesible con lector de pantalla",
      "Sin APIs: lógica de recuperación pura y testeable (src/lib/rag.ts)",
    ],
    tech: ["React 19", "TypeScript", "TF-IDF", "Similitud coseno"],
    repo: "https://github.com/sebastian-cp/portafolio/blob/main/apps/web/src/lib/rag.ts",
  },
  {
    slug: "task-board-angular",
    title: "Task Board (Angular)",
    stack: "angular",
    summary:
      "Tablero de tareas con componentes standalone, Signals y ChangeDetection OnPush; estado derivado con computed() y filtros accesibles.",
    highlights: [
      "Signals + computed en lugar de suscripciones manuales",
      "Control flow nativo (@for / @if) y OnPush",
      "Persistencia en localStorage y tests unitarios",
    ],
    tech: ["Angular 19", "Signals", "TypeScript", "Jasmine"],
    repo: "https://github.com/sebastian-cp/portafolio/tree/main/apps/angular-demo",
  },
];

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
      "Next.js 15 con App Router: todo es Server Component salvo el filtro de proyectos y el reveal on scroll, que son islas cliente mínimas.",
    highlights: [
      "Sin librerías de animación: CSS + IntersectionObserver",
      "Fuentes del sistema y dimensiones reservadas para evitar CLS",
      "Navegación por teclado, skip link y contraste AA",
    ],
    tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind 4"],
    repo: "https://github.com/sebastian-cp/portafolio/tree/main/apps/web",
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

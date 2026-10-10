export const profile = {
  name: "Sebastián Andrés Cofré Parra",
  role: "Desarrollador Frontend · React / Next.js / Angular",
  location: "Chile · Remoto / Híbrido",
  email: "scofreparr@gmail.com",
  phone: "+56 9 9881 9492",
  github: "https://github.com/sebastian-cp",
  summary:
    "Construyo interfaces rápidas, accesibles y mantenibles con React, Next.js, TypeScript y Tailwind, y también trabajo con Angular. Me importan los Core Web Vitals, el teclado y los lectores de pantalla desde el primer commit, no como parche final.",
};

export const skills = [
  { group: "Frameworks", items: ["React 19", "Next.js 15 (App Router)", "Angular 19", "TypeScript"] },
  { group: "Estilos", items: ["Tailwind CSS", "CSS moderno (grid, container queries)", "Animaciones CSS + IntersectionObserver"] },
  { group: "Datos y estado", items: ["Server Components", "TanStack Query", "Signals (Angular)", "Zustand / Redux"] },
  { group: "Calidad", items: ["Accesibilidad WAI-ARIA", "Core Web Vitals", "Testing Library", "Playwright", "Vitest / Jasmine"] },
] as const;

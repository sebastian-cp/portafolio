import type { Locale } from "../config";

export interface Project {
  slug: string;
  title: string;
  stack: "react" | "angular";
  summary: string;
  highlights: string[];
  tech: string[];
  demo?: string;
  repo?: string;
}

const REPO = "https://github.com/sebastian-cp/portafolio";

export const es = {
  locale: "es" as Locale,
  meta: {
    title: "Sebastián Cofré · Software Engineer Full Stack",
    description:
      "Portafolio de Sebastián Cofré: Angular, React/Next.js, Node.js e IA aplicada al desarrollo.",
  },
  ui: {
    skip: "Saltar al contenido",
    nav: { about: "Sobre mí", experience: "Experiencia", demos: "Demos", projects: "Proyectos", contact: "Contacto" },
    mainNav: "Principal",
    themeToggle: "Cambiar entre tema claro y oscuro",
    lang: { other: "en" as Locale, label: "English", aria: "Switch to English" },
    cta: { projects: "Ver proyectos", demos: "Probar demos", cv: "Descargar CV" },
    sections: {
      about: "Sobre mí",
      stack: "Stack",
      experience: "Experiencia",
      demos: "Demos interactivas",
      rag: "Pregúntale a mi CV",
      vitals: "Core Web Vitals en vivo",
      a11y: "Accesibilidad: antes y después",
      projects: "Proyectos",
      contact: "Contacto",
    },
    contactIntro: "¿Tienes un proyecto o una vacante? Escríbeme.",
    rights: "Todos los derechos reservados",
  },
  profile: {
    name: "Sebastián Andrés Cofré Parra",
    role: "Software Engineer · Full Stack",
    location: "Chile · Remoto / Híbrido",
    email: "scofreparr@gmail.com",
    phone: "+56 9 9881 9492",
    github: "https://github.com/sebastian-cp",
    linkedin: "https://linkedin.com/in/sebastian-cofre",
    cv: "/Sebastian_Cofre_CV.pdf",
    summary:
      "Ingeniero en Informática con experiencia en ficha clínica electrónica (salud) y credit scoring multipaís (banca). Trabajo con Angular, React y Node.js, y uso IA en el ciclo de desarrollo: workflows con agentes, automatización de pruebas con Playwright y estándares de calidad.",
    rotating: ["Angular", "React", "Node.js", "IA aplicada"],
  },
  stats: [
    { value: 2, suffix: "+", label: "años en proyectos de software" },
    { value: 3, suffix: "", label: "proyectos: salud, banca y chatbot IA" },
    { value: 1, suffix: "", label: "certificación Azure (AZ-900)" },
  ],
  skills: [
    { group: "Frontend", items: ["Angular", "React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Material-UI", "Bootstrap 5"] },
    { group: "Backend", items: ["Node.js", "Django", "Python", "PL/SQL"] },
    { group: "Datos", items: ["Oracle 19c", "PostgreSQL", "ChromaDB"] },
    { group: "IA", items: ["OpenAI API", "Claude Code", "Cursor", "RAG", "Embeddings", "Agentes", "Skills"] },
    { group: "Testing y calidad", items: ["Playwright", "Jest", "SonarQube"] },
    { group: "Herramientas y método", items: ["Git", "GitLab", "Bitbucket", "Jenkins", "ArgoCD", "Jira", "SCRUM", "Kanban"] },
  ],
  education: {
    text: "Ingeniero en Informática · INACAP (titulado 2025) · Microsoft Certified: Azure Fundamentals (AZ-900)",
  },
  experienceUi: { label: "Experiencia laboral" },
  experience: [
    {
      id: "ntt-rising",
      company: "NTT DATA Chile",
      role: "Rising Software Engineer (Full Stack)",
      period: "Ene. 2025 – Actualidad",
      project: "Clínica Alemana de Santiago",
      sections: [
        {
          title: "Desarrollo y gestión",
          items: [
            { label: "Requerimientos", text: "Análisis, planificación, diseño, desarrollo, validación y entrega con metodologías ágiles." },
            { label: "Stakeholders", text: "Coordinación técnica con Product Owners para levantar requerimientos y definir plazos." },
            { label: "Estandarización", text: "Decisiones técnicas y estándares de desarrollo para soluciones escalables." },
            { label: "Mentoring", text: "Capacitación de nuevos desarrolladores y apoyo al equipo en la adopción de flujos con IA." },
          ],
        },
        {
          title: "IA aplicada al desarrollo",
          items: [
            { label: "Workflows", text: "Estándares, instrucciones y flujos para agentes, hooks y skills: reutilización, consistencia y trazabilidad." },
            { label: "Skills reutilizables", text: "Automatización de tareas repetitivas del ciclo de desarrollo." },
            { label: "Contexto y tokens", text: "Reducción de información innecesaria en las interacciones con modelos generativos." },
            { label: "Pruebas", text: "Pruebas funcionales con Playwright, apoyadas con IA para generar y ejecutar escenarios." },
          ],
        },
      ],
    },
    {
      id: "luxxor",
      company: "LUXXOR",
      role: "Full Stack Developer",
      period: "Jun. 2024",
      project: "ChatBot de asistencia virtual (Web y WhatsApp)",
      sections: [
        {
          title: "IA y arquitectura",
          items: [
            { label: "Chatbot", text: "Asistente virtual con la API de OpenAI para plataformas Web y WhatsApp." },
            { label: "RAG", text: "El bot responde con información propia del negocio, recuperando contexto antes de generar cada respuesta." },
            { label: "Vector DB", text: "Indexación de la base de conocimiento con embeddings en ChromaDB para búsqueda semántica." },
            { label: "Modelo", text: "GPT-3.5 con ajuste de temperatura, límite de tokens y prompt de sistema." },
            { label: "Full stack", text: "Interfaces dinámicas con React y Material-UI sobre servicios en Node.js." },
          ],
        },
      ],
    },
    {
      id: "ntt-bid",
      company: "NTT DATA Chile",
      role: "Práctica Profesional",
      period: "Ene. 2024 – Mar. 2024",
      project: "Proyecto BID (Banco Interamericano de Desarrollo)",
      sections: [
        {
          title: "Banca · credit scoring",
          items: [
            { label: "WebApp bancaria", text: "Front-end de una aplicación de puntuación crediticia multipaís con Angular, TypeScript y Bootstrap." },
            { label: "Pruebas unitarias", text: "Tests para garantizar la robustez de los componentes." },
            { label: "Calidad", text: "Buenas prácticas y análisis estático con SonarQube." },
          ],
        },
      ],
    },
  ],
  rag: {
    intro:
      "Simulación local de un flujo RAG, como el que implementé en LUXXOR: tu pregunta se convierte en vector (TF-IDF), se buscan los fragmentos más cercanos de mi CV y se responde con el mejor. Sin APIs externas.",
    label: "Pregunta sobre mi experiencia",
    placeholder: "Pregúntale a mi CV…",
    ask: "Preguntar",
    suggested: "Preguntas sugeridas",
    retrieved: "1 · Fragmentos recuperados",
    answer: "2 · Respuesta",
    none: "Ninguno superó el umbral de similitud.",
    noAnswer: "No encontré eso en mi CV. Prueba preguntando por experiencia, tecnologías o proyectos.",
    suggestions: [
      "¿Qué experiencia tienes con Playwright?",
      "¿Cómo implementaste RAG?",
      "¿Has trabajado con Angular?",
      "¿Qué haces con IA en el desarrollo?",
    ],
    knowledge: [
      { id: "k1", source: "Resumen", text: "Soy Software Engineer Full Stack con experiencia en ficha clínica electrónica en salud y sistemas de credit scoring multipaís en banca." },
      { id: "k2", source: "NTT DATA · Clínica Alemana", text: "Trabajo como Rising Software Engineer en el proyecto de la Clínica Alemana de Santiago desde enero de 2025: analizo, diseño, desarrollo, valido y entrego requerimientos con metodologías ágiles." },
      { id: "k3", source: "NTT DATA · Mentoring", text: "Capacito a nuevos desarrolladores, apoyo su onboarding y la adopción de flujos de trabajo con IA. Coordino con Product Owners los requerimientos y plazos." },
      { id: "k4", source: "NTT DATA · IA", text: "Defino estándares, instrucciones y flujos para agentes, hooks y skills de IA generativa, y creo skills reutilizables que automatizan tareas repetitivas del ciclo de desarrollo." },
      { id: "k5", source: "NTT DATA · Tokens", text: "Optimizo el contexto y los tokens: reduzco la información innecesaria en las interacciones con modelos generativos para mejorar su eficiencia." },
      { id: "k6", source: "Testing", text: "Diseño y automatizo pruebas funcionales con Playwright, apoyado por IA para generar y ejecutar escenarios. También uso Jest y pruebas unitarias." },
      { id: "k7", source: "LUXXOR · Chatbot", text: "En LUXXOR desarrollé un chatbot de asistencia virtual con la API de OpenAI para Web y WhatsApp, usando el modelo GPT-3.5 con temperatura, límite de tokens y prompt de sistema ajustados." },
      { id: "k8", source: "LUXXOR · RAG", text: "Implementé un flujo RAG: indexé la base de conocimiento con embeddings en ChromaDB (base de datos vectorial) para búsqueda semántica y recuperar contexto antes de generar la respuesta." },
      { id: "k9", source: "LUXXOR · Frontend", text: "Construí interfaces dinámicas con React y Material-UI, soportadas por servicios robustos en Node.js." },
      { id: "k10", source: "BID · Angular", text: "En el Proyecto BID (Banco Interamericano de Desarrollo) desarrollé el front-end de una aplicación bancaria de credit scoring multipaís con Angular, TypeScript y Bootstrap." },
      { id: "k11", source: "BID · Calidad", text: "Apliqué análisis estático con SonarQube y escribí pruebas unitarias para un producto más estable y mantenible." },
      { id: "k12", source: "Educación", text: "Soy Ingeniero en Informática titulado en 2025 en INACAP y tengo la certificación Microsoft Azure Fundamentals AZ-900." },
      { id: "k13", source: "Stack", text: "Mi stack: Angular, React, TypeScript, JavaScript, Node.js, Django, Python, PL/SQL; bases de datos Oracle, PostgreSQL y ChromaDB; herramientas Git, GitLab, Jenkins, ArgoCD, Jira y Bitbucket." },
    ],
  },
  vitals: {
    intro:
      "Estas métricas se miden en tu navegador, ahora mismo, con PerformanceObserver (los mismos datos que usa Chrome para sus Core Web Vitals). Prueba los botones y mira cómo cambian.",
    metrics: {
      lcp: { name: "LCP", full: "Largest Contentful Paint", tip: "Si está en rojo: priorizar la imagen/hero (fetchpriority, preload), reducir JS bloqueante y servir HTML desde el servidor." },
      cls: { name: "CLS", full: "Cumulative Layout Shift", tip: "Si está en rojo: reservar ancho/alto de imágenes, usar font-display y evitar insertar contenido sobre lo ya visible." },
      inp: { name: "INP", full: "Interaction to Next Paint", tip: "Si está en rojo: dividir tareas largas, diferir trabajo no crítico y mandar menos JS al cliente." },
      fcp: { name: "FCP", full: "First Contentful Paint", tip: "Reducir recursos que bloquean el render y usar Server Components para enviar HTML útil de inmediato." },
      ttfb: { name: "TTFB", full: "Time To First Byte", tip: "Cachear en CDN, usar rutas estáticas y reducir trabajo en el servidor." },
    },
    ratings: { good: "Bueno", needs: "Mejorable", poor: "Pobre" },
    measuring: "Midiendo…",
    interact: "Interactúa con la página",
    play: "Laboratorio",
    shift: "Insertar banner tardío (provoca CLS)",
    shiftReset: "Quitar banner",
    fast: "Interacción rápida",
    slow: "Interacción lenta (bloquea 300 ms)",
    clicks: "Clics",
    lorem: "Este bloque simula contenido ya visible. Cuando un banner se inserta encima sin espacio reservado, todo se desplaza hacia abajo: eso es un layout shift, y el CLS lo suma.",
    banner: "Banner insertado tarde: nada reservaba su espacio",
    note: "Valores de laboratorio de esta visita; en producción se miden con datos reales de usuarios (CrUX / RUM) en el percentil 75.",
  },
  a11y: {
    intro:
      "Misma interfaz, dos implementaciones. A la derecha, el árbol de accesibilidad que ve un lector de pantalla (rol y nombre). Cambia entre «Sin ARIA» y «Con ARIA» y compáralos.",
    examples: { button: "Botón con ícono", field: "Campo de formulario", disclosure: "Acordeón" },
    exampleLabel: "Ejemplo",
    modes: { bad: "Sin ARIA", good: "Con ARIA" },
    modeLabel: "Implementación",
    demoArea: "Componente de demostración",
    treeTitle: "Árbol de accesibilidad",
    noName: "sin nombre accesible",
    noRole: "sin rol: el teclado y los lectores no lo ven como control",
    keyboard: "Prueba Tab: en «Sin ARIA» el control ni siquiera recibe el foco.",
    favorite: "Añadir a favoritos",
    emailLabel: "Correo electrónico",
    emailPlaceholder: "tu@correo.com",
    emailError: "Ingresa un correo válido (debe incluir @).",
    faqQ: "¿Qué es el CLS?",
    faqA: "Cumulative Layout Shift: mide cuánto se mueve el contenido mientras carga.",
    treeNote: "Árbol simplificado, calculado en vivo desde el DOM.",
  },
  palette: {
    open: "Buscar",
    title: "Paleta de comandos",
    inputLabel: "Buscar comando",
    placeholder: "Escribe un comando…",
    list: "Comandos",
    empty: "Sin resultados",
    copied: "Correo copiado",
    actions: {
      about: "Ir a Sobre mí",
      experience: "Ir a Experiencia",
      rag: "Probar demo RAG",
      vitals: "Ver Core Web Vitals en vivo",
      a11y: "Ver demo de accesibilidad",
      projects: "Ir a Proyectos",
      contact: "Ir a Contacto",
      theme: "Cambiar tema claro/oscuro",
      lang: "Cambiar a English",
      mail: "Copiar correo",
      cv: "Descargar CV (PDF)",
      github: "Abrir GitHub",
      linkedin: "Abrir LinkedIn",
    },
  },
  projectsUi: {
    filterLabel: "Filtrar proyectos por tecnología",
    all: "Todos",
    react: "React / Next.js",
    angular: "Angular",
    shownOne: "{n} proyecto mostrado",
    shownMany: "{n} proyectos mostrados",
    demo: "Ver demo",
    code: "Código",
    of: "de",
    techLabel: "Tecnologías",
  },
  projects: [
    {
      slug: "este-portafolio",
      title: "Este portafolio",
      stack: "react",
      summary: "Next.js 15 (App Router) bilingüe ES/EN: Server Components por defecto y pequeñas islas cliente para lo interactivo.",
      highlights: [
        "i18n con rutas /es y /en, middleware y metadatos por idioma",
        "Tema claro/oscuro sin flash; animaciones solo con CSS + IntersectionObserver",
        "Tests e2e con Playwright en ambos idiomas",
      ],
      tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind 4", "Playwright"],
      repo: `${REPO}/tree/main/apps/web`,
    },
    {
      slug: "web-vitals",
      title: "Panel de Core Web Vitals en vivo",
      stack: "react",
      summary: "Mide LCP, CLS, INP, FCP y TTFB de la propia página con PerformanceObserver, con un laboratorio para provocar CLS e INP a propósito.",
      highlights: [
        "CLS con ventanas de sesión, igual que la definición oficial",
        "INP calculado por interacción (percentil alto)",
        "Cada métrica incluye cómo arreglarla",
      ],
      tech: ["React 19", "PerformanceObserver", "Event Timing", "Layout Instability"],
      repo: `${REPO}/blob/main/apps/web/src/components/WebVitals.tsx`,
    },
    {
      slug: "a11y-playground",
      title: "Accesibilidad: antes y después",
      stack: "react",
      summary: "Tres componentes en versión «sin ARIA» y «con ARIA», con el árbol de accesibilidad calculado en vivo desde el DOM.",
      highlights: [
        "Rol y nombre accesible derivados con un mini-algoritmo propio",
        "Avisos cuando un control no tiene nombre o rol",
        "Foco y teclado: lo que falla sin semántica",
      ],
      tech: ["React 19", "WAI-ARIA", "MutationObserver"],
      repo: `${REPO}/blob/main/apps/web/src/lib/a11y-tree.ts`,
    },
    {
      slug: "demo-rag",
      title: "Demo RAG sobre mi CV",
      stack: "react",
      summary: "Versión didáctica, 100% en el navegador, del flujo RAG que implementé en LUXXOR: recupera por similitud TF-IDF y responde con el mejor fragmento.",
      highlights: [
        "Muestra los fragmentos recuperados con su puntaje",
        "Respuesta en streaming accesible con lector de pantalla",
        "Lógica de recuperación pura y testeable",
      ],
      tech: ["React 19", "TypeScript", "TF-IDF", "Similitud coseno"],
      repo: `${REPO}/blob/main/apps/web/src/lib/rag.ts`,
    },
    {
      slug: "design-system",
      title: "Design system en Storybook",
      stack: "react",
      summary: "Button, Badge, Tabs y ProjectCard documentados con estados, controles y chequeos automáticos de accesibilidad.",
      highlights: [
        "Tabs con patrón WAI-ARIA y navegación por flechas",
        "Tokens de color con modo claro/oscuro",
        "Addon a11y para detectar problemas de contraste y semántica",
      ],
      tech: ["Storybook 9", "React 19", "Tailwind 4", "WAI-ARIA"],
      demo: process.env.NEXT_PUBLIC_STORYBOOK_URL ?? "/storybook/index.html",
      repo: `${REPO}/tree/main/apps/web/src/ui`,
    },
    {
      slug: "task-board-angular",
      title: "Task Board (Angular)",
      stack: "angular",
      summary: "Tablero de tareas con componentes standalone, Signals y ChangeDetection OnPush; estado derivado con computed().",
      highlights: [
        "Signals + computed en lugar de suscripciones manuales",
        "Control flow nativo (@for / @if) y OnPush",
        "Persistencia en localStorage y tests unitarios",
      ],
      tech: ["Angular 19", "Signals", "TypeScript", "Jasmine"],
      repo: `${REPO}/tree/main/apps/angular-demo/src/app/tasks`,
    },
    {
      slug: "angular-dashboard",
      title: "Dashboard en vivo (Angular)",
      stack: "angular",
      summary: "Métricas simuladas en tiempo real con Signals y gráfico SVG propio; pausa, velocidad y series seleccionables.",
      highlights: [
        "effect() con limpieza para controlar el intervalo",
        "Gráfico SVG sin librerías, accesible con resumen textual",
        "Rutas con carga diferida (lazy loading)",
      ],
      tech: ["Angular 19", "Signals", "SVG", "Lazy routes"],
      repo: `${REPO}/tree/main/apps/angular-demo/src/app/dashboard`,
    },
    {
      slug: "angular-rag",
      title: "Demo RAG (Angular)",
      stack: "angular",
      summary: "El mismo flujo de recuperación TF-IDF, implementado con Signals y formularios en Angular.",
      highlights: [
        "Estado de la consulta y resultados con signal() y computed()",
        "Streaming de la respuesta palabra por palabra",
        "Pruebas unitarias del motor de recuperación",
      ],
      tech: ["Angular 19", "Signals", "TF-IDF", "Jasmine"],
      repo: `${REPO}/tree/main/apps/angular-demo/src/app/rag`,
    },
  ] as Project[],
};

export type Content = typeof es;

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

export const REPO = "https://github.com/sebastian-cp/portafolio/tree/master";

/** Las demos de Angular viven en otra app: en local es el `ng serve` de apps/angular-demo. */
const ANGULAR = process.env.NEXT_PUBLIC_ANGULAR_URL ?? (process.env.NODE_ENV === "development" ? "http://localhost:4200" : undefined);
export const angularDemo = (route: string) => (ANGULAR ? `${ANGULAR}/${route}` : undefined);

/** En producción Storybook se publica dentro de public/; en local corre aparte con `npm run storybook`. */
export const STORYBOOK = process.env.NEXT_PUBLIC_STORYBOOK_URL ?? (process.env.NODE_ENV === "development" ? "http://localhost:6006" : "/storybook/index.html");

export const es = {
  locale: "es" as Locale,
  meta: {
    title: "Sebastián Cofré · Software Engineer Full Stack",
    description:
      "Portafolio de Sebastián Cofré: Angular, React/Next.js, Node.js e IA aplicada al desarrollo.",
  },
  ui: {
    skip: "Saltar al contenido",
    nav: { about: "Trabajo", experience: "Experiencia", demos: "Demos", projects: "Proyectos", hobbies: "Hobbies", contact: "Contacto" },
    mainNav: "Principal",
    themeToggle: "Cambiar entre tema claro y oscuro",
    lang: { other: "en" as Locale, label: "English", aria: "Switch to English" },
    cta: { projects: "Ver proyectos", demos: "Probar demos", cv: "Descargar CV" },
    hero: {
      kicker: "Ficha clínica en salud y scoring crediticio en banca.",
      paletteHint: "para navegar",
    },
    eyebrows: {
      about: "Qué construyo",
      experience: "Trayectoria",
      demos: "Código corriendo",
      projects: "Trabajo",
      hobbies: "Fuera del código",
      contact: "Hablemos",
    },
    indexes: { about: "01", experience: "02", demos: "03", projects: "04", hobbies: "05", contact: "06" },
    asides: {
      demos: "Todo corre en tu navegador",
      projects: "Filtra por tecnología",
    },
    sections: {
      about: "Dónde se usa lo que hago",
      stack: "Con qué trabajo",
      experience: "Experiencia",
      demos: "Demos interactivas",
      rag: "Pregúntale a mi CV",
      vitals: "Core Web Vitals en vivo",
      a11y: "Accesibilidad: antes y después",
      projects: "Proyectos",
      hobbies: "Fotografía y viajes",
      contact: "Contacto",
    },
    contact: {
      status: "Abierto a nuevas oportunidades",
      title: "¿Tienes un proyecto o un puesto en mente?",
      sub: "Leo todos los correos y respondo. Cuéntame qué están construyendo y vemos cómo puedo aportar.",
      cta: "Escríbeme",
      channels: "Canales directos",
      email: "Correo",
      cvLabel: "Currículum",
      cvValue: "PDF · Español",
      copy: "Copiar correo",
      copied: "Correo copiado",
      newTab: "(se abre en otra pestaña)",
    },
    rights: "Todos los derechos reservados",
  },
  profile: {
    name: "Sebastián Andrés Cofré Parra",
    role: "Software Engineer · Full Stack",
    location: "Chile · remoto",
    email: "scofreparr@gmail.com",
    github: "https://github.com/sebastian-cp",
    linkedin: "https://linkedin.com/in/sebastian-cofre",
    cv: "/Sebastian_Cofre_CV.pdf",
    summary:
      "Llevo requerimientos de punta a punta: los diseño con el Product Owner, los construyo y los valido antes de entregar. Integro IA al ciclo de desarrollo —agentes, skills reutilizables y pruebas con Playwright— para que el equipo entregue más rápido sin bajar el estándar.",
    rotating: ["Angular", "React", "Node.js", "IA aplicada"],
  },
  work: [
    {
      id: "salud",
      domain: "Salud",
      product: "Ficha clínica electrónica",
      org: "Clínica Alemana de Santiago · con NTT DATA",
      line: "Software que el personal clínico usa en su turno. Si una pantalla falla o confunde, el costo no es un ticket: es tiempo de atención.",
      tech: ["Angular", "TypeScript", "Node.js", "Oracle"],
    },
    {
      id: "banca",
      domain: "Banca",
      product: "Scoring crediticio multipaís",
      org: "Proyecto BID · con NTT DATA",
      line: "Front-end de evaluación crediticia operando con reglas distintas por país, con pruebas unitarias y análisis estático en el pipeline.",
      tech: ["Angular", "TypeScript", "Bootstrap", "SonarQube"],
    },
    {
      id: "ia",
      domain: "IA aplicada",
      product: "Chatbot con RAG",
      org: "LUXXOR · web y WhatsApp",
      line: "Asistente que responde con la documentación real del negocio: indexé la base de conocimiento con embeddings y recupero contexto antes de cada respuesta.",
      tech: ["OpenAI API", "ChromaDB", "React", "Node.js"],
    },
  ],

  years: { value: 2, suffix: "+", label: "años en proyectos de software" },
  skills: [
    { group: "Frontend", items: ["Angular", "React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Material-UI", "Bootstrap 5"] },
    { group: "Backend", items: ["Node.js", "Django", "Python", "PL/SQL"] },
    { group: "Datos", items: ["Oracle 19c", "PostgreSQL", "ChromaDB"] },
    { group: "IA", items: ["OpenAI API", "Claude Code", "Cursor", "RAG", "Embeddings", "Agentes", "Skills"] },
    { group: "Testing y calidad", items: ["Playwright", "Jest", "SonarQube"] },
    { group: "Herramientas y método", items: ["Git", "GitLab", "Bitbucket", "Jenkins", "ArgoCD", "Jira", "SCRUM", "Kanban"] },
  ],
  education: {
    label: "Formación",
    degree: "Ingeniero en Informática",
    place: "INACAP · titulado 2025",
    certLabel: "Certificación",
    certTitle: "Azure Fundamentals (AZ-900)",
    cert: "Microsoft Certified: Azure Fundamentals (AZ-900)",
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
      { id: "k1", source: "Resumen", text: "Soy Software Engineer Full Stack con experiencia en ficha clínica electrónica en salud y sistemas de credit scoring multipaís en banca.", tags: "quien eres presentate cuentame sobre ti perfil resumen trayectoria años carrera profesion full stack" },
      { id: "k2", source: "NTT DATA · Clínica Alemana", text: "Trabajo como Rising Software Engineer en el proyecto de la Clínica Alemana de Santiago desde enero de 2025: analizo, diseño, desarrollo, valido y entrego requerimientos con metodologías ágiles.", tags: "hoy actualmente ahora actual dedicas dedica rol cargo puesto empresa trabajas donde ntt data salud clinica" },
      { id: "k3", source: "NTT DATA · Mentoring", text: "Capacito a nuevos desarrolladores, apoyo su onboarding y la adopción de flujos de trabajo con IA. Coordino con Product Owners los requerimientos y plazos.", tags: "mentor mentoria capacitas enseñas onboarding liderazgo lideras equipo coordinas product owner" },
      { id: "k4", source: "NTT DATA · IA", text: "Defino estándares, instrucciones y flujos para agentes, hooks y skills de IA generativa, y creo skills reutilizables que automatizan tareas repetitivas del ciclo de desarrollo.", tags: "ia inteligencia artificial agentes copilot claude automatizacion prompts generativa" },
      { id: "k5", source: "NTT DATA · Tokens", text: "Optimizo el contexto y los tokens: reduzco la información innecesaria en las interacciones con modelos generativos para mejorar su eficiencia.", tags: "tokens contexto optimizas costos eficiencia llm modelos" },
      { id: "k6", source: "Testing", text: "Diseño y automatizo pruebas funcionales con Playwright, apoyado por IA para generar y ejecutar escenarios. También uso Jest y pruebas unitarias.", tags: "tests pruebas testing qa calidad automatizacion e2e unitarias jest playwright" },
      { id: "k7", source: "LUXXOR · Chatbot", text: "En LUXXOR desarrollé un chatbot de asistencia virtual con la API de OpenAI para Web y WhatsApp, usando el modelo GPT-3.5 con temperatura, límite de tokens y prompt de sistema ajustados.", tags: "chatbot bot chatgpt openai gpt whatsapp asistente llm" },
      { id: "k8", source: "LUXXOR · RAG", text: "Implementé un flujo RAG: indexé la base de conocimiento con embeddings en ChromaDB (base de datos vectorial) para búsqueda semántica y recuperar contexto antes de generar la respuesta.", tags: "rag embeddings vectorial busqueda semantica chromadb" },
      { id: "k9", source: "LUXXOR · Frontend", text: "Construí interfaces dinámicas con React y Material-UI, soportadas por servicios robustos en Node.js.", tags: "react frontend front interfaces ui material node backend" },
      { id: "k10", source: "BID · Angular", text: "En el Proyecto BID (Banco Interamericano de Desarrollo) desarrollé el front-end de una aplicación bancaria de credit scoring multipaís con Angular, TypeScript y Bootstrap.", tags: "angular banca banco bid finanzas credit scoring frontend typescript" },
      { id: "k11", source: "BID · Calidad", text: "Apliqué análisis estático con SonarQube y escribí pruebas unitarias para un producto más estable y mantenible.", tags: "calidad sonarqube codigo limpio unitarias mantenible" },
      { id: "k12", source: "Educación", text: "Soy Ingeniero en Informática titulado en 2025 en INACAP y tengo la certificación Microsoft Azure Fundamentals AZ-900.", tags: "estudios estudiaste universidad titulo carrera formacion educacion ingeniero certificaciones certificado azure inacap" },
      { id: "k13", source: "Stack", text: "Mi stack: Angular, React, TypeScript, JavaScript, Node.js, Django, Python, PL/SQL; bases de datos Oracle, PostgreSQL y ChromaDB; herramientas Git, GitLab, Jenkins, ArgoCD, Jira y Bitbucket.", tags: "tecnologias lenguajes herramientas manejas dominas sabes conoces stack bases datos sql python backend devops" },
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
      about: "Ir a Trabajo",
      experience: "Ir a Experiencia",
      rag: "Probar demo RAG",
      vitals: "Ver Core Web Vitals en vivo",
      a11y: "Ver demo de accesibilidad",
      projects: "Ir a Proyectos",
      hobbies: "Ver fotografías",
      contact: "Ir a Contacto",
      theme: "Cambiar tema claro/oscuro",
      lang: "Cambiar a English",
      mail: "Copiar correo",
      cv: "Descargar CV (PDF)",
      github: "Abrir GitHub",
      linkedin: "Abrir LinkedIn",
    },
  },
  hobbies: {
    intro:
      "Cuando cierro el editor, salgo con la cámara. Me gusta viajar y fotografiar lo que encuentro en el camino, sobre todo los detalles chicos que aparecen si uno camina sin apuro.",
    tags: ["Fotografía", "Viajes", "Naturaleza"],
    galleryLabel: "Galería de fotografías",
    photos: [
      { id: "lago", alt: "Orilla del Lago Collico con piedras lisas y agua quieta que refleja el cielo, con cerros al fondo", caption: "Lago Collico" },
      { id: "bosque", alt: "Bosque nativo en pendiente con araucarias, troncos caídos y musgo, visto desde abajo", caption: "Bosque nativo" },
      { id: "glaciar", alt: "Laguna turquesa al pie de un cerro de roca oscura con restos de hielo del Glaciar Pichillancahue", caption: "Glaciar Pichillancahue" },
      { id: "flores", alt: "Aguileñas blancas en primer plano con follaje verde y cielo nublado al atardecer", caption: "Aguileñas" },
      { id: "cerezo", alt: "Ramas de un ciruelo cubiertas de flores blancas contra un cielo azul despejado", caption: "Ciruelo en flor" },
    ],
  },
  projectsUi: {
    filterLabel: "Filtrar proyectos por tecnología",
    all: "Todos",
    react: "React / Next.js",
    angular: "Angular",
    shownOne: "{n} proyecto mostrado",
    shownMany: "{n} proyectos mostrados",
    demo: "Ver demo",
    newTab: "Abrir en pestaña nueva",
    close: "Cerrar demo",
    loading: "Cargando demo…",
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
      repo: `${REPO}/apps/web`,
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
      repo: `${REPO}/apps/web/src/components/WebVitals.tsx`,
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
      repo: `${REPO}/apps/web/src/lib/a11y-tree.ts`,
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
      repo: `${REPO}/apps/web/src/lib/rag.ts`,
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
      demo: STORYBOOK,
      repo: `${REPO}/apps/web/src/ui`,
    },
    {
      slug: "angular-grid",
      title: "Explorador de 50.000 filas (Angular)",
      stack: "angular",
      summary: "Tabla virtualizada escrita a mano: solo existen en el DOM las filas visibles. Orden, filtro, navegación por teclado y encabezado fijo.",
      highlights: [
        "Muestra en vivo cuántos nodos hay realmente en el DOM",
        "role=grid con aria-rowcount y aria-rowindex sobre filas virtuales",
        "La matemática de la ventana es pura y está cubierta por tests",
      ],
      tech: ["Angular 19", "Signals", "TypeScript", "Jasmine"],
      demo: angularDemo("grid"),
      repo: `${REPO}/apps/angular-demo/src/app/grid`,
    },
    {
      slug: "angular-rxjs",
      title: "Buscador con RxJS (Angular)",
      stack: "angular",
      summary: "debounce, cancelación de respuestas obsoletas y reintento con backoff, con una línea de tiempo que muestra qué petición se canceló y por qué.",
      highlights: [
        "switchMap contra mergeMap: el race condition se ve, no se explica",
        "Latencia inversa al largo de la consulta para forzar el caso",
        "Estados de carga, vacío y error, y resultado obsoleto señalizado",
      ],
      tech: ["Angular 19", "RxJS", "Signals", "Jasmine"],
      demo: angularDemo("search"),
      repo: `${REPO}/apps/angular-demo/src/app/search`,
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
      demo: angularDemo("rag"),
      repo: `${REPO}/apps/angular-demo/src/app/rag`,
    },
  ] as Project[],
};

export type Content = typeof es;

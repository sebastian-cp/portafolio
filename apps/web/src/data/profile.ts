export const profile = {
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
};

export const stats = [
  { value: 2, suffix: "+", label: "años en proyectos de software" },
  { value: 3, suffix: "", label: "proyectos: salud, banca y chatbot IA" },
  { value: 1, suffix: "", label: "certificación Azure (AZ-900)" },
] as const;

export const skills = [
  { group: "Frontend", items: ["Angular", "React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Material-UI", "Bootstrap 5"] },
  { group: "Backend", items: ["Node.js", "Django", "Python", "PL/SQL"] },
  { group: "Datos", items: ["Oracle 19c", "PostgreSQL", "ChromaDB"] },
  { group: "IA", items: ["OpenAI API", "Claude Code", "Cursor", "RAG", "Embeddings", "Agentes", "Skills"] },
  { group: "Testing y calidad", items: ["Playwright", "Jest", "SonarQube"] },
  { group: "Herramientas y método", items: ["Git", "GitLab", "Bitbucket", "Jenkins", "ArgoCD", "Jira", "SCRUM", "Kanban"] },
] as const;

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  project: string;
  sections: { title: string; items: { label: string; text: string }[] }[];
}

export const experience: ExperienceEntry[] = [
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
];

export const education = {
  title: "Ingeniero en Informática",
  place: "INACAP",
  year: "titulado 2025",
  cert: "Microsoft Certified: Azure Fundamentals (AZ-900)",
};

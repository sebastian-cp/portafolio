export interface Chunk {
  id: string;
  source: string;
  text: string;
}

/** Base de conocimiento del demo RAG: fragmentos extraídos del CV. */
export const knowledge: Chunk[] = [
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
];

export const suggestions = [
  "¿Qué experiencia tienes con Playwright?",
  "¿Cómo implementaste RAG?",
  "¿Has trabajado con Angular?",
  "¿Qué haces con IA en el desarrollo?",
];

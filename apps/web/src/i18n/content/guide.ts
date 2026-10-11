import type { Locale } from "../config";

/** Textos del bot guía. Viven aparte de es.ts/en.ts para que el widget sea autocontenido. */
export type GuideSection = "trabajo" | "experiencia" | "demos" | "proyectos" | "hobbies" | "contacto";

export interface GuideContent {
  name: string;
  open: string;
  close: string;
  hide: string;
  menuTitle: string;
  greet: string;
  greetAgain: string;
  tickle: string;
  goTop: string;
  search: string;
  contact: string;
  sections: Record<GuideSection, { label: string; hint: string }>;
  /** Reacciones a lo que hace el visitante; se elige una al azar. */
  reactions: Record<GuideReaction, string[]>;
}

export type GuideReaction = "rag" | "vitals" | "filter" | "hobbies" | "contact" | "copy" | "dark" | "light" | "empty";

const es: GuideContent = {
  name: "Bit",
  open: "Abrir el guía del sitio",
  close: "Cerrar el guía",
  hide: "Ocultar",
  menuTitle: "¿A dónde vamos?",
  greet: "¡Hola! Soy Bit, el guía de este portafolio. Haz clic en mí para ver atajos.",
  greetAgain: "¡Hola de nuevo! Haz clic en mí para ver atajos.",
  tickle: "¡Uy, tantos clics me marean!",
  goTop: "Volver arriba",
  search: "Buscar acción",
  contact: "Escribir a Sebastián",
  sections: {
    trabajo: { label: "Sobre mí", hint: "Aquí está lo que Sebastián hace en el día a día." },
    experiencia: { label: "Experiencia", hint: "Su trayectoria, paso a paso." },
    demos: { label: "Demos", hint: "Estas demos son interactivas. ¡Pruébalas!" },
    proyectos: { label: "Proyectos", hint: "Puedes filtrar los proyectos por stack." },
    hobbies: { label: "Hobbies", hint: "Lo que hace lejos del teclado." },
    contacto: { label: "Contacto", hint: "¿Hablamos? Puedes escribirle desde aquí mismo." },
  },
  reactions: {
    rag: ["¡Wow, qué genial!", "¡Mira cómo encuentra la respuesta!", "¡Buena pregunta!"],
    vitals: ["¡Ooh, mira cómo cambian las métricas!", "¡Eso movió los números!", "¡Qué interesante!"],
    filter: ["¡Buena elección!", "Así se encuentra más rápido."],
    hobbies: ["¡Qué bonito!", "¡Me gusta esta parte!"],
    contact: ["¡Me encanta que quieras escribirle!", "¡Sebastián va a estar feliz!"],
    copy: ["¡Copiado!", "¡Ya lo tienes!"],
    dark: ["Modo oscuro: mis ojos lo agradecen."],
    light: ["¡Uy, qué luminoso!"],
    empty: ["¿Hm? Ahí no hay nada…", "¿Buscabas algo? Haz clic en mí.", "¿Eh?"],
  },
};

const en: GuideContent = {
  name: "Bit",
  open: "Open the site guide",
  close: "Close the guide",
  hide: "Hide",
  menuTitle: "Where to?",
  greet: "Hi! I'm Bit, this portfolio's guide. Click me to see shortcuts.",
  greetAgain: "Welcome back! Click me to see shortcuts.",
  tickle: "Whoa, all these clicks make me dizzy!",
  goTop: "Back to top",
  search: "Search actions",
  contact: "Message Sebastián",
  sections: {
    trabajo: { label: "About", hint: "Here's what Sebastián does day to day." },
    experiencia: { label: "Experience", hint: "His career, step by step." },
    demos: { label: "Demos", hint: "These demos are interactive. Give them a try!" },
    proyectos: { label: "Projects", hint: "You can filter the projects by stack." },
    hobbies: { label: "Hobbies", hint: "What he does away from the keyboard." },
    contacto: { label: "Contact", hint: "Want to talk? You can write to him right here." },
  },
  reactions: {
    rag: ["Wow, that's cool!", "Look how it finds the answer!", "Good question!"],
    vitals: ["Ooh, look at the metrics change!", "That moved the numbers!", "Interesting!"],
    filter: ["Good pick!", "Easier to find that way."],
    hobbies: ["How nice!", "I like this part!"],
    contact: ["Love that you want to reach out!", "Sebastián will be happy!"],
    copy: ["Copied!", "Got it!"],
    dark: ["Dark mode: my eyes thank you."],
    light: ["Whoa, so bright!"],
    empty: ["Hm? Nothing there…", "Looking for something? Click me.", "Huh?"],
  },
};

export const getGuideContent = (locale: Locale): GuideContent => (locale === "en" ? en : es);

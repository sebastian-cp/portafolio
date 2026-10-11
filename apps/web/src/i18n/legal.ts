import type { Locale } from "./config";

export const legalDocs = ["terms", "privacy"] as const;
export type LegalDoc = (typeof legalDocs)[number];
export const isLegalDoc = (v: string): v is LegalDoc => (legalDocs as readonly string[]).includes(v);

interface Section {
  title: string;
  body: string[];
  list?: string[];
}

export interface LegalPage {
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: Section[];
}

const OWNER = "Sebastián Andrés Cofré Parra";
const EMAIL = "scofreparr@gmail.com";

/**
 * Textos legales del sitio. Si cambia lo que se recoge (otro proveedor de correo,
 * analítica con cookies, un formulario nuevo), hay que actualizar la política de
 * privacidad y la fecha de actualización.
 */
export const legal: Record<Locale, { updatedLabel: string; toc: string; related: string } & Record<LegalDoc, LegalPage>> = {
  es: {
    updatedLabel: "Última actualización",
    toc: "En esta página",
    related: "Ver también",
    terms: {
      title: "Términos de uso",
      description: "Condiciones de uso del portafolio personal de Sebastián Cofré.",
      updated: "11 de octubre de 2026",
      intro: `Este sitio es el portafolio profesional de ${OWNER}. Al navegarlo aceptas estas condiciones; si no estás de acuerdo con ellas, te pido no usarlo.`,
      sections: [
        {
          title: "Titular del sitio",
          body: [`El sitio y su contenido pertenecen a ${OWNER}, persona natural con domicilio en Chile. Puedes escribirme a ${EMAIL} por cualquier consulta sobre estos términos.`],
        },
        {
          title: "Para qué existe el sitio",
          body: ["Es un sitio informativo: muestra mi experiencia, proyectos y demos técnicas. No vende productos ni servicios en línea, y lo que publico aquí no constituye una oferta comercial vinculante."],
        },
        {
          title: "Propiedad intelectual",
          body: [
            "Los textos, fotografías, diseño y código de este sitio son de mi autoría, salvo que se indique otra cosa. El código fuente está publicado en GitHub y se rige por la licencia que indique ese repositorio; a falta de licencia, me reservo todos los derechos.",
            "Puedes compartir enlaces al sitio y citar fragmentos breves mencionando la fuente. Para reproducir las fotografías u otro contenido completo, escríbeme antes.",
          ],
        },
        {
          title: "Marcas y logos de terceros",
          body: [
            "Los nombres y logos de Clínica Alemana de Santiago, Banco Interamericano de Desarrollo (BID), NTT DATA y LUXXOR pertenecen a sus respectivos titulares. Aparecen solo para identificar los proyectos en que participé y no implican patrocinio ni respaldo de su parte hacia este sitio.",
            "Los íconos de tecnologías provienen de Simple Icons (licencia CC0) y sus marcas pertenecen a sus dueños. La insignia AZ-900 es un diseño propio que representa la certificación, no el arte oficial de Microsoft.",
          ],
        },
        {
          title: "Demos y datos de ejemplo",
          body: ["Las demos (RAG, Core Web Vitals, tabla de 50.000 filas, buscador con RxJS) usan datos sintéticos y corren en tu navegador. No contienen datos ni reglas de negocio de clientes. Se ofrecen tal cual, con fines demostrativos, sin garantía de disponibilidad ni de resultados."],
        },
        {
          title: "Uso aceptable",
          body: ["No uses el sitio ni su formulario de contacto para enviar spam, contenido ilícito o intentos de vulnerar su seguridad. Puedo bloquear el acceso o descartar mensajes que incumplan esto."],
        },
        {
          title: "Enlaces externos",
          body: ["El sitio enlaza a servicios de terceros como GitHub y LinkedIn. No controlo su contenido ni sus políticas, y te recomiendo revisarlas al visitarlos."],
        },
        {
          title: "Responsabilidad",
          body: ["Procuro que la información esté correcta y al día, pero puede contener errores u omisiones. En la medida que la ley lo permita, no respondo por daños derivados del uso del sitio o de la imposibilidad de usarlo."],
        },
        {
          title: "Ley aplicable",
          body: ["Estos términos se rigen por las leyes de la República de Chile. Cualquier controversia se someterá a los tribunales ordinarios de justicia de Chile."],
        },
        {
          title: "Cambios",
          body: ["Puedo actualizar estos términos. La versión vigente es siempre la publicada en esta página, con su fecha de actualización."],
        },
      ],
    },
    privacy: {
      title: "Política de privacidad",
      description: "Qué datos recoge el portafolio de Sebastián Cofré, para qué y cómo ejercer tus derechos.",
      updated: "11 de octubre de 2026",
      intro: "Esta política explica qué datos personales trata este sitio, para qué y qué derechos tienes. Se ajusta a la Ley N° 19.628 sobre protección de la vida privada y, desde su entrada en vigencia, a la Ley N° 21.719 que la modifica.",
      sections: [
        {
          title: "Responsable",
          body: [`El responsable del tratamiento es ${OWNER}. Para cualquier asunto de privacidad escríbeme a ${EMAIL}.`],
        },
        {
          title: "Qué datos recojo",
          body: ["Solo trato los datos que tú me entregas al usar el formulario de contacto:"],
          list: [
            "Nombre y correo electrónico.",
            "Si escribes como reclutador o empresa: empresa, cargo, modalidad, tipo de contrato y enlace a la oferta.",
            "Si escribes por un proyecto: tipo de proyecto, presupuesto y plazo estimados.",
            "El mensaje que escribas.",
          ],
        },
        {
          title: "Para qué los uso",
          body: ["Uso esos datos únicamente para leer tu mensaje y responderte. No los uso para publicidad, no creo perfiles, no los vendo ni los cedo a terceros. La base para tratarlos es tu consentimiento, que entregas al enviar el formulario."],
        },
        {
          title: "Cómo se envían y dónde quedan",
          body: [
            "El sitio no guarda los mensajes en una base de datos. Al enviar el formulario, el contenido se reenvía como correo electrónico a mi casilla personal a través de Resend (Resend, Inc.), un servicio de envío de correos con servidores en Estados Unidos.",
            "Los mensajes quedan en mi correo mientras sean útiles para la conversación. Puedes pedirme que los borre en cualquier momento.",
          ],
        },
        {
          title: "Analítica y almacenamiento local",
          body: [
            "Uso Vercel Web Analytics para saber cuántas visitas recibe el sitio y qué páginas se ven. Es anónimo: no usa cookies, no identifica a personas y solo entrega datos agregados (página, sitio de origen, país y tipo de dispositivo).",
            "El sitio guarda en el almacenamiento local de tu navegador (localStorage) si prefieres el tema claro u oscuro. Ese dato no sale de tu equipo y puedes borrarlo limpiando los datos del sitio.",
          ],
        },
        {
          title: "Alojamiento",
          body: ["El sitio está alojado en Vercel (Vercel Inc., Estados Unidos). Como cualquier servidor web, Vercel procesa datos técnicos de cada visita, como la dirección IP, para entregar las páginas y proteger el servicio."],
        },
        {
          title: "Transferencia internacional",
          body: ["Resend y Vercel operan desde Estados Unidos, así que los datos descritos aquí pueden tratarse fuera de Chile. Ambos son proveedores con políticas de seguridad y privacidad públicas, y solo los uso para lo indicado en esta página."],
        },
        {
          title: "Tus derechos",
          body: [`Puedes pedirme en cualquier momento, escribiendo a ${EMAIL}:`],
          list: [
            "Acceso: saber qué datos tuyos tengo.",
            "Rectificación: corregir datos inexactos.",
            "Supresión: que borre tus datos.",
            "Oposición: que deje de usarlos.",
            "Portabilidad: recibir tus datos en un formato de uso común.",
          ],
        },
        {
          title: "Seguridad",
          body: ["La comunicación con el sitio va cifrada por HTTPS, el formulario valida y limita lo que acepta, y descarta envíos automatizados de bots."],
        },
        {
          title: "Menores de edad",
          body: ["El sitio está dirigido a profesionales y empresas. No recojo a sabiendas datos de menores de 14 años."],
        },
        {
          title: "Cambios",
          body: ["Si cambia lo que recoge el sitio, actualizaré esta política y su fecha. La versión vigente es siempre la publicada aquí."],
        },
      ],
    },
  },
  en: {
    updatedLabel: "Last updated",
    toc: "On this page",
    related: "See also",
    terms: {
      title: "Terms of use",
      description: "Terms of use for Sebastián Cofré's personal portfolio.",
      updated: "October 11, 2026",
      intro: `This site is the professional portfolio of ${OWNER}. By browsing it you accept these terms; if you do not agree with them, please do not use it.`,
      sections: [
        {
          title: "Site owner",
          body: [`The site and its content belong to ${OWNER}, an individual based in Chile. You can reach me at ${EMAIL} with any question about these terms.`],
        },
        {
          title: "What the site is for",
          body: ["It is an informational site: it shows my experience, projects and technical demos. It does not sell products or services online, and nothing published here is a binding commercial offer."],
        },
        {
          title: "Intellectual property",
          body: [
            "The text, photographs, design and code of this site are my own work unless stated otherwise. The source code is published on GitHub and governed by the license stated in that repository; where no license is stated, all rights are reserved.",
            "You may share links to the site and quote short excerpts with attribution. To reproduce the photographs or other content in full, please ask me first.",
          ],
        },
        {
          title: "Third-party trademarks and logos",
          body: [
            "The names and logos of Clínica Alemana de Santiago, the Inter-American Development Bank (IDB), NTT DATA and LUXXOR belong to their respective owners. They appear only to identify the projects I worked on and do not imply sponsorship or endorsement of this site.",
            "Technology icons come from Simple Icons (CC0 license) and their trademarks belong to their owners. The AZ-900 badge is my own design representing the certification, not Microsoft's official artwork.",
          ],
        },
        {
          title: "Demos and sample data",
          body: ["The demos (RAG, Core Web Vitals, the 50,000-row table, the RxJS search) use synthetic data and run in your browser. They contain no client data or business rules. They are provided as is, for demonstration purposes, with no guarantee of availability or results."],
        },
        {
          title: "Acceptable use",
          body: ["Do not use the site or its contact form to send spam, unlawful content or attempts to break its security. I may block access or discard messages that do."],
        },
        {
          title: "External links",
          body: ["The site links to third-party services such as GitHub and LinkedIn. I do not control their content or policies, and I recommend reviewing them when you visit."],
        },
        {
          title: "Liability",
          body: ["I try to keep the information accurate and up to date, but it may contain errors or omissions. To the extent permitted by law, I am not liable for damages arising from using, or being unable to use, the site."],
        },
        {
          title: "Governing law",
          body: ["These terms are governed by the laws of the Republic of Chile. Any dispute will be submitted to the ordinary courts of Chile."],
        },
        {
          title: "Changes",
          body: ["I may update these terms. The current version is always the one published on this page, with its last-updated date."],
        },
      ],
    },
    privacy: {
      title: "Privacy policy",
      description: "What data Sebastián Cofré's portfolio collects, why, and how to exercise your rights.",
      updated: "October 11, 2026",
      intro: "This policy explains what personal data this site handles, why, and what rights you have. It follows Chilean Law No. 19,628 on the protection of private life and, once in force, Law No. 21,719, which amends it.",
      sections: [
        {
          title: "Data controller",
          body: [`The data controller is ${OWNER}. For any privacy matter, email me at ${EMAIL}.`],
        },
        {
          title: "What data I collect",
          body: ["I only handle the data you give me when you use the contact form:"],
          list: [
            "Your name and email address.",
            "If you write as a recruiter or company: company, role, work model, contract type and a link to the job posting.",
            "If you write about a project: project type, estimated budget and timeline.",
            "The message you write.",
          ],
        },
        {
          title: "What I use it for",
          body: ["I use that data only to read your message and reply to you. I do not use it for advertising, build profiles, sell it or share it with third parties. The legal basis is your consent, which you give by submitting the form."],
        },
        {
          title: "How it is sent and where it stays",
          body: [
            "The site does not store messages in a database. When you submit the form, its content is forwarded as an email to my personal inbox through Resend (Resend, Inc.), an email delivery service with servers in the United States.",
            "Messages stay in my inbox for as long as they are useful to the conversation. You can ask me to delete them at any time.",
          ],
        },
        {
          title: "Analytics and local storage",
          body: [
            "I use Vercel Web Analytics to know how many visits the site gets and which pages are viewed. It is anonymous: it uses no cookies, does not identify people and only provides aggregate data (page, referrer, country and device type).",
            "The site stores in your browser's local storage (localStorage) whether you prefer the light or dark theme. That value never leaves your device and you can delete it by clearing the site's data.",
          ],
        },
        {
          title: "Hosting",
          body: ["The site is hosted on Vercel (Vercel Inc., United States). Like any web server, Vercel processes technical data from each visit, such as the IP address, to deliver pages and protect the service."],
        },
        {
          title: "International transfer",
          body: ["Resend and Vercel operate from the United States, so the data described here may be processed outside Chile. Both publish their security and privacy policies, and I only use them for what this page describes."],
        },
        {
          title: "Your rights",
          body: [`At any time you can ask me, by writing to ${EMAIL}, for:`],
          list: [
            "Access: to know what data of yours I hold.",
            "Rectification: to correct inaccurate data.",
            "Erasure: to delete your data.",
            "Objection: to stop using it.",
            "Portability: to receive your data in a commonly used format.",
          ],
        },
        {
          title: "Security",
          body: ["Traffic to the site is encrypted over HTTPS, and the form validates and limits what it accepts and discards automated bot submissions."],
        },
        {
          title: "Minors",
          body: ["The site is aimed at professionals and companies. I do not knowingly collect data from children under 14."],
        },
        {
          title: "Changes",
          body: ["If what the site collects changes, I will update this policy and its date. The current version is always the one published here."],
        },
      ],
    },
  },
};

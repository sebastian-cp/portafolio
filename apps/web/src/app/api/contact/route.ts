import { NextResponse } from "next/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Campos aceptados y su largo máximo. Lo que no esté aquí se descarta. */
const FIELDS = {
  kind: 20,
  name: 100,
  email: 200,
  company: 120,
  role: 120,
  modality: 40,
  engagement: 40,
  link: 300,
  project: 60,
  budget: 60,
  timeline: 60,
  message: 5000,
} as const;
type Field = keyof typeof FIELDS;

/** Etiquetas del correo que recibe Sebastián (siempre en español). */
const LABELS: Partial<Record<Field, string>> = {
  company: "Empresa",
  role: "Cargo",
  modality: "Modalidad",
  engagement: "Tipo de contrato",
  link: "Oferta",
  project: "Tipo de proyecto",
  budget: "Presupuesto",
  timeline: "Plazo",
};

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Recibe el formulario de Contacto y lo reenvía al correo personal vía Resend. */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  // Campo trampa: invisible para personas, los bots lo rellenan. Se responde ok para no darles pistas.
  if (body?.website) return NextResponse.json({ ok: true });

  const data = {} as Record<Field, string>;
  for (const [key, max] of Object.entries(FIELDS) as [Field, number][]) {
    const value = String(body?.[key] ?? "").trim();
    if (value.length > max) return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    data[key] = value;
  }

  const recruiter = data.kind === "recruiter";
  if (!data.name || !EMAIL.test(data.email) || !data.message || (recruiter && !data.company)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO) {
    console.error("Contacto: faltan RESEND_API_KEY o CONTACT_TO");
    return NextResponse.json({ ok: false, error: "config" }, { status: 500 });
  }

  const shown: Field[] = recruiter
    ? ["company", "role", "modality", "engagement", "link"]
    : ["project", "budget", "timeline"];
  const details = shown.filter((k) => data[k]).map((k) => [LABELS[k]!, data[k]] as const);

  const subject = recruiter
    ? `Portafolio · ${data.company}${data.role ? ` busca ${data.role}` : ""} (${data.name})`
    : `Portafolio · ${data.project || "Mensaje"} de ${data.name}`;
  const who = recruiter ? "Reclutador / empresa" : "Persona / proyecto";

  const text = [
    `${who}: ${data.name} <${data.email}>`,
    ...details.map(([l, v]) => `${l}: ${v}`),
    "",
    data.message,
  ].join("\n");

  const rows = details
    .map(([l, v]) => `<tr><td style="padding:2px 12px 2px 0;color:#666">${l}</td><td>${escape(v)}</td></tr>`)
    .join("");
  const html =
    `<p style="color:#666;margin:0">${who}</p>` +
    `<p style="margin:4px 0 12px"><strong>${escape(data.name)}</strong> &lt;${escape(data.email)}&gt;</p>` +
    (rows ? `<table style="border-collapse:collapse;margin-bottom:12px">${rows}</table>` : "") +
    `<p style="white-space:pre-wrap">${escape(data.message)}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: CONTACT_FROM || "Portafolio <onboarding@resend.dev>",
      to: [CONTACT_TO],
      reply_to: data.email,
      subject,
      text,
      html,
    }),
  });

  if (!res.ok) {
    console.error("Contacto: Resend respondió", res.status, await res.text());
    return NextResponse.json({ ok: false, error: "send" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

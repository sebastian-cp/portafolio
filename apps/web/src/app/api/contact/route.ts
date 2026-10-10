import { NextResponse } from "next/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 100, email: 200, message: 5000 };

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Recibe el formulario de Contacto y lo reenvía al correo personal vía Resend. */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const message = String(body?.message ?? "").trim();

  // Campo trampa: invisible para personas, los bots lo rellenan. Se responde ok para no darles pistas.
  if (body?.company) return NextResponse.json({ ok: true });

  if (!name || !EMAIL.test(email) || !message || name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO) {
    console.error("Contacto: faltan RESEND_API_KEY o CONTACT_TO");
    return NextResponse.json({ ok: false, error: "config" }, { status: 500 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: CONTACT_FROM || "Portafolio <onboarding@resend.dev>",
      to: [CONTACT_TO],
      reply_to: email,
      subject: `Portafolio · mensaje de ${name}`,
      text: `${name} <${email}>\n\n${message}`,
      html: `<p><strong>${escape(name)}</strong> &lt;${escape(email)}&gt;</p><p style="white-space:pre-wrap">${escape(message)}</p>`,
    }),
  });

  if (!res.ok) {
    console.error("Contacto: Resend respondió", res.status, await res.text());
    return NextResponse.json({ ok: false, error: "send" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

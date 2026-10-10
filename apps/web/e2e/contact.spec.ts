import { expect, test, type Page } from "@playwright/test";

/**
 * Formulario de Contacto con datos realistas. /api/contact se intercepta: el test
 * revisa exactamente lo que el formulario enviaría a Resend, sin mandar correos reales.
 */
async function openForm(page: Page) {
  const sent: Record<string, string>[] = [];
  await page.route("**/api/contact", async (route) => {
    sent.push(route.request().postDataJSON());
    await route.fulfill({ json: { ok: true } });
  });
  await page.goto("/es#contacto");
  await page.locator("#contacto").getByRole("button", { name: "Escríbeme" }).click();
  const dialog = page.getByRole("dialog", { name: "Escríbeme" });
  await expect(dialog).toBeVisible();
  return { dialog, sent };
}

test.describe("Contacto", () => {
  test("una reclutadora envía una oferta", async ({ page }) => {
    const { dialog, sent } = await openForm(page);

    await expect(dialog.getByRole("radio", { name: "Reclutador o empresa" })).toHaveAttribute("aria-checked", "true");
    await dialog.getByLabel("Nombre").fill("Camila Rojas Fuentes");
    await dialog.getByLabel("Correo de trabajo").fill("camila.rojas@talentolatam.cl");
    await dialog.getByLabel("Empresa").fill("Talento Latam");
    await dialog.getByLabel("Cargo").fill("Senior Frontend Engineer (Angular)");
    await dialog.getByText("Remoto", { exact: true }).click();
    await dialog.getByText("Indefinido", { exact: true }).click();
    await dialog.getByLabel("Enlace a la oferta (opcional)").fill("https://talentolatam.cl/empleos/senior-frontend-angular-2026");
    await dialog.getByLabel("Mensaje").fill(
      "Hola Sebastián, vi tu portafolio y tu experiencia con Angular en el BID. Estamos buscando un Senior Frontend " +
        "para un cliente fintech en Santiago, 100% remoto, stack Angular 19 + Nx + Jest. ¿Te interesa una llamada esta semana?",
    );

    await expect(dialog.getByRole("radio", { name: "Remoto" })).toBeChecked();
    await dialog.getByRole("button", { name: "Enviar" }).click();

    await expect(dialog.getByRole("status")).toHaveText(/te respondo a tu correo de trabajo/);
    expect(sent).toHaveLength(1);
    expect(sent[0]).toMatchObject({
      kind: "recruiter",
      name: "Camila Rojas Fuentes",
      email: "camila.rojas@talentolatam.cl",
      company: "Talento Latam",
      role: "Senior Frontend Engineer (Angular)",
      modality: "Remoto",
      engagement: "Indefinido",
      link: "https://talentolatam.cl/empleos/senior-frontend-angular-2026",
      website: "",
    });
    expect(sent[0].message).toContain("Angular 19");
  });

  test("una persona pide un chatbot para su negocio", async ({ page }) => {
    const { dialog, sent } = await openForm(page);

    await dialog.getByRole("radio", { name: "Proyecto o consulta" }).click();
    await expect(dialog.getByLabel("Empresa")).toHaveCount(0);

    await dialog.getByLabel("Nombre").fill("Andrés Muñoz Vidal");
    await dialog.getByLabel("Tu correo").fill("andres.munoz.vidal@gmail.com");
    await dialog.getByText("IA aplicada / chatbot", { exact: true }).click();
    await dialog.getByLabel("Presupuesto").selectOption("USD 1.000 – 5.000");
    await dialog.getByLabel("Plazo").selectOption("1 a 3 meses");
    await dialog.getByLabel("Mensaje").fill(
      "Tengo una clínica dental en Concepción y recibimos muchas consultas por WhatsApp para agendar horas. " +
        "Me gustaría un asistente que responda preguntas frecuentes y derive a recepción cuando haga falta.",
    );
    await dialog.getByRole("button", { name: "Enviar" }).click();

    await expect(dialog.getByRole("status")).toHaveText(/te respondo a tu correo\./);
    expect(sent).toHaveLength(1);
    expect(sent[0]).toMatchObject({
      kind: "person",
      name: "Andrés Muñoz Vidal",
      email: "andres.munoz.vidal@gmail.com",
      project: "IA aplicada / chatbot",
      budget: "USD 1.000 – 5.000",
      timeline: "1 a 3 meses",
    });
    expect(sent[0]).not.toHaveProperty("company");
  });

  test("si el envío falla, ofrece el correo directo", async ({ page }) => {
    await page.route("**/api/contact", (route) => route.fulfill({ status: 502, json: { ok: false } }));
    await page.goto("/es#contacto");
    await page.locator("#contacto").getByRole("button", { name: "Escríbeme" }).click();
    const dialog = page.getByRole("dialog", { name: "Escríbeme" });
    await dialog.getByLabel("Nombre").fill("Camila Rojas Fuentes");
    await dialog.getByLabel("Correo de trabajo").fill("camila.rojas@talentolatam.cl");
    await dialog.getByLabel("Empresa").fill("Talento Latam");
    await dialog.getByLabel("Mensaje").fill("Hola, ¿conversamos?");
    await dialog.getByRole("button", { name: "Enviar" }).click();
    await expect(dialog.getByRole("alert")).toContainText("scofreparr@gmail.com");
  });

  test("la API rechaza datos incompletos sin llegar a Resend", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: { kind: "recruiter", name: "Camila", email: "camila.rojas@talentolatam.cl", message: "Hola" },
    });
    expect(res.status()).toBe(400);
  });
});

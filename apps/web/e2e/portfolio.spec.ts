import { expect, test } from "@playwright/test";

test.describe("español", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/es");
  });

  test("muestra el nombre y las secciones principales", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Sebastián Andrés Cofré Parra");
    for (const name of ["Dónde se usa lo que hago", "Experiencia", "Demos interactivas", "Proyectos", "Contacto"]) {
      await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
    }
  });

  test("las pestañas de experiencia funcionan con teclado", async ({ page }) => {
    await page.getByRole("tab").first().focus();
    await page.keyboard.press("ArrowDown");
    await expect(page.getByRole("tab", { name: /LUXXOR/ })).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("tabpanel")).toContainText("ChromaDB");
  });

  test("el demo RAG recupera el fragmento correcto", async ({ page }) => {
    await page.getByLabel("Pregunta sobre mi experiencia").fill("¿Qué experiencia tienes con Playwright?");
    await page.getByRole("button", { name: "Preguntar" }).click();
    await expect(page.getByRole("status").filter({ hasText: "Playwright" })).toBeAttached();
    await expect(page.getByRole("listitem").filter({ hasText: "Testing" }).first()).toBeVisible();
  });

  test("el demo RAG admite que no sabe", async ({ page }) => {
    await page.getByLabel("Pregunta sobre mi experiencia").fill("zzzz qqqq");
    await page.getByRole("button", { name: "Preguntar" }).click();
    await expect(page.getByText("Ninguno superó el umbral")).toBeVisible();
  });

  test("Core Web Vitals: mide y reacciona al laboratorio", async ({ page }) => {
    const cls = page.locator('[data-metric="cls"]');
    await page.getByRole("button", { name: /Insertar banner tardío/ }).scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /Insertar banner tardío/ }).click();
    await expect(page.getByText("Banner insertado tarde")).toBeVisible();
    await expect.poll(async () => parseFloat((await cls.locator("p").nth(1).textContent()) ?? "0"), { timeout: 8000 }).toBeGreaterThan(0);

    await page.getByRole("button", { name: /Interacción lenta/ }).click();
    await expect(page.locator('[data-metric="inp"]')).toContainText(/\d+ ms/, { timeout: 8000 });
    await expect(page.locator('[data-metric="ttfb"]')).toContainText(/ms|s/);
  });

  test("accesibilidad: el árbol cambia entre sin ARIA y con ARIA", async ({ page }) => {
    const tree = page.getByTestId("a11y-tree");
    const speech = page.getByTestId("a11y-speech");
    await expect(speech).toContainText("Nada. El lector se salta este elemento.");
    await expect(tree).toContainText("generic");
    await expect(tree).toContainText("sin rol");
    await page.getByRole("button", { name: "Con ARIA" }).click();
    await expect(speech).toContainText("Añadir a favoritos, botón, no presionado");
    await expect(tree).toContainText(/button\s*"Añadir a favoritos"/);
    await page.getByTestId("a11y-demo").getByRole("button").click();
    await expect(speech).toContainText("Añadir a favoritos, botón, presionado");
    await expect(tree).toContainText("pressed=true");

    await page.getByRole("button", { name: "Campo de formulario" }).click();
    await expect(tree).toContainText(/textbox\s*"Correo electrónico"/);
    // Regresión: escribir no debe provocar un bucle de renders
    await page.getByLabel("Correo electrónico").fill("hola");
    await page.getByLabel("Correo electrónico").blur();
    await expect(tree).toContainText("invalid=true");
    await expect(page.getByTestId("a11y-demo").getByRole("alert")).toContainText("correo válido");
    await page.getByRole("button", { name: "Sin ARIA" }).click();
    await expect(tree).toContainText("sin nombre accesible");
  });

  test("el filtro de proyectos usa aria-pressed", async ({ page }) => {
    await page.getByRole("button", { name: "Angular", exact: true }).click();
    await expect(page.getByRole("button", { name: "Angular", exact: true })).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByRole("article")).toHaveCount(3);
  });

  test("la paleta Ctrl+K navega y se cierra", async ({ page }) => {
    await page.keyboard.press("Control+k");
    const dialog = page.getByRole("dialog", { name: "Paleta de comandos" });
    await expect(dialog).toBeVisible();
    await page.getByRole("combobox").fill("contacto");
    await page.keyboard.press("Enter");
    await expect(dialog).toBeHidden();
    await expect(page).toHaveURL(/#contacto$/);
  });

  test("muestra los logos de las organizaciones y la bandera", async ({ page }) => {
    for (const alt of ["Clínica Alemana de Santiago", "Banco Interamericano de Desarrollo", "LUXXOR"]) {
      const logo = page.getByRole("img", { name: alt });
      await expect(logo).toBeVisible();
      // next/image falla en silencio si la ruta no existe: comprobamos que cargó
      await expect.poll(() => logo.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
    }
    await expect(page.getByRole("img", { name: "Chile" })).toBeVisible();
  });

  test("el nav marca la sección visible", async ({ page }) => {
    const nav = page.getByRole("navigation", { name: "Principal" });
    await page.locator("#proyectos").scrollIntoViewIfNeeded();
    await expect(nav.getByRole("link", { name: "Proyectos" })).toHaveAttribute("aria-current", "true", { timeout: 8000 });
    await expect(nav.getByRole("link", { name: "Contacto" })).not.toHaveAttribute("aria-current", "true");
  });

  test("el tema persiste tras recargar", async ({ page }) => {
    const before = await page.locator("html").getAttribute("data-theme");
    await page.getByRole("button", { name: /tema claro y oscuro/ }).click();
    const after = await page.locator("html").getAttribute("data-theme");
    expect(after).not.toBe(before);
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", after!);
  });

  test("cambia a inglés con el selector de idioma", async ({ page }) => {
    await page.getByRole("link", { name: "Switch to English" }).click();
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });
});

test.describe("english", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en");
  });

  test("renders translated sections", async ({ page }) => {
    for (const name of ["Where my work runs", "Experience", "Interactive demos", "Projects", "Contact"]) {
      await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
    }
  });

  test("RAG demo answers in English", async ({ page }) => {
    await page.getByLabel("Question about my experience").fill("What experience do you have with Playwright?");
    await page.getByRole("button", { name: "Ask", exact: true }).click();
    await expect(page.getByRole("status").filter({ hasText: "Playwright" })).toBeAttached();
  });
});

test("no publica el teléfono", async ({ page }) => {
  for (const path of ["/es", "/en"]) {
    await page.goto(path);
    await expect(page.locator("body")).not.toContainText("9881");
    await expect(page.locator("body")).not.toContainText("Santiago,");
    await expect(page.locator("body")).not.toContainText(/Híbrido|Hybrid/);
    await expect(page.locator("body")).not.toContainText(/Disponible para proyectos|Available for projects/);
  }
});

test("en móvil el disparador de la paleta conserva su nombre accesible", async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto("/es");
  await expect(page.getByRole("button", { name: "Buscar" })).toBeVisible();
  await ctx.close();
});

test("la raíz redirige según Accept-Language", async ({ browser }) => {
  const ctx = await browser.newContext({ locale: "en-US", extraHTTPHeaders: { "Accept-Language": "en-US,en;q=0.9" } });
  const page = await ctx.newPage();
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
  await ctx.close();
});

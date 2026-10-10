import { expect, test } from "@playwright/test";

test.describe("español", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/es");
  });

  test("muestra el nombre y las secciones principales", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Cofré");
    for (const name of ["Sobre mí", "Experiencia", "Demos interactivas", "Proyectos", "Contacto"]) {
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
    await expect(tree).toContainText("generic");
    await expect(tree).toContainText("sin rol");
    await page.getByRole("button", { name: "Con ARIA" }).click();
    await expect(tree).toContainText(/button\s*"Añadir a favoritos"/);
    await page.getByTestId("a11y-demo").getByRole("button").click();
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
    for (const name of ["About me", "Experience", "Interactive demos", "Projects", "Contact"]) {
      await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
    }
  });

  test("RAG demo answers in English", async ({ page }) => {
    await page.getByLabel("Question about my experience").fill("What experience do you have with Playwright?");
    await page.getByRole("button", { name: "Ask", exact: true }).click();
    await expect(page.getByRole("status").filter({ hasText: "Playwright" })).toBeAttached();
  });
});

test("la raíz redirige según Accept-Language", async ({ browser }) => {
  const ctx = await browser.newContext({ locale: "en-US", extraHTTPHeaders: { "Accept-Language": "en-US,en;q=0.9" } });
  const page = await ctx.newPage();
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
  await ctx.close();
});

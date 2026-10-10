import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("muestra el nombre y las secciones principales", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Cofré");
  for (const name of ["Sobre mí", "Experiencia", "Pregúntale a mi CV", "Proyectos", "Contacto"]) {
    await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
  }
});

test("las pestañas de experiencia funcionan con teclado", async ({ page }) => {
  const tabs = page.getByRole("tab");
  await tabs.first().focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("tab", { name: /LUXXOR/ })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("ChromaDB");
});

test("el demo RAG recupera el fragmento correcto", async ({ page }) => {
  await page.getByLabel("Pregunta sobre mi experiencia").fill("¿Qué experiencia tienes con Playwright?");
  await page.getByRole("button", { name: "Preguntar" }).click();
  await expect(page.getByRole("listitem").filter({ hasText: "Testing" }).first()).toBeVisible();
  await expect(page.getByRole("status").filter({ hasText: "Playwright" })).toBeAttached();
});

test("el demo RAG admite que no sabe", async ({ page }) => {
  await page.getByLabel("Pregunta sobre mi experiencia").fill("zzzz qqqq");
  await page.getByRole("button", { name: "Preguntar" }).click();
  await expect(page.getByText("Ninguno superó el umbral")).toBeVisible();
});

test("el filtro de proyectos usa aria-pressed", async ({ page }) => {
  await page.getByRole("button", { name: "Angular", exact: true }).click();
  await expect(page.getByRole("button", { name: "Angular", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("article")).toHaveCount(1);
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

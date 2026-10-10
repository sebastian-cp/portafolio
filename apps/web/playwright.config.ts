import { defineConfig } from "@playwright/test";

/** BASE_URL apunta los tests a un servidor ya levantado (p. ej. `npm run dev` en :3000) en vez de hacer build. */
const external = process.env.BASE_URL;

export default defineConfig({
  testDir: "./e2e",
  webServer: external
    ? undefined
    : {
        command: "npm run build && npm run start -- -p 3100",
        url: "http://localhost:3100",
        reuseExistingServer: true,
        timeout: 180_000,
      },
  use: {
    baseURL: external ?? "http://localhost:3100",
    launchOptions: process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
  },
});

import { defineConfig } from "@playwright/test";

// Test E2E a livello API (fixture `request`): nessun browser necessario,
// ideale per una CI veloce e stabile in aula. Il webServer avvia l'API da solo.
export default defineConfig({
  testDir: "./e2e",
  reporter: "list",
  use: { baseURL: "http://localhost:3000" },
  projects: [{ name: "api" }],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000/health",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});

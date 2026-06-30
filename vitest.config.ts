import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    include: ["src/**/*.{test,spec}.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.test.ts", "src/server.ts", "src/data/**"],
      // Quality gate del Lab 1: la CI fallisce se la coverage scende sotto l'80%.
      thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
    },
  },
});

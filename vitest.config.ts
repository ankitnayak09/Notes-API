import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true, // allows using describe/it/expect without importing
    coverage: {
      reporter: ["text", "html"],
      exclude: ["**/*.d.ts", "src/server.ts"],
    },
  },
});

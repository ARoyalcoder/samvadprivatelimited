import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["tests/**/*.{test,spec}.ts"],
    exclude: ["tests/e2e/**", "node_modules/**"],
  },
  resolve: {
    alias: {
      "@samvad/validation": path.resolve(__dirname, "./packages/validation/src"),
      "@samvad/types": path.resolve(__dirname, "./packages/types/src"),
      "@samvad/redis": path.resolve(__dirname, "./packages/redis/src"),
      "@samvad/database": path.resolve(__dirname, "./packages/database/src"),
      "@samvad/logger": path.resolve(__dirname, "./packages/logger/src"),
      "@samvad/telemetry": path.resolve(__dirname, "./packages/telemetry/src"),
      "@samvad/auth": path.resolve(__dirname, "./packages/auth/src"),
      "@samvad/ui": path.resolve(__dirname, "./packages/ui/src"),
    },
  },
});

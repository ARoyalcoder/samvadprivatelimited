import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
  },
  resolve: {
    alias: {
      "@samvad/validation": path.resolve(__dirname, "./packages/validation/src"),
      "@samvad/types": path.resolve(__dirname, "./packages/types/src"),
      "@samvad/redis": path.resolve(__dirname, "./packages/redis/src"),
      "@samvad/database": path.resolve(__dirname, "./packages/database/src"),
    },
  },
});

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      include: ["src/"],
      exclude: ["node_modules/", "dist/", "coverage/"],
    },
    clearMocks: true,
  },
});

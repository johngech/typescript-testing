import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // JavaScript recommended config
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.node,
    },
  },
  // TypeScript recommended config
  ...tseslint.configs.recommended,
  // TypeScript strict config
  ...tseslint.configs.strict,
  // TypeScript parser configuration for .ts files
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // Ignore patterns
  {
    ignores: ["node_modules/", "dist/", "coverage/", "bun.lock"],
  },
]);

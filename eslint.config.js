import tsEslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import base from "./config/eslint/base.ts";
import globals from "./config/eslint/globals.ts";
import prettier from "./config/eslint/prettier.ts";
import json from "./config/eslint/json.ts";
import markdown from "./config/eslint/markdown.ts";
import customRules from "./config/eslint/custom-rules.ts";
import ignores from "./config/eslint/ignores.ts";
import security from "./config/eslint/security.ts";

export default defineConfig([
  base,
  globals,
  tsEslint.configs.recommended,
  prettier,
  ...json,
  markdown,
  security,
  customRules,
  ignores
]);

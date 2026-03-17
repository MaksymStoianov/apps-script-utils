import security from "eslint-plugin-security";

export default {
  files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  ignores: [
    "src/test/**/*.{js,mjs,cjs,ts,jsx,tsx}",
    "**/*.test.{js,mjs,cjs,ts,jsx,tsx}",
    "**/*.spec.{js,mjs,cjs,ts,jsx,tsx}"
  ],
  plugins: {
    security
  },
  rules: {
    ...security.configs.recommended.rules
  }
};

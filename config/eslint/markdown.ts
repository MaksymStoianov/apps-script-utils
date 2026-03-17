import markdown from "@eslint/markdown";

export default {
  files: ["**/*.md"],
  plugins: { markdown },
  language: "markdown/gfm",
  extends: ["markdown/recommended"],
  rules: {
    "markdown/no-missing-link-fragments": "warn"
  }
};

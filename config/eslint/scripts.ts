/**
 * Overrides for the maintenance scripts under `scripts/`.
 *
 * These are build and integration-test files rather than library sources:
 * they are plain JavaScript, they run on a console, and the Apps Script ones
 * reach for the library through the shared global scope.
 */
export default {
  files: ["scripts/**/*.{js,mjs,cjs}"],
  rules: {
    // A build script reports its progress; that is its interface.
    "no-console": "off",

    // Return types belong to the TypeScript sources.
    "@typescript-eslint/explicit-function-return-type": "off",

    // A bundler exists to read and write computed paths.
    "security/detect-non-literal-fs-filename": "off",

    // The lookups here are into objects these files declare themselves.
    "security/detect-object-injection": "off"
  }
};

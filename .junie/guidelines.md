### Development Guidelines for `apps-script-utils`

#### 1. Build and Configuration

This project is a TypeScript-based utility library for Google Apps Script.

- **Prerequisites**: Node.js and npm installed.
- **Installation**: Run `npm install` to install all dependencies.
- **Building**: Use `npm run build` to compile the TypeScript source into the `dist` directory. This script performs
  cleanup of the `dist` folder before running `tsc`.
- **Linting and Formatting**:
  - `npm run lint`: Runs ESLint with auto-fix enabled.
  - `npm run format`: Runs Prettier to format all files in the project.

#### 2. Testing

The project uses [Vitest](https://vitest.dev/) for unit testing.

- **Running Tests**:
  - `npm test`: Runs all tests once.
  - `npm run dev`: Starts Vitest in watch mode for interactive development.
- **Adding New Tests**:
  - Tests should be placed in the `test/` directory, mirroring the structure of the `src/` directory.
  - Test files must follow the naming convention `*.test.ts`.
  - Use the `@/` alias to import from the `src/` directory (configured in `vitest.config.ts`).
- **Example Test**:

  ```typescript
  import { describe, expect, it } from "vitest";
  import { isString } from "@/lang/base/isString";

  describe("isString", () => {
    it("should return true for strings", () => {
      expect(isString("hello")).toBe(true);
    });

    it("should return false for non-strings", () => {
      expect(isString(123)).toBe(false);
    });
  });
  ```

#### 3. Code Style and Development

- **Consistency**: Follow the existing code style. The project uses Prettier and ESLint to enforce formatting and best
  practices.
- **CHANGELOG**: Do not modify `CHANGELOG.md` manually. It is updated automatically during the release process.
- **Documentation**: Use JSDoc/KDoc comments for all exported functions. Include `@param`, `@returns`, `@since`, and
  `@version` tags where applicable.
- **Modules**: The project is organized into logical modules:
  - `appsscript/`: Utilities specifically for Google Apps Script environments (Sheets, Drive, etc.).
  - `lang/`: General JavaScript/TypeScript language utilities (type checks, array/object helpers).
  - `net/`: Network and path-related utilities.
  - `exception/`, `html/`, `json/`, `time/`: Other specialized utility groups.
- **Types**: Use strict TypeScript typing. Avoid `any` where possible. Prefer interface or type definitions for complex
  objects.
- **Git Hooks**: The project uses `husky` for pre-commit and pre-push hooks to ensure code quality before pushing.

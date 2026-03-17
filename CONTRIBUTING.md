# Contributing to apps-script-utils

Great that you are here and you want to contribute to **apps-script-utils**!

## Contents

<!-- TOC -->

- [Contributing to apps-script-utils](#contributing-to-apps-script-utils)
  - [Contents](#contents)
  - [Code of Conduct](#code-of-conduct)
  - [Directory Structure](#directory-structure)
  - [Development Setup](#development-setup)
    - [Requirements](#requirements)
      - [Node.js](#nodejs)
      - [npm](#npm)
    - [Actual Setup](#actual-setup)
  - [Development Cycle](#development-cycle)
    - [Basic Development Workflow](#basic-development-workflow)
    - [Community PR Guidelines](#community-pr-guidelines)
      - [1. General Requirements](#1-general-requirements)
      - [2. PR Specific Requirements](#2-pr-specific-requirements)
    - [Test Suite](#test-suite)
  - [Roadmap](#roadmap)
  - [License](#license)

<!-- TOC -->

## Code of Conduct

This project and everyone participating in it are governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By
participating, you are expected to uphold this code. Please report unacceptable behavior
to [stoianov.maksym@gmail.com](mailto:stoianov.maksym@gmail.com).

## Directory Structure

The project is organized as follows:

- [**`config/`**](config/) — Configuration files for build tools and environment.
- [**`docs/`**](docs/) — Documentation and assets.
- [**`scripts/`**](scripts/) — Utility scripts for maintenance and development.
- [**`src/`**](src/) — Source code of the library. Organized into logical modules like `appsscript/`, `lang/`, `net/`, etc.
- [**`test/`**](test/) — Test suites mirroring the `src` structure.

## Development Setup

### Requirements

#### Node.js

[Node.js](https://nodejs.org/en/) (latest LTS recommended) is required for development.

#### npm

[npm](https://www.npmjs.com/) is used for dependency management and scripts.

### Actual Setup

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your_username>/apps-script-utils.git
   cd apps-script-utils
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/MaksymStoianov/apps-script-utils.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Build the project**:
   ```bash
   npm run build
   ```

## Development Cycle

### Basic Development Workflow

1. Hack, hack, hack.
2. Ensure code quality:
   ```bash
   npm run lint:fix
   npm run format:fix
   ```
3. Run [tests](#test-suite):
   ```bash
   npm run test
   ```
4. Commit your changes and create a Pull Request.

### Community PR Guidelines

#### 1. General Requirements

- **Follow the Style Guide**: Adhere to the project's coding standards (TypeScript, Prettier, ESLint).
- **TypeScript Compliance**: Use strict TypeScript typing. Avoid `any` where possible.
- **Documentation**: Use JSDoc/KDoc comments for all exported functions. Include `@param`, `@returns`, `@since`, and
  `@version` tags where applicable.
- **Avoid Repetitive Code**: Reuse existing utilities and patterns.
- **Testing**: PRs **must include tests**. Use the `@/` alias to import from the `src/` directory.
- **Typos**: Use a spell-checker to avoid typos in code and documentation.

#### 2. PR Specific Requirements

- **Small PRs**: Focus on a single feature or fix per PR.
- **Naming**: Use clear and descriptive PR titles.
- **CHANGELOG**: Do not modify `CHANGELOG.md` manually. It is updated automatically during the release process.

### Test Suite

The project uses [Vitest](https://vitest.dev/) for testing.

- **Run all tests**:
  ```bash
  npm run test
  ```
- **Watch mode**:
  ```bash
  npm run dev
  ```

## Roadmap

The current vision for the project's development can be found in the [Roadmap](ROADMAP.md). Please note that the
roadmap is for informational purposes and is subject to change.

## License

By contributing to **apps-script-utils**, you agree that your contributions will be licensed under
the [Apache-2.0 License](LICENSE).

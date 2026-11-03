# Contributing to @bootgs/utils

Great that you are here and you want to contribute to **@bootgs/utils**!

## Contents

<!-- TOC -->

- [Contributing to @bootgs/utils](#contributing-to-bootgsutils)
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
    - [Commit Message Guidelines](#commit-message-guidelines)
    - [Developer Certificate of Origin](#developer-certificate-of-origin)
    - [Community PR Guidelines](#community-pr-guidelines)
      - [1. General Requirements](#1-general-requirements)
      - [2. PR Specific Requirements](#2-pr-specific-requirements)
    - [Test Suite](#test-suite)
    - [README Translations](#readme-translations)
  - [License](#license)

<!-- TOC -->

## Code of Conduct

This project and everyone participating in it are governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By
participating, you are expected to uphold this code. Please report unacceptable behavior
to [stoianov.maksym@gmail.com](mailto:stoianov.maksym@gmail.com).

## Directory Structure

The project is organized as follows:

- [**`config/`**](config/) — Configuration files for build tools and environment.
- [**`docs/`**](docs/) — Documentation: shared assets, and the Writerside source of the documentation site under [`docs/writerside/`](docs/writerside/).
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
   cd @bootgs/utils
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/bootgs/utils.git
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
4. Commit your changes following the [Commit Message Guidelines](#commit-message-guidelines), sign them off
   ([DCO](#developer-certificate-of-origin)) with `git commit -s` and create a Pull Request.

### Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. Structured commit messages allow automated tools like [Release Please](https://github.com/googleapis/release-please-action) to generate changelogs and determine semantic version bumps automatically.

#### Commit Format

```text
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

#### Commit Types

| Type       | Description                                                  | Release Impact  |
| :--------- | :----------------------------------------------------------- | :-------------- |
| `feat`     | A new feature                                                | Minor (`0.x.0`) |
| `fix`      | A bug fix                                                    | Patch (`0.0.x`) |
| `docs`     | Documentation changes only                                   | None            |
| `style`    | Formatting, missing semi-colons, whitespace (no code change) | None            |
| `refactor` | Code restructuring without adding features or fixing bugs    | None            |
| `perf`     | Performance improvements                                     | Patch / None    |
| `test`     | Adding or updating tests                                     | None            |
| `build`    | Changes to build configuration or dependencies               | None            |
| `ci`       | Changes to CI workflows and scripts                          | None            |
| `chore`    | Routine tasks, maintenance, or tooling changes               | None            |

#### Scopes

The scope specifies the affected module or package (e.g., `core`, `decorators`, `router`, `service`, `domain`, `pipes`, `validation`, `config`). Scope is optional but encouraged for clarity.

#### Breaking Changes

Breaking changes should be indicated by an exclamation mark `!` before the colon in the header or by a `BREAKING CHANGE:` footer. This triggers a Major version bump (`x.0.0`).

```text
feat(core)!: drop support for legacy handler format
```

#### Rules & Best Practices

- **Imperative mood**: Use the imperative, present tense ("add", "fix", "change", not "added", "fixes", "changing").
- **Case**: Start the description in lowercase.
- **Punctuation**: Do not end the description with a period (`.`).
- **Issue references**: Reference relevant issue numbers when applicable (e.g., `(fixes #100)`).

#### Examples

- `feat(decorators): add @SheetController and @DocController`
- `fix(router): resolve route inheritance issues in controllers (fixes #100)`
- `docs: update README with new response features`
- `refactor(core): cleanup enums, types and repository helpers`
- `test: add unit tests for ResponseBuilder`
- `chore: update dependencies`

### Developer Certificate of Origin

All contributions are accepted under the [Developer Certificate of Origin 1.1](https://developercertificate.org/)
(DCO). By signing off a commit you certify that you wrote the change or otherwise have the right to submit it under
the project's licence:

```text
Developer Certificate of Origin
Version 1.1

Copyright (C) 2004, 2006 The Linux Foundation and its contributors.

Everyone is permitted to copy and distribute verbatim copies of this
license document, but changing it is not allowed.


Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me and I
    have the right to submit it under the open source license
    indicated in the file; or

(b) The contribution is based upon previous work that, to the best
    of my knowledge, is covered under an appropriate open source
    license and I have the right under that license to submit that
    work with modifications, whether created in whole or in part
    by me, under the same open source license (unless I am
    permitted to submit under a different license), as indicated
    in the file; or

(c) The contribution was provided directly to me by some other
    person who certified (a), (b) or (c) and I have not modified
    it.

(d) I understand and agree that this project and the contribution
    are public and that a record of the contribution (including all
    personal information I submit with it, including my sign-off) is
    maintained indefinitely and may be redistributed consistent with
    this project or the open source license(s) involved.
```

Every commit in a pull request must carry a `Signed-off-by:` trailer with the name and email of the commit author.
Git adds it for you with `-s`:

```bash
git commit -s -m "fix(sheet): handle an empty range"
```

This produces:

```text
Signed-off-by: Your Name <your.email@example.com>
```

Use your real name (no anonymous contributions) and the same email as the commit author. A
[DCO check](.github/workflows/dco.yml) runs on every pull request. To sign off commits you already made:

```bash
git rebase --signoff origin/develop
git push --force-with-lease
```

Commits written with the help of AI assistants are signed off by the human author, who is responsible for them;
see [Tools and AI Assistance](docs/tools-and-ai.md).

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

### README Translations

`README.md` is the authoritative version. The `README.<code>.md` files next to it are AI-assisted translations of it
into Ukrainian (`uk`), Russian (`ru`), German (`de`), French (`fr`), Spanish (`es`), Portuguese (`pt`), Italian (`it`),
Dutch (`nl`), Polish (`pl`), Czech (`cs`), Turkish (`tr`), Arabic (`ar`), Indonesian (`id`), Vietnamese (`vi`),
Japanese (`ja`), Korean (`ko`), Simplified Chinese (`zh`) and Traditional Chinese (`zh-TW`). Corrections from native
speakers are welcome as ordinary pull requests.

- **Keep the shape**: every README carries the same language switcher under the banner, and every translation has
  the same `##`/`###` headings as `README.md`. Translate prose only; code blocks, function names, commands, package
  names, URLs and badges stay as they are. Ukrainian, Russian, German and French link to their own documentation
  under `/<code>/`; the other languages link to the English documentation.
- **Right-to-left languages**: the Arabic README wraps its prose in `<div dir="rtl" lang="ar">` … `</div>` blocks,
  with a blank line inside each wrapper so GitHub still renders the Markdown. Code blocks, badges, the scripts table
  and the switcher stay outside the wrappers, left to right; headings stay ordinary `##`/`###` lines.
- **Sync translations with the source**: when a change to `README.md` is carried into the translations, update the
  version in the note under each switcher to the current `version` in `package.json`.
- **The note goes stale on release, by design**: release-please bumps `package.json` but does not touch the
  translations, so after a release the note keeps naming the version the translations were last synced with. It is
  updated only when the translations are synced, not on every release.
- **Check by hand**: run the check before committing a translation sync. It is not part of CI or the Git hooks.
  ```bash
  npm run docs:check-i18n
  ```
  It fails when a translation is missing, lacks the switcher, has a different number of `##`/`###` headings than
  `README.md`, or its note names a version other than the one in `package.json`. It does not compare wording.

## License

By contributing to **@bootgs/utils**, you agree that your contributions will be licensed under
the [Apache-2.0 License](LICENSE).

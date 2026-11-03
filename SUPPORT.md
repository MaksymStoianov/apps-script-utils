# Support

## Getting Help

- **Questions and ideas:** [GitHub Discussions](https://github.com/bootgs/utils/discussions).
- **Bugs and feature requests:** [GitHub Issues](https://github.com/bootgs/utils/issues) — please use the issue
  templates and include the `@bootgs/utils` version and a minimal reproduction.
- **Security vulnerabilities:** never in public — follow [SECURITY.md](SECURITY.md).

Community support is provided on a best-effort basis by the maintainers and contributors.

## Support Policy

@bootgs/utils follows [Semantic Versioning](https://semver.org/).

| Release line                                 | What it receives                                            |
| :------------------------------------------- | :---------------------------------------------------------- |
| `3.x` — `@bootgs/utils` (once `3.0.0` ships) | Bug fixes, security fixes and new features                  |
| `2.x` — `apps-script-utils`                  | Security fixes only, for 3 months after `3.0.0` is released |
| Older releases                               | No fixes — please upgrade                                   |

There is no separate LTS line at the moment; the policy above applies to every major version: the previous major
receives security fixes for 3 months after the next major is released.

### Moving from `apps-script-utils` 2.x

Version 3 is published under a new name. If you use `apps-script-utils` 2.x, move to `@bootgs/utils` 3.x:

```bash
npm uninstall apps-script-utils
npm install @bootgs/utils
```

and change your imports from `"apps-script-utils"` to `"@bootgs/utils"`. The breaking changes of 3.0.0 are listed
in [CHANGELOG.md](CHANGELOG.md). The `apps-script-utils` package receives no new features.

### Deprecations and Breaking Changes

- A deprecation is announced in the changelog and in the API documentation (`@deprecated`) at least one minor
  release before the feature is removed.
- Deprecated features are removed only in a new major release.
- Breaking changes are listed in the release notes and `CHANGELOG.md` under **BREAKING CHANGES**.

### Runtime Requirements

- Google Apps Script V8 runtime.
- Node.js `>= 22.14.0` for development and building (see `engines` in `package.json`).

## Commercial Support

Consulting, custom development, priority fixes and support agreements are available from the maintainer:
[maksymstoianov.com](https://maksymstoianov.com).

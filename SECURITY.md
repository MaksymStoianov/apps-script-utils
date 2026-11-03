# Security Policy

This document explains which versions of **@bootgs/utils** receive security fixes and how to report a
vulnerability. We appreciate the work of security researchers who help keep the library and its users safe.

## Supported Versions

| Version | Package             | Supported                                                         |
| :------ | :------------------ | :---------------------------------------------------------------- |
| `3.x`   | `@bootgs/utils`     | :white_check_mark: once `3.0.0` is released                       |
| `2.x`   | `apps-script-utils` | :warning: security fixes only, until 3 months after `3.0.0` ships |
| `< 2.0` | `apps-script-utils` | :x:                                                               |

Version 3 is published under the new name `@bootgs/utils`; the `2.x` line was published as `apps-script-utils`.
The latest release receives all fixes. Please upgrade to the latest release to stay protected; see
[SUPPORT.md](SUPPORT.md) for the support policy.

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public issues, discussions or pull requests.**

1. **Preferred:** use GitHub private vulnerability reporting — open the repository's
   [**Security** tab → **Report a vulnerability**](https://github.com/bootgs/utils/security/advisories/new).
2. **Alternative:** email [security@maksymstoianov.com](mailto:security@maksymstoianov.com).

Please include:

- a short description and the type of issue (for example injection, prototype pollution, information disclosure);
- the affected versions;
- steps to reproduce or a proof of concept;
- the impact as you understand it, and any suggested fix.

## Response Timeline

| Step                                       | Target                       |
| :----------------------------------------- | :--------------------------- |
| Acknowledgement of the report              | within 5 business days       |
| Initial assessment (validity and severity) | within 14 days               |
| Fix released for critical or high severity | within 30 days of assessment |
| Fix for medium or low severity             | in a regular release         |

We keep you informed of progress and may ask for more details. Severity is rated with
[CVSS v3.1](https://www.first.org/cvss/v3.1/specification-document).

## Coordinated Disclosure

- We follow coordinated vulnerability disclosure: please keep the details private until a fix is released or
  90 days have passed since your report, whichever comes first, unless we agree on another date together.
- Fixes are published as a new release, and confirmed vulnerabilities get a
  [GitHub Security Advisory](https://github.com/bootgs/utils/security/advisories) and, where applicable, a CVE.
- If a report is out of scope or not a vulnerability, we tell you why.

## Credit

With your permission, we credit reporters by name or handle in the security advisory and release notes. Tell us
in your report how you would like to be credited, or if you prefer to stay anonymous. We do not run a paid bug
bounty programme.

## Scope

In scope: the source code in this repository, the `@bootgs/utils` package published on npm and the `2.x` releases
of `apps-script-utils` while they are supported.

Out of scope: vulnerabilities in Google Apps Script itself or other Google services (report them to
[Google](https://bughunters.google.com/)), in development dependencies or other third-party packages (report them
upstream; we will update the dependency), and in scripts built with the library that are caused by their own code
or configuration.

## Security Best Practices for Users

1. **Keep dependencies updated:** use the latest `@bootgs/utils` release and keep other packages current.
2. **Secret management:** never commit API keys or secrets; use `PropertiesService` or another secret store.
3. **Least privilege:** declare only the OAuth scopes you need in `appsscript.json`.
4. **Input validation:** validate input from users, sheets and web requests before acting on it, for example with
   the library's `require*` checks.

---

_Thank you for helping us keep **@bootgs/utils** secure!_

# Governance

This document describes how **@bootgs/utils** is run: who makes decisions, how releases are made and how the
project stays available if a maintainer is not.

## Current Model

@bootgs/utils has a **single lead maintainer** (see [MAINTAINERS.md](MAINTAINERS.md)). The lead maintainer:

- sets the direction of the project;
- reviews and merges pull requests;
- cuts releases and manages the GitHub organisation and the npm package;
- enforces the [Code of Conduct](CODE_OF_CONDUCT.md).

The project is **looking for co-maintainers**. As the community grows, we intend to move to a small group of
maintainers deciding by lazy consensus.

## Decision Making

- Every change goes through a public **issue** or **pull request** on GitHub, so the discussion and the decision
  are on record.
- Larger changes (new public API, breaking changes, new dependencies) start with an issue or a discussion before
  code is written.
- Anyone may comment and propose changes. The lead maintainer makes the final decision and explains it in the
  issue or pull request.
- Every pull request needs review and approval by a maintainer (enforced by [CODEOWNERS](.github/CODEOWNERS)) and
  passing CI checks before it is merged.

## Becoming a Maintainer

Contributors who have shown sustained, high-quality involvement — merged pull requests, reviews, help in issues and
discussions — may be invited to become maintainers. You can also ask: open a discussion or contact the lead
maintainer. New maintainers are added to [MAINTAINERS.md](MAINTAINERS.md) through a pull request and receive
access step by step (triage, then write, then release).

Maintainers who are inactive for 12 months may be moved to emeritus status, with thanks.

## Continuity

To make sure the project is not lost if the lead maintainer becomes unavailable:

- emergency access to the GitHub organisation and the npm package is held by a trusted backup person, with
  credentials stored securely and two-factor authentication enabled on every account;
- the backup person may act only to keep the project available: transfer administration to active maintainers,
  rotate credentials, or archive the project with a notice; they do not take part in day-to-day decisions;
- if no maintainer is active for 6 months, the backup person may hand the project over to a community member
  willing to maintain it, announced publicly in advance;
- the code is licensed under Apache-2.0, so anyone may fork it at any time.

## Releases

- Releases are automated with [release-please](https://github.com/googleapis/release-please-action): merged
  [Conventional Commits](https://www.conventionalcommits.org/) on `main` produce a release pull request with the
  version bump and `CHANGELOG.md`; merging it creates the tag and the GitHub release.
- The release workflow builds, tests and publishes the package to npm with
  [trusted publishing](https://docs.npmjs.com/trusted-publishers) (OIDC, no long-lived token) and
  [provenance](https://docs.npmjs.com/generating-provenance-statements), so every published version can be traced
  to the commit and workflow that built it.
- A CycloneDX SBOM of the production dependencies is attached to each GitHub release.

## Support

The latest release line receives fixes; the previous major receives security fixes for 3 months after a new major;
deprecations are announced at least one minor ahead and removed only in a major. Details: [SUPPORT.md](SUPPORT.md).
Security issues: [SECURITY.md](SECURITY.md).

## Tools and AI Assistance

Development uses AI assistants; humans review and are responsible for every change. See
[docs/tools-and-ai.md](docs/tools-and-ai.md).

## Changes to This Document

Changes to governance are made by pull request and stay open for comments for at least 7 days before merging.

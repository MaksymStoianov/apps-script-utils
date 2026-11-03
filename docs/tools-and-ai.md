# Tools and AI Assistance

## AI assistants

@bootgs/utils is developed with the help of AI coding assistants, currently
[Anthropic Claude](https://www.anthropic.com/claude) and [Google Antigravity](https://antigravity.google/).
They are used for tasks such as drafting code, tests and documentation, reviewing changes and investigating issues.

## Rules

- **Humans are responsible.** Every change is reviewed by a human maintainer before it is merged. The author of
  a commit is responsible for it, whether or not an assistant helped write it, and certifies the
  [Developer Certificate of Origin](../CONTRIBUTING.md#developer-certificate-of-origin) for it.
- **Transparency.** Commits written with substantial AI assistance carry a `Co-Authored-By:` trailer naming the
  assistant, for example:

  ```text
  Co-Authored-By: Claude <noreply@anthropic.com>
  ```

- **Same quality bar.** AI-assisted changes go through the same CI checks, tests and review as any other change.
- **No secrets or private data.** Credentials, personal data and non-public material are never shared with
  assistants.
- **Licensing.** Contributors must make sure that AI-generated content does not reproduce third-party code under
  an incompatible licence.

Contributors are welcome to use AI assistants under the same rules.

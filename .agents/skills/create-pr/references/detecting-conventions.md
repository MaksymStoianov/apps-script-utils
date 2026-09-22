# Detecting a repository's PR conventions

Don't assume Conventional Commits — confirm it. Check these, in order, and
stop at the first one that gives an answer.

## 1. A bot that already enforces a title format

| Signal | Where to look | What it tells you |
|---|---|---|
| `amannn/action-semantic-pull-request` | `.github/workflows/*.yml` | Conventional Commits; the `types`/`scopes` inputs in the same step list the allowed set |
| `commitlint` | `commitlint.config.*`, `.commitlintrc*`, `package.json` `commitlint` key | Exact allowed types/scopes and case rules (commitlint's own default is **lowercase** subject — opposite of some projects' custom CI checks) |
| A custom title-lint script | `.github/workflows/*.yml` referencing a repo script (e.g. `scripts/check-pr-title.*`) | Read that script directly — it's the ground truth, more reliable than any doc |
| `danger.js` / `dangerfile.*` | repo root or `.github/` | May enforce title/description rules as part of a broader PR check |

## 2. Written guidance

- `CONTRIBUTING.md`, `.github/CONTRIBUTING.md`
- `.github/PULL_REQUEST_TEMPLATE.md` (a comment at the top sometimes states the title format)
- `docs/` — search for "pull request" or "PR title"

## 3. Empirical: recent merged PR titles

```bash
gh pr list --state merged --limit 30 --json title -q '.[].title'
```

Look for a repeated shape. Conventional Commits (`type(scope): summary`) is
the most common, but plain sentence titles, ticket-prefixed titles
(`PROJ-123: summary`), or gitmoji-prefixed titles (`:sparkles: summary`) all
show up. If merged titles are inconsistent, prefer whatever the bot/lint
config says over what people actually merged.

## 4. No signal found

Default to Conventional Commits:

```
<type>(<scope>): <summary>
```

with `feat`, `fix`, `perf`, `test`, `docs`, `refactor`, `style`, `build`,
`ci`, `chore`, `revert` as types, scope optional, and a `!` before the colon
for breaking changes. This is a safe, widely-recognized default — but say
explicitly to the user that no repo-specific convention was found and this
is a fallback, not a detected rule.

## Ticket IDs in the title/body

Some projects forbid ticket IDs in the title (kept only in the body or a
"Related" section); others require them. If a branch name contains a
ticket-shaped token (`[A-Z]+-\d+`, `#\d+`, etc.), that's a hint a tracker is
in use — check `CONTRIBUTING.md` or existing PR bodies for the URL prefix
(Linear: `https://linear.app/<org>/issue/<ID>`, Jira:
`https://<org>.atlassian.net/browse/<ID>`, or a plain `#123` for GitHub
Issues) rather than guessing one.

# Working rules for this repository

Rules for any agent working here — Claude Code, Codex, Gemini CLI, Cursor — or a
person. `CLAUDE.md` is a single `@AGENTS.md` import, so Claude Code reads this
file itself rather than a summary of it that can drift.

[`CONTRIBUTING.md`](CONTRIBUTING.md) covers the setup, the directory layout, the
test suite and the Conventional Commits format; none of that is repeated here.
What follows is what is easy to get wrong in this repository, and expensive to
undo once it is wrong.

## 1. One function, one branch

The unit of work is a single function together with everything that makes it
real: its source file, its test file, its export in the module index and its row
in the reference documentation. A branch delivers one of those units and is
named after it — `feat/requireSymbol`, `fix/isValidSheetName`,
`refactor/isNonNegative`.

Never batch. Three validators in one branch cannot be reviewed apart, cannot be
reverted apart, and turn one conflict into three.

## 2. Every bug and every feature gets an issue, and a commit closes it

1. **Issue first.** Before fixing a bug or building a feature, open one:

   ```bash
   gh issue create --title "..." --body "..." --label bug        # or --label enhancement
   ```

   One issue per distinct bug or feature.

2. **Close it from the commit.** The commit that lands the work ends with the
   closing keyword on its own line, before the attribution trailers:

   ```text
   feat(lang): add requireSymbol

   Longer explanation if needed.

   Closes #219

   Co-Authored-By: ...
   ```

3. **Work already committed or already in an open pull request.** Still open the
   issue, then link it without rewriting history: add `Closes #N` to the pull
   request description, or comment the commit SHA on the issue and close it
   there.

4. **Don't leave the trail one-sided.** An issue whose work has landed must be
   closed; a change that landed without an issue gets one retroactively.

Note that the issue closes when the commit reaches the **default branch**, which
is `main`. Merging a pull request into `develop` does not close anything — the
issues close when `develop` reaches `main` for a release.

## 3. No session links anywhere in the repository

A commit message ends with `Co-Authored-By:` and nothing else — no
`Claude-Session:` trailer. A pull request description ends with the "Generated
with Claude Code" line and nothing after it. A session URL cannot be opened by
anyone but its author, and both places keep it forever.

## 4. Merge the queue locally, never with the merge button

Every branch in this repository edits the same two places — one line in a module
index, one row in a reference table — so a web merge conflicts on nearly every
pull request. Resolving those conflicts by hand is how the library has twice
shipped functions nobody could import.

The repository answers this with two merge drivers, declared in
[`.gitattributes`](.gitattributes) and registered by `npm run prepare`:
`merge=module-index` for `src/**/index.ts` and `merge=reference-tables` for
`docs/writerside/topics/reference-*.md`. They merge those files entry by entry
instead of line by line, so two branches adding neighbouring functions do not
collide at all.

**GitHub does not run custom merge drivers.** A pull request the web interface
reports as conflicting must be merged locally:

```bash
npm run prepare              # once per clone: registers the drivers
scripts/merge-queue.sh       # merges the waiting branches, oldest first
git push github develop
```

The script runs the suite after each merge and rolls back any merge that fails
it. `--hold <branch>` keeps one branch out of a run.

This rule is not a preference. During the 2.0.0 cycle, hand-resolved index
conflicts silently dropped exports three separate times — nine functions, then
twenty-seven, then fifty-nine, the last of them failing 426 of 1936 tests. Each
time the source and the tests were merged and only the export line was lost,
which no review of the diff would show.

## 5. A function that is not exported does not exist

A module index lists its members one per line: `export * from "./name";` once
the function exists, `// TODO: name` while it does not. Adding a function means
replacing exactly one placeholder with exactly one export, followed by a blank
line, as the surrounding entries do.

- Never delete a placeholder without adding the export in its place.
- Never resolve an index conflict by taking one side wholesale. Both sides are
  adding a member; both belong in the result.
- `// TODO:` is never a decision to stop exporting something. Removing a member
  deletes its file, and its line goes with it.

`npm run test` is what catches a missing export, and it catches it loudly:
`X is not a function` where a test calls it, an assertion failure where another
function does.

## 6. A function's documentation row lives in the Writerside topics

The README carries the overview, the installation and the usage examples. The
function tables live in [`docs/writerside/topics/`](docs/writerside/topics/) as
five reference topics and are published as a site. A new function adds one row,
in alphabetical order, to the topic and section that match its module.

Do not add function rows to the README. The tables moved out of it precisely
because every branch touched them, and the move cost 101 rows that had to be
recovered from the branches that lost them.

Each function also has a page of its own in the same directory, in every
language. What those pages say comes from the code — the signature, the
parameter types, the return type, the exceptions the body throws — and from the
prose in `docs/content/`, described in the next rule. The JSDoc is a fallback for
functions whose prose has not been written yet:

```bash
npm run docs:generate   # writes the pages, the tree and the table links
npm run docs:check      # fails when they are out of date; CI runs this
```

Two things the generator will not touch:

- a page whose first line is not its marker comment is hand-written, and is kept
  as it is — improve such a page by editing it, not the generator;
- the examples under `docs/writerside/snippets/` are real TypeScript files,
  embedded into pages with `<code-block src="…" include-symbol="…"/>` and
  compiled by `npm run type:check`. An example that stops matching its function
  fails the type check instead of quietly going stale.

So: a new function needs its row in the reference table, its example in
`docs/writerside/snippets/` when it deserves one, and its prose in
`docs/content/en/functions/`. The JSDoc still matters — it is what the IDE
shows — but it is no longer where the published description comes from.

## 6a. The documentation is written once and published in five languages

Source text is English: the guides, the reference tables, the JSDoc, the commit
messages, the issues, the pull requests. A translation never edits the English
source; it adds a file beside it.

- Prose for a function page lives in `docs/content/<language>/functions/<name>.json`
  — summary, description, parameter and return text, the conditions for each
  exception, the titles of the examples. The example code itself is written once,
  in English, and reused by every language.
- A translated guide is a whole Markdown file in `docs/content/<language>/topics/`.
- Only `docs/writerside/` is edited by hand. `docs/writerside-ru|uk|de|fr/` are
  generated in full and must never be edited; a change there is lost on the next
  `npm run docs:generate`.
- A page with no translation is published in English with a notice on it, and is
  listed in `docs/content/COVERAGE.md`. That file is generated; read it to see
  what still needs writing.

Most of those JSON files are not typed out by hand. `npm run docs:author` runs
three writers over the text that is:

- `scripts/docs/guards.mjs` — one entry per subject of the `isX`/`nonX`/`requireX`
  families: the grammatical forms each language needs, the one thing worth
  knowing about the subject, and the values its examples are built from;
- `scripts/docs/author-exceptions.mjs` — one sentence per exception class;
- `docs/content/authored/*.mjs` — everything else, one function at a time.

`npm run docs:verify-examples` then executes every documented result of the form
`expr; // => value` against the real implementation, so an example cannot quietly
stop being true. CI runs it.

`npm run docs:sync-examples` copies the first example of each symbol into the
JSDoc above its declaration, because that comment — not the content file — is
what an IDE shows on hover. It never touches a comment that already has an
`@example`: a hand-written one outranks a copied one. CI checks that no symbol
has a documented example its JSDoc is missing.

`npm run docs:sync-links` writes two `@see` links into that same comment: one to
the symbol's page on the documentation site, and one per `GoogleAppsScript.*`
class its signature names, pointing at Google's reference. It writes nothing that
is already there, so it is safe to run at any time, and CI checks that no comment
is missing one. The link the other way — page to source — is part of every
generated page already.

The site is versioned. `writerside.cfg` is generated for every language and
carries the version from `package.json`, so the header names the release it was
built from, and `buildprofiles.xml` points the switcher at `help-versions.json`
at the site root. The deploy publishes each build twice — at the root as the
current version, and under `/<version>/` as an archive — keeping the zips in a
`docs-archive` branch, because Pages replaces everything it serves on every
deploy and an archive that lives only there disappears with the next one.
`npm run docs:help-versions -- <site-directory> <version>` writes the file the
switcher reads.

`npm run docs:finalize-site -- <site-directory>` runs against a built site
rather than the sources. It writes into every page what the build profile does
not: the structured data, the canonical link, the `og:image` address, the row of
links to the other languages under the breadcrumbs, and the notice at the end
saying the documentation was written by AI. It also writes the `hreflang` links,
the sitemap covering every language and `robots.txt`, which is why it has to run
after all five builds sit in one directory — that is when it can know which
pages exist in which language.

The languages, and every label around the prose, are declared in
`scripts/docs/languages.mjs`. Adding a language is a change to that file and a
new matrix entry in `.github/workflows/docs.yml`; the rest follows.

## 7. Parity is not attributed

Validator and exception semantics follow the conventions of an established JVM
framework, deliberately, so that the naming and the failure modes are familiar.
That framework is not named in the documentation, the commit messages or the
code, and no comparison to it is drawn in anything published. Describe what a
function does on its own terms.

## 8. Verify before you commit, not after you push

```bash
npm run type:check   # tsc --noEmit
npm run lint
npm run format       # prettier --check .
npm run test
npm run build
```

The `pre-commit` hook runs the first three and an audit; the `pre-push` hook adds
the suite. Neither is a substitute for running them yourself: a hook that fails
after the work is done is a hook that tempts `--no-verify`.

Formatting is Prettier's, not yours. A merge driver that rewrites a table repads
it through Prettier for the same reason — the file must not drift from what
`npm run format` expects.

## 9. `release-please` owns the version and the changelog

Never hand-edit the `version` field in `package.json` or a line in
`CHANGELOG.md`. Both are generated on a push to `main` from the Conventional
Commit history, and an edit to either desynchronises the release that follows.

A breaking change is declared with `!` in the header or a `BREAKING CHANGE:`
footer that says what breaks, in the words a user of the function would need:

```text
fix(sheet)!: restrict isValidSheetId to non-negative integers

BREAKING CHANGE: isValidSheetId no longer accepts fractions, Infinity,
or values beyond Number.MAX_SAFE_INTEGER.
```

Publishing to npm is manual; no workflow does it.

## 10. Licence and attribution hygiene

- The library is Apache-2.0, it has no runtime dependencies, and it should keep
  having none. A new runtime dependency is a licence obligation for everyone who
  installs the package.
- Code copied from elsewhere arrives with its licence and its notices, or it does
  not arrive.
- Third-party material in the tree — the banner artwork included — keeps its
  attribution. Never state a licence for material whose terms you have not seen;
  say that the terms are unknown and ask.
- The library is named after a Google product and documents six of them. The
  Trademarks section of the README says whose marks those are and that this
  project is independent; keep it accurate as services are added.
- No live keys or tokens in the tree. If one ever lands, rotate it — deleting the
  file does not remove it from the history.

## 11. Notes on the sandbox

An agent working here through a sandboxed shell will hit these; none of them
means the repository is broken.

- `gh` fails with `tls: failed to verify certificate: x509: OSStatus -26276`.
  Run it with the sandbox disabled, or ask the user to run `! gh ...`.
- `git fetch github` over SSH fails. Fetching the same refs over HTTPS works:
  `git fetch https://github.com/MaksymStoianov/apps-script-utils.git develop`.
- Writes to `.git/config` are denied, so `npm run prepare` cannot register the
  merge drivers from inside the sandbox. Run that one command outside it.
- `mktemp -t` resolves to a directory the sandbox cannot write to. Use `$TMPDIR`
  explicitly.

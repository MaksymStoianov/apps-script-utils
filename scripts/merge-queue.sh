#!/bin/bash

# Merges the waiting branches into `develop`, oldest first, running the test
# suite after each one.
#
# A branch here is one function plus its tests, so the queue is long and every
# merge is the same handful of commands. This runs them in order and stops at
# the first branch that does not merge cleanly or does not pass, leaving that
# branch's conflict in the working tree to be resolved by hand.
#
# Nothing is pushed: review the result, then push the target branch yourself.
#
# Usage: scripts/merge-queue.sh [--target <branch>] [--limit <n>] [--hold <branch>]
#                               [--skip-tests] [--dry-run]
#
# --hold keeps a branch out of this run, repeatable, for one that is known to
# conflict and is not ready to be dealt with yet.

set -uo pipefail

# Merging checks branches out, which rewrites this file in the working tree
# while Bash is still reading it. Run from a copy that cannot change underfoot.
if [ -z "${MERGE_QUEUE_COPY:-}" ]; then
  git_dir=$(git rev-parse --git-dir) || exit 1
  copy="$git_dir/merge-queue.$$.sh"
  cat "$0" >"$copy" || exit 1
  MERGE_QUEUE_COPY="$copy" exec bash "$copy" "$@"
fi
trap 'rm -f "$MERGE_QUEUE_COPY"' EXIT

LOG_TAG="[merge-queue]"
TARGET="develop"
LIMIT=0
SKIP_TESTS=0
DRY_RUN=0
HELD=""

while [ $# -gt 0 ]; do
  case "$1" in
    --target)
      TARGET="${2:?--target needs a branch name}"
      shift 2
      ;;
    --limit)
      LIMIT="${2:?--limit needs a number}"
      shift 2
      ;;
    --skip-tests)
      SKIP_TESTS=1
      shift
      ;;
    --hold)
      HELD="$HELD ${2:?--hold needs a branch name}"
      shift 2
      ;;
    --dry-run)
      DRY_RUN=1
      shift
      ;;
    -h | --help)
      sed -n '3,17p' "$0"
      exit 0
      ;;
    *)
      echo "$LOG_TAG: ✗ unknown argument: $1"
      exit 2
      ;;
  esac
done

PROJECT_ROOT=$(git rev-parse --show-toplevel 2>/dev/null) || {
  echo "$LOG_TAG: ✗ not a Git repository."
  exit 1
}
cd "$PROJECT_ROOT" || exit 1

if [ -n "$(git status --porcelain)" ]; then
  echo "$LOG_TAG: ✗ the working tree has changes; commit or stash them first."
  exit 1
fi

if ! git rev-parse --verify --quiet "$TARGET" >/dev/null; then
  echo "$LOG_TAG: ✗ no such branch: $TARGET"
  exit 1
fi

# Without the driver the reference tables merge line by line, which is a
# conflict on nearly every branch in the queue.
if ! git config --get merge.reference-tables.driver >/dev/null; then
  echo "$LOG_TAG: the reference-table merge driver is not registered; registering it."
  bash ./scripts/setup-merge-driver.sh || exit 1
fi

# Oldest first, by the author date of each branch's earliest commit that the
# target does not already have.
QUEUE=$(
  for branch in $(git for-each-ref --format='%(refname:short)' refs/heads/); do
    [ "$branch" = "$TARGET" ] && continue
    [ "$branch" = "main" ] && continue
    # Bash 3.2, which macOS ships, cannot parse a `case` inside a command
    # substitution, so match with [[ ]] instead.
    [[ " $HELD " == *" $branch "* ]] && continue
    stamp=$(git log --reverse --format='%at' "$TARGET..$branch" 2>/dev/null | head -1)
    [ -n "$stamp" ] && echo "$stamp $branch"
  done | sort -n | cut -d' ' -f2
)

if [ -z "$QUEUE" ]; then
  echo "$LOG_TAG: nothing to merge into $TARGET."
  exit 0
fi

TOTAL=$(echo "$QUEUE" | wc -l | tr -d ' ')
[ "$LIMIT" -gt 0 ] && QUEUE=$(echo "$QUEUE" | head -"$LIMIT")

echo "$LOG_TAG: $TOTAL branch(es) waiting for $TARGET; merging $(echo "$QUEUE" | wc -l | tr -d ' ')."

if [ "$DRY_RUN" -eq 1 ]; then
  echo "$QUEUE" | sed 's/^/  /'
  echo "$LOG_TAG: dry run, nothing merged."
  exit 0
fi

git checkout -q "$TARGET" || exit 1

merged=0

for branch in $QUEUE; do
  before=$(git rev-parse HEAD)

  printf '%s: merging %s ... ' "$LOG_TAG" "$branch"

  if ! git merge --no-ff --no-edit "$branch" >/dev/null 2>&1; then
    echo "conflict."
    echo "$LOG_TAG:   Resolve it, commit, and run this again to continue:"
    git --no-pager diff --name-only --diff-filter=U | sed 's/^/    /'
    echo "$LOG_TAG: merged $merged branch(es) before stopping."
    exit 1
  fi

  if [ "$SKIP_TESTS" -eq 0 ] && ! npm test --silent >/dev/null 2>&1; then
    echo "tests failed."
    echo "$LOG_TAG:   Rolling the merge back; run 'npm test' on $branch to see why."
    git reset -q --hard "$before"
    echo "$LOG_TAG: merged $merged branch(es) before stopping."
    exit 1
  fi

  echo "ok."
  merged=$((merged + 1))
done

echo "$LOG_TAG: merged $merged branch(es) into $TARGET. Nothing was pushed."
exit 0

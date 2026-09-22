#!/usr/bin/env bash
# Validates a PR title against a Conventional-Commits-shaped pattern before
# it reaches `gh pr create`, which won't catch a malformed title itself —
# CI does, but only after the PR already exists.
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: validate-pr-title.sh "<title>" [options]

Checks a PR title against a Conventional Commits pattern:
  <type>(<scope>)!: <summary>

Options:
  --types LIST      Comma-separated allowed types.
                     Default: feat,fix,perf,test,docs,refactor,style,build,ci,chore,revert
  --pattern REGEX   Full extended regex to use instead of the built-in one.
                     Overrides --types.
  -h, --help        Show this help.

Exit status:
  0  title matches
  1  title does not match (reason printed to stderr)
  2  usage error

Examples:
  validate-pr-title.sh "feat(editor): Add dark mode toggle"
  validate-pr-title.sh "fix!: Remove deprecated v1 endpoint" --types feat,fix,chore
EOF
}

[ $# -eq 0 ] && { usage; exit 2; }

title=""
types="feat,fix,perf,test,docs,refactor,style,build,ci,chore,revert"
pattern=""

while [ $# -gt 0 ]; do
  case "$1" in
    -h|--help) usage; exit 0 ;;
    --types) types="$2"; shift 2 ;;
    --pattern) pattern="$2"; shift 2 ;;
    *)
      if [ -z "$title" ]; then
        title="$1"
        shift
      else
        echo "Unexpected argument: $1" >&2
        exit 2
      fi
      ;;
  esac
done

if [ -z "$title" ]; then
  echo "Missing <title> argument." >&2
  exit 2
fi

if [ -z "$pattern" ]; then
  type_alt=$(echo "$types" | sed 's/,/|/g')
  pattern="^(${type_alt})(\([a-zA-Z0-9 ._/-]+\))?!?: .+[^.]$"
fi

if [[ "$title" =~ $pattern ]]; then
  echo "OK: title matches pattern"
  exit 0
else
  echo "FAIL: title does not match pattern" >&2
  echo "  title:   $title" >&2
  echo "  pattern: $pattern" >&2
  exit 1
fi

#!/bin/bash

# Registers the reference-table merge driver in the local repository config.
#
# `.gitattributes` says which files use the driver, but Git will not take the
# command to run from a file inside the repository, so every clone has to write
# it into its own config. `npm run prepare` does that, next to the Husky setup.
#
# See scripts/merge-reference-tables.mjs.

LOG_TAG="[merge-driver:setup]"

PROJECT_ROOT=$(git rev-parse --show-toplevel 2>/dev/null)
if [ $? -ne 0 ]; then
  echo "$LOG_TAG: skipped, not a Git repository."
  exit 0
fi
cd "$PROJECT_ROOT" || exit 1

if ! git config merge.reference-tables.name "Row-aware merge of the documentation reference tables" ||
  ! git config merge.reference-tables.driver "node scripts/merge-reference-tables.mjs %O %A %B %L %P"; then
  echo "$LOG_TAG: ✗ could not write to the repository config."
  echo "$LOG_TAG:   The reference tables will merge line by line until this runs."
  exit 1
fi

echo "$LOG_TAG: merge.reference-tables registered."
exit 0

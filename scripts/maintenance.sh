#!/bin/bash

LOG_TAG="[maintanance:script]"

echo "$LOG_TAG: Starting repository maintenance."


# Переход в корневой каталог
# Используем команду git для поиска корня проекта, где лежит package.json
PROJECT_ROOT=$(git rev-parse --show-toplevel 2>/dev/null)
if [ $? -ne 0 ]; then
  echo " ✗ Error: Cannot find project root (not a Git repository)."
  exit 1
fi
cd "$PROJECT_ROOT" || exit 1
echo "$LOG_TAG: Working directory set to $(pwd)"
echo ""


# Проверка на наличие незакоммиченных изменений
echo "$LOG_TAG: Checking for uncommitted changes..."
if ! git diff --quiet --exit-code; then
    echo " ✗ Error: Uncommitted changes detected. Please commit or stash them first."
    exit 1
fi
echo " ✓ Done."
echo ""


# Git синхронизация
echo "$LOG_TAG: Syncing with 'main' branch..."
git checkout main
if [ $? -ne 0 ]; then
  echo " ✗ Error: Failed to checkout 'main' branch."
  exit 1
fi

git pull
if [ $? -ne 0 ]; then
  echo " ✗ Error: Git pull failed."
  exit 1
fi
echo " ✓ Done."
echo ""


# Установка зависимостей
echo "$LOG_TAG: Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
  echo " ✗ Error: npm install failed."
  exit 1
fi
echo " ✓ Done."
echo ""


# Очистка кеша
echo "$LOG_TAG: Cleaning npm cache..."
npm cache clean --force
echo " ✓ Done."
echo ""


# Запуск аудита безопасности
echo "$LOG_TAG: Running npm audit fix..."
npm audit fix
if [ $? -ne 0 ]; then
    # audit fix может вернуть 1, если есть High/Critical уязвимости,
    # которые не удалось исправить автоматически. Мы продолжаем,
    # но предупреждаем, что ручной фикс может потребоваться.
    echo " ✗ Warning: npm audit fix completed, but unfixable vulnerabilities may remain."
fi

# Проверка оставшихся уязвимостей
npm audit --audit-level=high
if [ $? -ne 0 ]; then
  echo " ✗ Error: Unfixable high-severity vulnerabilities found."
fi
echo " ✓ Done."
echo ""


# Проверка типов TypeScript (без компиляции)
echo "$LOG_TAG: Running TypeScript check (tsc --noEmit)..."
tsc --noEmit
if [ $? -ne 0 ]; then
  echo " ✗ Error: TypeScript check failed."
  exit 1
fi
echo " ✓ Done."
echo ""


# Проверка версий
echo "$LOG_TAG: 5. Checking for outdated packages..."
npm outdated

if [ $? -ne 0 ]; then
    echo " ! Warning: Outdated packages found (see list above)."
    echo "   ---"
    echo "   For automated updating of versions in package.json, use the command:"
    echo "   npx npm-check-updates -u"
    echo "   After that, run 'npm install'."
    echo "   ---"
else
    echo " ✓ No outdated packages found in package.json."
fi
echo " ✓ Done with version check."
echo ""


# Проверка лицензий
echo "$LOG_TAG: Running license check..."
# Установка license-checker, если не установлен
if ! command -v license-checker &> /dev/null
then
    echo "$LOG_TAG: Installing license-checker globally..."
    npm install -g license-checker
    if [ $? -ne 0 ]; then
        echo " ✗ Error: Failed to install license-checker."
        exit 1
    fi
fi

license-checker --production
if [ $? -ne 0 ]; then
    echo " ✗ Error: License checker failed (usually due to missing packages in path)."
fi
echo " ✓ Done."
echo ""


echo "$LOG_TAG: Maintenance completed successfully."
exit 0
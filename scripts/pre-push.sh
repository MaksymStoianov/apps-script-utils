#!/bin/bash

LOG_TAG="[plugin husky:pre-push]"


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


# Проверка на наличие node_modules
echo "$LOG_TAG: Checking for node_modules..."
if [ ! -d "node_modules" ]; then
  echo " ✗ Error: Missing node_modules. Please run 'npm install' first."
  exit 1
fi
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
echo "$LOG_TAG: Running tsc..."
tsc --noEmit
if [ $? -ne 0 ]; then
  echo " ✗ Error: TypeScript check failed."
  exit 1
fi
echo " ✓ Done."
echo ""


# Линтинг
echo "$LOG_TAG: Running lint..."
npm run lint
if [ $? -ne 0 ]; then
  echo " ✗ Error: Linting failed."
  exit 1
fi
echo " ✓ Done."
echo ""


# Форматирование
echo "$LOG_TAG: Running format..."
npm run format
if [ $? -ne 0 ]; then
  echo " ✗ Error: Formatting failed."
  exit 1
fi
echo " ✓ Done."
echo ""


# Запуск тестов
echo "$LOG_TAG: Running test..."
npm run test
if [ $? -ne 0 ]; then
  echo " ✗ Error: Test failed."
  exit 1
fi
echo " ✓ Done."
echo ""


echo "$LOG_TAG: All checks passed successfully."
exit 0
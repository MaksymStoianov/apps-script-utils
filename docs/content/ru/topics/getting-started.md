# Первые шаги

<link-summary>Требования, установка и первый рабочий скрипт.</link-summary>

<web-summary>Установка apps-script-utils в проект Google Apps Script: пакет npm, настройка clasp и первый скрипт, читающий лист с помощью библиотеки.</web-summary>

## Требования

- [Node.js](https://nodejs.org/) версии 22.14.0 или новее
- [npm](https://www.npmjs.com/) (или другой менеджер пакетов Node, например pnpm)

## Установка

```bash
npm install apps-script-utils
```

Всё экспортируется из корня пакета, поэтому одного пути импорта достаточно для всей библиотеки:

```typescript
import { appendRows, isAdmin, parseA1Notation, requireString } from "apps-script-utils";
```

## Первые примеры

### Работа с Таблицами

Эффективно добавить несколько строк данных:

```typescript
import { appendRows } from "apps-script-utils";

const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
const data = [
  ["John Doe", "john@example.com", 28],
  ["Jane Smith", "jane@example.com", 32]
];

appendRows(sheet, data);
```

### Утилиты Admin SDK

Проверить, есть ли у текущего пользователя права администратора:

```typescript
import { isAdmin } from "apps-script-utils";

if (isAdmin()) {
  Logger.log("Access granted to admin panel.");
} else {
  Logger.log("Access denied.");
}
```

### Разбор нотации A1

Превратить сложную нотацию A1 в структурированный объект:

```typescript
import { parseA1Notation } from "apps-script-utils";

const rangeInfo = parseA1Notation("'Sheet1'!A1:B10");

console.log(rangeInfo.sheetName); // "Sheet1"
console.log(rangeInfo.startRowIndex); // 0
console.log(rangeInfo.endColumnIndex); // 2
```

## Проверка входных данных

Большинство функций библиотеки отвергают неверный ввод, а не приводят его к чему-нибудь. Семейство `requireX`
превращает непроверенное значение в типизированное — или бросает исключение:

```typescript
import { requireString, requireNonEmptyString } from "apps-script-utils";

function greet(name: unknown): string {
  return `Hello, ${requireNonEmptyString(name)}!`;
}

greet("Ada"); // "Hello, Ada!"
greet(""); // бросает EmptyStringException
greet(42); // бросает InvalidStringException
```

[](validation-conventions.md) разбирает всю схему имён `isX` / `nonX` / `requireX` / `requireNonX`, а
[](exception-handling.md) — исключения, которые эти функции бросают.

## Куда дальше

- [](validation-conventions.md) — соглашение об именах, которому подчиняется большая часть библиотеки.
- [](apps-script-runtime.md) — каким помощникам нужна среда Apps Script и что это значит для тестов.
- [](reference-base.md) — полный список функций, не зависящих от среды выполнения.
- [](reference-appsscript.md) — полный список функций, привязанных к сервисам.

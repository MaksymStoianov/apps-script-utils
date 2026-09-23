# appsscript

<link-summary>Помічники для Google Apps Script: таблиці, нотація A1, інтерфейс, Диск та Admin SDK.</link-summary>

<web-summary>Модуль appsscript в apps-script-utils: помічники для таблиць і нотації A1, перевірки аркушів, інтерфейс, Диск, Презентації та Admin SDK для Google Apps Script.</web-summary>

`appsscript` містить усе, що стосується сервісів Google. Це та частина бібліотеки, яка працює лише всередині
середовища Apps Script, — що це означає для тестів, розібрано в [](apps-script-runtime.md).

## Пакети

| Пакет                                                   | Містить                                                           |
| :------------------------------------------------------ | :---------------------------------------------------------------- |
| `appsscript/base`                                       | спільні помічники для решти пакетів сервісів                      |
| `appsscript/admin`                                      | сервіс Admin SDK Directory                                        |
| `appsscript/sheet`                                      | Таблиці: рядки, стовпці, нотація A1, `GridRange`, перевірки типів |
| `appsscript/slide`                                      | Презентації: пошук слайдів, заміна тексту, перетворення Markdown  |
| `appsscript/net`                                        | автентифікацію запитів                                            |
| `appsscript/ui`                                         | вбудовані класи `Ui`, `HtmlOutput` і `TextOutput`                 |
| `appsscript/doc`, `appsscript/drive`, `appsscript/form` | зарезервовані, поки не реалізовані                                |

## Нотація A1

`parseA1Notation` перетворює рядок нотації на `GridRange` — простий об'єкт із межами від нуля та невключеною правою
межею, як у Sheets API, а не позиціями від одиниці, які приймають методи `Range`:

```typescript
import { parseA1Notation } from "apps-script-utils";

parseA1Notation("Sheet1!A1:B10");
// {
//   sheetName: "Sheet1",
//   a1Notation: "A1:B10",
//   startRowIndex: 0,
//   endRowIndex: 10,
//   startColumnIndex: 0,
//   endColumnIndex: 2
// }

parseA1Notation("B5");
// { sheetName: null, a1Notation: "B5", startRowIndex: 4, endRowIndex: 5, ... }
```

Відкриті нотації теж розбираються: `"5:15"` лишає межі стовпців незаданими, `"M:X"` — межі рядків.

`toA1Notation` — зворотна операція:

```typescript
import { toA1Notation } from "apps-script-utils";

toA1Notation({ startRowIndex: 0, endRowIndex: 10, startColumnIndex: 0, endColumnIndex: 2 });
// "A1:B10"
```

`parseA1Notations` приймає список через кому й повертає по одному `GridRange` на запис:

```typescript
import { parseA1Notations } from "apps-script-utils";

parseA1Notations("Sheet1!A1:B2, Sheet1!D1"); // два об'єкти GridRange
```

Ім'я аркуша можна прочитати, замінити або відкинути, не розбираючи нотацію заново:

```typescript
import {
  extractRangeFromA1Notation,
  extractSheetNameFromA1Notation,
  updateSheetNameInA1Notation
} from "apps-script-utils";

extractSheetNameFromA1Notation("'My Sheet'!A1"); // "My Sheet"
extractRangeFromA1Notation("'My Sheet'!A1:B2"); // "A1:B2"
updateSheetNameInA1Notation("Sheet1!A1:B2", "Data"); // "Data!A1:B2"
```

## Стовпці

У вжитку дві схеми нумерації, і імена функцій кажуть, яку саме вони повертають. _Індекс_ рахується від нуля, як у
`GridRange`; _позиція_ — від одиниці, як у `Sheet.getRange()`:

```typescript
import {
  getColumnIndexByLetter,
  getColumnLetterByIndex,
  getColumnPositionByLetter
} from "apps-script-utils";

getColumnIndexByLetter("A"); // 0
getColumnIndexByLetter("AZ"); // 51
getColumnLetterByIndex(0); // "A"
getColumnLetterByIndex(51); // "AZ"
getColumnPositionByLetter("A"); // 1
```

## Порівняння діапазонів

Об'єкти `GridRange` порівнюються без походу до сервісу:

```typescript
import {
  doGridRangesIntersect,
  isCellGridRange,
  isGridRangeContainedIn,
  isGridRangeSameDimensions
} from "apps-script-utils";

const header = { startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 5 };
const body = { startRowIndex: 1, endRowIndex: 100, startColumnIndex: 0, endColumnIndex: 5 };

doGridRangesIntersect(header, body); // false
isCellGridRange(header); // false — він займає п'ять стовпців
```

## Запис рядків і стовпців

```typescript
import { appendRows, prependRows, appendColumns } from "apps-script-utils";

const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");

appendRows(sheet, [
  ["John Doe", "john@example.com", 28],
  ["Jane Smith", "jane@example.com", 32]
]);

prependRows(sheet, [["Name", "Email", "Age"]]);
```

Вони пишуть за один виклик, а не порядково, — це різниця між одним походом до сервісу й походом на кожен рядок. Усі
рядки мають бути однієї довжини; перевірити це заздалегідь допомагає `isConsistent2DArray` з [](module-lang.md).

## Перевірки типів для об'єктів сервісів

Та сама домовленість, що й у всій бібліотеці, застосована до класів Apps Script:

```typescript
import { isSheet, isSpreadsheet, isRange, requireSheet } from "apps-script-utils";

function rowCount(value: unknown): number {
  return requireSheet(value).getLastRow();
}
```

`requireSheet`, `requireSpreadsheet` і `requireRange` кидають `InvalidSheetException`,
`InvalidSpreadsheetException` та `InvalidRangeException` відповідно — дивіться [](exception-handling.md).

## Презентації

```typescript
import { getSlideByIndex, findReplaceAllTextInSlide, requireSlide } from "apps-script-utils";

const presentation = SlidesApp.getActivePresentation();

// getSlideByIndex повертає null, якщо індекс поза межами, тому його поєднують
// з requireSlide там, де відсутність слайда має зупинити скрипт.
const slide = requireSlide(getSlideByIndex(presentation, 0));

findReplaceAllTextInSlide(slide, "{{name}}", "Ada Lovelace");
```

`findReplaceAllTextInSlide` повертає кількість зроблених замін і типово враховує регістр; передайте `false`
четвертим аргументом для пошуку без урахування регістру. `requireSlide` кидає `SlideNotFoundException`, якщо
значення не є слайдом.

## Admin SDK

```typescript
import { isAdmin } from "apps-script-utils";

if (isAdmin()) {
  Logger.log("Access granted to admin panel.");
}
```

`isAdmin` повертає `false`, якщо сервіс Admin SDK Directory не увімкнено в проєкті, записуючи причину в журнал, а не
кидаючи виняток. Виклик тому безпечний навіть під час побудови меню, але `false` сам по собі ще не доводить, що
користувач не адміністратор. Увімкніть розширений сервіс, перш ніж покладатися на відповідь.

# lang

<link-summary>Языковые утилиты, не зависящие от среды: проверки, массивы, числа, объекты, строки.</link-summary>

<web-summary>Модуль lang в apps-script-utils: проверки типов, помощники для массивов и матриц, классификация чисел, хеширование объектов и преобразование строк — всё независимо от среды выполнения.</web-summary>

`lang` — это языковые утилиты, та часть библиотеки, которая ничего не знает про Google Apps Script и работает везде,
где работает JavaScript.

## Пакеты

| Пакет         | Содержит                                                |
| :------------ | :------------------------------------------------------ |
| `lang/base`   | стражи `isX` / `nonX` / `requireX` для встроенных типов |
| `lang/array`  | проверки формы массивов и преобразования                |
| `lang/number` | классификацию и преобразование чисел                    |
| `lang/object` | хеширование, сравнение и работу с путями в объектах     |
| `lang/string` | смену регистра, проверки и сравнение версий             |

Рядом с `lang` библиотека поставляет `html`, `json` и `time`. Они точно так же не зависят от среды выполнения и
перечислены вместе с `lang` в [](reference-base.md).

## Стражи типов

`lang/base` — самый большой пакет и тот, которого касается почти любой код. Он полностью разобран в
[](validation-conventions.md); если коротко: `isX` и `nonX` отвечают на вопрос, а `requireX` проверяет и возвращает.

```typescript
import { requireString, toKebabCase } from "apps-script-utils";

function slugify(input: unknown): string {
  return toKebabCase(requireString(input));
}
```

## Массивы

```typescript
import { chunk, transpose, is2DArray, isConsistent2DArray } from "apps-script-utils";

chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

transpose([
  ["a", "b"],
  ["c", "d"]
]); // [["a", "c"], ["b", "d"]]

is2DArray([[1], [2]]); // true
isConsistent2DArray([[1, 2], [3]]); // false — строки разной длины
```

`isConsistent2DArray` — та проверка, которую стоит делать перед записью в лист: `Range.setValues()` требует, чтобы
все строки были одной длины, и рваный массив падает уже на границе сервиса с сообщением, которое не называет
проблемную строку.

## Числа

```typescript
import { isCountable, isFloat, isInteger, toInteger } from "apps-script-utils";

isInteger(42); // true
isInteger(42.5); // false
isFloat(42.5); // true
isCountable(3); // true — неотрицательное целое
isCountable(-1); // false
```

Аргументы строк и столбцов в Sheets API — это количества, а не произвольные числа; ради этого и существуют
`isCountable` и `requireCountable`.

## Строки

Смена регистра:

```typescript
import { toCamelCase, toKebabCase, toSnakeCase, toProperCase } from "apps-script-utils";

toCamelCase("user name"); // "userName"
toKebabCase("User Name"); // "user-name"
toSnakeCase("User Name"); // "user_name"
toProperCase("user name"); // "User Name"
```

Проверки:

```typescript
import { isEmail, isValidSlug, isValidVersion, requireValidEmail } from "apps-script-utils";

isEmail("ada@example.com"); // true
isValidSlug("my-post"); // true
isValidVersion("1.10.0"); // true

requireValidEmail(formResponse); // вернёт значение или бросит InvalidEmailFormatException
```

Сравнение версий — для скриптов, которые включают поведение в зависимости от версии библиотеки:

```typescript
import { versionCompare, isVersionCompatible } from "apps-script-utils";

versionCompare("1.10.0", "1.9.0"); // 1
versionCompare("1.9.0", "1.10.0"); // -1
versionCompare("1.9.0", "1.9.0"); // 0
```

`escapeRegExp` делает пользовательскую строку безопасной для подстановки в шаблон — пригождается всякий раз, когда
поисковый запрос приходит из ячейки или формы:

```typescript
import { escapeRegExp } from "apps-script-utils";

const pattern = new RegExp(escapeRegExp(searchTerm), "gi");
```

## Объекты

```typescript
import { hashCode, objectToString } from "apps-script-utils";

objectToString([]); // "[object Array]"
objectToString(null); // "[object Null]"
hashCode("apps-script-utils"); // устойчивый числовой хеш
```

`objectToString` сообщает внутренний тег, а не `String(value)`, и это надёжный способ отличить массив от даты и от
простого объекта: тег переживает переход между фреймами, чего `instanceof` не умеет.

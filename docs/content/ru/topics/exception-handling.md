# Обработка исключений

<link-summary>Иерархия исключений, когда бросается каждый класс и как их ловить.</link-summary>

<web-summary>Типизированные исключения apps-script-utils: иерархия под Exception, какая проверка какой класс бросает и как ловить их в проекте Google Apps Script.</web-summary>

Любая ошибка, которую поднимает эта библиотека, — экземпляр класса `Exception` или его наследника. Поэтому одного
блока `catch` достаточно, чтобы отличить сбои библиотеки от всего остального, что бросает среда выполнения.

## Иерархия

```text
Error
└── Exception
    └── RuntimeException
        ├── EmptyStringException
        ├── IllegalArgumentException
        ├── InvalidEmailFormatException
        ├── InvalidStringException
        ├── NullPointerException
        ├── RepositoryIsNotDefinedException
        ├── ServiceIsNotDefinedException
        ├── AuthenticationException
        ├── AdminDirectoryException
        ├── InvalidGridRangeException
        ├── InvalidRangeException
        ├── InvalidSheetException
        ├── InvalidSpreadsheetException
        ├── InvalidPresentationException
        └── SlideNotFoundException
```

Смысл несут два уровня. `Exception` — корень, он помечает ошибку как пришедшую из этой библиотеки.
`RuntimeException` помечает её как сбой во время работы скрипта, и от него наследует каждый конкретный класс, —
поэтому `catch` на `RuntimeException` ловит всё, что библиотека сейчас бросает.

## Как ловить

У `Exception` есть статический страж типа — рекомендуемая проверка, потому что она заодно сужает тип:

```typescript
import { Exception, requireString } from "apps-script-utils";

try {
  requireString(input);
} catch (error) {
  if (Exception.isException(error)) {
    Logger.log(`${error.name}: ${error.getMessage()}`);
  } else {
    throw error;
  }
}
```

`instanceof` тоже работает — им ловят один конкретный сбой:

```typescript
import { NullPointerException, requireNonNull } from "apps-script-utils";

try {
  const sheet = requireNonNull(spreadsheet.getSheetByName("Data"));
} catch (error) {
  if (error instanceof NullPointerException) {
    Logger.log("Sheet 'Data' does not exist.");
  }
}
```

Каждый подкласс задаёт `name` в собственном конструкторе, поэтому `error.name` показывает конкретный класс —
`"NullPointerException"`, а не `"Exception"`.

## Как создавать

Каждое исключение принимает необязательное сообщение: строку, готовую ошибку `Error`, чьё сообщение будет
переиспользовано, или любое другое значение, которое просто игнорируется:

```typescript
throw new IllegalArgumentException("size must be a positive integer");
throw new IllegalArgumentException(caughtError); // переиспользует caughtError.message
throw new IllegalArgumentException(); // без сообщения
```

`Exception.create()` — фабрика с тем же смыслом, для случаев, когда выражение с `new` не подходит.

Под капотом это обычные объекты `Error`, поэтому `getMessage()`, `toString()` и
`Object.prototype.toString.call()` ведут себя как ожидается:

```typescript
const error = new EmptyStringException("name is required");

error.getMessage(); // "name is required"
error.toString(); // "name is required"
Object.prototype.toString.call(error); // "[object EmptyStringException]"
```

## Кто что бросает

| Исключение                        | Бросают                                                                                                                                                                              |
| :-------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IllegalArgumentException`        | проверки `requireX` для массивов, логических значений, счётных чисел, функций, целых, чисел, объектов, скаляров и символов, а также большая часть помощников для нотации A1 и листов |
| `InvalidStringException`          | `requireString` и устаревшая `nonEmptyString`                                                                                                                                        |
| `EmptyStringException`            | `requireNonEmptyString`, `escapeRegExp`                                                                                                                                              |
| `NullPointerException`            | `requireNonNull`                                                                                                                                                                     |
| `InvalidEmailFormatException`     | `requireValidEmail`                                                                                                                                                                  |
| `RepositoryIsNotDefinedException` | `requireRepository`                                                                                                                                                                  |
| `ServiceIsNotDefinedException`    | `requireService`                                                                                                                                                                     |
| `AuthenticationException`         | `requireValidToken`                                                                                                                                                                  |
| `AdminDirectoryException`         | создаётся внутри `isAdmin`, когда сервис Admin SDK Directory не включён, и там же попадает в журнал, а не наружу                                                                     |
| `InvalidSheetException`           | `requireSheet`                                                                                                                                                                       |
| `InvalidSpreadsheetException`     | `requireSpreadsheet`                                                                                                                                                                 |
| `InvalidRangeException`           | `requireRange`                                                                                                                                                                       |
| `InvalidGridRangeException`       | `toA1Notation` и помощники сравнения `GridRange`                                                                                                                                     |
| `SlideNotFoundException`          | `requireSlide`                                                                                                                                                                       |

[](reference-exception.md) перечисляет все классы со ссылкой на исходный код.

## Как выбрать поведение при сбое

Предикаты никогда не бросают, утверждения бросают всегда. Что брать — зависит от того, ожидаем ли неверный ввод:

```typescript
// Ожидаемо: поле формы вполне может оказаться пустым.
if (nonEmpty(response)) {
  process(response);
}

// Неожиданно: отсутствующий лист — это сломанная конфигурация, а не случай для обработки.
const sheet = requireNonNull(spreadsheet.getSheetByName("Data"), "sheet 'Data' is missing");
```

Передать необязательный аргумент `message` стоит потраченных нажатий: это единственный контекст, который получит
читатель журнала выполнения.

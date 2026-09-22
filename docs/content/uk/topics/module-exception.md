# exception

<link-summary>Класи винятків і як їх розширювати.</link-summary>

<web-summary>Модуль exception в apps-script-utils: базовий клас Exception, його нащадки і як додати до ієрархії власний клас.</web-summary>

`exception` містить класи помилок, які кидає решта бібліотеки. Ніщо в ньому не залежить від середовища виконання
Apps Script.

## Пакети

| Пакет                  | Містить                                               |
| :--------------------- | :---------------------------------------------------- |
| `exception`            | базові класи та винятки загального призначення        |
| `exception/appsscript` | збої помічників для Таблиць, Презентацій та Admin SDK |
| `exception/net`        | збої автентифікації                                   |

Ієрархія, прийоми перехоплення й таблиця «яка функція що кидає» — у [](exception-handling.md). Ця сторінка про те,
як користуватися класами у власному коді.

## Розширення ієрархії

Скрипт із власними збоями може ввійти в ієрархію, а не кидати голі `Error`. Для всього, що виникає під час роботи,
успадковуйте `RuntimeException`:

```typescript
import { RuntimeException } from "apps-script-utils";

export class QuotaExceededException extends RuntimeException {}
```

Це весь клас. `Exception` задає `name` з `new.target`, тому підклас повідомляє власне ім'я без власного
конструктора:

```typescript
const error = new QuotaExceededException("daily email quota reached");

error.name; // "QuotaExceededException"
error.getMessage(); // "daily email quota reached"
Object.prototype.toString.call(error); // "[object QuotaExceededException]"
```

Він же успадковує поведінку, важливу в місці перехоплення: `Exception.isException()` його розпізнає, а
`instanceof RuntimeException` істинне.

## Загортання впійманої помилки

Будь-який конструктор приймає наявну `Error` і перевикористовує її повідомлення — початковий текст зберігається, а
тип змінюється:

```typescript
import { RuntimeException } from "apps-script-utils";

try {
  UrlFetchApp.fetch(endpoint);
} catch (error) {
  throw new RuntimeException(error);
}
```

## Вибір класу

Віддавайте перевагу наявному класу, якщо він підходить: той, хто вже обробляє `IllegalArgumentException`, обробить і
ваш випадок:

| Ситуація                                          | Клас                                                              |
| :------------------------------------------------ | :---------------------------------------------------------------- |
| Аргумент не того типу або поза діапазоном         | `IllegalArgumentException`                                        |
| Обов'язкове значення виявилося `null`/`undefined` | `NullPointerException`                                            |
| Рядковий аргумент виявився порожнім               | `EmptyStringException`                                            |
| Облікові дані відсутні або відхилені              | `AuthenticationException`                                         |
| Залежність так і не було налаштовано              | `ServiceIsNotDefinedException`, `RepositoryIsNotDefinedException` |

## Повний список

[](reference-exception.md) перелічує всі класи з посиланням на вихідний код.

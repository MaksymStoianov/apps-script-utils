# net

<link-summary>Помічники для URL, шляхів і доменів.</link-summary>

<web-summary>Модуль net в apps-script-utils: перевірка URL, розбір, склеювання та нормалізація шляхів, перевірка доменів — усе це працює й усередині Google Apps Script.</web-summary>

`net` — це шляхи, URL і все навколо них. Як і `lang`, він не залежить від середовища виконання Apps Script.

## Пакети

| Пакет         | Містить                                                |
| :------------ | :----------------------------------------------------- |
| `net/path`    | склеювання, нормалізацію, розбір і класифікацію шляхів |
| `net/url`     | перевірку URL                                          |
| `net/emitter` | зарезервований, поки не реалізований                   |

Автентифікація запитів живе в `appsscript/net`, а не тут, бо вона прив'язана до об'єкта запиту Apps Script —
дивіться [](module-appsscript.md).

## Шляхи

```typescript
import { join, normalize, parse, isAbsolute, isRelative } from "apps-script-utils";

join("/a", "b", "../c"); // "/a/c"
normalize("/a/b/../c"); // "/a/c"

parse("/a/b/file.txt");
// { root: "/", dir: "/a/b", base: "file.txt", name: "file", ext: ".txt" }

isAbsolute("/a/b"); // true
isRelative("a/b"); // true
```

Вони повторюють форму модуля `path` із Node, і це зручно для складання шляхів до папок Диска та й узагалі для коду,
якому треба зібрати місце розташування з частин без справжньої файлової системи під ним.

## Домени та URL

```typescript
import { isValidDomain, isUrl } from "apps-script-utils";

isValidDomain("example.com"); // true
isValidDomain("not a domain"); // false

isUrl("https://example.com/path"); // true
isUrl("ftp://ftp.example.org/file.txt"); // true
isUrl("invalid-url"); // false
isUrl("  https://example.com "); // false — навколишні пробіли не відкидаються
```

`isUrl` приймає схеми `http`, `https` і `ftp` та вимагає непорожній authority, тому гола схема на кшталт
`"https://"` не проходить. Ні `mailto:`, ні протокол-відносний `//example.com` він не приймає.

## Повний список

[](reference-path.md) перелічує функції `path`. `isUrl` наведено серед функцій, що не залежать від середовища
виконання, у [](reference-base.md).

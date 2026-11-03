<a name="top"></a>

![Баннер проекта Google Apps Script Utils](docs/assets/images/banner-1280x640.jpg)

<p align="right">
    <small>
        <i>Художница: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-utils&utm_content=banner-artist-credit" title="Портфолио художницы Дарины Михайленко">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](README.md) | [Українська](README.uk.md) | **Русский** | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [Português](README.pt.md) | [日本語](README.ja.md) | [中文](README.zh.md)

> Этот перевод выполнен с помощью ИИ по [README.md](README.md) для версии 2.1.1. Основной считается английская версия README; исправления приветствуются — см. [CONTRIBUTING.md](CONTRIBUTING.md#readme-translations).

# Утилиты для Google Apps Script™

<p align="left">
  <a href="https://www.npmjs.com/package/apps-script-utils"><img src="https://img.shields.io/npm/v/apps-script-utils?label=npm" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/apps-script-utils"><img src="https://img.shields.io/npm/dm/apps-script-utils?label=downloads" alt="npm downloads"></a>
  <a href="https://github.com/google/clasp"><img src="https://img.shields.io/badge/Built%20with-clasp-4285f4.svg" alt="Built with clasp"></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/bootgs/apps-script-utils?label=License" alt="License"></a>
  <a href="SECURITY.md"><img src="https://img.shields.io/badge/Security-Policy-brightgreen.svg" alt="Security Policy"></a>
  <a href="https://github.com/users/MaksymStoianov/projects/2/views/2"><img src="https://img.shields.io/badge/Roadmap-Board-blue.svg" alt="Roadmap"></a>
  <a href="https://github.com/bootgs/apps-script-utils/releases"><img src="https://img.shields.io/github/v/release/bootgs/apps-script-utils?label=Release" alt="Latest release"></a>
</p>

<p align="left">
  <a href="https://github.com/bootgs/apps-script-utils/stargazers"><img src="https://img.shields.io/github/stars/bootgs/apps-script-utils?style=social" alt="GitHub Stars"></a>
  <a href="https://github.com/bootgs/apps-script-utils/forks"><img src="https://img.shields.io/github/forks/bootgs/apps-script-utils?style=social" alt="GitHub Fork"></a>
  <a href="https://github.com/sponsors/MaksymStoianov"><img src="https://img.shields.io/github/sponsors/MaksymStoianov?style=social&logo=github" alt="GitHub Sponsors"></a>
</p>

<!-- TOC -->

- [Утилиты для Google Apps Script™](#утилиты-для-google-apps-script)
  - [Обзор](#обзор)
  - [Ключевые возможности](#ключевые-возможности)
  - [Навыки для ИИ-агентов](#навыки-для-ии-агентов)
  - [Требования](#требования)
  - [Установка](#установка)
  - [Документация](#документация)
  - [Примеры использования](#примеры-использования)
  - [Разработка](#разработка)
    - [Скрипты](#скрипты)
    - [Тестирование](#тестирование)
  - [Структура проекта](#структура-проекта)
  - [Функции по категориям](#функции-по-категориям)
  - [Участие в разработке](#участие-в-разработке)
  - [Поддержка](#поддержка)
  - [Дорожная карта](#дорожная-карта)
  - [Журнал изменений](#журнал-изменений)
  - [Лицензия](#лицензия)
  <!-- TOC -->

## Обзор

**apps-script-utils** — это библиотека утилит на TypeScript, созданная специально для **Google Apps Script**. Она
собирает в одном хорошо документированном и полностью протестированном пакете вспомогательные функции, которые
каждый GAS-проект рано или поздно пишет вручную: работу с таблицами и нотацией A1, проверку типов и значений
(`isX`/`nonX`/`requireX`), преобразования строк и массивов, типизированные исключения и многое другое.

## Ключевые возможности

- **Создана для Google Apps Script** — спроектирована с учётом среды выполнения GAS и её ограничений, а не
  адаптирована из универсальной библиотеки для Node.js.
- **Широкий набор утилит** — вспомогательные функции для таблиц, UI, сети и Admin SDK наряду с универсальными
  утилитами для строк, массивов и объектов.
- **TypeScript в первую очередь** — каждая функция поставляется с полными определениями типов для автодополнения в
  IDE и безопасности на этапе компиляции.
- **Протестирована** — покрыта набором модульных тестов на Vitest.
- **Справочная документация со ссылками** — каждый тип Google Apps Script, используемый в API, ссылается напрямую на
  свою официальную документацию.
- **Единообразная обработка ошибок** — отдельная иерархия классов исключений заменяет произвольно брошенные ошибки.

## Навыки для ИИ-агентов

Для команд, работающих с ИИ-агентом для программирования (Claude Code, Gemini CLI и другие), репозиторий
[bootgs/skills](https://github.com/bootgs/skills) предоставляет Agent Skill
[`apps-script-utils`](https://github.com/bootgs/skills/tree/main/skills/apps-script-utils), описывающий эту
библиотеку для таких агентов: соглашение о проверках `isX`/`nonX`/`requireX`, вспомогательные функции для нотации A1
и листов, для строк, чисел и массивов, типизированные исключения, а также вспомогательные функции для HTML, JSON и
путей.

Установка в Claude Code:

```bash
/plugin marketplace add bootgs/skills
/plugin install apps-script-utils@bootgs-skills
```

Установка через CLI `npx skills`, который поддерживает разные агенты:

```bash
npx skills add bootgs/skills --skill apps-script-utils
```

После установки агент применяет навык автоматически, когда задача касается этой библиотеки.

## Требования

- [Node.js](https://nodejs.org/) v22.14.0 или новее
- [npm](https://www.npmjs.com/) (или другой менеджер пакетов для Node, например pnpm)

## Установка

Установите пакет через npm:

```bash
npm install apps-script-utils
```

## Документация

Полная документация опубликована по адресу **<https://bootgs.github.io/apps-script-utils/ru/>** —
руководства, обзоры отдельных модулей и полный справочник функций. Её исходники лежат в
[`docs/writerside-ru/`](docs/writerside-ru/) и пересобираются после каждого push в `main`.

Рекомендуемый порядок чтения:

- [Первые шаги](https://bootgs.github.io/apps-script-utils/ru/getting-started.html)
- [Соглашения о проверках](https://bootgs.github.io/apps-script-utils/ru/validation-conventions.html) —
  схема имён `isX`/`nonX`/`requireX`/`requireNonX`
- [Обработка исключений](https://bootgs.github.io/apps-script-utils/ru/exception-handling.html) — иерархия
  классов и причины каждого исключения
- [Среда выполнения Apps Script](https://bootgs.github.io/apps-script-utils/ru/apps-script-runtime.html) —
  какие вспомогательные функции привязаны к сервису Google и что это значит для тестирования

## Примеры использования

### Работа с листами

Эффективное добавление нескольких строк данных:

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

Проверка, есть ли у текущего пользователя права администратора:

```typescript
import { isAdmin } from "apps-script-utils";

if (isAdmin()) {
  Logger.log("Access granted to admin panel.");
} else {
  Logger.log("Access denied.");
}
```

### Разбор нотации A1

Разбор сложных нотаций A1 в структурированные объекты:

```typescript
import { parseA1Notation } from "apps-script-utils";

const rangeInfo = parseA1Notation("'Sheet1'!A1:B10");

console.log(rangeInfo.sheetName); // "Sheet1"
console.log(rangeInfo.startRowIndex); // 0
console.log(rangeInfo.endColumnIndex); // 2
```

## Разработка

### Скрипты

В `package.json` доступны следующие скрипты:

| Скрипт               | Описание                                                              |
| :------------------- | :-------------------------------------------------------------------- |
| `npm run build`      | Очищает каталог `dist` и компилирует исходный код TypeScript.         |
| `npm run dev`        | Запускает Vitest в режиме наблюдения.                                 |
| `npm test`           | Один раз запускает весь набор тестов.                                 |
| `npm run type:check` | Проверяет типы в проекте без генерации выходных файлов.               |
| `npm run lint`       | Проверяет код с помощью ESLint.                                       |
| `npm run lint:fix`   | Проверяет код и автоматически исправляет то, что может.               |
| `npm run format`     | Проверяет форматирование с помощью Prettier.                          |
| `npm run format:fix` | Форматирует код с помощью Prettier.                                   |
| `npm run prepare`    | Настраивает git-хуки Husky (запускается автоматически после install). |

### Тестирование

Для модульного тестирования проект использует [Vitest](https://vitest.dev/).

Запустить весь набор один раз:

```bash
npm test
```

Или запустить в режиме наблюдения во время разработки:

```bash
npm run dev
```

## Структура проекта

```text
.
├── config/           # Configuration files
├── dist/             # Compiled output (after build)
├── docs/             # Documentation: assets and the Writerside source
├── scripts/          # Maintenance and helper scripts
├── src/              # Source code
│   ├── appsscript/   # Google Apps Script specific utilities
│   ├── exception/    # Custom exception classes
│   ├── html/         # HTML utilities
│   ├── json/         # JSON utilities
│   ├── lang/         # Language-level utilities (array, string, etc.)
│   ├── net/          # Network and path utilities
│   ├── time/         # Time-related utilities
│   └── index.ts      # Main entry point
├── test/             # Unit tests
└── vitest.config.ts  # Vitest configuration
```

## Функции по категориям

Полный справочник функций переехал на сайт документации, который собирается из
[`docs/writerside-ru/`](docs/writerside-ru/) и публикуется после каждого push в `main`:

**<https://bootgs.github.io/apps-script-utils/ru/>**

| Раздел                                                                                               | Что охватывает                                                                              |
| :--------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| [Модуль Google Apps Script](https://bootgs.github.io/apps-script-utils/ru/reference-appsscript.html) | Sheets, Slides, Admin SDK, Drive, Docs, Forms, сетевые запросы и встроенные классы UI       |
| [Базовые утилиты](https://bootgs.github.io/apps-script-utils/ru/reference-base.html)                 | Проверка типов и значений, работа со строками, массивами и объектами, обработка JSON и HTML |
| [Исключения](https://bootgs.github.io/apps-script-utils/ru/reference-exception.html)                 | Типизированные классы исключений и причины каждого из них                                   |
| [Модуль `path`](https://bootgs.github.io/apps-script-utils/ru/reference-path.html)                   | Пути к файлам и URL                                                                         |
| [Абстракции и интерфейсы](https://bootgs.github.io/apps-script-utils/ru/reference-abstracts.html)    | Общие строительные блоки                                                                    |

Помимо справочника, на сайте есть руководства, которые не поместились бы в таблицы:
[соглашения о проверках](https://bootgs.github.io/apps-script-utils/ru/validation-conventions.html)
объясняют схему `isX`/`nonX`/`requireX`/`requireNonX` в одном месте,
[обработка исключений](https://bootgs.github.io/apps-script-utils/ru/exception-handling.html) описывает
иерархию классов, а [среда выполнения Apps Script](https://bootgs.github.io/apps-script-utils/ru/apps-script-runtime.html)
рассказывает, какие вспомогательные функции привязаны к сервису Google, чего это стоит и что это значит для
тестирования.

## Участие в разработке

Вклад приветствуется. Полное руководство — в [CONTRIBUTING.md](CONTRIBUTING.md). Вкратце:

1. Сделайте форк репозитория и создайте ветку для своей функции или исправления.
2. Добавьте или обновите тесты, покрывающие ваши изменения.
3. Перед коммитом запустите `npm run lint` и `npm run format`.
4. Не редактируйте `CHANGELOG.md` вручную — его автоматически генерирует [release-please](https://github.com/googleapis/release-please).
5. Откройте pull request с описанием того, что изменилось и почему.

Придерживайтесь существующего стиля кода и соглашений об именах. Правила сообщества — в
[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Поддержка

- Чтобы сообщить об ошибке или предложить функцию, найдите или откройте
  [issue](https://github.com/bootgs/apps-script-utils/issues) на GitHub.
- Последние изменения — в [журнале изменений](CHANGELOG.md).
- Чтобы сообщить об уязвимости, следуйте [политике безопасности](SECURITY.md), а не открывайте публичный issue.
- Поддержать дальнейшую разработку можно через [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov).

## Дорожная карта

Что запланировано, что в работе, а что уже сделано — на [доске проекта](https://github.com/users/MaksymStoianov/projects/2/views/2),
которая строится из самого трекера issues. Отдельного документа с дорожной картой, который мог бы с ней разойтись,
нет: чтобы что-то предложить, откройте [issue](https://github.com/bootgs/apps-script-utils/issues).

## Журнал изменений

Подробный список изменений по версиям — в [CHANGELOG.md](CHANGELOG.md).

## Лицензия

Проект распространяется по лицензии Apache License 2.0. Подробности — в [LICENSE](LICENSE).

Иллюстрация баннера не подпадает под эту лицензию. Это работа её автора; её можно использовать без изменений,
указав автора со ссылкой, а условия описаны в [docs/assets/images/README.md](docs/assets/images/README.md).

## Товарные знаки

Google Apps Script, Google Sheets, Google Slides, Google Docs, Google Forms и Google Drive являются товарными знаками
Google LLC. Этот проект — независимая библиотека. Он не связан с Google LLC, не одобрен и не спонсируется ею, а
товарные знаки используются только для описания того, с чем работает библиотека.

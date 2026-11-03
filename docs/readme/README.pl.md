<a name="top"></a>

![Baner projektu Google Apps Script Utils](../assets/images/banner-1280x640.jpg)

<p align="right">
    <small>
        <i>Artystka: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-utils&utm_content=banner-artist-credit" title="Portfolio artystki Daryny Mikhailenko">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](../../README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [Português](README.pt.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | **Polski** | [Čeština](README.cs.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Bahasa Indonesia](README.id.md) | [Tiếng Việt](README.vi.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [简体中文](README.zh.md) | [繁體中文](README.zh-TW.md)

> To tłumaczenie powstało z pomocą AI na podstawie [README.md](../../README.md) dla wersji 2.1.1. Wersją wzorcową jest angielskie README; poprawki są mile widziane — zajrzyj do [CONTRIBUTING.md](../../CONTRIBUTING.md#readme-translations).

# Narzędzia dla Google Apps Script™

<p align="left">
  <a href="https://www.npmjs.com/package/@bootgs/utils"><img src="https://img.shields.io/npm/v/@bootgs/utils?label=npm" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/@bootgs/utils"><img src="https://img.shields.io/npm/dm/@bootgs/utils?label=downloads" alt="npm downloads"></a>
  <a href="https://github.com/google/clasp"><img src="https://img.shields.io/badge/Built%20with-clasp-4285f4.svg" alt="Built with clasp"></a>
  <a href="../../LICENSE"><img src="https://img.shields.io/github/license/bootgs/utils?label=License" alt="License"></a>
  <a href="../../SECURITY.md"><img src="https://img.shields.io/badge/Security-Policy-brightgreen.svg" alt="Security Policy"></a>
  <a href="https://github.com/users/MaksymStoianov/projects/2/views/2"><img src="https://img.shields.io/badge/Roadmap-Board-blue.svg" alt="Roadmap"></a>
  <a href="https://github.com/bootgs/utils/releases"><img src="https://img.shields.io/github/v/release/bootgs/utils?label=Release" alt="Latest release"></a>
</p>

<p align="left">
  <a href="https://github.com/bootgs/utils/stargazers"><img src="https://img.shields.io/github/stars/bootgs/utils?style=social" alt="GitHub Stars"></a>
  <a href="https://github.com/bootgs/utils/forks"><img src="https://img.shields.io/github/forks/bootgs/utils?style=social" alt="GitHub Fork"></a>
  <a href="https://github.com/sponsors/MaksymStoianov"><img src="https://img.shields.io/github/sponsors/MaksymStoianov?style=social&logo=github" alt="GitHub Sponsors"></a>
</p>

<!-- TOC -->

- [Narzędzia dla Google Apps Script™](#narzędzia-dla-google-apps-script)
  - [Przegląd](#przegląd)
  - [Najważniejsze funkcje](#najważniejsze-funkcje)
  - [Skills dla agentów AI](#skills-dla-agentów-ai)
  - [Wymagania](#wymagania)
  - [Instalacja](#instalacja)
  - [Dokumentacja](#dokumentacja)
  - [Przykłady użycia](#przykłady-użycia)
  - [Rozwój projektu](#rozwój-projektu)
    - [Skrypty](#skrypty)
    - [Testy](#testy)
  - [Struktura projektu](#struktura-projektu)
  - [Funkcje według kategorii](#funkcje-według-kategorii)
  - [Jak pomóc w rozwoju](#jak-pomóc-w-rozwoju)
  - [Wsparcie](#wsparcie)
  - [Plan rozwoju](#plan-rozwoju)
  - [Historia zmian](#historia-zmian)
  - [Licencja](#licencja)
  <!-- TOC -->

## Przegląd

**@bootgs/utils** to biblioteka narzędziowa w TypeScript stworzona specjalnie dla **Google Apps Script**. Zbiera
w jednym, dobrze udokumentowanym i w pełni przetestowanym pakiecie funkcje pomocnicze, które każdy projekt GAS
w końcu pisze ręcznie — operacje na arkuszach i notacji A1, walidację typów i wartości (`isX`/`nonX`/`requireX`),
przekształcenia ciągów znaków i tablic, typowane wyjątki i nie tylko.

## Najważniejsze funkcje

- **Stworzona dla Google Apps Script** — zaprojektowana z myślą o środowisku uruchomieniowym GAS i jego
  ograniczeniach, a nie zaadaptowana z ogólnej biblioteki Node.js.
- **Szeroki zakres narzędzi** — funkcje pomocnicze do arkuszy, UI, sieci i Admin SDK obok uniwersalnych narzędzi do
  ciągów znaków, tablic i obiektów.
- **Przede wszystkim TypeScript** — każda funkcja ma pełne definicje typów, co daje autouzupełnianie w IDE
  i bezpieczeństwo na etapie kompilacji.
- **Przetestowana** — objęta zestawem testów jednostkowych w Vitest.
- **Powiązana dokumentacja referencyjna** — każdy typ Google Apps Script używany w API prowadzi bezpośrednio do
  swojej oficjalnej dokumentacji.
- **Spójna obsługa błędów** — dedykowana hierarchia klas wyjątków zastępuje doraźnie rzucane błędy.

## Skills dla agentów AI

Dla zespołów korzystających z agenta AI do programowania (Claude Code, Gemini CLI i innych) repozytorium
[bootgs/skills](https://github.com/bootgs/skills) udostępnia Agent Skill
[`@bootgs/utils`](https://github.com/bootgs/skills/tree/main/skills/apps-script-utils), który opisuje tę bibliotekę
dla takich agentów, w tym konwencję walidacji `isX`/`nonX`/`requireX`, funkcje do notacji A1 i arkuszy, do ciągów
znaków, liczb i tablic, typowane wyjątki oraz funkcje do HTML, JSON i ścieżek.

Instalacja w Claude Code:

```bash
/plugin marketplace add bootgs/skills
/plugin install apps-script-utils@bootgs-skills
```

Instalacja za pomocą CLI `npx skills`, które obsługuje wielu agentów:

```bash
npx skills add bootgs/skills --skill apps-script-utils
```

Po instalacji agent automatycznie stosuje ten skill, gdy zadanie dotyczy tej biblioteki.

## Wymagania

- [Node.js](https://nodejs.org/) v22.14.0 lub nowszy
- [npm](https://www.npmjs.com/) (lub inny menedżer pakietów Node, np. pnpm)

## Instalacja

Zainstaluj pakiet przez npm:

```bash
npm install @bootgs/utils
```

## Dokumentacja

Pełna dokumentacja jest opublikowana pod adresem **<https://bootgs.github.io/utils/>** (po angielsku):
przewodniki, omówienia poszczególnych modułów i kompletna dokumentacja referencyjna funkcji. Jej źródła znajdują się
w [`docs/writerside/`](../writerside/) i są przebudowywane przy każdym pushu do `main`.

Dobra kolejność lektury:

- [Getting started](https://bootgs.github.io/utils/getting-started.html) — pierwsze kroki
- [Validation conventions](https://bootgs.github.io/utils/validation-conventions.html) — schemat
  nazewnictwa `isX`/`nonX`/`requireX`/`requireNonX`
- [Exception handling](https://bootgs.github.io/utils/exception-handling.html) — hierarchia klas
  i to, co wywołuje każdy wyjątek
- [The Apps Script runtime](https://bootgs.github.io/utils/apps-script-runtime.html) — które
  funkcje są powiązane z usługą Google i co to oznacza dla testowania

## Przykłady użycia

### Praca z arkuszami

Wydajne dopisywanie wielu wierszy danych:

```typescript
import { appendRows } from "@bootgs/utils";

const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
const data = [
  ["John Doe", "john@example.com", 28],
  ["Jane Smith", "jane@example.com", 32]
];

appendRows(sheet, data);
```

### Narzędzia Admin SDK

Sprawdzanie, czy bieżący użytkownik ma uprawnienia administratora:

```typescript
import { isAdmin } from "@bootgs/utils";

if (isAdmin()) {
  Logger.log("Access granted to admin panel.");
} else {
  Logger.log("Access denied.");
}
```

### Parsowanie notacji A1

Parsowanie złożonych zapisów w notacji A1 do ustrukturyzowanych obiektów:

```typescript
import { parseA1Notation } from "@bootgs/utils";

const rangeInfo = parseA1Notation("'Sheet1'!A1:B10");

console.log(rangeInfo.sheetName); // "Sheet1"
console.log(rangeInfo.startRowIndex); // 0
console.log(rangeInfo.endColumnIndex); // 2
```

## Rozwój projektu

### Skrypty

W `package.json` dostępne są następujące skrypty:

| Skrypt               | Opis                                                                     |
| :------------------- | :----------------------------------------------------------------------- |
| `npm run build`      | Czyści katalog `dist` i kompiluje kod źródłowy TypeScript.               |
| `npm run dev`        | Uruchamia Vitest w trybie obserwowania zmian.                            |
| `npm test`           | Jednorazowo uruchamia pełny zestaw testów.                               |
| `npm run type:check` | Sprawdza typy w projekcie bez generowania plików wynikowych.             |
| `npm run lint`       | Analizuje kod za pomocą ESLint.                                          |
| `npm run lint:fix`   | Analizuje kod i automatycznie poprawia to, co się da.                    |
| `npm run format`     | Sprawdza formatowanie za pomocą Prettier.                                |
| `npm run format:fix` | Formatuje kod za pomocą Prettier.                                        |
| `npm run prepare`    | Konfiguruje hooki Git Husky (uruchamia się automatycznie po instalacji). |

### Testy

Projekt używa [Vitest](https://vitest.dev/) do testów jednostkowych.

Jednorazowe uruchomienie pełnego zestawu:

```bash
npm test
```

Albo uruchomienie w trybie obserwowania zmian podczas pracy:

```bash
npm run dev
```

## Struktura projektu

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

## Funkcje według kategorii

Pełna dokumentacja referencyjna funkcji została przeniesiona na stronę dokumentacji, która jest budowana
z [`docs/writerside/`](../writerside/) i publikowana przy każdym pushu do `main`:

**<https://bootgs.github.io/utils/>**

| Sekcja                                                                                | Zawartość                                                                                             |
| :------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------- |
| [Google Apps Script module](https://bootgs.github.io/utils/reference-appsscript.html) | Sheets, Slides, Admin SDK, Drive, Docs, Forms, żądania sieciowe i wbudowane klasy UI                  |
| [Base utilities](https://bootgs.github.io/utils/reference-base.html)                  | Sprawdzanie typów i walidacja, operacje na ciągach znaków, tablicach i obiektach, obsługa JSON i HTML |
| [Exceptions](https://bootgs.github.io/utils/reference-exception.html)                 | Typowane klasy wyjątków i to, co wywołuje każdą z nich                                                |
| [`path` module](https://bootgs.github.io/utils/reference-path.html)                   | Ścieżki plików i adresy URL                                                                           |
| [Abstracts and interfaces](https://bootgs.github.io/utils/reference-abstracts.html)   | Wspólne elementy składowe                                                                             |

Oprócz dokumentacji referencyjnej strona zawiera przewodniki, które nie zmieściły się w tabelach:
[validation conventions](https://bootgs.github.io/utils/validation-conventions.html) objaśnia w jednym miejscu
schemat `isX`/`nonX`/`requireX`/`requireNonX`,
[exception handling](https://bootgs.github.io/utils/exception-handling.html) przedstawia hierarchię
klas, a [the Apps Script runtime](https://bootgs.github.io/utils/apps-script-runtime.html)
omawia, które funkcje są powiązane z usługą Google, ile to kosztuje i co oznacza dla testowania.

## Jak pomóc w rozwoju

Wkład w projekt jest mile widziany. Pełny przewodnik znajdziesz w [CONTRIBUTING.md](../../CONTRIBUTING.md). W skrócie:

1. Zrób fork repozytorium i utwórz gałąź dla swojej funkcji lub poprawki.
2. Dodaj lub zaktualizuj testy obejmujące Twoje zmiany.
3. Przed commitem uruchom `npm run lint` i `npm run format`.
4. Nie edytuj `CHANGELOG.md` ręcznie — jest generowany automatycznie przez [release-please](https://github.com/googleapis/release-please).
5. Otwórz pull request z opisem tego, co się zmieniło i dlaczego.

Trzymaj się istniejącego stylu kodu i konwencji nazewnictwa. Zasady społeczności opisuje
[CODE_OF_CONDUCT.md](../../CODE_OF_CONDUCT.md).

## Wsparcie

- W przypadku błędów lub propozycji nowych funkcji wyszukaj albo otwórz
  [issue](https://github.com/bootgs/utils/issues) na GitHubie.
- Ostatnie zmiany znajdziesz w [historii zmian](../../CHANGELOG.md).
- Aby zgłosić lukę w zabezpieczeniach, postępuj zgodnie z [polityką bezpieczeństwa](../../SECURITY.md), zamiast otwierać
  publiczne issue.
- Aby wesprzeć dalszy rozwój, zajrzyj na [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov).

## Plan rozwoju

To, co jest zaplanowane, w toku lub ukończone, widać na [tablicy projektu](https://github.com/users/MaksymStoianov/projects/2/views/2),
budowanej bezpośrednio z systemu zgłoszeń. Nie ma osobnego dokumentu z planem rozwoju, który mógłby się z nią
rozjechać: aby coś zaproponować, otwórz [issue](https://github.com/bootgs/utils/issues).

## Historia zmian

Szczegółową listę zmian w poszczególnych wersjach znajdziesz w [CHANGELOG.md](../../CHANGELOG.md).

## Licencja

Ten projekt jest udostępniany na licencji Apache License 2.0. Szczegóły znajdziesz w pliku [LICENSE](../../LICENSE).

Grafika banera nie jest objęta tą licencją. Jest dziełem jej autorki, może być ponownie wykorzystywana bez zmian
pod warunkiem podania autorki wraz z linkiem i podlega zasadom opisanym w
[docs/assets/images/README.md](../assets/images/README.md).

## Znaki towarowe

Google Apps Script, Google Sheets, Google Slides, Google Docs, Google Forms i Google Drive są znakami towarowymi
Google LLC. Ten projekt jest niezależną biblioteką. Nie jest powiązany z Google LLC ani przez nią popierany czy
sponsorowany, a znaki towarowe są używane wyłącznie do opisania, z czym współpracuje biblioteka.

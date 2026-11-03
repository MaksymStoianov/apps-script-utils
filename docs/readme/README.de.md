<a name="top"></a>

![Projektbanner für Google Apps Script Utils](../assets/images/banner-1280x640.jpg)

<p align="right">
    <small>
        <i>Künstlerin: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-utils&utm_content=banner-artist-credit" title="Portfolio der Künstlerin Daryna Mikhailenko">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](../../README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | **Deutsch** | [Français](README.fr.md) | [Español](README.es.md) | [Português](README.pt.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Polski](README.pl.md) | [Čeština](README.cs.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Bahasa Indonesia](README.id.md) | [Tiếng Việt](README.vi.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [简体中文](README.zh.md) | [繁體中文](README.zh-TW.md)

> Diese Übersetzung wurde mit KI-Unterstützung aus [README.md](../../README.md) für Version 2.1.1 erstellt. Maßgeblich ist die englische README; Korrekturen sind willkommen — siehe [CONTRIBUTING.md](../../CONTRIBUTING.md#readme-translations).

# Werkzeuge für Google Apps Script™

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

- [Werkzeuge für Google Apps Script™](#werkzeuge-für-google-apps-script)
  - [Überblick](#überblick)
  - [Wichtigste Merkmale](#wichtigste-merkmale)
  - [Skills für KI-Agenten](#skills-für-ki-agenten)
  - [Voraussetzungen](#voraussetzungen)
  - [Installation](#installation)
  - [Dokumentation](#dokumentation)
  - [Anwendungsbeispiele](#anwendungsbeispiele)
  - [Entwicklung](#entwicklung)
    - [Skripte](#skripte)
    - [Tests](#tests)
  - [Projektstruktur](#projektstruktur)
  - [Funktionen nach Kategorie](#funktionen-nach-kategorie)
  - [Mitwirken](#mitwirken)
  - [Unterstützung](#unterstützung)
  - [Roadmap](#roadmap)
  - [Änderungsprotokoll](#änderungsprotokoll)
  - [Lizenz](#lizenz)
  <!-- TOC -->

## Überblick

**@bootgs/utils** ist eine TypeScript-Bibliothek mit Hilfsfunktionen, die eigens für **Google Apps Script**
entwickelt wurde. Sie bündelt die Helfer, die jedes GAS-Projekt früher oder später von Hand schreibt — Arbeit mit
Tabellen und der A1-Notation, Typ- und Wertprüfungen (`isX`/`nonX`/`requireX`), Umwandlungen von Zeichenketten und
Arrays, typisierte Ausnahmen und mehr — in einem einzigen, gut dokumentierten und vollständig getesteten Paket.

## Wichtigste Merkmale

- **Für Google Apps Script gebaut** — auf die GAS-Laufzeit und ihre Einschränkungen ausgelegt, nicht von einer
  allgemeinen Node.js-Bibliothek übernommen.
- **Breite Abdeckung** — Helfer für Tabellen, UI, Netzwerk und das Admin SDK neben allgemeinen Werkzeugen für
  Zeichenketten, Arrays und Objekte.
- **TypeScript zuerst** — jede Funktion bringt vollständige Typdefinitionen mit, für Autovervollständigung in der IDE
  und Sicherheit zur Kompilierzeit.
- **Getestet** — durch eine Suite von Unit-Tests mit Vitest abgedeckt.
- **Verlinkte Referenzdokumentation** — jeder in der API verwendete Google-Apps-Script-Typ verweist direkt auf seine
  offizielle Dokumentation.
- **Einheitliche Fehlerbehandlung** — eine eigene Hierarchie von Ausnahmeklassen ersetzt ad hoc geworfene Fehler.

## Skills für KI-Agenten

Für Teams, die mit einem KI-Programmieragenten arbeiten (Claude Code, Gemini CLI und andere), stellt das Repository
[bootgs/skills](https://github.com/bootgs/skills) einen Agent Skill
[`@bootgs/utils`](https://github.com/bootgs/skills/tree/main/skills/apps-script-utils) bereit, der diese
Bibliothek für solche Agenten beschreibt — darunter die Prüfkonvention `isX`/`nonX`/`requireX`, die Helfer für die
A1-Notation und Tabellenblätter, für Zeichenketten, Zahlen und Arrays, die typisierten Ausnahmen sowie die Helfer für
HTML, JSON und Pfade.

Installation mit Claude Code:

```bash
/plugin marketplace add bootgs/skills
/plugin install apps-script-utils@bootgs-skills
```

Installation mit der CLI `npx skills`, die mehrere Agenten unterstützt:

```bash
npx skills add bootgs/skills --skill apps-script-utils
```

Nach der Installation wendet der Agent den Skill automatisch an, sobald eine Aufgabe diese Bibliothek betrifft.

## Voraussetzungen

- [Node.js](https://nodejs.org/) v22.14.0 oder neuer
- [npm](https://www.npmjs.com/) (oder ein anderer Paketmanager für Node, z. B. pnpm)

## Installation

Installieren Sie das Paket über npm:

```bash
npm install @bootgs/utils
```

## Dokumentation

Die vollständige Dokumentation ist unter **<https://bootgs.github.io/utils/de/>** veröffentlicht —
Anleitungen, Rundgänge durch die einzelnen Module und die komplette Funktionsreferenz. Ihre Quelle liegt in
[`docs/writerside-de/`](../writerside-de/) und wird bei jedem Push auf `main` neu gebaut.

Eine sinnvolle Lesereihenfolge:

- [Erste Schritte](https://bootgs.github.io/utils/de/getting-started.html)
- [Konventionen der Prüfungen](https://bootgs.github.io/utils/de/validation-conventions.html) —
  das Namensschema `isX`/`nonX`/`requireX`/`requireNonX`
- [Ausnahmebehandlung](https://bootgs.github.io/utils/de/exception-handling.html) — die
  Klassenhierarchie und wodurch jede Ausnahme ausgelöst wird
- [Die Apps-Script-Laufzeit](https://bootgs.github.io/utils/de/apps-script-runtime.html) — welche
  Helfer an einen Google-Dienst gebunden sind und was das für das Testen bedeutet

## Anwendungsbeispiele

### Arbeit mit Tabellen

Mehrere Datenzeilen effizient anhängen:

```typescript
import { appendRows } from "@bootgs/utils";

const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
const data = [
  ["John Doe", "john@example.com", 28],
  ["Jane Smith", "jane@example.com", 32]
];

appendRows(sheet, data);
```

### Werkzeuge für das Admin SDK

Prüfen, ob der aktuelle Benutzer Administratorrechte hat:

```typescript
import { isAdmin } from "@bootgs/utils";

if (isAdmin()) {
  Logger.log("Access granted to admin panel.");
} else {
  Logger.log("Access denied.");
}
```

### A1-Notation parsen

Komplexe A1-Notationen in strukturierte Objekte zerlegen:

```typescript
import { parseA1Notation } from "@bootgs/utils";

const rangeInfo = parseA1Notation("'Sheet1'!A1:B10");

console.log(rangeInfo.sheetName); // "Sheet1"
console.log(rangeInfo.startRowIndex); // 0
console.log(rangeInfo.endColumnIndex); // 2
```

## Entwicklung

### Skripte

In `package.json` stehen folgende Skripte zur Verfügung:

| Skript               | Beschreibung                                                                   |
| :------------------- | :----------------------------------------------------------------------------- |
| `npm run build`      | Leert das Verzeichnis `dist` und kompiliert den TypeScript-Quellcode.          |
| `npm run dev`        | Startet Vitest im Watch-Modus.                                                 |
| `npm test`           | Führt die gesamte Test-Suite einmal aus.                                       |
| `npm run type:check` | Prüft die Typen des Projekts, ohne Ausgabedateien zu erzeugen.                 |
| `npm run lint`       | Prüft den Code mit ESLint.                                                     |
| `npm run lint:fix`   | Prüft den Code und behebt automatisch, was sich beheben lässt.                 |
| `npm run format`     | Prüft die Formatierung mit Prettier.                                           |
| `npm run format:fix` | Formatiert den Code mit Prettier.                                              |
| `npm run prepare`    | Richtet die Git-Hooks von Husky ein (läuft nach der Installation automatisch). |

### Tests

Das Projekt verwendet [Vitest](https://vitest.dev/) für Unit-Tests.

Die gesamte Suite einmal ausführen:

```bash
npm test
```

Oder während der Entwicklung im Watch-Modus:

```bash
npm run dev
```

## Projektstruktur

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

## Funktionen nach Kategorie

Die vollständige Funktionsreferenz ist auf die Dokumentationsseite umgezogen, die aus
[`docs/writerside-de/`](../writerside-de/) gebaut und bei jedem Push auf `main` veröffentlicht wird:

**<https://bootgs.github.io/utils/de/>**

| Abschnitt                                                                                          | Inhalt                                                                                          |
| :------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- |
| [Modul Google Apps Script](https://bootgs.github.io/utils/de/reference-appsscript.html)            | Sheets, Slides, Admin SDK, Drive, Docs, Forms, Netzwerkanfragen und die eingebauten UI-Klassen  |
| [Basis-Werkzeuge](https://bootgs.github.io/utils/de/reference-base.html)                           | Typ- und Wertprüfungen, Arbeit mit Zeichenketten, Arrays und Objekten, Umgang mit JSON und HTML |
| [Ausnahmen](https://bootgs.github.io/utils/de/reference-exception.html)                            | Die typisierten Ausnahmeklassen und wodurch jede von ihnen ausgelöst wird                       |
| [Modul `path`](https://bootgs.github.io/utils/de/reference-path.html)                              | Dateipfade und URLs                                                                             |
| [Abstrakte Klassen und Schnittstellen](https://bootgs.github.io/utils/de/reference-abstracts.html) | Gemeinsame Bausteine                                                                            |

Neben der Referenz enthält die Seite die Anleitungen, für die in den Tabellen kein Platz war: Die
[Konventionen der Prüfungen](https://bootgs.github.io/utils/de/validation-conventions.html)
erklären das Schema `isX`/`nonX`/`requireX`/`requireNonX` an einer Stelle, die
[Ausnahmebehandlung](https://bootgs.github.io/utils/de/exception-handling.html) legt die
Klassenhierarchie dar, und [die Apps-Script-Laufzeit](https://bootgs.github.io/utils/de/apps-script-runtime.html)
behandelt, welche Helfer an einen Google-Dienst gebunden sind, was das kostet und was es für das Testen bedeutet.

## Mitwirken

Beiträge sind willkommen. Die vollständige Anleitung steht in [CONTRIBUTING.md](../../CONTRIBUTING.md). Kurz gefasst:

1. Forken Sie das Repository und legen Sie einen Branch für Ihr Feature oder Ihren Bugfix an.
2. Fügen Sie Tests hinzu oder passen Sie sie an, sodass Ihre Änderungen abgedeckt sind.
3. Führen Sie vor dem Commit `npm run lint` und `npm run format` aus.
4. Bearbeiten Sie `CHANGELOG.md` nicht von Hand — die Datei wird automatisch von [release-please](https://github.com/googleapis/release-please) erzeugt.
5. Öffnen Sie einen Pull Request, der beschreibt, was sich geändert hat und warum.

Halten Sie sich an den bestehenden Codestil und die Namenskonventionen. Die Regeln der Community stehen in
[CODE_OF_CONDUCT.md](../../CODE_OF_CONDUCT.md).

## Unterstützung

- Für Fehlermeldungen oder Feature-Wünsche suchen oder eröffnen Sie ein
  [Issue](https://github.com/bootgs/utils/issues) auf GitHub.
- Die jüngsten Änderungen finden Sie im [Änderungsprotokoll](../../CHANGELOG.md).
- Um eine Sicherheitslücke zu melden, folgen Sie der [Sicherheitsrichtlinie](../../SECURITY.md), statt ein öffentliches
  Issue zu eröffnen.
- Die weitere Entwicklung können Sie über [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov) unterstützen.

## Roadmap

Was geplant, in Arbeit oder erledigt ist, steht auf dem [Projektboard](https://github.com/users/MaksymStoianov/projects/2/views/2),
das direkt aus dem Issue-Tracker entsteht. Ein separates Roadmap-Dokument, das davon abweichen könnte, gibt es
nicht: Um etwas vorzuschlagen, eröffnen Sie ein [Issue](https://github.com/bootgs/utils/issues).

## Änderungsprotokoll

Eine ausführliche Liste der Änderungen nach Version finden Sie in [CHANGELOG.md](../../CHANGELOG.md).

## Lizenz

Dieses Projekt steht unter der Apache License 2.0. Einzelheiten finden Sie in [LICENSE](../../LICENSE).

Das Bannerbild fällt nicht unter diese Lizenz. Es ist das Werk seiner Urheberin, darf unverändert weiterverwendet
werden, sofern die Urheberin genannt und die Nennung verlinkt wird, und ist in
[docs/assets/images/README.md](../assets/images/README.md) geregelt.

## Marken

Google Apps Script, Google Sheets, Google Slides, Google Docs, Google Forms und Google Drive sind Marken der
Google LLC. Dieses Projekt ist eine unabhängige Bibliothek. Es ist weder mit der Google LLC verbunden noch von ihr
unterstützt oder gesponsert, und die Marken werden nur verwendet, um zu beschreiben, womit die Bibliothek arbeitet.

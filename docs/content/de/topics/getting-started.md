# Erste Schritte

<link-summary>Voraussetzungen, Installation und ein erstes lauffähiges Skript.</link-summary>

<web-summary>apps-script-utils in einem Google-Apps-Script-Projekt installieren: npm-Paket, clasp-Einrichtung und ein erstes Skript, das mit der Bibliothek ein Blatt liest.</web-summary>

## Voraussetzungen

- [Node.js](https://nodejs.org/) ab Version 22.14.0
- [npm](https://www.npmjs.com/) (oder ein anderer Node-Paketmanager, etwa pnpm)

## Installation

```bash
npm install apps-script-utils
```

Alles wird aus der Paketwurzel exportiert, ein einziger Importpfad deckt also die ganze Bibliothek ab:

```typescript
import { appendRows, isAdmin, parseA1Notation, requireString } from "apps-script-utils";
```

## Erste Beispiele

### Arbeiten mit Tabellen

Mehrere Datenzeilen in einem Zug anhängen:

```typescript
import { appendRows } from "apps-script-utils";

const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
const data = [
  ["John Doe", "john@example.com", 28],
  ["Jane Smith", "jane@example.com", 32]
];

appendRows(sheet, data);
```

### Admin-SDK-Werkzeuge

Prüfen, ob der aktuelle Nutzer Administratorrechte hat:

```typescript
import { isAdmin } from "apps-script-utils";

if (isAdmin()) {
  Logger.log("Access granted to admin panel.");
} else {
  Logger.log("Access denied.");
}
```

### A1-Notation zerlegen

Eine zusammengesetzte A1-Notation in ein strukturiertes Objekt überführen:

```typescript
import { parseA1Notation } from "apps-script-utils";

const rangeInfo = parseA1Notation("'Sheet1'!A1:B10");

console.log(rangeInfo.sheetName); // "Sheet1"
console.log(rangeInfo.startRowIndex); // 0
console.log(rangeInfo.endColumnIndex); // 2
```

## Eingaben prüfen

Die meisten Funktionen der Bibliothek weisen falsche Eingaben zurück, statt sie umzuwandeln. Die `requireX`-Familie
macht aus einem ungeprüften Wert einen typisierten — oder wirft:

```typescript
import { requireString, requireNonEmptyString } from "apps-script-utils";

function greet(name: unknown): string {
  return `Hello, ${requireNonEmptyString(name)}!`;
}

greet("Ada"); // "Hello, Ada!"
greet(""); // wirft EmptyStringException
greet(42); // wirft InvalidStringException
```

[](validation-conventions.md) erklärt das ganze Namensschema `isX` / `nonX` / `requireX` / `requireNonX`, und
[](exception-handling.md) behandelt die Ausnahmen, die diese Funktionen werfen.

## Wie es weitergeht

- [](validation-conventions.md) — die Namenskonvention, der der größte Teil der Bibliothek folgt.
- [](apps-script-runtime.md) — welche Helfer die Apps-Script-Laufzeit brauchen und was das fürs Testen bedeutet.
- [](reference-base.md) — die vollständige Liste der laufzeitunabhängigen Funktionen.
- [](reference-appsscript.md) — die vollständige Liste der dienstgebundenen Funktionen.

# appsscript

<link-summary>Die Google-Apps-Script-Helfer: Tabellen, A1-Notation, Oberfläche, Drive und das Admin SDK.</link-summary>

<web-summary>Das appsscript-Modul von apps-script-utils: Helfer für Tabellen und A1-Notation, Blattprüfungen, Oberfläche, Drive, Slides und Admin SDK für Google Apps Script.</web-summary>

`appsscript` enthält alles, was einen Google-Dienst berührt. Es ist der Teil der Bibliothek, der nur innerhalb der
Apps-Script-Laufzeit läuft — was das beim Testen bedeutet, steht in [](apps-script-runtime.md).

## Pakete

| Paket                                                   | Enthält                                                           |
| :------------------------------------------------------ | :---------------------------------------------------------------- |
| `appsscript/base`                                       | allgemeine Helfer, die die Dienstpakete gemeinsam nutzen          |
| `appsscript/admin`                                      | den Admin-SDK-Directory-Dienst                                    |
| `appsscript/sheet`                                      | Tabellen: Zeilen, Spalten, A1-Notation, `GridRange`, Typprüfungen |
| `appsscript/slide`                                      | Präsentationen: Folien finden, Text ersetzen, Markdown umwandeln  |
| `appsscript/net`                                        | die Authentifizierung von Anfragen                                |
| `appsscript/ui`                                         | die eingebauten Klassen `Ui`, `HtmlOutput` und `TextOutput`       |
| `appsscript/doc`, `appsscript/drive`, `appsscript/form` | reserviert, noch nicht umgesetzt                                  |

## A1-Notation

`parseA1Notation` macht aus einer Notationszeichenkette einen `GridRange` — ein einfaches Objekt mit nullbasierten,
halboffenen Grenzen, wie die Sheets-API sie führt, und nicht mit den einsbasierten Positionen, die `Range`-Methoden
nehmen:

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

Offene Notationen werden ebenfalls gelesen: `"5:15"` lässt die Spaltengrenzen offen, `"M:X"` die Zeilengrenzen.

`toA1Notation` ist die Umkehrung:

```typescript
import { toA1Notation } from "apps-script-utils";

toA1Notation({ startRowIndex: 0, endRowIndex: 10, startColumnIndex: 0, endColumnIndex: 2 });
// "A1:B10"
```

`parseA1Notations` nimmt eine durch Kommas getrennte Liste und gibt je Eintrag einen `GridRange` zurück:

```typescript
import { parseA1Notations } from "apps-script-utils";

parseA1Notations("Sheet1!A1:B2, Sheet1!D1"); // zwei GridRange-Objekte
```

Der Blattname lässt sich lesen, ersetzen oder entfernen, ohne neu zu zerlegen:

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

## Spalten

Zwei Zählweisen sind im Spiel, und die Funktionsnamen sagen, welche sie liefern. Ein _Index_ zählt ab null, wie in
einem `GridRange`; eine _Position_ ab eins, wie bei `Sheet.getRange()`:

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

## Bereiche vergleichen

`GridRange`-Objekte lassen sich ohne Dienstaufruf vergleichen:

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
isCellGridRange(header); // false — er umfasst fünf Spalten
```

## Zeilen und Spalten schreiben

```typescript
import { appendRows, prependRows, appendColumns } from "apps-script-utils";

const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");

appendRows(sheet, [
  ["John Doe", "john@example.com", 28],
  ["Jane Smith", "jane@example.com", 32]
]);

prependRows(sheet, [["Name", "Email", "Age"]]);
```

Sie schreiben in einem Aufruf statt Zeile für Zeile — das ist der Unterschied zwischen einem Dienstaufruf und einem
je Zeile. Alle Zeilen müssen gleich lang sein; `isConsistent2DArray` aus [](module-lang.md) ist die Prüfung davor.

## Typprüfungen für Dienstobjekte

Dieselbe Konvention wie im Rest der Bibliothek, angewandt auf die Apps-Script-Klassen:

```typescript
import { isSheet, isSpreadsheet, isRange, requireSheet } from "apps-script-utils";

function rowCount(value: unknown): number {
  return requireSheet(value).getLastRow();
}
```

`requireSheet`, `requireSpreadsheet` und `requireRange` werfen `InvalidSheetException`,
`InvalidSpreadsheetException` beziehungsweise `InvalidRangeException` — siehe [](exception-handling.md).

## Präsentationen

```typescript
import { getSlideByIndex, findReplaceAllTextInSlide, requireSlide } from "apps-script-utils";

const presentation = SlidesApp.getActivePresentation();

// getSlideByIndex gibt null zurück, wenn der Index außerhalb liegt; dort, wo
// eine fehlende Folie das Skript anhalten soll, kombiniert man es mit requireSlide.
const slide = requireSlide(getSlideByIndex(presentation, 0));

findReplaceAllTextInSlide(slide, "{{name}}", "Ada Lovelace");
```

`findReplaceAllTextInSlide` gibt die Zahl der Ersetzungen zurück und achtet standardmäßig auf Groß- und
Kleinschreibung; mit `false` als viertem Argument sucht es ohne. `requireSlide` wirft `SlideNotFoundException`, wenn
der Wert keine Folie ist.

## Admin SDK

```typescript
import { isAdmin } from "apps-script-utils";

if (isAdmin()) {
  Logger.log("Access granted to admin panel.");
}
```

`isAdmin` antwortet mit `false`, wenn der Admin-SDK-Directory-Dienst im Projekt nicht aktiviert ist, und
protokolliert den Grund, statt zu werfen. Der Aufruf ist damit auch beim Aufbau eines Menüs sicher, aber ein `false`
beweist für sich genommen nicht, dass der Nutzer kein Administrator ist. Aktivieren Sie den erweiterten Dienst,
bevor Sie sich auf die Antwort verlassen.

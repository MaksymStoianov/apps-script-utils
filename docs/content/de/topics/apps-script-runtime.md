# Die Apps-Script-Laufzeit

<link-summary>Welche Funktionen die Apps-Script-Laufzeit brauchen und welche überall laufen.</link-summary>

<web-summary>Welche Teile von @bootgs/utils von Google-Apps-Script-Diensten abhängen und welche in Node.js oder einer Testsuite laufen — und was das fürs Testen des eigenen Codes bedeutet.</web-summary>

Die Bibliothek ist ein Paket, aber ihre Funktionen laufen nicht alle an denselben Orten. Auf welcher Seite der Linie
eine Funktion steht, entscheidet, ob sie sich als Unit testen lässt und ob sie einen Dienstaufruf kostet.

## Zwei Arten von Funktion

**Laufzeitunabhängige** Funktionen sind gewöhnliches JavaScript. Sie nehmen Werte, geben Werte zurück und greifen
nie nach einer globalen Variablen. Dazu gehört alles in `lang`, `net`, `json`, `html`, `time` und `exception`, und
ebenso die Teile von `appsscript`, die nur Zeichenketten und einfache Objekte umformen — die A1-Zerleger, die
Spaltenbuchstaben-Umrechnungen und die `GridRange`-Vergleiche.

**Dienstgebundene** Funktionen greifen selbst nach einem globalen Dienst. Sie funktionieren nur in einem Skript mit
den nötigen Berechtigungen und in Node gar nicht. Das ist derzeit die ganze Liste:

| Funktion                              | Greift nach                                                               | Benötigter Bereich                                |
| :------------------------------------ | :------------------------------------------------------------------------ | :------------------------------------------------ |
| `isAdmin`, `nonAdmin`, `requireAdmin` | `Session.getActiveUser`, `AdminDirectory.Users`                           | `userinfo.email`, `admin.directory.user.readonly` |
| `checkMultipleAccount`                | `Session.getEffectiveUser`                                                | `userinfo.email`                                  |
| `getSheetById`, `getSheetByIndex`     | `SpreadsheetApp.getActiveSpreadsheet`, wenn keine Tabelle übergeben wird  | `spreadsheets.currentonly`                        |
| `getSlideByIndex`, `getSlideIndex`    | `SlidesApp.getActivePresentation`, wenn keine Präsentation übergeben wird | `presentations.currentonly`                       |
| `createFolder`                        | `DriveApp.getRootFolder`, wenn kein übergeordneter Ordner übergeben wird  | `drive`                                           |
| `getTriggerById`                      | `ScriptApp.getProjectTriggers`                                            | `script.scriptapp`                                |
| `appendRows`, `prependRows`           | `LockService.getDocumentLock`                                             | keiner für die Sperre                             |
| `appendRow`, `prependRow`             | `LockService.getDocumentLock`, über die beiden Funktionen darüber         | keiner für die Sperre                             |
| `appendColumns`, `prependColumns`     | `LockService.getDocumentLock`                                             | keiner für die Sperre                             |
| `appendColumn`, `prependColumn`       | `LockService.getDocumentLock`, über die beiden Funktionen darüber         | keiner für die Sperre                             |
| `highlightHtml`                       | `SpreadsheetApp.newTextStyle`, `SpreadsheetApp.newRichTextValue`          | keiner für die Builder                            |
| `insertSchema`                        | `SpreadsheetApp.newDataValidation`                                        | keiner für den Builder                            |
| `deleteRowsByConditional`             | `SpreadsheetApp.Dimension`                                                | keiner für die Aufzählung                         |
| `deleteColumnsByConditional`          | `SpreadsheetApp.Dimension`                                                | keiner für die Aufzählung                         |
| `convertRichTextToHtml`               | `Utilities.formatString`                                                  | keiner                                            |
| `retry`                               | `Utilities.sleep`, wenn vorhanden                                         | keiner                                            |

Die Bereiche stehen ohne das Präfix `https://www.googleapis.com/auth/`. „Keiner“ heißt, dass das globale Objekt
selbst keine Autorisierung braucht; das Blatt, der Bereich oder der Ordner, den die Funktion erhält, braucht trotzdem
den Bereich des Dienstes, aus dem er stammt — dazu der nächste Abschnitt.

Alles Übrige in `appsscript` nimmt das Dienstobjekt als Argument: `appendRows` schreibt in das `Sheet`, das Sie ihm
geben, und `requireSheet` betrachtet den übergebenen Wert, statt selbst einen zu holen. Solche Funktionen brauchen
ein lebendes Dienstobjekt, um nützlich zu sein, suchen aber keines — genau das macht sie im Test ersetzbar.

## OAuth-Bereiche

Apps Script entscheidet, welche Bereiche es anfordert, indem es den Code des ganzen Projekts durchsucht, die
Bibliothek eingeschlossen. Ein Projekt, das die Bibliothek vollständig einbindet, kann den Nutzer daher um mehr bitten,
als es tatsächlich verwendet. Tragen Sie die Bereiche deshalb selbst in `appsscript.json` ein: Sobald `oauthScopes`
vorhanden ist, fordert Apps Script genau diese an und keine anderen.

| Was Ihr Code aufruft                                                                                                               | Engster Bereich                                   | Breitere Alternative                          |
| :--------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------ | :-------------------------------------------- |
| Jede Funktion, die ein `Sheet`, `Range`, `Spreadsheet` oder `RichTextValue` aus der gebundenen Tabelle erhält                      | `spreadsheets.currentonly`                        | `spreadsheets`, für per ID geöffnete Tabellen |
| `getSheetById`, `getSheetByIndex` ohne Tabelle                                                                                     | `spreadsheets.currentonly`                        | `spreadsheets`                                |
| Jede Funktion, die eine `Slide` oder `Presentation` erhält, sowie `getSlideByIndex`, `getSlideIndex` ohne Präsentation             | `presentations.currentonly`                       | `presentations`                               |
| `createFolder`                                                                                                                     | `drive`                                           | —                                             |
| `getTriggerById`                                                                                                                   | `script.scriptapp`                                | —                                             |
| `checkMultipleAccount`                                                                                                             | `userinfo.email`                                  | —                                             |
| `isAdmin`, `nonAdmin`, `requireAdmin`                                                                                              | `userinfo.email`, `admin.directory.user.readonly` | `admin.directory.user`                        |
| Alles in `lang`, `net`, `json`, `html`, `time` und `exception` sowie die Helfer für A1-Notation, Spaltenbuchstaben und `GridRange` | keiner                                            | —                                             |

Ein an eine Tabelle gebundenes Skript, das nur mit dieser Tabelle arbeitet, braucht nicht mehr als das:

```json
{
  "timeZone": "Etc/UTC",
  "runtimeVersion": "V8",
  "oauthScopes": ["https://www.googleapis.com/auth/spreadsheets.currentonly"]
}
```

Was Sie vor dem Einschränken wissen sollten:

- **`*.currentonly`** deckt nur das Dokument ab, an das das Skript gebunden ist, oder das, in dem ein Add-on läuft.
  Ein Skript, das andere Tabellen oder Präsentationen per ID oder URL öffnet, braucht `spreadsheets` oder
  `presentations`.
- **`createFolder`** sucht zuerst vorhandene Ordner nach Namen und legt erst dann einen neuen an. Mit `drive.file`
  sieht ein Skript nur die Dateien und Ordner, die es selbst angelegt oder die der Nutzer damit geöffnet hat; die
  Suche übersieht also Ordner, die jemand anderes angelegt hat, und es entstehen Duplikate. Verwenden Sie
  `drive.file` nur, wenn das Skript den ganzen Baum selbst anlegt, sonst `drive`.
- **Die Admin-SDK-Funktionen** brauchen außerdem den im Projekt aktivierten erweiterten Dienst Admin SDK Directory
  (`dependencies.enabledAdvancedServices`, `serviceId` `admin`, `version` `directory_v1`) und einen Nutzer, der das
  Verzeichnis lesen darf. Der Lesebereich `admin.directory.user.readonly` genügt: `isAdmin` liest den Nutzer nur.
- **Ein fehlender Bereich** zeigt sich zur Laufzeit, als Autorisierungsfehler beim Dienstaufruf, nicht beim Speichern
  des Projekts. Führen Sie nach jeder Änderung an `oauthScopes` jeden Codepfad einmal aus.

Welchen Bereich eine Methode braucht, steht unter „Authorization“ auf ihrer Seite in der
[Apps-Script-Referenz](https://developers.google.com/apps-script/reference).

## An der Grenze bündeln

Jeder Dienstaufruf ist ein Hin und Zurück, und Apps Script rechnet ihn gegen das Zeitlimit. Die Schreibhelfer gibt
es deshalb: `appendRows` macht einen Aufruf, gleich wie viele Zeilen Sie übergeben, während eine Schleife mit
`appendRow` einen pro Zeile macht.

```typescript
// Ein Dienstaufruf.
appendRows(sheet, rows);

// Ein Dienstaufruf je Zeile; nur für ein einzelnes Anhängen sinnvoll.
for (const row of rows) {
  appendRow(sheet, row);
}
```

Dieselbe Überlegung gilt für die Prüfung. Prüfen Sie die Form der Daten, bevor sie den Dienst erreichen, nicht
danach:

```typescript
import { IllegalArgumentException, appendRows, isConsistent2DArray } from "@bootgs/utils";

if (!isConsistent2DArray(rows)) {
  throw new IllegalArgumentException("every row must have the same number of columns");
}

appendRows(sheet, rows);
```

`Range.setValues()` lehnt eine ungleichmäßige Matrix ab, doch der Fehlschlag kommt vom Dienst, ohne zu sagen, welche
Zeile falsch war. Vorher zu prüfen macht daraus einen Fehler, den Sie steuern.

## Kontingente

Apps Script setzt Kontingente je Skript und je Konto durch — Ausführungszeit, Aufrufe jedes Dienstes, Trigger,
URL-Abrufe und mehr. Die Bibliothek hebt sie weder an noch zählt sie mit; sie verringert nur die Zahl der Aufrufe.
Zwei Folgerungen, mit denen man planen sollte:

- Eine laufzeitunabhängige Funktion kostet nichts außer Rechenzeit. Verschieben Sie Prüfung und Umformung, wo immer
  es geht, auf diese Seite der Linie.
- Eine dienstgebundene Funktion kann aus Gründen scheitern, die nichts mit ihren Argumenten zu tun haben. Wirft
  `isAdmin` eine `AdminDirectoryException`, heißt das, dass der erweiterte Admin-SDK-Dienst im Projekt nicht
  aktiviert ist — nicht, dass der Nutzer kein Administrator wäre.

Die geltenden Grenzen stehen in
[Quotas for Google Services](https://developers.google.com/apps-script/guides/services/quotas).

## Testen

Die Testsuite läuft mit [Vitest](https://vitest.dev/) in Node, wo keine der Apps-Script-Globalen existiert. Genau
deshalb zählt die Trennung:

- **Laufzeitunabhängige Funktionen werden direkt als Unit getestet.** Sie machen den Großteil von `test/` aus,
  importiert über den `@/`-Alias.
- **Dienstgebundene nicht.** Ein Aufruf in Node wirft einen `ReferenceError` auf `SpreadsheetApp` oder die
  jeweilige Globale, sie werden daher von Hand gegen ein echtes Skriptprojekt geprüft. Die Funktionen, die bloß ein
  `Sheet` entgegennehmen, liegen dazwischen: sie lassen sich mit einem Stellvertreterobjekt in der Form der
  Dienstklasse ausführen.

```bash
npm test        # die Suite einmal laufen lassen
npm run dev     # Beobachtungsmodus
```

Wenn Sie eine Funktion hinzufügen, ist dies die erste Entwurfsfrage: kann sie das Dienstobjekt als Parameter nehmen,
statt eines zu holen? Wenn ja, wird sie testbar, und der Aufrufer behält die Kontrolle darüber, wie viele
Dienstaufrufe geschehen.

## Für beide Seiten schreiben

Die Bibliothek zielt auf die V8-Laufzeit. Zwei Gewohnheiten halten Code auf beiden Seiten der Linie lauffähig:

- **Nehmen Sie Dienstobjekte als Argumente.** `appendRows(sheet, rows)` funktioniert, woher das `Sheet` auch kommt;
  eine Funktion, die intern `SpreadsheetApp.getActiveSpreadsheet()` aufruft, funktioniert nur in einem gebundenen
  Skript.
- **Trennen Sie das Zerlegen vom Holen.** `parseA1Notation` ist reine Zeichenkettenarbeit, läuft in Node und ist
  deshalb als Unit getestet; `getSheetById` ist dieselbe Suche, nur gegen die aktive Tabelle ausgedrückt, und ist es
  nicht. Die Tabelle ausdrücklich zu übergeben — `getSheetById(id, spreadsheet)` — holt sie zurück über die Linie.

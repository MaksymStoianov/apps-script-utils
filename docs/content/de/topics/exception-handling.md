# Ausnahmebehandlung

<link-summary>Die Ausnahmehierarchie, wann welche Klasse geworfen wird und wie man sie fängt.</link-summary>

<web-summary>Typisierte Ausnahmen in apps-script-utils: die Hierarchie unter Exception, welche Prüfung welche Klasse wirft und wie man sie in einem Google-Apps-Script-Projekt fängt.</web-summary>

Jeder Fehler, den diese Bibliothek auslöst, ist eine Instanz der Klasse `Exception` oder einer ihrer Ableitungen.
Ein einziges `catch` kann daher die Fehlschläge der Bibliothek von allem anderen unterscheiden, was die Laufzeit
wirft.

## Die Hierarchie

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

Zwei Ebenen tragen Bedeutung. `Exception` ist die Wurzel und kennzeichnet einen Fehler als aus dieser Bibliothek
stammend. `RuntimeException` kennzeichnet ihn als während des Laufs entstanden, und jede konkrete Klasse erweitert
sie — ein `catch` auf `RuntimeException` fängt also alles, was die Bibliothek derzeit wirft.

## Fangen

`Exception` bietet eine statische Typprüfung an; sie ist die empfohlene Abfrage, weil sie den Typ zugleich verengt:

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

`instanceof` funktioniert ebenfalls und ist der Weg, einen einzelnen Fehlschlag zu fangen:

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

Jede Unterklasse setzt `name` in ihrem eigenen Konstruktor, `error.name` meldet daher die konkrete Klasse —
`"NullPointerException"`, nicht `"Exception"`.

## Erzeugen

Jede Ausnahme nimmt eine optionale Meldung entgegen: eine Zeichenkette, einen vorhandenen `Error`, dessen Meldung
übernommen wird, oder einen beliebigen anderen Wert, der ignoriert wird:

```typescript
throw new IllegalArgumentException("size must be a positive integer");
throw new IllegalArgumentException(caughtError); // übernimmt caughtError.message
throw new IllegalArgumentException(); // ohne Meldung
```

`Exception.create()` ist die entsprechende Fabrik, für die Fälle, in denen ein `new`-Ausdruck nicht passt.

Darunter sind es gewöhnliche `Error`-Objekte, `getMessage()`, `toString()` und
`Object.prototype.toString.call()` verhalten sich also wie erwartet:

```typescript
const error = new EmptyStringException("name is required");

error.getMessage(); // "name is required"
error.toString(); // "name is required"
Object.prototype.toString.call(error); // "[object EmptyStringException]"
```

## Was wirft was

| Ausnahme                          | Geworfen von                                                                                                                                                          |
| :-------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IllegalArgumentException`        | die `requireX`-Prüfungen für Arrays, Booleans, zählbare Zahlen, Funktionen, ganze Zahlen, Zahlen, Objekte, Skalare und Symbole sowie die meisten A1- und Blatt-Helfer |
| `InvalidStringException`          | `requireString` und das veraltete `nonEmptyString`                                                                                                                    |
| `EmptyStringException`            | `requireNonEmptyString`, `escapeRegExp`                                                                                                                               |
| `NullPointerException`            | `requireNonNull`                                                                                                                                                      |
| `InvalidEmailFormatException`     | `requireValidEmail`                                                                                                                                                   |
| `RepositoryIsNotDefinedException` | `requireRepository`                                                                                                                                                   |
| `ServiceIsNotDefinedException`    | `requireService`                                                                                                                                                      |
| `AuthenticationException`         | `requireValidToken`                                                                                                                                                   |
| `AdminDirectoryException`         | wird in `isAdmin` erzeugt, wenn der Admin-SDK-Directory-Dienst nicht aktiviert ist, und dort protokolliert statt weitergereicht                                       |
| `InvalidSheetException`           | `requireSheet`                                                                                                                                                        |
| `InvalidSpreadsheetException`     | `requireSpreadsheet`                                                                                                                                                  |
| `InvalidRangeException`           | `requireRange`                                                                                                                                                        |
| `InvalidGridRangeException`       | `toA1Notation` und die `GridRange`-Vergleichshelfer                                                                                                                   |
| `SlideNotFoundException`          | `requireSlide`                                                                                                                                                        |

[](reference-exception.md) listet jede Klasse samt Verweis auf ihren Quelltext.

## Die Art des Scheiterns wählen

Prädikate werfen nie, Behauptungen immer. Wozu man greift, hängt davon ab, ob die schlechte Eingabe erwartet ist:

```typescript
// Erwartet: ein Formularfeld darf legitim leer sein.
if (nonEmpty(response)) {
  process(response);
}

// Unerwartet: ein fehlendes Blatt ist eine kaputte Konfiguration, kein zu behandelnder Fall.
const sheet = requireNonNull(spreadsheet.getSheetByName("Data"), "sheet 'Data' is missing");
```

Das optionale Argument `message` ist die Tastenanschläge wert — es ist der einzige Zusammenhang, den ein Leser des
Ausführungsprotokolls bekommt.

# appsscript

<link-summary>Les aides Google Apps Script : feuilles de calcul, notation A1, interface, Drive et Admin SDK.</link-summary>

<web-summary>Le module appsscript d'apps-script-utils : aides pour les feuilles et la notation A1, validation de feuille, interface, Drive, Slides et Admin SDK pour Google Apps Script.</web-summary>

`appsscript` rassemble tout ce qui touche à un service Google. C'est la partie de la bibliothèque qui ne s'exécute
qu'à l'intérieur de l'environnement Apps Script — voir [](apps-script-runtime.md) pour ce que cela implique lors des
tests.

## Paquets

| Paquet                                                  | Couvre                                                              |
| :------------------------------------------------------ | :------------------------------------------------------------------ |
| `appsscript/base`                                       | les aides générales partagées par les paquets de service            |
| `appsscript/admin`                                      | le service Admin SDK Directory                                      |
| `appsscript/sheet`                                      | Sheets : lignes, colonnes, notation A1, `GridRange`, gardes de type |
| `appsscript/slide`                                      | Slides : recherche de diapositives, remplacement de texte, Markdown |
| `appsscript/net`                                        | l'authentification des requêtes                                     |
| `appsscript/ui`                                         | les classes intégrées `Ui`, `HtmlOutput` et `TextOutput`            |
| `appsscript/doc`, `appsscript/drive`, `appsscript/form` | réservés, pas encore implémentés                                    |

## Notation A1

`parseA1Notation` transforme une chaîne de notation en `GridRange` — un objet simple aux bornes à base zéro et
demi-ouvertes, conformes à l'API Sheets plutôt qu'aux positions à base un qu'attendent les méthodes de `Range` :

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

Les notations ouvertes s'analysent aussi : `"5:15"` laisse les bornes de colonnes libres, `"M:X"` celles de lignes.

`toA1Notation` fait l'inverse :

```typescript
import { toA1Notation } from "apps-script-utils";

toA1Notation({ startRowIndex: 0, endRowIndex: 10, startColumnIndex: 0, endColumnIndex: 2 });
// "A1:B10"
```

`parseA1Notations` prend une liste séparée par des virgules et renvoie un `GridRange` par entrée :

```typescript
import { parseA1Notations } from "apps-script-utils";

parseA1Notations("Sheet1!A1:B2, Sheet1!D1"); // deux objets GridRange
```

Le nom de feuille peut être lu, remplacé ou retiré sans réanalyser :

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

## Colonnes

Deux systèmes de numérotation coexistent, et le nom des fonctions dit lequel elles renvoient. Un _indice_ part de
zéro, comme dans un `GridRange` ; une _position_ part de un, comme dans `Sheet.getRange()` :

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

## Comparer des plages

Les objets `GridRange` se comparent sans aller-retour vers le service :

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
isCellGridRange(header); // false — elle couvre cinq colonnes
```

## Écrire des lignes et des colonnes

```typescript
import { appendRows, prependRows, appendColumns } from "apps-script-utils";

const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");

appendRows(sheet, [
  ["John Doe", "john@example.com", 28],
  ["Jane Smith", "jane@example.com", 32]
]);

prependRows(sheet, [["Name", "Email", "Age"]]);
```

Elles écrivent en un seul appel plutôt que ligne par ligne : c'est la différence entre un aller-retour vers le
service et un par ligne. Toutes les lignes doivent avoir la même longueur — `isConsistent2DArray`, dans
[](module-lang.md), est le contrôle à faire d'abord.

## Gardes de type pour les objets de service

La même convention que dans le reste de la bibliothèque, appliquée aux classes Apps Script :

```typescript
import { isSheet, isSpreadsheet, isRange, requireSheet } from "apps-script-utils";

function rowCount(value: unknown): number {
  return requireSheet(value).getLastRow();
}
```

`requireSheet`, `requireSpreadsheet` et `requireRange` lèvent respectivement `InvalidSheetException`,
`InvalidSpreadsheetException` et `InvalidRangeException` — voir [](exception-handling.md).

## Slides

```typescript
import { getSlideByIndex, findReplaceAllTextInSlide, requireSlide } from "apps-script-utils";

const presentation = SlidesApp.getActivePresentation();

// getSlideByIndex renvoie null quand l'indice sort des limites ; on l'associe donc
// à requireSlide là où une diapositive absente doit arrêter le script.
const slide = requireSlide(getSlideByIndex(presentation, 0));

findReplaceAllTextInSlide(slide, "{{name}}", "Ada Lovelace");
```

`findReplaceAllTextInSlide` renvoie le nombre de remplacements effectués et respecte la casse par défaut ; passez
`false` en quatrième argument pour une recherche insensible à la casse. `requireSlide` lève
`SlideNotFoundException` lorsque la valeur n'est pas une diapositive.

## Admin SDK

```typescript
import { isAdmin } from "apps-script-utils";

if (isAdmin()) {
  Logger.log("Access granted to admin panel.");
}
```

`isAdmin` répond `false` lorsque le service Admin SDK Directory n'est pas activé pour le projet, en journalisant la
raison plutôt qu'en levant. L'appel est donc sûr même pendant la construction d'un menu, mais un `false` ne prouve
pas à lui seul que l'utilisateur n'est pas administrateur. Activez le service avancé avant de vous fier à la
réponse.

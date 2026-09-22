# Premiers pas

<link-summary>Prérequis, installation et un premier script qui fonctionne.</link-summary>

<web-summary>Installer apps-script-utils dans un projet Google Apps Script : paquet npm, configuration de clasp et un premier script qui lit une feuille avec la bibliothèque.</web-summary>

## Prérequis

- [Node.js](https://nodejs.org/) v22.14.0 ou plus récent
- [npm](https://www.npmjs.com/) (ou un autre gestionnaire de paquets Node, par exemple pnpm)

## Installation

```bash
npm install apps-script-utils
```

Tout est exporté depuis la racine du paquet : un seul chemin d'import couvre donc toute la bibliothèque.

```typescript
import { appendRows, isAdmin, parseA1Notation, requireString } from "apps-script-utils";
```

## Premiers exemples

### Travailler avec Sheets

Ajouter plusieurs lignes de données en une fois :

```typescript
import { appendRows } from "apps-script-utils";

const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
const data = [
  ["John Doe", "john@example.com", 28],
  ["Jane Smith", "jane@example.com", 32]
];

appendRows(sheet, data);
```

### Utilitaires Admin SDK

Vérifier si l'utilisateur courant dispose des droits d'administration :

```typescript
import { isAdmin } from "apps-script-utils";

if (isAdmin()) {
  Logger.log("Access granted to admin panel.");
} else {
  Logger.log("Access denied.");
}
```

### Analyse de la notation A1

Transformer une notation A1 composée en objet structuré :

```typescript
import { parseA1Notation } from "apps-script-utils";

const rangeInfo = parseA1Notation("'Sheet1'!A1:B10");

console.log(rangeInfo.sheetName); // "Sheet1"
console.log(rangeInfo.startRowIndex); // 0
console.log(rangeInfo.endColumnIndex); // 2
```

## Valider les entrées

La plupart des fonctions de la bibliothèque rejettent une entrée invalide plutôt que de la convertir. La famille
`requireX` transforme une valeur non vérifiée en valeur typée — ou lève :

```typescript
import { requireString, requireNonEmptyString } from "apps-script-utils";

function greet(name: unknown): string {
  return `Hello, ${requireNonEmptyString(name)}!`;
}

greet("Ada"); // "Hello, Ada!"
greet(""); // lève EmptyStringException
greet(42); // lève InvalidStringException
```

[](validation-conventions.md) explique tout le schéma de noms `isX` / `nonX` / `requireX` / `requireNonX`, et
[](exception-handling.md) couvre les exceptions que ces fonctions lèvent.

## Pour aller plus loin

- [](validation-conventions.md) — la convention de nommage que suit l'essentiel de la bibliothèque.
- [](apps-script-runtime.md) — quelles aides exigent l'environnement Apps Script, et ce que cela implique pour les tests.
- [](reference-base.md) — la liste complète des fonctions indépendantes de l'environnement.
- [](reference-appsscript.md) — la liste complète des fonctions liées aux services.

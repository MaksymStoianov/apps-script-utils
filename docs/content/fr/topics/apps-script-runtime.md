# L'environnement Apps Script

<link-summary>Quelles fonctions exigent l'environnement Apps Script et lesquelles s'exécutent partout.</link-summary>

<web-summary>Quelles parties d'apps-script-utils dépendent des services Google Apps Script et lesquelles tournent dans Node.js ou une suite de tests — et ce que cela implique pour tester votre code.</web-summary>

La bibliothèque est un seul paquet, mais ses fonctions ne s'exécutent pas toutes aux mêmes endroits. Le côté de la
ligne où se trouve une fonction décide si vous pouvez la tester unitairement et si elle coûte un appel de service.

## Deux sortes de fonctions

Les fonctions **indépendantes de l'environnement** sont du JavaScript ordinaire. Elles prennent des valeurs, en
renvoient, et ne vont jamais chercher une globale. Tout ce qui est dans `lang`, `net`, `json`, `html`, `time` et
`exception` en fait partie, ainsi que les parties d'`appsscript` qui ne transforment que des chaînes et des objets
simples : les analyseurs de notation A1, les conversions de lettres de colonne et les comparaisons de `GridRange`.

Les fonctions **liées à un service** vont chercher elles-mêmes un service global. Elles ne fonctionnent que dans un
script dont la portée est autorisée, et pas du tout dans Node. Voici la liste entière à ce jour :

| Fonction                | Globale utilisée                                                     |
| :---------------------- | :------------------------------------------------------------------- |
| `isAdmin`               | `Session.getActiveUser`, `AdminDirectory.Users`                      |
| `checkMultipleAccount`  | `Session.getEffectiveUser`                                           |
| `getSheetById`          | `SpreadsheetApp.getActiveSpreadsheet`, si aucun classeur n'est passé |
| `getSheetByIndex`       | `SpreadsheetApp.getActiveSpreadsheet`, si aucun classeur n'est passé |
| `highlightHtml`         | `SpreadsheetApp.newTextStyle`, `SpreadsheetApp.newRichTextValue`     |
| `convertRichTextToHtml` | `Utilities.formatString`                                             |

Tout le reste d'`appsscript` reçoit en argument l'objet de service sur lequel il agit : `appendRows` écrit dans le
`Sheet` que vous lui donnez, `requireSheet` examine la valeur reçue au lieu d'en chercher une. Ces fonctions ont
besoin d'un objet de service vivant pour servir à quelque chose, mais elles n'en cherchent jamais — et c'est ce qui
les rend remplaçables dans un test.

## Grouper à la frontière

Chaque appel de service est un aller-retour, et Apps Script le décompte de la limite de temps d'exécution. Les aides
d'écriture existent pour cela : `appendRows` fait un seul appel quel que soit le nombre de lignes, là où une boucle
appelant `appendRow` en fait un par ligne.

```typescript
// Un appel de service.
appendRows(sheet, rows);

// Un appel de service par ligne ; à éviter sauf pour un ajout unique.
for (const row of rows) {
  appendRow(sheet, row);
}
```

Le même raisonnement vaut pour la validation. Vérifiez la forme des données avant qu'elles n'atteignent le service,
pas après :

```typescript
import { IllegalArgumentException, appendRows, isConsistent2DArray } from "apps-script-utils";

if (!isConsistent2DArray(rows)) {
  throw new IllegalArgumentException("every row must have the same number of columns");
}

appendRows(sheet, rows);
```

`Range.setValues()` refuse un tableau irrégulier, mais l'échec vient du service sans dire quelle ligne était
fautive. Vérifier d'abord transforme cela en une erreur que vous maîtrisez.

## Quotas

Apps Script applique des quotas par script et par compte — temps d'exécution, appels à chaque service, déclencheurs,
requêtes URL, et davantage. La bibliothèque ne les relève ni ne les suit ; elle réduit seulement le nombre d'appels.
Deux conséquences à prévoir :

- Une fonction indépendante de l'environnement ne coûte que du CPU. Déplacez validation et transformation de ce
  côté-ci de la ligne chaque fois que possible.
- Une fonction liée à un service peut échouer pour des raisons étrangères à ses arguments. Si `isAdmin` lève
  `AdminDirectoryException`, c'est que le service avancé Admin SDK n'est pas activé pour le projet — pas que
  l'utilisateur ne soit pas administrateur.

Les limites en vigueur sont publiées dans
[Quotas for Google Services](https://developers.google.com/apps-script/guides/services/quotas).

## Tests

La suite tourne sous [Vitest](https://vitest.dev/) dans Node, où aucune des globales Apps Script n'existe. C'est
pourquoi la séparation compte :

- **Les fonctions indépendantes de l'environnement sont testées unitairement.** Elles forment l'essentiel de
  `test/`, importées via l'alias `@/`.
- **Celles liées à un service ne le sont pas.** Les appeler dans Node lève un `ReferenceError` sur `SpreadsheetApp`
  ou la globale concernée ; elles sont donc vérifiées à la main sur un vrai projet de script. Celles qui se
  contentent de recevoir un `Sheet` sont entre les deux : on peut les exercer avec un objet de substitution ayant la
  forme de la classe de service.

```bash
npm test        # exécuter la suite une fois
npm run dev     # mode surveillance
```

Quand vous ajoutez une fonction, c'est la première question de conception : peut-elle recevoir l'objet de service en
paramètre au lieu d'aller le chercher ? Si oui, elle devient testable, et l'appelant garde la main sur le nombre
d'appels de service.

## Écrire pour les deux côtés

La bibliothèque vise l'environnement V8. Deux habitudes gardent le code opérationnel des deux côtés de la ligne :

- **Recevez les objets de service en argument.** `appendRows(sheet, rows)` fonctionne d'où que vienne le `Sheet` ;
  une fonction qui appelle `SpreadsheetApp.getActiveSpreadsheet()` en interne ne fonctionne que dans un script lié.
- **Séparez l'analyse de la récupération.** `parseA1Notation` est du pur travail sur des chaînes, s'exécute dans
  Node et est donc testée unitairement ; `getSheetById` est la même recherche exprimée contre le classeur actif, et
  ne l'est pas. Passer le classeur explicitement — `getSheetById(id, spreadsheet)` — le ramène de l'autre côté.

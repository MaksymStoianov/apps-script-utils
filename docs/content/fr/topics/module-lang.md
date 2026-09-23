# lang

<link-summary>Les utilitaires de langage indépendants de l'environnement : gardes, tableaux, nombres, objets, chaînes.</link-summary>

<web-summary>Le module lang d'apps-script-utils : gardes de type, aides pour tableaux et matrices, classification des nombres, condensé d'objets et conversion de chaînes — le tout indépendant de l'environnement.</web-summary>

`lang` regroupe les utilitaires proches du langage — la partie de la bibliothèque qui ignore tout de Google Apps
Script et fonctionne partout où fonctionne JavaScript.

## Paquets

| Paquet        | Couvre                                                            |
| :------------ | :---------------------------------------------------------------- |
| `lang/base`   | les gardes `isX` / `nonX` / `requireX` pour les types intégrés    |
| `lang/array`  | les contrôles de forme des tableaux et les transformations        |
| `lang/number` | la classification et la conversion des nombres                    |
| `lang/object` | le condensé, la comparaison et l'accès par chemin dans les objets |
| `lang/string` | la casse, les validations et la comparaison de versions           |

À côté de `lang`, la bibliothèque livre `html`, `json` et `time`. Ils sont tout aussi indépendants de
l'environnement et figurent avec `lang` dans [](reference-base.md).

## Gardes de type

`lang/base` est le plus gros paquet et celui que presque tout code touche. Il est traité en entier dans
[](validation-conventions.md) ; en bref : `isX` et `nonX` répondent à une question, `requireX` valide et renvoie.

```typescript
import { requireString, toKebabCase } from "apps-script-utils";

function slugify(input: unknown): string {
  return toKebabCase(requireString(input));
}
```

## Tableaux

```typescript
import { chunk, transpose, is2DArray, isConsistent2DArray } from "apps-script-utils";

chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

transpose([
  ["a", "b"],
  ["c", "d"]
]); // [["a", "c"], ["b", "d"]]

is2DArray([[1], [2]]); // true
isConsistent2DArray([[1, 2], [3]]); // false — les lignes diffèrent en longueur
```

`isConsistent2DArray` est le contrôle à faire avant d'écrire dans une feuille : `Range.setValues()` exige des lignes
de même longueur, et un tableau irrégulier n'échoue qu'à la frontière du service, avec un message qui ne nomme pas
la ligne fautive.

## Nombres

```typescript
import { isCountable, isFloat, isInteger, toInteger } from "apps-script-utils";

isInteger(42); // true
isInteger(42.5); // false
isFloat(42.5); // true
isCountable(3); // true — un entier non négatif
isCountable(-1); // false
```

Les arguments de ligne et de colonne de l'API Sheets sont des quantités, pas des nombres quelconques : c'est à cela
que servent `isCountable` et `requireCountable`.

## Chaînes

Changement de casse :

```typescript
import { toCamelCase, toKebabCase, toSnakeCase, toProperCase } from "apps-script-utils";

toCamelCase("user name"); // "userName"
toKebabCase("User Name"); // "user-name"
toSnakeCase("User Name"); // "user_name"
toProperCase("user name"); // "User Name"
```

Validation :

```typescript
import { isEmail, isValidSlug, isValidVersion, requireValidEmail } from "apps-script-utils";

isEmail("ada@example.com"); // true
isValidSlug("my-post"); // true
isValidVersion("1.10.0"); // true

requireValidEmail(formResponse); // renvoie la valeur, ou lève InvalidEmailFormatException
```

Comparaison de versions, pour les scripts qui conditionnent un comportement à une version de bibliothèque :

```typescript
import { versionCompare, isVersionCompatible } from "apps-script-utils";

versionCompare("1.10.0", "1.9.0"); // 1
versionCompare("1.9.0", "1.10.0"); // -1
versionCompare("1.9.0", "1.9.0"); // 0
```

`escapeRegExp` rend sûre l'insertion d'une chaîne fournie par l'utilisateur dans un motif — utile chaque fois qu'un
terme de recherche vient d'une cellule ou d'un formulaire :

```typescript
import { escapeRegExp } from "apps-script-utils";

const pattern = new RegExp(escapeRegExp(searchTerm), "gi");
```

## Objets

```typescript
import { hashCode, objectToString } from "apps-script-utils";

objectToString([]); // "[object Array]"
objectToString(null); // "[object Null]"
hashCode("apps-script-utils"); // un condensé numérique stable
```

`objectToString` rapporte le tag interne plutôt que `String(value)` : c'est le moyen fiable de distinguer un tableau
d'une date et d'un objet simple — et le tag survit au passage d'un frame à l'autre, contrairement à `instanceof`.

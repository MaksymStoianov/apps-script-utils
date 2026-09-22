# exception

<link-summary>Les classes d'exception et comment les étendre.</link-summary>

<web-summary>Le module exception d'apps-script-utils : la classe de base Exception, les classes qui en dérivent, et comment ajouter la vôtre à la hiérarchie.</web-summary>

`exception` contient les classes d'erreur que lève le reste de la bibliothèque. Rien n'y dépend de l'environnement
Apps Script.

## Paquets

| Paquet                 | Couvre                                           |
| :--------------------- | :----------------------------------------------- |
| `exception`            | les classes de base et les exceptions générales  |
| `exception/appsscript` | les échecs des aides Sheets, Slides et Admin SDK |
| `exception/net`        | les échecs d'authentification                    |

La hiérarchie, les façons d'intercepter et le tableau indiquant quelle fonction lève quoi se trouvent dans
[](exception-handling.md). Cette page traite de l'usage des classes dans votre propre code.

## Étendre la hiérarchie

Un script qui a ses propres modes d'échec peut rejoindre la hiérarchie plutôt que de lever des `Error` nus. Pour
tout ce qui survient pendant l'exécution, dérivez de `RuntimeException` :

```typescript
import { RuntimeException } from "apps-script-utils";

export class QuotaExceededException extends RuntimeException {}
```

C'est toute la classe. `Exception` fixe `name` à partir de `new.target` : la sous-classe annonce donc son propre nom
sans constructeur à elle.

```typescript
const error = new QuotaExceededException("daily email quota reached");

error.name; // "QuotaExceededException"
error.getMessage(); // "daily email quota reached"
Object.prototype.toString.call(error); // "[object QuotaExceededException]"
```

Elle hérite aussi de ce qui compte au point d'interception : `Exception.isException()` la reconnaît, et
`instanceof RuntimeException` est vrai.

## Envelopper une erreur interceptée

Tout constructeur accepte une `Error` existante et en reprend le message : le texte d'origine est conservé, le type
change.

```typescript
import { RuntimeException } from "apps-script-utils";

try {
  UrlFetchApp.fetch(endpoint);
} catch (error) {
  throw new RuntimeException(error);
}
```

## Choisir une classe

Préférez une classe existante quand elle convient : qui traite déjà `IllegalArgumentException` traitera aussi votre
cas.

| Situation                                                  | Classe                                                            |
| :--------------------------------------------------------- | :---------------------------------------------------------------- |
| Un argument est du mauvais type ou hors intervalle         | `IllegalArgumentException`                                        |
| Une valeur requise valait `null` ou `undefined`            | `NullPointerException`                                            |
| Un argument texte était vide                               | `EmptyStringException`                                            |
| Une information d'identification manquait ou a été refusée | `AuthenticationException`                                         |
| Une dépendance n'a jamais été configurée                   | `ServiceIsNotDefinedException`, `RepositoryIsNotDefinedException` |

## Liste complète

[](reference-exception.md) liste chaque classe avec un lien vers son code source.

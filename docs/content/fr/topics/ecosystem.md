# Écosystème

<link-summary>Le framework boot.gs, bâti sur cette bibliothèque, et les Agent Skills qui apprennent aux agents IA à s'en servir.</link-summary>

<web-summary>Comment apps-script-utils s'articule avec le framework boot.gs pour Google Apps Script et avec les Agent Skills qui apprennent à Claude Code, Gemini CLI et Cursor à utiliser les deux.</web-summary>

La bibliothèque est utile à elle seule : on l'installe, on importe une fonction, c'est fait. Elle fait aussi partie
d'un petit écosystème pour le développement Google Apps Script, et deux voisins méritent d'être connus.

## Boot.gs — le framework applicatif

[Boot.gs](https://github.com/bootgs/boot) est un framework pour des applications Apps Script structurées. Il apporte
contrôleurs, décorateurs, injection de dépendances et une couche de routage au-dessus de `doGet` et `doPost`, dans
un environnement qui, seul, ne propose que des fonctions globales.

```bash
npm install bootgs
```

```typescript
import { Get, RestController } from "bootgs";

@RestController("api/sheet")
export class SheetController {
  @Get("active-range")
  getActiveRange(): string {
    return "This action returns the active sheet range.";
  }
}
```

**Le lien avec cette bibliothèque est une dépendance, pas une rivalité.** `bootgs` inscrit `apps-script-utils` parmi
ses dépendances d'exécution : un projet boot.gs dispose donc déjà de chaque fonction décrite ici, sans seconde
installation. C'est de ces gardes que sont faites sa validation de paramètres et sa résolution de services.

Que choisir :

| Ce dont vous avez besoin                                                               | Ce que vous prenez                    |
| :------------------------------------------------------------------------------------- | :------------------------------------ |
| Des aides dans un script existant — quelques fonctions, sans nouvelle architecture     | `apps-script-utils` seul              |
| Routage, contrôleurs, injection de dépendances, une application web avec des endpoints | `bootgs`, la bibliothèque est incluse |

## Agent Skills — apprendre cette bibliothèque à un agent IA

Si vous écrivez de l'Apps Script avec un agent IA, le dépôt [bootgs/skills](https://github.com/bootgs/skills) publie
des Agent Skills pour lui : des instructions empaquetées qu'un agent charge dès qu'une tâche touche au sujet
concerné. Elles fonctionnent dans Claude Code, Gemini CLI, Cursor et tout ce que prend en charge la CLI
`npx skills`.

Le catalogue se divise en deux :

| Skill                           | Couvre                                                                                         |
| :------------------------------ | :--------------------------------------------------------------------------------------------- |
| `apps-script-utils`             | cette bibliothèque : la convention `isX`/`nonX`/`requireX`, les gardes, les aides              |
| `apps-script-triggers`          | déclencheurs simples et installables, forme des événements, quotas                             |
| `apps-script-services`          | usage économe en quota de `SpreadsheetApp`, `PropertiesService`, `CacheService`, `LockService` |
| `apps-script-ui`                | menus, barres latérales, boîtes de dialogue et les pièges de `google.script.run`               |
| `apps-script-clasp-workflow`    | la CLI `clasp` : push, deploy, versions, environnements multiples                              |
| `bootgs-quickstart`, `bootgs-*` | le framework ci-dessus : structure de projet, architecture, validation, client, OpenAPI        |

Installation dans Claude Code :

```bash
/plugin marketplace add bootgs/skills
/plugin install apps-script@bootgs-skills
```

Installation dans n'importe quel agent pris en charge :

```bash
npx skills add bootgs/skills --skill apps-script-utils
```

Une fois installé, l'agent applique le skill de lui-même dès qu'une tâche concerne cette bibliothèque : il cesse de
deviner des noms de fonctions et utilise ceux qui existent, avec la convention de validation que la bibliothèque
suit réellement.

Un skill reste toutefois un résumé ; la référence, c'est ce site. En cas de désaccord, ce sont ces pages et le code
dont elles sont issues qui font foi.

# Présentation

<link-summary>Ce qu'est apps-script-utils, ce que la bibliothèque couvre et comment cette documentation est organisée.</link-summary>

<web-summary>apps-script-utils est une bibliothèque TypeScript pour Google Apps Script : aides aux feuilles de calcul et à la notation A1, validation isX/nonX/requireX et exceptions typées.</web-summary>

![Bannière du projet Google Apps Script Utils](banner-1280x640.jpg)

<p align="right"><small><i>Artiste : <a href="https://darynamikhailenko.com/?utm_source=docs&amp;utm_medium=overview&amp;utm_campaign=apps-script-utils&amp;utm_content=banner-artist-credit" title="Portfolio de Daryna Mikhailenko, l'artiste">Daryna Mikhailenko</a></i></small></p>

**apps-script-utils** est une bibliothèque TypeScript conçue spécifiquement pour **Google Apps Script**. Elle
rassemble dans un seul paquet testé ce que tout projet GAS finit par écrire à la main : manipulation des feuilles et
de la notation A1, validation des types et des valeurs (`isX`/`nonX`/`requireX`), transformations de chaînes et de
tableaux, exceptions typées, et le reste.

## Points clés

- **Conçue pour Google Apps Script** — pensée pour l'environnement GAS et ses contraintes, et non adaptée d'une
  bibliothèque Node.js générique.
- **Couverture large** — aides pour les feuilles, l'interface, le réseau et l'Admin SDK, aux côtés d'utilitaires
  généraux pour les chaînes, les tableaux et les objets.
- **TypeScript d'abord** — chaque fonction est livrée avec ses définitions de types, pour l'autocomplétion et la
  sécurité à la compilation.
- **Testée** — couverte par une suite de tests unitaires Vitest.
- **Référence liée** — chaque type Google Apps Script employé dans l'API pointe directement vers sa documentation
  officielle.
- **Gestion d'erreurs cohérente** — une hiérarchie de classes d'exception remplace les `throw new Error` dispersés.

## Organisation de cette documentation

- [](getting-started.md) — prérequis, installation et un premier script qui fonctionne.
- Les **guides** expliquent les idées qui traversent toute la bibliothèque : [](validation-conventions.md),
  [](exception-handling.md) et [](apps-script-runtime.md).
- Les **modules** décrivent chaque paquet et le montrent à l'œuvre : [](module-lang.md), [](module-appsscript.md),
  [](module-net.md) et [](module-exception.md).
- La **référence des fonctions** liste chaque fonction exportée, regroupée comme l'est le paquet lui-même :
  [](reference-appsscript.md), [](reference-base.md), [](reference-exception.md), [](reference-path.md) et
  [](reference-abstracts.md). Chaque ligne de ces tableaux mène à une page dédiée — signature, paramètres, valeur de
  retour, exceptions et exemples commentés — et chaque fonction, classe et type exporté en possède une.
- [](ecosystem.md) — le framework boot.gs, qui dépend de cette bibliothèque, et les Agent Skills qui apprennent à un
  agent IA à s'en servir.

Appuyez sur <shortcut>/</shortcut> sur n'importe quelle page du site pour ouvrir la recherche.

## Où la bibliothèque s'exécute

Le paquet se divise nettement en deux, et cette division détermine d'où une fonction peut être appelée :

| Partie                                             | Dépend de l'environnement Apps Script      | Où elle s'exécute               |
| :------------------------------------------------- | :----------------------------------------- | :------------------------------ |
| `lang`, `net`, `json`, `html`, `time`, `exception` | Non                                        | Apps Script, Node.js, les tests |
| `appsscript`                                       | Oui, pour les fonctions liées aux services | Apps Script uniquement          |

[](apps-script-runtime.md) détaille quelles fonctions relèvent de quel côté et ce que cela implique en pratique.

## Structure du projet

```text
.
├── config/           # Fichiers de configuration
├── dist/             # Résultat de la compilation
├── docs/             # Documentation : ressources et sources de ce site
├── scripts/          # Scripts de maintenance et utilitaires
├── src/              # Code source
│   ├── appsscript/   # Utilitaires Google Apps Script
│   ├── exception/    # Classes d'exception
│   ├── html/         # Utilitaires HTML
│   ├── json/         # Utilitaires JSON
│   ├── lang/         # Utilitaires de langage (tableaux, chaînes, etc.)
│   ├── net/          # Réseau et chemins
│   ├── time/         # Temps
│   └── index.ts      # Point d'entrée
├── test/             # Tests unitaires
└── vitest.config.ts  # Configuration Vitest
```

<a name="top"></a>

![Bannière du projet Google Apps Script Utils](docs/assets/images/banner-1280x640.jpg)

<p align="right">
    <small>
        <i>Artiste : <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-utils&utm_content=banner-artist-credit" title="Portfolio de l'artiste Daryna Mikhailenko">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | **Français** | [Español](README.es.md) | [Português](README.pt.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Polski](README.pl.md) | [Čeština](README.cs.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Bahasa Indonesia](README.id.md) | [Tiếng Việt](README.vi.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [简体中文](README.zh.md) | [繁體中文](README.zh-TW.md)

> Cette traduction a été réalisée avec l'aide de l'IA à partir de [README.md](README.md) pour la version 2.1.1. Le README anglais fait foi ; les corrections sont les bienvenues — voir [CONTRIBUTING.md](CONTRIBUTING.md#readme-translations).

# Utilitaires pour Google Apps Script™

<p align="left">
  <a href="https://www.npmjs.com/package/@bootgs/utils"><img src="https://img.shields.io/npm/v/@bootgs/utils?label=npm" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/@bootgs/utils"><img src="https://img.shields.io/npm/dm/@bootgs/utils?label=downloads" alt="npm downloads"></a>
  <a href="https://github.com/google/clasp"><img src="https://img.shields.io/badge/Built%20with-clasp-4285f4.svg" alt="Built with clasp"></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/bootgs/utils?label=License" alt="License"></a>
  <a href="SECURITY.md"><img src="https://img.shields.io/badge/Security-Policy-brightgreen.svg" alt="Security Policy"></a>
  <a href="https://github.com/users/MaksymStoianov/projects/2/views/2"><img src="https://img.shields.io/badge/Roadmap-Board-blue.svg" alt="Roadmap"></a>
  <a href="https://github.com/bootgs/utils/releases"><img src="https://img.shields.io/github/v/release/bootgs/utils?label=Release" alt="Latest release"></a>
</p>

<p align="left">
  <a href="https://github.com/bootgs/utils/stargazers"><img src="https://img.shields.io/github/stars/bootgs/utils?style=social" alt="GitHub Stars"></a>
  <a href="https://github.com/bootgs/utils/forks"><img src="https://img.shields.io/github/forks/bootgs/utils?style=social" alt="GitHub Fork"></a>
  <a href="https://github.com/sponsors/MaksymStoianov"><img src="https://img.shields.io/github/sponsors/MaksymStoianov?style=social&logo=github" alt="GitHub Sponsors"></a>
</p>

<!-- TOC -->

- [Utilitaires pour Google Apps Script™](#utilitaires-pour-google-apps-script)
  - [Présentation](#présentation)
  - [Fonctionnalités clés](#fonctionnalités-clés)
  - [Skills pour agents IA](#skills-pour-agents-ia)
  - [Prérequis](#prérequis)
  - [Installation](#installation)
  - [Documentation](#documentation)
  - [Exemples d'utilisation](#exemples-dutilisation)
  - [Développement](#développement)
    - [Scripts](#scripts)
    - [Tests](#tests)
  - [Structure du projet](#structure-du-projet)
  - [Fonctions par catégorie](#fonctions-par-catégorie)
  - [Contribuer](#contribuer)
  - [Assistance](#assistance)
  - [Feuille de route](#feuille-de-route)
  - [Journal des modifications](#journal-des-modifications)
  - [Licence](#licence)
  <!-- TOC -->

## Présentation

**@bootgs/utils** est une bibliothèque d'utilitaires en TypeScript conçue spécialement pour **Google Apps
Script**. Elle réunit les fonctions d'aide que chaque projet GAS finit par écrire à la main — manipulation des
feuilles de calcul et de la notation A1, validation des types et des valeurs (`isX`/`nonX`/`requireX`),
transformations de chaînes et de tableaux, exceptions typées, et plus encore — dans un seul paquet bien documenté et
entièrement testé.

## Fonctionnalités clés

- **Conçue pour Google Apps Script** — pensée autour de l'environnement d'exécution GAS et de ses contraintes, et non
  adaptée d'une bibliothèque Node.js générique.
- **Large couverture** — des fonctions pour les feuilles de calcul, l'UI, le réseau et l'Admin SDK, à côté
  d'utilitaires généraux pour les chaînes, les tableaux et les objets.
- **TypeScript d'abord** — chaque fonction est livrée avec des définitions de types complètes pour l'autocomplétion
  dans l'IDE et la sûreté à la compilation.
- **Testée** — couverte par une suite de tests unitaires Vitest.
- **Documentation de référence liée** — chaque type Google Apps Script utilisé dans l'API renvoie directement à sa
  documentation officielle.
- **Gestion des erreurs cohérente** — une hiérarchie dédiée de classes d'exception remplace les erreurs levées au cas
  par cas.

## Skills pour agents IA

Pour les équipes qui utilisent un agent de programmation IA (Claude Code, Gemini CLI et d'autres), le dépôt
[bootgs/skills](https://github.com/bootgs/skills) fournit un Agent Skill
[`@bootgs/utils`](https://github.com/bootgs/skills/tree/main/skills/apps-script-utils) qui documente cette
bibliothèque pour ces agents : la convention de validation `isX`/`nonX`/`requireX`, les fonctions pour la notation A1
et les feuilles, pour les chaînes, les nombres et les tableaux, les exceptions typées, ainsi que les fonctions HTML,
JSON et de chemins.

Installation avec Claude Code :

```bash
/plugin marketplace add bootgs/skills
/plugin install apps-script-utils@bootgs-skills
```

Installation avec la CLI `npx skills`, qui prend en charge plusieurs agents :

```bash
npx skills add bootgs/skills --skill apps-script-utils
```

Une fois installé, l'agent applique le skill automatiquement dès qu'une tâche concerne cette bibliothèque.

## Prérequis

- [Node.js](https://nodejs.org/) v22.14.0 ou ultérieur
- [npm](https://www.npmjs.com/) (ou un autre gestionnaire de paquets Node, par exemple pnpm)

## Installation

Installez le paquet via npm :

```bash
npm install @bootgs/utils
```

## Documentation

La documentation complète est publiée sur **<https://bootgs.github.io/utils/fr/>** — guides,
présentations de chaque module et référence complète des fonctions. Sa source se trouve dans
[`docs/writerside-fr/`](docs/writerside-fr/) et est reconstruite à chaque push sur `main`.

Un bon ordre de lecture :

- [Premiers pas](https://bootgs.github.io/utils/fr/getting-started.html)
- [Conventions de validation](https://bootgs.github.io/utils/fr/validation-conventions.html) —
  le schéma de noms `isX`/`nonX`/`requireX`/`requireNonX`
- [Gestion des exceptions](https://bootgs.github.io/utils/fr/exception-handling.html) — la
  hiérarchie des classes et ce qui déclenche chacune d'elles
- [L'environnement Apps Script](https://bootgs.github.io/utils/fr/apps-script-runtime.html) —
  quelles fonctions sont liées à un service Google, et ce que cela implique pour les tests

## Exemples d'utilisation

### Travailler avec les feuilles

Ajouter efficacement plusieurs lignes de données :

```typescript
import { appendRows } from "@bootgs/utils";

const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
const data = [
  ["John Doe", "john@example.com", 28],
  ["Jane Smith", "jane@example.com", 32]
];

appendRows(sheet, data);
```

### Utilitaires Admin SDK

Vérifier si l'utilisateur actuel dispose des droits d'administrateur :

```typescript
import { isAdmin } from "@bootgs/utils";

if (isAdmin()) {
  Logger.log("Access granted to admin panel.");
} else {
  Logger.log("Access denied.");
}
```

### Analyse de la notation A1

Analyser des notations A1 complexes en objets structurés :

```typescript
import { parseA1Notation } from "@bootgs/utils";

const rangeInfo = parseA1Notation("'Sheet1'!A1:B10");

console.log(rangeInfo.sheetName); // "Sheet1"
console.log(rangeInfo.startRowIndex); // 0
console.log(rangeInfo.endColumnIndex); // 2
```

## Développement

### Scripts

Les scripts suivants sont disponibles dans `package.json` :

| Script               | Description                                                                       |
| :------------------- | :-------------------------------------------------------------------------------- |
| `npm run build`      | Vide le répertoire `dist` et compile les sources TypeScript.                      |
| `npm run dev`        | Lance Vitest en mode surveillance.                                                |
| `npm test`           | Exécute une fois la suite de tests complète.                                      |
| `npm run type:check` | Vérifie les types du projet sans générer de sortie.                               |
| `npm run lint`       | Analyse le code avec ESLint.                                                      |
| `npm run lint:fix`   | Analyse le code et corrige automatiquement ce qui peut l'être.                    |
| `npm run format`     | Vérifie la mise en forme avec Prettier.                                           |
| `npm run format:fix` | Met en forme le code avec Prettier.                                               |
| `npm run prepare`    | Installe les hooks Git de Husky (s'exécute automatiquement après l'installation). |

### Tests

Le projet utilise [Vitest](https://vitest.dev/) pour les tests unitaires.

Exécuter une fois la suite complète :

```bash
npm test
```

Ou la lancer en mode surveillance pendant le développement :

```bash
npm run dev
```

## Structure du projet

```text
.
├── config/           # Configuration files
├── dist/             # Compiled output (after build)
├── docs/             # Documentation: assets and the Writerside source
├── scripts/          # Maintenance and helper scripts
├── src/              # Source code
│   ├── appsscript/   # Google Apps Script specific utilities
│   ├── exception/    # Custom exception classes
│   ├── html/         # HTML utilities
│   ├── json/         # JSON utilities
│   ├── lang/         # Language-level utilities (array, string, etc.)
│   ├── net/          # Network and path utilities
│   ├── time/         # Time-related utilities
│   └── index.ts      # Main entry point
├── test/             # Unit tests
└── vitest.config.ts  # Vitest configuration
```

## Fonctions par catégorie

La référence complète des fonctions a été déplacée sur le site de documentation, construit à partir de
[`docs/writerside-fr/`](docs/writerside-fr/) et publié à chaque push sur `main` :

**<https://bootgs.github.io/utils/fr/>**

| Section                                                                                        | Contenu                                                                                                         |
| :--------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| [Module Google Apps Script](https://bootgs.github.io/utils/fr/reference-appsscript.html)       | Sheets, Slides, Admin SDK, Drive, Docs, Forms, requêtes réseau et classes d'UI intégrées                        |
| [Utilitaires de base](https://bootgs.github.io/utils/fr/reference-base.html)                   | Vérification des types et validation, manipulation de chaînes, de tableaux et d'objets, traitement JSON et HTML |
| [Exceptions](https://bootgs.github.io/utils/fr/reference-exception.html)                       | Les classes d'exception typées et ce qui déclenche chacune d'elles                                              |
| [Module `path`](https://bootgs.github.io/utils/fr/reference-path.html)                         | Chemins de fichiers et URL                                                                                      |
| [Classes abstraites et interfaces](https://bootgs.github.io/utils/fr/reference-abstracts.html) | Briques de base partagées                                                                                       |

En plus de la référence, le site propose les guides que les tableaux ne pouvaient pas contenir : les
[conventions de validation](https://bootgs.github.io/utils/fr/validation-conventions.html)
expliquent le schéma `isX`/`nonX`/`requireX`/`requireNonX` en un seul endroit, la
[gestion des exceptions](https://bootgs.github.io/utils/fr/exception-handling.html) présente la
hiérarchie des classes, et [l'environnement Apps Script](https://bootgs.github.io/utils/fr/apps-script-runtime.html)
indique quelles fonctions sont liées à un service Google, ce que cela coûte et ce que cela implique pour les tests.

## Contribuer

Les contributions sont les bienvenues. Le guide complet se trouve dans [CONTRIBUTING.md](CONTRIBUTING.md). En résumé :

1. Forkez le dépôt et créez une branche pour votre fonctionnalité ou votre correctif.
2. Ajoutez ou mettez à jour les tests qui couvrent vos modifications.
3. Lancez `npm run lint` et `npm run format` avant de committer.
4. Ne modifiez pas `CHANGELOG.md` à la main — il est généré automatiquement par [release-please](https://github.com/googleapis/release-please).
5. Ouvrez une pull request qui décrit ce qui a changé et pourquoi.

Respectez le style de code et les conventions de nommage existants. Les règles de la communauté se trouvent dans
[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Assistance

- Pour signaler un bug ou proposer une fonctionnalité, recherchez ou ouvrez une
  [issue](https://github.com/bootgs/utils/issues) sur GitHub.
- Pour les changements récents, consultez le [journal des modifications](CHANGELOG.md).
- Pour signaler une vulnérabilité, suivez la [politique de sécurité](SECURITY.md) plutôt que d'ouvrir une issue
  publique.
- Pour soutenir le développement, voir [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov).

## Feuille de route

Ce qui est prévu, en cours ou terminé figure sur le [tableau du projet](https://github.com/users/MaksymStoianov/projects/2/views/2),
construit à partir du suivi des issues lui-même. Il n'existe pas de document de feuille de route séparé qui pourrait
s'en écarter : pour proposer quelque chose, ouvrez une [issue](https://github.com/bootgs/utils/issues).

## Journal des modifications

Pour la liste détaillée des changements par version, voir [CHANGELOG.md](CHANGELOG.md).

## Licence

Ce projet est distribué sous la licence Apache License 2.0. Voir [LICENSE](LICENSE) pour plus de détails.

L'illustration de la bannière n'est pas couverte par cette licence. Elle est l'œuvre de son autrice, peut être
réutilisée sans modification à condition de créditer l'autrice avec un lien, et relève de
[docs/assets/images/README.md](docs/assets/images/README.md).

## Marques

Google Apps Script, Google Sheets, Google Slides, Google Docs, Google Forms et Google Drive sont des marques de
Google LLC. Ce projet est une bibliothèque indépendante. Il n'est ni affilié à Google LLC, ni approuvé ou sponsorisé
par celle-ci, et les marques ne sont utilisées que pour décrire ce avec quoi la bibliothèque fonctionne.

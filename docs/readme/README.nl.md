<a name="top"></a>

![Projectbanner van Google Apps Script Utils](../assets/images/banner-1280x640.jpg)

<p align="right">
    <small>
        <i>Kunstenaar: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-utils&utm_content=banner-artist-credit" title="Portfolio van kunstenaar Daryna Mikhailenko">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](../../README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [Português](README.pt.md) | [Italiano](README.it.md) | **Nederlands** | [Polski](README.pl.md) | [Čeština](README.cs.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Bahasa Indonesia](README.id.md) | [Tiếng Việt](README.vi.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [简体中文](README.zh.md) | [繁體中文](README.zh-TW.md)

> Deze vertaling is met behulp van AI gemaakt op basis van [README.md](../../README.md) voor versie 2.1.1. De referentieversie is de Engelse README; correcties zijn welkom — zie [CONTRIBUTING.md](../../CONTRIBUTING.md#readme-translations).

# Hulpprogramma's voor Google Apps Script™

<p align="left">
  <a href="https://www.npmjs.com/package/@bootgs/utils"><img src="https://img.shields.io/npm/v/@bootgs/utils?label=npm" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/@bootgs/utils"><img src="https://img.shields.io/npm/dm/@bootgs/utils?label=downloads" alt="npm downloads"></a>
  <a href="https://github.com/google/clasp"><img src="https://img.shields.io/badge/Built%20with-clasp-4285f4.svg" alt="Built with clasp"></a>
  <a href="../../LICENSE"><img src="https://img.shields.io/github/license/bootgs/utils?label=License" alt="License"></a>
  <a href="../../SECURITY.md"><img src="https://img.shields.io/badge/Security-Policy-brightgreen.svg" alt="Security Policy"></a>
  <a href="https://github.com/users/MaksymStoianov/projects/2/views/2"><img src="https://img.shields.io/badge/Roadmap-Board-blue.svg" alt="Roadmap"></a>
  <a href="https://github.com/bootgs/utils/releases"><img src="https://img.shields.io/github/v/release/bootgs/utils?label=Release" alt="Latest release"></a>
</p>

<p align="left">
  <a href="https://github.com/bootgs/utils/stargazers"><img src="https://img.shields.io/github/stars/bootgs/utils?style=social" alt="GitHub Stars"></a>
  <a href="https://github.com/bootgs/utils/forks"><img src="https://img.shields.io/github/forks/bootgs/utils?style=social" alt="GitHub Fork"></a>
  <a href="https://github.com/sponsors/MaksymStoianov"><img src="https://img.shields.io/github/sponsors/MaksymStoianov?style=social&logo=github" alt="GitHub Sponsors"></a>
</p>

<!-- TOC -->

- [Hulpprogramma's voor Google Apps Script™](#hulpprogrammas-voor-google-apps-script)
  - [Overzicht](#overzicht)
  - [Belangrijkste functies](#belangrijkste-functies)
  - [Skills voor AI-agents](#skills-voor-ai-agents)
  - [Vereisten](#vereisten)
  - [Installatie](#installatie)
  - [Documentatie](#documentatie)
  - [Gebruiksvoorbeelden](#gebruiksvoorbeelden)
  - [Ontwikkeling](#ontwikkeling)
    - [Scripts](#scripts)
    - [Testen](#testen)
  - [Projectstructuur](#projectstructuur)
  - [Functies per categorie](#functies-per-categorie)
  - [Bijdragen](#bijdragen)
  - [Ondersteuning](#ondersteuning)
  - [Roadmap](#roadmap)
  - [Changelog](#changelog)
  - [Licentie](#licentie)
  <!-- TOC -->

## Overzicht

**@bootgs/utils** is een TypeScript-hulpbibliotheek die speciaal is gebouwd voor **Google Apps Script**. Ze bundelt de
hulpfuncties die elk GAS-project uiteindelijk zelf schrijft — bewerken van spreadsheets en A1-notatie, validatie van
typen en waarden (`isX`/`nonX`/`requireX`), transformaties van strings en arrays, getypeerde exceptions en meer — in
één goed gedocumenteerd en volledig getest pakket.

## Belangrijkste functies

- **Gebouwd voor Google Apps Script** — ontworpen rond de GAS-runtime en de beperkingen daarvan, niet aangepast vanuit
  een generieke Node.js-bibliotheek.
- **Brede dekking** — hulpfuncties voor spreadsheets, UI, netwerk en Admin SDK, naast algemene hulpmiddelen voor
  strings, arrays en objecten.
- **TypeScript-first** — elke functie wordt geleverd met volledige typedefinities voor automatisch aanvullen in de IDE
  en veiligheid tijdens het compileren.
- **Getest** — gedekt door een suite met unittests in Vitest.
- **Gekoppelde referentiedocumentatie** — elk Google Apps Script-type dat in de API wordt gebruikt, linkt rechtstreeks
  naar de officiële documentatie ervan.
- **Consistente foutafhandeling** — een eigen hiërarchie van exceptionklassen vervangt willekeurig gegooide fouten.

## Skills voor AI-agents

Voor teams die een AI-codeeragent gebruiken (Claude Code, Gemini CLI en andere) biedt de repository
[bootgs/skills](https://github.com/bootgs/skills) een Agent Skill
[`@bootgs/utils`](https://github.com/bootgs/skills/tree/main/skills/apps-script-utils) die deze bibliotheek voor
zulke agents documenteert, waaronder de validatieconventie `isX`/`nonX`/`requireX`, de hulpfuncties voor A1-notatie
en sheets, voor strings, getallen en arrays, de getypeerde exceptions en de hulpfuncties voor HTML, JSON en paden.

Installeren met Claude Code:

```bash
/plugin marketplace add bootgs/skills
/plugin install apps-script-utils@bootgs-skills
```

Installeren met de CLI `npx skills`, die meerdere agents ondersteunt:

```bash
npx skills add bootgs/skills --skill apps-script-utils
```

Na installatie past de agent de skill automatisch toe wanneer een taak met deze bibliotheek te maken heeft.

## Vereisten

- [Node.js](https://nodejs.org/) v22.14.0 of nieuwer
- [npm](https://www.npmjs.com/) (of een andere pakketbeheerder voor Node, bijv. pnpm)

## Installatie

Installeer het pakket via npm:

```bash
npm install @bootgs/utils
```

## Documentatie

De volledige documentatie staat op **<https://bootgs.github.io/utils/>** (in het Engels): handleidingen, uitleg per
module en de complete functiereferentie. De bron staat in [`docs/writerside/`](../writerside/) en wordt bij elke
push naar `main` opnieuw gebouwd.

Een goede leesvolgorde:

- [Getting started](https://bootgs.github.io/utils/getting-started.html) — de eerste stappen
- [Validation conventions](https://bootgs.github.io/utils/validation-conventions.html) — het naamgevingsschema
  `isX`/`nonX`/`requireX`/`requireNonX`
- [Exception handling](https://bootgs.github.io/utils/exception-handling.html) — de klassenhiërarchie en wat elke
  exception veroorzaakt
- [The Apps Script runtime](https://bootgs.github.io/utils/apps-script-runtime.html) — welke hulpfuncties aan een
  Google-service gebonden zijn en wat dat betekent voor het testen

## Gebruiksvoorbeelden

### Werken met sheets

Voeg efficiënt meerdere rijen met gegevens toe:

```typescript
import { appendRows } from "@bootgs/utils";

const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
const data = [
  ["John Doe", "john@example.com", 28],
  ["Jane Smith", "jane@example.com", 32]
];

appendRows(sheet, data);
```

### Hulpfuncties voor de Admin SDK

Controleer of de huidige gebruiker beheerdersrechten heeft:

```typescript
import { isAdmin } from "@bootgs/utils";

if (isAdmin()) {
  Logger.log("Access granted to admin panel.");
} else {
  Logger.log("Access denied.");
}
```

### A1-notatie parsen

Zet complexe A1-notaties om in gestructureerde objecten:

```typescript
import { parseA1Notation } from "@bootgs/utils";

const rangeInfo = parseA1Notation("'Sheet1'!A1:B10");

console.log(rangeInfo.sheetName); // "Sheet1"
console.log(rangeInfo.startRowIndex); // 0
console.log(rangeInfo.endColumnIndex); // 2
```

## Ontwikkeling

### Scripts

De volgende scripts zijn beschikbaar in `package.json`:

| Script               | Beschrijving                                                            |
| :------------------- | :---------------------------------------------------------------------- |
| `npm run build`      | Leegt de map `dist` en compileert de TypeScript-broncode.               |
| `npm run dev`        | Start Vitest in watch-modus.                                            |
| `npm test`           | Voert de volledige testsuite één keer uit.                              |
| `npm run type:check` | Controleert de typen van het project zonder uitvoer te genereren.       |
| `npm run lint`       | Controleert de code met ESLint.                                         |
| `npm run lint:fix`   | Controleert de code en herstelt automatisch wat mogelijk is.            |
| `npm run format`     | Controleert de opmaak met Prettier.                                     |
| `npm run format:fix` | Formatteert de code met Prettier.                                       |
| `npm run prepare`    | Richt de Git-hooks van Husky in (draait automatisch na de installatie). |

### Testen

Het project gebruikt [Vitest](https://vitest.dev/) voor unittests.

Voer de volledige suite één keer uit:

```bash
npm test
```

Of draai hem in watch-modus tijdens het ontwikkelen:

```bash
npm run dev
```

## Projectstructuur

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

## Functies per categorie

De volledige functiereferentie is verhuisd naar de documentatiesite (in het Engels), die wordt gebouwd vanuit
[`docs/writerside/`](../writerside/) en bij elke push naar `main` wordt gepubliceerd:

**<https://bootgs.github.io/utils/>**

| Sectie                                                                                | Inhoud                                                                                           |
| :------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------- |
| [Google Apps Script module](https://bootgs.github.io/utils/reference-appsscript.html) | Sheets, Slides, Admin SDK, Drive, Docs, Forms, netwerkverzoeken en de ingebouwde UI-klassen      |
| [Base utilities](https://bootgs.github.io/utils/reference-base.html)                  | Typecontrole en validatie, bewerken van strings, arrays en objecten, verwerking van JSON en HTML |
| [Exceptions](https://bootgs.github.io/utils/reference-exception.html)                 | De getypeerde exceptionklassen en wat elk ervan veroorzaakt                                      |
| [`path` module](https://bootgs.github.io/utils/reference-path.html)                   | Bestandspaden en URL's                                                                           |
| [Abstracts and interfaces](https://bootgs.github.io/utils/reference-abstracts.html)   | Gedeelde bouwstenen                                                                              |

Naast de referentie bevat de site de handleidingen waar in de tabellen geen ruimte voor was:
[validation conventions](https://bootgs.github.io/utils/validation-conventions.html) legt het schema
`isX`/`nonX`/`requireX`/`requireNonX` op één plek uit,
[exception handling](https://bootgs.github.io/utils/exception-handling.html) beschrijft de klassenhiërarchie, en
[the Apps Script runtime](https://bootgs.github.io/utils/apps-script-runtime.html) behandelt welke hulpfuncties aan
een Google-service gebonden zijn, wat dat kost en wat het betekent voor het testen.

## Bijdragen

Bijdragen zijn welkom. Zie [CONTRIBUTING.md](../../CONTRIBUTING.md) voor de volledige handleiding. Kort samengevat:

1. Fork de repository en maak een branch aan voor je feature of bugfix.
2. Voeg tests toe of werk ze bij zodat ze je wijzigingen dekken.
3. Voer `npm run lint` en `npm run format` uit voordat je commit.
4. Bewerk `CHANGELOG.md` niet handmatig: het bestand wordt automatisch gegenereerd door [release-please](https://github.com/googleapis/release-please).
5. Open een pull request waarin je beschrijft wat er is veranderd en waarom.

Volg de bestaande codestijl en naamgevingsconventies. Zie [CODE_OF_CONDUCT.md](../../CODE_OF_CONDUCT.md) voor de
gemeenschapsrichtlijnen.

## Ondersteuning

- Voor bugs of featureverzoeken: zoek of open een [issue](https://github.com/bootgs/utils/issues) op GitHub.
- Voor recente wijzigingen: zie de [changelog](../../CHANGELOG.md).
- Om een beveiligingsprobleem te melden, volg je het [beveiligingsbeleid](../../SECURITY.md) in plaats van een openbare
  issue te openen.
- Om de verdere ontwikkeling te steunen: zie [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov).

## Roadmap

Wat gepland, in uitvoering of afgerond is, staat op het [projectbord](https://github.com/users/MaksymStoianov/projects/2/views/2),
dat rechtstreeks uit de issuetracker wordt opgebouwd. Er is geen apart roadmapdocument dat daarmee uit de pas kan
gaan lopen: wil je iets voorstellen, open dan een [issue](https://github.com/bootgs/utils/issues).

## Changelog

Een gedetailleerde lijst met wijzigingen per versie vind je in [CHANGELOG.md](../../CHANGELOG.md).

## Licentie

Dit project valt onder de Apache License 2.0. Zie [LICENSE](../../LICENSE) voor details.

De bannerillustratie valt niet onder die licentie. Het is het werk van de maker, mag ongewijzigd worden hergebruikt
mits de maker wordt vermeld en die vermelding een link bevat, en valt onder
[docs/assets/images/README.md](../assets/images/README.md).

## Handelsmerken

Google Apps Script, Google Sheets, Google Slides, Google Docs, Google Forms en Google Drive zijn handelsmerken van
Google LLC. Dit project is een onafhankelijke bibliotheek. Het is niet gelieerd aan Google LLC en wordt niet door
Google LLC onderschreven of gesponsord; de handelsmerken worden alleen gebruikt om te beschrijven waarmee de
bibliotheek werkt.

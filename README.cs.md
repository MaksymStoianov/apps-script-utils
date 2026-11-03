<a name="top"></a>

![Banner projektu Google Apps Script Utils](docs/assets/images/banner-1280x640.jpg)

<p align="right">
    <small>
        <i>Umělkyně: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-utils&utm_content=banner-artist-credit" title="Portfolio umělkyně Daryny Mikhailenko">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [Português](README.pt.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Polski](README.pl.md) | **Čeština** | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Bahasa Indonesia](README.id.md) | [Tiếng Việt](README.vi.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [简体中文](README.zh.md) | [繁體中文](README.zh-TW.md)

> Tento překlad vznikl s pomocí AI z [README.md](README.md) pro verzi 2.1.1. Referenční verzí je anglické README; opravy jsou vítány — viz [CONTRIBUTING.md](CONTRIBUTING.md#readme-translations).

# Utility pro Google Apps Script™

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

- [Utility pro Google Apps Script™](#utility-pro-google-apps-script)
  - [Přehled](#přehled)
  - [Hlavní funkce](#hlavní-funkce)
  - [Skills pro AI agenty](#skills-pro-ai-agenty)
  - [Požadavky](#požadavky)
  - [Instalace](#instalace)
  - [Dokumentace](#dokumentace)
  - [Příklady použití](#příklady-použití)
  - [Vývoj](#vývoj)
    - [Skripty](#skripty)
    - [Testování](#testování)
  - [Struktura projektu](#struktura-projektu)
  - [Funkce podle kategorií](#funkce-podle-kategorií)
  - [Jak přispět](#jak-přispět)
  - [Podpora](#podpora)
  - [Plán vývoje](#plán-vývoje)
  - [Seznam změn](#seznam-změn)
  - [Licence](#licence)
  <!-- TOC -->

## Přehled

**@bootgs/utils** je knihovna utilit v TypeScriptu vytvořená přímo pro **Google Apps Script**. Spojuje pomocné funkce,
které si každý projekt GAS nakonec píše ručně — práci s tabulkami a notací A1, validaci typů a hodnot
(`isX`/`nonX`/`requireX`), transformace řetězců a polí, typované výjimky a další — do jediného dobře zdokumentovaného
a plně otestovaného balíčku.

## Hlavní funkce

- **Vytvořeno pro Google Apps Script** — navrženo podle běhového prostředí GAS a jeho omezení, nikoli převzato
  z obecné knihovny pro Node.js.
- **Široké pokrytí** — pomocné funkce pro tabulky, UI, síť a Admin SDK vedle univerzálních utilit pro řetězce, pole
  a objekty.
- **TypeScript na prvním místě** — každá funkce má úplné typové definice pro automatické doplňování v IDE a kontrolu
  při kompilaci.
- **Otestováno** — pokryto sadou jednotkových testů ve Vitestu.
- **Propojená referenční dokumentace** — každý typ Google Apps Script použitý v API odkazuje přímo na svou oficiální
  dokumentaci.
- **Jednotné zpracování chyb** — vlastní hierarchie tříd výjimek nahrazuje nahodile vyhazované chyby.

## Skills pro AI agenty

Pro týmy, které používají AI agenta pro programování (Claude Code, Gemini CLI a další), nabízí repozitář
[bootgs/skills](https://github.com/bootgs/skills) Agent Skill
[`@bootgs/utils`](https://github.com/bootgs/skills/tree/main/skills/apps-script-utils), který tuto knihovnu
takovým agentům popisuje, včetně konvence validace `isX`/`nonX`/`requireX`, pomocných funkcí pro notaci A1 a listy,
pro řetězce, čísla a pole, typovaných výjimek a pomocných funkcí pro HTML, JSON a cesty.

Instalace v Claude Code:

```bash
/plugin marketplace add bootgs/skills
/plugin install apps-script-utils@bootgs-skills
```

Instalace pomocí CLI `npx skills`, které podporuje více agentů:

```bash
npx skills add bootgs/skills --skill apps-script-utils
```

Po instalaci agent skill použije automaticky, jakmile se úloha týká této knihovny.

## Požadavky

- [Node.js](https://nodejs.org/) v22.14.0 nebo novější
- [npm](https://www.npmjs.com/) (nebo jiný správce balíčků pro Node, např. pnpm)

## Instalace

Nainstalujte balíček přes npm:

```bash
npm install @bootgs/utils
```

## Dokumentace

Úplná dokumentace je zveřejněna na **<https://bootgs.github.io/utils/>** (v angličtině):
průvodci, procházky jednotlivými moduly a kompletní reference funkcí. Její zdroj je v
[`docs/writerside/`](docs/writerside/) a znovu se sestavuje při každém push do `main`.

Doporučené pořadí čtení:

- [Getting started](https://bootgs.github.io/utils/getting-started.html) — první kroky
- [Validation conventions](https://bootgs.github.io/utils/validation-conventions.html) —
  schéma pojmenování `isX`/`nonX`/`requireX`/`requireNonX`
- [Exception handling](https://bootgs.github.io/utils/exception-handling.html) — hierarchie
  tříd a co kterou výjimku vyvolává
- [The Apps Script runtime](https://bootgs.github.io/utils/apps-script-runtime.html) — které
  pomocné funkce jsou vázány na službu Google a co to znamená pro testování

## Příklady použití

### Práce s listy

Efektivní přidání více řádků dat:

```typescript
import { appendRows } from "@bootgs/utils";

const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
const data = [
  ["John Doe", "john@example.com", 28],
  ["Jane Smith", "jane@example.com", 32]
];

appendRows(sheet, data);
```

### Utility pro Admin SDK

Ověření, zda má aktuální uživatel administrátorská oprávnění:

```typescript
import { isAdmin } from "@bootgs/utils";

if (isAdmin()) {
  Logger.log("Access granted to admin panel.");
} else {
  Logger.log("Access denied.");
}
```

### Parsování notace A1

Rozbor složitých zápisů v notaci A1 do strukturovaných objektů:

```typescript
import { parseA1Notation } from "@bootgs/utils";

const rangeInfo = parseA1Notation("'Sheet1'!A1:B10");

console.log(rangeInfo.sheetName); // "Sheet1"
console.log(rangeInfo.startRowIndex); // 0
console.log(rangeInfo.endColumnIndex); // 2
```

## Vývoj

### Skripty

V `package.json` jsou k dispozici tyto skripty:

| Skript               | Popis                                                           |
| :------------------- | :-------------------------------------------------------------- |
| `npm run build`      | Vyčistí adresář `dist` a zkompiluje zdrojový kód v TypeScriptu. |
| `npm run dev`        | Spustí Vitest v režimu sledování změn.                          |
| `npm test`           | Jednou spustí celou sadu testů.                                 |
| `npm run type:check` | Zkontroluje typy projektu bez generování výstupu.               |
| `npm run lint`       | Zkontroluje kód pomocí ESLintu.                                 |
| `npm run lint:fix`   | Zkontroluje kód a automaticky opraví, co lze.                   |
| `npm run format`     | Zkontroluje formátování pomocí Prettieru.                       |
| `npm run format:fix` | Naformátuje kód pomocí Prettieru.                               |
| `npm run prepare`    | Nastaví Git hooky Husky (spouští se automaticky po instalaci).  |

### Testování

Projekt používá pro jednotkové testy [Vitest](https://vitest.dev/).

Jednorázové spuštění celé sady:

```bash
npm test
```

Nebo spuštění v režimu sledování změn během vývoje:

```bash
npm run dev
```

## Struktura projektu

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

## Funkce podle kategorií

Úplná reference funkcí se přesunula na web s dokumentací, který se sestavuje z
[`docs/writerside/`](docs/writerside/) a zveřejňuje při každém push do `main`:

**<https://bootgs.github.io/utils/>**

| Oddíl                                                                                 | Obsah                                                                                |
| :------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------- |
| [Google Apps Script module](https://bootgs.github.io/utils/reference-appsscript.html) | Sheets, Slides, Admin SDK, Drive, Docs, Forms, síťové požadavky a vestavěné třídy UI |
| [Base utilities](https://bootgs.github.io/utils/reference-base.html)                  | Kontrola typů a validace, práce s řetězci, poli a objekty, zpracování JSON a HTML    |
| [Exceptions](https://bootgs.github.io/utils/reference-exception.html)                 | Typované třídy výjimek a co kterou z nich vyvolává                                   |
| [`path` module](https://bootgs.github.io/utils/reference-path.html)                   | Cesty k souborům a URL                                                               |
| [Abstracts and interfaces](https://bootgs.github.io/utils/reference-abstracts.html)   | Sdílené stavební prvky                                                               |

Kromě reference obsahuje web i průvodce, které se do tabulek nevešly:
[validation conventions](https://bootgs.github.io/utils/validation-conventions.html) vysvětluje
schéma `isX`/`nonX`/`requireX`/`requireNonX` na jednom místě,
[exception handling](https://bootgs.github.io/utils/exception-handling.html) popisuje hierarchii
tříd a [the Apps Script runtime](https://bootgs.github.io/utils/apps-script-runtime.html)
vysvětluje, které pomocné funkce jsou vázány na službu Google, co to stojí a co to znamená pro testování.

## Jak přispět

Příspěvky jsou vítány. Úplný návod najdete v [CONTRIBUTING.md](CONTRIBUTING.md). Ve zkratce:

1. Vytvořte fork repozitáře a založte větev pro novou funkci nebo opravu chyby.
2. Přidejte nebo aktualizujte testy, které pokrývají vaše změny.
3. Před commitem spusťte `npm run lint` a `npm run format`.
4. Needitujte `CHANGELOG.md` ručně — generuje ho automaticky [release-please](https://github.com/googleapis/release-please).
5. Otevřete pull request s popisem toho, co se změnilo a proč.

Dodržujte stávající styl kódu a konvence pojmenování. Pravidla komunity najdete v
[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Podpora

- Chyby nebo požadavky na nové funkce vyhledejte nebo nahlaste jako [issue](https://github.com/bootgs/utils/issues)
  na GitHubu.
- Nedávné změny najdete v [seznamu změn](CHANGELOG.md).
- Bezpečnostní zranitelnost nahlaste podle [bezpečnostní politiky](SECURITY.md), nikoli ve veřejném issue.
- Chcete-li podpořit další vývoj, navštivte [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov).

## Plán vývoje

Co je naplánováno, rozpracováno nebo hotovo, najdete na [nástěnce projektu](https://github.com/users/MaksymStoianov/projects/2/views/2),
která vychází přímo ze seznamu issues. Neexistuje žádný samostatný dokument s plánem, který by se s ní mohl rozcházet:
chcete-li něco navrhnout, otevřete [issue](https://github.com/bootgs/utils/issues).

## Seznam změn

Podrobný seznam změn podle verzí najdete v [CHANGELOG.md](CHANGELOG.md).

## Licence

Tento projekt je licencován pod licencí Apache License 2.0. Podrobnosti najdete v [LICENSE](LICENSE).

Ilustrace banneru není součástí této licence. Je dílem své autorky, smí být znovu použita bez úprav, pokud je autorka
uvedena a uvedení odkazuje na její stránky, a vztahuje se na ni [docs/assets/images/README.md](docs/assets/images/README.md).

## Ochranné známky

Google Apps Script, Google Sheets, Google Slides, Google Docs, Google Forms a Google Drive jsou ochranné známky
společnosti Google LLC. Tento projekt je nezávislá knihovna. Není přidružen ke společnosti Google LLC, není jí
schvalován ani sponzorován a ochranné známky se používají pouze k popisu toho, s čím knihovna pracuje.

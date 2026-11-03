<a name="top"></a>

![Banner del progetto Google Apps Script Utils](../assets/images/banner-1280x640.jpg)

<p align="right">
    <small>
        <i>Artista: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-utils&utm_content=banner-artist-credit" title="Portfolio dell'artista Daryna Mikhailenko">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](../../README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [Português](README.pt.md) | **Italiano** | [Nederlands](README.nl.md) | [Polski](README.pl.md) | [Čeština](README.cs.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Bahasa Indonesia](README.id.md) | [Tiếng Việt](README.vi.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [简体中文](README.zh.md) | [繁體中文](README.zh-TW.md)

> Questa traduzione è stata realizzata con l'aiuto dell'IA a partire da [README.md](../../README.md) per la versione 2.1.1. La versione di riferimento è il README in inglese; le correzioni sono benvenute — consulta [CONTRIBUTING.md](../../CONTRIBUTING.md#readme-translations).

# Utility per Google Apps Script™

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

- [Utility per Google Apps Script™](#utility-per-google-apps-script)
  - [Panoramica](#panoramica)
  - [Funzionalità principali](#funzionalità-principali)
  - [Skill per agenti IA](#skill-per-agenti-ia)
  - [Requisiti](#requisiti)
  - [Installazione](#installazione)
  - [Documentazione](#documentazione)
  - [Esempi di utilizzo](#esempi-di-utilizzo)
  - [Sviluppo](#sviluppo)
    - [Script](#script)
    - [Test](#test)
  - [Struttura del progetto](#struttura-del-progetto)
  - [Funzioni per categoria](#funzioni-per-categoria)
  - [Come contribuire](#come-contribuire)
  - [Supporto](#supporto)
  - [Roadmap](#roadmap)
  - [Registro delle modifiche](#registro-delle-modifiche)
  - [Licenza](#licenza)
  <!-- TOC -->

## Panoramica

**@bootgs/utils** è una libreria di utility in TypeScript pensata appositamente per **Google Apps Script**. Riunisce
le funzioni di supporto che ogni progetto GAS finisce per scrivere a mano — manipolazione dei fogli di calcolo e della
notazione A1, validazione di tipi e valori (`isX`/`nonX`/`requireX`), trasformazioni di stringhe e array, eccezioni
tipizzate e altro ancora — in un unico pacchetto ben documentato e interamente testato.

## Funzionalità principali

- **Pensata per Google Apps Script** — progettata attorno al runtime GAS e ai suoi vincoli, non adattata da una
  libreria Node.js generica.
- **Ampia copertura** — funzioni per fogli di calcolo, UI, rete e Admin SDK accanto a utility di uso generale per
  stringhe, array e oggetti.
- **TypeScript prima di tutto** — ogni funzione include definizioni di tipo complete per l'autocompletamento nell'IDE
  e la sicurezza in fase di compilazione.
- **Testata** — coperta da una suite di test unitari con Vitest.
- **Documentazione di riferimento collegata** — ogni tipo di Google Apps Script usato nell'API rimanda direttamente
  alla relativa documentazione ufficiale.
- **Gestione coerente degli errori** — una gerarchia dedicata di classi di eccezione sostituisce gli errori lanciati
  in modo estemporaneo.

## Skill per agenti IA

Per i team che usano un agente di programmazione basato sull'IA (Claude Code, Gemini CLI e altri), il repository
[bootgs/skills](https://github.com/bootgs/skills) offre un Agent Skill
[`@bootgs/utils`](https://github.com/bootgs/skills/tree/main/skills/apps-script-utils) che documenta questa
libreria per tali agenti, compresa la convenzione di validazione `isX`/`nonX`/`requireX`, le funzioni per la
notazione A1 e i fogli, per stringhe, numeri e array, le eccezioni tipizzate e le funzioni per HTML, JSON e percorsi.

Installazione con Claude Code:

```bash
/plugin marketplace add bootgs/skills
/plugin install apps-script-utils@bootgs-skills
```

Installazione con la CLI `npx skills`, che supporta più agenti:

```bash
npx skills add bootgs/skills --skill apps-script-utils
```

Una volta installato, l'agente applica lo skill automaticamente quando un'attività riguarda questa libreria.

## Requisiti

- [Node.js](https://nodejs.org/) v22.14.0 o successiva
- [npm](https://www.npmjs.com/) (o un altro gestore di pacchetti per Node, ad es. pnpm)

## Installazione

Installa il pacchetto tramite npm:

```bash
npm install @bootgs/utils
```

## Documentazione

La documentazione completa è pubblicata su **<https://bootgs.github.io/utils/>** (in inglese):
guide, percorsi dedicati a ogni modulo e il riferimento completo delle funzioni. Il suo sorgente si trova in
[`docs/writerside/`](../writerside/) e viene ricostruito a ogni push su `main`.

Un buon ordine di lettura:

- [Getting started](https://bootgs.github.io/utils/getting-started.html) — primi passi
- [Validation conventions](https://bootgs.github.io/utils/validation-conventions.html) — lo
  schema di denominazione `isX`/`nonX`/`requireX`/`requireNonX`
- [Exception handling](https://bootgs.github.io/utils/exception-handling.html) — la gerarchia
  delle classi e cosa solleva ciascuna eccezione
- [The Apps Script runtime](https://bootgs.github.io/utils/apps-script-runtime.html) — quali
  funzioni sono legate a un servizio Google e cosa comporta questo per i test

## Esempi di utilizzo

### Lavorare con i fogli

Aggiungere più righe di dati in modo efficiente:

```typescript
import { appendRows } from "@bootgs/utils";

const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
const data = [
  ["John Doe", "john@example.com", 28],
  ["Jane Smith", "jane@example.com", 32]
];

appendRows(sheet, data);
```

### Utility per Admin SDK

Verificare se l'utente corrente ha privilegi di amministratore:

```typescript
import { isAdmin } from "@bootgs/utils";

if (isAdmin()) {
  Logger.log("Access granted to admin panel.");
} else {
  Logger.log("Access denied.");
}
```

### Analisi della notazione A1

Analizzare notazioni A1 complesse e convertirle in oggetti strutturati:

```typescript
import { parseA1Notation } from "@bootgs/utils";

const rangeInfo = parseA1Notation("'Sheet1'!A1:B10");

console.log(rangeInfo.sheetName); // "Sheet1"
console.log(rangeInfo.startRowIndex); // 0
console.log(rangeInfo.endColumnIndex); // 2
```

## Sviluppo

### Script

In `package.json` sono disponibili i seguenti script:

| Script               | Descrizione                                                                            |
| :------------------- | :------------------------------------------------------------------------------------- |
| `npm run build`      | Svuota la directory `dist` e compila il sorgente TypeScript.                           |
| `npm run dev`        | Avvia Vitest in modalità watch.                                                        |
| `npm test`           | Esegue una volta l'intera suite di test.                                               |
| `npm run type:check` | Controlla i tipi del progetto senza generare output.                                   |
| `npm run lint`       | Analizza il codice con ESLint.                                                         |
| `npm run lint:fix`   | Analizza il codice e corregge automaticamente ciò che può.                             |
| `npm run format`     | Controlla la formattazione con Prettier.                                               |
| `npm run format:fix` | Formatta il codice con Prettier.                                                       |
| `npm run prepare`    | Configura gli hook Git di Husky (viene eseguito automaticamente dopo l'installazione). |

### Test

Il progetto usa [Vitest](https://vitest.dev/) per i test unitari.

Eseguire l'intera suite una volta:

```bash
npm test
```

Oppure eseguirla in modalità watch durante lo sviluppo:

```bash
npm run dev
```

## Struttura del progetto

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

## Funzioni per categoria

Il riferimento completo delle funzioni è stato spostato sul sito della documentazione, generato a partire da
[`docs/writerside/`](../writerside/) e pubblicato a ogni push su `main`:

**<https://bootgs.github.io/utils/>**

| Sezione                                                                               | Contenuto                                                                                             |
| :------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------- |
| [Google Apps Script module](https://bootgs.github.io/utils/reference-appsscript.html) | Sheets, Slides, Admin SDK, Drive, Docs, Forms, richieste di rete e le classi UI integrate             |
| [Base utilities](https://bootgs.github.io/utils/reference-base.html)                  | Controllo dei tipi e validazione, manipolazione di stringhe, array e oggetti, gestione di JSON e HTML |
| [Exceptions](https://bootgs.github.io/utils/reference-exception.html)                 | Le classi di eccezione tipizzate e cosa solleva ciascuna                                              |
| [`path` module](https://bootgs.github.io/utils/reference-path.html)                   | Percorsi di file e URL                                                                                |
| [Abstracts and interfaces](https://bootgs.github.io/utils/reference-abstracts.html)   | Componenti condivisi                                                                                  |

Oltre al riferimento, il sito ospita le guide che non trovavano posto nelle tabelle:
[validation conventions](https://bootgs.github.io/utils/validation-conventions.html) spiega lo
schema `isX`/`nonX`/`requireX`/`requireNonX` in un unico punto,
[exception handling](https://bootgs.github.io/utils/exception-handling.html) illustra la gerarchia
delle classi e [the Apps Script runtime](https://bootgs.github.io/utils/apps-script-runtime.html)
spiega quali funzioni sono legate a un servizio Google, quanto costa questo legame e cosa comporta per i test.

## Come contribuire

I contributi sono benvenuti. La guida completa è in [CONTRIBUTING.md](../../CONTRIBUTING.md). In sintesi:

1. Fai un fork del repository e crea un branch per la tua funzionalità o correzione.
2. Aggiungi o aggiorna i test che coprono le tue modifiche.
3. Esegui `npm run lint` e `npm run format` prima del commit.
4. Non modificare `CHANGELOG.md` a mano: viene generato automaticamente da [release-please](https://github.com/googleapis/release-please).
5. Apri una pull request che descriva cosa è cambiato e perché.

Segui lo stile del codice e le convenzioni di denominazione esistenti. Le linee guida della comunità sono in
[CODE_OF_CONDUCT.md](../../CODE_OF_CONDUCT.md).

## Supporto

- Per bug o richieste di funzionalità, cerca o apri una [issue](https://github.com/bootgs/utils/issues)
  su GitHub.
- Per le modifiche recenti, consulta il [registro delle modifiche](../../CHANGELOG.md).
- Per segnalare una vulnerabilità di sicurezza, segui la [politica di sicurezza](../../SECURITY.md) invece di aprire una
  issue pubblica.
- Per sostenere lo sviluppo continuo, consulta [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov).

## Roadmap

Ciò che è pianificato, in corso o completato si trova nella [bacheca del progetto](https://github.com/users/MaksymStoianov/projects/2/views/2),
costruita direttamente a partire dal tracker delle issue. Non esiste un documento di roadmap separato che possa
disallinearsi: per proporre qualcosa, apri una [issue](https://github.com/bootgs/utils/issues).

## Registro delle modifiche

Per l'elenco dettagliato delle modifiche per versione, consulta [CHANGELOG.md](../../CHANGELOG.md).

## Licenza

Questo progetto è distribuito con licenza Apache License 2.0. Consulta [LICENSE](../../LICENSE) per i dettagli.

L'illustrazione del banner non rientra in tale licenza. È opera della sua autrice, può essere riutilizzata senza
modifiche citando l'autrice con un link, ed è disciplinata da
[docs/assets/images/README.md](../assets/images/README.md).

## Marchi

Google Apps Script, Google Sheets, Google Slides, Google Docs, Google Forms e Google Drive sono marchi di Google LLC.
Questo progetto è una libreria indipendente. Non è affiliato a Google LLC né da essa approvato o sponsorizzato, e i
marchi sono usati solo per descrivere con cosa funziona la libreria.

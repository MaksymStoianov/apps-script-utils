<a name="top"></a>

![Banner do projeto Google Apps Script Utils](../assets/images/banner-1280x640.jpg)

<p align="right">
    <small>
        <i>Artista: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-utils&utm_content=banner-artist-credit" title="Portfólio da artista Daryna Mikhailenko">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](../../README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | **Português** | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Polski](README.pl.md) | [Čeština](README.cs.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Bahasa Indonesia](README.id.md) | [Tiếng Việt](README.vi.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [简体中文](README.zh.md) | [繁體中文](README.zh-TW.md)

> Esta tradução foi feita com ajuda de IA a partir do [README.md](../../README.md) para a versão 2.1.1. A versão de referência é o README em inglês; correções são bem-vindas — veja [CONTRIBUTING.md](../../CONTRIBUTING.md#readme-translations).

# Utilitários para Google Apps Script™

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

- [Utilitários para Google Apps Script™](#utilitários-para-google-apps-script)
  - [Visão geral](#visão-geral)
  - [Principais recursos](#principais-recursos)
  - [Skills para agentes de IA](#skills-para-agentes-de-ia)
  - [Requisitos](#requisitos)
  - [Instalação](#instalação)
  - [Documentação](#documentação)
  - [Exemplos de uso](#exemplos-de-uso)
  - [Desenvolvimento](#desenvolvimento)
    - [Scripts](#scripts)
    - [Testes](#testes)
  - [Estrutura do projeto](#estrutura-do-projeto)
  - [Funções por categoria](#funções-por-categoria)
  - [Como contribuir](#como-contribuir)
  - [Suporte](#suporte)
  - [Roadmap](#roadmap)
  - [Registro de alterações](#registro-de-alterações)
  - [Licença](#licença)
  <!-- TOC -->

## Visão geral

**@bootgs/utils** é uma biblioteca de utilitários em TypeScript criada especificamente para **Google Apps
Script**. Ela reúne as funções auxiliares que todo projeto GAS acaba escrevendo à mão — manipulação de planilhas e da
notação A1, validação de tipos e valores (`isX`/`nonX`/`requireX`), transformações de strings e arrays, exceções
tipadas e muito mais — em um único pacote bem documentado e totalmente testado.

## Principais recursos

- **Feita para Google Apps Script** — projetada em torno do ambiente de execução do GAS e de suas restrições, e não
  adaptada de uma biblioteca genérica de Node.js.
- **Ampla cobertura** — funções para planilhas, UI, rede e Admin SDK ao lado de utilitários de uso geral para
  strings, arrays e objetos.
- **TypeScript em primeiro lugar** — cada função vem com definições de tipos completas para autocompletar na IDE e
  segurança em tempo de compilação.
- **Testada** — coberta por uma suíte de testes unitários com Vitest.
- **Documentação de referência com links** — cada tipo do Google Apps Script usado na API aponta diretamente para a
  sua documentação oficial.
- **Tratamento de erros consistente** — uma hierarquia própria de classes de exceção substitui erros lançados de
  forma improvisada.

## Skills para agentes de IA

Para equipes que usam um agente de programação com IA (Claude Code, Gemini CLI e outros), o repositório
[bootgs/skills](https://github.com/bootgs/skills) oferece um Agent Skill
[`@bootgs/utils`](https://github.com/bootgs/skills/tree/main/skills/apps-script-utils) que documenta esta
biblioteca para esses agentes, incluindo a convenção de validação `isX`/`nonX`/`requireX`, as funções para notação A1
e planilhas, para strings, números e arrays, as exceções tipadas e as funções para HTML, JSON e caminhos.

Instalação com o Claude Code:

```bash
/plugin marketplace add bootgs/skills
/plugin install apps-script-utils@bootgs-skills
```

Instalação com a CLI `npx skills`, que oferece suporte a vários agentes:

```bash
npx skills add bootgs/skills --skill apps-script-utils
```

Depois de instalado, o agente aplica o skill automaticamente quando uma tarefa envolve esta biblioteca.

## Requisitos

- [Node.js](https://nodejs.org/) v22.14.0 ou superior
- [npm](https://www.npmjs.com/) (ou outro gerenciador de pacotes do Node, como o pnpm)

## Instalação

Instale o pacote via npm:

```bash
npm install @bootgs/utils
```

## Documentação

A documentação completa está publicada em **<https://bootgs.github.io/utils/>** (em inglês):
guias, explicações de cada módulo e a referência completa de funções. O código-fonte dela fica em
[`docs/writerside/`](../writerside/) e é reconstruído a cada push para `main`.

Uma boa ordem de leitura:

- [Getting started](https://bootgs.github.io/utils/getting-started.html) — primeiros passos
- [Validation conventions](https://bootgs.github.io/utils/validation-conventions.html) — o
  esquema de nomes `isX`/`nonX`/`requireX`/`requireNonX`
- [Exception handling](https://bootgs.github.io/utils/exception-handling.html) — a hierarquia de
  classes e o que dispara cada exceção
- [The Apps Script runtime](https://bootgs.github.io/utils/apps-script-runtime.html) — quais
  funções dependem de um serviço do Google e o que isso significa para os testes

## Exemplos de uso

### Trabalhando com planilhas

Adicionar várias linhas de dados de forma eficiente:

```typescript
import { appendRows } from "@bootgs/utils";

const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
const data = [
  ["John Doe", "john@example.com", 28],
  ["Jane Smith", "jane@example.com", 32]
];

appendRows(sheet, data);
```

### Utilitários do Admin SDK

Verificar se o usuário atual tem privilégios de administrador:

```typescript
import { isAdmin } from "@bootgs/utils";

if (isAdmin()) {
  Logger.log("Access granted to admin panel.");
} else {
  Logger.log("Access denied.");
}
```

### Análise da notação A1

Converter notações A1 complexas em objetos estruturados:

```typescript
import { parseA1Notation } from "@bootgs/utils";

const rangeInfo = parseA1Notation("'Sheet1'!A1:B10");

console.log(rangeInfo.sheetName); // "Sheet1"
console.log(rangeInfo.startRowIndex); // 0
console.log(rangeInfo.endColumnIndex); // 2
```

## Desenvolvimento

### Scripts

Os seguintes scripts estão disponíveis no `package.json`:

| Script               | Descrição                                                                         |
| :------------------- | :-------------------------------------------------------------------------------- |
| `npm run build`      | Limpa o diretório `dist` e compila o código-fonte TypeScript.                     |
| `npm run dev`        | Inicia o Vitest em modo watch.                                                    |
| `npm test`           | Executa uma vez a suíte de testes completa.                                       |
| `npm run type:check` | Verifica os tipos do projeto sem gerar saída.                                     |
| `npm run lint`       | Analisa o código com o ESLint.                                                    |
| `npm run lint:fix`   | Analisa o código e corrige automaticamente o que for possível.                    |
| `npm run format`     | Verifica a formatação com o Prettier.                                             |
| `npm run format:fix` | Formata o código com o Prettier.                                                  |
| `npm run prepare`    | Configura os hooks do Git do Husky (executado automaticamente após a instalação). |

### Testes

O projeto usa o [Vitest](https://vitest.dev/) para testes unitários.

Executar a suíte completa uma vez:

```bash
npm test
```

Ou executá-la em modo watch durante o desenvolvimento:

```bash
npm run dev
```

## Estrutura do projeto

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

## Funções por categoria

A referência completa de funções foi movida para o site de documentação, gerado a partir de
[`docs/writerside/`](../writerside/) e publicado a cada push para `main`:

**<https://bootgs.github.io/utils/>**

| Seção                                                                                 | Abrange                                                                                               |
| :------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------- |
| [Google Apps Script module](https://bootgs.github.io/utils/reference-appsscript.html) | Sheets, Slides, Admin SDK, Drive, Docs, Forms, requisições de rede e as classes de UI integradas      |
| [Base utilities](https://bootgs.github.io/utils/reference-base.html)                  | Verificação de tipos e validação, manipulação de strings, arrays e objetos, tratamento de JSON e HTML |
| [Exceptions](https://bootgs.github.io/utils/reference-exception.html)                 | As classes de exceção tipadas e o que dispara cada uma                                                |
| [`path` module](https://bootgs.github.io/utils/reference-path.html)                   | Caminhos de arquivos e URLs                                                                           |
| [Abstracts and interfaces](https://bootgs.github.io/utils/reference-abstracts.html)   | Blocos de construção compartilhados                                                                   |

Além da referência, o site traz os guias que não cabiam nas tabelas:
[validation conventions](https://bootgs.github.io/utils/validation-conventions.html) explica o
esquema `isX`/`nonX`/`requireX`/`requireNonX` em um só lugar,
[exception handling](https://bootgs.github.io/utils/exception-handling.html) apresenta a
hierarquia de classes e [the Apps Script runtime](https://bootgs.github.io/utils/apps-script-runtime.html)
mostra quais funções dependem de um serviço do Google, quanto isso custa e o que significa para os testes.

## Como contribuir

Contribuições são bem-vindas. Veja o guia completo em [CONTRIBUTING.md](../../CONTRIBUTING.md). Em resumo:

1. Faça um fork do repositório e crie um branch para o seu recurso ou correção.
2. Adicione ou atualize os testes que cobrem as suas alterações.
3. Execute `npm run lint` e `npm run format` antes de fazer commit.
4. Não edite o `CHANGELOG.md` manualmente — ele é gerado automaticamente pelo [release-please](https://github.com/googleapis/release-please).
5. Abra um pull request descrevendo o que mudou e por quê.

Siga o estilo de código e as convenções de nomenclatura existentes. As regras da comunidade estão em
[CODE_OF_CONDUCT.md](../../CODE_OF_CONDUCT.md).

## Suporte

- Para bugs ou pedidos de recursos, procure ou abra uma
  [issue](https://github.com/bootgs/utils/issues) no GitHub.
- Para as alterações recentes, veja o [registro de alterações](../../CHANGELOG.md).
- Para relatar uma vulnerabilidade de segurança, siga a [política de segurança](../../SECURITY.md) em vez de abrir uma
  issue pública.
- Para apoiar o desenvolvimento contínuo, veja o [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov).

## Roadmap

O que está planejado, em andamento ou concluído fica no [quadro do projeto](https://github.com/users/MaksymStoianov/projects/2/views/2),
montado a partir do próprio rastreador de issues. Não há um documento de roadmap separado que possa ficar
desatualizado em relação a ele: para propor algo, abra uma [issue](https://github.com/bootgs/utils/issues).

## Registro de alterações

Para a lista detalhada de alterações por versão, veja [CHANGELOG.md](../../CHANGELOG.md).

## Licença

Este projeto é licenciado sob a Apache License 2.0. Veja [LICENSE](../../LICENSE) para mais detalhes.

A ilustração do banner não faz parte dessa licença. Ela é obra de sua autora, pode ser reutilizada sem modificações
desde que a autora seja creditada com um link, e é regida por
[docs/assets/images/README.md](../assets/images/README.md).

## Marcas comerciais

Google Apps Script, Google Sheets, Google Slides, Google Docs, Google Forms e Google Drive são marcas comerciais da
Google LLC. Este projeto é uma biblioteca independente. Ele não é afiliado à Google LLC nem endossado ou patrocinado
por ela, e as marcas são usadas apenas para descrever com o que a biblioteca funciona.

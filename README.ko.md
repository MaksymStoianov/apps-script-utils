<a name="top"></a>

![Google Apps Script Utils 프로젝트 배너](docs/assets/images/banner-1280x640.jpg)

<p align="right">
    <small>
        <i>아티스트: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-utils&utm_content=banner-artist-credit" title="아티스트 Daryna Mikhailenko의 포트폴리오">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [Português](README.pt.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Polski](README.pl.md) | [Čeština](README.cs.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Bahasa Indonesia](README.id.md) | [Tiếng Việt](README.vi.md) | [日本語](README.ja.md) | **한국어** | [简体中文](README.zh.md) | [繁體中文](README.zh-TW.md)

> 이 번역은 버전 2.1.1의 [README.md](README.md)를 바탕으로 AI의 도움을 받아 작성했습니다. 기준이 되는 버전은 영어 README이며, 수정 제안을 환영합니다. 자세한 내용은 [CONTRIBUTING.md](CONTRIBUTING.md#readme-translations)를 참고하세요.

# Google Apps Script™용 유틸리티

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

- [Google Apps Script™용 유틸리티](#google-apps-script용-유틸리티)
  - [개요](#개요)
  - [주요 기능](#주요-기능)
  - [AI 에이전트용 스킬](#ai-에이전트용-스킬)
  - [요구 사항](#요구-사항)
  - [설치](#설치)
  - [문서](#문서)
  - [사용 예제](#사용-예제)
  - [개발](#개발)
    - [스크립트](#스크립트)
    - [테스트](#테스트)
  - [프로젝트 구조](#프로젝트-구조)
  - [카테고리별 함수](#카테고리별-함수)
  - [기여하기](#기여하기)
  - [지원](#지원)
  - [로드맵](#로드맵)
  - [변경 이력](#변경-이력)
  - [라이선스](#라이선스)
  <!-- TOC -->

## 개요

**@bootgs/utils**는 **Google Apps Script** 전용으로 만든 TypeScript 유틸리티 라이브러리입니다. 모든 GAS 프로젝트에서 결국 직접 작성하게 되는 헬퍼 — 스프레드시트와 A1 표기법 조작, 타입·값 검증(`isX`/`nonX`/`requireX`), 문자열과 배열 변환, 타입이 지정된 예외 등 — 를 문서화가 잘 되어 있고 테스트를 모두 거친 하나의 패키지로 모았습니다.

## 주요 기능

- **Google Apps Script 전용 설계** — 범용 Node.js 라이브러리를 옮겨 온 것이 아니라 GAS 런타임과 그 제약을 기준으로 설계했습니다.
- **폭넓은 유틸리티** — 스프레드시트, UI, 네트워크, Admin SDK 헬퍼와 함께 문자열, 배열, 객체를 위한 범용 유틸리티를 제공합니다.
- **TypeScript 우선** — 모든 함수에 완전한 타입 정의가 포함되어 IDE 자동 완성과 컴파일 타임 안전성을 누릴 수 있습니다.
- **테스트 완료** — Vitest 단위 테스트 스위트로 검증됩니다.
- **연결된 레퍼런스 문서** — API에서 사용하는 모든 Google Apps Script 타입이 공식 문서로 바로 연결됩니다.
- **일관된 오류 처리** — 그때그때 던지는 오류 대신 전용 예외 클래스 계층 구조를 사용합니다.

## AI 에이전트용 스킬

AI 코딩 에이전트(Claude Code, Gemini CLI 등)를 사용하는 팀을 위해 [bootgs/skills](https://github.com/bootgs/skills) 저장소는 이 라이브러리를 에이전트에게 설명하는 [`@bootgs/utils`](https://github.com/bootgs/skills/tree/main/skills/apps-script-utils) Agent Skill을 제공합니다. 여기에는 `isX`/`nonX`/`requireX` 검증 규칙, A1 표기법과 시트 헬퍼, 문자열·숫자·배열 헬퍼, 타입이 지정된 예외, HTML/JSON/경로 헬퍼가 포함됩니다.

Claude Code로 설치:

```bash
/plugin marketplace add bootgs/skills
/plugin install apps-script-utils@bootgs-skills
```

여러 에이전트를 지원하는 `npx skills` CLI로 설치:

```bash
npx skills add bootgs/skills --skill apps-script-utils
```

설치가 끝나면 작업이 이 라이브러리와 관련될 때 에이전트가 스킬을 자동으로 적용합니다.

## 요구 사항

- [Node.js](https://nodejs.org/) v22.14.0 이상
- [npm](https://www.npmjs.com/) (또는 pnpm 같은 다른 Node 패키지 관리자)

## 설치

npm으로 패키지를 설치합니다.

```bash
npm install @bootgs/utils
```

## 문서

전체 문서는 **<https://bootgs.github.io/utils/>**(영어)에 게시되어 있습니다. 가이드, 모듈별 안내, 전체 함수 레퍼런스를 담고 있습니다. 소스는 [`docs/writerside/`](docs/writerside/)에 있으며 `main`에 push할 때마다 다시 빌드됩니다.

추천하는 읽는 순서:

- [Getting started](https://bootgs.github.io/utils/getting-started.html) — 시작하기
- [Validation conventions](https://bootgs.github.io/utils/validation-conventions.html) — `isX`/`nonX`/`requireX`/`requireNonX` 명명 규칙
- [Exception handling](https://bootgs.github.io/utils/exception-handling.html) — 예외 클래스 계층 구조와 각 예외가 발생하는 상황
- [The Apps Script runtime](https://bootgs.github.io/utils/apps-script-runtime.html) — 어떤 헬퍼가 Google 서비스에 묶여 있는지, 그리고 그것이 테스트에 어떤 의미인지

## 사용 예제

### 시트 다루기

여러 행의 데이터를 효율적으로 추가합니다.

```typescript
import { appendRows } from "@bootgs/utils";

const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
const data = [
  ["John Doe", "john@example.com", 28],
  ["Jane Smith", "jane@example.com", 32]
];

appendRows(sheet, data);
```

### Admin SDK 유틸리티

현재 사용자에게 관리자 권한이 있는지 확인합니다.

```typescript
import { isAdmin } from "@bootgs/utils";

if (isAdmin()) {
  Logger.log("Access granted to admin panel.");
} else {
  Logger.log("Access denied.");
}
```

### A1 표기법 파싱

복잡한 A1 표기법을 구조화된 객체로 파싱합니다.

```typescript
import { parseA1Notation } from "@bootgs/utils";

const rangeInfo = parseA1Notation("'Sheet1'!A1:B10");

console.log(rangeInfo.sheetName); // "Sheet1"
console.log(rangeInfo.startRowIndex); // 0
console.log(rangeInfo.endColumnIndex); // 2
```

## 개발

### 스크립트

`package.json`에서 다음 스크립트를 사용할 수 있습니다.

| 스크립트             | 설명                                                     |
| :------------------- | :------------------------------------------------------- |
| `npm run build`      | `dist` 디렉터리를 비우고 TypeScript 소스를 컴파일합니다. |
| `npm run dev`        | Vitest를 watch 모드로 시작합니다.                        |
| `npm test`           | 전체 테스트 스위트를 한 번 실행합니다.                   |
| `npm run type:check` | 출력물을 생성하지 않고 프로젝트의 타입을 검사합니다.     |
| `npm run lint`       | ESLint로 코드베이스를 검사합니다.                        |
| `npm run lint:fix`   | 코드베이스를 검사하고 가능한 문제를 자동으로 수정합니다. |
| `npm run format`     | Prettier로 포맷을 확인합니다.                            |
| `npm run format:fix` | Prettier로 코드베이스를 포맷합니다.                      |
| `npm run prepare`    | Husky Git 훅을 설정합니다(설치 후 자동으로 실행됨).      |

### 테스트

이 프로젝트는 단위 테스트에 [Vitest](https://vitest.dev/)를 사용합니다.

전체 스위트를 한 번 실행:

```bash
npm test
```

또는 개발 중에 watch 모드로 실행:

```bash
npm run dev
```

## 프로젝트 구조

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

## 카테고리별 함수

전체 함수 레퍼런스는 문서 사이트(영어)로 옮겨졌습니다. 이 사이트는 [`docs/writerside/`](docs/writerside/)에서 빌드되며 `main`에 push할 때마다 게시됩니다.

**<https://bootgs.github.io/utils/>**

| 섹션                                                                                  | 다루는 내용                                                                  |
| :------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------- |
| [Google Apps Script module](https://bootgs.github.io/utils/reference-appsscript.html) | Sheets, Slides, Admin SDK, Drive, Docs, Forms, 네트워크 요청, 내장 UI 클래스 |
| [Base utilities](https://bootgs.github.io/utils/reference-base.html)                  | 타입 검사와 유효성 검사, 문자열·배열·객체 조작, JSON 및 HTML 처리            |
| [Exceptions](https://bootgs.github.io/utils/reference-exception.html)                 | 타입이 지정된 예외 클래스와 각 예외가 발생하는 상황                          |
| [`path` module](https://bootgs.github.io/utils/reference-path.html)                   | 파일 경로와 URL                                                              |
| [Abstracts and interfaces](https://bootgs.github.io/utils/reference-abstracts.html)   | 공통 구성 요소                                                               |

레퍼런스와 함께, 표로는 담을 수 없었던 가이드도 사이트에서 제공합니다. [validation conventions](https://bootgs.github.io/utils/validation-conventions.html)는 `isX`/`nonX`/`requireX`/`requireNonX` 규칙을 한곳에서 설명하고, [exception handling](https://bootgs.github.io/utils/exception-handling.html)은 클래스 계층 구조를 정리하며, [the Apps Script runtime](https://bootgs.github.io/utils/apps-script-runtime.html)은 어떤 헬퍼가 Google 서비스에 묶여 있는지, 그에 따른 비용은 무엇인지, 테스트에는 어떤 의미가 있는지를 다룹니다.

## 기여하기

기여를 환영합니다. 전체 가이드는 [CONTRIBUTING.md](CONTRIBUTING.md)를 참고하세요. 요약하면 다음과 같습니다.

1. 저장소를 포크하고 기능 추가나 버그 수정을 위한 브랜치를 만듭니다.
2. 변경 사항을 검증하는 테스트를 추가하거나 업데이트합니다.
3. 커밋하기 전에 `npm run lint`와 `npm run format`을 실행합니다.
4. `CHANGELOG.md`는 직접 수정하지 마세요. [release-please](https://github.com/googleapis/release-please)가 자동으로 생성합니다.
5. 무엇을 왜 변경했는지 설명하는 풀 리퀘스트를 엽니다.

기존 코드 스타일과 명명 규칙을 따라 주세요. 커뮤니티 가이드라인은 [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)를 참고하세요.

## 지원

- 버그 신고나 기능 요청은 GitHub에서 [이슈](https://github.com/bootgs/utils/issues)를 검색하거나 새로 등록해 주세요.
- 최근 변경 사항은 [변경 이력](CHANGELOG.md)을 참고하세요.
- 보안 취약점은 공개 이슈를 여는 대신 [보안 정책](SECURITY.md)에 따라 신고해 주세요.
- 지속적인 개발을 후원하려면 [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov)를 참고하세요.

## 로드맵

계획 중이거나 진행 중이거나 완료된 작업은 이슈 트래커를 바탕으로 만든 [프로젝트 보드](https://github.com/users/MaksymStoianov/projects/2/views/2)에서 확인할 수 있습니다. 보드와 어긋날 수 있는 별도의 로드맵 문서는 두지 않습니다. 제안할 내용이 있다면 [이슈](https://github.com/bootgs/utils/issues)를 열어 주세요.

## 변경 이력

버전별 변경 사항의 자세한 목록은 [CHANGELOG.md](CHANGELOG.md)를 참고하세요.

## 라이선스

이 프로젝트는 Apache License 2.0에 따라 배포됩니다. 자세한 내용은 [LICENSE](LICENSE)를 참고하세요.

배너 일러스트는 이 라이선스에 포함되지 않습니다. 이 작품은 작가의 저작물로, 작가를 표기하고 그 표기에 링크를 걸면 수정하지 않은 상태로 재사용할 수 있으며, [docs/assets/images/README.md](docs/assets/images/README.md)의 적용을 받습니다.

## 상표

Google Apps Script, Google Sheets, Google Slides, Google Docs, Google Forms, Google Drive는 Google LLC의 상표입니다. 이 프로젝트는 독립적인 라이브러리이며 Google LLC와 제휴하거나 Google LLC의 보증 또는 후원을 받지 않습니다. 상표는 이 라이브러리가 함께 동작하는 대상을 설명하기 위해서만 사용됩니다.

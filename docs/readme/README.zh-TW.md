<a name="top"></a>

![Google Apps Script Utils 專案橫幅](../assets/images/banner-1280x640.jpg)

<p align="right">
    <small>
        <i>藝術家：<a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-utils&utm_content=banner-artist-credit" title="藝術家 Daryna Mikhailenko 的作品集">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](../../README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [Português](README.pt.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Polski](README.pl.md) | [Čeština](README.cs.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Bahasa Indonesia](README.id.md) | [Tiếng Việt](README.vi.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [简体中文](README.zh.md) | **繁體中文**

> 本翻譯以 AI 輔助，依據版本 2.1.1 的 [README.md](../../README.md) 製作。參考版本為英文版 README；歡迎提出修正，請參閱 [CONTRIBUTING.md](../../CONTRIBUTING.md#readme-translations)。

# Google Apps Script™ 工具函式庫

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

- [Google Apps Script™ 工具函式庫](#google-apps-script-工具函式庫)
  - [概覽](#概覽)
  - [主要功能](#主要功能)
  - [AI 代理技能](#ai-代理技能)
  - [系統需求](#系統需求)
  - [安裝](#安裝)
  - [文件](#文件)
  - [使用範例](#使用範例)
  - [開發](#開發)
    - [指令碼](#指令碼)
    - [測試](#測試)
  - [專案結構](#專案結構)
  - [依類別分類的函式](#依類別分類的函式)
  - [參與貢獻](#參與貢獻)
  - [支援](#支援)
  - [路線圖](#路線圖)
  - [變更紀錄](#變更紀錄)
  - [授權條款](#授權條款)
  <!-- TOC -->

## 概覽

**@bootgs/utils** 是專為 **Google Apps Script** 打造的 TypeScript 工具函式庫。每個 GAS 專案最後都得自己動手寫的輔助函式，例如試算表與 A1 表示法操作、型別與值的驗證（`isX`/`nonX`/`requireX`）、字串與陣列轉換、具型別的例外等，都集中在這個文件完善且經過完整測試的套件中。

## 主要功能

- **為 Google Apps Script 而打造**：圍繞 GAS 執行階段及其限制設計，而非從通用的 Node.js 函式庫改寫而來。
- **涵蓋範圍廣泛**：除了通用的字串、陣列與物件工具，還提供試算表、UI、網路與 Admin SDK 的輔助函式。
- **TypeScript 優先**：每個函式都附有完整的型別定義，支援 IDE 自動完成並提供編譯期的型別安全。
- **經過測試**：由 Vitest 單元測試套件涵蓋。
- **附連結的參考文件**：API 中用到的每個 Google Apps Script 型別都直接連結到其官方文件。
- **一致的錯誤處理**：以專用的例外類別階層取代臨時拋出的錯誤。

## AI 代理技能

對於使用 AI 程式設計代理（Claude Code、Gemini CLI 等）的團隊，[bootgs/skills](https://github.com/bootgs/skills) 儲存庫提供 [`@bootgs/utils`](https://github.com/bootgs/skills/tree/main/skills/apps-script-utils) Agent Skill，為這類代理說明本函式庫，內容包括 `isX`/`nonX`/`requireX` 驗證慣例、A1 表示法與工作表輔助函式、字串/數字/陣列輔助函式、具型別的例外，以及 HTML/JSON/路徑輔助函式。

使用 Claude Code 安裝：

```bash
/plugin marketplace add bootgs/skills
/plugin install apps-script-utils@bootgs-skills
```

使用支援多種代理的 `npx skills` CLI 安裝：

```bash
npx skills add bootgs/skills --skill apps-script-utils
```

安裝完成後，只要任務與本函式庫有關，代理就會自動套用此技能。

## 系統需求

- [Node.js](https://nodejs.org/) v22.14.0 或更新版本
- [npm](https://www.npmjs.com/)（或其他 Node 套件管理工具，例如 pnpm）

## 安裝

透過 npm 安裝套件：

```bash
npm install @bootgs/utils
```

## 文件

完整文件發布於 **<https://bootgs.github.io/utils/>**（英文），包含指南、各模組的逐步說明，以及完整的函式參考。其原始檔位於 [`docs/writerside/`](../writerside/)，每次推送到 `main` 時都會重新建置。

建議的閱讀順序：

- [Getting started](https://bootgs.github.io/utils/getting-started.html)：入門
- [Validation conventions](https://bootgs.github.io/utils/validation-conventions.html)：`isX`/`nonX`/`requireX`/`requireNonX` 命名規則
- [Exception handling](https://bootgs.github.io/utils/exception-handling.html)：類別階層，以及各個例外的觸發情況
- [The Apps Script runtime](https://bootgs.github.io/utils/apps-script-runtime.html)：哪些輔助函式綁定 Google 服務，以及這對測試有什麼影響

## 使用範例

### 操作工作表

有效率地附加多列資料：

```typescript
import { appendRows } from "@bootgs/utils";

const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
const data = [
  ["John Doe", "john@example.com", 28],
  ["Jane Smith", "jane@example.com", 32]
];

appendRows(sheet, data);
```

### Admin SDK 工具

檢查目前的使用者是否具有管理員權限：

```typescript
import { isAdmin } from "@bootgs/utils";

if (isAdmin()) {
  Logger.log("Access granted to admin panel.");
} else {
  Logger.log("Access denied.");
}
```

### 解析 A1 表示法

將複雜的 A1 表示法解析為結構化物件：

```typescript
import { parseA1Notation } from "@bootgs/utils";

const rangeInfo = parseA1Notation("'Sheet1'!A1:B10");

console.log(rangeInfo.sheetName); // "Sheet1"
console.log(rangeInfo.startRowIndex); // 0
console.log(rangeInfo.endColumnIndex); // 2
```

## 開發

### 指令碼

`package.json` 中提供下列指令碼：

| 指令碼               | 說明                                             |
| :------------------- | :----------------------------------------------- |
| `npm run build`      | 清除 `dist` 目錄並編譯 TypeScript 原始碼。       |
| `npm run dev`        | 以監看模式啟動 Vitest。                          |
| `npm test`           | 執行一次完整的測試套件。                         |
| `npm run type:check` | 對專案進行型別檢查，不產生輸出。                 |
| `npm run lint`       | 使用 ESLint 檢查程式碼。                         |
| `npm run lint:fix`   | 使用 ESLint 檢查程式碼，並自動修正可修正的問題。 |
| `npm run format`     | 使用 Prettier 檢查格式。                         |
| `npm run format:fix` | 使用 Prettier 格式化程式碼。                     |
| `npm run prepare`    | 設定 Husky 的 Git hooks（安裝後自動執行）。      |

### 測試

本專案使用 [Vitest](https://vitest.dev/) 進行單元測試。

執行一次完整的測試套件：

```bash
npm test
```

或在開發期間以監看模式執行：

```bash
npm run dev
```

## 專案結構

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

## 依類別分類的函式

完整的函式參考已移至文件網站（英文）。該網站由 [`docs/writerside/`](../writerside/) 建置，每次推送到 `main` 時發布：

**<https://bootgs.github.io/utils/>**

| 章節                                                                                  | 內容                                                                        |
| :------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------- |
| [Google Apps Script module](https://bootgs.github.io/utils/reference-appsscript.html) | Sheets、Slides、Admin SDK、Drive、Docs、Forms、網路請求，以及內建的 UI 類別 |
| [Base utilities](https://bootgs.github.io/utils/reference-base.html)                  | 型別檢查與驗證，字串、陣列與物件操作，JSON 與 HTML 處理                     |
| [Exceptions](https://bootgs.github.io/utils/reference-exception.html)                 | 具型別的例外類別，以及各自的觸發情況                                        |
| [`path` module](https://bootgs.github.io/utils/reference-path.html)                   | 檔案路徑與 URL                                                              |
| [Abstracts and interfaces](https://bootgs.github.io/utils/reference-abstracts.html)   | 共用的基礎元件                                                              |

除了參考資料之外，網站上還有表格無法容納的指南：[validation conventions](https://bootgs.github.io/utils/validation-conventions.html) 集中說明 `isX`/`nonX`/`requireX`/`requireNonX` 命名規則，[exception handling](https://bootgs.github.io/utils/exception-handling.html) 介紹類別階層，[the Apps Script runtime](https://bootgs.github.io/utils/apps-script-runtime.html) 則說明哪些輔助函式綁定 Google 服務、這樣做的代價，以及對測試的影響。

## 參與貢獻

歡迎參與貢獻。完整指南請參閱 [CONTRIBUTING.md](../../CONTRIBUTING.md)。簡要步驟如下：

1. Fork 本儲存庫，並為你的新功能或錯誤修正建立分支。
2. 新增或更新測試，以涵蓋你的變更。
3. 提交（commit）前請執行 `npm run lint` 與 `npm run format`。
4. 請勿手動編輯 `CHANGELOG.md`，它由 [release-please](https://github.com/googleapis/release-please) 自動產生。
5. 開啟 pull request，說明變更了什麼以及原因。

請遵循既有的程式碼風格與命名慣例。社群準則請參閱 [CODE_OF_CONDUCT.md](../../CODE_OF_CONDUCT.md)。

## 支援

- 如需回報錯誤或提出功能需求，請在 GitHub 上搜尋或開啟 [issue](https://github.com/bootgs/utils/issues)。
- 近期的變更請參閱[變更紀錄](../../CHANGELOG.md)。
- 如需回報安全漏洞，請依照[安全政策](../../SECURITY.md)辦理，不要開啟公開的 issue。
- 如想支持專案的持續開發，請前往 [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov)。

## 路線圖

已規劃、進行中與已完成的項目都列在[專案看板](https://github.com/users/MaksymStoianov/projects/2/views/2)上，看板直接由 issue 追蹤系統產生。沒有另外維護、可能與之脫節的路線圖文件：如想提出建議，請開啟 [issue](https://github.com/bootgs/utils/issues)。

## 變更紀錄

依版本列出的詳細變更清單，請參閱 [CHANGELOG.md](../../CHANGELOG.md)。

## 授權條款

本專案採用 Apache License 2.0 授權。詳情請參閱 [LICENSE](../../LICENSE)。

橫幅插圖不在該授權範圍內。它是作者的作品，在標註作者並附上連結的前提下，可不經修改地重複使用，相關規範請見 [docs/assets/images/README.md](../assets/images/README.md)。

## 商標

Google Apps Script、Google Sheets、Google Slides、Google Docs、Google Forms 與 Google Drive 是 Google LLC 的商標。本專案是一個獨立的函式庫，與 Google LLC 沒有任何關聯，亦未獲其背書或贊助；這些商標僅用於說明本函式庫的適用對象。

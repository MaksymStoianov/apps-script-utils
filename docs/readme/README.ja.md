<a name="top"></a>

![Google Apps Script Utils プロジェクトのバナー](../assets/images/banner-1280x640.jpg)

<p align="right">
    <small>
        <i>イラスト: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-utils&utm_content=banner-artist-credit" title="アーティスト Daryna Mikhailenko のポートフォリオ">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](../../README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [Português](README.pt.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Polski](README.pl.md) | [Čeština](README.cs.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Bahasa Indonesia](README.id.md) | [Tiếng Việt](README.vi.md) | **日本語** | [한국어](README.ko.md) | [简体中文](README.zh.md) | [繁體中文](README.zh-TW.md)

> この翻訳は、バージョン 2.1.1 の [README.md](../../README.md) をもとに AI の支援を受けて作成しました。正式な内容は英語版 README です。修正の提案を歓迎します。詳しくは [CONTRIBUTING.md](../../CONTRIBUTING.md#readme-translations) をご覧ください。

# Google Apps Script™ 向けユーティリティ

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

- [Google Apps Script™ 向けユーティリティ](#google-apps-script-向けユーティリティ)
  - [概要](#概要)
  - [主な特長](#主な特長)
  - [AI エージェント向けスキル](#ai-エージェント向けスキル)
  - [動作要件](#動作要件)
  - [インストール](#インストール)
  - [ドキュメント](#ドキュメント)
  - [使用例](#使用例)
  - [開発](#開発)
    - [スクリプト](#スクリプト)
    - [テスト](#テスト)
  - [プロジェクト構成](#プロジェクト構成)
  - [カテゴリ別の関数](#カテゴリ別の関数)
  - [コントリビューション](#コントリビューション)
  - [サポート](#サポート)
  - [ロードマップ](#ロードマップ)
  - [変更履歴](#変更履歴)
  - [ライセンス](#ライセンス)
  <!-- TOC -->

## 概要

**@bootgs/utils** は、**Google Apps Script** 専用に作られた TypeScript のユーティリティライブラリです。どの GAS プロジェクトでも結局は手書きすることになるヘルパー — スプレッドシートと A1 表記の操作、型と値の検証（`isX`/`nonX`/`requireX`）、文字列と配列の変換、型付き例外など — を、十分にドキュメント化され、すべてテスト済みのひとつのパッケージにまとめています。

## 主な特長

- **Google Apps Script のための設計** — 汎用の Node.js ライブラリを流用したものではなく、GAS ランタイムとその制約を前提に設計されています。
- **幅広いユーティリティ** — スプレッドシート、UI、ネットワーク、Admin SDK 向けのヘルパーに加え、文字列・配列・オブジェクト向けの汎用ユーティリティを備えています。
- **TypeScript ファースト** — すべての関数に完全な型定義が付属し、IDE での補完とコンパイル時の安全性が得られます。
- **テスト済み** — Vitest による単体テストスイートでカバーされています。
- **リンク付きリファレンス** — API で使われる Google Apps Script の型は、すべて公式ドキュメントに直接リンクしています。
- **一貫したエラー処理** — その場しのぎで投げられるエラーの代わりに、専用の例外クラス階層を使います。

## AI エージェント向けスキル

AI コーディングエージェント（Claude Code、Gemini CLI など）を使うチーム向けに、[bootgs/skills](https://github.com/bootgs/skills) リポジトリが Agent Skill [`@bootgs/utils`](https://github.com/bootgs/skills/tree/main/skills/apps-script-utils) を提供しています。このスキルはエージェント向けにこのライブラリを説明するもので、`isX`/`nonX`/`requireX` の検証規約、A1 表記とシートのヘルパー、文字列・数値・配列のヘルパー、型付き例外、HTML・JSON・パスのヘルパーを扱います。

Claude Code でのインストール:

```bash
/plugin marketplace add bootgs/skills
/plugin install apps-script-utils@bootgs-skills
```

複数のエージェントに対応した `npx skills` CLI でのインストール:

```bash
npx skills add bootgs/skills --skill apps-script-utils
```

インストール後は、タスクがこのライブラリに関係する場合にエージェントが自動的にスキルを適用します。

## 動作要件

- [Node.js](https://nodejs.org/) v22.14.0 以降
- [npm](https://www.npmjs.com/)（または pnpm など他の Node パッケージマネージャー）

## インストール

npm でパッケージをインストールします:

```bash
npm install @bootgs/utils
```

## ドキュメント

完全なドキュメントは **<https://bootgs.github.io/utils/>**（英語）で公開しています。ガイド、モジュールごとの解説、関数リファレンスのすべてが含まれます。ソースは [`docs/writerside/`](../writerside/) にあり、`main` への push のたびに再ビルドされます。

おすすめの読む順番:

- [Getting started](https://bootgs.github.io/utils/getting-started.html) — はじめに
- [Validation conventions](https://bootgs.github.io/utils/validation-conventions.html) — `isX`/`nonX`/`requireX`/`requireNonX` の命名規則
- [Exception handling](https://bootgs.github.io/utils/exception-handling.html) — クラス階層と、それぞれの例外が発生する条件
- [The Apps Script runtime](https://bootgs.github.io/utils/apps-script-runtime.html) — どのヘルパーが Google のサービスに依存しているか、それがテストにとって何を意味するか

## 使用例

### シートの操作

複数行のデータを効率よく追加します:

```typescript
import { appendRows } from "@bootgs/utils";

const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
const data = [
  ["John Doe", "john@example.com", 28],
  ["Jane Smith", "jane@example.com", 32]
];

appendRows(sheet, data);
```

### Admin SDK ユーティリティ

現在のユーザーが管理者権限を持っているかを確認します:

```typescript
import { isAdmin } from "@bootgs/utils";

if (isAdmin()) {
  Logger.log("Access granted to admin panel.");
} else {
  Logger.log("Access denied.");
}
```

### A1 表記の解析

複雑な A1 表記を構造化されたオブジェクトに解析します:

```typescript
import { parseA1Notation } from "@bootgs/utils";

const rangeInfo = parseA1Notation("'Sheet1'!A1:B10");

console.log(rangeInfo.sheetName); // "Sheet1"
console.log(rangeInfo.startRowIndex); // 0
console.log(rangeInfo.endColumnIndex); // 2
```

## 開発

### スクリプト

`package.json` では次のスクリプトを利用できます:

| スクリプト           | 説明                                                                  |
| :------------------- | :-------------------------------------------------------------------- |
| `npm run build`      | `dist` ディレクトリを空にして TypeScript のソースをコンパイルします。 |
| `npm run dev`        | Vitest をウォッチモードで起動します。                                 |
| `npm test`           | テストスイート全体を一度だけ実行します。                              |
| `npm run type:check` | 出力を生成せずにプロジェクトの型チェックを行います。                  |
| `npm run lint`       | ESLint でコードベースをチェックします。                               |
| `npm run lint:fix`   | ESLint でチェックし、自動修正できるものを修正します。                 |
| `npm run format`     | Prettier でフォーマットをチェックします。                             |
| `npm run format:fix` | Prettier でコードベースを整形します。                                 |
| `npm run prepare`    | Husky の Git フックを設定します（インストール後に自動実行）。         |

### テスト

このプロジェクトは単体テストに [Vitest](https://vitest.dev/) を使用しています。

スイート全体を一度だけ実行:

```bash
npm test
```

開発中はウォッチモードで実行:

```bash
npm run dev
```

## プロジェクト構成

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

## カテゴリ別の関数

関数リファレンスの全体はドキュメントサイトに移りました。サイトは [`docs/writerside/`](../writerside/) からビルドされ、`main` への push のたびに公開されます:

**<https://bootgs.github.io/utils/>**

| セクション                                                                            | 内容                                                                                      |
| :------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------- |
| [Google Apps Script module](https://bootgs.github.io/utils/reference-appsscript.html) | Sheets、Slides、Admin SDK、Drive、Docs、Forms、ネットワークリクエスト、組み込み UI クラス |
| [Base utilities](https://bootgs.github.io/utils/reference-base.html)                  | 型チェックと検証、文字列・配列・オブジェクトの操作、JSON と HTML の処理                   |
| [Exceptions](https://bootgs.github.io/utils/reference-exception.html)                 | 型付き例外クラスと、それぞれが発生する条件                                                |
| [`path` module](https://bootgs.github.io/utils/reference-path.html)                   | ファイルパスと URL                                                                        |
| [Abstracts and interfaces](https://bootgs.github.io/utils/reference-abstracts.html)   | 共通の構成要素                                                                            |

リファレンスのほかに、表には収まらないガイドもサイトにあります。[validation conventions](https://bootgs.github.io/utils/validation-conventions.html) は `isX`/`nonX`/`requireX`/`requireNonX` の規則を一か所で説明し、[exception handling](https://bootgs.github.io/utils/exception-handling.html) はクラス階層を示し、[the Apps Script runtime](https://bootgs.github.io/utils/apps-script-runtime.html) はどのヘルパーが Google のサービスに依存しているか、そのコスト、そしてテストにとっての意味を扱います。

## コントリビューション

コントリビューションを歓迎します。詳しいガイドは [CONTRIBUTING.md](../../CONTRIBUTING.md) をご覧ください。概要は次のとおりです:

1. リポジトリをフォークし、機能追加やバグ修正用のブランチを作成します。
2. 変更をカバーするテストを追加または更新します。
3. コミット前に `npm run lint` と `npm run format` を実行します。
4. `CHANGELOG.md` は手で編集しないでください。[release-please](https://github.com/googleapis/release-please) が自動生成します。
5. 何をなぜ変更したかを説明した pull request を作成します。

既存のコードスタイルと命名規則に従ってください。コミュニティのガイドラインは [CODE_OF_CONDUCT.md](../../CODE_OF_CONDUCT.md) にあります。

## サポート

- バグ報告や機能要望は、GitHub で [issue](https://github.com/bootgs/utils/issues) を検索するか新しく作成してください。
- 最近の変更は [変更履歴](../../CHANGELOG.md) をご覧ください。
- セキュリティ上の脆弱性は、公開 issue を作成せず [セキュリティポリシー](../../SECURITY.md) に従って報告してください。
- 継続的な開発を支援するには [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov) をご覧ください。

## ロードマップ

計画中、進行中、完了済みの項目は、issue トラッカーから作られた [プロジェクトボード](https://github.com/users/MaksymStoianov/projects/2/views/2) にあります。ボードとずれてしまう別のロードマップ文書はありません。提案がある場合は [issue](https://github.com/bootgs/utils/issues) を作成してください。

## 変更履歴

バージョンごとの詳しい変更内容は [CHANGELOG.md](../../CHANGELOG.md) をご覧ください。

## ライセンス

このプロジェクトは Apache License 2.0 の下でライセンスされています。詳しくは [LICENSE](../../LICENSE) をご覧ください。

バナーのイラストはこのライセンスの対象外です。作者の著作物であり、作者のクレジットとそのリンクを表示すれば改変せずに再利用でき、その条件は [docs/assets/images/README.md](../assets/images/README.md) に定められています。

## 商標

Google Apps Script、Google Sheets、Google Slides、Google Docs、Google Forms、Google Drive は Google LLC の商標です。このプロジェクトは独立したライブラリです。Google LLC とは提携しておらず、Google LLC による承認や後援も受けていません。商標は、このライブラリが扱う対象を説明するためにのみ使用しています。

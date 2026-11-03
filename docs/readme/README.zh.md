<a name="top"></a>

![Google Apps Script Utils 项目横幅](../assets/images/banner-1280x640.jpg)

<p align="right">
    <small>
        <i>插画：<a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-utils&utm_content=banner-artist-credit" title="艺术家 Daryna Mikhailenko 的作品集">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](../../README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [Português](README.pt.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Polski](README.pl.md) | [Čeština](README.cs.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Bahasa Indonesia](README.id.md) | [Tiếng Việt](README.vi.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | **简体中文** | [繁體中文](README.zh-TW.md)

> 本译文借助 AI 根据 2.1.1 版本的 [README.md](../../README.md) 翻译而成。以英文版 README 为准；欢迎指正——请参阅 [CONTRIBUTING.md](../../CONTRIBUTING.md#readme-translations)。

# Google Apps Script™ 实用工具库

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

- [Google Apps Script™ 实用工具库](#google-apps-script-实用工具库)
  - [概述](#概述)
  - [主要特性](#主要特性)
  - [AI 智能体技能](#ai-智能体技能)
  - [环境要求](#环境要求)
  - [安装](#安装)
  - [文档](#文档)
  - [使用示例](#使用示例)
  - [开发](#开发)
    - [脚本](#脚本)
    - [测试](#测试)
  - [项目结构](#项目结构)
  - [按类别划分的函数](#按类别划分的函数)
  - [参与贡献](#参与贡献)
  - [支持](#支持)
  - [路线图](#路线图)
  - [更新日志](#更新日志)
  - [许可证](#许可证)
  <!-- TOC -->

## 概述

**@bootgs/utils** 是专为 **Google Apps Script** 打造的 TypeScript 实用工具库。它把每个 GAS 项目迟早都要手写的辅助函数——电子表格与 A1 表示法操作、类型与值校验（`isX`/`nonX`/`requireX`）、字符串与数组转换、类型化异常等——汇集到一个文档完善、经过全面测试的包中。

## 主要特性

- **为 Google Apps Script 而生**——围绕 GAS 运行时及其限制而设计，而不是从通用的 Node.js 库改编而来。
- **覆盖面广**——除通用的字符串、数组和对象工具外，还提供电子表格、UI、网络和 Admin SDK 相关的辅助函数。
- **TypeScript 优先**——每个函数都附带完整的类型定义，支持 IDE 自动补全并提供编译期安全。
- **经过测试**——由基于 Vitest 的单元测试套件覆盖。
- **带链接的参考文档**——API 中用到的每个 Google Apps Script 类型都直接链接到其官方文档。
- **一致的错误处理**——用专门的异常类层次结构取代随意抛出的错误。

## AI 智能体技能

对于使用 AI 编程智能体（Claude Code、Gemini CLI 等）的团队，[bootgs/skills](https://github.com/bootgs/skills) 仓库提供了 [`@bootgs/utils`](https://github.com/bootgs/skills/tree/main/skills/apps-script-utils) Agent Skill，为这类智能体介绍本库，内容包括 `isX`/`nonX`/`requireX` 校验约定、A1 表示法与工作表辅助函数、字符串/数字/数组辅助函数、类型化异常，以及 HTML/JSON/路径辅助函数。

使用 Claude Code 安装：

```bash
/plugin marketplace add bootgs/skills
/plugin install apps-script-utils@bootgs-skills
```

使用支持多种智能体的 `npx skills` CLI 安装：

```bash
npx skills add bootgs/skills --skill apps-script-utils
```

安装后，只要任务涉及本库，智能体就会自动应用该技能。

## 环境要求

- [Node.js](https://nodejs.org/) v22.14.0 或更高版本
- [npm](https://www.npmjs.com/)（或其他 Node 包管理器，例如 pnpm）

## 安装

通过 npm 安装：

```bash
npm install @bootgs/utils
```

## 文档

完整文档发布在 **<https://bootgs.github.io/utils/>**（英文），包括指南、各模块讲解和完整的函数参考。其源文件位于 [`docs/writerside/`](../writerside/)，每次推送到 `main` 时都会重新构建。

推荐的阅读顺序：

- [Getting started](https://bootgs.github.io/utils/getting-started.html)——入门
- [Validation conventions](https://bootgs.github.io/utils/validation-conventions.html)——`isX`/`nonX`/`requireX`/`requireNonX` 命名方案
- [Exception handling](https://bootgs.github.io/utils/exception-handling.html)——类层次结构以及每种异常的触发条件
- [The Apps Script runtime](https://bootgs.github.io/utils/apps-script-runtime.html)——哪些辅助函数绑定到 Google 服务，以及这对测试意味着什么

## 使用示例

### 操作工作表

高效追加多行数据：

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

检查当前用户是否拥有管理员权限：

```typescript
import { isAdmin } from "@bootgs/utils";

if (isAdmin()) {
  Logger.log("Access granted to admin panel.");
} else {
  Logger.log("Access denied.");
}
```

### 解析 A1 表示法

将复杂的 A1 表示法解析为结构化对象：

```typescript
import { parseA1Notation } from "@bootgs/utils";

const rangeInfo = parseA1Notation("'Sheet1'!A1:B10");

console.log(rangeInfo.sheetName); // "Sheet1"
console.log(rangeInfo.startRowIndex); // 0
console.log(rangeInfo.endColumnIndex); // 2
```

## 开发

### 脚本

`package.json` 中提供以下脚本：

| 脚本                 | 说明                                         |
| :------------------- | :------------------------------------------- |
| `npm run build`      | 清空 `dist` 目录并编译 TypeScript 源码。     |
| `npm run dev`        | 以监听模式启动 Vitest。                      |
| `npm test`           | 运行一次完整的测试套件。                     |
| `npm run type:check` | 对项目进行类型检查，不生成输出。             |
| `npm run lint`       | 使用 ESLint 检查代码。                       |
| `npm run lint:fix`   | 使用 ESLint 检查代码并自动修复可修复的问题。 |
| `npm run format`     | 使用 Prettier 检查格式。                     |
| `npm run format:fix` | 使用 Prettier 格式化代码。                   |
| `npm run prepare`    | 配置 Husky 的 Git 钩子（安装后自动运行）。   |

### 测试

本项目使用 [Vitest](https://vitest.dev/) 进行单元测试。

运行一次完整测试套件：

```bash
npm test
```

或在开发时以监听模式运行：

```bash
npm run dev
```

## 项目结构

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

## 按类别划分的函数

完整的函数参考已迁移到文档站点。该站点由 [`docs/writerside/`](../writerside/) 构建，每次推送到 `main` 时发布：

**<https://bootgs.github.io/utils/>**

| 章节                                                                                  | 内容                                                                  |
| :------------------------------------------------------------------------------------ | :-------------------------------------------------------------------- |
| [Google Apps Script module](https://bootgs.github.io/utils/reference-appsscript.html) | Sheets、Slides、Admin SDK、Drive、Docs、Forms、网络请求以及内置 UI 类 |
| [Base utilities](https://bootgs.github.io/utils/reference-base.html)                  | 类型检查与校验，字符串、数组和对象操作，JSON 与 HTML 处理             |
| [Exceptions](https://bootgs.github.io/utils/reference-exception.html)                 | 类型化异常类及各自的触发条件                                          |
| [`path` module](https://bootgs.github.io/utils/reference-path.html)                   | 文件路径与 URL                                                        |
| [Abstracts and interfaces](https://bootgs.github.io/utils/reference-abstracts.html)   | 共享的基础构件                                                        |

除参考之外，站点上还有表格容纳不下的指南：[validation conventions](https://bootgs.github.io/utils/validation-conventions.html) 集中讲解 `isX`/`nonX`/`requireX`/`requireNonX` 方案，[exception handling](https://bootgs.github.io/utils/exception-handling.html) 阐述类层次结构，[the Apps Script runtime](https://bootgs.github.io/utils/apps-script-runtime.html) 则说明哪些辅助函数绑定到 Google 服务、这样做的代价以及对测试的影响。

## 参与贡献

欢迎贡献。完整指南请参阅 [CONTRIBUTING.md](../../CONTRIBUTING.md)。简要步骤如下：

1. Fork 本仓库，并为你的功能或缺陷修复创建分支。
2. 添加或更新覆盖你的改动的测试。
3. 提交前运行 `npm run lint` 和 `npm run format`。
4. 不要手动编辑 `CHANGELOG.md`——它由 [release-please](https://github.com/googleapis/release-please) 自动生成。
5. 创建 pull request，说明改了什么以及为什么。

请遵循现有的代码风格和命名约定。社区准则见 [CODE_OF_CONDUCT.md](../../CODE_OF_CONDUCT.md)。

## 支持

- 如需报告缺陷或提出功能需求，请在 GitHub 上搜索或新建 [issue](https://github.com/bootgs/utils/issues)。
- 最近的变更请查看[更新日志](../../CHANGELOG.md)。
- 如需报告安全漏洞，请遵循[安全策略](../../SECURITY.md)，不要创建公开 issue。
- 如需支持项目的持续开发，请访问 [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov)。

## 路线图

已计划、进行中和已完成的事项都在[项目看板](https://github.com/users/MaksymStoianov/projects/2/views/2)上，看板直接由 issue 跟踪器生成。没有单独的路线图文档，因此不会与看板脱节：如需提出建议，请创建 [issue](https://github.com/bootgs/utils/issues)。

## 更新日志

按版本列出的详细变更请参阅 [CHANGELOG.md](../../CHANGELOG.md)。

## 许可证

本项目采用 Apache License 2.0 许可证。详情请参阅 [LICENSE](../../LICENSE)。

横幅插画不属于该许可证的范围。它是其作者的作品，在署名作者并附上链接的前提下可不加修改地重复使用，具体条款见 [docs/assets/images/README.md](../assets/images/README.md)。

## 商标

Google Apps Script、Google Sheets、Google Slides、Google Docs、Google Forms 和 Google Drive 是 Google LLC 的商标。本项目是一个独立的库，与 Google LLC 没有关联，也未获得 Google LLC 的认可或赞助；使用这些商标仅为说明本库所适用的对象。

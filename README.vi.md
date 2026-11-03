<a name="top"></a>

![Banner del proyecto Google Apps Script Utils](docs/assets/images/banner-1280x640.jpg)

<p align="right">
    <small>
        <i>Nghệ sĩ: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-utils&utm_content=banner-artist-credit" title="Danh mục tác phẩm của nghệ sĩ Daryna Mikhailenko">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [Português](README.pt.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Polski](README.pl.md) | [Čeština](README.cs.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Bahasa Indonesia](README.id.md) | **Tiếng Việt** | [日本語](README.ja.md) | [한국어](README.ko.md) | [简体中文](README.zh.md) | [繁體中文](README.zh-TW.md)

> Bản dịch này được thực hiện với sự hỗ trợ của AI từ [README.md](README.md) cho phiên bản 2.1.1. Phiên bản tham chiếu là README tiếng Anh; mọi góp ý chỉnh sửa đều được hoan nghênh — xem [CONTRIBUTING.md](CONTRIBUTING.md#readme-translations).

# Tiện ích cho Google Apps Script™

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

- [Tiện ích cho Google Apps Script™](#tiện-ích-cho-google-apps-script)
  - [Tổng quan](#tổng-quan)
  - [Tính năng chính](#tính-năng-chính)
  - [Skill cho tác tử AI](#skill-cho-tác-tử-ai)
  - [Yêu cầu](#yêu-cầu)
  - [Cài đặt](#cài-đặt)
  - [Tài liệu](#tài-liệu)
  - [Ví dụ sử dụng](#ví-dụ-sử-dụng)
  - [Phát triển](#phát-triển)
    - [Scripts](#scripts)
    - [Kiểm thử](#kiểm-thử)
  - [Cấu trúc dự án](#cấu-trúc-dự-án)
  - [Hàm theo danh mục](#hàm-theo-danh-mục)
  - [Đóng góp](#đóng-góp)
  - [Hỗ trợ](#hỗ-trợ)
  - [Lộ trình](#lộ-trình)
  - [Nhật ký thay đổi](#nhật-ký-thay-đổi)
  - [Giấy phép](#giấy-phép)
  <!-- TOC -->

## Tổng quan

**@bootgs/utils** là một thư viện tiện ích TypeScript được xây dựng riêng cho **Google Apps Script**. Thư viện tập hợp
những hàm trợ giúp mà dự án GAS nào rồi cũng phải tự viết — thao tác với bảng tính và ký hiệu A1, kiểm tra kiểu và giá
trị (`isX`/`nonX`/`requireX`), biến đổi chuỗi và mảng, các ngoại lệ có kiểu, và nhiều hơn nữa — trong một gói duy nhất,
có tài liệu đầy đủ và được kiểm thử toàn diện.

## Tính năng chính

- **Xây dựng cho Google Apps Script** — được thiết kế xoay quanh runtime GAS và các giới hạn của nó, không phải chuyển
  thể từ một thư viện Node.js chung chung.
- **Phạm vi tiện ích rộng** — các hàm trợ giúp cho bảng tính, UI, mạng và Admin SDK, bên cạnh các tiện ích đa dụng cho
  chuỗi, mảng và đối tượng.
- **Ưu tiên TypeScript** — mọi hàm đều đi kèm định nghĩa kiểu đầy đủ để IDE tự động gợi ý và đảm bảo an toàn khi biên
  dịch.
- **Được kiểm thử** — được bao phủ bởi bộ kiểm thử đơn vị Vitest.
- **Tài liệu tham chiếu có liên kết** — mọi kiểu Google Apps Script dùng trong API đều liên kết trực tiếp tới tài liệu
  chính thức của nó.
- **Xử lý lỗi nhất quán** — một hệ thống phân cấp lớp ngoại lệ chuyên biệt thay cho các lỗi được ném ra tùy tiện.

## Skill cho tác tử AI

Với các nhóm đang dùng tác tử lập trình AI (Claude Code, Gemini CLI và các công cụ khác), kho mã
[bootgs/skills](https://github.com/bootgs/skills) cung cấp Agent Skill
[`@bootgs/utils`](https://github.com/bootgs/skills/tree/main/skills/apps-script-utils) mô tả thư viện này cho các tác
tử đó, bao gồm quy ước kiểm tra `isX`/`nonX`/`requireX`, các hàm trợ giúp cho ký hiệu A1 và trang tính, cho chuỗi, số
và mảng, các ngoại lệ có kiểu, cùng các hàm trợ giúp cho HTML, JSON và đường dẫn.

Cài đặt với Claude Code:

```bash
/plugin marketplace add bootgs/skills
/plugin install apps-script-utils@bootgs-skills
```

Cài đặt bằng CLI `npx skills`, hỗ trợ nhiều tác tử:

```bash
npx skills add bootgs/skills --skill apps-script-utils
```

Sau khi cài đặt, tác tử sẽ tự động áp dụng skill khi một tác vụ liên quan đến thư viện này.

## Yêu cầu

- [Node.js](https://nodejs.org/) v22.14.0 trở lên
- [npm](https://www.npmjs.com/) (hoặc một trình quản lý gói Node khác, ví dụ pnpm)

## Cài đặt

Cài đặt gói qua npm:

```bash
npm install @bootgs/utils
```

## Tài liệu

Tài liệu đầy đủ được xuất bản tại **<https://bootgs.github.io/utils/>** (bằng tiếng Anh): các hướng
dẫn, phần giới thiệu từng module và tài liệu tham chiếu đầy đủ của các hàm. Mã nguồn của tài liệu nằm trong
[`docs/writerside/`](docs/writerside/) và được build lại mỗi lần push lên `main`.

Thứ tự đọc được đề xuất:

- [Getting started](https://bootgs.github.io/utils/getting-started.html) — những bước đầu tiên
- [Validation conventions](https://bootgs.github.io/utils/validation-conventions.html) — quy ước
  đặt tên `isX`/`nonX`/`requireX`/`requireNonX`
- [Exception handling](https://bootgs.github.io/utils/exception-handling.html) — hệ thống phân cấp
  lớp và nguyên nhân phát sinh từng ngoại lệ
- [The Apps Script runtime](https://bootgs.github.io/utils/apps-script-runtime.html) — những hàm
  trợ giúp nào gắn với một dịch vụ của Google, và điều đó có ý nghĩa gì đối với việc kiểm thử

## Ví dụ sử dụng

### Làm việc với trang tính

Nối thêm nhiều hàng dữ liệu một cách hiệu quả:

```typescript
import { appendRows } from "@bootgs/utils";

const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
const data = [
  ["John Doe", "john@example.com", 28],
  ["Jane Smith", "jane@example.com", 32]
];

appendRows(sheet, data);
```

### Tiện ích Admin SDK

Kiểm tra xem người dùng hiện tại có quyền quản trị hay không:

```typescript
import { isAdmin } from "@bootgs/utils";

if (isAdmin()) {
  Logger.log("Access granted to admin panel.");
} else {
  Logger.log("Access denied.");
}
```

### Phân tích ký hiệu A1

Phân tích các ký hiệu A1 phức tạp thành các đối tượng có cấu trúc:

```typescript
import { parseA1Notation } from "@bootgs/utils";

const rangeInfo = parseA1Notation("'Sheet1'!A1:B10");

console.log(rangeInfo.sheetName); // "Sheet1"
console.log(rangeInfo.startRowIndex); // 0
console.log(rangeInfo.endColumnIndex); // 2
```

## Phát triển

### Scripts

Các script sau có sẵn trong `package.json`:

| Script               | Mô tả                                                        |
| :------------------- | :----------------------------------------------------------- |
| `npm run build`      | Dọn thư mục `dist` và biên dịch mã nguồn TypeScript.         |
| `npm run dev`        | Khởi chạy Vitest ở chế độ theo dõi (watch).                  |
| `npm test`           | Chạy toàn bộ bộ kiểm thử một lần.                            |
| `npm run type:check` | Kiểm tra kiểu của dự án mà không xuất ra kết quả build.      |
| `npm run lint`       | Kiểm tra mã nguồn bằng ESLint.                               |
| `npm run lint:fix`   | Kiểm tra mã nguồn và tự động sửa những gì có thể.            |
| `npm run format`     | Kiểm tra định dạng bằng Prettier.                            |
| `npm run format:fix` | Định dạng mã nguồn bằng Prettier.                            |
| `npm run prepare`    | Thiết lập Git hook của Husky (tự động chạy sau khi cài đặt). |

### Kiểm thử

Dự án sử dụng [Vitest](https://vitest.dev/) để kiểm thử đơn vị.

Chạy toàn bộ bộ kiểm thử một lần:

```bash
npm test
```

Hoặc chạy ở chế độ theo dõi trong khi phát triển:

```bash
npm run dev
```

## Cấu trúc dự án

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

## Hàm theo danh mục

Tài liệu tham chiếu đầy đủ của các hàm đã được chuyển sang trang tài liệu, được build từ
[`docs/writerside/`](docs/writerside/) và xuất bản mỗi lần push lên `main`:

**<https://bootgs.github.io/utils/>**

| Phần                                                                                  | Nội dung                                                                             |
| :------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------- |
| [Google Apps Script module](https://bootgs.github.io/utils/reference-appsscript.html) | Sheets, Slides, Admin SDK, Drive, Docs, Forms, yêu cầu mạng và các lớp UI dựng sẵn   |
| [Base utilities](https://bootgs.github.io/utils/reference-base.html)                  | Kiểm tra kiểu và xác thực, thao tác với chuỗi, mảng và đối tượng, xử lý JSON và HTML |
| [Exceptions](https://bootgs.github.io/utils/reference-exception.html)                 | Các lớp ngoại lệ có kiểu và nguyên nhân phát sinh từng loại                          |
| [`path` module](https://bootgs.github.io/utils/reference-path.html)                   | Đường dẫn tệp và URL                                                                 |
| [Abstracts and interfaces](https://bootgs.github.io/utils/reference-abstracts.html)   | Các thành phần dùng chung                                                            |

Bên cạnh tài liệu tham chiếu, trang web còn có những hướng dẫn mà các bảng không thể trình bày hết:
[validation conventions](https://bootgs.github.io/utils/validation-conventions.html) giải thích quy
ước `isX`/`nonX`/`requireX`/`requireNonX` tại một nơi duy nhất,
[exception handling](https://bootgs.github.io/utils/exception-handling.html) trình bày hệ thống
phân cấp lớp, còn [the Apps Script runtime](https://bootgs.github.io/utils/apps-script-runtime.html)
cho biết những hàm trợ giúp nào gắn với một dịch vụ của Google, điều đó tốn kém gì và có ý nghĩa gì đối với việc kiểm
thử.

## Đóng góp

Chúng tôi hoan nghênh mọi đóng góp. Xem hướng dẫn đầy đủ tại [CONTRIBUTING.md](CONTRIBUTING.md). Tóm tắt:

1. Fork kho mã và tạo một nhánh cho tính năng hoặc bản sửa lỗi của bạn.
2. Thêm hoặc cập nhật kiểm thử để bao phủ các thay đổi của bạn.
3. Chạy `npm run lint` và `npm run format` trước khi commit.
4. Không chỉnh sửa `CHANGELOG.md` thủ công — tệp này được tạo tự động bởi [release-please](https://github.com/googleapis/release-please).
5. Mở một pull request mô tả những gì đã thay đổi và lý do.

Hãy tuân theo phong cách mã và quy ước đặt tên hiện có. Xem [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) để biết các quy
tắc của cộng đồng.

## Hỗ trợ

- Đối với lỗi hoặc yêu cầu tính năng, hãy tìm kiếm hoặc mở một [issue](https://github.com/bootgs/utils/issues)
  trên GitHub.
- Để xem các thay đổi gần đây, hãy xem [nhật ký thay đổi](CHANGELOG.md).
- Để báo cáo lỗ hổng bảo mật, hãy làm theo [chính sách bảo mật](SECURITY.md) thay vì mở một issue công khai.
- Để ủng hộ việc phát triển liên tục, hãy xem [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov).

## Lộ trình

Những việc đã lên kế hoạch, đang thực hiện hoặc đã hoàn thành có trên [bảng dự án](https://github.com/users/MaksymStoianov/projects/2/views/2),
được xây dựng trực tiếp từ trình theo dõi issue. Không có tài liệu lộ trình riêng nào có thể bị lệch so với nó: để
đề xuất điều gì đó, hãy mở một [issue](https://github.com/bootgs/utils/issues).

## Nhật ký thay đổi

Để xem danh sách chi tiết các thay đổi theo từng phiên bản, hãy xem [CHANGELOG.md](CHANGELOG.md).

## Giấy phép

Dự án này được cấp phép theo Apache License 2.0. Xem [LICENSE](LICENSE) để biết chi tiết.

Hình minh họa banner không thuộc phạm vi giấy phép đó. Đây là tác phẩm của tác giả, có thể được tái sử dụng mà không
chỉnh sửa với điều kiện ghi công tác giả kèm liên kết, và được điều chỉnh bởi
[docs/assets/images/README.md](docs/assets/images/README.md).

## Nhãn hiệu

Google Apps Script, Google Sheets, Google Slides, Google Docs, Google Forms và Google Drive là các nhãn hiệu của Google
LLC. Dự án này là một thư viện độc lập. Dự án không liên kết với, không được Google LLC xác nhận hay tài trợ, và các
nhãn hiệu chỉ được dùng để mô tả các sản phẩm mà thư viện hoạt động cùng.

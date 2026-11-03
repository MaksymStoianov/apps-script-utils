<a name="top"></a>

![Banner proyek Google Apps Script Utils](docs/assets/images/banner-1280x640.jpg)

<p align="right">
    <small>
        <i>Seniman: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-utils&utm_content=banner-artist-credit" title="Portofolio seniman Daryna Mikhailenko">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [Português](README.pt.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Polski](README.pl.md) | [Čeština](README.cs.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | **Bahasa Indonesia** | [Tiếng Việt](README.vi.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [简体中文](README.zh.md) | [繁體中文](README.zh-TW.md)

> Terjemahan ini dibuat dengan bantuan AI dari [README.md](README.md) untuk versi 2.1.1. Versi acuannya adalah README berbahasa Inggris; koreksi sangat kami harapkan — lihat [CONTRIBUTING.md](CONTRIBUTING.md#readme-translations).

# Utilitas untuk Google Apps Script™

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

- [Utilitas untuk Google Apps Script™](#utilitas-untuk-google-apps-script)
  - [Ikhtisar](#ikhtisar)
  - [Fitur utama](#fitur-utama)
  - [Skill untuk agen AI](#skill-untuk-agen-ai)
  - [Persyaratan](#persyaratan)
  - [Instalasi](#instalasi)
  - [Dokumentasi](#dokumentasi)
  - [Contoh penggunaan](#contoh-penggunaan)
  - [Pengembangan](#pengembangan)
    - [Skrip](#skrip)
    - [Pengujian](#pengujian)
  - [Struktur proyek](#struktur-proyek)
  - [Fungsi per kategori](#fungsi-per-kategori)
  - [Berkontribusi](#berkontribusi)
  - [Dukungan](#dukungan)
  - [Peta jalan](#peta-jalan)
  - [Catatan perubahan](#catatan-perubahan)
  - [Lisensi](#lisensi)
  <!-- TOC -->

## Ikhtisar

**@bootgs/utils** adalah pustaka utilitas TypeScript yang dibuat khusus untuk **Google Apps Script**. Pustaka ini
mengumpulkan fungsi bantu yang pada akhirnya selalu ditulis manual di setiap proyek GAS — manipulasi spreadsheet dan
notasi A1, validasi tipe dan nilai (`isX`/`nonX`/`requireX`), transformasi string dan array, exception bertipe, dan
lainnya — dalam satu paket yang terdokumentasi dengan baik dan teruji sepenuhnya.

## Fitur utama

- **Dibuat untuk Google Apps Script** — dirancang di sekitar runtime GAS beserta batasannya, bukan diadaptasi dari
  pustaka Node.js generik.
- **Cakupan utilitas yang luas** — fungsi bantu untuk spreadsheet, UI, jaringan, dan Admin SDK, ditambah utilitas
  serbaguna untuk string, array, dan objek.
- **Mengutamakan TypeScript** — setiap fungsi dilengkapi definisi tipe lengkap untuk pelengkapan otomatis di IDE dan
  keamanan saat kompilasi.
- **Teruji** — dicakup oleh rangkaian unit test Vitest.
- **Dokumentasi referensi bertaut** — setiap tipe Google Apps Script yang dipakai di API tertaut langsung ke
  dokumentasi resminya.
- **Penanganan error yang konsisten** — hierarki kelas exception khusus menggantikan error yang dilempar secara asal.

## Skill untuk agen AI

Bagi tim yang memakai agen pemrograman AI (Claude Code, Gemini CLI, dan lainnya), repositori
[bootgs/skills](https://github.com/bootgs/skills) menyediakan Agent Skill
[`@bootgs/utils`](https://github.com/bootgs/skills/tree/main/skills/apps-script-utils) yang mendokumentasikan
pustaka ini untuk agen tersebut, termasuk konvensi validasi `isX`/`nonX`/`requireX`, fungsi bantu untuk notasi A1 dan
sheet, fungsi bantu untuk string, angka, dan array, exception bertipe, serta fungsi bantu untuk HTML, JSON, dan path.

Instal dengan Claude Code:

```bash
/plugin marketplace add bootgs/skills
/plugin install apps-script-utils@bootgs-skills
```

Instal dengan CLI `npx skills`, yang mendukung berbagai agen:

```bash
npx skills add bootgs/skills --skill apps-script-utils
```

Setelah terinstal, agen menerapkan skill ini secara otomatis ketika sebuah tugas melibatkan pustaka ini.

## Persyaratan

- [Node.js](https://nodejs.org/) v22.14.0 atau yang lebih baru
- [npm](https://www.npmjs.com/) (atau package manager Node lain, misalnya pnpm)

## Instalasi

Instal paket melalui npm:

```bash
npm install @bootgs/utils
```

## Dokumentasi

Dokumentasi lengkap diterbitkan di **<https://bootgs.github.io/utils/>** (dalam bahasa Inggris): panduan, penjelasan
per modul, dan referensi fungsi selengkapnya. Sumbernya ada di [`docs/writerside/`](docs/writerside/) dan dibangun
ulang pada setiap push ke `main`.

Urutan membaca yang disarankan:

- [Getting started](https://bootgs.github.io/utils/getting-started.html) — langkah pertama
- [Validation conventions](https://bootgs.github.io/utils/validation-conventions.html) — skema penamaan
  `isX`/`nonX`/`requireX`/`requireNonX`
- [Exception handling](https://bootgs.github.io/utils/exception-handling.html) — hierarki kelas dan apa yang memicu
  masing-masing exception
- [The Apps Script runtime](https://bootgs.github.io/utils/apps-script-runtime.html) — fungsi bantu mana yang terikat
  pada layanan Google, dan apa artinya bagi pengujian

## Contoh penggunaan

### Bekerja dengan sheet

Menambahkan beberapa baris data sekaligus secara efisien:

```typescript
import { appendRows } from "@bootgs/utils";

const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
const data = [
  ["John Doe", "john@example.com", 28],
  ["Jane Smith", "jane@example.com", 32]
];

appendRows(sheet, data);
```

### Utilitas Admin SDK

Memeriksa apakah pengguna saat ini memiliki hak administrator:

```typescript
import { isAdmin } from "@bootgs/utils";

if (isAdmin()) {
  Logger.log("Access granted to admin panel.");
} else {
  Logger.log("Access denied.");
}
```

### Parsing notasi A1

Mengurai notasi A1 yang kompleks menjadi objek terstruktur:

```typescript
import { parseA1Notation } from "@bootgs/utils";

const rangeInfo = parseA1Notation("'Sheet1'!A1:B10");

console.log(rangeInfo.sheetName); // "Sheet1"
console.log(rangeInfo.startRowIndex); // 0
console.log(rangeInfo.endColumnIndex); // 2
```

## Pengembangan

### Skrip

Skrip berikut tersedia di `package.json`:

| Skrip                | Deskripsi                                                              |
| :------------------- | :--------------------------------------------------------------------- |
| `npm run build`      | Membersihkan direktori `dist` dan mengompilasi kode sumber TypeScript. |
| `npm run dev`        | Menjalankan Vitest dalam mode watch.                                   |
| `npm test`           | Menjalankan seluruh rangkaian pengujian satu kali.                     |
| `npm run type:check` | Memeriksa tipe proyek tanpa menghasilkan output.                       |
| `npm run lint`       | Memeriksa kode dengan ESLint.                                          |
| `npm run lint:fix`   | Memeriksa kode dan memperbaiki otomatis apa yang bisa diperbaiki.      |
| `npm run format`     | Memeriksa format dengan Prettier.                                      |
| `npm run format:fix` | Memformat kode dengan Prettier.                                        |
| `npm run prepare`    | Menyiapkan git hook Husky (berjalan otomatis setelah instalasi).       |

### Pengujian

Proyek ini menggunakan [Vitest](https://vitest.dev/) untuk unit test.

Jalankan seluruh rangkaian pengujian satu kali:

```bash
npm test
```

Atau jalankan dalam mode watch selama pengembangan:

```bash
npm run dev
```

## Struktur proyek

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

## Fungsi per kategori

Referensi fungsi selengkapnya telah dipindahkan ke situs dokumentasi, yang dibangun dari
[`docs/writerside/`](docs/writerside/) dan diterbitkan pada setiap push ke `main`:

**<https://bootgs.github.io/utils/>**

| Bagian                                                                                | Cakupan                                                                                      |
| :------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------- |
| [Google Apps Script module](https://bootgs.github.io/utils/reference-appsscript.html) | Sheets, Slides, Admin SDK, Drive, Docs, Forms, permintaan jaringan, dan kelas UI bawaan      |
| [Base utilities](https://bootgs.github.io/utils/reference-base.html)                  | Pemeriksaan tipe dan validasi, manipulasi string, array, dan objek, penanganan JSON dan HTML |
| [Exceptions](https://bootgs.github.io/utils/reference-exception.html)                 | Kelas exception bertipe dan apa yang memicu masing-masing                                    |
| [`path` module](https://bootgs.github.io/utils/reference-path.html)                   | Path file dan URL                                                                            |
| [Abstracts and interfaces](https://bootgs.github.io/utils/reference-abstracts.html)   | Komponen dasar bersama                                                                       |

Selain referensi, situs ini juga memuat panduan yang tidak muat di tabel:
[validation conventions](https://bootgs.github.io/utils/validation-conventions.html) menjelaskan skema
`isX`/`nonX`/`requireX`/`requireNonX` di satu tempat,
[exception handling](https://bootgs.github.io/utils/exception-handling.html) memaparkan hierarki kelas, dan
[the Apps Script runtime](https://bootgs.github.io/utils/apps-script-runtime.html) membahas fungsi bantu mana yang
terikat pada layanan Google, apa konsekuensinya, dan apa artinya bagi pengujian.

## Berkontribusi

Kontribusi sangat kami sambut. Panduan lengkapnya ada di [CONTRIBUTING.md](CONTRIBUTING.md). Ringkasnya:

1. Fork repositori dan buat branch untuk fitur atau perbaikan bug Anda.
2. Tambahkan atau perbarui pengujian yang mencakup perubahan Anda.
3. Jalankan `npm run lint` dan `npm run format` sebelum melakukan commit.
4. Jangan mengedit `CHANGELOG.md` secara manual — file ini dibuat otomatis oleh [release-please](https://github.com/googleapis/release-please).
5. Buka pull request yang menjelaskan apa yang berubah dan alasannya.

Ikuti gaya kode dan konvensi penamaan yang sudah ada. Pedoman komunitas ada di [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Dukungan

- Untuk bug atau permintaan fitur, cari atau buka [issue](https://github.com/bootgs/utils/issues) di GitHub.
- Untuk perubahan terbaru, lihat [catatan perubahan](CHANGELOG.md).
- Untuk melaporkan kerentanan keamanan, ikuti [kebijakan keamanan](SECURITY.md) alih-alih membuka issue publik.
- Untuk mendukung pengembangan yang berkelanjutan, lihat [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov).

## Peta jalan

Apa yang direncanakan, sedang dikerjakan, atau sudah selesai ada di
[papan proyek](https://github.com/users/MaksymStoianov/projects/2/views/2), yang dibangun langsung dari issue tracker.
Tidak ada dokumen peta jalan terpisah yang bisa tertinggal darinya: untuk mengusulkan sesuatu, buka
[issue](https://github.com/bootgs/utils/issues).

## Catatan perubahan

Untuk daftar perubahan per versi secara terperinci, lihat [CHANGELOG.md](CHANGELOG.md).

## Lisensi

Proyek ini dilisensikan di bawah Apache License 2.0. Lihat [LICENSE](LICENSE) untuk detailnya.

Karya seni banner tidak termasuk dalam lisensi tersebut. Karya ini milik pembuatnya, boleh digunakan ulang tanpa
diubah dengan mencantumkan nama pembuat beserta tautannya, dan diatur oleh
[docs/assets/images/README.md](docs/assets/images/README.md).

## Merek dagang

Google Apps Script, Google Sheets, Google Slides, Google Docs, Google Forms, dan Google Drive adalah merek dagang
Google LLC. Proyek ini adalah pustaka independen. Proyek ini tidak berafiliasi dengan, tidak didukung, dan tidak
disponsori oleh Google LLC, dan merek dagang tersebut digunakan semata-mata untuk menjelaskan dengan apa pustaka ini
bekerja.

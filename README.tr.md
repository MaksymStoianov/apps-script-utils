<a name="top"></a>

![Google Apps Script Utils proje banner'ı](docs/assets/images/banner-1280x640.jpg)

<p align="right">
    <small>
        <i>Sanatçı: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-utils&utm_content=banner-artist-credit" title="Sanatçı Daryna Mikhailenko'nun portfolyosu">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [Português](README.pt.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Polski](README.pl.md) | [Čeština](README.cs.md) | **Türkçe** | [العربية](README.ar.md) | [Bahasa Indonesia](README.id.md) | [Tiếng Việt](README.vi.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [简体中文](README.zh.md) | [繁體中文](README.zh-TW.md)

> Bu çeviri, 2.1.1 sürümü için [README.md](README.md) dosyasından yapay zekâ desteğiyle yapılmıştır. Referans sürüm İngilizce README'dir; düzeltmelerinizi bekliyoruz — bkz. [CONTRIBUTING.md](CONTRIBUTING.md#readme-translations).

# Google Apps Script™ için yardımcı araçlar

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

- [Google Apps Script™ için yardımcı araçlar](#google-apps-script-için-yardımcı-araçlar)
  - [Genel bakış](#genel-bakış)
  - [Temel özellikler](#temel-özellikler)
  - [Yapay zekâ ajanları için skill'ler](#yapay-zekâ-ajanları-için-skilller)
  - [Gereksinimler](#gereksinimler)
  - [Kurulum](#kurulum)
  - [Dokümantasyon](#dokümantasyon)
  - [Kullanım örnekleri](#kullanım-örnekleri)
  - [Geliştirme](#geliştirme)
    - [Betikler](#betikler)
    - [Testler](#testler)
  - [Proje yapısı](#proje-yapısı)
  - [Kategorilere göre fonksiyonlar](#kategorilere-göre-fonksiyonlar)
  - [Katkıda bulunma](#katkıda-bulunma)
  - [Destek](#destek)
  - [Yol haritası](#yol-haritası)
  - [Değişiklik günlüğü](#değişiklik-günlüğü)
  - [Lisans](#lisans)
  <!-- TOC -->

## Genel bakış

**@bootgs/utils**, özellikle **Google Apps Script** için geliştirilmiş bir TypeScript yardımcı kütüphanesidir. Her GAS
projesinin eninde sonunda elle yazdığı yardımcıları — tablo ve A1 gösterimi işlemleri, tür/değer doğrulaması
(`isX`/`nonX`/`requireX`), dize ve dizi dönüşümleri, türlendirilmiş istisnalar ve daha fazlası — iyi belgelenmiş ve
tamamen test edilmiş tek bir pakette bir araya getirir.

## Temel özellikler

- **Google Apps Script için geliştirildi** — genel amaçlı bir Node.js kütüphanesinden uyarlanmadı; GAS çalışma zamanı
  ve onun kısıtlamaları göz önünde bulundurularak tasarlandı.
- **Geniş kapsam** — genel amaçlı dize, dizi ve nesne yardımcılarının yanında tablo, UI, ağ ve Admin SDK yardımcıları.
- **Önce TypeScript** — her fonksiyon, IDE'de otomatik tamamlama ve derleme zamanında güvenlik için eksiksiz tür
  tanımlarıyla gelir.
- **Test edilmiş** — Vitest birim test paketiyle kapsanır.
- **Bağlantılı başvuru dokümantasyonu** — API'de kullanılan her Google Apps Script türü doğrudan resmî
  dokümantasyonuna bağlanır.
- **Tutarlı hata yönetimi** — rastgele fırlatılan hataların yerini özel bir istisna sınıfları hiyerarşisi alır.

## Yapay zekâ ajanları için skill'ler

Bir yapay zekâ kodlama ajanı (Claude Code, Gemini CLI ve diğerleri) kullanan ekipler için
[bootgs/skills](https://github.com/bootgs/skills) deposu, bu kütüphaneyi söz konusu ajanlara tanıtan
[`@bootgs/utils`](https://github.com/bootgs/skills/tree/main/skills/apps-script-utils) Agent Skill'ini sunar:
`isX`/`nonX`/`requireX` doğrulama kuralı, A1 gösterimi ve sayfa yardımcıları, dize/sayı/dizi yardımcıları,
türlendirilmiş istisnalar ve HTML/JSON/yol yardımcıları dahil.

Claude Code ile kurulum:

```bash
/plugin marketplace add bootgs/skills
/plugin install apps-script-utils@bootgs-skills
```

Birden fazla ajanı destekleyen `npx skills` CLI'ı ile kurulum:

```bash
npx skills add bootgs/skills --skill apps-script-utils
```

Kurulduktan sonra ajan, bir görev bu kütüphaneyle ilgili olduğunda skill'i otomatik olarak uygular.

## Gereksinimler

- [Node.js](https://nodejs.org/) v22.14.0 veya üzeri
- [npm](https://www.npmjs.com/) (ya da pnpm gibi başka bir Node paket yöneticisi)

## Kurulum

Paketi npm ile kurun:

```bash
npm install @bootgs/utils
```

## Dokümantasyon

Dokümantasyonun tamamı **<https://bootgs.github.io/utils/>** adresinde (İngilizce) yayımlanır: kılavuzlar, her modül
için adım adım anlatımlar ve eksiksiz fonksiyon başvurusu. Kaynağı [`docs/writerside/`](docs/writerside/) dizinindedir
ve `main` dalına yapılan her push'ta yeniden derlenir.

Önerilen okuma sırası:

- [Getting started](https://bootgs.github.io/utils/getting-started.html) — ilk adımlar
- [Validation conventions](https://bootgs.github.io/utils/validation-conventions.html) —
  `isX`/`nonX`/`requireX`/`requireNonX` adlandırma şeması
- [Exception handling](https://bootgs.github.io/utils/exception-handling.html) — sınıf hiyerarşisi
  ve her istisnaya neyin yol açtığı
- [The Apps Script runtime](https://bootgs.github.io/utils/apps-script-runtime.html) — hangi
  yardımcıların bir Google hizmetine bağlı olduğu ve bunun test açısından ne anlama geldiği

## Kullanım örnekleri

### Sheets ile çalışma

Birden fazla veri satırını verimli bir şekilde ekleyin:

```typescript
import { appendRows } from "@bootgs/utils";

const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
const data = [
  ["John Doe", "john@example.com", 28],
  ["Jane Smith", "jane@example.com", 32]
];

appendRows(sheet, data);
```

### Admin SDK yardımcıları

Geçerli kullanıcının yönetici ayrıcalıklarına sahip olup olmadığını kontrol edin:

```typescript
import { isAdmin } from "@bootgs/utils";

if (isAdmin()) {
  Logger.log("Access granted to admin panel.");
} else {
  Logger.log("Access denied.");
}
```

### A1 gösterimini ayrıştırma

Karmaşık A1 gösterimlerini yapılandırılmış nesnelere ayrıştırın:

```typescript
import { parseA1Notation } from "@bootgs/utils";

const rangeInfo = parseA1Notation("'Sheet1'!A1:B10");

console.log(rangeInfo.sheetName); // "Sheet1"
console.log(rangeInfo.startRowIndex); // 0
console.log(rangeInfo.endColumnIndex); // 2
```

## Geliştirme

### Betikler

`package.json` içinde şu betikler bulunur:

| Betik                | Açıklama                                                                |
| :------------------- | :---------------------------------------------------------------------- |
| `npm run build`      | `dist` dizinini temizler ve TypeScript kaynak kodunu derler.            |
| `npm run dev`        | Vitest'i izleme modunda başlatır.                                       |
| `npm test`           | Test paketinin tamamını bir kez çalıştırır.                             |
| `npm run type:check` | Çıktı üretmeden projenin tür denetimini yapar.                          |
| `npm run lint`       | Kod tabanını ESLint ile denetler.                                       |
| `npm run lint:fix`   | Kod tabanını denetler ve düzeltebildiklerini otomatik olarak düzeltir.  |
| `npm run format`     | Biçimlendirmeyi Prettier ile kontrol eder.                              |
| `npm run format:fix` | Kod tabanını Prettier ile biçimlendirir.                                |
| `npm run prepare`    | Husky Git hook'larını kurar (kurulumdan sonra otomatik olarak çalışır). |

### Testler

Proje, birim testleri için [Vitest](https://vitest.dev/) kullanır.

Paketin tamamını bir kez çalıştırın:

```bash
npm test
```

Ya da geliştirme sırasında izleme modunda çalıştırın:

```bash
npm run dev
```

## Proje yapısı

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

## Kategorilere göre fonksiyonlar

Fonksiyon başvurusunun tamamı, [`docs/writerside/`](docs/writerside/) dizininden derlenen ve `main` dalına yapılan her
push'ta yayımlanan dokümantasyon sitesine taşındı (İngilizce):

**<https://bootgs.github.io/utils/>**

| Bölüm                                                                                 | Kapsam                                                                               |
| :------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------- |
| [Google Apps Script module](https://bootgs.github.io/utils/reference-appsscript.html) | Sheets, Slides, Admin SDK, Drive, Docs, Forms, ağ istekleri ve yerleşik UI sınıfları |
| [Base utilities](https://bootgs.github.io/utils/reference-base.html)                  | Tür denetimi ve doğrulama; dize, dizi ve nesne işlemleri; JSON ve HTML işleme        |
| [Exceptions](https://bootgs.github.io/utils/reference-exception.html)                 | Türlendirilmiş istisna sınıfları ve her birine neyin yol açtığı                      |
| [`path` module](https://bootgs.github.io/utils/reference-path.html)                   | Dosya yolları ve URL'ler                                                             |
| [Abstracts and interfaces](https://bootgs.github.io/utils/reference-abstracts.html)   | Ortak yapı taşları                                                                   |

Site, başvurunun yanı sıra tablolara sığmayan kılavuzları da içerir:
[validation conventions](https://bootgs.github.io/utils/validation-conventions.html)
`isX`/`nonX`/`requireX`/`requireNonX` şemasını tek bir yerde açıklar,
[exception handling](https://bootgs.github.io/utils/exception-handling.html) sınıf hiyerarşisini
ortaya koyar, [the Apps Script runtime](https://bootgs.github.io/utils/apps-script-runtime.html)
ise hangi yardımcıların bir Google hizmetine bağlı olduğunu, bunun maliyetini ve test açısından ne anlama geldiğini
ele alır.

## Katkıda bulunma

Katkılarınızı memnuniyetle karşılıyoruz. Kılavuzun tamamı için [CONTRIBUTING.md](CONTRIBUTING.md) dosyasına bakın.
Özetle:

1. Depoyu fork'layın ve özelliğiniz ya da hata düzeltmeniz için bir dal oluşturun.
2. Değişikliklerinizi kapsayan testleri ekleyin veya güncelleyin.
3. Commit'ten önce `npm run lint` ve `npm run format` komutlarını çalıştırın.
4. `CHANGELOG.md` dosyasını elle düzenlemeyin — [release-please](https://github.com/googleapis/release-please) tarafından otomatik olarak oluşturulur.
5. Neyin neden değiştiğini açıklayan bir pull request açın.

Mevcut kod stiline ve adlandırma kurallarına uyun. Topluluk kuralları için [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
dosyasına bakın.

## Destek

- Hatalar veya özellik istekleri için GitHub'da bir [issue](https://github.com/bootgs/utils/issues)
  arayın ya da açın.
- Son değişiklikler için [değişiklik günlüğüne](CHANGELOG.md) bakın.
- Bir güvenlik açığı bildirmek için herkese açık bir issue açmak yerine [güvenlik politikasını](SECURITY.md) izleyin.
- Süregelen geliştirmeyi desteklemek için [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov) sayfasına
  bakın.

## Yol haritası

Planlanan, üzerinde çalışılan ve tamamlanan işler, doğrudan issue takip sisteminden oluşturulan
[proje panosunda](https://github.com/users/MaksymStoianov/projects/2/views/2) yer alır. Panoyla uyumsuz hâle
gelebilecek ayrı bir yol haritası belgesi yoktur: bir öneriniz varsa bir [issue](https://github.com/bootgs/utils/issues)
açın.

## Değişiklik günlüğü

Sürümlere göre değişikliklerin ayrıntılı listesi için [CHANGELOG.md](CHANGELOG.md) dosyasına bakın.

## Lisans

Bu proje Apache License 2.0 ile lisanslanmıştır. Ayrıntılar için [LICENSE](LICENSE) dosyasına bakın.

Banner görseli bu lisansın kapsamında değildir. Sanatçısına aittir; sanatçının adı belirtilip bu atıf bağlantıyla
verildiği sürece değiştirilmeden yeniden kullanılabilir ve [docs/assets/images/README.md](docs/assets/images/README.md)
kapsamındadır.

## Ticari markalar

Google Apps Script, Google Sheets, Google Slides, Google Docs, Google Forms ve Google Drive, Google LLC'nin ticari
markalarıdır. Bu proje bağımsız bir kütüphanedir. Google LLC ile bağlantılı değildir, Google LLC tarafından
onaylanmamış veya desteklenmemiştir; markalar yalnızca kütüphanenin hangi ürünlerle çalıştığını belirtmek için
kullanılır.

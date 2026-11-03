<a name="top"></a>

![شعار مشروع Google Apps Script Utils](docs/assets/images/banner-1280x640.jpg)

<p align="right">
    <small>
        <i>الفنانة: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-utils&utm_content=banner-artist-credit" title="معرض أعمال الفنانة Daryna Mikhailenko">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [Português](README.pt.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Polski](README.pl.md) | [Čeština](README.cs.md) | [Türkçe](README.tr.md) | **العربية** | [Bahasa Indonesia](README.id.md) | [Tiếng Việt](README.vi.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [简体中文](README.zh.md) | [繁體中文](README.zh-TW.md)

<div dir="rtl" lang="ar">

> أُنجزت هذه الترجمة بمساعدة الذكاء الاصطناعي انطلاقًا من [README.md](README.md) للإصدار 2.1.1. النسخة المرجعية هي ملف README الإنجليزي؛ ونرحّب بالتصحيحات — راجع [CONTRIBUTING.md](CONTRIBUTING.md#readme-translations).

# أدوات مساعدة لمشاريع Google Apps Script™

</div>

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

<div dir="rtl" lang="ar">

<!-- TOC -->

- [أدوات مساعدة لمشاريع Google Apps Script™](#أدوات-مساعدة-لمشاريع-google-apps-script)
  - [نظرة عامة](#نظرة-عامة)
  - [الميزات الرئيسية](#الميزات-الرئيسية)
  - [مهارات وكلاء الذكاء الاصطناعي](#مهارات-وكلاء-الذكاء-الاصطناعي)
  - [المتطلبات](#المتطلبات)
  - [التثبيت](#التثبيت)
  - [التوثيق](#التوثيق)
  - [أمثلة الاستخدام](#أمثلة-الاستخدام)
  - [التطوير](#التطوير)
    - [السكربتات](#السكربتات)
    - [الاختبار](#الاختبار)
  - [بنية المشروع](#بنية-المشروع)
  - [الدوال حسب الفئة](#الدوال-حسب-الفئة)
  - [المساهمة](#المساهمة)
  - [الدعم](#الدعم)
  - [خارطة الطريق](#خارطة-الطريق)
  - [سجل التغييرات](#سجل-التغييرات)
  - [الترخيص](#الترخيص)
  <!-- TOC -->

## نظرة عامة

**@bootgs/utils** مكتبة أدوات مساعدة بلغة TypeScript صُمّمت خصيصًا لـ **Google Apps Script**. تجمع في حزمة واحدة،
موثّقة جيدًا ومختبرة بالكامل، الدوال المساعدة التي ينتهي كل مشروع GAS بكتابتها يدويًا — التعامل مع جداول البيانات
وتدوين A1، والتحقق من الأنواع والقيم (`isX`/`nonX`/`requireX`)، وتحويلات السلاسل النصية والمصفوفات، والاستثناءات
ذات الأنواع المحددة، وغير ذلك.

## الميزات الرئيسية

- **مبنية لـ Google Apps Script** — مصمّمة حول بيئة تشغيل GAS وقيودها، وليست مقتبسة من مكتبة Node.js عامة.
- **تغطية واسعة** — دوال مساعدة لجداول البيانات وواجهة المستخدم والشبكة وAdmin SDK، إلى جانب أدوات عامة للسلاسل
  النصية والمصفوفات والكائنات.
- **TypeScript أولًا** — تأتي كل دالة مع تعريفات أنواع كاملة للإكمال التلقائي في بيئة التطوير والأمان وقت الترجمة.
- **مختبرة** — تغطيها مجموعة اختبارات وحدات مكتوبة بـ Vitest.
- **توثيق مرجعي مترابط** — كل نوع من أنواع Google Apps Script المستخدمة في الواجهة البرمجية يرتبط مباشرةً بتوثيقه
  الرسمي.
- **معالجة متّسقة للأخطاء** — تسلسل هرمي مخصص لفئات الاستثناءات يحلّ محل الأخطاء المرمية بشكل عشوائي.

## مهارات وكلاء الذكاء الاصطناعي

للفرق التي تستخدم وكيل برمجة بالذكاء الاصطناعي (Claude Code وGemini CLI وغيرهما)، يقدّم المستودع
[bootgs/skills](https://github.com/bootgs/skills) مهارة وكيل (Agent Skill) باسم
[`@bootgs/utils`](https://github.com/bootgs/skills/tree/main/skills/apps-script-utils) توثّق هذه المكتبة لمثل هذه
الوكلاء، بما في ذلك اصطلاح التحقق `isX`/`nonX`/`requireX`، ودوال تدوين A1 والأوراق، ودوال السلاسل النصية والأرقام
والمصفوفات، والاستثناءات ذات الأنواع المحددة، ودوال HTML وJSON والمسارات.

التثبيت باستخدام Claude Code:

</div>

```bash
/plugin marketplace add bootgs/skills
/plugin install apps-script-utils@bootgs-skills
```

<div dir="rtl" lang="ar">

التثبيت باستخدام واجهة الأوامر `npx skills` التي تدعم عدة وكلاء:

</div>

```bash
npx skills add bootgs/skills --skill apps-script-utils
```

<div dir="rtl" lang="ar">

بعد التثبيت، يطبّق الوكيل المهارة تلقائيًا عندما تتعلق المهمة بهذه المكتبة.

## المتطلبات

- [Node.js](https://nodejs.org/) الإصدار v22.14.0 أو أحدث
- [npm](https://www.npmjs.com/) (أو مدير حزم آخر لـ Node، مثل pnpm)

## التثبيت

ثبّت الحزمة عبر npm:

</div>

```bash
npm install @bootgs/utils
```

<div dir="rtl" lang="ar">

## التوثيق

التوثيق الكامل منشور على **<https://bootgs.github.io/utils/>** (بالإنجليزية): أدلة، وشروحات لكل وحدة، والمرجع
الكامل للدوال. يوجد مصدره في [`docs/writerside/`](docs/writerside/) ويُعاد بناؤه مع كل دفع (push) إلى `main`.

ترتيب مقترح للقراءة:

- [Getting started](https://bootgs.github.io/utils/getting-started.html) — الخطوات الأولى
- [Validation conventions](https://bootgs.github.io/utils/validation-conventions.html) — نظام التسمية
  `isX`/`nonX`/`requireX`/`requireNonX`
- [Exception handling](https://bootgs.github.io/utils/exception-handling.html) — التسلسل الهرمي للفئات وما الذي
  يطلق كل استثناء
- [The Apps Script runtime](https://bootgs.github.io/utils/apps-script-runtime.html) — أي الدوال المساعدة ترتبط
  بخدمة من خدمات Google، وما يعنيه ذلك للاختبار

## أمثلة الاستخدام

### العمل مع جداول البيانات

إلحاق عدة صفوف من البيانات بكفاءة:

</div>

```typescript
import { appendRows } from "@bootgs/utils";

const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
const data = [
  ["John Doe", "john@example.com", 28],
  ["Jane Smith", "jane@example.com", 32]
];

appendRows(sheet, data);
```

<div dir="rtl" lang="ar">

### أدوات Admin SDK

التحقق مما إذا كان المستخدم الحالي يملك صلاحيات إدارية:

</div>

```typescript
import { isAdmin } from "@bootgs/utils";

if (isAdmin()) {
  Logger.log("Access granted to admin panel.");
} else {
  Logger.log("Access denied.");
}
```

<div dir="rtl" lang="ar">

### تحليل تدوين A1

تحليل صيغ تدوين A1 المعقدة وتحويلها إلى كائنات منظّمة:

</div>

```typescript
import { parseA1Notation } from "@bootgs/utils";

const rangeInfo = parseA1Notation("'Sheet1'!A1:B10");

console.log(rangeInfo.sheetName); // "Sheet1"
console.log(rangeInfo.startRowIndex); // 0
console.log(rangeInfo.endColumnIndex); // 2
```

<div dir="rtl" lang="ar">

## التطوير

### السكربتات

السكربتات التالية متاحة في `package.json`:

</div>

| Script               | الوصف                                                         |
| :------------------- | :------------------------------------------------------------ |
| `npm run build`      | ينظّف المجلد `dist` ويترجم شيفرة TypeScript المصدرية.         |
| `npm run dev`        | يشغّل Vitest في وضع المراقبة.                                 |
| `npm test`           | يشغّل مجموعة الاختبارات كاملةً مرة واحدة.                     |
| `npm run type:check` | يتحقق من أنواع المشروع دون إنتاج مخرجات.                      |
| `npm run lint`       | يفحص الشيفرة باستخدام ESLint.                                 |
| `npm run lint:fix`   | يفحص الشيفرة ويصلح تلقائيًا ما أمكن.                          |
| `npm run format`     | يتحقق من التنسيق باستخدام Prettier.                           |
| `npm run format:fix` | ينسّق الشيفرة باستخدام Prettier.                              |
| `npm run prepare`    | يُعدّ خطافات Git الخاصة بـ Husky (يعمل تلقائيًا بعد التثبيت). |

<div dir="rtl" lang="ar">

### الاختبار

يستخدم المشروع [Vitest](https://vitest.dev/) لاختبارات الوحدات.

تشغيل المجموعة كاملةً مرة واحدة:

</div>

```bash
npm test
```

<div dir="rtl" lang="ar">

أو تشغيلها في وضع المراقبة أثناء التطوير:

</div>

```bash
npm run dev
```

<div dir="rtl" lang="ar">

## بنية المشروع

</div>

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

<div dir="rtl" lang="ar">

## الدوال حسب الفئة

انتقل المرجع الكامل للدوال إلى موقع التوثيق (بالإنجليزية)، الذي يُبنى من [`docs/writerside/`](docs/writerside/)
ويُنشر مع كل دفع (push) إلى `main`:

**<https://bootgs.github.io/utils/>**

| القسم                                                                                 | المحتوى                                                                                    |
| :------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------- |
| [Google Apps Script module](https://bootgs.github.io/utils/reference-appsscript.html) | Sheets وSlides وAdmin SDK وDrive وDocs وForms، وطلبات الشبكة، وفئات واجهة المستخدم المدمجة |
| [Base utilities](https://bootgs.github.io/utils/reference-base.html)                  | فحص الأنواع والتحقق، ومعالجة السلاسل النصية والمصفوفات والكائنات، والتعامل مع JSON وHTML   |
| [Exceptions](https://bootgs.github.io/utils/reference-exception.html)                 | فئات الاستثناءات ذات الأنواع المحددة وما الذي يطلق كلًّا منها                              |
| [`path` module](https://bootgs.github.io/utils/reference-path.html)                   | مسارات الملفات وعناوين URL                                                                 |
| [Abstracts and interfaces](https://bootgs.github.io/utils/reference-abstracts.html)   | لبنات بناء مشتركة                                                                          |

إلى جانب المرجع، يضم الموقع الأدلة التي لم تتسع لها الجداول:
[validation conventions](https://bootgs.github.io/utils/validation-conventions.html) يشرح نظام
`isX`/`nonX`/`requireX`/`requireNonX` في مكان واحد، و[exception handling](https://bootgs.github.io/utils/exception-handling.html)
يعرض التسلسل الهرمي للفئات، و[the Apps Script runtime](https://bootgs.github.io/utils/apps-script-runtime.html)
يوضّح أي الدوال المساعدة ترتبط بخدمة من خدمات Google، وما كلفة ذلك، وما يعنيه للاختبار.

## المساهمة

نرحّب بالمساهمات. راجع [CONTRIBUTING.md](CONTRIBUTING.md) للاطلاع على الدليل الكامل. باختصار:

1. أنشئ نسخة (fork) من المستودع وفرعًا للميزة أو الإصلاح الذي تعمل عليه.
2. أضف اختبارات أو حدّثها لتغطية تغييراتك.
3. شغّل `npm run lint` و`npm run format` قبل الإيداع (commit).
4. لا تعدّل `CHANGELOG.md` يدويًا — فهو يُولَّد تلقائيًا بواسطة [release-please](https://github.com/googleapis/release-please).
5. افتح طلب دمج (pull request) يصف ما الذي تغيّر ولماذا.

اتبع أسلوب الشيفرة واصطلاحات التسمية المعتمدة. راجع [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) للاطلاع على قواعد
المجتمع.

## الدعم

- للإبلاغ عن الأخطاء أو طلب الميزات، ابحث عن [issue](https://github.com/bootgs/utils/issues) أو افتح واحدة على
  GitHub.
- لمعرفة أحدث التغييرات، راجع [سجل التغييرات](CHANGELOG.md).
- للإبلاغ عن ثغرة أمنية، اتبع [سياسة الأمان](SECURITY.md) بدلًا من فتح issue عامة.
- لدعم استمرار التطوير، راجع [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov).

## خارطة الطريق

ما هو مخطط له أو قيد التنفيذ أو منجز موجود على [لوحة المشروع](https://github.com/users/MaksymStoianov/projects/2/views/2)،
المبنية من متتبّع المشكلات نفسه. لا توجد وثيقة خارطة طريق منفصلة قد تتخلف عنه: لاقتراح أمر ما، افتح
[issue](https://github.com/bootgs/utils/issues).

## سجل التغييرات

للاطلاع على قائمة مفصّلة بالتغييرات حسب الإصدار، راجع [CHANGELOG.md](CHANGELOG.md).

## الترخيص

هذا المشروع مرخّص بموجب Apache License 2.0. راجع [LICENSE](LICENSE) لمزيد من التفاصيل.

رسم الشعار ليس جزءًا من ذلك الترخيص. إنه من أعمال مؤلفته، ويجوز إعادة استخدامه دون تعديل مع ذكر اسم المؤلفة وربط
الإشارة إليها برابط، ويخضع لـ [docs/assets/images/README.md](docs/assets/images/README.md).

## العلامات التجارية

Google Apps Script وGoogle Sheets وGoogle Slides وGoogle Docs وGoogle Forms وGoogle Drive علامات تجارية مملوكة لشركة
Google LLC. هذا المشروع مكتبة مستقلة، وهو غير تابع لشركة Google LLC ولا معتمد أو مموّل منها، وتُستخدم العلامات
التجارية فقط لوصف ما تعمل معه المكتبة.

</div>

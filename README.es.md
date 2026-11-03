<a name="top"></a>

![Banner del proyecto Google Apps Script Utils](docs/assets/images/banner-1280x640.jpg)

<p align="right">
    <small>
        <i>Artista: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-utils&utm_content=banner-artist-credit" title="Portafolio de la artista Daryna Mikhailenko">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | **Español** | [Português](README.pt.md) | [日本語](README.ja.md) | [中文](README.zh.md)

> Esta traducción se hizo con ayuda de IA a partir de [README.md](README.md) para la versión 2.1.1. La versión de referencia es el README en inglés; las correcciones son bienvenidas — consulta [CONTRIBUTING.md](CONTRIBUTING.md#readme-translations).

# Utilidades para Google Apps Script™

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

- [Utilidades para Google Apps Script™](#utilidades-para-google-apps-script)
  - [Descripción general](#descripción-general)
  - [Características principales](#características-principales)
  - [Skills para agentes de IA](#skills-para-agentes-de-ia)
  - [Requisitos](#requisitos)
  - [Instalación](#instalación)
  - [Documentación](#documentación)
  - [Ejemplos de uso](#ejemplos-de-uso)
  - [Desarrollo](#desarrollo)
    - [Scripts](#scripts)
    - [Pruebas](#pruebas)
  - [Estructura del proyecto](#estructura-del-proyecto)
  - [Funciones por categoría](#funciones-por-categoría)
  - [Cómo contribuir](#cómo-contribuir)
  - [Soporte](#soporte)
  - [Hoja de ruta](#hoja-de-ruta)
  - [Registro de cambios](#registro-de-cambios)
  - [Licencia](#licencia)
  <!-- TOC -->

## Descripción general

**@bootgs/utils** es una biblioteca de utilidades en TypeScript creada específicamente para **Google Apps
Script**. Reúne las funciones auxiliares que todo proyecto de GAS acaba escribiendo a mano — manipulación de hojas de
cálculo y de la notación A1, validación de tipos y valores (`isX`/`nonX`/`requireX`), transformaciones de cadenas y
arrays, excepciones tipadas y más — en un único paquete bien documentado y completamente probado.

## Características principales

- **Hecha para Google Apps Script** — diseñada en torno al entorno de ejecución de GAS y sus limitaciones, no
  adaptada de una biblioteca genérica de Node.js.
- **Amplia cobertura** — funciones para hojas de cálculo, UI, red y Admin SDK junto a utilidades de uso general para
  cadenas, arrays y objetos.
- **TypeScript primero** — cada función incluye definiciones de tipos completas para el autocompletado en el IDE y la
  seguridad en tiempo de compilación.
- **Probada** — cubierta por una suite de pruebas unitarias con Vitest.
- **Documentación de referencia enlazada** — cada tipo de Google Apps Script usado en la API enlaza directamente con
  su documentación oficial.
- **Manejo de errores coherente** — una jerarquía propia de clases de excepción sustituye a los errores lanzados de
  forma improvisada.

## Skills para agentes de IA

Para los equipos que usan un agente de programación con IA (Claude Code, Gemini CLI y otros), el repositorio
[bootgs/skills](https://github.com/bootgs/skills) ofrece un Agent Skill
[`@bootgs/utils`](https://github.com/bootgs/skills/tree/main/skills/apps-script-utils) que documenta esta
biblioteca para dichos agentes, incluida la convención de validación `isX`/`nonX`/`requireX`, las funciones para la
notación A1 y las hojas, para cadenas, números y arrays, las excepciones tipadas y las funciones para HTML, JSON y
rutas.

Instalación con Claude Code:

```bash
/plugin marketplace add bootgs/skills
/plugin install apps-script-utils@bootgs-skills
```

Instalación con la CLI `npx skills`, que admite varios agentes:

```bash
npx skills add bootgs/skills --skill apps-script-utils
```

Una vez instalado, el agente aplica el skill automáticamente cuando una tarea tiene que ver con esta biblioteca.

## Requisitos

- [Node.js](https://nodejs.org/) v22.14.0 o posterior
- [npm](https://www.npmjs.com/) (u otro gestor de paquetes de Node, p. ej. pnpm)

## Instalación

Instala el paquete con npm:

```bash
npm install @bootgs/utils
```

## Documentación

La documentación completa está publicada en **<https://bootgs.github.io/utils/>** (en inglés):
guías, recorridos por cada módulo y la referencia completa de funciones. Su código fuente está en
[`docs/writerside/`](docs/writerside/) y se reconstruye con cada push a `main`.

Un buen orden de lectura:

- [Getting started](https://bootgs.github.io/utils/getting-started.html) — primeros pasos
- [Validation conventions](https://bootgs.github.io/utils/validation-conventions.html) — el
  esquema de nombres `isX`/`nonX`/`requireX`/`requireNonX`
- [Exception handling](https://bootgs.github.io/utils/exception-handling.html) — la jerarquía de
  clases y qué provoca cada excepción
- [The Apps Script runtime](https://bootgs.github.io/utils/apps-script-runtime.html) — qué
  funciones dependen de un servicio de Google y qué implica eso para las pruebas

## Ejemplos de uso

### Trabajar con hojas

Añadir varias filas de datos de forma eficiente:

```typescript
import { appendRows } from "@bootgs/utils";

const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
const data = [
  ["John Doe", "john@example.com", 28],
  ["Jane Smith", "jane@example.com", 32]
];

appendRows(sheet, data);
```

### Utilidades de Admin SDK

Comprobar si el usuario actual tiene privilegios de administrador:

```typescript
import { isAdmin } from "@bootgs/utils";

if (isAdmin()) {
  Logger.log("Access granted to admin panel.");
} else {
  Logger.log("Access denied.");
}
```

### Análisis de la notación A1

Analizar notaciones A1 complejas y convertirlas en objetos estructurados:

```typescript
import { parseA1Notation } from "@bootgs/utils";

const rangeInfo = parseA1Notation("'Sheet1'!A1:B10");

console.log(rangeInfo.sheetName); // "Sheet1"
console.log(rangeInfo.startRowIndex); // 0
console.log(rangeInfo.endColumnIndex); // 2
```

## Desarrollo

### Scripts

En `package.json` están disponibles los siguientes scripts:

| Script               | Descripción                                                                           |
| :------------------- | :------------------------------------------------------------------------------------ |
| `npm run build`      | Limpia el directorio `dist` y compila el código fuente TypeScript.                    |
| `npm run dev`        | Inicia Vitest en modo observación.                                                    |
| `npm test`           | Ejecuta una vez la suite de pruebas completa.                                         |
| `npm run type:check` | Comprueba los tipos del proyecto sin generar salida.                                  |
| `npm run lint`       | Analiza el código con ESLint.                                                         |
| `npm run lint:fix`   | Analiza el código y corrige automáticamente lo que puede.                             |
| `npm run format`     | Comprueba el formato con Prettier.                                                    |
| `npm run format:fix` | Formatea el código con Prettier.                                                      |
| `npm run prepare`    | Configura los hooks de Git de Husky (se ejecuta automáticamente tras la instalación). |

### Pruebas

El proyecto usa [Vitest](https://vitest.dev/) para las pruebas unitarias.

Ejecutar la suite completa una vez:

```bash
npm test
```

O ejecutarla en modo observación mientras desarrollas:

```bash
npm run dev
```

## Estructura del proyecto

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

## Funciones por categoría

La referencia completa de funciones se ha trasladado al sitio de documentación, que se genera a partir de
[`docs/writerside/`](docs/writerside/) y se publica con cada push a `main`:

**<https://bootgs.github.io/utils/>**

| Sección                                                                               | Contenido                                                                                                 |
| :------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------- |
| [Google Apps Script module](https://bootgs.github.io/utils/reference-appsscript.html) | Sheets, Slides, Admin SDK, Drive, Docs, Forms, peticiones de red y las clases de UI integradas            |
| [Base utilities](https://bootgs.github.io/utils/reference-base.html)                  | Comprobación de tipos y validación, manipulación de cadenas, arrays y objetos, tratamiento de JSON y HTML |
| [Exceptions](https://bootgs.github.io/utils/reference-exception.html)                 | Las clases de excepción tipadas y qué provoca cada una                                                    |
| [`path` module](https://bootgs.github.io/utils/reference-path.html)                   | Rutas de archivos y URL                                                                                   |
| [Abstracts and interfaces](https://bootgs.github.io/utils/reference-abstracts.html)   | Piezas compartidas                                                                                        |

Además de la referencia, el sitio incluye las guías que no cabían en las tablas:
[validation conventions](https://bootgs.github.io/utils/validation-conventions.html) explica el
esquema `isX`/`nonX`/`requireX`/`requireNonX` en un solo lugar,
[exception handling](https://bootgs.github.io/utils/exception-handling.html) expone la jerarquía
de clases y [the Apps Script runtime](https://bootgs.github.io/utils/apps-script-runtime.html)
explica qué funciones dependen de un servicio de Google, qué cuesta eso y qué implica para las pruebas.

## Cómo contribuir

Las contribuciones son bienvenidas. Consulta la guía completa en [CONTRIBUTING.md](CONTRIBUTING.md). En resumen:

1. Haz un fork del repositorio y crea una rama para tu funcionalidad o corrección.
2. Añade o actualiza las pruebas que cubren tus cambios.
3. Ejecuta `npm run lint` y `npm run format` antes de hacer commit.
4. No edites `CHANGELOG.md` a mano: lo genera automáticamente [release-please](https://github.com/googleapis/release-please).
5. Abre una pull request que describa qué ha cambiado y por qué.

Sigue el estilo de código y las convenciones de nombres existentes. Las normas de la comunidad están en
[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Soporte

- Para errores o solicitudes de funcionalidades, busca o abre una
  [issue](https://github.com/bootgs/utils/issues) en GitHub.
- Para los cambios recientes, consulta el [registro de cambios](CHANGELOG.md).
- Para informar de una vulnerabilidad de seguridad, sigue la [política de seguridad](SECURITY.md) en lugar de abrir
  una issue pública.
- Para apoyar el desarrollo continuo, consulta [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov).

## Hoja de ruta

Lo planificado, en curso o terminado está en el [tablero del proyecto](https://github.com/users/MaksymStoianov/projects/2/views/2),
que se genera a partir del propio gestor de issues. No hay un documento de hoja de ruta aparte que pueda quedar
desfasado: para proponer algo, abre una [issue](https://github.com/bootgs/utils/issues).

## Registro de cambios

Para ver la lista detallada de cambios por versión, consulta [CHANGELOG.md](CHANGELOG.md).

## Licencia

Este proyecto se distribuye bajo la licencia Apache License 2.0. Consulta [LICENSE](LICENSE) para más detalles.

La ilustración del banner no forma parte de esa licencia. Es obra de su autora, puede reutilizarse sin
modificaciones siempre que se cite a la autora con un enlace, y se rige por
[docs/assets/images/README.md](docs/assets/images/README.md).

## Marcas comerciales

Google Apps Script, Google Sheets, Google Slides, Google Docs, Google Forms y Google Drive son marcas comerciales de
Google LLC. Este proyecto es una biblioteca independiente. No está afiliado a Google LLC ni cuenta con su respaldo o
patrocinio, y las marcas se usan únicamente para describir con qué funciona la biblioteca.

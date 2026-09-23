# Ökosystem

<link-summary>Das Framework boot.gs, das auf dieser Bibliothek aufbaut, und die Agent Skills, die KI-Agenten den Umgang damit beibringen.</link-summary>

<web-summary>Wie apps-script-utils mit dem boot.gs-Framework für Google Apps Script zusammenhängt und mit den Agent Skills, die Claude Code, Gemini CLI und Cursor den Umgang mit beidem beibringen.</web-summary>

Die Bibliothek ist für sich allein nützlich: installieren, eine Funktion importieren, fertig. Sie ist zugleich Teil
eines kleinen Ökosystems für die Entwicklung mit Google Apps Script, und zwei Nachbarn lohnen die Bekanntschaft.

## Boot.gs — das Anwendungsframework

[Boot.gs](https://github.com/bootgs/boot) ist ein Framework für strukturierte Apps-Script-Anwendungen. Es bringt
Controller, Decorators, Dependency Injection und eine Routing-Schicht über `doGet` und `doPost` in eine Umgebung,
die von sich aus globale Funktionen anbietet und sonst nichts.

```bash
npm install bootgs
```

```typescript
import { Get, RestController } from "bootgs";

@RestController("api/sheet")
export class SheetController {
  @Get("active-range")
  getActiveRange(): string {
    return "This action returns the active sheet range.";
  }
}
```

**Das Verhältnis zu dieser Bibliothek ist eine Abhängigkeit, keine Rivalität.** `bootgs` führt `apps-script-utils`
unter seinen Laufzeitabhängigkeiten, ein boot.gs-Projekt hat also jede hier beschriebene Funktion bereits an Bord,
ohne zweite Installation. Aus diesen Prüfungen sind seine Parametervalidierung und seine Dienstsuche gebaut.

Wozu man greift:

| Was gebraucht wird                                                            | Was man nimmt                          |
| :---------------------------------------------------------------------------- | :------------------------------------- |
| Helfer in einem bestehenden Skript — ein paar Funktionen, keine neue Struktur | `apps-script-utils` allein             |
| Routing, Controller, Dependency Injection, eine Web-App mit echten Endpunkten | `bootgs`, die Bibliothek ist enthalten |

## Agent Skills — einem KI-Agenten diese Bibliothek beibringen

Wer Apps Script mit einem KI-Agenten schreibt, findet im Repository [bootgs/skills](https://github.com/bootgs/skills)
Agent Skills dafür: verpackte Anweisungen, die ein Agent lädt, sobald eine Aufgabe das jeweilige Thema berührt. Sie
funktionieren in Claude Code, Gemini CLI, Cursor und allem, was die CLI `npx skills` unterstützt.

Der Katalog zerfällt in zwei Teile:

| Skill                           | Behandelt                                                                                            |
| :------------------------------ | :--------------------------------------------------------------------------------------------------- |
| `apps-script-utils`             | diese Bibliothek: die Konvention `isX`/`nonX`/`requireX`, die Prüfungen, die Helfer                  |
| `apps-script-triggers`          | einfache und installierbare Trigger, die Gestalt der Ereignisse, Kontingente                         |
| `apps-script-services`          | kontingentschonende Nutzung von `SpreadsheetApp`, `PropertiesService`, `CacheService`, `LockService` |
| `apps-script-ui`                | Menüs, Seitenleisten, Dialoge und die Fallstricke von `google.script.run`                            |
| `apps-script-clasp-workflow`    | die `clasp`-CLI: push, deploy, Versionen, mehrere Umgebungen                                         |
| `bootgs-quickstart`, `bootgs-*` | das Framework oben: Projektaufbau, Architektur, Validierung, Client, OpenAPI                         |

Installation in Claude Code:

```bash
/plugin marketplace add bootgs/skills
/plugin install apps-script@bootgs-skills
```

Installation in einen beliebigen unterstützten Agenten:

```bash
npx skills add bootgs/skills --skill apps-script-utils
```

Einmal installiert, wendet der Agent den Skill von selbst an, sobald eine Aufgabe diese Bibliothek betrifft — er
hört auf, Funktionsnamen zu raten, und benutzt die vorhandenen, mit der Prüfkonvention, der die Bibliothek
tatsächlich folgt.

Ein Skill ist allerdings eine Zusammenfassung; die Referenz steht hier. Wo beide auseinandergehen, gelten die Seiten
dieser Website und der Code, aus dem sie entstehen.

# Ecosystem

<link-summary>The boot.gs framework, which builds on this library, and the Agent Skills that teach AI coding agents to use it.</link-summary>

<web-summary>How apps-script-utils fits with the boot.gs framework for Google Apps Script and with the Agent Skills that teach Claude Code, Gemini CLI and Cursor to use both.</web-summary>

This library is useful on its own — install it, import a function, done. It is also part of a small ecosystem for
Google Apps Script development, and two neighbours are worth knowing about.

## Boot.gs — the application framework

[Boot.gs](https://github.com/bootgs/boot) is a framework for structured Apps Script applications. It brings
controllers, decorators, dependency injection and a routing layer over `doGet` and `doPost` to an environment that
otherwise offers global functions and nothing else.

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

**The relationship to this library is a dependency, not a rivalry.** `bootgs` lists `apps-script-utils` among its
runtime dependencies, so a boot.gs project already has every function documented here, with no second install. The
guards are what its parameter validation and its service lookups are built from.

Which to reach for:

| You want                                                                  | Use                                  |
| :------------------------------------------------------------------------ | :----------------------------------- |
| Helpers inside a script you already have — a few functions, no new shape  | `apps-script-utils` on its own       |
| Routing, controllers, dependency injection, a web app with real endpoints | `bootgs`, with this library included |

## Agent Skills — teaching an AI agent this library

If you write Apps Script with an AI coding agent, the [bootgs/skills](https://github.com/bootgs/skills) repository
publishes Agent Skills for it: packaged instructions an agent loads when a task touches a given topic. They work in
Claude Code, Gemini CLI, Cursor and anything the `npx skills` CLI supports.

The catalogue splits in two:

| Skill                           | Covers                                                                              |
| :------------------------------ | :---------------------------------------------------------------------------------- |
| `apps-script-utils`             | This library: the `isX`/`nonX`/`requireX` convention, the guards, the helpers       |
| `apps-script-triggers`          | Simple and installable triggers, event shapes, quotas                               |
| `apps-script-services`          | Quota-safe `SpreadsheetApp`, `PropertiesService`, `CacheService`, `LockService` use |
| `apps-script-ui`                | Menus, sidebars, dialogs, and the `google.script.run` pitfalls                      |
| `apps-script-clasp-workflow`    | The `clasp` CLI: push, deploy, versioning, multiple environments                    |
| `bootgs-quickstart`, `bootgs-*` | The framework above: project layout, architecture, validation, client, OpenAPI      |

Install into Claude Code:

```bash
/plugin marketplace add bootgs/skills
/plugin install apps-script@bootgs-skills
```

Install into any supported agent:

```bash
npx skills add bootgs/skills --skill apps-script-utils
```

Once installed, the agent applies the skill on its own when a task involves this library — it stops guessing at
function names and starts using the ones that exist, with the validation convention the library actually follows.

A skill is a summary, though, and this site is the reference. When the two disagree, the pages here and the JSDoc
they are generated from are what is current.

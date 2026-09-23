/**
 * Writes the prose files for the guard families from `scripts/docs/guards.mjs`.
 *
 * The four families — `isX`, `nonX`, `requireX`, `requireNonX` — say the same
 * things about different subjects, so the sentences around a subject are
 * written once per language and the subject supplies what is specific to it.
 * The result is an ordinary content file per function per language; nothing
 * about it is special afterwards.
 *
 * Usage: `node scripts/docs/author-guards.mjs`
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { SUBJECTS } from "./guards.mjs";
import { LANGUAGES } from "./languages.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

/**
 * Where each subject's functions live, relative to `src/`.
 */
const MODULES = {
  "lang/base": [
    "Array",
    "Boolean",
    "String",
    "Number",
    "Symbol",
    "Null",
    "Undefined",
    "Nil",
    "Object",
    "ObjectLike",
    "Function",
    "FunctionLike",
    "RegExp",
    "Scalar",
    "Exception",
    "Empty",
    "Length",
    "NumberLike"
  ],
  "lang/number": ["Integer", "SafeInteger", "Float", "Double", "Countable", "NaN", "NonNegative"],
  "lang/string": ["Email", "ValidLocale", "ValidSlug", "ValidVersion"],
  "net/path": ["Absolute", "Relative", "ValidDomain"],
  "net/url": ["Url"],
  "appsscript/sheet": [
    "CellGridRange",
    "ValidSheetId",
    "ValidSheetName",
    "ValidSpreadsheetId",
    "Sheet",
    "Spreadsheet",
    "Range",
    "RichTextValue",
    "TextStyle"
  ],
  "appsscript/slide": ["ValidPresentationId", "ValidSlideId", "Presentation", "Slide"],
  "appsscript/ui": ["Ui", "HtmlOutput", "TextOutput"]
};

const TEMPLATES = {
  en: {
    isSummary: (s) => `Checks whether a value is ${s.is}.`,
    nonSummary: (s) => `Checks whether a value is **not** ${s.non}.`,
    requireSummary: (s) => `Returns the value as ${s.acc}, or throws.`,
    requireNonSummary: (s) => `Returns the value after checking that it is not ${s.non}.`,
    family:
      "`isX` and `nonX` answer a question and never interrupt control flow; `requireX` and `requireNonX` hand the value back or throw. The scheme is explained in [](validation-conventions.md).",
    negation: (name) =>
      `\`${name}(value)\` is the same test as \`!${name.replace(/^non/, "is")}(value)\`, written so that a guard clause reads as a sentence rather than as a negation.`,
    valueParam: "The value to check.",
    validateParam: "The value to validate.",
    messageParam: () => "The message of the exception. A default is used when omitted.",
    strictParam:
      "When `true`, a string counts as empty only if it has no characters at all; by default whitespace is trimmed first.",
    isReturns: (s) => `\`true\` when the value is ${s.is}; otherwise \`false\`.`,
    nonReturns: (s) => `\`true\` when the value is not ${s.non}; otherwise \`false\`.`,
    requireReturns: (s) => `the same value, typed as ${s.acc}.`,
    requireNonReturns: (s) => `the same value, with ${s.non} excluded from its type.`,
    requireThrows: (s) => `the value is not ${s.is}.`,
    requireNonThrows: (s) => `the value is ${s.is}.`,
    tagNote: (tag) =>
      `An Apps Script service object has no constructor a script can test against, so the guard reads the tag the object reports for itself: \`value.toString() === "${tag}"\`. A plain object that reports the same tag passes too, which in practice means a test double.`,
    duckNote: (methods) =>
      `An Apps Script service object has no constructor a script can test against, so the guard looks for the methods that define the type — ${methods}. A stub that implements them passes, which is what makes code using this guard testable outside the runtime.`,
    exampleTitle: "What passes and what does not",
    exampleGuard: "In a guard clause"
  },

  ru: {
    isSummary: (s) => `Проверяет, является ли значение ${s.is}.`,
    nonSummary: (s) => `Проверяет, что значение **не** является ${s.non}.`,
    requireSummary: (s) => `Возвращает значение как ${s.acc} или выбрасывает исключение.`,
    requireNonSummary: (s) => `Возвращает значение, убедившись, что оно не является ${s.non}.`,
    family:
      "`isX` и `nonX` отвечают на вопрос и никогда не прерывают выполнение; `requireX` и `requireNonX` возвращают значение или выбрасывают исключение. Схема разобрана в [](validation-conventions.md).",
    negation: (name) =>
      `\`${name}(value)\` — та же проверка, что и \`!${name.replace(/^non/, "is")}(value)\`, записанная так, чтобы охранное условие читалось как утверждение, а не как отрицание.`,
    valueParam: "Проверяемое значение.",
    validateParam: "Значение, которое нужно проверить.",
    messageParam: () =>
      "Сообщение исключения. Если не задано, используется сообщение по умолчанию.",
    strictParam:
      "При `true` строка считается пустой, только если в ней вовсе нет символов; по умолчанию пробелы сначала отбрасываются.",
    isReturns: (s) => `\`true\`, если значение является ${s.is}; иначе \`false\`.`,
    nonReturns: (s) => `\`true\`, если значение не является ${s.non}; иначе \`false\`.`,
    requireReturns: (s) => `то же значение, уже проверенное как ${s.acc}.`,
    requireNonReturns: (s) =>
      `то же значение; после проверки известно, что оно не является ${s.non}.`,
    requireThrows: (s) => `значение не является ${s.is}.`,
    requireNonThrows: (s) => `значение является ${s.is}.`,
    tagNote: (tag) =>
      `У сервисного объекта Apps Script нет конструктора, с которым скрипт мог бы сравнить значение, поэтому проверка читает тег, который объект сообщает о себе сам: \`value.toString() === "${tag}"\`. Обычный объект с таким же тегом тоже пройдёт — на практике это тестовый дубль.`,
    duckNote: (methods) =>
      `У сервисного объекта Apps Script нет конструктора, с которым скрипт мог бы сравнить значение, поэтому проверка ищет методы, определяющие тип, — ${methods}. Заглушка, реализующая их, проходит, и именно это позволяет тестировать такой код вне среды выполнения.`,
    exampleTitle: "Что проходит, а что нет",
    exampleGuard: "В охранном условии"
  },

  uk: {
    isSummary: (s) => `Перевіряє, чи є значення ${s.is}.`,
    nonSummary: (s) => `Перевіряє, що значення **не** є ${s.non}.`,
    requireSummary: (s) => `Повертає значення як ${s.acc} або викидає виняток.`,
    requireNonSummary: (s) => `Повертає значення, переконавшись, що воно не є ${s.non}.`,
    family:
      "`isX` та `nonX` відповідають на питання й ніколи не переривають виконання; `requireX` і `requireNonX` повертають значення або викидають виняток. Схему розібрано в [](validation-conventions.md).",
    negation: (name) =>
      `\`${name}(value)\` — та сама перевірка, що й \`!${name.replace(/^non/, "is")}(value)\`, записана так, щоб охоронна умова читалася як твердження, а не як заперечення.`,
    valueParam: "Значення, що перевіряється.",
    validateParam: "Значення, яке потрібно перевірити.",
    messageParam: () =>
      "Повідомлення винятку. Якщо не задано, використовується типове повідомлення.",
    strictParam:
      "За `true` рядок вважається порожнім, лише якщо в ньому зовсім немає символів; типово пробіли спершу відкидаються.",
    isReturns: (s) => `\`true\`, якщо значення є ${s.is}; інакше \`false\`.`,
    nonReturns: (s) => `\`true\`, якщо значення не є ${s.non}; інакше \`false\`.`,
    requireReturns: (s) => `те саме значення, вже перевірене як ${s.acc}.`,
    requireNonReturns: (s) => `те саме значення; після перевірки відомо, що воно не є ${s.non}.`,
    requireThrows: (s) => `значення не є ${s.is}.`,
    requireNonThrows: (s) => `значення є ${s.is}.`,
    tagNote: (tag) =>
      `У сервісного об'єкта Apps Script немає конструктора, з яким скрипт міг би порівняти значення, тому перевірка читає тег, який об'єкт повідомляє про себе сам: \`value.toString() === "${tag}"\`. Звичайний об'єкт з таким самим тегом теж пройде — на практиці це тестовий дубль.`,
    duckNote: (methods) =>
      `У сервісного об'єкта Apps Script немає конструктора, з яким скрипт міг би порівняти значення, тому перевірка шукає методи, що визначають тип, — ${methods}. Заглушка, яка їх реалізує, проходить, і саме це дозволяє тестувати такий код поза середовищем виконання.`,
    exampleTitle: "Що проходить, а що ні",
    exampleGuard: "В охоронній умові"
  },

  de: {
    isSummary: (s) => `Prüft, ob ein Wert ${s.is} ist.`,
    nonSummary: (s) => `Prüft, ob ein Wert **nicht** ${s.non} ist.`,
    requireSummary: (s) => `Gibt den Wert als ${s.acc} zurück oder wirft.`,
    requireNonSummary: (s) =>
      `Gibt den Wert zurück, nachdem geprüft wurde, dass er nicht ${s.non} ist.`,
    family:
      "`isX` und `nonX` beantworten eine Frage und unterbrechen den Ablauf nie; `requireX` und `requireNonX` geben den Wert zurück oder werfen. Das Schema erklärt [](validation-conventions.md).",
    negation: (name) =>
      `\`${name}(value)\` ist dieselbe Prüfung wie \`!${name.replace(/^non/, "is")}(value)\`, so geschrieben, dass eine Wächterklausel sich wie ein Satz liest und nicht wie eine Verneinung.`,
    valueParam: "Der zu prüfende Wert.",
    validateParam: "Der zu validierende Wert.",
    messageParam: () =>
      "Die Meldung der Ausnahme. Ohne Angabe wird eine Standardmeldung verwendet.",
    strictParam:
      "Bei `true` gilt eine Zeichenkette nur dann als leer, wenn sie gar keine Zeichen enthält; standardmäßig wird zuvor Leerraum entfernt.",
    isReturns: (s) => `\`true\`, wenn der Wert ${s.is} ist; sonst \`false\`.`,
    nonReturns: (s) => `\`true\`, wenn der Wert nicht ${s.non} ist; sonst \`false\`.`,
    requireReturns: (s) => `denselben Wert, typisiert als ${s.acc}.`,
    requireNonReturns: (s) =>
      `denselben Wert; nach der Prüfung steht fest, dass er nicht ${s.non} ist.`,
    requireThrows: (s) => `der Wert ist nicht ${s.is}.`,
    requireNonThrows: (s) => `der Wert ist ${s.is}.`,
    tagNote: (tag) =>
      `Ein Apps-Script-Dienstobjekt hat keinen Konstruktor, gegen den ein Skript prüfen könnte, also liest die Prüfung den Tag, den das Objekt über sich selbst meldet: \`value.toString() === "${tag}"\`. Ein einfaches Objekt mit demselben Tag besteht ebenfalls — in der Praxis ist das ein Test-Double.`,
    duckNote: (methods) =>
      `Ein Apps-Script-Dienstobjekt hat keinen Konstruktor, gegen den ein Skript prüfen könnte, also sucht die Prüfung die Methoden, die den Typ ausmachen — ${methods}. Ein Stub, der sie umsetzt, besteht, und genau das macht Code mit dieser Prüfung außerhalb der Laufzeit testbar.`,
    exampleTitle: "Was besteht und was nicht",
    exampleGuard: "In einer Wächterklausel"
  },

  fr: {
    isSummary: (s) => `Vérifie si une valeur est ${s.is}.`,
    nonSummary: (s) => `Vérifie qu'une valeur n'est **pas** ${s.non}.`,
    requireSummary: (s) => `Renvoie la valeur en tant que ${s.acc}, ou lève une exception.`,
    requireNonSummary: (s) => `Renvoie la valeur après avoir vérifié qu'elle n'est pas ${s.non}.`,
    family:
      "`isX` et `nonX` répondent à une question sans jamais interrompre le flot ; `requireX` et `requireNonX` rendent la valeur ou lèvent. Le schéma est expliqué dans [](validation-conventions.md).",
    negation: (name) =>
      `\`${name}(value)\` est le même test que \`!${name.replace(/^non/, "is")}(value)\`, écrit pour qu'une clause de garde se lise comme une phrase plutôt que comme une négation.`,
    valueParam: "La valeur à vérifier.",
    validateParam: "La valeur à valider.",
    messageParam: () => "Le message de l'exception. À défaut, un message par défaut est utilisé.",
    strictParam:
      "Avec `true`, une chaîne n'est vide que si elle ne contient aucun caractère ; par défaut, les espaces sont retirés d'abord.",
    isReturns: (s) => `\`true\` si la valeur est ${s.is} ; sinon \`false\`.`,
    nonReturns: (s) => `\`true\` si la valeur n'est pas ${s.non} ; sinon \`false\`.`,
    requireReturns: (s) => `la même valeur, typée comme ${s.acc}.`,
    requireNonReturns: (s) => `la même valeur ; après le test, elle n'est pas ${s.non}.`,
    requireThrows: (s) => `la valeur n'est pas ${s.is}.`,
    requireNonThrows: (s) => `la valeur est ${s.is}.`,
    tagNote: (tag) =>
      `Un objet de service Apps Script n'a pas de constructeur contre lequel un script pourrait tester, alors le garde lit le tag que l'objet déclare pour lui-même : \`value.toString() === "${tag}"\`. Un objet ordinaire qui déclare le même tag passe aussi, ce qui en pratique désigne un double de test.`,
    duckNote: (methods) =>
      `Un objet de service Apps Script n'a pas de constructeur contre lequel un script pourrait tester, alors le garde cherche les méthodes qui définissent le type — ${methods}. Un bouchon qui les implémente passe, et c'est ce qui rend ce code testable hors de l'environnement d'exécution.`,
    exampleTitle: "Ce qui passe et ce qui ne passe pas",
    exampleGuard: "Dans une clause de garde"
  }
};

/**
 * The exception a `requireX` throws, and its default message, read from the source.
 */
function requireFacts(path) {
  const source = readFileSync(path, "utf8");

  const thrown = source.match(/throw new (\w+)\(/);

  const fallback = source.match(/message:\s*string\s*=\s*"([^"]*)"/);

  return {
    exception: thrown ? thrown[1] : "IllegalArgumentException",
    fallback: fallback ? fallback[1] : ""
  };
}

function fence(lines) {
  return ["```javascript", ...lines, "```"].join("\n");
}

const written = [];

for (const [module, subjects] of Object.entries(MODULES)) {
  for (const subject of subjects) {
    const data = SUBJECTS[subject];

    if (!data) {
      throw new Error(`No dictionary entry for ${subject}`);
    }

    const members = {
      is: `is${subject}`,
      non: `non${subject}`,
      require: `require${subject}`,
      // `requireNonNull` rejects `undefined` as well, so it is documented with
      // the Nil subject rather than with Null.
      requireNon: subject === "Null" ? "requireNonNil" : `requireNon${subject}`,
      ...(data.members ?? {})
    };

    const paths = Object.fromEntries(
      Object.entries(members).map(([family, name]) => [
        family,
        join(ROOT, "src", module, `${name}.ts`)
      ])
    );

    const present = Object.fromEntries(
      Object.entries(paths).map(([family, path]) => [family, existsSync(path)])
    );

    for (const language of LANGUAGES) {
      const t = TEMPLATES[language.code];

      const s = { ...data[language.code] };

      if (!s.note) {
        s.note = data.tag
          ? t.tagNote(data.tag)
          : t.duckNote(data.methods.map((m) => `\`${m}\``).join(", "));
      }

      const siblings = (self) =>
        Object.entries(members)
          .filter(([family, name]) => present[family] && name !== self)
          .map(([, name]) => ({ name }));

      if (present.is) {
        write(language.code, members.is, {
          summary: t.isSummary(s),
          description: [s.note, t.family],
          params: { value: t.valueParam },
          returns: t.isReturns(s),
          throws: {},
          examples: [
            {
              title: t.exampleTitle,
              body: fence([
                ...(data.prelude ?? []),
                ...data.yes.map((value) => `${members.is}(${value}); // => true`),
                ...data.no.map((value) => `${members.is}(${value}); // => false`)
              ])
            }
          ],
          seeAlso: siblings(members.is)
        });
      }

      if (present.non) {
        write(language.code, members.non, {
          summary: t.nonSummary(s),
          description: [t.negation(members.non), s.note, t.family],
          params: { value: t.valueParam },
          returns: t.nonReturns(s),
          throws: {},
          examples: [
            {
              title: t.exampleTitle,
              body: fence([
                ...(data.prelude ?? []),
                ...data.no.map((value) => `${members.non}(${value}); // => true`),
                ...data.yes.map((value) => `${members.non}(${value}); // => false`)
              ])
            }
          ],
          seeAlso: siblings(members.non)
        });
      }

      if (present.require) {
        const facts = requireFacts(paths.require);

        write(language.code, members.require, {
          summary: t.requireSummary(s),
          description: [s.note, t.family],
          params: {
            value: t.validateParam,
            message: t.messageParam(facts.fallback),
            strict: t.strictParam
          },
          returns: t.requireReturns(s),
          throws: { [facts.exception]: t.requireThrows(s) },
          examples: [
            {
              title: t.exampleTitle,
              body: fence([
                ...(data.prelude ?? []),
                ...data.yes
                  .slice(0, 2)
                  .map((value) => `${members.require}(${value}); // => ${value}`),
                ...data.no
                  .slice(0, 2)
                  .map((value) => `${members.require}(${value}); // throws ${facts.exception}`)
              ])
            }
          ],
          seeAlso: siblings(members.require)
        });
      }

      // Both guards reject null and undefined; they differ only in what they throw.
      const requireNonNames =
        subject === "Null" ? ["requireNonNil", "requireNonNull"] : [members.requireNon];

      const nilData = subject === "Null" ? SUBJECTS.Nil : data;

      for (const requireNonName of present.requireNon ? requireNonNames : []) {
        const facts = requireFacts(join(ROOT, "src", module, `${requireNonName}.ts`));

        const nilForms = subject === "Null" ? SUBJECTS.Nil[language.code] : s;

        write(language.code, requireNonName, {
          summary: t.requireNonSummary(nilForms),
          description: [nilForms.note, t.family],
          params: {
            value: t.validateParam,
            message: t.messageParam(facts.fallback),
            strict: t.strictParam
          },
          returns: t.requireNonReturns(nilForms),
          throws: { [facts.exception]: t.requireNonThrows(nilForms) },
          examples: [
            {
              title: t.exampleTitle,
              body: fence([
                ...(data.prelude ?? []),
                ...nilData.no
                  .slice(0, 2)
                  .map((value) => `${requireNonName}(${value}); // => ${value}`),
                ...nilData.yes
                  .slice(0, 2)
                  .map((value) => `${requireNonName}(${value}); // throws ${facts.exception}`)
              ])
            }
          ],
          seeAlso: siblings(requireNonName)
        });
      }
    }
  }
}

function write(code, name, content) {
  const dir = join(ROOT, "docs/content", code, "functions");

  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${name}.json`), `${JSON.stringify(content, null, 2)}\n`);
  written.push(`${code}/${name}`);
}

console.log(`${written.length} prose files written across ${LANGUAGES.length} languages`);

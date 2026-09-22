/**
 * Writes the prose files for the exception classes.
 *
 * Each class says one thing — the situation it reports — so the page around it
 * is written once per language and the class supplies that sentence, the guards
 * that throw it, and where it sits in the hierarchy.
 *
 * Usage: `node scripts/docs/author-exceptions.mjs`
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { LANGUAGES } from "./languages.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

/**
 * `extends` is read from the code by the page generator; this is the meaning.
 */
const CLASSES = {
  Exception: {
    thrownBy: [],
    en: "The base of the hierarchy, extending `Error`. Catch this to catch everything the library throws and nothing else.",
    ru: "Основание иерархии, наследник `Error`. Ловите его, чтобы поймать всё, что бросает библиотека, и ничего сверх того.",
    uk: "Основа ієрархії, нащадок `Error`. Ловіть його, щоб упіймати все, що кидає бібліотека, і нічого понад те.",
    de: "Die Wurzel der Hierarchie, abgeleitet von `Error`. Fangen Sie sie, um alles zu fangen, was die Bibliothek wirft — und sonst nichts.",
    fr: "La racine de la hiérarchie, dérivée d'`Error`. Interceptez-la pour attraper tout ce que lève la bibliothèque, et rien d'autre."
  },
  RuntimeException: {
    thrownBy: [],
    en: "The parent of every exception a running script can provoke. Nearly all the classes below extend it rather than `Exception` directly.",
    ru: "Родитель всех исключений, которые может вызвать работающий скрипт. Почти все классы ниже наследуют его, а не `Exception` напрямую.",
    uk: "Батько всіх винятків, які може спричинити робочий скрипт. Майже всі класи нижче успадковують його, а не `Exception` напряму.",
    de: "Die Oberklasse jeder Ausnahme, die ein laufendes Skript auslösen kann. Fast alle Klassen darunter erweitern sie statt `Exception` direkt.",
    fr: "Le parent de toute exception qu'un script en cours peut provoquer. Presque toutes les classes ci-dessous en dérivent plutôt que d'`Exception` directement."
  },
  IllegalArgumentException: {
    thrownBy: ["requireArray", "requireInteger", "requireNonEmpty"],
    en: "An argument was of the wrong kind or outside the range the function accepts. This is what most `requireX` guards throw.",
    ru: "Аргумент оказался не того рода или вне диапазона, который принимает функция. Именно его бросает большинство проверок `requireX`.",
    uk: "Аргумент виявився не того роду або поза діапазоном, який приймає функція. Саме його кидає більшість перевірок `requireX`.",
    de: "Ein Argument war von der falschen Art oder lag außerhalb des akzeptierten Bereichs. Das werfen die meisten `requireX`-Prüfungen.",
    fr: "Un argument est d'un type inadapté ou hors de l'intervalle accepté. C'est ce que lèvent la plupart des gardes `requireX`."
  },
  IllegalStateException: {
    thrownBy: ["requireState"],
    en: "The call arrived at the wrong moment: the arguments may be perfectly valid, but the object is not in a state that allows it.",
    ru: "Вызов пришёл не вовремя: аргументы могут быть совершенно правильными, но объект не в том состоянии, которое позволяет этот вызов.",
    uk: "Виклик надійшов невчасно: аргументи можуть бути цілком правильними, але об'єкт не в тому стані, який дозволяє цей виклик.",
    de: "Der Aufruf kam zum falschen Zeitpunkt: die Argumente mögen gültig sein, aber das Objekt ist nicht in einem Zustand, der ihn erlaubt.",
    fr: "L'appel est arrivé au mauvais moment : les arguments peuvent être valides, mais l'objet n'est pas dans un état qui le permet."
  },
  NullPointerException: {
    thrownBy: ["requireNonNull"],
    en: "`null` or `undefined` turned up where an object was required.",
    ru: "`null` или `undefined` оказались там, где требовался объект.",
    uk: "`null` або `undefined` опинилися там, де потрібен був об'єкт.",
    de: "`null` oder `undefined` tauchte dort auf, wo ein Objekt verlangt war.",
    fr: "`null` ou `undefined` s'est présenté là où un objet était requis."
  },
  InvalidStringException: {
    thrownBy: ["requireString"],
    en: "A string was expected and something else arrived.",
    ru: "Ожидалась строка, а пришло что-то другое.",
    uk: "Очікувався рядок, а надійшло щось інше.",
    de: "Eine Zeichenkette war erwartet, etwas anderes kam an.",
    fr: "Une chaîne était attendue et autre chose est arrivé."
  },
  EmptyStringException: {
    thrownBy: ["requireNonEmptyString"],
    en: "A string was expected to carry something and was `null`, `undefined` or empty.",
    ru: "От строки ожидалось содержимое, а она оказалась `null`, `undefined` или пустой.",
    uk: "Від рядка очікувався вміст, а він виявився `null`, `undefined` або порожнім.",
    de: "Von einer Zeichenkette war Inhalt erwartet, sie war `null`, `undefined` oder leer.",
    fr: "Une chaîne devait contenir quelque chose et s'est révélée `null`, `undefined` ou vide."
  },
  InvalidEmailFormatException: {
    thrownBy: ["requireValidEmail"],
    en: "A string was expected to be an email address and does not have the shape of one.",
    ru: "От строки ожидался адрес электронной почты, а её форма ему не соответствует.",
    uk: "Від рядка очікувалася адреса електронної пошти, а її форма їй не відповідає.",
    de: "Eine Zeichenkette sollte eine E-Mail-Adresse sein und hat nicht deren Form.",
    fr: "Une chaîne devait être une adresse e-mail et n'en a pas la forme."
  },
  AuthenticationException: {
    thrownBy: [],
    en: "Authentication failed: who the caller is could not be established.",
    ru: "Аутентификация не удалась: установить, кто вызывает, не получилось.",
    uk: "Автентифікація не вдалася: встановити, хто викликає, не вийшло.",
    de: "Die Authentifizierung schlug fehl: wer aufruft, ließ sich nicht feststellen.",
    fr: "L'authentification a échoué : impossible d'établir qui appelle."
  },
  AuthorizationException: {
    thrownBy: [],
    en: "The caller is known but is not allowed to do this. Distinct from `AuthenticationException`, which reports that the caller could not be identified at all.",
    ru: "Вызывающий известен, но делать это ему не разрешено. В отличие от `AuthenticationException`, который сообщает, что вызывающего вообще не удалось опознать.",
    uk: "Той, хто викликає, відомий, але робити це йому не дозволено. На відміну від `AuthenticationException`, який повідомляє, що того, хто викликає, взагалі не вдалося впізнати.",
    de: "Der Aufrufer ist bekannt, darf dies aber nicht. Anders als `AuthenticationException`, die meldet, dass der Aufrufer gar nicht bestimmt werden konnte.",
    fr: "L'appelant est connu mais n'y est pas autorisé. À distinguer d'`AuthenticationException`, qui signale que l'appelant n'a pas pu être identifié du tout."
  },
  ServiceIsNotDefinedException: {
    thrownBy: ["requireService"],
    en: "A service the script expected to be available is not: an advanced service left disabled, or a global that never got defined.",
    ru: "Сервис, на доступность которого рассчитывал скрипт, недоступен: расширенный сервис не включён или глобальная переменная так и не определена.",
    uk: "Сервіс, на доступність якого розраховував скрипт, недоступний: розширений сервіс не увімкнено або глобальну змінну так і не визначено.",
    de: "Ein Dienst, den das Skript erwartet hat, ist nicht da: ein nicht aktivierter erweiterter Dienst oder eine nie definierte globale Variable.",
    fr: "Un service que le script attendait n'est pas là : un service avancé non activé, ou une globale jamais définie."
  },
  RepositoryIsNotDefinedException: {
    thrownBy: ["requireRepository"],
    en: "A repository the script expected to be available is not.",
    ru: "Репозиторий, на доступность которого рассчитывал скрипт, недоступен.",
    uk: "Репозиторій, на доступність якого розраховував скрипт, недоступний.",
    de: "Ein Repository, das das Skript erwartet hat, ist nicht da.",
    fr: "Un dépôt que le script attendait n'est pas là."
  },
  AdminDirectoryException: {
    thrownBy: ["requireAdmin"],
    en: "The Admin SDK Directory service is not available or has not been enabled for the script.",
    ru: "Сервис Admin SDK Directory недоступен или не включён для скрипта.",
    uk: "Сервіс Admin SDK Directory недоступний або не увімкнений для скрипта.",
    de: "Der Admin-SDK-Directory-Dienst ist nicht verfügbar oder für das Skript nicht aktiviert.",
    fr: "Le service Admin SDK Directory n'est pas disponible ou n'a pas été activé pour le script."
  },
  InvalidSheetException: {
    thrownBy: ["requireSheet"],
    en: "A sheet was expected and the value is not one.",
    ru: "Ожидался лист, а значение им не является.",
    uk: "Очікувався аркуш, а значення ним не є.",
    de: "Ein Blatt war erwartet, der Wert ist keines.",
    fr: "Une feuille était attendue et la valeur n'en est pas une."
  },
  InvalidSpreadsheetException: {
    thrownBy: ["requireSpreadsheet"],
    en: "A spreadsheet was expected and the value is not one.",
    ru: "Ожидалась таблица, а значение ею не является.",
    uk: "Очікувалася таблиця, а значення нею не є.",
    de: "Eine Tabelle war erwartet, der Wert ist keine.",
    fr: "Un classeur était attendu et la valeur n'en est pas un."
  },
  InvalidRangeException: {
    thrownBy: ["requireRange"],
    en: "A range was expected and the value is not one.",
    ru: "Ожидался диапазон, а значение им не является.",
    uk: "Очікувався діапазон, а значення ним не є.",
    de: "Ein Bereich war erwartet, der Wert ist keiner.",
    fr: "Une plage était attendue et la valeur n'en est pas une."
  },
  InvalidGridRangeException: {
    thrownBy: [],
    en: "A `GridRange` was expected and the object is not a valid one — its bounds are missing, out of order or negative.",
    ru: "Ожидался `GridRange`, а объект им не является: границы отсутствуют, перепутаны местами или отрицательны.",
    uk: "Очікувався `GridRange`, а об'єкт ним не є: межі відсутні, переплутані місцями або від'ємні.",
    de: "Ein `GridRange` war erwartet, das Objekt ist kein gültiges — Grenzen fehlen, stehen verkehrt herum oder sind negativ.",
    fr: "Un `GridRange` était attendu et l'objet n'en est pas un valide : bornes absentes, inversées ou négatives."
  },
  InvalidPresentationException: {
    thrownBy: ["requirePresentation"],
    en: "A presentation was expected and the value is not one.",
    ru: "Ожидалась презентация, а значение ею не является.",
    uk: "Очікувалася презентація, а значення нею не є.",
    de: "Eine Präsentation war erwartet, der Wert ist keine.",
    fr: "Une présentation était attendue et la valeur n'en est pas une."
  },
  SlideNotFoundException: {
    thrownBy: ["requireSlide"],
    en: "A slide was expected and the value is not one, or the slide asked for does not exist in the presentation.",
    ru: "Ожидался слайд, а значение им не является, либо запрошенного слайда в презентации нет.",
    uk: "Очікувався слайд, а значення ним не є, або запитаного слайда в презентації немає.",
    de: "Eine Folie war erwartet, der Wert ist keine, oder die gesuchte Folie gibt es in der Präsentation nicht.",
    fr: "Une diapositive était attendue et la valeur n'en est pas une, ou la diapositive demandée n'existe pas dans la présentation."
  }
};

const TEMPLATES = {
  en: {
    summary: (meaning) => meaning,
    hierarchy:
      "Every class in this hierarchy takes an optional message, another exception whose message it reuses, or nothing at all. `isException` recognises all of them; a plain `Error` is not one.",
    thrownBy: (names) => `Thrown by ${names}.`,
    exampleTitle: "Throwing and catching"
  },
  ru: {
    summary: (meaning) => meaning,
    hierarchy:
      "Любой класс этой иерархии принимает необязательное сообщение, другое исключение, чьё сообщение будет переиспользовано, или вообще ничего. `isException` распознаёт их все; обычный `Error` к ним не относится.",
    thrownBy: (names) => `Бросается функциями ${names}.`,
    exampleTitle: "Бросить и поймать"
  },
  uk: {
    summary: (meaning) => meaning,
    hierarchy:
      "Будь-який клас цієї ієрархії приймає необов'язкове повідомлення, інший виняток, чиє повідомлення буде перевикористано, або взагалі нічого. `isException` розпізнає їх усі; звичайний `Error` до них не належить.",
    thrownBy: (names) => `Кидається функціями ${names}.`,
    exampleTitle: "Кинути й упіймати"
  },
  de: {
    summary: (meaning) => meaning,
    hierarchy:
      "Jede Klasse dieser Hierarchie nimmt eine optionale Meldung, eine andere Ausnahme, deren Meldung übernommen wird, oder gar nichts. `isException` erkennt sie alle; ein einfacher `Error` gehört nicht dazu.",
    thrownBy: (names) => `Wird geworfen von ${names}.`,
    exampleTitle: "Werfen und fangen"
  },
  fr: {
    summary: (meaning) => meaning,
    hierarchy:
      "Toute classe de cette hiérarchie accepte un message facultatif, une autre exception dont le message est repris, ou rien du tout. `isException` les reconnaît toutes ; un `Error` ordinaire n'en fait pas partie.",
    thrownBy: (names) => `Levée par ${names}.`,
    exampleTitle: "Lever et intercepter"
  }
};

let written = 0;

for (const [name, data] of Object.entries(CLASSES)) {
  for (const language of LANGUAGES) {
    const t = TEMPLATES[language.code];

    const meaning = data[language.code];

    const description = [meaning, t.hierarchy];

    if (data.thrownBy.length > 0) {
      description.splice(
        1,
        0,
        t.thrownBy(data.thrownBy.map((fn) => `[\`${fn}\`](${fn}.md)`).join(", "))
      );
    }

    const content = {
      summary: meaning.replace(/`/g, "").split(/(?<=\.)\s/)[0],
      description,
      params: {},
      returns: "",
      throws: {},
      examples: [
        {
          title: t.exampleTitle,
          body: [
            "```javascript",
            `throw new ${name}("something specific about this call");`,
            "",
            "try {",
            "  doWork();",
            "} catch (error) {",
            `  if (error instanceof ${name}) {`,
            "    // handled",
            "  }",
            "}",
            "```"
          ].join("\n")
        }
      ],
      seeAlso: [{ name: "isException" }, { name: "requireException" }]
    };

    const dir = join(ROOT, "docs/content", language.code, "functions");

    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, `${name}.json`), `${JSON.stringify(content, null, 2)}\n`);
    written += 1;
  }
}

console.log(`${written} exception prose files written across ${LANGUAGES.length} languages`);

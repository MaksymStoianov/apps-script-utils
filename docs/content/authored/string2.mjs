/** Prose for the remaining string helpers. */

const CASE_OPTION = {
  en: "`trim` trims the string and collapses runs of whitespace into single spaces.",
  ru: "`trim` обрезает строку и схлопывает подряд идущие пробелы в один.",
  uk: "`trim` обрізає рядок і схлопує поспіль розташовані пробіли в один.",
  de: "`trim` schneidet die Zeichenkette und fasst Folgen von Leerraum zu einem Leerzeichen zusammen.",
  fr: "`trim` coupe la chaîne et réduit les suites d'espaces à une seule."
};

const EMPTY_THROW = {
  en: { EmptyStringException: "the value is not a string, or is empty." },
  ru: { EmptyStringException: "значение не строка или строка пуста." },
  uk: { EmptyStringException: "значення не рядок або рядок порожній." },
  de: { EmptyStringException: "der Wert ist keine Zeichenkette oder ist leer." },
  fr: { EmptyStringException: "la valeur n'est pas une chaîne, ou elle est vide." }
};

const VALUE_PARAM = {
  en: "The string to convert. It must not be empty.",
  ru: "Строка для преобразования. Не должна быть пустой.",
  uk: "Рядок для перетворення. Не має бути порожнім.",
  de: "Die umzuwandelnde Zeichenkette. Sie darf nicht leer sein.",
  fr: "La chaîne à convertir. Elle ne doit pas être vide."
};

const TITLE = {
  en: "Converting",
  ru: "Преобразование",
  uk: "Перетворення",
  de: "Umwandeln",
  fr: "Conversion"
};

function caseFunction(summaries, descriptions, returns, body) {
  const entry = { examples: [{ body }] };

  for (const code of ["en", "ru", "uk", "de", "fr"]) {
    entry[code] = {
      summary: summaries[code],
      description: [descriptions[code]],
      params: { value: VALUE_PARAM[code], options: CASE_OPTION[code] },
      returns: returns[code],
      throws: EMPTY_THROW[code],
      titles: [TITLE[code]]
    };
  }

  return entry;
}

export const FUNCTIONS = {
  toProperCase: {
    seeAlso: ["toLowerCase", "toUpperCase", "toCamelCase"],
    ...caseFunction(
      {
        en: "Capitalises the first letter of every word and lowers the rest.",
        ru: "Делает первую букву каждого слова заглавной, а остальные строчными.",
        uk: "Робить першу літеру кожного слова великою, а решту малими.",
        de: "Schreibt den ersten Buchstaben jedes Wortes groß und den Rest klein.",
        fr: "Met la première lettre de chaque mot en majuscule et le reste en minuscules."
      },
      {
        en: 'Word boundaries are those of a regular expression, so `"hello WORLD"` becomes `"Hello World"`. Punctuation and separators are left exactly where they were.',
        ru: 'Границы слов — те, что видит регулярное выражение, поэтому `"hello WORLD"` становится `"Hello World"`. Пунктуация и разделители остаются на своих местах.',
        uk: 'Межі слів — ті, що бачить регулярний вираз, тому `"hello WORLD"` стає `"Hello World"`. Пунктуація та роздільники лишаються на місцях.',
        de: 'Wortgrenzen sind die eines regulären Ausdrucks, aus `"hello WORLD"` wird also `"Hello World"`. Zeichensetzung und Trenner bleiben unangetastet.',
        fr: 'Les frontières de mots sont celles d\'une expression régulière : `"hello WORLD"` devient `"Hello World"`. La ponctuation et les séparateurs restent en place.'
      },
      {
        en: "the converted string.",
        ru: "преобразованная строка.",
        uk: "перетворений рядок.",
        de: "die umgewandelte Zeichenkette.",
        fr: "la chaîne convertie."
      },
      ["```javascript", 'toProperCase("hello WORLD"); // => "Hello World"', "```"].join("\n")
    )
  },

  toLowerCase: {
    seeAlso: ["toUpperCase", "toProperCase"],
    ...caseFunction(
      {
        en: "Lowers a string, optionally tidying its whitespace.",
        ru: "Приводит строку к нижнему регистру, при желании прибирая пробелы.",
        uk: "Зводить рядок до нижнього регістру, за бажанням прибираючи пробіли.",
        de: "Schreibt eine Zeichenkette klein und räumt auf Wunsch den Leerraum auf.",
        fr: "Met une chaîne en minuscules, en nettoyant au besoin ses espaces."
      },
      {
        en: "The difference from `String#toLowerCase` is the validation and the optional `trim`: an empty or non-string input throws instead of producing something surprising further down.",
        ru: "Отличие от `String#toLowerCase` — проверка и необязательный `trim`: пустое или нестроковое значение приводит к исключению, а не к сюрпризу дальше по коду.",
        uk: "Відмінність від `String#toLowerCase` — перевірка та необов'язковий `trim`: порожнє або нерядкове значення призводить до винятку, а не до сюрпризу далі в коді.",
        de: "Der Unterschied zu `String#toLowerCase` sind die Prüfung und das optionale `trim`: ein leerer oder nicht-string Wert wirft, statt später zu überraschen.",
        fr: "La différence avec `String#toLowerCase` tient à la validation et au `trim` facultatif : une entrée vide ou non textuelle lève plutôt que de surprendre plus loin."
      },
      {
        en: "the lowered string.",
        ru: "строка в нижнем регистре.",
        uk: "рядок у нижньому регістрі.",
        de: "die klein geschriebene Zeichenkette.",
        fr: "la chaîne en minuscules."
      },
      [
        "```javascript",
        'toLowerCase("  Hello   World  ", { trim: true }); // => "hello world"',
        "```"
      ].join("\n")
    )
  },

  toUpperCase: {
    seeAlso: ["toLowerCase", "toProperCase"],
    ...caseFunction(
      {
        en: "Raises a string to upper case, optionally tidying its whitespace.",
        ru: "Приводит строку к верхнему регистру, при желании прибирая пробелы.",
        uk: "Зводить рядок до верхнього регістру, за бажанням прибираючи пробіли.",
        de: "Schreibt eine Zeichenkette groß und räumt auf Wunsch den Leerraum auf.",
        fr: "Met une chaîne en majuscules, en nettoyant au besoin ses espaces."
      },
      {
        en: "The counterpart of `toLowerCase`, with the same validation and the same optional `trim`.",
        ru: "Пара к `toLowerCase` с той же проверкой и тем же необязательным `trim`.",
        uk: "Пара до `toLowerCase` з тією самою перевіркою та тим самим необов'язковим `trim`.",
        de: "Das Gegenstück zu `toLowerCase`, mit derselben Prüfung und demselben optionalen `trim`.",
        fr: "Le pendant de `toLowerCase`, avec la même validation et le même `trim` facultatif."
      },
      {
        en: "the upper-cased string.",
        ru: "строка в верхнем регистре.",
        uk: "рядок у верхньому регістрі.",
        de: "die groß geschriebene Zeichenkette.",
        fr: "la chaîne en majuscules."
      },
      ["```javascript", 'toUpperCase("Hello"); // => "HELLO"', "```"].join("\n")
    )
  }
};

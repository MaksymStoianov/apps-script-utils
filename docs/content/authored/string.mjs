/** Prose for the string helpers. Example code is shared by every language. */

export const FUNCTIONS = {
  toCamelCase: {
    seeAlso: ["toKebabCase", "toSnakeCase", "toProperCase"],
    examples: [
      {
        body: [
          "```javascript",
          'toCamelCase("Hello world! How are you?"); // => "helloWorldHowAreYou"',
          'toCamelCase("Hello world!", { firstWordToLowerCase: false }); // => "HelloWorld"',
          'toCamelCase("user_first_name"); // => "userfirstname"',
          "```"
        ].join("\n")
      }
    ],
    en: {
      summary: "Joins the words of a string into camelCase.",
      description: [
        "Each word is capitalised, the separators between words are dropped, and the first letter is lowered unless `firstWordToLowerCase` is `false`. With `clean` left on, anything that is not a letter or a digit is removed as well.",
        'Word boundaries are the ones a regular expression sees, so spaces and hyphens separate words but an underscore does not: `"user_first_name"` comes back as `"userfirstname"`, not `"userFirstName"`.'
      ],
      params: {
        value: "The string to convert. It must not be empty.",
        options:
          "`clean` strips non-alphanumeric characters (on by default); `firstWordToLowerCase` lowers the first letter (on by default)."
      },
      returns: "the converted string.",
      throws: { EmptyStringException: "the value is not a string, or is empty." },
      titles: ["Converting"]
    },
    ru: {
      summary: "Склеивает слова строки в camelCase.",
      description: [
        "Каждое слово получает заглавную букву, разделители между словами отбрасываются, а первая буква становится строчной, если `firstWordToLowerCase` не выключен. При включённом `clean` удаляется и всё, что не буква и не цифра.",
        'Границы слов — те, что видит регулярное выражение, поэтому пробелы и дефисы разделяют слова, а подчёркивание нет: `"user_first_name"` возвращается как `"userfirstname"`, а не `"userFirstName"`.'
      ],
      params: {
        value: "Строка для преобразования. Не должна быть пустой.",
        options:
          "`clean` убирает все не буквенно-цифровые символы (по умолчанию включено); `firstWordToLowerCase` делает первую букву строчной (по умолчанию включено)."
      },
      returns: "преобразованная строка.",
      throws: { EmptyStringException: "значение не строка или строка пуста." },
      titles: ["Преобразование"]
    },
    uk: {
      summary: "Склеює слова рядка в camelCase.",
      description: [
        "Кожне слово отримує велику літеру, роздільники між словами відкидаються, а перша літера стає малою, якщо `firstWordToLowerCase` не вимкнено. За увімкненого `clean` видаляється й усе, що не літера і не цифра.",
        'Межі слів — ті, що бачить регулярний вираз, тому пробіли й дефіси розділяють слова, а підкреслення ні: `"user_first_name"` повертається як `"userfirstname"`, а не `"userFirstName"`.'
      ],
      params: {
        value: "Рядок для перетворення. Не має бути порожнім.",
        options:
          "`clean` прибирає всі не літерно-цифрові символи (типово увімкнено); `firstWordToLowerCase` робить першу літеру малою (типово увімкнено)."
      },
      returns: "перетворений рядок.",
      throws: { EmptyStringException: "значення не рядок або рядок порожній." },
      titles: ["Перетворення"]
    },
    de: {
      summary: "Fügt die Wörter einer Zeichenkette zu camelCase zusammen.",
      description: [
        "Jedes Wort wird groß geschrieben, die Trenner dazwischen fallen weg, und der erste Buchstabe wird klein, sofern `firstWordToLowerCase` nicht abgeschaltet ist. Bei eingeschaltetem `clean` verschwindet außerdem alles, was kein Buchstabe und keine Ziffer ist.",
        'Wortgrenzen sind die eines regulären Ausdrucks: Leerzeichen und Bindestriche trennen Wörter, ein Unterstrich nicht. `"user_first_name"` kommt als `"userfirstname"` zurück, nicht als `"userFirstName"`.'
      ],
      params: {
        value: "Die umzuwandelnde Zeichenkette. Sie darf nicht leer sein.",
        options:
          "`clean` entfernt alles außer Buchstaben und Ziffern (standardmäßig an); `firstWordToLowerCase` schreibt den ersten Buchstaben klein (standardmäßig an)."
      },
      returns: "die umgewandelte Zeichenkette.",
      throws: { EmptyStringException: "der Wert ist keine Zeichenkette oder ist leer." },
      titles: ["Umwandeln"]
    },
    fr: {
      summary: "Assemble les mots d'une chaîne en camelCase.",
      description: [
        "Chaque mot prend une majuscule, les séparateurs disparaissent, et la première lettre est mise en minuscule sauf si `firstWordToLowerCase` vaut `false`. Avec `clean` actif, tout ce qui n'est ni lettre ni chiffre est retiré également.",
        'Les frontières de mots sont celles d\'une expression régulière : espaces et tirets séparent les mots, un tiret bas non. `"user_first_name"` revient en `"userfirstname"`, pas en `"userFirstName"`.'
      ],
      params: {
        value: "La chaîne à convertir. Elle ne doit pas être vide.",
        options:
          "`clean` retire tout ce qui n'est pas alphanumérique (actif par défaut) ; `firstWordToLowerCase` met la première lettre en minuscule (actif par défaut)."
      },
      returns: "la chaîne convertie.",
      throws: { EmptyStringException: "la valeur n'est pas une chaîne, ou elle est vide." },
      titles: ["Conversion"]
    }
  },

  toKebabCase: {
    seeAlso: ["toSnakeCase", "toCamelCase", "isValidSlug"],
    examples: [
      {
        body: [
          "```javascript",
          'toKebabCase("Hello World"); // => "hello-world"',
          'toKebabCase("userFirstName"); // => "user-first-name"',
          "```"
        ].join("\n")
      }
    ],
    en: {
      summary: "Rewrites a string in kebab-case.",
      description: [
        'Spaces and underscores become hyphens, a hyphen is inserted where a lower-case letter meets an upper-case one, and the result is lowered. That second rule is what splits `"userFirstName"` into three words.',
        "`clean` removes anything that is not a letter, a digit or a hyphen; `trim` collapses the surrounding whitespace first."
      ],
      params: {
        value: "The string to convert. It must not be empty.",
        options: "`clean` removes the remaining punctuation; `trim` trims and collapses whitespace."
      },
      returns: "the converted string.",
      throws: { EmptyStringException: "the value is not a string, or is empty." },
      titles: ["Converting"]
    },
    ru: {
      summary: "Переписывает строку в kebab-case.",
      description: [
        'Пробелы и подчёркивания превращаются в дефисы, дефис вставляется на стыке строчной и заглавной букв, а результат приводится к нижнему регистру. Именно второе правило разбивает `"userFirstName"` на три слова.',
        "`clean` убирает всё, кроме букв, цифр и дефисов; `trim` сначала схлопывает окружающие пробелы."
      ],
      params: {
        value: "Строка для преобразования. Не должна быть пустой.",
        options: "`clean` убирает оставшуюся пунктуацию; `trim` обрезает и схлопывает пробелы."
      },
      returns: "преобразованная строка.",
      throws: { EmptyStringException: "значение не строка или строка пуста." },
      titles: ["Преобразование"]
    },
    uk: {
      summary: "Переписує рядок у kebab-case.",
      description: [
        'Пробіли та підкреслення стають дефісами, дефіс вставляється на стику малої та великої літер, а результат зводиться до нижнього регістру. Саме друге правило розбиває `"userFirstName"` на три слова.',
        "`clean` прибирає все, крім літер, цифр і дефісів; `trim` спершу схлопує навколишні пробіли."
      ],
      params: {
        value: "Рядок для перетворення. Не має бути порожнім.",
        options: "`clean` прибирає решту пунктуації; `trim` обрізає та схлопує пробіли."
      },
      returns: "перетворений рядок.",
      throws: { EmptyStringException: "значення не рядок або рядок порожній." },
      titles: ["Перетворення"]
    },
    de: {
      summary: "Schreibt eine Zeichenkette in kebab-case.",
      description: [
        'Leerzeichen und Unterstriche werden zu Bindestrichen, an der Grenze von Klein- zu Großbuchstabe kommt ein Bindestrich hinzu, und das Ergebnis wird klein geschrieben. Die zweite Regel zerlegt `"userFirstName"` in drei Wörter.',
        "`clean` entfernt alles außer Buchstaben, Ziffern und Bindestrichen; `trim` fasst zuvor den umgebenden Leerraum zusammen."
      ],
      params: {
        value: "Die umzuwandelnde Zeichenkette. Sie darf nicht leer sein.",
        options:
          "`clean` entfernt die restliche Zeichensetzung; `trim` schneidet Leerraum ab und fasst ihn zusammen."
      },
      returns: "die umgewandelte Zeichenkette.",
      throws: { EmptyStringException: "der Wert ist keine Zeichenkette oder ist leer." },
      titles: ["Umwandeln"]
    },
    fr: {
      summary: "Réécrit une chaîne en kebab-case.",
      description: [
        "Les espaces et les tirets bas deviennent des tirets, un tiret est inséré à la jonction d'une minuscule et d'une majuscule, et le résultat passe en minuscules. C'est cette seconde règle qui découpe `\"userFirstName\"` en trois mots.",
        "`clean` retire tout ce qui n'est ni lettre, ni chiffre, ni tiret ; `trim` réduit d'abord les espaces alentour."
      ],
      params: {
        value: "La chaîne à convertir. Elle ne doit pas être vide.",
        options: "`clean` retire la ponctuation restante ; `trim` supprime et réduit les espaces."
      },
      returns: "la chaîne convertie.",
      throws: { EmptyStringException: "la valeur n'est pas une chaîne, ou elle est vide." },
      titles: ["Conversion"]
    }
  },

  toSnakeCase: {
    seeAlso: ["toKebabCase", "toCamelCase"],
    examples: [
      {
        body: [
          "```javascript",
          'toSnakeCase("Hello World"); // => "hello_world"',
          'toSnakeCase("userFirstName"); // => "user_first_name"',
          "```"
        ].join("\n")
      }
    ],
    en: {
      summary: "Rewrites a string in snake_case.",
      description: [
        "The kebab-case rules with underscores in place of hyphens: spaces and hyphens become underscores, an underscore is inserted where a lower-case letter meets an upper-case one, and the result is lowered.",
        "`clean` removes anything that is not a letter, a digit or an underscore; `trim` collapses the surrounding whitespace first."
      ],
      params: {
        value: "The string to convert. It must not be empty.",
        options: "`clean` removes the remaining punctuation; `trim` trims and collapses whitespace."
      },
      returns: "the converted string.",
      throws: { EmptyStringException: "the value is not a string, or is empty." },
      titles: ["Converting"]
    },
    ru: {
      summary: "Переписывает строку в snake_case.",
      description: [
        "Те же правила, что у kebab-case, но с подчёркиваниями вместо дефисов: пробелы и дефисы становятся подчёркиваниями, подчёркивание вставляется на стыке строчной и заглавной букв, результат приводится к нижнему регистру.",
        "`clean` убирает всё, кроме букв, цифр и подчёркиваний; `trim` сначала схлопывает окружающие пробелы."
      ],
      params: {
        value: "Строка для преобразования. Не должна быть пустой.",
        options: "`clean` убирает оставшуюся пунктуацию; `trim` обрезает и схлопывает пробелы."
      },
      returns: "преобразованная строка.",
      throws: { EmptyStringException: "значение не строка или строка пуста." },
      titles: ["Преобразование"]
    },
    uk: {
      summary: "Переписує рядок у snake_case.",
      description: [
        "Ті самі правила, що в kebab-case, але з підкресленнями замість дефісів: пробіли й дефіси стають підкресленнями, підкреслення вставляється на стику малої та великої літер, результат зводиться до нижнього регістру.",
        "`clean` прибирає все, крім літер, цифр і підкреслень; `trim` спершу схлопує навколишні пробіли."
      ],
      params: {
        value: "Рядок для перетворення. Не має бути порожнім.",
        options: "`clean` прибирає решту пунктуації; `trim` обрізає та схлопує пробіли."
      },
      returns: "перетворений рядок.",
      throws: { EmptyStringException: "значення не рядок або рядок порожній." },
      titles: ["Перетворення"]
    },
    de: {
      summary: "Schreibt eine Zeichenkette in snake_case.",
      description: [
        "Dieselben Regeln wie bei kebab-case, nur mit Unterstrichen statt Bindestrichen: Leerzeichen und Bindestriche werden zu Unterstrichen, an der Grenze von Klein- zu Großbuchstabe kommt ein Unterstrich hinzu, das Ergebnis wird klein geschrieben.",
        "`clean` entfernt alles außer Buchstaben, Ziffern und Unterstrichen; `trim` fasst zuvor den umgebenden Leerraum zusammen."
      ],
      params: {
        value: "Die umzuwandelnde Zeichenkette. Sie darf nicht leer sein.",
        options:
          "`clean` entfernt die restliche Zeichensetzung; `trim` schneidet Leerraum ab und fasst ihn zusammen."
      },
      returns: "die umgewandelte Zeichenkette.",
      throws: { EmptyStringException: "der Wert ist keine Zeichenkette oder ist leer." },
      titles: ["Umwandeln"]
    },
    fr: {
      summary: "Réécrit une chaîne en snake_case.",
      description: [
        "Les règles du kebab-case avec des tirets bas à la place des tirets : espaces et tirets deviennent des tirets bas, un tiret bas est inséré à la jonction d'une minuscule et d'une majuscule, et le résultat passe en minuscules.",
        "`clean` retire tout ce qui n'est ni lettre, ni chiffre, ni tiret bas ; `trim` réduit d'abord les espaces alentour."
      ],
      params: {
        value: "La chaîne à convertir. Elle ne doit pas être vide.",
        options: "`clean` retire la ponctuation restante ; `trim` supprime et réduit les espaces."
      },
      returns: "la chaîne convertie.",
      throws: { EmptyStringException: "la valeur n'est pas une chaîne, ou elle est vide." },
      titles: ["Conversion"]
    }
  }
};

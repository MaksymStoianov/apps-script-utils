/** Prose for the remaining string helpers: escaping, templating and versions. */

const L = ["en", "ru", "uk", "de", "fr"];

/** Assembles one entry from a table keyed by field, then by language. */
export function entry({
  examples,
  seeAlso,
  summary,
  description,
  params = {},
  returns,
  throws = {},
  title
}) {
  const result = { examples, seeAlso };

  for (const code of L) {
    result[code] = {
      summary: summary[code],
      description: description[code],
      params: Object.fromEntries(Object.entries(params).map(([name, text]) => [name, text[code]])),
      returns: returns[code],
      throws: Object.fromEntries(Object.entries(throws).map(([name, text]) => [name, text[code]])),
      titles: [title[code]]
    };
  }

  return result;
}

export const FUNCTIONS = {
  escapeRegExp: entry({
    seeAlso: ["merge"],
    examples: [
      {
        body: [
          "```javascript",
          'escapeRegExp("a.b*c"); // => "a\\\\.b\\\\*c"',
          "",
          'new RegExp(escapeRegExp("1.5")).test("1x5"); // => false',
          "```"
        ].join("\n")
      }
    ],
    summary: {
      en: "Escapes the characters that carry meaning inside a regular expression.",
      ru: "Экранирует символы, которые имеют особое значение в регулярном выражении.",
      uk: "Екранує символи, що мають особливе значення в регулярному виразі.",
      de: "Maskiert die Zeichen, die in einem regulären Ausdruck eine Bedeutung tragen.",
      fr: "Échappe les caractères qui ont un sens dans une expression régulière."
    },
    description: {
      en: [
        "Put user input through this before building a `RegExp` from it, and a dot stays a dot instead of matching any character."
      ],
      ru: [
        "Пропустите через неё пользовательский ввод перед сборкой `RegExp`, и точка останется точкой, а не превратится в «любой символ»."
      ],
      uk: [
        "Пропустіть через неї користувацький ввід перед складанням `RegExp`, і крапка лишиться крапкою, а не перетвориться на «будь-який символ»."
      ],
      de: [
        "Schicken Sie Benutzereingaben hier hindurch, bevor Sie daraus ein `RegExp` bauen: ein Punkt bleibt dann ein Punkt und passt nicht auf jedes Zeichen."
      ],
      fr: [
        "Faites passer une saisie utilisateur par ici avant d'en construire un `RegExp` : un point reste un point au lieu de correspondre à n'importe quel caractère."
      ]
    },
    params: {
      value: {
        en: "The string to escape. It must not be empty.",
        ru: "Строка для экранирования. Не должна быть пустой.",
        uk: "Рядок для екранування. Не має бути порожнім.",
        de: "Die zu maskierende Zeichenkette. Sie darf nicht leer sein.",
        fr: "La chaîne à échapper. Elle ne doit pas être vide."
      }
    },
    returns: {
      en: "the escaped string, safe to drop into a pattern.",
      ru: "экранированная строка, которую можно безопасно подставить в шаблон.",
      uk: "екранований рядок, який можна безпечно підставити в шаблон.",
      de: "die maskierte Zeichenkette, die sich gefahrlos in ein Muster einsetzen lässt.",
      fr: "la chaîne échappée, qu'on peut insérer sans risque dans un motif."
    },
    throws: {
      EmptyStringException: {
        en: "the value is not a string, or is empty.",
        ru: "значение не строка или строка пуста.",
        uk: "значення не рядок або рядок порожній.",
        de: "der Wert ist keine Zeichenkette oder ist leer.",
        fr: "la valeur n'est pas une chaîne, ou elle est vide."
      }
    },
    title: {
      en: "Escaping",
      ru: "Экранирование",
      uk: "Екранування",
      de: "Maskieren",
      fr: "Échappement"
    }
  }),

  merge: entry({
    seeAlso: ["escapeHtml", "getPath"],
    examples: [
      {
        body: [
          "```javascript",
          'merge("Hi {{ name }}!", { name: "Ada" }); // => "Hi Ada!"',
          'merge("Hi {{ name }}!", {}); // => "Hi {{ name }}!"',
          'merge("Hi {{ name }}!", {}, { onMissing: "empty" }); // => "Hi !"',
          "```"
        ].join("\n")
      }
    ],
    summary: {
      en: "Fills the `{{ key }}` placeholders of a template from an object.",
      ru: "Подставляет значения объекта в плейсхолдеры `{{ key }}` шаблона.",
      uk: "Підставляє значення об'єкта в плейсхолдери `{{ key }}` шаблону.",
      de: "Füllt die `{{ key }}`-Platzhalter einer Vorlage aus einem Objekt.",
      fr: "Remplit les emplacements `{{ key }}` d'un gabarit depuis un objet."
    },
    description: {
      en: [
        'Whitespace inside the braces is ignored, so `{{name}}` and `{{ name }}` are the same placeholder. A key that the object does not carry is left as it stands, which makes a missing value visible rather than silently blank; `onMissing: "empty"` removes it instead.',
        "`escape` takes a function applied to every substituted value — pass `escapeHtml` when the result goes into a page."
      ],
      ru: [
        'Пробелы внутри скобок игнорируются, поэтому `{{name}}` и `{{ name }}` — один и тот же плейсхолдер. Ключ, которого нет в объекте, остаётся как есть: пропуск виден, а не превращается в молчаливую пустоту; `onMissing: "empty"` убирает его.',
        "`escape` принимает функцию, применяемую к каждому подставляемому значению, — передайте `escapeHtml`, если результат попадёт на страницу."
      ],
      uk: [
        'Пробіли всередині дужок ігноруються, тому `{{name}}` і `{{ name }}` — той самий плейсхолдер. Ключ, якого немає в об\'єкті, лишається як є: пропуск видно, а не перетворюється на мовчазну порожнечу; `onMissing: "empty"` прибирає його.',
        "`escape` приймає функцію, застосовувану до кожного підставленого значення, — передайте `escapeHtml`, якщо результат потрапить на сторінку."
      ],
      de: [
        'Leerraum in den Klammern wird ignoriert, `{{name}}` und `{{ name }}` sind derselbe Platzhalter. Ein Schlüssel, den das Objekt nicht hat, bleibt stehen — die Lücke ist damit sichtbar statt still leer; `onMissing: "empty"` entfernt ihn stattdessen.',
        "`escape` nimmt eine Funktion, die auf jeden eingesetzten Wert angewendet wird — übergeben Sie `escapeHtml`, wenn das Ergebnis in eine Seite geht."
      ],
      fr: [
        'Les espaces dans les accolades sont ignorés : `{{name}}` et `{{ name }}` désignent le même emplacement. Une clé absente de l\'objet est laissée telle quelle, ce qui rend le manque visible plutôt que silencieusement vide ; `onMissing: "empty"` la supprime.',
        "`escape` prend une fonction appliquée à chaque valeur insérée — passez `escapeHtml` si le résultat part dans une page."
      ]
    },
    params: {
      template: {
        en: "The template string with `{{ key }}` placeholders.",
        ru: "Строка шаблона с плейсхолдерами `{{ key }}`.",
        uk: "Рядок шаблону з плейсхолдерами `{{ key }}`.",
        de: "Die Vorlage mit `{{ key }}`-Platzhaltern.",
        fr: "Le gabarit contenant des emplacements `{{ key }}`."
      },
      data: {
        en: "The object the values come from.",
        ru: "Объект, из которого берутся значения.",
        uk: "Об'єкт, з якого беруться значення.",
        de: "Das Objekt, aus dem die Werte stammen.",
        fr: "L'objet d'où proviennent les valeurs."
      },
      options: {
        en: '`onMissing` is `"keep"` or `"empty"`; `escape` is a function applied to each value.',
        ru: '`onMissing` — `"keep"` или `"empty"`; `escape` — функция, применяемая к каждому значению.',
        uk: '`onMissing` — `"keep"` або `"empty"`; `escape` — функція, застосовувана до кожного значення.',
        de: '`onMissing` ist `"keep"` oder `"empty"`; `escape` ist eine auf jeden Wert angewendete Funktion.',
        fr: '`onMissing` vaut `"keep"` ou `"empty"` ; `escape` est une fonction appliquée à chaque valeur.'
      }
    },
    returns: {
      en: "the template with its placeholders filled.",
      ru: "шаблон с заполненными плейсхолдерами.",
      uk: "шаблон із заповненими плейсхолдерами.",
      de: "die Vorlage mit gefüllten Platzhaltern.",
      fr: "le gabarit, emplacements remplis."
    },
    throws: {
      IllegalArgumentException: {
        en: "the template is not a string, or the data is not an object.",
        ru: "шаблон не строка или данные не объект.",
        uk: "шаблон не рядок або дані не об'єкт.",
        de: "die Vorlage ist keine Zeichenkette oder die Daten sind kein Objekt.",
        fr: "le gabarit n'est pas une chaîne, ou les données ne sont pas un objet."
      }
    },
    title: {
      en: "Filling a template",
      ru: "Заполнение шаблона",
      uk: "Заповнення шаблону",
      de: "Eine Vorlage füllen",
      fr: "Remplir un gabarit"
    }
  }),

  versionCompare: entry({
    seeAlso: ["isVersionCompatible", "isValidVersion"],
    examples: [
      {
        body: [
          "```javascript",
          'versionCompare("1.2.0", "1.10.0"); // => -1',
          'versionCompare("2.0", "2"); // => 0',
          'versionCompare("1.2.3", "1.2.3-beta"); // throws TypeError',
          "```"
        ].join("\n")
      }
    ],
    summary: {
      en: "Compares two version strings numerically.",
      ru: "Сравнивает две строки версий по числам.",
      uk: "Порівнює два рядки версій за числами.",
      de: "Vergleicht zwei Versionsangaben numerisch.",
      fr: "Compare deux chaînes de version numériquement."
    },
    description: {
      en: [
        'Each dot-separated group is compared as a number, so `1.10` is above `1.2` — which a string comparison gets backwards. A missing group counts as zero, which makes `"2"` and `"2.0"` equal.',
        "Both arguments must satisfy `isValidVersion`: digits and dots only, no pre-release suffix."
      ],
      ru: [
        'Каждая группа между точками сравнивается как число, поэтому `1.10` больше `1.2` — сравнение строк дало бы обратное. Отсутствующая группа считается нулём, поэтому `"2"` и `"2.0"` равны.',
        "Оба аргумента должны удовлетворять `isValidVersion`: только цифры и точки, без суффикса предрелиза."
      ],
      uk: [
        'Кожна група між крапками порівнюється як число, тому `1.10` більша за `1.2` — порівняння рядків дало б протилежне. Відсутня група вважається нулем, тому `"2"` і `"2.0"` рівні.',
        "Обидва аргументи мають задовольняти `isValidVersion`: лише цифри та крапки, без суфікса передрелізу."
      ],
      de: [
        'Jede durch Punkte getrennte Gruppe wird als Zahl verglichen, `1.10` steht also über `1.2` — ein Zeichenkettenvergleich sähe es umgekehrt. Eine fehlende Gruppe zählt als null, womit `"2"` und `"2.0"` gleich sind.',
        "Beide Argumente müssen `isValidVersion` erfüllen: nur Ziffern und Punkte, kein Vorabversions-Suffix."
      ],
      fr: [
        'Chaque groupe séparé par des points est comparé comme un nombre : `1.10` est donc supérieur à `1.2`, là où une comparaison de chaînes conclurait l\'inverse. Un groupe absent compte pour zéro, ce qui rend `"2"` et `"2.0"` égaux.',
        "Les deux arguments doivent satisfaire `isValidVersion` : chiffres et points uniquement, sans suffixe de préversion."
      ]
    },
    params: {
      version1: {
        en: "The first version.",
        ru: "Первая версия.",
        uk: "Перша версія.",
        de: "Die erste Version.",
        fr: "La première version."
      },
      version2: {
        en: "The second version.",
        ru: "Вторая версия.",
        uk: "Друга версія.",
        de: "Die zweite Version.",
        fr: "La seconde version."
      }
    },
    returns: {
      en: "`-1` when the first is lower, `0` when they are equal, `1` when the first is higher.",
      ru: "`-1`, если первая меньше, `0`, если равны, `1`, если первая больше.",
      uk: "`-1`, якщо перша менша, `0`, якщо рівні, `1`, якщо перша більша.",
      de: "`-1`, wenn die erste kleiner ist, `0` bei Gleichheit, `1`, wenn die erste größer ist.",
      fr: "`-1` si la première est inférieure, `0` si elles sont égales, `1` si la première est supérieure."
    },
    throws: {
      TypeError: {
        en: "either argument is not a valid version string.",
        ru: "любой из аргументов не является корректной строкой версии.",
        uk: "будь-який з аргументів не є коректним рядком версії.",
        de: "eines der Argumente ist keine gültige Versionsangabe.",
        fr: "l'un des arguments n'est pas une chaîne de version valide."
      }
    },
    title: {
      en: "Comparing",
      ru: "Сравнение",
      uk: "Порівняння",
      de: "Vergleichen",
      fr: "Comparaison"
    }
  })
};

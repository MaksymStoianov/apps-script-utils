/** Prose for the A1-notation and column-letter helpers. */

import { code, entry } from "./_entry.mjs";

const INDEX_NOTE = {
  en: "Indices count from zero, the way a `GridRange` does; positions count from one, the way `getRange(row, column)` does. Mixing the two is the usual source of an off-by-one in a spreadsheet script, which is why both pairs exist under separate names.",
  ru: "Индексы считаются от нуля, как в `GridRange`; позиции — от единицы, как в `getRange(row, column)`. Их смешение и есть обычная причина ошибки на единицу в скриптах для таблиц — поэтому обе пары существуют под разными именами.",
  uk: "Індекси рахуються від нуля, як у `GridRange`; позиції — від одиниці, як у `getRange(row, column)`. Їхнє змішування і є звичайною причиною помилки на одиницю в скриптах для таблиць — тому обидві пари існують під різними іменами.",
  de: "Indizes zählen ab null, wie ein `GridRange`; Positionen ab eins, wie `getRange(row, column)`. Beides zu verwechseln ist die übliche Quelle eines Off-by-one in Tabellenskripten — darum gibt es beide Paare unter getrennten Namen.",
  fr: "Les indices comptent à partir de zéro, comme un `GridRange` ; les positions à partir de un, comme `getRange(row, column)`. Les confondre est la source habituelle d'un décalage d'une unité dans un script de feuille de calcul, d'où l'existence des deux paires sous des noms distincts."
};

const COLUMN_TITLE = {
  en: "Converting",
  ru: "Преобразование",
  uk: "Перетворення",
  de: "Umwandeln",
  fr: "Conversion"
};

export const FUNCTIONS = {
  getColumnLetterByIndex: entry({
    seeAlso: ["getColumnIndexByLetter", "getColumnLetterByPosition"],
    examples: code(
      ['getColumnLetterByIndex(0); // => "A"', 'getColumnLetterByIndex(26); // => "AA"'].join("\n")
    ),
    summary: {
      en: "Converts a zero-based column index into its letter.",
      ru: "Преобразует индекс столбца, считая от нуля, в его букву.",
      uk: "Перетворює індекс стовпця, рахуючи від нуля, на його літеру.",
      de: "Wandelt einen nullbasierten Spaltenindex in seinen Buchstaben um.",
      fr: "Convertit un indice de colonne à base zéro en sa lettre."
    },
    description: {
      en: [INDEX_NOTE.en],
      ru: [INDEX_NOTE.ru],
      uk: [INDEX_NOTE.uk],
      de: [INDEX_NOTE.de],
      fr: [INDEX_NOTE.fr]
    },
    params: {
      index: {
        en: "The zero-based column index. `0` is column A.",
        ru: "Индекс столбца от нуля. `0` — столбец A.",
        uk: "Індекс стовпця від нуля. `0` — стовпець A.",
        de: "Der nullbasierte Spaltenindex. `0` ist Spalte A.",
        fr: "L'indice de colonne à base zéro. `0` est la colonne A."
      }
    },
    returns: {
      en: "the column letter.",
      ru: "буква столбца.",
      uk: "літера стовпця.",
      de: "den Spaltenbuchstaben.",
      fr: "la lettre de la colonne."
    },
    title: COLUMN_TITLE
  }),

  getColumnIndexByLetter: entry({
    seeAlso: ["getColumnLetterByIndex", "getColumnPositionByLetter"],
    examples: code(
      ['getColumnIndexByLetter("A"); // => 0', 'getColumnIndexByLetter("B"); // => 1'].join("\n")
    ),
    summary: {
      en: "Converts a column letter into its zero-based index.",
      ru: "Преобразует букву столбца в его индекс, считая от нуля.",
      uk: "Перетворює літеру стовпця на його індекс, рахуючи від нуля.",
      de: "Wandelt einen Spaltenbuchstaben in seinen nullbasierten Index um.",
      fr: "Convertit une lettre de colonne en son indice à base zéro."
    },
    description: {
      en: [INDEX_NOTE.en],
      ru: [INDEX_NOTE.ru],
      uk: [INDEX_NOTE.uk],
      de: [INDEX_NOTE.de],
      fr: [INDEX_NOTE.fr]
    },
    params: {
      letter: {
        en: "The column letter, in either case.",
        ru: "Буква столбца в любом регистре.",
        uk: "Літера стовпця в будь-якому регістрі.",
        de: "Der Spaltenbuchstabe, in beliebiger Schreibweise.",
        fr: "La lettre de colonne, dans n'importe quelle casse."
      }
    },
    returns: {
      en: "the zero-based index.",
      ru: "индекс, считая от нуля.",
      uk: "індекс, рахуючи від нуля.",
      de: "den nullbasierten Index.",
      fr: "l'indice à base zéro."
    },
    title: COLUMN_TITLE
  }),

  getColumnLetterByPosition: entry({
    seeAlso: ["getColumnPositionByLetter", "getColumnLetterByIndex"],
    examples: code(
      ['getColumnLetterByPosition(1); // => "A"', 'getColumnLetterByPosition(27); // => "AA"'].join(
        "\n"
      )
    ),
    summary: {
      en: "Converts a one-based column position into its letter.",
      ru: "Преобразует позицию столбца, считая от единицы, в его букву.",
      uk: "Перетворює позицію стовпця, рахуючи від одиниці, на його літеру.",
      de: "Wandelt eine einsbasierte Spaltenposition in ihren Buchstaben um.",
      fr: "Convertit une position de colonne à base un en sa lettre."
    },
    description: {
      en: [INDEX_NOTE.en],
      ru: [INDEX_NOTE.ru],
      uk: [INDEX_NOTE.uk],
      de: [INDEX_NOTE.de],
      fr: [INDEX_NOTE.fr]
    },
    params: {
      position: {
        en: "The one-based column position, as `getRange` takes it.",
        ru: "Позиция столбца от единицы, как её принимает `getRange`.",
        uk: "Позиція стовпця від одиниці, як її приймає `getRange`.",
        de: "Die einsbasierte Spaltenposition, wie `getRange` sie nimmt.",
        fr: "La position de colonne à base un, telle que `getRange` l'attend."
      }
    },
    returns: {
      en: "the column letter.",
      ru: "буква столбца.",
      uk: "літера стовпця.",
      de: "den Spaltenbuchstaben.",
      fr: "la lettre de la colonne."
    },
    title: COLUMN_TITLE
  }),

  getColumnPositionByLetter: entry({
    seeAlso: ["getColumnLetterByPosition", "getColumnIndexByLetter"],
    examples: code(
      ['getColumnPositionByLetter("A"); // => 1', 'getColumnPositionByLetter("AA"); // => 27'].join(
        "\n"
      )
    ),
    summary: {
      en: "Converts a column letter into its one-based position.",
      ru: "Преобразует букву столбца в его позицию, считая от единицы.",
      uk: "Перетворює літеру стовпця на його позицію, рахуючи від одиниці.",
      de: "Wandelt einen Spaltenbuchstaben in seine einsbasierte Position um.",
      fr: "Convertit une lettre de colonne en sa position à base un."
    },
    description: {
      en: [INDEX_NOTE.en],
      ru: [INDEX_NOTE.ru],
      uk: [INDEX_NOTE.uk],
      de: [INDEX_NOTE.de],
      fr: [INDEX_NOTE.fr]
    },
    params: {
      letter: {
        en: "The column letter, in either case.",
        ru: "Буква столбца в любом регистре.",
        uk: "Літера стовпця в будь-якому регістрі.",
        de: "Der Spaltenbuchstabe, in beliebiger Schreibweise.",
        fr: "La lettre de colonne, dans n'importe quelle casse."
      }
    },
    returns: {
      en: "the one-based position.",
      ru: "позиция, считая от единицы.",
      uk: "позиція, рахуючи від одиниці.",
      de: "die einsbasierte Position.",
      fr: "la position à base un."
    },
    title: COLUMN_TITLE
  }),

  toA1Notation: entry({
    seeAlso: ["parseA1Notation", "getColumnLetterByIndex"],
    examples: code(
      [
        'toA1Notation({ startRowIndex: 0, endRowIndex: 2, startColumnIndex: 0, endColumnIndex: 2 }); // => "A1:B2"',
        'toA1Notation({ startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 1 }); // => "A1"'
      ].join("\n")
    ),
    summary: {
      en: "Writes a grid range as A1 notation.",
      ru: "Записывает диапазон `GridRange` в нотации A1.",
      uk: "Записує діапазон `GridRange` у нотації A1.",
      de: "Schreibt einen Rasterbereich in A1-Notation.",
      fr: "Écrit une plage de grille en notation A1."
    },
    description: {
      en: [
        'The bounds are read the way the Sheets API means them: the start indices are inclusive, the end indices are not. A range one row and one column wide is written as a single cell, `"A1"`, rather than `"A1:A1"`.',
        "An index left out means the range is open in that direction, which comes back as A1 notation without that bound — a whole column or a whole row."
      ],
      ru: [
        'Границы читаются так, как их понимает Sheets API: начальные индексы включаются, конечные — нет. Диапазон шириной в одну строку и один столбец записывается как одна ячейка `"A1"`, а не `"A1:A1"`.',
        "Пропущенный индекс означает, что диапазон открыт в эту сторону, и в нотации A1 соответствующая граница отсутствует — целый столбец или целая строка."
      ],
      uk: [
        'Межі читаються так, як їх розуміє Sheets API: початкові індекси включаються, кінцеві — ні. Діапазон завширшки в один рядок і один стовпець записується як одна комірка `"A1"`, а не `"A1:A1"`.',
        "Пропущений індекс означає, що діапазон відкритий у цей бік, і в нотації A1 відповідна межа відсутня — цілий стовпець або цілий рядок."
      ],
      de: [
        'Die Grenzen werden gelesen, wie die Sheets-API sie meint: die Startindizes gehören dazu, die Endindizes nicht. Ein Bereich von einer Zeile und einer Spalte wird als einzelne Zelle `"A1"` geschrieben, nicht als `"A1:A1"`.',
        "Ein weggelassener Index bedeutet, dass der Bereich in diese Richtung offen ist; in A1-Notation fehlt dann die entsprechende Grenze — eine ganze Spalte oder eine ganze Zeile."
      ],
      fr: [
        "Les bornes sont lues comme l'entend l'API Sheets : les indices de début sont inclus, ceux de fin ne le sont pas. Une plage d'une ligne et d'une colonne s'écrit comme une cellule unique, `\"A1\"`, et non `\"A1:A1\"`.",
        "Un indice omis signifie que la plage est ouverte de ce côté, ce qui donne une notation A1 sans cette borne — une colonne entière ou une ligne entière."
      ]
    },
    params: {
      range: {
        en: "The grid range to write.",
        ru: "Диапазон, который нужно записать.",
        uk: "Діапазон, який потрібно записати.",
        de: "Der zu schreibende Rasterbereich.",
        fr: "La plage de grille à écrire."
      }
    },
    returns: {
      en: "the A1 notation.",
      ru: "нотация A1.",
      uk: "нотація A1.",
      de: "die A1-Notation.",
      fr: "la notation A1."
    },
    title: {
      en: "Writing A1 notation",
      ru: "Запись нотации A1",
      uk: "Запис нотації A1",
      de: "A1-Notation schreiben",
      fr: "Écrire la notation A1"
    }
  }),

  parseA1Notation: entry({
    seeAlso: ["parseA1Notations", "toA1Notation", "extractRangeFromA1Notation"],
    examples: code(
      [
        'parseA1Notation("Sheet1!A1:B2");',
        '// => { sheetName: "Sheet1", a1Notation: "A1:B2",',
        "//      startRowIndex: 0, endRowIndex: 2, startColumnIndex: 0, endColumnIndex: 2 }",
        "",
        'parseA1Notation("A1").sheetName; // => null'
      ].join("\n")
    ),
    summary: {
      en: "Reads A1 notation into a grid range.",
      ru: "Разбирает нотацию A1 в диапазон `GridRange`.",
      uk: "Розбирає нотацію A1 у діапазон `GridRange`.",
      de: "Liest A1-Notation in einen Rasterbereich.",
      fr: "Lit une notation A1 en plage de grille."
    },
    description: {
      en: [
        "The result carries the sheet name when the notation had one and `null` when it did not, the range part on its own, and the four zero-based bounds the Sheets API works in.",
        'Open notations are understood: `"A:A"` is a whole column and leaves the row bounds out, `"1:1"` a whole row.'
      ],
      ru: [
        "В результате есть имя листа, если оно было в нотации, и `null`, если не было, отдельно часть с диапазоном и четыре границы от нуля, в которых работает Sheets API.",
        'Открытые нотации понимаются: `"A:A"` — целый столбец, границы строк отсутствуют, `"1:1"` — целая строка.'
      ],
      uk: [
        "У результаті є ім'я аркуша, якщо воно було в нотації, і `null`, якщо не було, окремо частина з діапазоном і чотири межі від нуля, в яких працює Sheets API.",
        'Відкриті нотації розуміються: `"A:A"` — цілий стовпець, межі рядків відсутні, `"1:1"` — цілий рядок.'
      ],
      de: [
        "Das Ergebnis trägt den Blattnamen, wenn die Notation einen hatte, sonst `null`, den Bereichsteil für sich und die vier nullbasierten Grenzen, in denen die Sheets-API rechnet.",
        'Offene Notationen werden verstanden: `"A:A"` ist eine ganze Spalte und lässt die Zeilengrenzen weg, `"1:1"` eine ganze Zeile.'
      ],
      fr: [
        "Le résultat porte le nom de feuille lorsque la notation en avait un, `null` sinon, la partie plage à part, et les quatre bornes à base zéro dans lesquelles travaille l'API Sheets.",
        'Les notations ouvertes sont comprises : `"A:A"` est une colonne entière et laisse de côté les bornes de lignes, `"1:1"` une ligne entière.'
      ]
    },
    params: {
      a1Notation: {
        en: "The notation to read, with or without a sheet name.",
        ru: "Нотация для разбора, с именем листа или без.",
        uk: "Нотація для розбору, з іменем аркуша чи без.",
        de: "Die zu lesende Notation, mit oder ohne Blattnamen.",
        fr: "La notation à lire, avec ou sans nom de feuille."
      }
    },
    returns: {
      en: "the parsed range.",
      ru: "разобранный диапазон.",
      uk: "розібраний діапазон.",
      de: "den gelesenen Bereich.",
      fr: "la plage analysée."
    },
    title: {
      en: "Reading A1 notation",
      ru: "Разбор нотации A1",
      uk: "Розбір нотації A1",
      de: "A1-Notation lesen",
      fr: "Lire la notation A1"
    }
  }),

  parseA1Notations: entry({
    seeAlso: ["parseA1Notation"],
    examples: code('parseA1Notations("A1:B2, C3").length; // => 2'),
    summary: {
      en: "Reads a comma-separated list of A1 notations.",
      ru: "Разбирает список нотаций A1, перечисленных через запятую.",
      uk: "Розбирає список нотацій A1, перелічених через кому.",
      de: "Liest eine durch Kommas getrennte Liste von A1-Notationen.",
      fr: "Lit une liste de notations A1 séparées par des virgules."
    },
    description: {
      en: [
        "Each entry is read exactly as `parseA1Notation` reads one, so a list may mix sheet-qualified and bare notations. Whitespace around the commas is ignored."
      ],
      ru: [
        "Каждая запись разбирается ровно так же, как её разбирает `parseA1Notation`, поэтому в списке могут соседствовать нотации с именем листа и без. Пробелы вокруг запятых игнорируются."
      ],
      uk: [
        "Кожен запис розбирається так само, як його розбирає `parseA1Notation`, тому в списку можуть сусідити нотації з іменем аркуша й без. Пробіли навколо ком ігноруються."
      ],
      de: [
        "Jeder Eintrag wird genau so gelesen, wie `parseA1Notation` einen liest; eine Liste darf blattqualifizierte und blanke Notationen mischen. Leerraum um die Kommas wird ignoriert."
      ],
      fr: [
        "Chaque entrée est lue exactement comme `parseA1Notation` en lit une : une liste peut donc mêler notations qualifiées par une feuille et notations nues. Les espaces autour des virgules sont ignorés."
      ]
    },
    params: {
      a1Notations: {
        en: "The notations, separated by commas.",
        ru: "Нотации, разделённые запятыми.",
        uk: "Нотації, розділені комами.",
        de: "Die Notationen, durch Kommas getrennt.",
        fr: "Les notations, séparées par des virgules."
      }
    },
    returns: {
      en: "one parsed range per entry.",
      ru: "по одному разобранному диапазону на запись.",
      uk: "по одному розібраному діапазону на запис.",
      de: "einen gelesenen Bereich je Eintrag.",
      fr: "une plage analysée par entrée."
    },
    title: {
      en: "Reading a list",
      ru: "Разбор списка",
      uk: "Розбір списку",
      de: "Eine Liste lesen",
      fr: "Lire une liste"
    }
  }),

  extractSheetNameFromA1Notation: entry({
    seeAlso: ["extractRangeFromA1Notation", "updateSheetNameInA1Notation", "parseA1Notation"],
    examples: code('extractSheetNameFromA1Notation("Sheet1!A1:B2"); // => "Sheet1"'),
    summary: {
      en: "Takes the sheet name out of an A1 notation.",
      ru: "Извлекает имя листа из нотации A1.",
      uk: "Видобуває ім'я аркуша з нотації A1.",
      de: "Holt den Blattnamen aus einer A1-Notation.",
      fr: "Extrait le nom de feuille d'une notation A1."
    },
    description: {
      en: [
        "The quoting Sheets uses for names with spaces or punctuation is undone, so `\"'My Sheet'!A1\"` yields `My Sheet`. A notation without a sheet name yields nothing."
      ],
      ru: [
        "Кавычки, которыми Таблицы обрамляют имена с пробелами или пунктуацией, снимаются, поэтому `\"'My Sheet'!A1\"` даёт `My Sheet`. Нотация без имени листа не даёт ничего."
      ],
      uk: [
        "Лапки, якими Таблиці обрамляють імена з пробілами чи пунктуацією, знімаються, тому `\"'My Sheet'!A1\"` дає `My Sheet`. Нотація без імені аркуша не дає нічого."
      ],
      de: [
        "Die Anführungszeichen, die Sheets um Namen mit Leerzeichen oder Zeichensetzung legt, werden entfernt: `\"'My Sheet'!A1\"` ergibt `My Sheet`. Eine Notation ohne Blattnamen ergibt nichts."
      ],
      fr: [
        "Les guillemets que Sheets place autour des noms contenant espaces ou ponctuation sont retirés : `\"'My Sheet'!A1\"` donne `My Sheet`. Une notation sans nom de feuille ne donne rien."
      ]
    },
    params: {
      a1Notation: {
        en: "The notation to read.",
        ru: "Нотация для разбора.",
        uk: "Нотація для розбору.",
        de: "Die zu lesende Notation.",
        fr: "La notation à lire."
      }
    },
    returns: {
      en: "the sheet name, when the notation carries one.",
      ru: "имя листа, если оно есть в нотации.",
      uk: "ім'я аркуша, якщо воно є в нотації.",
      de: "den Blattnamen, sofern die Notation einen trägt.",
      fr: "le nom de feuille, lorsque la notation en porte un."
    },
    title: {
      en: "Extracting",
      ru: "Извлечение",
      uk: "Видобування",
      de: "Herauslösen",
      fr: "Extraction"
    }
  }),

  extractRangeFromA1Notation: entry({
    seeAlso: ["extractSheetNameFromA1Notation", "parseA1Notation"],
    examples: code('extractRangeFromA1Notation("Sheet1!A1:B2"); // => "A1:B2"'),
    summary: {
      en: "Takes the range part out of an A1 notation.",
      ru: "Извлекает часть с диапазоном из нотации A1.",
      uk: "Видобуває частину з діапазоном із нотації A1.",
      de: "Holt den Bereichsteil aus einer A1-Notation.",
      fr: "Extrait la partie plage d'une notation A1."
    },
    description: {
      en: [
        "Everything after the `!` — and the whole string when there is no `!` at all, since a bare notation is already only a range."
      ],
      ru: [
        "Всё, что идёт после `!`, — и вся строка, если `!` вообще нет, потому что голая нотация и так состоит из одного диапазона."
      ],
      uk: [
        "Усе, що йде після `!`, — і весь рядок, якщо `!` взагалі немає, бо гола нотація і так складається з одного діапазону."
      ],
      de: [
        "Alles nach dem `!` — und die ganze Zeichenkette, wenn es gar kein `!` gibt, denn eine blanke Notation besteht ohnehin nur aus einem Bereich."
      ],
      fr: [
        "Tout ce qui suit le `!` — et la chaîne entière lorsqu'il n'y a pas de `!`, puisqu'une notation nue n'est déjà qu'une plage."
      ]
    },
    params: {
      a1Notation: {
        en: "The notation to read.",
        ru: "Нотация для разбора.",
        uk: "Нотація для розбору.",
        de: "Die zu lesende Notation.",
        fr: "La notation à lire."
      }
    },
    returns: {
      en: "the range part.",
      ru: "часть с диапазоном.",
      uk: "частина з діапазоном.",
      de: "den Bereichsteil.",
      fr: "la partie plage."
    },
    title: {
      en: "Extracting",
      ru: "Извлечение",
      uk: "Видобування",
      de: "Herauslösen",
      fr: "Extraction"
    }
  }),

  updateSheetNameInA1Notation: entry({
    seeAlso: ["extractSheetNameFromA1Notation", "isValidSheetName"],
    examples: code('updateSheetNameInA1Notation("Sheet1!A1", "Data"); // => "Data!A1"'),
    summary: {
      en: "Replaces the sheet name in an A1 notation, keeping the range.",
      ru: "Заменяет имя листа в нотации A1, сохраняя диапазон.",
      uk: "Замінює ім'я аркуша в нотації A1, зберігаючи діапазон.",
      de: "Ersetzt den Blattnamen in einer A1-Notation und behält den Bereich.",
      fr: "Remplace le nom de feuille dans une notation A1 en conservant la plage."
    },
    description: {
      en: [
        "What a formula rewrite needs after a sheet is renamed or copied. A name that needs quoting is quoted; a notation that had no sheet name gets one."
      ],
      ru: [
        "То, что нужно при переписывании формул после переименования или копирования листа. Имя, требующее кавычек, получает их; нотация без имени листа его приобретает."
      ],
      uk: [
        "Те, що потрібно при переписуванні формул після перейменування чи копіювання аркуша. Ім'я, що потребує лапок, їх отримує; нотація без імені аркуша його набуває."
      ],
      de: [
        "Was ein Umschreiben von Formeln braucht, nachdem ein Blatt umbenannt oder kopiert wurde. Ein Name, der Anführungszeichen braucht, bekommt sie; eine Notation ohne Blattnamen erhält einen."
      ],
      fr: [
        "Ce dont a besoin une réécriture de formules après le renommage ou la copie d'une feuille. Un nom qui demande des guillemets en reçoit ; une notation sans nom de feuille en obtient un."
      ]
    },
    params: {
      a1Notation: {
        en: "The notation to rewrite.",
        ru: "Нотация, которую нужно переписать.",
        uk: "Нотація, яку потрібно переписати.",
        de: "Die umzuschreibende Notation.",
        fr: "La notation à réécrire."
      },
      sheetName: {
        en: "The sheet name to put in.",
        ru: "Имя листа, которое нужно подставить.",
        uk: "Ім'я аркуша, яке потрібно підставити.",
        de: "Der einzusetzende Blattname.",
        fr: "Le nom de feuille à insérer."
      }
    },
    returns: {
      en: "the rewritten notation.",
      ru: "переписанная нотация.",
      uk: "переписана нотація.",
      de: "die umgeschriebene Notation.",
      fr: "la notation réécrite."
    },
    title: {
      en: "Renaming",
      ru: "Переименование",
      uk: "Перейменування",
      de: "Umbenennen",
      fr: "Renommage"
    }
  }),

  doGridRangesIntersect: entry({
    seeAlso: ["isGridRangeContainedIn", "isCellGridRange"],
    examples: code(
      [
        "const left = { startRowIndex: 0, endRowIndex: 2, startColumnIndex: 0, endColumnIndex: 2 };",
        "const right = { startRowIndex: 1, endRowIndex: 3, startColumnIndex: 1, endColumnIndex: 3 };",
        "",
        "doGridRangesIntersect(left, right); // => true"
      ].join("\n")
    ),
    summary: {
      en: "Reports whether two grid ranges overlap in any cell.",
      ru: "Сообщает, пересекаются ли два диапазона хотя бы в одной ячейке.",
      uk: "Повідомляє, чи перетинаються два діапазони хоч в одній комірці.",
      de: "Meldet, ob zwei Rasterbereiche sich in einer Zelle überschneiden.",
      fr: "Indique si deux plages de grille se recouvrent sur au moins une cellule."
    },
    description: {
      en: [
        "Ranges that merely touch along an edge do not intersect: the end bounds are exclusive, so `A1:B2` and `C1:D2` are neighbours, not overlaps. A bound left out means the range is open in that direction and so overlaps anything on that axis."
      ],
      ru: [
        "Диапазоны, соприкасающиеся краями, не пересекаются: конечные границы не включаются, поэтому `A1:B2` и `C1:D2` — соседи, а не пересечение. Пропущенная граница означает, что диапазон открыт в эту сторону и потому перекрывает что угодно по этой оси."
      ],
      uk: [
        "Діапазони, що стикаються краями, не перетинаються: кінцеві межі не включаються, тому `A1:B2` і `C1:D2` — сусіди, а не перетин. Пропущена межа означає, що діапазон відкритий у цей бік і тому перекриває будь-що за цією віссю."
      ],
      de: [
        "Bereiche, die sich nur an einer Kante berühren, überschneiden sich nicht: die Endgrenzen gehören nicht dazu, `A1:B2` und `C1:D2` sind also Nachbarn, keine Überschneidung. Eine weggelassene Grenze heißt, der Bereich ist in diese Richtung offen und überschneidet auf dieser Achse alles."
      ],
      fr: [
        "Des plages qui se touchent par un bord ne se recouvrent pas : les bornes de fin sont exclues, donc `A1:B2` et `C1:D2` sont voisines, pas superposées. Une borne omise signifie que la plage est ouverte de ce côté et recouvre donc tout sur cet axe."
      ]
    },
    params: {
      range1: {
        en: "The first range.",
        ru: "Первый диапазон.",
        uk: "Перший діапазон.",
        de: "Der erste Bereich.",
        fr: "La première plage."
      },
      range2: {
        en: "The second range.",
        ru: "Второй диапазон.",
        uk: "Другий діапазон.",
        de: "Der zweite Bereich.",
        fr: "La seconde plage."
      }
    },
    returns: {
      en: "`true` when at least one cell belongs to both.",
      ru: "`true`, если хотя бы одна ячейка принадлежит обоим.",
      uk: "`true`, якщо хоча б одна комірка належить обом.",
      de: "`true`, wenn mindestens eine Zelle zu beiden gehört.",
      fr: "`true` si au moins une cellule appartient aux deux."
    },
    title: {
      en: "Checking an overlap",
      ru: "Проверка пересечения",
      uk: "Перевірка перетину",
      de: "Eine Überschneidung prüfen",
      fr: "Vérifier un recouvrement"
    }
  })
};

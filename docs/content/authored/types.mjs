/** Prose for the types, interfaces and classes the package exports. */

import { code, entry } from "./_entry.mjs";

const SHAPE = { en: "Shape", ru: "Форма", uk: "Форма", de: "Form", fr: "Forme" };

function type({ seeAlso, examples, summary, paragraph, title = SHAPE }) {
  const description = {};

  for (const language of ["en", "ru", "uk", "de", "fr"]) {
    description[language] = paragraph[language];
  }

  return entry({
    seeAlso,
    examples,
    summary,
    description,
    params: {},
    returns: { en: "", ru: "", uk: "", de: "", fr: "" },
    throws: {},
    title
  });
}

export const FUNCTIONS = {
  GridRange: type({
    seeAlso: ["toA1Notation", "parseA1Notation", "isCellGridRange"],
    examples: code(
      [
        "// A1:B2 on the first sheet.",
        "const range = {",
        "  sheetId: 0,",
        "  startRowIndex: 0,",
        "  endRowIndex: 2,",
        "  startColumnIndex: 0,",
        "  endColumnIndex: 2",
        "};"
      ].join("\n")
    ),
    summary: {
      en: "A block of cells, described the way the Sheets API describes one.",
      ru: "Блок ячеек, описанный так, как его описывает Sheets API.",
      uk: "Блок комірок, описаний так, як його описує Sheets API.",
      de: "Ein Zellblock, beschrieben wie ihn die Sheets-API beschreibt.",
      fr: "Un bloc de cellules, décrit comme le fait l'API Sheets."
    },
    paragraph: {
      en: [
        "Four bounds and, optionally, the sheet: `startRowIndex`, `endRowIndex`, `startColumnIndex`, `endColumnIndex`, plus `sheetId` or `sheetName`. Indices count from zero, the start bounds are inclusive and the end bounds are not — so a single cell spans one index, not zero.",
        "A bound left out means the range is open in that direction: no row bounds is a whole column, no column bounds a whole row, none at all the whole sheet. `toA1Notation` and `parseA1Notation` convert between this shape and the notation a person reads."
      ],
      ru: [
        "Четыре границы и, необязательно, лист: `startRowIndex`, `endRowIndex`, `startColumnIndex`, `endColumnIndex` плюс `sheetId` или `sheetName`. Индексы считаются от нуля, начальные границы включаются, конечные — нет, поэтому одна ячейка занимает единицу, а не ноль.",
        "Пропущенная граница означает, что диапазон открыт в эту сторону: без границ строк — целый столбец, без границ столбцов — целая строка, без всех — весь лист. `toA1Notation` и `parseA1Notation` переводят между этой формой и нотацией, которую читает человек."
      ],
      uk: [
        "Чотири межі та, необов'язково, аркуш: `startRowIndex`, `endRowIndex`, `startColumnIndex`, `endColumnIndex` плюс `sheetId` або `sheetName`. Індекси рахуються від нуля, початкові межі включаються, кінцеві — ні, тому одна комірка займає одиницю, а не нуль.",
        "Пропущена межа означає, що діапазон відкритий у цей бік: без меж рядків — цілий стовпець, без меж стовпців — цілий рядок, без усіх — увесь аркуш. `toA1Notation` і `parseA1Notation` перекладають між цією формою та нотацією, яку читає людина."
      ],
      de: [
        "Vier Grenzen und, optional, das Blatt: `startRowIndex`, `endRowIndex`, `startColumnIndex`, `endColumnIndex` sowie `sheetId` oder `sheetName`. Indizes zählen ab null, die Startgrenzen gehören dazu, die Endgrenzen nicht — eine einzelne Zelle umfasst also eins, nicht null.",
        "Eine weggelassene Grenze heißt, der Bereich ist in diese Richtung offen: ohne Zeilengrenzen eine ganze Spalte, ohne Spaltengrenzen eine ganze Zeile, ohne alle das ganze Blatt. `toA1Notation` und `parseA1Notation` übersetzen zwischen dieser Form und der Notation, die ein Mensch liest."
      ],
      fr: [
        "Quatre bornes et, facultativement, la feuille : `startRowIndex`, `endRowIndex`, `startColumnIndex`, `endColumnIndex`, plus `sheetId` ou `sheetName`. Les indices comptent à partir de zéro, les bornes de début sont incluses et celles de fin ne le sont pas — une cellule unique couvre donc un indice, pas zéro.",
        "Une borne omise signifie que la plage est ouverte de ce côté : sans bornes de lignes, une colonne entière ; sans bornes de colonnes, une ligne entière ; sans aucune, toute la feuille. `toA1Notation` et `parseA1Notation` traduisent entre cette forme et la notation que lit une personne."
      ]
    }
  }),

  SheetSchema: type({
    seeAlso: ["getSchema", "insertSchema", "SheetColumnSchema"],
    examples: code(
      [
        "const schema = {",
        "  version: 1,",
        "  headerRow: 1,",
        "  columns: [",
        '    { name: "id", type: "number" },',
        '    { name: "email", type: "string" }',
        "  ]",
        "};"
      ].join("\n")
    ),
    summary: {
      en: "What a sheet's columns are called and what they hold.",
      ru: "Как называются столбцы листа и что в них лежит.",
      uk: "Як називаються стовпці аркуша і що в них лежить.",
      de: "Wie die Spalten eines Blattes heißen und was sie enthalten.",
      fr: "Comment s'appellent les colonnes d'une feuille et ce qu'elles contiennent."
    },
    paragraph: {
      en: [
        "`version` marks the format so a later one can be recognised rather than misread, `headerRow` says which row holds the names, and `columns` describes them left to right.",
        "`getSchema` sets `inferred: true` when nothing was stored and the description was read off the sheet's own contents — a guess, not a declaration."
      ],
      ru: [
        "`version` помечает формат, чтобы более позднюю версию можно было распознать, а не прочитать неверно; `headerRow` указывает строку с именами; `columns` описывает столбцы слева направо.",
        "`getSchema` ставит `inferred: true`, если ничего не было сохранено и описание прочитано из самого содержимого листа, — это догадка, а не объявление."
      ],
      uk: [
        "`version` позначає формат, щоб пізнішу версію можна було розпізнати, а не прочитати хибно; `headerRow` вказує рядок з іменами; `columns` описує стовпці зліва направо.",
        "`getSchema` ставить `inferred: true`, якщо нічого не було збережено й опис прочитано з самого вмісту аркуша, — це здогад, а не оголошення."
      ],
      de: [
        "`version` kennzeichnet das Format, damit ein späteres erkannt und nicht missverstanden wird, `headerRow` nennt die Zeile mit den Namen, und `columns` beschreibt sie von links nach rechts.",
        "`getSchema` setzt `inferred: true`, wenn nichts hinterlegt war und die Beschreibung aus dem Inhalt des Blattes gelesen wurde — eine Vermutung, keine Festlegung."
      ],
      fr: [
        "`version` marque le format pour qu'une version ultérieure soit reconnue plutôt que mal lue, `headerRow` indique la ligne portant les noms, et `columns` les décrit de gauche à droite.",
        "`getSchema` pose `inferred: true` lorsque rien n'était stocké et que la description a été lue sur le contenu même de la feuille — une supposition, pas une déclaration."
      ]
    }
  }),

  SheetColumnSchema: type({
    seeAlso: ["SheetSchema", "SheetColumnType", "insertSchema"],
    examples: code('const column = { name: "created", type: "date" };'),
    summary: {
      en: "One column of a sheet's schema.",
      ru: "Один столбец схемы листа.",
      uk: "Один стовпець схеми аркуша.",
      de: "Eine Spalte des Schemas eines Blattes.",
      fr: "Une colonne du schéma d'une feuille."
    },
    paragraph: {
      en: [
        "`name` is the heading written into the header row; `type` says what the column holds and is what `insertSchema` turns into formatting and data validation. A column with no type is left unconstrained."
      ],
      ru: [
        "`name` — заголовок, который пишется в строку заголовков; `type` говорит, что в столбце лежит, и именно из него `insertSchema` делает форматирование и проверку данных. Столбец без типа остаётся без ограничений."
      ],
      uk: [
        "`name` — заголовок, який пишеться в рядок заголовків; `type` каже, що в стовпці лежить, і саме з нього `insertSchema` робить форматування та перевірку даних. Стовпець без типу лишається без обмежень."
      ],
      de: [
        "`name` ist die Überschrift, die in die Kopfzeile geschrieben wird; `type` sagt, was die Spalte enthält, und daraus macht `insertSchema` Formatierung und Datenprüfung. Eine Spalte ohne Typ bleibt unbeschränkt."
      ],
      fr: [
        "`name` est l'intitulé écrit dans la ligne d'en-tête ; `type` dit ce que contient la colonne et c'est de lui qu'`insertSchema` tire le format et la validation. Une colonne sans type reste sans contrainte."
      ]
    }
  }),

  SheetColumnType: type({
    seeAlso: ["SheetColumnSchema", "SheetSchema"],
    examples: code('const type = "date";'),
    summary: {
      en: "What a schema column may hold.",
      ru: "Что может лежать в столбце схемы.",
      uk: "Що може лежати в стовпці схеми.",
      de: "Was eine Schemaspalte enthalten darf.",
      fr: "Ce que peut contenir une colonne de schéma."
    },
    paragraph: {
      en: [
        'One of `"string"`, `"number"`, `"boolean"` or `"date"`. The four map onto what a spreadsheet cell can actually store, which is why the list is short: a cell holds text, a number, a checkbox or a date, and everything else is one of those in disguise.'
      ],
      ru: [
        'Одно из `"string"`, `"number"`, `"boolean"` или `"date"`. Эти четыре соответствуют тому, что ячейка таблицы действительно умеет хранить, — потому список и короткий: текст, число, флажок или дата, а всё остальное есть одно из них в другой одежде.'
      ],
      uk: [
        'Одне з `"string"`, `"number"`, `"boolean"` або `"date"`. Ці чотири відповідають тому, що комірка таблиці справді вміє зберігати, — тому список і короткий: текст, число, прапорець або дата, а все інше є одним із них в іншому одязі.'
      ],
      de: [
        'Eines von `"string"`, `"number"`, `"boolean"` oder `"date"`. Die vier bilden ab, was eine Tabellenzelle wirklich speichern kann — daher die kurze Liste: Text, Zahl, Kontrollkästchen oder Datum, alles andere ist eines davon in anderer Gestalt.'
      ],
      fr: [
        'L\'une de `"string"`, `"number"`, `"boolean"` ou `"date"`. Ces quatre correspondent à ce qu\'une cellule peut réellement stocker, d\'où la brièveté de la liste : du texte, un nombre, une case à cocher ou une date, et tout le reste est l\'un d\'eux déguisé.'
      ]
    }
  }),

  Row: type({
    seeAlso: ["getValues", "RowPredicate"],
    examples: code(
      [
        "// What a filter receives when `headerRow` is set.",
        "const row = {",
        '  values: ["7", "ada@example.com"],',
        "  position: 2,",
        '  record: { id: "7", email: "ada@example.com" }',
        "};"
      ].join("\n")
    ),
    summary: {
      en: "One row, as `getValues` hands it to a filter or a mapper.",
      ru: "Одна строка в том виде, в каком `getValues` передаёт её фильтру или преобразователю.",
      uk: "Один рядок у тому вигляді, в якому `getValues` передає його фільтру чи перетворювачу.",
      de: "Eine Zeile, wie `getValues` sie einem Filter oder Mapper übergibt.",
      fr: "Une ligne, telle que `getValues` la remet à un filtre ou à un mappeur."
    },
    paragraph: {
      en: [
        "`values` is the cells left to right, `position` the one-based row on the sheet — the number a person sees in the margin — and the row keyed by column names when a header row was named.",
        "Having the position in hand is what lets a filter report or act on a specific row afterwards."
      ],
      ru: [
        "`values` — ячейки слева направо, `position` — номер строки на листе, считая от единицы, тот самый, что человек видит на полях, а также строка с ключами по именам столбцов, если строка заголовков была указана.",
        "Наличие позиции и позволяет фильтру потом сослаться на конкретную строку или что-то с ней сделать."
      ],
      uk: [
        "`values` — комірки зліва направо, `position` — номер рядка на аркуші, рахуючи від одиниці, той самий, що людина бачить на полях, а також рядок із ключами за іменами стовпців, якщо рядок заголовків було вказано.",
        "Наявність позиції й дозволяє фільтру потім послатися на конкретний рядок або щось із ним зробити."
      ],
      de: [
        "`values` sind die Zellen von links nach rechts, `position` die einsbasierte Zeile auf dem Blatt — die Nummer, die ein Mensch am Rand sieht — und dazu die Zeile mit den Spaltennamen als Schlüsseln, wenn eine Kopfzeile benannt wurde.",
        "Die Position zur Hand zu haben ist das, was einem Filter erlaubt, hinterher auf eine bestimmte Zeile zu zeigen oder an ihr zu wirken."
      ],
      fr: [
        "`values` ce sont les cellules de gauche à droite, `position` la ligne à base un sur la feuille — le numéro que l'on voit dans la marge — et la ligne indexée par les noms de colonnes lorsqu'une ligne d'en-tête a été désignée.",
        "Disposer de la position est ce qui permet ensuite à un filtre de désigner une ligne précise ou d'agir sur elle."
      ]
    }
  }),

  GetValuesConfig: type({
    seeAlso: ["getValues", "Row"],
    examples: code(
      [
        "const config = {",
        "  headerRow: 1,",
        '  filter: (row) => row.record.status === "active",',
        "  limit: 100",
        "};"
      ].join("\n")
    ),
    summary: {
      en: "How `getValues` reads a sheet.",
      ru: "Как `getValues` читает лист.",
      uk: "Як `getValues` читає аркуш.",
      de: "Wie `getValues` ein Blatt liest.",
      fr: "Comment `getValues` lit une feuille."
    },
    paragraph: {
      en: [
        "`headerRow` names the row of column names and keys every row by them. `display` reads the values as a person sees them rather than as they are stored. `filter` keeps rows, `offset` and `limit` page what is kept, and `mapper` decides what each one becomes.",
        "The order is fixed: filter, then offset, then limit, then mapper — so a limit counts matching rows, not rows read."
      ],
      ru: [
        "`headerRow` указывает строку с именами столбцов и снабжает этими ключами каждую строку. `display` читает значения так, как их видит человек, а не так, как они хранятся. `filter` оставляет строки, `offset` и `limit` разбивают оставшееся на страницы, `mapper` решает, во что превращается каждая.",
        "Порядок фиксирован: сначала фильтр, потом смещение, потом ограничение, потом преобразование, — поэтому лимит считает подходящие строки, а не прочитанные."
      ],
      uk: [
        "`headerRow` вказує рядок з іменами стовпців і дає ці ключі кожному рядку. `display` читає значення так, як їх бачить людина, а не так, як вони зберігаються. `filter` лишає рядки, `offset` і `limit` розбивають решту на сторінки, `mapper` вирішує, на що перетворюється кожен.",
        "Порядок фіксований: спершу фільтр, потім зсув, потім обмеження, потім перетворення, — тому ліміт рахує відповідні рядки, а не прочитані."
      ],
      de: [
        "`headerRow` benennt die Zeile der Spaltennamen und versieht jede Zeile mit diesen Schlüsseln. `display` liest die Werte so, wie ein Mensch sie sieht, statt wie sie gespeichert sind. `filter` behält Zeilen, `offset` und `limit` blättern durch das Behaltene, `mapper` bestimmt, was daraus wird.",
        "Die Reihenfolge steht fest: erst filtern, dann überspringen, dann begrenzen, dann abbilden — ein Limit zählt also passende Zeilen, nicht gelesene."
      ],
      fr: [
        "`headerRow` désigne la ligne des noms de colonnes et indexe chaque ligne par eux. `display` lit les valeurs telles qu'une personne les voit plutôt que telles qu'elles sont stockées. `filter` retient des lignes, `offset` et `limit` paginent ce qui reste, `mapper` décide de ce que devient chacune.",
        "L'ordre est fixe : filtre, puis décalage, puis limite, puis transformation — une limite compte donc les lignes retenues, pas les lignes lues."
      ]
    }
  }),

  RowPredicate: type({
    seeAlso: ["clearRowsByConditional", "deleteRowsByConditional", "RowConditionalOptions"],
    examples: code('const predicate = (values, position, record) => record?.status === "done";'),
    summary: {
      en: "Decides whether a row is one to act on.",
      ru: "Решает, относится ли строка к тем, с которыми нужно что-то сделать.",
      uk: "Вирішує, чи належить рядок до тих, з якими треба щось зробити.",
      de: "Entscheidet, ob eine Zeile eine ist, auf die gewirkt wird.",
      fr: "Décide si une ligne fait partie de celles à traiter."
    },
    paragraph: {
      en: [
        "It receives the row's cells, its one-based position and — when a header row was named — the row keyed by the column names, which is `null` otherwise. Returning `true` selects the row."
      ],
      ru: [
        "Получает ячейки строки, её позицию от единицы и — если указана строка заголовков — строку с ключами по именам столбцов, иначе `null`. Возврат `true` выбирает строку."
      ],
      uk: [
        "Отримує комірки рядка, його позицію від одиниці та — якщо вказано рядок заголовків — рядок із ключами за іменами стовпців, інакше `null`. Повернення `true` вибирає рядок."
      ],
      de: [
        "Sie bekommt die Zellen der Zeile, ihre einsbasierte Position und — wenn eine Kopfzeile benannt wurde — die Zeile mit den Spaltennamen als Schlüsseln, sonst `null`. `true` wählt die Zeile aus."
      ],
      fr: [
        "Il reçoit les cellules de la ligne, sa position à base un et — si une ligne d'en-tête a été désignée — la ligne indexée par les noms de colonnes, `null` sinon. Renvoyer `true` sélectionne la ligne."
      ]
    }
  }),

  ColumnPredicate: type({
    seeAlso: [
      "clearColumnsByConditional",
      "deleteColumnsByConditional",
      "ColumnConditionalOptions"
    ],
    examples: code('const predicate = (values) => values.every((cell) => cell === "");'),
    summary: {
      en: "Decides whether a column is one to act on.",
      ru: "Решает, относится ли столбец к тем, с которыми нужно что-то сделать.",
      uk: "Вирішує, чи належить стовпець до тих, з якими треба щось зробити.",
      de: "Entscheidet, ob eine Spalte eine ist, auf die gewirkt wird.",
      fr: "Décide si une colonne fait partie de celles à traiter."
    },
    paragraph: {
      en: [
        "`RowPredicate` turned on its side: the column's cells, its one-based position and — when a header column was named — the column keyed by the row names. Returning `true` selects the column."
      ],
      ru: [
        "То же, что `RowPredicate`, но по столбцам: ячейки столбца, его позиция от единицы и — если указан столбец заголовков — столбец с ключами по именам строк. Возврат `true` выбирает столбец."
      ],
      uk: [
        "Те саме, що `RowPredicate`, але по стовпцях: комірки стовпця, його позиція від одиниці та — якщо вказано стовпець заголовків — стовпець із ключами за іменами рядків. Повернення `true` вибирає стовпець."
      ],
      de: [
        "`RowPredicate` um neunzig Grad gedreht: die Zellen der Spalte, ihre einsbasierte Position und — wenn eine Kopfspalte benannt wurde — die Spalte mit den Zeilennamen als Schlüsseln. `true` wählt die Spalte aus."
      ],
      fr: [
        "`RowPredicate` pivoté d'un quart de tour : les cellules de la colonne, sa position à base un et — si une colonne d'en-tête a été désignée — la colonne indexée par les noms de lignes. Renvoyer `true` sélectionne la colonne."
      ]
    }
  }),

  RowConditionalOptions: type({
    seeAlso: ["clearRowsByConditional", "deleteRowsByConditional", "RowPredicate"],
    examples: code("const options = { headerRow: 1 };"),
    summary: {
      en: "How the rows are read and which of them are candidates.",
      ru: "Как читаются строки и какие из них попадают в кандидаты.",
      uk: "Як читаються рядки і які з них потрапляють у кандидати.",
      de: "Wie die Zeilen gelesen werden und welche als Kandidaten gelten.",
      fr: "Comment les lignes sont lues et lesquelles sont candidates."
    },
    paragraph: {
      en: [
        "`headerRow` is the one-based row holding the column names. Setting it does two things: the predicate receives each row keyed by those names, and the header row itself stops being a candidate — clearing or deleting the headers is never what a predicate over the data meant."
      ],
      ru: [
        "`headerRow` — строка с именами столбцов, считая от единицы. Её указание делает две вещи: предикат получает каждую строку с ключами по этим именам, и сама строка заголовков выбывает из кандидатов — очистить или удалить заголовки предикат по данным никогда не имел в виду."
      ],
      uk: [
        "`headerRow` — рядок з іменами стовпців, рахуючи від одиниці. Його зазначення робить дві речі: предикат отримує кожен рядок із ключами за цими іменами, і сам рядок заголовків вибуває з кандидатів — очистити чи видалити заголовки предикат по даних ніколи не мав на увазі."
      ],
      de: [
        "`headerRow` ist die einsbasierte Zeile mit den Spaltennamen. Sie zu setzen bewirkt zweierlei: das Prädikat bekommt jede Zeile mit diesen Namen als Schlüsseln, und die Kopfzeile selbst scheidet als Kandidat aus — die Überschriften zu leeren oder zu löschen war nie gemeint."
      ],
      fr: [
        "`headerRow` est la ligne, à base un, qui porte les noms de colonnes. La définir fait deux choses : le prédicat reçoit chaque ligne indexée par ces noms, et la ligne d'en-tête cesse d'être candidate — effacer ou supprimer les en-têtes n'a jamais été l'intention d'un prédicat sur les données."
      ]
    }
  }),

  ColumnConditionalOptions: type({
    seeAlso: ["clearColumnsByConditional", "deleteColumnsByConditional", "ColumnPredicate"],
    examples: code("const options = { headerColumn: 1 };"),
    summary: {
      en: "How the columns are read and which of them are candidates.",
      ru: "Как читаются столбцы и какие из них попадают в кандидаты.",
      uk: "Як читаються стовпці і які з них потрапляють у кандидати.",
      de: "Wie die Spalten gelesen werden und welche als Kandidaten gelten.",
      fr: "Comment les colonnes sont lues et lesquelles sont candidates."
    },
    paragraph: {
      en: [
        "`headerColumn` is the one-based column holding the row names. As with `headerRow`, setting it keys each column by those names and keeps the header column itself out of the candidates."
      ],
      ru: [
        "`headerColumn` — столбец с именами строк, считая от единицы. Как и `headerRow`, он снабжает каждый столбец этими ключами и выводит сам столбец заголовков из числа кандидатов."
      ],
      uk: [
        "`headerColumn` — стовпець з іменами рядків, рахуючи від одиниці. Як і `headerRow`, він дає кожному стовпцю ці ключі й виводить сам стовпець заголовків з числа кандидатів."
      ],
      de: [
        "`headerColumn` ist die einsbasierte Spalte mit den Zeilennamen. Wie `headerRow` versieht sie jede Spalte mit diesen Schlüsseln und nimmt die Kopfspalte selbst aus den Kandidaten."
      ],
      fr: [
        "`headerColumn` est la colonne, à base un, qui porte les noms de lignes. Comme `headerRow`, la définir indexe chaque colonne par ces noms et exclut la colonne d'en-tête des candidates."
      ]
    }
  }),

  FormulaTransformer: type({
    seeAlso: ["updateFormulas", "updateSheetNameInA1Notation"],
    examples: code('const rewrite = (formula, row, column) => formula.replace("Sheet1", "Data");'),
    summary: {
      en: "Rewrites one formula.",
      ru: "Переписывает одну формулу.",
      uk: "Переписує одну формулу.",
      de: "Schreibt eine Formel um.",
      fr: "Réécrit une formule."
    },
    paragraph: {
      en: [
        "It receives the formula and the row and column it sits in, and returns the formula to put back. Returning the one it was given leaves the cell untouched, and `updateFormulas` writes only the cells that actually changed."
      ],
      ru: [
        "Получает формулу и строку со столбцом, где она находится, и возвращает формулу, которую нужно записать. Возврат той же формулы оставляет ячейку нетронутой, а `updateFormulas` пишет только действительно изменившиеся ячейки."
      ],
      uk: [
        "Отримує формулу та рядок зі стовпцем, де вона міститься, і повертає формулу, яку треба записати. Повернення тієї самої формули лишає комірку недоторканою, а `updateFormulas` пише лише справді змінені комірки."
      ],
      de: [
        "Sie bekommt die Formel sowie Zeile und Spalte, in der sie steht, und gibt die zurückzuschreibende Formel zurück. Gibt sie die erhaltene zurück, bleibt die Zelle unberührt, und `updateFormulas` schreibt nur tatsächlich geänderte Zellen."
      ],
      fr: [
        "Elle reçoit la formule ainsi que la ligne et la colonne où elle se trouve, et renvoie la formule à réécrire. Renvoyer celle qu'elle a reçue laisse la cellule intacte, et `updateFormulas` n'écrit que les cellules réellement modifiées."
      ]
    }
  }),

  RemoveSchemaOptions: type({
    seeAlso: ["removeSchema", "SheetSchema"],
    examples: code("const options = { validation: true };"),
    summary: {
      en: "How far `removeSchema` goes.",
      ru: "Насколько далеко заходит `removeSchema`.",
      uk: "Наскільки далеко заходить `removeSchema`.",
      de: "Wie weit `removeSchema` geht.",
      fr: "Jusqu'où va `removeSchema`."
    },
    paragraph: {
      en: [
        "`validation` also clears the data validation on the columns the schema described. It is off by default on purpose: Apps Script gives no way to tell which rule came from a schema and which a person added by hand, so clearing removes both."
      ],
      ru: [
        "`validation` дополнительно снимает проверку данных со столбцов, которые описывала схема. По умолчанию выключено намеренно: Apps Script не позволяет отличить правило от схемы от добавленного человеком, поэтому снимаются оба."
      ],
      uk: [
        "`validation` додатково знімає перевірку даних зі стовпців, які описувала схема. Типово вимкнено навмисно: Apps Script не дозволяє відрізнити правило від схеми від доданого людиною, тому знімаються обидва."
      ],
      de: [
        "`validation` löscht zusätzlich die Datenprüfung der beschriebenen Spalten. Absichtlich standardmäßig aus: Apps Script bietet keine Möglichkeit, eine Regel aus dem Schema von einer handgemachten zu unterscheiden, also trifft das Löschen beide."
      ],
      fr: [
        "`validation` efface aussi la validation des données sur les colonnes décrites. Désactivé par défaut à dessein : Apps Script ne permet pas de distinguer une règle issue du schéma d'une règle ajoutée à la main, et l'effacement emporte les deux."
      ]
    }
  }),

  MergeOptions: type({
    seeAlso: ["merge", "escapeHtml"],
    examples: code('const options = { onMissing: "empty", escape: escapeHtml };'),
    summary: {
      en: "How `merge` fills a template.",
      ru: "Как `merge` заполняет шаблон.",
      uk: "Як `merge` заповнює шаблон.",
      de: "Wie `merge` eine Vorlage füllt.",
      fr: "Comment `merge` remplit un gabarit."
    },
    paragraph: {
      en: [
        '`onMissing` decides what happens to a placeholder whose key is absent: `"keep"`, the default, leaves it in the output where it is visible and traceable; `"empty"` substitutes nothing, which is tidier in something a reader will see.',
        "`escape` is a function applied to every substituted value — `escapeHtml` when the result goes into a page."
      ],
      ru: [
        '`onMissing` решает судьбу плейсхолдера, ключа для которого нет: `"keep"` по умолчанию оставляет его в выводе, где он виден и прослеживается; `"empty"` подставляет пустоту, что аккуратнее в том, что увидит читатель.',
        "`escape` — функция, применяемая к каждому подставляемому значению: `escapeHtml`, если результат попадёт на страницу."
      ],
      uk: [
        '`onMissing` вирішує долю плейсхолдера, ключа для якого немає: `"keep"` типово лишає його у виводі, де він видимий і простежуваний; `"empty"` підставляє порожнечу, що охайніше в тому, що побачить читач.',
        "`escape` — функція, застосовувана до кожного підставленого значення: `escapeHtml`, якщо результат потрапить на сторінку."
      ],
      de: [
        '`onMissing` entscheidet über einen Platzhalter ohne Schlüssel: `"keep"` — die Vorgabe — lässt ihn in der Ausgabe stehen, wo er sichtbar und nachvollziehbar ist; `"empty"` setzt nichts ein, was in etwas, das ein Leser sieht, aufgeräumter wirkt.',
        "`escape` ist eine Funktion, die auf jeden eingesetzten Wert angewendet wird — `escapeHtml`, wenn das Ergebnis in eine Seite geht."
      ],
      fr: [
        '`onMissing` décide du sort d\'un emplacement sans clé : `"keep"`, la valeur par défaut, le laisse dans la sortie où il reste visible et traçable ; `"empty"` n\'insère rien, ce qui est plus net dans ce qu\'un lecteur verra.',
        "`escape` est une fonction appliquée à chaque valeur insérée — `escapeHtml` lorsque le résultat part dans une page."
      ]
    }
  }),

  RetryOptions: type({
    seeAlso: ["retry"],
    examples: code(
      [
        "const options = {",
        "  attempts: 4,",
        "  delay: 500,",
        "  multiplier: 2,",
        "  maxDelay: 10000",
        "};"
      ].join("\n")
    ),
    summary: {
      en: "How `retry` waits and when it gives up.",
      ru: "Как `retry` ждёт и когда сдаётся.",
      uk: "Як `retry` чекає і коли здається.",
      de: "Wie `retry` wartet und wann es aufgibt.",
      fr: "Comment `retry` attend et quand il renonce."
    },
    paragraph: {
      en: [
        "`attempts` caps the tries, `delay` is the wait before the second one, `multiplier` grows each later wait and `maxDelay` caps a single one.",
        "`shouldRetry` receives the error and the attempt that failed and decides whether repeating is worth it at all; `sleep` performs the wait, defaulting to `Utilities.sleep` where it exists, which is what lets a test run without waiting."
      ],
      ru: [
        "`attempts` ограничивает число попыток, `delay` — пауза перед второй, `multiplier` увеличивает каждую следующую, `maxDelay` ограничивает одну паузу.",
        "`shouldRetry` получает ошибку и номер неудавшейся попытки и решает, стоит ли вообще повторять; `sleep` выполняет ожидание и по умолчанию берёт `Utilities.sleep`, где тот есть, — это и позволяет тесту не ждать."
      ],
      uk: [
        "`attempts` обмежує кількість спроб, `delay` — пауза перед другою, `multiplier` збільшує кожну наступну, `maxDelay` обмежує одну паузу.",
        "`shouldRetry` отримує помилку та номер невдалої спроби й вирішує, чи варто взагалі повторювати; `sleep` виконує очікування й типово бере `Utilities.sleep`, де той є, — це й дозволяє тесту не чекати."
      ],
      de: [
        "`attempts` begrenzt die Versuche, `delay` ist die Wartezeit vor dem zweiten, `multiplier` lässt jede weitere wachsen und `maxDelay` deckelt eine einzelne.",
        "`shouldRetry` bekommt den Fehler und den gescheiterten Versuch und entscheidet, ob eine Wiederholung überhaupt lohnt; `sleep` führt das Warten aus und nimmt standardmäßig `Utilities.sleep`, wo es das gibt — genau das lässt einen Test ohne Warten laufen."
      ],
      fr: [
        "`attempts` plafonne les essais, `delay` est l'attente avant le second, `multiplier` fait croître chaque attente suivante et `maxDelay` borne une attente unique.",
        "`shouldRetry` reçoit l'erreur et la tentative échouée et décide si réessayer en vaut la peine ; `sleep` réalise l'attente et vaut par défaut `Utilities.sleep` là où il existe — ce qui permet à un test de ne pas attendre."
      ]
    }
  }),

  TaskInfo: type({
    seeAlso: ["StopWatch"],
    examples: code(
      [
        "const watch = new StopWatch();",
        "",
        'watch.start("fetch");',
        "watch.stop();",
        "",
        'watch.getLastTaskInfo(); // { taskName: "fetch", timeMillis: …, timeSeconds: … }'
      ].join("\n")
    ),
    summary: {
      en: "One timed task, as a `StopWatch` recorded it.",
      ru: "Одна измеренная задача в том виде, в каком её записал `StopWatch`.",
      uk: "Одне виміряне завдання в тому вигляді, в якому його записав `StopWatch`.",
      de: "Eine gemessene Aufgabe, wie eine `StopWatch` sie festgehalten hat.",
      fr: "Une tâche chronométrée, telle qu'un `StopWatch` l'a enregistrée."
    },
    paragraph: {
      en: [
        "The name the task was started with — empty when none was given — and how long it ran, in milliseconds and in seconds. The two durations are the same measurement, offered in both units so that neither the log line nor the arithmetic has to convert."
      ],
      ru: [
        "Имя, с которым задача была запущена, — пустое, если его не дали, — и длительность в миллисекундах и в секундах. Это одно и то же измерение в двух единицах, чтобы не переводить ни в строке журнала, ни в расчётах."
      ],
      uk: [
        "Ім'я, з яким завдання було запущено, — порожнє, якщо його не дали, — і тривалість у мілісекундах і в секундах. Це одне й те саме вимірювання у двох одиницях, щоб не переводити ні в рядку журналу, ні в розрахунках."
      ],
      de: [
        "Der Name, mit dem die Aufgabe gestartet wurde — leer, wenn keiner angegeben war — und ihre Dauer in Millisekunden und in Sekunden. Dieselbe Messung in zwei Einheiten, damit weder die Protokollzeile noch die Rechnung umrechnen muss."
      ],
      fr: [
        "Le nom sous lequel la tâche a démarré — vide si aucun n'a été donné — et sa durée, en millisecondes et en secondes. La même mesure dans les deux unités, pour qu'aucune conversion ne soit nécessaire ni dans la ligne de journal ni dans le calcul."
      ]
    }
  }),

  TimeUnit: type({
    seeAlso: ["diff", "offset"],
    examples: code(['diff(a, b, "day");', 'offset(date, 1, "month");'].join("\n")),
    summary: {
      en: "A unit an interval can be expressed in.",
      ru: "Единица, в которой можно выразить интервал.",
      uk: "Одиниця, в якій можна виразити інтервал.",
      de: "Eine Einheit, in der ein Abstand ausgedrückt werden kann.",
      fr: "Une unité dans laquelle exprimer un intervalle."
    },
    paragraph: {
      en: [
        '`"millisecond"`, `"second"`, `"minute"` and `"hour"` are fixed multiples of a millisecond. `"day"`, `"month"` and `"year"` are calendar units with no fixed length: a day is 23 or 25 hours across a daylight-saving change, and a month is anything from 28 to 31 days.',
        "Which of the two a function applies is stated on its own page — `diff` counts whole calendar units, `offset` moves by them and clamps the day of the month where it has to."
      ],
      ru: [
        '`"millisecond"`, `"second"`, `"minute"` и `"hour"` — фиксированные доли миллисекунды. `"day"`, `"month"` и `"year"` — календарные единицы без постоянной длины: в сутках при переходе на летнее время 23 или 25 часов, а в месяце от 28 до 31 дня.',
        "Какую из двух трактовок применяет конкретная функция, сказано на её странице: `diff` считает целые календарные единицы, `offset` сдвигает на них и при необходимости подтягивает день месяца."
      ],
      uk: [
        '`"millisecond"`, `"second"`, `"minute"` та `"hour"` — фіксовані частки мілісекунди. `"day"`, `"month"` і `"year"` — календарні одиниці без сталої довжини: у добі під час переходу на літній час 23 або 25 годин, а в місяці від 28 до 31 дня.',
        "Яке з двох трактувань застосовує конкретна функція, сказано на її сторінці: `diff` рахує цілі календарні одиниці, `offset` зсуває на них і за потреби підтягує день місяця."
      ],
      de: [
        '`"millisecond"`, `"second"`, `"minute"` und `"hour"` sind feste Vielfache einer Millisekunde. `"day"`, `"month"` und `"year"` sind Kalendereinheiten ohne feste Länge: ein Tag hat bei einer Zeitumstellung 23 oder 25 Stunden, ein Monat zwischen 28 und 31 Tage.',
        "Welche der beiden Lesarten eine Funktion anwendet, steht auf ihrer eigenen Seite: `diff` zählt ganze Kalendereinheiten, `offset` verschiebt um sie und zieht den Monatstag nötigenfalls ans Monatsende."
      ],
      fr: [
        '`"millisecond"`, `"second"`, `"minute"` et `"hour"` sont des multiples fixes de la milliseconde. `"day"`, `"month"` et `"year"` sont des unités calendaires sans longueur fixe : un jour fait 23 ou 25 heures lors d\'un changement d\'heure, et un mois de 28 à 31 jours.',
        "Laquelle des deux lectures s'applique est indiquée sur la page de chaque fonction : `diff` compte des unités calendaires entières, `offset` décale de ces unités et ramène le quantième en fin de mois lorsqu'il le faut."
      ]
    }
  }),

  Falsy: type({
    seeAlso: ["compact", "isEmpty", "nonNil"],
    examples: code('const values = [0, "", false, null, undefined];'),
    summary: {
      en: "The values JavaScript treats as false in a boolean context.",
      ru: "Значения, которые JavaScript считает ложными в логическом контексте.",
      uk: "Значення, які JavaScript вважає хибними в логічному контексті.",
      de: "Die Werte, die JavaScript in einem booleschen Kontext als falsch behandelt.",
      fr: "Les valeurs que JavaScript traite comme fausses dans un contexte booléen."
    },
    paragraph: {
      en: [
        "`false`, `null`, `undefined`, `0`, `0n` and the empty string. The type exists so that `compact` can say what it removes and return a narrowed array without a cast; `NaN` is falsy too but has no place in a type, since its type is `number`."
      ],
      ru: [
        "`false`, `null`, `undefined`, `0`, `0n` и пустая строка. Тип существует ради того, чтобы `compact` мог сказать, что именно он убирает, и вернуть суженный массив без приведения; `NaN` тоже ложен, но в типе ему места нет — его тип `number`."
      ],
      uk: [
        "`false`, `null`, `undefined`, `0`, `0n` і порожній рядок. Тип існує заради того, щоб `compact` міг сказати, що саме він прибирає, і повернути звужений масив без приведення; `NaN` теж хибний, але в типі йому місця немає — його тип `number`."
      ],
      de: [
        "`false`, `null`, `undefined`, `0`, `0n` und die leere Zeichenkette. Den Typ gibt es, damit `compact` sagen kann, was es entfernt, und ein verengtes Array ohne Cast zurückgibt; `NaN` ist ebenfalls unwahr, hat im Typ aber keinen Platz, denn sein Typ ist `number`."
      ],
      fr: [
        "`false`, `null`, `undefined`, `0`, `0n` et la chaîne vide. Le type existe pour que `compact` puisse dire ce qu'il retire et renvoyer un tableau restreint sans cast ; `NaN` est également faux mais n'a pas sa place dans un type, puisque son type est `number`."
      ]
    }
  }),

  StopWatch: type({
    seeAlso: ["TaskInfo", "now", "diff"],
    examples: code(
      [
        'const watch = new StopWatch("import");',
        "",
        'watch.start("fetch");',
        "// … fetch …",
        "watch.stop();",
        "",
        'watch.start("write");',
        "// … write …",
        "watch.stop();",
        "",
        "watch.getTotalTimeMillis();"
      ].join("\n")
    ),
    summary: {
      en: "Times a sequence of named tasks.",
      ru: "Измеряет время последовательности именованных задач.",
      uk: "Вимірює час послідовності іменованих завдань.",
      de: "Misst die Zeit einer Folge benannter Aufgaben.",
      fr: "Chronomètre une suite de tâches nommées."
    },
    paragraph: {
      en: [
        "`start` begins a task and `stop` ends it; only one runs at a time. Afterwards the watch reports the last task, the whole list and the total, in milliseconds or in seconds.",
        "It is for finding where an execution spends its six minutes: name the steps, run it once, read the totals. `setKeepTaskList(false)` stops the list growing when a loop times thousands of steps."
      ],
      ru: [
        "`start` начинает задачу, `stop` завершает её; одновременно идёт только одна. Потом секундомер сообщает о последней задаче, обо всём списке и об итоге — в миллисекундах или секундах.",
        "Он нужен, чтобы понять, куда уходят шесть минут выполнения: назовите шаги, запустите один раз, прочитайте итоги. `setKeepTaskList(false)` не даёт списку расти, когда цикл измеряет тысячи шагов."
      ],
      uk: [
        "`start` починає завдання, `stop` завершує його; одночасно триває лише одне. Потім секундомір повідомляє про останнє завдання, про весь список і про підсумок — у мілісекундах або секундах.",
        "Він потрібен, щоб зрозуміти, куди йдуть шість хвилин виконання: назвіть кроки, запустіть один раз, прочитайте підсумки. `setKeepTaskList(false)` не дає списку рости, коли цикл вимірює тисячі кроків."
      ],
      de: [
        "`start` beginnt eine Aufgabe, `stop` beendet sie; es läuft immer nur eine. Danach meldet die Uhr die letzte Aufgabe, die ganze Liste und die Summe, in Millisekunden oder Sekunden.",
        "Sie dient dazu, herauszufinden, wohin die sechs Minuten einer Ausführung gehen: die Schritte benennen, einmal laufen lassen, die Summen lesen. `setKeepTaskList(false)` hält die Liste klein, wenn eine Schleife tausende Schritte misst."
      ],
      fr: [
        "`start` ouvre une tâche et `stop` la ferme ; une seule court à la fois. Ensuite, le chronomètre rapporte la dernière tâche, la liste entière et le total, en millisecondes ou en secondes.",
        "Il sert à trouver où passent les six minutes d'une exécution : nommer les étapes, exécuter une fois, lire les totaux. `setKeepTaskList(false)` empêche la liste d'enfler quand une boucle chronomètre des milliers d'étapes."
      ]
    },
    title: {
      en: "Timing a run",
      ru: "Измерение выполнения",
      uk: "Вимірювання виконання",
      de: "Einen Lauf messen",
      fr: "Chronométrer une exécution"
    }
  }),

  Class: type({
    seeAlso: ["Iterator", "equals", "hashCode"],
    examples: code(
      [
        "class Money extends Class {",
        "  constructor(amount) {",
        "    super();",
        "    this.amount = amount;",
        "  }",
        "}"
      ].join("\n")
    ),
    summary: {
      en: "The abstract base the library's own classes extend.",
      ru: "Абстрактная основа, от которой наследуют собственные классы библиотеки.",
      uk: "Абстрактна основа, від якої успадковують власні класи бібліотеки.",
      de: "Die abstrakte Basis, von der die eigenen Klassen der Bibliothek erben.",
      fr: "La base abstraite dont héritent les classes de la bibliothèque."
    },
    paragraph: {
      en: [
        "It carries the behaviour every class here is expected to have rather than any behaviour of its own, and cannot be instantiated. Extend it when a value object of yours should behave like the library's — being recognised by the guards and compared by `equals` rather than by identity."
      ],
      ru: [
        "Он несёт поведение, которое ожидается от любого класса здесь, а не собственную логику, и не создаётся напрямую. Наследуйте от него, если ваш объект-значение должен вести себя как объекты библиотеки: опознаваться проверками и сравниваться через `equals`, а не по ссылке."
      ],
      uk: [
        "Він несе поведінку, яку очікують від будь-якого класу тут, а не власну логіку, і не створюється напряму. Успадковуйте від нього, якщо ваш об'єкт-значення має поводитися як об'єкти бібліотеки: розпізнаватися перевірками й порівнюватися через `equals`, а не за посиланням."
      ],
      de: [
        "Sie trägt das Verhalten, das von jeder Klasse hier erwartet wird, und keine eigene Logik; instanziieren lässt sie sich nicht. Erben Sie davon, wenn ein eigenes Wertobjekt sich wie die der Bibliothek verhalten soll — von den Prüfungen erkannt und über `equals` statt über die Identität verglichen."
      ],
      fr: [
        "Elle porte le comportement attendu de toute classe d'ici plutôt qu'une logique propre, et ne s'instancie pas. Héritez-en lorsqu'un objet-valeur à vous doit se comporter comme ceux de la bibliothèque : reconnu par les gardes et comparé par `equals` plutôt que par identité."
      ]
    }
  }),

  Iterator: type({
    seeAlso: ["Class", "first", "last"],
    examples: code(
      ["while (iterator.hasNext()) {", "  const value = iterator.next();", "}"].join("\n")
    ),
    summary: {
      en: "A cursor over a sequence, which may also walk backwards.",
      ru: "Курсор по последовательности, который умеет идти и назад.",
      uk: "Курсор по послідовності, який уміє йти й назад.",
      de: "Ein Zeiger über eine Folge, der auch rückwärts gehen kann.",
      fr: "Un curseur sur une suite, capable aussi de reculer."
    },
    paragraph: {
      en: [
        "`next` and `hasNext` are all an implementation has to provide. The rest — `previous`, `hasPrevious`, `index`, `moveTo`, `size`, `toStart`, `toEnd` — is optional, so a forward-only source can satisfy the interface without pretending to do more than it can.",
        "It is the shape a paged reader takes: rows arriving from a service in batches look like one sequence to the code that consumes them."
      ],
      ru: [
        "Обязательны только `next` и `hasNext`. Остальное — `previous`, `hasPrevious`, `index`, `moveTo`, `size`, `toStart`, `toEnd` — необязательно, поэтому источник, умеющий идти только вперёд, удовлетворяет интерфейсу, не притворяясь, что умеет больше.",
        "Это форма постраничного чтения: строки, приходящие от сервиса порциями, для потребляющего кода выглядят одной последовательностью."
      ],
      uk: [
        "Обов'язкові лише `next` і `hasNext`. Решта — `previous`, `hasPrevious`, `index`, `moveTo`, `size`, `toStart`, `toEnd` — необов'язкова, тому джерело, що вміє йти лише вперед, задовольняє інтерфейс, не вдаючи, ніби вміє більше.",
        "Це форма посторінкового читання: рядки, що надходять від сервісу частинами, для коду-споживача виглядають однією послідовністю."
      ],
      de: [
        "Pflicht sind nur `next` und `hasNext`. Der Rest — `previous`, `hasPrevious`, `index`, `moveTo`, `size`, `toStart`, `toEnd` — ist optional, sodass eine nur vorwärts lesbare Quelle die Schnittstelle erfüllt, ohne mehr vorzugeben, als sie kann.",
        "Es ist die Form eines seitenweisen Lesers: Zeilen, die ein Dienst in Blöcken liefert, sehen für den verbrauchenden Code wie eine Folge aus."
      ],
      fr: [
        "Seuls `next` et `hasNext` sont obligatoires. Le reste — `previous`, `hasPrevious`, `index`, `moveTo`, `size`, `toStart`, `toEnd` — est facultatif : une source qui ne va que vers l'avant satisfait l'interface sans prétendre en faire plus.",
        "C'est la forme d'un lecteur paginé : des lignes arrivant d'un service par lots ressemblent à une seule suite pour le code qui les consomme."
      ]
    }
  })
};

FUNCTIONS.ObjectTag = type({
  seeAlso: ["objectToString", "isRegExp", "isFunction"],
  examples: code(
    [
      "objectToString([]) === ObjectTag.ARRAY; // => true",
      "objectToString(null) === ObjectTag.NULL; // => true"
    ].join("\n")
  ),
  summary: {
    en: "The internal tags a value can report, as named constants.",
    ru: "Внутренние теги, которые может сообщить значение, в виде именованных констант.",
    uk: "Внутрішні теги, які може повідомити значення, у вигляді іменованих констант.",
    de: "Die internen Tags, die ein Wert melden kann, als benannte Konstanten.",
    fr: "Les tags internes qu'une valeur peut déclarer, sous forme de constantes nommées."
  },
  paragraph: {
    en: [
      '`objectToString` returns strings like `"[object Array]"`; this enum gives those strings names, so a comparison reads as `ObjectTag.ARRAY` rather than as a literal that a typo can quietly break.',
      "Several guards in the library are built on it — it is how `isRegExp` and `isFunction` recognise a value that crossed a frame boundary, where `instanceof` no longer holds."
    ],
    ru: [
      '`objectToString` возвращает строки вроде `"[object Array]"`; это перечисление даёт им имена, поэтому сравнение читается как `ObjectTag.ARRAY`, а не как литерал, который тихо ломается от опечатки.',
      "На нём построено несколько проверок библиотеки — именно так `isRegExp` и `isFunction` опознают значение, пришедшее из другого фрейма, где `instanceof` уже не работает."
    ],
    uk: [
      '`objectToString` повертає рядки на кшталт `"[object Array]"`; це перелічення дає їм імена, тому порівняння читається як `ObjectTag.ARRAY`, а не як літерал, що тихо ламається від одруківки.',
      "На ньому побудовано кілька перевірок бібліотеки — саме так `isRegExp` і `isFunction` розпізнають значення, що прийшло з іншого фрейму, де `instanceof` уже не працює."
    ],
    de: [
      '`objectToString` liefert Zeichenketten wie `"[object Array]"`; dieses Enum gibt ihnen Namen, sodass ein Vergleich `ObjectTag.ARRAY` heißt und nicht ein Literal ist, das ein Tippfehler still zerbricht.',
      "Mehrere Prüfungen der Bibliothek bauen darauf — so erkennen `isRegExp` und `isFunction` einen Wert, der eine Frame-Grenze überschritten hat, wo `instanceof` nicht mehr greift."
    ],
    fr: [
      "`objectToString` renvoie des chaînes comme `\"[object Array]\"` ; cet énuméré leur donne un nom, si bien qu'une comparaison se lit `ObjectTag.ARRAY` plutôt qu'un littéral qu'une faute de frappe casse en silence.",
      "Plusieurs gardes de la bibliothèque s'appuient dessus : c'est ainsi qu'`isRegExp` et `isFunction` reconnaissent une valeur venue d'un autre frame, là où `instanceof` ne tient plus."
    ]
  }
});

FUNCTIONS.ParsedPath = type({
  seeAlso: ["parse", "join", "normalize"],
  examples: code(
    [
      'parse("/a/b/c.txt");',
      '// => { root: "/", dir: "/a/b", base: "c.txt", name: "c", ext: ".txt" }',
      "",
      'parse("readme.md");',
      '// => { base: "readme.md", name: "readme", ext: ".md" }'
    ].join("\n")
  ),
  summary: {
    en: "The parts a path breaks into.",
    ru: "Части, на которые распадается путь.",
    uk: "Частини, на які розпадається шлях.",
    de: "Die Teile, in die ein Pfad zerfällt.",
    fr: "Les parties en lesquelles se décompose un chemin."
  },
  paragraph: {
    en: [
      "`root` is the leading separator or scheme, `dir` everything up to the last separator, `base` the file name with its extension, `name` the same without it, and `ext` the extension including its dot.",
      "Every part is optional, and a path that lacks one comes back without that key rather than with an empty string — so a bare file name yields `base`, `name` and `ext` alone. It is the shape Node's `path.parse` returns, which is what makes the two interchangeable in code that has to run in both places."
    ],
    ru: [
      "`root` — ведущий разделитель или схема, `dir` — всё до последнего разделителя, `base` — имя файла с расширением, `name` — оно же без расширения, `ext` — расширение вместе с точкой.",
      "Все части необязательны, и та, которой в пути нет, просто отсутствует в объекте, а не приходит пустой строкой: голое имя файла даёт только `base`, `name` и `ext`. Это форма, которую возвращает `path.parse` в Node, — благодаря ей код, работающий в обеих средах, не нужно переписывать."
    ],
    uk: [
      "`root` — провідний роздільник або схема, `dir` — усе до останнього роздільника, `base` — ім'я файлу з розширенням, `name` — воно ж без розширення, `ext` — розширення разом із крапкою.",
      "Усі частини необов'язкові, і та, якої в шляху немає, просто відсутня в об'єкті, а не приходить порожнім рядком: голе ім'я файлу дає лише `base`, `name` та `ext`. Це форма, яку повертає `path.parse` у Node, — завдяки їй код, що працює в обох середовищах, не треба переписувати."
    ],
    de: [
      "`root` ist der führende Trenner oder das Schema, `dir` alles bis zum letzten Trenner, `base` der Dateiname samt Endung, `name` derselbe ohne sie, und `ext` die Endung mitsamt Punkt.",
      "Jeder Teil ist optional, und ein Pfad, dem einer fehlt, kommt ohne diesen Schlüssel zurück statt mit einer leeren Zeichenkette: ein blanker Dateiname ergibt nur `base`, `name` und `ext`. Es ist die Form, die Nodes `path.parse` liefert — und genau das macht Code, der an beiden Orten laufen muss, austauschbar."
    ],
    fr: [
      "`root` est le séparateur initial ou le schéma, `dir` tout ce qui précède le dernier séparateur, `base` le nom de fichier avec son extension, `name` le même sans elle, et `ext` l'extension, point compris.",
      "Chaque partie est facultative, et un chemin qui n'en a pas revient sans cette clé plutôt qu'avec une chaîne vide : un simple nom de fichier ne donne que `base`, `name` et `ext`. C'est la forme que renvoie `path.parse` de Node, ce qui rend le code interchangeable entre les deux environnements."
    ]
  }
});

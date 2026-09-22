/** Prose for the conditional row and column operations, and the lookups. */

import { code, entry } from "./_entry.mjs";

const SHEET_PARAM = {
  en: "The sheet to work on.",
  ru: "Лист, с которым работаем.",
  uk: "Аркуш, з яким працюємо.",
  de: "Das Blatt, auf dem gearbeitet wird.",
  fr: "La feuille sur laquelle travailler."
};

const NOT_A_SHEET = {
  InvalidSheetException: {
    en: "the first argument is not a sheet.",
    ru: "первый аргумент не является листом.",
    uk: "перший аргумент не є аркушем.",
    de: "das erste Argument ist kein Blatt.",
    fr: "le premier argument n'est pas une feuille."
  },
  IllegalArgumentException: {
    en: "the predicate is not a function, or the header position is not a positive integer.",
    ru: "предикат не функция или позиция заголовка не положительное целое.",
    uk: "предикат не функція або позиція заголовка не додатне ціле.",
    de: "das Prädikat ist keine Funktion oder die Kopfposition keine positive ganze Zahl.",
    fr: "le prédicat n'est pas une fonction, ou la position d'en-tête n'est pas un entier positif."
  }
};

const ROW_PREDICATE = {
  en: "Receives the row's cells, its one-based position and — when `headerRow` is set — the row keyed by the column names. Return `true` for the rows to act on.",
  ru: "Получает ячейки строки, её позицию от единицы и — если задан `headerRow` — строку с ключами по именам столбцов. Верните `true` для строк, с которыми нужно что-то сделать.",
  uk: "Отримує комірки рядка, його позицію від одиниці та — якщо задано `headerRow` — рядок із ключами за іменами стовпців. Поверніть `true` для рядків, з якими треба щось зробити.",
  de: "Bekommt die Zellen der Zeile, ihre einsbasierte Position und — wenn `headerRow` gesetzt ist — die Zeile mit den Spaltennamen als Schlüsseln. `true` für die Zeilen, auf die gewirkt werden soll.",
  fr: "Reçoit les cellules de la ligne, sa position à base un et — si `headerRow` est défini — la ligne indexée par les noms de colonnes. Renvoyez `true` pour les lignes à traiter."
};

const COLUMN_PREDICATE = {
  en: "Receives the column's cells, its one-based position and — when `headerColumn` is set — the column keyed by the row names. Return `true` for the columns to act on.",
  ru: "Получает ячейки столбца, его позицию от единицы и — если задан `headerColumn` — столбец с ключами по именам строк. Верните `true` для столбцов, с которыми нужно что-то сделать.",
  uk: "Отримує комірки стовпця, його позицію від одиниці та — якщо задано `headerColumn` — стовпець із ключами за іменами рядків. Поверніть `true` для стовпців, з якими треба щось зробити.",
  de: "Bekommt die Zellen der Spalte, ihre einsbasierte Position und — wenn `headerColumn` gesetzt ist — die Spalte mit den Zeilennamen als Schlüsseln. `true` für die Spalten, auf die gewirkt werden soll.",
  fr: "Reçoit les cellules de la colonne, sa position à base un et — si `headerColumn` est défini — la colonne indexée par les noms de lignes. Renvoyez `true` pour les colonnes à traiter."
};

const HEADER_ROW_OPTION = {
  en: "`headerRow` names the row holding the column names. Setting it keys each row by those names and keeps the header row itself out of the candidates.",
  ru: "`headerRow` указывает строку с именами столбцов. Если она задана, каждая строка приходит с ключами по этим именам, а сама строка заголовков выбывает из кандидатов.",
  uk: "`headerRow` вказує рядок з іменами стовпців. Якщо його задано, кожен рядок приходить із ключами за цими іменами, а сам рядок заголовків вибуває з кандидатів.",
  de: "`headerRow` benennt die Zeile mit den Spaltennamen. Ist sie gesetzt, kommt jede Zeile mit diesen Namen als Schlüsseln, und die Kopfzeile selbst scheidet als Kandidat aus.",
  fr: "`headerRow` désigne la ligne portant les noms de colonnes. Définie, elle indexe chaque ligne par ces noms et exclut la ligne d'en-tête des candidates."
};

const HEADER_COLUMN_OPTION = {
  en: "`headerColumn` names the column holding the row names, and keeps that column out of the candidates.",
  ru: "`headerColumn` указывает столбец с именами строк и выводит этот столбец из числа кандидатов.",
  uk: "`headerColumn` вказує стовпець з іменами рядків і виводить цей стовпець з числа кандидатів.",
  de: "`headerColumn` benennt die Spalte mit den Zeilennamen und nimmt diese Spalte aus den Kandidaten heraus.",
  fr: "`headerColumn` désigne la colonne portant les noms de lignes et l'exclut des candidates."
};

const COUNT_RETURN = {
  en: "how many were affected.",
  ru: "сколько их было затронуто.",
  uk: "скількох це торкнулося.",
  de: "wie viele betroffen waren.",
  fr: "combien ont été traitées."
};

const TITLE = {
  en: "In use",
  ru: "Применение",
  uk: "Застосування",
  de: "Im Einsatz",
  fr: "Utilisation"
};

export const FUNCTIONS = {
  clearRowsByConditional: entry({
    seeAlso: ["deleteRowsByConditional", "clearColumnsByConditional", "getValues"],
    examples: code(
      [
        "const sheet = SpreadsheetApp.getActiveSheet();",
        "",
        'clearRowsByConditional(sheet, (values, position, row) => row.status === "done", {',
        "  headerRow: 1",
        "});"
      ].join("\n")
    ),
    summary: {
      en: "Empties the rows a predicate selects, leaving the rows in place.",
      ru: "Очищает строки, выбранные предикатом, не удаляя сами строки.",
      uk: "Очищає рядки, вибрані предикатом, не видаляючи самі рядки.",
      de: "Leert die vom Prädikat gewählten Zeilen, ohne die Zeilen zu entfernen.",
      fr: "Vide les lignes que le prédicat sélectionne, sans supprimer les lignes."
    },
    description: {
      en: [
        "The contents go and the rows stay, so positions do not shift and anything referring to a row by its number keeps pointing at the same place. `deleteRowsByConditional` is the one that removes them.",
        "The sheet is read once and the clearing is grouped into consecutive blocks, so a scattered selection still costs few calls to the service."
      ],
      ru: [
        "Содержимое уходит, строки остаются, поэтому позиции не сдвигаются и всё, что ссылается на строку по номеру, продолжает указывать на то же место. Удаляет строки `deleteRowsByConditional`.",
        "Лист читается один раз, а очистка группируется в идущие подряд блоки, поэтому даже разрозненная выборка стоит немногих обращений к сервису."
      ],
      uk: [
        "Вміст зникає, рядки лишаються, тому позиції не зсуваються і все, що посилається на рядок за номером, далі вказує на те саме місце. Видаляє рядки `deleteRowsByConditional`.",
        "Аркуш читається один раз, а очищення групується в суміжні блоки, тому навіть розрізнена вибірка коштує небагатьох звернень до сервісу."
      ],
      de: [
        "Der Inhalt verschwindet, die Zeilen bleiben: die Positionen verschieben sich nicht, und alles, was eine Zeile über ihre Nummer anspricht, zeigt weiter auf dieselbe Stelle. Entfernt werden sie von `deleteRowsByConditional`.",
        "Das Blatt wird einmal gelesen und das Leeren in zusammenhängende Blöcke gruppiert, sodass auch eine verstreute Auswahl wenige Dienstaufrufe kostet."
      ],
      fr: [
        "Le contenu part, les lignes restent : les positions ne bougent pas et tout ce qui désigne une ligne par son numéro continue de pointer au même endroit. C'est `deleteRowsByConditional` qui les supprime.",
        "La feuille est lue une fois et l'effacement est regroupé en blocs consécutifs : une sélection dispersée coûte donc peu d'appels au service."
      ]
    },
    params: { sheet: SHEET_PARAM, predicate: ROW_PREDICATE, options: HEADER_ROW_OPTION },
    returns: COUNT_RETURN,
    throws: NOT_A_SHEET,
    title: TITLE
  }),

  deleteRowsByConditional: entry({
    seeAlso: ["clearRowsByConditional", "deleteColumnsByConditional"],
    examples: code(
      [
        "const sheet = SpreadsheetApp.getActiveSheet();",
        "",
        'deleteRowsByConditional(sheet, (values, position, row) => row.status === "done", {',
        "  headerRow: 1",
        "});"
      ].join("\n")
    ),
    summary: {
      en: "Deletes the rows a predicate selects.",
      ru: "Удаляет строки, выбранные предикатом.",
      uk: "Видаляє рядки, вибрані предикатом.",
      de: "Löscht die vom Prädikat gewählten Zeilen.",
      fr: "Supprime les lignes que le prédicat sélectionne."
    },
    description: {
      en: [
        "Every row is judged against the sheet as it was read, and the deletions then happen from the bottom upwards in consecutive blocks. That is what keeps a hand-written loop from deleting the wrong rows once the positions start shifting.",
        "Rows are gone for good: `clearRowsByConditional` is the one that only empties them."
      ],
      ru: [
        "Каждая строка оценивается по листу в том виде, в каком он был прочитан, а удаление затем идёт снизу вверх идущими подряд блоками. Именно это избавляет от ошибки самописного цикла, который удаляет не те строки, когда позиции начинают сдвигаться.",
        "Строки исчезают насовсем: только очищает их `clearRowsByConditional`."
      ],
      uk: [
        "Кожен рядок оцінюється за аркушем у тому вигляді, в якому його прочитали, а видалення потім іде знизу вгору суміжними блоками. Саме це рятує від помилки саморобного циклу, що видаляє не ті рядки, коли позиції починають зсуватися.",
        "Рядки зникають назавжди: лише очищає їх `clearRowsByConditional`."
      ],
      de: [
        "Jede Zeile wird an dem Blatt gemessen, wie es gelesen wurde; gelöscht wird anschließend von unten nach oben in zusammenhängenden Blöcken. Genau das verhindert den Fehler einer selbstgeschriebenen Schleife, die die falschen Zeilen trifft, sobald die Positionen sich verschieben.",
        "Die Zeilen sind dann fort: nur leeren tut sie `clearRowsByConditional`."
      ],
      fr: [
        "Chaque ligne est jugée sur la feuille telle qu'elle a été lue, puis les suppressions se font de bas en haut par blocs consécutifs. C'est ce qui évite l'erreur d'une boucle écrite à la main qui supprime les mauvaises lignes dès que les positions se décalent.",
        "Les lignes disparaissent pour de bon : `clearRowsByConditional` se contente de les vider."
      ]
    },
    params: { sheet: SHEET_PARAM, predicate: ROW_PREDICATE, options: HEADER_ROW_OPTION },
    returns: COUNT_RETURN,
    throws: NOT_A_SHEET,
    title: TITLE
  }),

  clearColumnsByConditional: entry({
    seeAlso: ["deleteColumnsByConditional", "clearRowsByConditional"],
    examples: code(
      [
        "const sheet = SpreadsheetApp.getActiveSheet();",
        "",
        'clearColumnsByConditional(sheet, (values) => values.every((cell) => cell === ""));'
      ].join("\n")
    ),
    summary: {
      en: "Empties the columns a predicate selects, leaving the columns in place.",
      ru: "Очищает столбцы, выбранные предикатом, не удаляя сами столбцы.",
      uk: "Очищає стовпці, вибрані предикатом, не видаляючи самі стовпці.",
      de: "Leert die vom Prädikat gewählten Spalten, ohne die Spalten zu entfernen.",
      fr: "Vide les colonnes que le prédicat sélectionne, sans supprimer les colonnes."
    },
    description: {
      en: [
        "`clearRowsByConditional` turned on its side: the contents go, the columns stay, so the letters of the columns after them do not change.",
        "The sheet is read once and the clearing is grouped into consecutive blocks."
      ],
      ru: [
        "То же, что `clearRowsByConditional`, только по столбцам: содержимое уходит, столбцы остаются, поэтому буквы следующих столбцов не меняются.",
        "Лист читается один раз, очистка группируется в идущие подряд блоки."
      ],
      uk: [
        "Те саме, що `clearRowsByConditional`, але по стовпцях: вміст зникає, стовпці лишаються, тому літери наступних стовпців не змінюються.",
        "Аркуш читається один раз, очищення групується в суміжні блоки."
      ],
      de: [
        "`clearRowsByConditional` um neunzig Grad gedreht: der Inhalt verschwindet, die Spalten bleiben, die Buchstaben der folgenden Spalten ändern sich also nicht.",
        "Das Blatt wird einmal gelesen, das Leeren in zusammenhängende Blöcke gruppiert."
      ],
      fr: [
        "`clearRowsByConditional` pivoté d'un quart de tour : le contenu part, les colonnes restent, et les lettres des colonnes suivantes ne changent pas.",
        "La feuille est lue une fois et l'effacement regroupé en blocs consécutifs."
      ]
    },
    params: { sheet: SHEET_PARAM, predicate: COLUMN_PREDICATE, options: HEADER_COLUMN_OPTION },
    returns: COUNT_RETURN,
    throws: NOT_A_SHEET,
    title: TITLE
  }),

  deleteColumnsByConditional: entry({
    seeAlso: ["clearColumnsByConditional", "deleteRowsByConditional"],
    examples: code(
      [
        "const sheet = SpreadsheetApp.getActiveSheet();",
        "",
        "deleteColumnsByConditional(sheet, (values, position, column) => column.internal === true, {",
        "  headerColumn: 1",
        "});"
      ].join("\n")
    ),
    summary: {
      en: "Deletes the columns a predicate selects.",
      ru: "Удаляет столбцы, выбранные предикатом.",
      uk: "Видаляє стовпці, вибрані предикатом.",
      de: "Löscht die vom Prädikat gewählten Spalten.",
      fr: "Supprime les colonnes que le prédicat sélectionne."
    },
    description: {
      en: [
        "Judged against the sheet as read, then deleted from the right edge inwards in consecutive blocks, so shifting positions cannot take the wrong column with them.",
        "Columns are gone for good: `clearColumnsByConditional` only empties them."
      ],
      ru: [
        "Оценка идёт по прочитанному листу, а удаление — от правого края внутрь идущими подряд блоками, поэтому сдвиг позиций не утащит с собой чужой столбец.",
        "Столбцы исчезают насовсем: только очищает их `clearColumnsByConditional`."
      ],
      uk: [
        "Оцінка йде за прочитаним аркушем, а видалення — від правого краю всередину суміжними блоками, тому зсув позицій не потягне за собою чужий стовпець.",
        "Стовпці зникають назавжди: лише очищає їх `clearColumnsByConditional`."
      ],
      de: [
        "Beurteilt wird am gelesenen Blatt, gelöscht vom rechten Rand nach innen in zusammenhängenden Blöcken, damit verschobene Positionen nicht die falsche Spalte mitnehmen.",
        "Die Spalten sind dann fort: `clearColumnsByConditional` leert sie nur."
      ],
      fr: [
        "Jugé sur la feuille telle que lue, puis supprimé du bord droit vers l'intérieur par blocs consécutifs, pour que le décalage des positions n'emporte pas la mauvaise colonne.",
        "Les colonnes disparaissent pour de bon : `clearColumnsByConditional` se contente de les vider."
      ]
    },
    params: { sheet: SHEET_PARAM, predicate: COLUMN_PREDICATE, options: HEADER_COLUMN_OPTION },
    returns: COUNT_RETURN,
    throws: NOT_A_SHEET,
    title: TITLE
  }),

  getSheetById: entry({
    seeAlso: ["getSheetByIndex", "isValidSheetId", "requireSheet"],
    examples: code(
      [
        "const sheet = getSheetById(0);",
        "",
        "if (sheet === null) {",
        '  throw new Error("That sheet is gone.");',
        "}"
      ].join("\n")
    ),
    summary: {
      en: "Finds a sheet by its id.",
      ru: "Находит лист по идентификатору.",
      uk: "Знаходить аркуш за ідентифікатором.",
      de: "Findet ein Blatt anhand seiner Id.",
      fr: "Trouve une feuille par son identifiant."
    },
    description: {
      en: [
        "An id survives a rename and a reorder, which is what makes it the right handle to store in a property or a config. Apps Script offers no lookup by id, so the sheets are walked and compared.",
        "The spreadsheet defaults to the active one. A sheet that is not there gives `null` rather than an exception, so a stored id that no longer resolves is a case to handle, not a crash."
      ],
      ru: [
        "Идентификатор переживает переименование и перестановку — именно поэтому его и стоит хранить в свойствах или конфигурации. В Apps Script нет поиска по идентификатору, поэтому листы перебираются и сравниваются.",
        "Таблица по умолчанию — активная. Отсутствующий лист даёт `null`, а не исключение: сохранённый идентификатор, который больше не находится, — это случай для обработки, а не падение."
      ],
      uk: [
        "Ідентифікатор переживає перейменування та перестановку — саме тому його й варто зберігати у властивостях чи конфігурації. В Apps Script немає пошуку за ідентифікатором, тому аркуші перебираються та порівнюються.",
        "Таблиця типово — активна. Відсутній аркуш дає `null`, а не виняток: збережений ідентифікатор, який більше не знаходиться, — це випадок для обробки, а не падіння."
      ],
      de: [
        "Eine Id übersteht Umbenennen und Umsortieren — deshalb gehört sie in eine Property oder eine Konfiguration. Apps Script bietet keine Suche nach Id, also werden die Blätter durchlaufen und verglichen.",
        "Die Tabelle ist standardmäßig die aktive. Ein nicht vorhandenes Blatt ergibt `null` statt einer Ausnahme: eine gespeicherte Id, die nicht mehr auflöst, ist ein Fall zum Behandeln, kein Absturz."
      ],
      fr: [
        "Un identifiant survit à un renommage et à un réordonnancement : c'est donc la bonne poignée à ranger dans une propriété ou une configuration. Apps Script n'offre pas de recherche par identifiant, les feuilles sont donc parcourues et comparées.",
        "Le classeur est par défaut celui qui est actif. Une feuille absente donne `null` plutôt qu'une exception : un identifiant stocké qui ne résout plus est un cas à traiter, pas un plantage."
      ]
    },
    params: {
      sheetId: {
        en: "The sheet id to look for.",
        ru: "Искомый идентификатор листа.",
        uk: "Шуканий ідентифікатор аркуша.",
        de: "Die gesuchte Blatt-Id.",
        fr: "L'identifiant de feuille recherché."
      },
      ss: {
        en: "The spreadsheet to look in. The active one by default.",
        ru: "Таблица, в которой искать. По умолчанию активная.",
        uk: "Таблиця, у якій шукати. Типово активна.",
        de: "Die Tabelle, in der gesucht wird. Standardmäßig die aktive.",
        fr: "Le classeur où chercher. Par défaut, celui qui est actif."
      }
    },
    returns: {
      en: "the sheet, or `null` when no sheet carries that id.",
      ru: "лист или `null`, если такого идентификатора нет.",
      uk: "аркуш або `null`, якщо такого ідентифікатора немає.",
      de: "das Blatt oder `null`, wenn kein Blatt diese Id trägt.",
      fr: "la feuille, ou `null` si aucune ne porte cet identifiant."
    },
    title: { en: "Looking up", ru: "Поиск", uk: "Пошук", de: "Nachschlagen", fr: "Recherche" }
  }),

  getSheetByIndex: entry({
    seeAlso: ["getSheetById", "sortSheets"],
    examples: code("const first = getSheetByIndex(0);"),
    summary: {
      en: "Finds a sheet by its position in the spreadsheet.",
      ru: "Находит лист по его позиции в таблице.",
      uk: "Знаходить аркуш за його позицією в таблиці.",
      de: "Findet ein Blatt anhand seiner Position in der Tabelle.",
      fr: "Trouve une feuille par sa position dans le classeur."
    },
    description: {
      en: [
        "The index counts from zero, left to right as the tabs are shown. It is a position, not an identity: moving a tab changes what this returns, which is why `getSheetById` is the one to store.",
        "An index past the end gives `null` rather than an exception."
      ],
      ru: [
        "Индекс считается от нуля, слева направо, как показаны вкладки. Это позиция, а не тождество: перемещение вкладки меняет результат — поэтому хранить стоит `getSheetById`.",
        "Индекс за пределами диапазона даёт `null`, а не исключение."
      ],
      uk: [
        "Індекс рахується від нуля, зліва направо, як показані вкладки. Це позиція, а не тотожність: переміщення вкладки змінює результат — тому зберігати варто `getSheetById`.",
        "Індекс поза межами діапазону дає `null`, а не виняток."
      ],
      de: [
        "Der Index zählt ab null, von links nach rechts, wie die Reiter stehen. Er ist eine Position, keine Identität: ein verschobener Reiter ändert das Ergebnis — darum gehört `getSheetById` in den Speicher.",
        "Ein Index hinter dem Ende ergibt `null` statt einer Ausnahme."
      ],
      fr: [
        "L'indice compte à partir de zéro, de gauche à droite comme les onglets sont affichés. C'est une position, pas une identité : déplacer un onglet change le résultat — d'où `getSheetById` pour ce qu'on stocke.",
        "Un indice au-delà de la fin donne `null` plutôt qu'une exception."
      ]
    },
    params: {
      sheetIndex: {
        en: "The zero-based position.",
        ru: "Позиция, считая от нуля.",
        uk: "Позиція, рахуючи від нуля.",
        de: "Die nullbasierte Position.",
        fr: "La position à base zéro."
      },
      spreadsheet: {
        en: "The spreadsheet to look in. The active one by default.",
        ru: "Таблица, в которой искать. По умолчанию активная.",
        uk: "Таблиця, у якій шукати. Типово активна.",
        de: "Die Tabelle, in der gesucht wird. Standardmäßig die aktive.",
        fr: "Le classeur où chercher. Par défaut, celui qui est actif."
      }
    },
    returns: {
      en: "the sheet, or `null` when the index is past the end.",
      ru: "лист или `null`, если индекс за пределами.",
      uk: "аркуш або `null`, якщо індекс поза межами.",
      de: "das Blatt oder `null`, wenn der Index hinter dem Ende liegt.",
      fr: "la feuille, ou `null` si l'indice dépasse la fin."
    },
    title: { en: "Looking up", ru: "Поиск", uk: "Пошук", de: "Nachschlagen", fr: "Recherche" }
  }),

  getNamedRangeByName: entry({
    seeAlso: ["getSheetById", "parseA1Notation"],
    examples: code(
      [
        "const spreadsheet = SpreadsheetApp.getActive();",
        "",
        'const range = getNamedRangeByName(spreadsheet, "Settings");',
        "",
        "range?.getRange().getValues();"
      ].join("\n")
    ),
    summary: {
      en: "Finds a named range by its name.",
      ru: "Находит именованный диапазон по имени.",
      uk: "Знаходить іменований діапазон за іменем.",
      de: "Findet einen benannten Bereich anhand seines Namens.",
      fr: "Trouve une plage nommée par son nom."
    },
    description: {
      en: [
        "A named range is the stable way to point at a block of cells that a person may move around the sheet. Apps Script only offers the whole list, so the names are walked and compared.",
        "A name that is not defined gives `null`, which is the case to handle when a template has been edited by hand."
      ],
      ru: [
        "Именованный диапазон — устойчивый способ указать на блок ячеек, который человек может передвинуть по листу. Apps Script отдаёт только весь список, поэтому имена перебираются и сравниваются.",
        "Неопределённое имя даёт `null` — это случай, который стоит обработать, если шаблон правили руками."
      ],
      uk: [
        "Іменований діапазон — стійкий спосіб указати на блок комірок, який людина може пересунути по аркушу. Apps Script віддає лише весь список, тому імена перебираються та порівнюються.",
        "Невизначене ім'я дає `null` — це випадок, який варто обробити, якщо шаблон правили руками."
      ],
      de: [
        "Ein benannter Bereich ist der stabile Weg, auf einen Zellblock zu zeigen, den ein Mensch im Blatt verschieben kann. Apps Script liefert nur die ganze Liste, also werden die Namen durchlaufen und verglichen.",
        "Ein nicht definierter Name ergibt `null` — der Fall, den man behandelt, wenn eine Vorlage von Hand bearbeitet wurde."
      ],
      fr: [
        "Une plage nommée est la façon stable de désigner un bloc de cellules qu'une personne peut déplacer dans la feuille. Apps Script ne fournit que la liste entière : les noms sont donc parcourus et comparés.",
        "Un nom non défini donne `null`, cas à traiter lorsqu'un modèle a été modifié à la main."
      ]
    },
    params: {
      spreadsheet: {
        en: "The spreadsheet to look in.",
        ru: "Таблица, в которой искать.",
        uk: "Таблиця, у якій шукати.",
        de: "Die Tabelle, in der gesucht wird.",
        fr: "Le classeur où chercher."
      },
      name: {
        en: "The name of the range.",
        ru: "Имя диапазона.",
        uk: "Ім'я діапазону.",
        de: "Der Name des Bereichs.",
        fr: "Le nom de la plage."
      }
    },
    returns: {
      en: "the named range, or `null` when no such name is defined.",
      ru: "именованный диапазон или `null`, если такого имени нет.",
      uk: "іменований діапазон або `null`, якщо такого імені немає.",
      de: "den benannten Bereich oder `null`, wenn es den Namen nicht gibt.",
      fr: "la plage nommée, ou `null` si ce nom n'existe pas."
    },
    title: { en: "Looking up", ru: "Поиск", uk: "Пошук", de: "Nachschlagen", fr: "Recherche" }
  }),

  sortSheets: entry({
    seeAlso: ["getSheetByIndex", "isValidSheetName"],
    examples: code(
      [
        "const spreadsheet = SpreadsheetApp.getActive();",
        "",
        "sortSheets(spreadsheet); // alphabetically by name",
        "",
        "sortSheets(spreadsheet, (a, b) => b.localeCompare(a)); // reversed"
      ].join("\n")
    ),
    summary: {
      en: "Reorders the tabs of a spreadsheet.",
      ru: "Переупорядочивает вкладки таблицы.",
      uk: "Перевпорядковує вкладки таблиці.",
      de: "Ordnet die Reiter einer Tabelle neu.",
      fr: "Réordonne les onglets d'un classeur."
    },
    description: {
      en: [
        "By name, ascending, unless a comparison function is given — it receives two sheet names and works like the one `Array#sort` takes.",
        "The tabs are moved one at a time, and each move is a call to the service, so a spreadsheet with many sheets takes a moment."
      ],
      ru: [
        "По имени, по возрастанию, если не передана функция сравнения — она получает два имени листов и работает как та, что принимает `Array#sort`.",
        "Вкладки переставляются по одной, каждая перестановка — обращение к сервису, поэтому таблица со множеством листов сортируется не мгновенно."
      ],
      uk: [
        "За іменем, за зростанням, якщо не передано функцію порівняння — вона отримує два імені аркушів і працює як та, що приймає `Array#sort`.",
        "Вкладки переставляються по одній, кожна перестановка — звернення до сервісу, тому таблиця з багатьма аркушами сортується не миттєво."
      ],
      de: [
        "Nach Namen aufsteigend, sofern keine Vergleichsfunktion übergeben wird — sie bekommt zwei Blattnamen und arbeitet wie die von `Array#sort`.",
        "Die Reiter werden einzeln verschoben, jede Verschiebung ist ein Dienstaufruf; eine Tabelle mit vielen Blättern braucht also einen Moment."
      ],
      fr: [
        "Par nom, en ordre croissant, sauf si une fonction de comparaison est fournie — elle reçoit deux noms de feuille et fonctionne comme celle d'`Array#sort`.",
        "Les onglets sont déplacés un à un, et chaque déplacement est un appel au service : un classeur riche en feuilles prend donc un instant."
      ]
    },
    params: {
      spreadsheet: {
        en: "The spreadsheet whose tabs are reordered.",
        ru: "Таблица, вкладки которой переупорядочиваются.",
        uk: "Таблиця, вкладки якої перевпорядковуються.",
        de: "Die Tabelle, deren Reiter neu geordnet werden.",
        fr: "Le classeur dont les onglets sont réordonnés."
      },
      callback: {
        en: "Compares two sheet names, as `Array#sort` expects.",
        ru: "Сравнивает два имени листов, как того ждёт `Array#sort`.",
        uk: "Порівнює два імені аркушів, як того чекає `Array#sort`.",
        de: "Vergleicht zwei Blattnamen, wie `Array#sort` es erwartet.",
        fr: "Compare deux noms de feuille, comme l'attend `Array#sort`."
      }
    },
    returns: {
      en: "nothing; the spreadsheet is changed in place.",
      ru: "ничего: таблица меняется на месте.",
      uk: "нічого: таблиця змінюється на місці.",
      de: "nichts; die Tabelle wird an Ort und Stelle geändert.",
      fr: "rien ; le classeur est modifié sur place."
    },
    title: {
      en: "Sorting the tabs",
      ru: "Сортировка вкладок",
      uk: "Сортування вкладок",
      de: "Reiter sortieren",
      fr: "Trier les onglets"
    }
  })
};

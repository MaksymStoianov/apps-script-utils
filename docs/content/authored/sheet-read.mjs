/** Prose for reading a sheet, its schema and its formulas. */

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
  }
};

export const FUNCTIONS = {
  getValues: entry({
    seeAlso: ["getSchema", "isConsistent2DArray"],
    examples: code(
      [
        "const sheet = SpreadsheetApp.getActiveSheet();",
        "",
        "const active = getValues(sheet, {",
        "  headerRow: 1,",
        '  filter: (row) => row.status === "active",',
        "  mapper: (row) => row.email,",
        "  limit: 100",
        "});"
      ].join("\n")
    ),
    summary: {
      en: "Reads the rows of a sheet, filtered, mapped and paged in one call.",
      ru: "Читает строки листа, фильтруя, преобразуя и разбивая на страницы за один вызов.",
      uk: "Читає рядки аркуша, фільтруючи, перетворюючи та розбиваючи на сторінки за один виклик.",
      de: "Liest die Zeilen eines Blattes, gefiltert, abgebildet und seitenweise, in einem Aufruf.",
      fr: "Lit les lignes d'une feuille, filtrées, transformées et paginées en un seul appel."
    },
    description: {
      en: [
        "With `headerRow` set, each row arrives as an object keyed by the column names, which is what makes a filter readable: `row.status` instead of `row[4]`. Where a name repeats, the leftmost column wins.",
        "`filter` narrows the rows, `offset` and `limit` page what is left, and `mapper` decides what each surviving row becomes. `display` reads the values as a person sees them — a formatted date as its text rather than as a `Date` — which is a different thing from what is stored, not a cosmetic switch."
      ],
      ru: [
        "Если задан `headerRow`, каждая строка приходит объектом с ключами по именам столбцов — именно это делает фильтр читаемым: `row.status` вместо `row[4]`. При повторе имени побеждает левый столбец.",
        "`filter` сужает набор строк, `offset` и `limit` разбивают оставшееся на страницы, а `mapper` решает, во что превращается каждая уцелевшая строка. `display` читает значения так, как их видит человек: отформатированную дату — как текст, а не как `Date`. Это другое содержимое, а не косметика."
      ],
      uk: [
        "Якщо задано `headerRow`, кожен рядок приходить об'єктом із ключами за іменами стовпців — саме це робить фільтр читабельним: `row.status` замість `row[4]`. За повтору імені перемагає лівий стовпець.",
        "`filter` звужує набір рядків, `offset` і `limit` розбивають решту на сторінки, а `mapper` вирішує, на що перетворюється кожен уцілілий рядок. `display` читає значення так, як їх бачить людина: відформатовану дату — як текст, а не як `Date`. Це інший вміст, а не косметика."
      ],
      de: [
        "Ist `headerRow` gesetzt, kommt jede Zeile als Objekt mit den Spaltennamen als Schlüsseln — genau das macht einen Filter lesbar: `row.status` statt `row[4]`. Wiederholt sich ein Name, gewinnt die linke Spalte.",
        "`filter` engt die Zeilen ein, `offset` und `limit` blättern durch den Rest, und `mapper` bestimmt, was aus jeder übrigen Zeile wird. `display` liest die Werte so, wie ein Mensch sie sieht — ein formatiertes Datum als Text statt als `Date`. Das ist anderer Inhalt, keine Kosmetik."
      ],
      fr: [
        "Avec `headerRow`, chaque ligne arrive sous forme d'objet dont les clés sont les noms de colonnes, ce qui rend un filtre lisible : `row.status` plutôt que `row[4]`. Si un nom se répète, la colonne la plus à gauche l'emporte.",
        "`filter` restreint les lignes, `offset` et `limit` paginent le reste, et `mapper` décide de ce que devient chaque ligne conservée. `display` lit les valeurs telles qu'une personne les voit — une date formatée comme du texte plutôt que comme un `Date` — ce qui est un autre contenu, pas un réglage cosmétique."
      ]
    },
    params: {
      sheet: SHEET_PARAM,
      config: {
        en: "`headerRow`, `display`, `filter`, `offset`, `limit` and `mapper`.",
        ru: "`headerRow`, `display`, `filter`, `offset`, `limit` и `mapper`.",
        uk: "`headerRow`, `display`, `filter`, `offset`, `limit` та `mapper`.",
        de: "`headerRow`, `display`, `filter`, `offset`, `limit` und `mapper`.",
        fr: "`headerRow`, `display`, `filter`, `offset`, `limit` et `mapper`."
      }
    },
    returns: {
      en: "the rows that survived, in sheet order.",
      ru: "уцелевшие строки в порядке листа.",
      uk: "уцілілі рядки в порядку аркуша.",
      de: "die verbliebenen Zeilen in der Reihenfolge des Blattes.",
      fr: "les lignes conservées, dans l'ordre de la feuille."
    },
    throws: NOT_A_SHEET,
    title: {
      en: "Reading rows",
      ru: "Чтение строк",
      uk: "Читання рядків",
      de: "Zeilen lesen",
      fr: "Lire des lignes"
    }
  }),

  getSchema: entry({
    seeAlso: ["insertSchema", "removeSchema", "getValues"],
    examples: code(
      [
        "const sheet = SpreadsheetApp.getActiveSheet();",
        "",
        "const schema = getSchema(sheet);",
        "",
        "schema?.columns.map((column) => column.name);"
      ].join("\n")
    ),
    summary: {
      en: "Returns the schema of a sheet, stored or inferred from its contents.",
      ru: "Возвращает схему листа — сохранённую или выведенную из его содержимого.",
      uk: "Повертає схему аркуша — збережену або виведену з його вмісту.",
      de: "Gibt das Schema eines Blattes zurück, gespeichert oder aus dem Inhalt abgeleitet.",
      fr: "Renvoie le schéma d'une feuille, stocké ou déduit de son contenu."
    },
    description: {
      en: [
        "A schema describes the columns: their names, their types and the row the names live in. When `insertSchema` has stored one on the sheet, that is what comes back.",
        "When nothing was stored, the sheet is read and a schema is inferred from the header row and the values below it. The result carries `inferred: true` in that case, so a caller can tell a description that was declared from one that was guessed."
      ],
      ru: [
        "Схема описывает столбцы: их имена, типы и строку, в которой лежат имена. Если `insertSchema` уже сохранил схему на листе, возвращается именно она.",
        "Если ничего не сохранено, лист читается и схема выводится из строки заголовков и значений под ней. В этом случае в результате стоит `inferred: true`, и вызывающий код отличает объявленное описание от угаданного."
      ],
      uk: [
        "Схема описує стовпці: їхні імена, типи та рядок, у якому лежать імена. Якщо `insertSchema` вже зберіг схему на аркуші, повертається саме вона.",
        "Якщо нічого не збережено, аркуш читається і схема виводиться з рядка заголовків та значень під ним. У цьому разі в результаті стоїть `inferred: true`, і код, що викликає, відрізняє оголошений опис від вгаданого."
      ],
      de: [
        "Ein Schema beschreibt die Spalten: ihre Namen, ihre Typen und die Zeile, in der die Namen stehen. Hat `insertSchema` eines auf dem Blatt hinterlegt, kommt genau das zurück.",
        "Wurde nichts hinterlegt, wird das Blatt gelesen und ein Schema aus der Kopfzeile und den Werten darunter abgeleitet. Das Ergebnis trägt dann `inferred: true`, sodass sich eine deklarierte Beschreibung von einer erratenen unterscheiden lässt."
      ],
      fr: [
        "Un schéma décrit les colonnes : leurs noms, leurs types et la ligne où figurent les noms. Si `insertSchema` en a stocké un sur la feuille, c'est celui-là qui revient.",
        "Si rien n'a été stocké, la feuille est lue et un schéma est déduit de la ligne d'en-tête et des valeurs en dessous. Le résultat porte alors `inferred: true`, ce qui permet de distinguer une description déclarée d'une description devinée."
      ]
    },
    params: { sheet: SHEET_PARAM },
    returns: {
      en: "the schema, or `null` when the sheet holds nothing to describe.",
      ru: "схема или `null`, если на листе нечего описывать.",
      uk: "схема або `null`, якщо на аркуші нема чого описувати.",
      de: "das Schema oder `null`, wenn das Blatt nichts zu beschreiben hat.",
      fr: "le schéma, ou `null` si la feuille n'a rien à décrire."
    },
    throws: NOT_A_SHEET,
    title: {
      en: "Reading a schema",
      ru: "Чтение схемы",
      uk: "Читання схеми",
      de: "Ein Schema lesen",
      fr: "Lire un schéma"
    }
  }),

  insertSchema: entry({
    seeAlso: ["getSchema", "removeSchema"],
    examples: code(
      [
        "const sheet = SpreadsheetApp.getActiveSheet();",
        "",
        "insertSchema(sheet, {",
        "  version: 1,",
        "  headerRow: 1,",
        "  columns: [",
        '    { name: "id", type: "number" },',
        '    { name: "email", type: "string" }',
        "  ]",
        "});"
      ].join("\n")
    ),
    summary: {
      en: "Stores a schema on a sheet and applies what it describes.",
      ru: "Сохраняет схему на листе и применяет то, что она описывает.",
      uk: "Зберігає схему на аркуші й застосовує те, що вона описує.",
      de: "Hinterlegt ein Schema auf einem Blatt und wendet an, was es beschreibt.",
      fr: "Stocke un schéma sur une feuille et applique ce qu'il décrit."
    },
    description: {
      en: [
        "The schema is written into the sheet's developer metadata, so it travels with the sheet — a copy of the spreadsheet carries it, and `getSchema` finds it again without reading a single cell.",
        "The description is also put into effect: the header row is written and the columns get the formatting and the validation their types imply."
      ],
      ru: [
        "Схема записывается в developer metadata листа, поэтому путешествует вместе с ним: копия таблицы её сохраняет, а `getSchema` находит её, не читая ни одной ячейки.",
        "Описание при этом применяется: пишется строка заголовков, а столбцы получают форматирование и проверку данных, которые следуют из их типов."
      ],
      uk: [
        "Схема записується в developer metadata аркуша, тому подорожує разом з ним: копія таблиці її зберігає, а `getSchema` знаходить її, не читаючи жодної комірки.",
        "Опис при цьому застосовується: пишеться рядок заголовків, а стовпці отримують форматування та перевірку даних, що випливають з їхніх типів."
      ],
      de: [
        "Das Schema wird in die Developer-Metadaten des Blattes geschrieben und reist damit mit: eine Kopie der Tabelle trägt es mit sich, und `getSchema` findet es wieder, ohne eine Zelle zu lesen.",
        "Die Beschreibung wird zugleich umgesetzt: die Kopfzeile wird geschrieben und die Spalten bekommen Formatierung und Datenprüfung, die sich aus ihren Typen ergeben."
      ],
      fr: [
        "Le schéma est écrit dans les métadonnées développeur de la feuille : il voyage donc avec elle — une copie du classeur l'emporte, et `getSchema` le retrouve sans lire une seule cellule.",
        "La description est aussi mise en œuvre : la ligne d'en-tête est écrite et les colonnes reçoivent le format et la validation qu'impliquent leurs types."
      ]
    },
    params: {
      sheet: SHEET_PARAM,
      schema: {
        en: "The schema: its `version`, the `headerRow` and the `columns`.",
        ru: "Схема: `version`, `headerRow` и `columns`.",
        uk: "Схема: `version`, `headerRow` та `columns`.",
        de: "Das Schema: `version`, `headerRow` und `columns`.",
        fr: "Le schéma : `version`, `headerRow` et `columns`."
      }
    },
    returns: {
      en: "the same sheet.",
      ru: "тот же лист.",
      uk: "той самий аркуш.",
      de: "dasselbe Blatt.",
      fr: "la même feuille."
    },
    throws: NOT_A_SHEET,
    title: {
      en: "Declaring a schema",
      ru: "Объявление схемы",
      uk: "Оголошення схеми",
      de: "Ein Schema festlegen",
      fr: "Déclarer un schéma"
    }
  }),

  removeSchema: entry({
    seeAlso: ["getSchema", "insertSchema"],
    examples: code(
      [
        "const sheet = SpreadsheetApp.getActiveSheet();",
        "",
        "removeSchema(sheet); // => true when one was there",
        "removeSchema(sheet, { validation: true }); // also clears the rules it implied"
      ].join("\n")
    ),
    summary: {
      en: "Removes the schema stored on a sheet.",
      ru: "Удаляет схему, сохранённую на листе.",
      uk: "Видаляє схему, збережену на аркуші.",
      de: "Entfernt das auf einem Blatt hinterlegte Schema.",
      fr: "Supprime le schéma stocké sur une feuille."
    },
    description: {
      en: [
        "The stored description goes; the data and the header row stay exactly as they are. A sheet with no schema stored is left alone and the call reports `false`.",
        "`validation: true` also clears the data validation on the columns the schema described. It is off by default on purpose: Apps Script offers no way to tell a rule the schema created from one a person added by hand, so clearing takes both."
      ],
      ru: [
        "Сохранённое описание удаляется; данные и строка заголовков остаются в точности как были. Лист без сохранённой схемы не трогается, и вызов возвращает `false`.",
        "`validation: true` дополнительно снимает проверку данных со столбцов, которые описывала схема. По умолчанию выключено намеренно: Apps Script не позволяет отличить правило, созданное схемой, от добавленного человеком, поэтому снимаются оба."
      ],
      uk: [
        "Збережений опис видаляється; дані та рядок заголовків лишаються точно як були. Аркуш без збереженої схеми не чіпається, і виклик повертає `false`.",
        "`validation: true` додатково знімає перевірку даних зі стовпців, які описувала схема. Типово вимкнено навмисно: Apps Script не дозволяє відрізнити правило, створене схемою, від доданого людиною, тому знімаються обидва."
      ],
      de: [
        "Die hinterlegte Beschreibung verschwindet; Daten und Kopfzeile bleiben genau so, wie sie sind. Ein Blatt ohne gespeichertes Schema bleibt unangetastet und der Aufruf meldet `false`.",
        "`validation: true` löscht zusätzlich die Datenprüfung der beschriebenen Spalten. Sie ist absichtlich standardmäßig aus: Apps Script bietet keine Möglichkeit, eine vom Schema angelegte Regel von einer handgemachten zu unterscheiden, also trifft das Löschen beide."
      ],
      fr: [
        "La description stockée disparaît ; les données et la ligne d'en-tête restent exactement telles quelles. Une feuille sans schéma stocké n'est pas touchée et l'appel renvoie `false`.",
        "`validation: true` efface en plus la validation des données sur les colonnes décrites. C'est désactivé par défaut à dessein : Apps Script ne permet pas de distinguer une règle créée par le schéma d'une règle ajoutée à la main, et l'effacement emporterait les deux."
      ]
    },
    params: {
      sheet: SHEET_PARAM,
      options: {
        en: "`validation` also clears the data validation the schema implied.",
        ru: "`validation` дополнительно снимает проверку данных, следовавшую из схемы.",
        uk: "`validation` додатково знімає перевірку даних, що випливала зі схеми.",
        de: "`validation` löscht zusätzlich die vom Schema implizierte Datenprüfung.",
        fr: "`validation` efface aussi la validation des données qu'impliquait le schéma."
      }
    },
    returns: {
      en: "`true` when a schema was removed.",
      ru: "`true`, если схема была удалена.",
      uk: "`true`, якщо схему було видалено.",
      de: "`true`, wenn ein Schema entfernt wurde.",
      fr: "`true` si un schéma a été supprimé."
    },
    throws: NOT_A_SHEET,
    title: {
      en: "Removing a schema",
      ru: "Удаление схемы",
      uk: "Видалення схеми",
      de: "Ein Schema entfernen",
      fr: "Supprimer un schéma"
    }
  }),

  updateFormulas: entry({
    seeAlso: ["updateSheetNameInA1Notation", "getValues"],
    examples: code(
      [
        "const sheet = SpreadsheetApp.getActiveSheet();",
        "",
        "// After renaming a sheet, point the formulas at the new name.",
        'updateFormulas(sheet, { "Sheet1": "Data" });',
        "",
        'updateFormulas(sheet, (formula) => formula.replace(/OLD_/g, "NEW_"));'
      ].join("\n")
    ),
    summary: {
      en: "Rewrites the formulas on a sheet.",
      ru: "Переписывает формулы на листе.",
      uk: "Переписує формули на аркуші.",
      de: "Schreibt die Formeln eines Blattes um.",
      fr: "Réécrit les formules d'une feuille."
    },
    description: {
      en: [
        "Pass a map to replace sheet names wholesale — the usual need after a rename or a copy — or a function to decide each formula for itself. The function receives the formula and returns the one to put back.",
        "Only cells that hold a formula are visited, and only the ones that actually changed are written, so a no-op costs one read and nothing else."
      ],
      ru: [
        "Передайте словарь, чтобы заменить имена листов целиком — обычная нужда после переименования или копирования, — или функцию, чтобы решать по каждой формуле отдельно. Функция получает формулу и возвращает ту, что нужно записать.",
        "Обходятся только ячейки с формулами, а записываются только действительно изменившиеся, поэтому вызов без изменений стоит одного чтения и ничего больше."
      ],
      uk: [
        "Передайте словник, щоб замінити імена аркушів цілком — звична потреба після перейменування чи копіювання, — або функцію, щоб вирішувати щодо кожної формули окремо. Функція отримує формулу й повертає ту, яку треба записати.",
        "Обходяться лише комірки з формулами, а записуються лише ті, що справді змінилися, тому виклик без змін коштує одного читання й нічого більше."
      ],
      de: [
        "Übergeben Sie eine Zuordnung, um Blattnamen pauschal zu ersetzen — der übliche Bedarf nach einer Umbenennung oder Kopie — oder eine Funktion, um jede Formel einzeln zu entscheiden. Die Funktion bekommt die Formel und gibt die zurückzuschreibende zurück.",
        "Besucht werden nur Zellen mit Formeln, geschrieben nur die tatsächlich geänderten; ein Aufruf ohne Änderung kostet also einen Lesevorgang und sonst nichts."
      ],
      fr: [
        "Passez une table pour remplacer des noms de feuille en bloc — le besoin habituel après un renommage ou une copie — ou une fonction pour décider de chaque formule. La fonction reçoit la formule et renvoie celle à réécrire.",
        "Seules les cellules contenant une formule sont visitées, et seules celles qui changent réellement sont écrites : un appel sans effet coûte une lecture et rien de plus."
      ]
    },
    params: {
      sheet: SHEET_PARAM,
      rewrite: {
        en: "A map of old sheet name to new one, or a function taking a formula and returning its replacement.",
        ru: "Словарь «старое имя листа → новое» или функция, принимающая формулу и возвращающая замену.",
        uk: "Словник «стара назва аркуша → нова» або функція, що приймає формулу й повертає заміну.",
        de: "Eine Zuordnung von altem zu neuem Blattnamen oder eine Funktion, die eine Formel nimmt und ihren Ersatz zurückgibt.",
        fr: "Une table ancien nom de feuille → nouveau, ou une fonction prenant une formule et renvoyant son remplacement."
      }
    },
    returns: {
      en: "how many formulas were rewritten.",
      ru: "сколько формул было переписано.",
      uk: "скільки формул було переписано.",
      de: "wie viele Formeln umgeschrieben wurden.",
      fr: "le nombre de formules réécrites."
    },
    throws: NOT_A_SHEET,
    title: {
      en: "Rewriting formulas",
      ru: "Переписывание формул",
      uk: "Переписування формул",
      de: "Formeln umschreiben",
      fr: "Réécrire des formules"
    }
  })
};

/** Prose for the row and column operations on a sheet. */

import { code, entry } from "./_entry.mjs";

const SHEET_PARAM = {
  en: "The sheet to write into.",
  ru: "Лист, в который выполняется запись.",
  uk: "Аркуш, у який виконується запис.",
  de: "Das Blatt, in das geschrieben wird.",
  fr: "La feuille où écrire."
};

const THROWS = {
  InvalidSheetException: {
    en: "the first argument is not a sheet.",
    ru: "первый аргумент не является листом.",
    uk: "перший аргумент не є аркушем.",
    de: "das erste Argument ist kein Blatt.",
    fr: "le premier argument n'est pas une feuille."
  },
  TypeError: {
    en: "the values are not a matrix with rows of equal length.",
    ru: "значения не являются матрицей со строками одинаковой длины.",
    uk: "значення не є матрицею з рядками однакової довжини.",
    de: "die Werte sind keine Matrix mit gleich langen Zeilen.",
    fr: "les valeurs ne forment pas une matrice à lignes de même longueur."
  }
};

const RETURNS_SHEET = {
  en: "the same sheet, so calls can be chained.",
  ru: "тот же лист, чтобы вызовы можно было составлять в цепочку.",
  uk: "той самий аркуш, щоб виклики можна було складати в ланцюжок.",
  de: "dasselbe Blatt, damit sich Aufrufe verketten lassen.",
  fr: "la même feuille, ce qui permet d'enchaîner les appels."
};

const FORMULA_NOTE = {
  en: "A cell whose text starts with `=` is written as a formula, not as text — the same rule the editor follows.",
  ru: "Ячейка, текст которой начинается с `=`, записывается как формула, а не как текст — по тому же правилу, что и в редакторе.",
  uk: "Комірка, текст якої починається з `=`, записується як формула, а не як текст — за тим самим правилом, що й у редакторі.",
  de: "Eine Zelle, deren Text mit `=` beginnt, wird als Formel geschrieben, nicht als Text — dieselbe Regel wie im Editor.",
  fr: "Une cellule dont le texte commence par `=` est écrite comme une formule, pas comme du texte — la règle qu'applique l'éditeur."
};

const FROZEN_OPTION = {
  en: "`afterFrozenRows` puts the new rows immediately below the frozen ones instead of at the very top.",
  ru: "`afterFrozenRows` помещает новые строки сразу под закреплёнными, а не в самый верх.",
  uk: "`afterFrozenRows` розміщує нові рядки одразу під закріпленими, а не в самий верх.",
  de: "`afterFrozenRows` setzt die neuen Zeilen direkt unter die fixierten statt ganz nach oben.",
  fr: "`afterFrozenRows` place les nouvelles lignes juste sous les lignes figées plutôt qu'en tout début."
};

const ROW_VALUES = {
  en: "A matrix of rows: one array per row, all of the same length.",
  ru: "Матрица строк: по массиву на строку, все одной длины.",
  uk: "Матриця рядків: по масиву на рядок, усі однієї довжини.",
  de: "Eine Matrix aus Zeilen: ein Array je Zeile, alle gleich lang.",
  fr: "Une matrice de lignes : un tableau par ligne, toutes de même longueur."
};

const ONE_ROW_VALUES = {
  en: "The cells of the single row.",
  ru: "Ячейки одной строки.",
  uk: "Комірки одного рядка.",
  de: "Die Zellen der einen Zeile.",
  fr: "Les cellules de l'unique ligne."
};

function sheetWrite({ seeAlso, summary, first, example }) {
  const description = {};

  for (const codeName of ["en", "ru", "uk", "de", "fr"]) {
    description[codeName] = [first[codeName], FORMULA_NOTE[codeName]];
  }

  return entry({
    seeAlso,
    examples: code(example),
    summary,
    description,
    params: {
      sheet: SHEET_PARAM,
      values: ROW_VALUES,
      options: FROZEN_OPTION
    },
    returns: RETURNS_SHEET,
    throws: THROWS,
    title: { en: "Writing", ru: "Запись", uk: "Запис", de: "Schreiben", fr: "Écriture" }
  });
}

export const FUNCTIONS = {
  appendRows: sheetWrite({
    seeAlso: ["appendRow", "prependRows", "requireConsistent2DArray"],
    summary: {
      en: "Adds rows below the data already on a sheet.",
      ru: "Добавляет строки под уже имеющимися данными листа.",
      uk: "Додає рядки під уже наявними даними аркуша.",
      de: "Fügt Zeilen unter die bereits vorhandenen Daten eines Blattes ein.",
      fr: "Ajoute des lignes sous les données déjà présentes sur une feuille."
    },
    first: {
      en: "Writing starts in column 1 of the first new row, and the sheet is grown by exactly as many rows as the matrix has. Unlike `Sheet#appendRow`, which takes one row at a time, the whole block is written in a single call.",
      ru: "Запись начинается со столбца 1 первой новой строки, и лист растёт ровно на столько строк, сколько их в матрице. В отличие от `Sheet#appendRow`, который принимает по одной строке, весь блок пишется одним вызовом.",
      uk: "Запис починається зі стовпця 1 першого нового рядка, і аркуш зростає рівно на стільки рядків, скільки їх у матриці. На відміну від `Sheet#appendRow`, який приймає по одному рядку, увесь блок пишеться одним викликом.",
      de: "Geschrieben wird ab Spalte 1 der ersten neuen Zeile, und das Blatt wächst um genau so viele Zeilen, wie die Matrix hat. Anders als `Sheet#appendRow`, das eine Zeile auf einmal nimmt, geht der ganze Block in einem Aufruf hinaus.",
      fr: "L'écriture commence en colonne 1 de la première ligne ajoutée, et la feuille grandit d'exactement autant de lignes que la matrice en compte. Contrairement à `Sheet#appendRow`, qui prend une ligne à la fois, le bloc entier part en un seul appel."
    },
    example: [
      "const sheet = SpreadsheetApp.getActiveSheet();",
      "",
      "appendRows(sheet, [",
      '  ["Ada", "ada@example.com"],',
      '  ["Grace", "grace@example.com"]',
      "]);"
    ].join("\n")
  }),

  appendRow: sheetWrite({
    seeAlso: ["appendRows", "prependRow"],
    summary: {
      en: "Adds one row below the data already on a sheet.",
      ru: "Добавляет одну строку под уже имеющимися данными листа.",
      uk: "Додає один рядок під уже наявними даними аркуша.",
      de: "Fügt eine Zeile unter die bereits vorhandenen Daten eines Blattes ein.",
      fr: "Ajoute une ligne sous les données déjà présentes sur une feuille."
    },
    first: {
      en: "`appendRows` with a single row, for when only one is being written. The values go in as a flat array of cells rather than as a matrix.",
      ru: "`appendRows` для одной строки — когда пишется всего одна. Значения передаются плоским массивом ячеек, а не матрицей.",
      uk: "`appendRows` для одного рядка — коли пишеться всього один. Значення передаються плоским масивом комірок, а не матрицею.",
      de: "`appendRows` für eine einzelne Zeile, wenn nur eine geschrieben wird. Die Werte kommen als flaches Array von Zellen statt als Matrix.",
      fr: "`appendRows` pour une seule ligne, quand une seule est écrite. Les valeurs sont passées comme un tableau plat de cellules plutôt qu'une matrice."
    },
    example: [
      "const sheet = SpreadsheetApp.getActiveSheet();",
      "",
      'appendRow(sheet, ["Ada", "ada@example.com", "=TODAY()"]);'
    ].join("\n")
  }),

  prependRows: sheetWrite({
    seeAlso: ["prependRow", "appendRows"],
    summary: {
      en: "Inserts rows above the data already on a sheet.",
      ru: "Вставляет строки над уже имеющимися данными листа.",
      uk: "Вставляє рядки над уже наявними даними аркуша.",
      de: "Fügt Zeilen über den bereits vorhandenen Daten eines Blattes ein.",
      fr: "Insère des lignes au-dessus des données déjà présentes sur une feuille."
    },
    first: {
      en: "Room is made at the top of the data area and the matrix is written into it, so nothing already on the sheet is overwritten. Frozen rows stay frozen where they are.",
      ru: "Место освобождается в верхней части области данных, и матрица пишется туда, поэтому уже имеющееся на листе не перезаписывается. Закреплённые строки остаются на месте.",
      uk: "Місце звільняється у верхній частині області даних, і матриця пишеться туди, тому наявне на аркуші не перезаписується. Закріплені рядки лишаються на місці.",
      de: "Am Kopf des Datenbereichs wird Platz geschaffen und die Matrix dort hineingeschrieben, vorhandene Daten werden also nicht überschrieben. Fixierte Zeilen bleiben, wo sie sind.",
      fr: "De la place est faite en haut de la zone de données et la matrice y est écrite : rien de ce qui est déjà sur la feuille n'est écrasé. Les lignes figées restent où elles sont."
    },
    example: [
      "const sheet = SpreadsheetApp.getActiveSheet();",
      "",
      'prependRows(sheet, [["id", "name"]], { afterFrozenRows: true });'
    ].join("\n")
  }),

  prependRow: sheetWrite({
    seeAlso: ["prependRows", "appendRow"],
    summary: {
      en: "Inserts one row above the data already on a sheet.",
      ru: "Вставляет одну строку над уже имеющимися данными листа.",
      uk: "Вставляє один рядок над уже наявними даними аркуша.",
      de: "Fügt eine Zeile über den bereits vorhandenen Daten eines Blattes ein.",
      fr: "Insère une ligne au-dessus des données déjà présentes sur une feuille."
    },
    first: {
      en: "`prependRows` with a single row. The values go in as a flat array of cells rather than as a matrix.",
      ru: "`prependRows` для одной строки. Значения передаются плоским массивом ячеек, а не матрицей.",
      uk: "`prependRows` для одного рядка. Значення передаються плоским масивом комірок, а не матрицею.",
      de: "`prependRows` für eine einzelne Zeile. Die Werte kommen als flaches Array von Zellen statt als Matrix.",
      fr: "`prependRows` pour une seule ligne. Les valeurs sont passées comme un tableau plat de cellules plutôt qu'une matrice."
    },
    example: [
      "const sheet = SpreadsheetApp.getActiveSheet();",
      "",
      'prependRow(sheet, ["id", "name", "email"]);'
    ].join("\n")
  }),

  appendColumns: sheetWrite({
    seeAlso: ["appendColumn", "prependColumns", "transpose"],
    summary: {
      en: "Adds columns to the right of the data already on a sheet.",
      ru: "Добавляет столбцы справа от уже имеющихся данных листа.",
      uk: "Додає стовпці праворуч від уже наявних даних аркуша.",
      de: "Fügt Spalten rechts neben den bereits vorhandenen Daten eines Blattes ein.",
      fr: "Ajoute des colonnes à droite des données déjà présentes sur une feuille."
    },
    first: {
      en: "The matrix is read as columns: one array per column, written from row 1 rightwards of the last column that holds data. `transpose` is what turns rows into that shape.",
      ru: "Матрица читается как столбцы: по массиву на столбец, запись идёт с первой строки правее последнего столбца с данными. Привести строки к этой форме помогает `transpose`.",
      uk: "Матриця читається як стовпці: по масиву на стовпець, запис іде з першого рядка праворуч від останнього стовпця з даними. Привести рядки до цієї форми допомагає `transpose`.",
      de: "Die Matrix wird als Spalten gelesen: ein Array je Spalte, geschrieben ab Zeile 1 rechts neben der letzten Spalte mit Daten. `transpose` bringt Zeilen in diese Form.",
      fr: "La matrice est lue comme des colonnes : un tableau par colonne, écrit à partir de la ligne 1, à droite de la dernière colonne contenant des données. `transpose` met des lignes dans cette forme."
    },
    example: [
      "const sheet = SpreadsheetApp.getActiveSheet();",
      "",
      'appendColumns(sheet, [["total", "=SUM(A2:A)"]]);'
    ].join("\n")
  }),

  appendColumn: sheetWrite({
    seeAlso: ["appendColumns", "prependColumn"],
    summary: {
      en: "Adds one column to the right of the data already on a sheet.",
      ru: "Добавляет один столбец справа от уже имеющихся данных листа.",
      uk: "Додає один стовпець праворуч від уже наявних даних аркуша.",
      de: "Fügt eine Spalte rechts neben den bereits vorhandenen Daten eines Blattes ein.",
      fr: "Ajoute une colonne à droite des données déjà présentes sur une feuille."
    },
    first: {
      en: "`appendColumns` with a single column. The values go in as a flat array of cells, top to bottom.",
      ru: "`appendColumns` для одного столбца. Значения передаются плоским массивом ячеек, сверху вниз.",
      uk: "`appendColumns` для одного стовпця. Значення передаються плоским масивом комірок, згори вниз.",
      de: "`appendColumns` für eine einzelne Spalte. Die Werte kommen als flaches Array von Zellen, von oben nach unten.",
      fr: "`appendColumns` pour une seule colonne. Les valeurs sont passées comme un tableau plat de cellules, de haut en bas."
    },
    example: [
      "const sheet = SpreadsheetApp.getActiveSheet();",
      "",
      'appendColumn(sheet, ["status", "new", "new"]);'
    ].join("\n")
  }),

  prependColumns: sheetWrite({
    seeAlso: ["prependColumn", "appendColumns"],
    summary: {
      en: "Inserts columns to the left of the data already on a sheet.",
      ru: "Вставляет столбцы слева от уже имеющихся данных листа.",
      uk: "Вставляє стовпці ліворуч від уже наявних даних аркуша.",
      de: "Fügt Spalten links neben den bereits vorhandenen Daten eines Blattes ein.",
      fr: "Insère des colonnes à gauche des données déjà présentes sur une feuille."
    },
    first: {
      en: "Room is made before the first column of the data area and the matrix is written into it, one array per column, so nothing already on the sheet is overwritten.",
      ru: "Место освобождается перед первым столбцом области данных, и матрица пишется туда — по массиву на столбец, — поэтому имеющееся на листе не перезаписывается.",
      uk: "Місце звільняється перед першим стовпцем області даних, і матриця пишеться туди — по масиву на стовпець, — тому наявне на аркуші не перезаписується.",
      de: "Vor der ersten Spalte des Datenbereichs wird Platz geschaffen und die Matrix dort hineingeschrieben, ein Array je Spalte; vorhandene Daten bleiben unangetastet.",
      fr: "De la place est faite avant la première colonne de la zone de données et la matrice y est écrite, un tableau par colonne : rien d'existant n'est écrasé."
    },
    example: [
      "const sheet = SpreadsheetApp.getActiveSheet();",
      "",
      'prependColumns(sheet, [["#", "1", "2"]]);'
    ].join("\n")
  }),

  prependColumn: sheetWrite({
    seeAlso: ["prependColumns", "appendColumn"],
    summary: {
      en: "Inserts one column to the left of the data already on a sheet.",
      ru: "Вставляет один столбец слева от уже имеющихся данных листа.",
      uk: "Вставляє один стовпець ліворуч від уже наявних даних аркуша.",
      de: "Fügt eine Spalte links neben den bereits vorhandenen Daten eines Blattes ein.",
      fr: "Insère une colonne à gauche des données déjà présentes sur une feuille."
    },
    first: {
      en: "`prependColumns` with a single column. The values go in as a flat array of cells, top to bottom.",
      ru: "`prependColumns` для одного столбца. Значения передаются плоским массивом ячеек, сверху вниз.",
      uk: "`prependColumns` для одного стовпця. Значення передаються плоским масивом комірок, згори вниз.",
      de: "`prependColumns` für eine einzelne Spalte. Die Werte kommen als flaches Array von Zellen, von oben nach unten.",
      fr: "`prependColumns` pour une seule colonne. Les valeurs sont passées comme un tableau plat de cellules, de haut en bas."
    },
    example: [
      "const sheet = SpreadsheetApp.getActiveSheet();",
      "",
      'prependColumn(sheet, ["#", "1", "2"]);'
    ].join("\n")
  })
};

// The singular forms take a flat row or column rather than a matrix.
for (const name of ["appendRow", "prependRow", "appendColumn", "prependColumn"]) {
  for (const language of ["en", "ru", "uk", "de", "fr"]) {
    FUNCTIONS[name][language].params.values = ONE_ROW_VALUES[language];
  }
}

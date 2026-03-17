export * from "./types";

// TODO: Abstract Sheet
// TODO: Abstract Menu

export * from "./isCellGridRange";

export * from "./isGridRangeContainedIn";

export * from "./isGridRangeSameDimensions";

export * from "./isRange";

export * from "./isRichTextValue";

export * from "./isSheet";

export * from "./isSpreadsheet";

export * from "./isTextStyle";

export * from "./isValidSheetId";

export * from "./isValidSheetName";

export * from "./isValidSpreadsheetId";

// TODO: nonCellGridRange
// TODO: nonGridRangeContainedIn
// TODO: nonGridRangeSameDimensions
export * from "./nonRange";

// TODO: nonRichTextValue
export * from "./nonSheet";
// TODO: nonSpreadsheet
// TODO: nonTextStyle
// TODO: nonValidSheetName
// TODO: nonValidSpreadsheetId

// TODO: requireCellGridRange
// TODO: requireGridRangeContainedIn
// TODO: requireGridRangeSameDimensions
export * from "./requireRange";

// TODO: requireRichTextValue
export * from "./requireSheet";

export * from "./requireSpreadsheet";
// TODO: requireTextStyle
// TODO: requireValidSheetName
// TODO: requireValidSpreadsheetId

// TODO: prependColumn
// TODO: prependColumns
export * from "./appendColumn";

export * from "./appendColumns";

export * from "./prependRow";

export * from "./prependRows";

export * from "./appendRow";

export * from "./appendRows";

export * from "./convertRichTextToHtml";

export * from "./doGridRangesIntersect";

export * from "./extractRangeFromA1Notation";

export * from "./extractSheetNameFromA1Notation";

export * from "./getColumnIndexByLetter";

export * from "./getColumnLetterByIndex";

export * from "./getSheetById";

export * from "./getSheetByIndex";

// TODO: getValues(sheet: Sheet, config: Object)
// TODO: clearColumnsByConditional(sheet: Sheet, callback: Function)
// TODO: clearRowsByConditional(sheet: Sheet, callback: Function)
// TODO: deleteRowsByConditional(sheet: Sheet, callback: Function)
// TODO: deleteColumnsByConditional(sheet: Sheet, callback: Function)
// TODO: updateFormulas(sheet: Sheet)
// TODO: getNamedRangeByName(name: string)
// TODO: insertSchema
// TODO: getSchema(sheet: Sheet)
// TODO: removeSchema(sheet: Sheet)
export * from "./highlightHtml";

export * from "./sortSheets";

export * from "./parseA1Notation";

export * from "./parseA1Notations";

export * from "./toA1Notation";

export * from "./updateSheetNameInA1Notation";

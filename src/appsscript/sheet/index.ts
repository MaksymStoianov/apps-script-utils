export * from "./types";

// TODO: Abstract Sheet
// TODO: Abstract Menu

export { isCellGridRange } from "./isCellGridRange";
export { isGridRangeContainedIn } from "./isGridRangeContainedIn";
export { isGridRangeSameDimensions } from "./isGridRangeSameDimensions";
export { isRange } from "./isRange";
export { isRichTextValue } from "./isRichTextValue";
export { isSheet } from "./isSheet";
export { isSpreadsheet } from "./isSpreadsheet";
export { isTextStyle } from "./isTextStyle";
export { isValidSheetId } from "./isValidSheetId";
export { isValidSheetName } from "./isValidSheetName";
export { isValidSpreadsheetId } from "./isValidSpreadsheetId";

// TODO: nonCellGridRange
// TODO: nonGridRangeContainedIn
// TODO: nonGridRangeSameDimensions
export { nonRange } from "./nonRange";
// TODO: nonRichTextValue
export { nonSheet } from "./nonSheet";
// TODO: nonSpreadsheet
// TODO: nonTextStyle
// TODO: nonValidSheetName
// TODO: nonValidSpreadsheetId

// TODO: requireCellGridRange
// TODO: requireGridRangeContainedIn
// TODO: requireGridRangeSameDimensions
export { requireRange } from "./requireRange";
// TODO: requireRichTextValue
export { requireSheet } from "./requireSheet";
// TODO: requireSpreadsheet
// TODO: requireTextStyle
// TODO: requireValidSheetName
// TODO: requireValidSpreadsheetId

// TODO: prependColumn
// TODO: prependColumns
export { appendColumn } from "./appendColumn";
export { appendColumns } from "./appendColumns";
export { prependRow } from "./prependRow";
export { prependRows } from "./prependRows";
export { appendRow } from "./appendRow";
export { appendRows } from "./appendRows";
export { convertRichTextToHtml } from "./convertRichTextToHtml";
export { doGridRangesIntersect } from "./doGridRangesIntersect";
export { extractRangeFromA1Notation } from "./extractRangeFromA1Notation";
export { extractSheetNameFromA1Notation } from "./extractSheetNameFromA1Notation";
export { getColumnIndexByLetter } from "./getColumnIndexByLetter";
export { getColumnLetterByIndex } from "./getColumnLetterByIndex";
export { getSheetById } from "./getSheetById";
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
export { highlightHtml } from "./highlightHtml";
export { sortSheets } from "./sortSheets";

export { parseA1Notation } from "./parseA1Notation";
export {
  parseA1Notations,
  type A1NotationParseOptions
} from "./parseA1Notations";

export { toA1Notation } from "./toA1Notation";
export { updateSheetNameInA1Notation } from "./updateSheetNameInA1Notation";

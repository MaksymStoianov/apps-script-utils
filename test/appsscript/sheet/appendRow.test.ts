import { appendRow } from "@/appsscript";
import { InvalidSheetException } from "@/exception";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

type Mutable = Record<string, unknown>;

/**
 * Records every write so the test can assert where the values landed.
 */
interface Written {
  row: number;
  column: number;
  numRows: number;
  numColumns: number;
  values: unknown[][];
}

interface SheetMock {
  sheet: GoogleAppsScript.Spreadsheet.Sheet;
  written: Written[];
}

/**
 * A stand-in sheet: reports its own name and records range writes.
 */
function sheetMock(lastRow = 0, lastColumn = 0, frozenRows = 0, frozenColumns = 0): SheetMock {
  const written: Written[] = [];

  const sheet = {
    toString: () => "Sheet",
    getLastRow: () => lastRow,
    getLastColumn: () => lastColumn,
    getMaxRows: () => 1000,
    getMaxColumns: () => 26,
    insertRowsAfter: () => undefined,
    insertColumnsAfter: () => undefined,
    getFrozenRows: () => frozenRows,
    getFrozenColumns: () => frozenColumns,
    insertRowsBefore: () => undefined,
    insertColumnsBefore: () => undefined,
    getRange: (row: number, column: number, numRows: number, numColumns: number) => ({
      setValues: (values: unknown[][]) => {
        written.push({ row, column, numRows, numColumns, values });
      }
    })
  } as unknown as GoogleAppsScript.Spreadsheet.Sheet;

  return { sheet, written };
}

/**
 * A stand-in range: knows where it sits and what it holds.
 */
function rangeMock(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  row: number,
  column: number,
  values: unknown[][]
): GoogleAppsScript.Spreadsheet.Range {
  return {
    toString: () => "Range",
    getSheet: () => sheet,
    getRow: () => row,
    getColumn: () => column,
    getNumRows: () => values.length,
    getNumColumns: () => values[0].length,
    getValues: () => values
  } as unknown as GoogleAppsScript.Spreadsheet.Range;
}

/**
 * LockService is used for the document lock; a no-op stand-in suffices.
 */
function installLockService(): void {
  (globalThis as Mutable).LockService = {
    getDocumentLock: () => ({
      waitLock: () => undefined,
      releaseLock: () => undefined
    })
  };
}

beforeEach(() => {
  installLockService();
});

afterEach(() => {
  delete (globalThis as Mutable).LockService;
});

describe("appendRow", () => {
  describe("Correct input data", () => {
    it("should write a single row below the last one", () => {
      const { sheet, written } = sheetMock(2);

      appendRow(sheet, ["a", "b"]);

      expect(written).toEqual([
        { row: 3, column: 1, numRows: 1, numColumns: 2, values: [["a", "b"]] }
      ]);
    });

    it("should return the sheet", () => {
      const { sheet } = sheetMock(0);

      expect(appendRow(sheet, ["a"])).toBe(sheet);
    });

    it("should pass options through to appendRows", () => {
      const { sheet, written } = sheetMock(0, 0, 2);

      appendRow(sheet, ["a"], { afterFrozenRows: true });

      expect(written[0].row).toBe(3);
    });
  });

  describe("Appending within a range", () => {
    it("should write below the last populated row of the range", () => {
      const { sheet, written } = sheetMock(50);

      appendRow(rangeMock(sheet, 1, 2, [["x"], [""], [""]]), ["a", "b"]);

      expect(written).toEqual([
        { row: 2, column: 2, numRows: 1, numColumns: 2, values: [["a", "b"]] }
      ]);
    });

    it("should write at the first row of an empty range", () => {
      const { sheet, written } = sheetMock(0);

      appendRow(rangeMock(sheet, 4, 1, [[""], [""]]), ["a"]);

      expect(written[0].row).toBe(4);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for anything that is neither a Sheet nor a Range", () => {
      // @ts-expect-error - testing invalid types
      expect(() => appendRow({}, ["a"])).toThrow(InvalidSheetException);
      // @ts-expect-error - testing invalid types
      expect(() => appendRow("A1:B2", ["a"])).toThrow(InvalidSheetException);
    });

    it("should throw when the row is not an array", () => {
      const { sheet } = sheetMock(0);

      expect(() => appendRow(sheet, "a")).toThrow();
      expect(() => appendRow(sheet, null)).toThrow();
    });
  });
});

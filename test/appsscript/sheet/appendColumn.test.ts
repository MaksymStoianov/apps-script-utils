import { appendColumn } from "@/appsscript";
import { InvalidSheetException } from "@/exception";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

type Mutable = Record<string, unknown>;

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

  const inserted: Array<[string, number, number]> = [];

  const sheet = {
    toString: () => "Sheet",
    getLastRow: () => lastRow,
    getLastColumn: () => lastColumn,
    getMaxRows: () => 1000,
    getMaxColumns: () => 26,
    getFrozenRows: () => frozenRows,
    getFrozenColumns: () => frozenColumns,
    insertRowsBefore: (position: number, howMany: number) => {
      inserted.push(["rows", position, howMany]);
    },
    insertColumnsBefore: (position: number, howMany: number) => {
      inserted.push(["columns", position, howMany]);
    },
    getRange: (row: number, column: number, numRows: number, numColumns: number) => ({
      setValues: (values: unknown[][]) => {
        written.push({ row, column, numRows, numColumns, values });
      }
    })
  } as unknown as GoogleAppsScript.Spreadsheet.Sheet;

  return { sheet, written, inserted };
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

describe("appendColumn", () => {
  describe("Correct input data", () => {
    it("should write in a single range call", () => {
      const { sheet, written } = sheetMock(0, 2);

      appendColumn(sheet, ["a", "b"]);

      expect(written).toHaveLength(1);
    });

    it("should write the values down one column, not across a row", () => {
      const { sheet, written } = sheetMock(0, 2);

      appendColumn(sheet, ["a", "b"]);

      expect(written[0]).toEqual({
        row: 1,
        column: 3,
        numRows: 2,
        numColumns: 1,
        values: [["a"], ["b"]]
      });
    });

    it("should write after the last populated column", () => {
      const { sheet, written } = sheetMock(0, 2);

      appendColumn(sheet, ["a"]);

      expect(written[0].column).toBe(3);
    });

    it("should return the sheet", () => {
      const { sheet } = sheetMock();

      expect(appendColumn(sheet, ["a"])).toBe(sheet);
    });
  });

  describe("Appending within a range", () => {
    it("should write after the last populated column of the range", () => {
      const { sheet, written } = sheetMock(0, 20);

      appendColumn(
        rangeMock(sheet, 1, 1, [
          ["x", "", ""],
          ["y", "", ""]
        ]),
        ["a", "b"]
      );

      expect(written[0]).toEqual({
        row: 1,
        column: 2,
        numRows: 2,
        numColumns: 1,
        values: [["a"], ["b"]]
      });
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for anything that is neither a Sheet nor a Range", () => {
      // @ts-expect-error - testing invalid types
      expect(() => appendColumn({}, ["a"])).toThrow(InvalidSheetException);
      // @ts-expect-error - testing invalid types
      expect(() => appendColumn("A1:B2", ["a"])).toThrow(InvalidSheetException);
    });

    it("should throw when the column is not an array", () => {
      const { sheet } = sheetMock();

      expect(() => appendColumn(sheet, "a")).toThrow();
      expect(() => appendColumn(sheet, null)).toThrow();
    });
  });
});

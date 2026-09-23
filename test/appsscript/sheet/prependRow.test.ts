import { prependRow } from "@/appsscript";
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
 * A stand-in range: knows where it sits and how big it is.
 */
function rangeMock(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  row: number,
  column: number,
  numRows = 10,
  numColumns = 4
): GoogleAppsScript.Spreadsheet.Range {
  return {
    toString: () => "Range",
    getSheet: () => sheet,
    getRow: () => row,
    getColumn: () => column,
    getNumRows: () => numRows,
    getNumColumns: () => numColumns,
    getValues: () => Array.from({ length: numRows }, () => new Array(numColumns).fill(""))
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

describe("prependRow", () => {
  describe("Correct input data", () => {
    it("should insert a single row at the top", () => {
      const { sheet, written, inserted } = sheetMock(3);

      prependRow(sheet, ["a", "b"]);

      expect(inserted).toContainEqual(["rows", 1, 1]);
      expect(written[0].row).toBe(1);
      expect(written[0].values).toEqual([["a", "b"]]);
    });

    it("should return the sheet", () => {
      const { sheet } = sheetMock();

      expect(prependRow(sheet, ["a"])).toBe(sheet);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for anything that is not a Sheet", () => {
      // @ts-expect-error - testing invalid types
      expect(() => prependRow({}, ["a"])).toThrow(InvalidSheetException);
    });

    it("should throw when the row is not an array", () => {
      const { sheet } = sheetMock();

      expect(() => prependRow(sheet, "a")).toThrow();
    });
  });

  describe("Inserting at a range", () => {
    it("should insert above the first row of the range and write on its columns", () => {
      const { sheet, written } = sheetMock(20, 5);

      prependRow(rangeMock(sheet, 4, 2), ["a", "b"]);

      expect(written).toEqual([
        { row: 4, column: 2, numRows: 1, numColumns: 2, values: [["a", "b"]] }
      ]);
    });
  });
});

import { prependRows } from "@/appsscript";
import { IllegalArgumentException, InvalidSheetException } from "@/exception";
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

describe("prependRows", () => {
  describe("Correct input data", () => {
    it("should insert rows before writing", () => {
      const { sheet, inserted } = sheetMock(5);

      prependRows(sheet, [
        [1, 2],
        [3, 4]
      ]);

      expect(inserted).toContainEqual(["rows", 1, 2]);
    });

    it("should write at the top of the sheet", () => {
      const { sheet, written } = sheetMock(5);

      prependRows(sheet, [["a", "b"]]);

      expect(written).toHaveLength(1);
      expect(written[0].row).toBe(1);
      expect(written[0].column).toBe(1);
    });

    it("should return the sheet", () => {
      const { sheet } = sheetMock();

      expect(prependRows(sheet, [["a"]])).toBe(sheet);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw when called without arguments", () => {
      // @ts-expect-error - testing invalid arity
      expect(() => prependRows()).toThrow(IllegalArgumentException);
    });

    it("should throw for anything that is not a Sheet", () => {
      // @ts-expect-error - testing invalid types
      expect(() => prependRows({}, [["a"]])).toThrow(InvalidSheetException);
    });

    it("should throw for values that are not a consistent 2D array", () => {
      const { sheet } = sheetMock();

      expect(() => prependRows(sheet, ["a"])).toThrow();
      expect(() => prependRows(sheet, [])).toThrow();
    });

    it("should not insert anything when the values are rejected", () => {
      const { sheet, inserted } = sheetMock();

      expect(() => prependRows(sheet, ["a"])).toThrow();
      expect(inserted).toEqual([]);
    });
  });

  describe("Inserting at a range", () => {
    it("should insert above the first row of the range", () => {
      const { sheet, inserted } = sheetMock(20, 5);

      prependRows(rangeMock(sheet, 4, 2), [["a", "b"]]);

      expect(inserted).toContainEqual(["rows", 4, 1]);
    });

    it("should write the values on the columns of the range", () => {
      const { sheet, written } = sheetMock(20, 5);

      prependRows(rangeMock(sheet, 4, 2), [["a", "b"]]);

      expect(written).toEqual([
        { row: 4, column: 2, numRows: 1, numColumns: 2, values: [["a", "b"]] }
      ]);
    });

    it("should throw for a first argument that is neither a sheet nor a range", () => {
      // @ts-expect-error - testing invalid types
      expect(() => prependRows("A1:B2", [["a"]])).toThrow(InvalidSheetException);
    });
  });

  describe("When the write fails", () => {
    it("should let the original error through, not its message", () => {
      const { sheet } = sheetMock(0, 0);

      const boom = new Error("Service unavailable.");

      // @ts-expect-error - the stand-in is narrower than the real Sheet
      sheet.getRange = () => ({
        setValues: () => {
          throw boom;
        }
      });

      expect(() => prependRows(sheet, [["a"]])).toThrow(boom);
    });
  });
});

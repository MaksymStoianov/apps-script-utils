import { appendRows } from "@/appsscript";
import { IllegalArgumentException, InvalidSheetException } from "@/exception";
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

describe("appendRows", () => {
  describe("Correct input data", () => {
    it("should write below the last row", () => {
      const { sheet, written } = sheetMock(5);

      appendRows(sheet, [
        [1, 2],
        [3, 4]
      ]);

      expect(written).toEqual([
        {
          row: 6,
          column: 1,
          numRows: 2,
          numColumns: 2,
          values: [
            [1, 2],
            [3, 4]
          ]
        }
      ]);
    });

    it("should write to the first row of an empty sheet", () => {
      const { sheet, written } = sheetMock(0);

      appendRows(sheet, [["a"]]);

      expect(written[0].row).toBe(1);
    });

    it("should return the sheet, so calls can be chained", () => {
      const { sheet } = sheetMock(0);

      expect(appendRows(sheet, [["a"]])).toBe(sheet);
    });

    it("should write in a single range call regardless of row count", () => {
      const { sheet, written } = sheetMock(0);

      appendRows(sheet, [["a"], ["b"], ["c"], ["d"]]);

      expect(written).toHaveLength(1);
      expect(written[0].numRows).toBe(4);
    });
  });

  describe("Frozen rows", () => {
    it("should start below the frozen rows when asked", () => {
      const { sheet, written } = sheetMock(0, 0, 3);

      appendRows(sheet, [["a"]], { afterFrozenRows: true });

      expect(written[0].row).toBe(4);
    });

    it("should ignore them by default", () => {
      const { sheet, written } = sheetMock(0, 0, 3);

      appendRows(sheet, [["a"]]);

      expect(written[0].row).toBe(1);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw when called without arguments", () => {
      // @ts-expect-error - testing invalid arity
      expect(() => appendRows()).toThrow(IllegalArgumentException);
    });

    it("should throw for anything that is not a Sheet", () => {
      // @ts-expect-error - testing invalid types
      expect(() => appendRows({}, [["a"]])).toThrow(InvalidSheetException);
      // @ts-expect-error - testing invalid types
      expect(() => appendRows(null, [["a"]])).toThrow(InvalidSheetException);
    });

    // The thrown type is currently whatever `isConsistent2DArray` raises,
    // because that predicate throws instead of returning false (#362). Once
    // #374 lands it returns false and `appendRows` raises its own TypeError.
    it("should throw for values that are not a consistent 2D array", () => {
      const { sheet } = sheetMock(0);

      expect(() => appendRows(sheet, ["a", "b"])).toThrow();
      expect(() => appendRows(sheet, [["a"], ["b", "c"]])).toThrow();
      expect(() => appendRows(sheet, [])).toThrow();
      expect(() => appendRows(sheet, null)).toThrow();
    });

    it("should not write anything when the values are rejected", () => {
      const { sheet, written } = sheetMock(0);

      expect(() => appendRows(sheet, ["a", "b"])).toThrow();
      expect(written).toEqual([]);
    });
  });
});

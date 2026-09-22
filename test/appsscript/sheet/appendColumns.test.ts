import { appendColumns } from "@/appsscript";
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

describe("appendColumns", () => {
  describe("Correct input data", () => {
    it("should write in a single range call", () => {
      const { sheet, written } = sheetMock(0, 3);

      appendColumns(sheet, [
        ["a", "b"],
        ["c", "d"]
      ]);

      expect(written).toHaveLength(1);
    });

    it("should return the sheet", () => {
      const { sheet } = sheetMock();

      expect(appendColumns(sheet, [["a"]])).toBe(sheet);
    });

    it("should write in a single range call", () => {
      const { sheet, written } = sheetMock();

      appendColumns(sheet, [["a", "b", "c", "d"]]);

      expect(written).toHaveLength(1);
    });
  });

  // The row variant writes at `lastRow + 1`; this one writes at `lastColumn`,
  // so it lands on top of the last populated column and, on an empty sheet,
  // asks for column 0 — which Apps Script rejects. Tracked in #450; these
  // assertions change when it is fixed.
  describe("Known defect: the target column is off by one", () => {
    it("should currently write onto the last populated column", () => {
      const { sheet, written } = sheetMock(0, 3);

      appendColumns(sheet, [["a"]]);

      expect(written[0].column).toBe(3);
    });

    it("should currently ask for column zero on an empty sheet", () => {
      const { sheet, written } = sheetMock(0, 0);

      appendColumns(sheet, [["a"]]);

      expect(written[0].column).toBe(0);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw when called without arguments", () => {
      // @ts-expect-error - testing invalid arity
      expect(() => appendColumns()).toThrow(IllegalArgumentException);
    });

    it("should throw for anything that is not a Sheet", () => {
      // @ts-expect-error - testing invalid types
      expect(() => appendColumns({}, [["a"]])).toThrow(InvalidSheetException);
      // @ts-expect-error - testing invalid types
      expect(() => appendColumns(null, [["a"]])).toThrow(InvalidSheetException);
    });

    it("should throw for values that are not a consistent 2D array", () => {
      const { sheet } = sheetMock();

      expect(() => appendColumns(sheet, ["a"])).toThrow();
      expect(() => appendColumns(sheet, [])).toThrow();
      expect(() => appendColumns(sheet, null)).toThrow();
    });

    it("should not write anything when the values are rejected", () => {
      const { sheet, written } = sheetMock();

      expect(() => appendColumns(sheet, ["a"])).toThrow();
      expect(written).toEqual([]);
    });
  });
});

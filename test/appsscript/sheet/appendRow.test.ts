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

  describe("Incorrect input data", () => {
    it("should throw for anything that is not a Sheet", () => {
      // @ts-expect-error - testing invalid types
      expect(() => appendRow({}, ["a"])).toThrow(InvalidSheetException);
    });

    it("should throw when the row is not an array", () => {
      const { sheet } = sheetMock(0);

      expect(() => appendRow(sheet, "a")).toThrow();
      expect(() => appendRow(sheet, null)).toThrow();
    });
  });
});

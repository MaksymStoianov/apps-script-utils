import { prependColumn } from "@/appsscript";
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
  inserted: Array<[number, number]>;
}

/**
 * A stand-in sheet: reports its own name and records inserts and range writes.
 */
function sheetMock(lastColumn = 3, frozenColumns = 0): SheetMock {
  const written: Written[] = [];

  const inserted: Array<[number, number]> = [];

  const sheet = {
    toString: () => "Sheet",
    getLastRow: () => 10,
    getLastColumn: () => lastColumn,
    getMaxColumns: () => 26,
    getFrozenColumns: () => frozenColumns,
    setFrozenColumns: () => undefined,
    insertColumnsBefore: (position: number, howMany: number) => {
      inserted.push([position, howMany]);
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

describe("prependColumn", () => {
  describe("Correct input data", () => {
    it("should write the values downwards, one entry per row", () => {
      const { sheet, written } = sheetMock();

      prependColumn(sheet, ["Name", "Ada", "Grace"]);

      expect(written).toStrictEqual([
        {
          row: 1,
          column: 1,
          numRows: 3,
          numColumns: 1,
          values: [["Name"], ["Ada"], ["Grace"]]
        }
      ]);
    });

    it("should insert exactly one column", () => {
      const { sheet, inserted } = sheetMock();

      prependColumn(sheet, ["a"]);

      expect(inserted).toStrictEqual([[1, 1]]);
    });

    it("should insert an empty column when no values are given", () => {
      const { sheet, written, inserted } = sheetMock();

      prependColumn(sheet);

      expect(inserted).toStrictEqual([[1, 1]]);
      expect(written).toStrictEqual([]);
    });

    it("should treat null values as no values", () => {
      const { sheet, written } = sheetMock();

      prependColumn(sheet, null);

      expect(written).toStrictEqual([]);
    });

    it("should shift the existing data right", () => {
      const { sheet, inserted } = sheetMock(5);

      prependColumn(sheet, ["a"]);

      expect(inserted).toStrictEqual([[1, 1]]);
    });

    it("should not insert on an empty sheet, where nothing has to shift", () => {
      const { sheet, written, inserted } = sheetMock(0);

      prependColumn(sheet, ["a"]);

      expect(inserted).toStrictEqual([]);
      expect(written).toHaveLength(1);
    });

    it("should insert after the frozen columns when asked", () => {
      const { sheet, inserted, written } = sheetMock(5, 2);

      prependColumn(sheet, ["a"], { afterFrozenColumns: true });

      expect(inserted).toStrictEqual([[3, 1]]);
      expect(written[0].column).toBe(3);
    });

    it("should return the sheet", () => {
      const { sheet } = sheetMock();

      expect(prependColumn(sheet, ["a"])).toBe(sheet);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for anything that is not a sheet", () => {
      expect(() => prependColumn({} as GoogleAppsScript.Spreadsheet.Sheet, ["a"])).toThrow(
        InvalidSheetException
      );
      expect(() => prependColumn(null as unknown as GoogleAppsScript.Spreadsheet.Sheet)).toThrow(
        InvalidSheetException
      );
    });

    it("should throw for an empty values array", () => {
      const { sheet } = sheetMock();

      expect(() => prependColumn(sheet, [])).toThrow(IllegalArgumentException);
    });

    it("should throw when the values are not an array", () => {
      const { sheet } = sheetMock();

      expect(() => prependColumn(sheet, "abc" as unknown as unknown[])).toThrow(
        IllegalArgumentException
      );
      expect(() => prependColumn(sheet, 42 as unknown as unknown[])).toThrow(
        IllegalArgumentException
      );
    });

    it("should not insert anything when the values are rejected", () => {
      const { sheet, inserted } = sheetMock();

      expect(() => prependColumn(sheet, [])).toThrow(IllegalArgumentException);
      expect(inserted).toStrictEqual([]);
    });
  });

  describe("Inserting at a range", () => {
    it("should insert before the first column of the range and write on its rows", () => {
      const { sheet, written, inserted } = sheetMock();

      prependColumn(rangeMock(sheet, 4, 3), ["Name", "Ada"]);

      expect(inserted).toStrictEqual([[3, 1]]);
      expect(written).toStrictEqual([
        { row: 4, column: 3, numRows: 2, numColumns: 1, values: [["Name"], ["Ada"]] }
      ]);
    });
  });
});

import { prependColumns } from "@/appsscript";
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
  frozenSetTo: number[];
}

/**
 * A stand-in sheet: reports its own name and records inserts, freezes and
 * range writes.
 */
function sheetMock(lastColumn = 0, frozenColumns = 0, maxColumns = 26): SheetMock {
  const written: Written[] = [];

  const inserted: Array<[number, number]> = [];

  const frozenSetTo: number[] = [];

  const sheet = {
    toString: () => "Sheet",
    getLastRow: () => 10,
    getLastColumn: () => lastColumn,
    getMaxColumns: () => maxColumns,
    getFrozenColumns: () => frozenColumns,
    setFrozenColumns: (howMany: number) => {
      frozenSetTo.push(howMany);
    },
    insertColumnsBefore: (position: number, howMany: number) => {
      if (position + howMany > maxColumns + 1) {
        throw new Error("Those columns are out of bounds.");
      }

      inserted.push([position, howMany]);
    },
    getRange: (row: number, column: number, numRows: number, numColumns: number) => ({
      setValues: (values: unknown[][]) => {
        written.push({ row, column, numRows, numColumns, values });
      }
    })
  } as unknown as GoogleAppsScript.Spreadsheet.Sheet;

  return { sheet, written, inserted, frozenSetTo };
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

describe("prependColumns", () => {
  describe("Correct input data", () => {
    it("should shift the existing data right in one insert call", () => {
      const { sheet, inserted } = sheetMock(3);

      prependColumns(sheet, 2, [
        ["a", "b"],
        ["c", "d"]
      ]);

      expect(inserted).toStrictEqual([[1, 2]]);
    });

    it("should write the values in a single range call at column 1", () => {
      const { sheet, written } = sheetMock(3);

      prependColumns(sheet, 2, [
        ["a", "b"],
        ["c", "d"]
      ]);

      expect(written).toStrictEqual([
        {
          row: 1,
          column: 1,
          numRows: 2,
          numColumns: 2,
          values: [
            ["a", "b"],
            ["c", "d"]
          ]
        }
      ]);
    });

    it("should insert empty columns when no values are given", () => {
      const { sheet, written, inserted } = sheetMock(3);

      prependColumns(sheet, 3);

      expect(inserted).toStrictEqual([[1, 3]]);
      expect(written).toStrictEqual([]);
    });

    it("should not insert on an empty sheet, where nothing has to shift", () => {
      const { sheet, written, inserted } = sheetMock(0);

      prependColumns(sheet, 1, [["a"]]);

      expect(inserted).toStrictEqual([]);
      expect(written).toHaveLength(1);
    });

    it("should return the sheet", () => {
      const { sheet } = sheetMock(3);

      expect(prependColumns(sheet, 1)).toBe(sheet);
    });

    it("should do nothing for a count of zero", () => {
      const { sheet, written, inserted } = sheetMock(3);

      expect(prependColumns(sheet, 0)).toBe(sheet);
      expect(inserted).toStrictEqual([]);
      expect(written).toStrictEqual([]);
    });

    it("should restore the frozen columns that the insert pushed along", () => {
      const { sheet, frozenSetTo } = sheetMock(5, 2);

      prependColumns(sheet, 1);

      expect(frozenSetTo).toStrictEqual([2]);
    });

    it("should insert after the frozen columns when asked", () => {
      const { sheet, inserted, written, frozenSetTo } = sheetMock(5, 2);

      prependColumns(sheet, 1, [["a"]], { afterFrozenColumns: true });

      expect(inserted).toStrictEqual([[3, 1]]);
      expect(written[0].column).toBe(3);
      expect(frozenSetTo).toStrictEqual([]);
    });

    it("should not touch the freeze when there is none", () => {
      const { sheet, frozenSetTo } = sheetMock(5, 0);

      prependColumns(sheet, 1);

      expect(frozenSetTo).toStrictEqual([]);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for anything that is not a sheet", () => {
      expect(() => prependColumns({} as GoogleAppsScript.Spreadsheet.Sheet, 1)).toThrow(
        InvalidSheetException
      );
      expect(() =>
        prependColumns(null as unknown as GoogleAppsScript.Spreadsheet.Sheet, 1)
      ).toThrow(InvalidSheetException);
    });

    it("should throw for a count that is not a non-negative safe integer", () => {
      const { sheet } = sheetMock(3);

      expect(() => prependColumns(sheet, -1)).toThrow(IllegalArgumentException);
      expect(() => prependColumns(sheet, 1.5)).toThrow(IllegalArgumentException);
      expect(() => prependColumns(sheet, NaN)).toThrow(IllegalArgumentException);
      expect(() => prependColumns(sheet, "2" as unknown as number)).toThrow(
        IllegalArgumentException
      );
    });

    it("should throw when the values are not a consistent 2D array", () => {
      const { sheet } = sheetMock(3);

      expect(() => prependColumns(sheet, 1, [["a"], ["b", "c"]])).toThrow(IllegalArgumentException);
      expect(() => prependColumns(sheet, 1, ["a"] as unknown as unknown[][])).toThrow(
        IllegalArgumentException
      );
    });

    it("should throw when the values are not as wide as the count", () => {
      const { sheet } = sheetMock(3);

      expect(() => prependColumns(sheet, 3, [["a", "b"]])).toThrow(IllegalArgumentException);
      expect(() => prependColumns(sheet, 1, [["a", "b"]])).toThrow(IllegalArgumentException);
    });

    it("should validate before inserting anything", () => {
      const { sheet, inserted } = sheetMock(3);

      expect(() => prependColumns(sheet, 3, [["a"]])).toThrow(IllegalArgumentException);
      expect(inserted).toStrictEqual([]);
    });

    it("should let a count beyond the sheet's width fail as the service reports it", () => {
      const { sheet } = sheetMock(3, 0, 26);

      expect(() => prependColumns(sheet, 30)).toThrow("Those columns are out of bounds.");
    });
  });

  describe("Inserting at a range", () => {
    it("should insert before the first column of the range", () => {
      const { sheet, inserted } = sheetMock(8);

      prependColumns(rangeMock(sheet, 1, 3), 2);

      expect(inserted).toEqual([[3, 2]]);
    });

    it("should write the values on the rows of the range", () => {
      const { sheet, written } = sheetMock(8);

      prependColumns(rangeMock(sheet, 4, 3), 2, [
        ["a", "b"],
        ["c", "d"]
      ]);

      expect(written).toEqual([
        {
          row: 4,
          column: 3,
          numRows: 2,
          numColumns: 2,
          values: [
            ["a", "b"],
            ["c", "d"]
          ]
        }
      ]);
    });

    it("should leave the frozen boundary alone when inserting past it", () => {
      const { sheet, frozenSetTo } = sheetMock(8, 2);

      prependColumns(rangeMock(sheet, 1, 5), 1);

      expect(frozenSetTo).toEqual([]);
    });

    it("should throw for a first argument that is neither a sheet nor a range", () => {
      // @ts-expect-error - testing invalid types
      expect(() => prependColumns("A1:B2", 1)).toThrow(InvalidSheetException);
    });
  });
});

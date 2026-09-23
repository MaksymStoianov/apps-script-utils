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
  inserted: Array<[string, number, number]>;
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
    insertColumnsAfter: (position: number, howMany: number) => {
      inserted.push(["columnsAfter", position, howMany]);
    },
    insertRowsAfter: (position: number, howMany: number) => {
      inserted.push(["rowsAfter", position, howMany]);
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

  describe("Appending to a sheet", () => {
    it("should write after the last populated column", () => {
      const { sheet, written } = sheetMock(0, 3);

      appendColumns(sheet, [["a"]]);

      expect(written[0].column).toBe(4);
    });

    it("should write at the first column of an empty sheet", () => {
      const { sheet, written } = sheetMock(0, 0);

      appendColumns(sheet, [["a"]]);

      expect(written[0].column).toBe(1);
    });

    it("should write from the first row", () => {
      const { sheet, written } = sheetMock(5, 3);

      appendColumns(sheet, [["a"], ["b"]]);

      expect(written[0].row).toBe(1);
      expect(written[0].numRows).toBe(2);
    });

    it("should start after the frozen columns when asked", () => {
      const { sheet, written } = sheetMock(0, 1, 0, 3);

      appendColumns(sheet, [["a"]], { afterFrozenColumns: true });

      expect(written[0].column).toBe(4);
    });

    it("should widen the sheet when the values do not fit", () => {
      const { sheet, inserted } = sheetMock(0, 26);

      appendColumns(sheet, [["a", "b"]]);

      expect(inserted).toContainEqual(["columnsAfter", 26, 2]);
    });

    it("should leave the sheet alone when the values fit", () => {
      const { sheet, inserted } = sheetMock(0, 3);

      appendColumns(sheet, [["a"]]);

      expect(inserted).toEqual([]);
    });
  });

  describe("Appending within a range", () => {
    it("should write after the last populated column of the range", () => {
      const { sheet, written } = sheetMock(3, 3);

      appendColumns(
        rangeMock(sheet, 1, 1, [
          ["x", "", "", ""],
          ["y", "", "", ""]
        ]),
        [["a"], ["b"]]
      );

      expect(written[0].column).toBe(2);
      expect(written[0].row).toBe(1);
    });

    it("should ignore data outside the range", () => {
      const { sheet, written } = sheetMock(3, 3);

      // Column C holds a value on row 3, which the range does not cover.
      appendColumns(
        rangeMock(sheet, 1, 1, [
          ["x", "", "", ""],
          ["y", "", "", ""]
        ]),
        [["a"], ["b"]]
      );

      expect(written[0].column).toBe(2);
    });

    it("should write at the first column of an empty range", () => {
      const { sheet, written } = sheetMock(0, 0);

      appendColumns(rangeMock(sheet, 2, 3, [["", ""]]), [["a"]]);

      expect(written[0].column).toBe(3);
      expect(written[0].row).toBe(2);
    });

    it("should treat zero and false as data", () => {
      const { sheet, written } = sheetMock(2, 2);

      appendColumns(rangeMock(sheet, 1, 1, [[0, false, ""]]), [["a"]]);

      expect(written[0].column).toBe(3);
    });

    it("should count a value in any row of the range", () => {
      const { sheet, written } = sheetMock(2, 2);

      appendColumns(
        rangeMock(sheet, 1, 1, [
          ["x", "", ""],
          ["", "", "z"]
        ]),
        [["a"], ["b"]]
      );

      expect(written[0].column).toBe(4);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw when called without arguments", () => {
      // @ts-expect-error - testing invalid arity
      expect(() => appendColumns()).toThrow(IllegalArgumentException);
    });

    it("should throw for anything that is neither a Sheet nor a Range", () => {
      // @ts-expect-error - testing invalid types
      expect(() => appendColumns({}, [["a"]])).toThrow(InvalidSheetException);
      // @ts-expect-error - testing invalid types
      expect(() => appendColumns(null, [["a"]])).toThrow(InvalidSheetException);
      // @ts-expect-error - testing invalid types
      expect(() => appendColumns("A1:B2", [["a"]])).toThrow(InvalidSheetException);
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

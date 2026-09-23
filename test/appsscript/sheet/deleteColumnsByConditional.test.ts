import { deleteColumnsByConditional } from "@/appsscript";
import { IllegalArgumentException, InvalidSheetException } from "@/exception";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

type Mutable = Record<string, unknown>;

interface Shifted {
  row: number;
  column: number;
  numRows: number;
  numColumns: number;
}

interface SheetMock {
  sheet: GoogleAppsScript.Spreadsheet.Sheet;
  deleted: Array<[number, number]>;
  shifted: Shifted[];
  reads: { count: number };
}

/**
 * A stand-in sheet whose data range reports the given values, recording every
 * deleteColumns call in the order it was made.
 */
function sheetMock(values: unknown[][], maxColumns = 26): SheetMock {
  const deleted: Array<[number, number]> = [];

  const shifted: Shifted[] = [];

  const reads = { count: 0 };

  const sheet = {
    toString: () => "Sheet",
    getMaxColumns: () => maxColumns,
    getDataRange: () => ({
      getValues: () => {
        reads.count += 1;

        return values.map((row: unknown[]) => [...row]);
      },
      getNumRows: () => values.length,
      getRow: () => 1,
      getColumn: () => 1
    }),
    getRange: (row: number, column: number, numRows: number, numColumns: number) => ({
      deleteCells: () => {
        shifted.push({ row, column, numRows, numColumns });
      }
    }),
    deleteColumns: (position: number, howMany: number) => {
      deleted.push([position, howMany]);
    }
  } as unknown as GoogleAppsScript.Spreadsheet.Sheet;

  return { sheet, deleted, shifted, reads };
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
    getValues: () => values.map((cells) => [...cells])
  } as unknown as GoogleAppsScript.Spreadsheet.Range;
}

beforeEach(() => {
  (globalThis as Mutable).SpreadsheetApp = { Dimension: { ROWS: "ROWS", COLUMNS: "COLUMNS" } };
});

afterEach(() => {
  delete (globalThis as Mutable).SpreadsheetApp;
});

describe("deleteColumnsByConditional", () => {
  describe("Correct input data", () => {
    it("should delete the columns the predicate selects", () => {
      const { sheet, deleted } = sheetMock([["keep", "drop", "keep"]]);

      expect(deleteColumnsByConditional(sheet, (values) => values[0] === "drop")).toBe(1);
      expect(deleted).toStrictEqual([[2, 1]]);
    });

    it("should delete consecutive matches in one call", () => {
      const { sheet, deleted } = sheetMock([["a", "x", "x", "x", "b"]]);

      expect(deleteColumnsByConditional(sheet, (values) => values[0] === "x")).toBe(3);
      expect(deleted).toStrictEqual([[2, 3]]);
    });

    it("should delete separated matches right to left", () => {
      const { sheet, deleted } = sheetMock([["x", "a", "x", "b", "x"]]);

      expect(deleteColumnsByConditional(sheet, (values) => values[0] === "x")).toBe(3);
      expect(deleted).toStrictEqual([
        [5, 1],
        [3, 1],
        [1, 1]
      ]);
    });

    it("should not skip the column after a match", () => {
      const { sheet, deleted } = sheetMock([["x", "x", "a", "x", "x"]]);

      expect(deleteColumnsByConditional(sheet, (values) => values[0] === "x")).toBe(4);
      expect(deleted).toStrictEqual([
        [4, 2],
        [1, 2]
      ]);
    });

    it("should delete the last column", () => {
      const { sheet, deleted } = sheetMock([["a", "b", "x"]]);

      expect(deleteColumnsByConditional(sheet, (values) => values[0] === "x")).toBe(1);
      expect(deleted).toStrictEqual([[3, 1]]);
    });

    it("should delete every data column when the sheet has spare columns", () => {
      const { sheet, deleted } = sheetMock([["x", "x", "x"]], 26);

      expect(deleteColumnsByConditional(sheet, () => true)).toBe(3);
      expect(deleted).toStrictEqual([[1, 3]]);
    });

    it("should delete nothing when nothing matches", () => {
      const { sheet, deleted } = sheetMock([["a", "b"]]);

      expect(deleteColumnsByConditional(sheet, () => false)).toBe(0);
      expect(deleted).toStrictEqual([]);
    });

    it("should read the sheet exactly once", () => {
      const { sheet, reads } = sheetMock([["a", "b", "c"]]);

      deleteColumnsByConditional(sheet, () => true);

      expect(reads.count).toBe(1);
    });

    it("should handle an empty sheet", () => {
      const { sheet, deleted } = sheetMock([]);

      expect(deleteColumnsByConditional(sheet, () => true)).toBe(0);
      expect(deleted).toStrictEqual([]);
    });

    it("should key the column by the header column when one is configured", () => {
      const { sheet, deleted } = sheetMock([
        ["Region", "north", "n/a"],
        ["Sales", "10", "0"]
      ]);

      expect(
        deleteColumnsByConditional(sheet, (_v, _p, record) => record?.Region === "n/a", {
          headerColumn: 1
        })
      ).toBe(1);
      expect(deleted).toStrictEqual([[3, 1]]);
    });

    it("should never offer the header column as a candidate", () => {
      const { sheet, deleted } = sheetMock([["Region", "north"]]);

      deleteColumnsByConditional(sheet, () => true, { headerColumn: 1 });

      expect(deleted).toStrictEqual([[2, 1]]);
    });
  });

  describe("Incorrect input data", () => {
    it("should refuse to delete every column the sheet has", () => {
      const { sheet, deleted } = sheetMock([["x", "x"]], 2);

      expect(() => deleteColumnsByConditional(sheet, () => true)).toThrow(IllegalArgumentException);
      expect(deleted).toStrictEqual([]);
    });

    it("should throw for anything that is not a sheet", () => {
      expect(() =>
        deleteColumnsByConditional({} as GoogleAppsScript.Spreadsheet.Sheet, () => true)
      ).toThrow(InvalidSheetException);
    });

    it("should throw when the predicate is not a function", () => {
      const { sheet } = sheetMock([["a"]]);

      expect(() => deleteColumnsByConditional(sheet, null as never)).toThrow(
        IllegalArgumentException
      );
    });

    it("should throw for a header column that is not a positive integer", () => {
      const { sheet } = sheetMock([["a"]]);

      expect(() => deleteColumnsByConditional(sheet, () => true, { headerColumn: -1 })).toThrow(
        IllegalArgumentException
      );
      expect(() => deleteColumnsByConditional(sheet, () => true, { headerColumn: 1.5 })).toThrow(
        IllegalArgumentException
      );
    });
  });

  describe("Deleting within a range", () => {
    it("should shift only the cells of the range left", () => {
      const { sheet, shifted } = sheetMock([["a"]]);

      const count = deleteColumnsByConditional(
        rangeMock(sheet, 3, 2, [["drop", "keep"]]),
        (values) => values[0] === "drop"
      );

      expect(count).toBe(1);
      expect(shifted).toEqual([{ row: 3, column: 2, numRows: 1, numColumns: 1 }]);
    });

    it("should not delete any sheet column", () => {
      const { sheet, deleted } = sheetMock([["a"]]);

      deleteColumnsByConditional(rangeMock(sheet, 1, 1, [["drop"]]), () => true);

      expect(deleted).toEqual([]);
    });

    it("should give the predicate the position on the sheet, not in the range", () => {
      const { sheet } = sheetMock([["a"]]);

      const seen: number[] = [];

      deleteColumnsByConditional(rangeMock(sheet, 1, 6, [["a", "b"]]), (values, position) => {
        seen.push(position);

        return false;
      });

      expect(seen).toEqual([6, 7]);
    });

    it("should throw for a first argument that is neither a sheet nor a range", () => {
      // @ts-expect-error - testing invalid types
      expect(() => deleteColumnsByConditional("A1:B2", () => true)).toThrow(InvalidSheetException);
    });
  });
});

import { clearColumnsByConditional } from "@/appsscript";
import { IllegalArgumentException, InvalidSheetException } from "@/exception";
import { describe, expect, it } from "vitest";

interface Cleared {
  row: number;
  column: number;
  numRows: number;
  numColumns: number;
}

interface SheetMock {
  sheet: GoogleAppsScript.Spreadsheet.Sheet;
  cleared: Cleared[];
  reads: { count: number };
}

/**
 * A stand-in sheet whose data range reports the given values, and which
 * records every clearContent call.
 */
function sheetMock(values: unknown[][]): SheetMock {
  const cleared: Cleared[] = [];

  const reads = { count: 0 };

  const sheet = {
    toString: () => "Sheet",
    getDataRange: () => ({
      getValues: () => {
        reads.count += 1;

        return values.map((row: unknown[]) => [...row]);
      },
      getNumRows: () => values.length
    }),
    getRange: (row: number, column: number, numRows: number, numColumns: number) => ({
      clearContent: () => {
        cleared.push({ row, column, numRows, numColumns });
      }
    })
  } as unknown as GoogleAppsScript.Spreadsheet.Sheet;

  return { sheet, cleared, reads };
}

describe("clearColumnsByConditional", () => {
  describe("Correct input data", () => {
    it("should clear the columns the predicate selects", () => {
      const { sheet, cleared } = sheetMock([["keep", "drop", "keep"]]);

      expect(clearColumnsByConditional(sheet, (values) => values[0] === "drop")).toBe(1);
      expect(cleared).toStrictEqual([{ row: 1, column: 2, numRows: 1, numColumns: 1 }]);
    });

    it("should give the predicate the column read downwards", () => {
      const { sheet } = sheetMock([
        ["a1", "b1"],
        ["a2", "b2"]
      ]);

      const seen: unknown[][] = [];

      clearColumnsByConditional(sheet, (values) => {
        seen.push(values);

        return false;
      });

      expect(seen).toStrictEqual([
        ["a1", "a2"],
        ["b1", "b2"]
      ]);
    });

    it("should give the predicate the one-based position", () => {
      const { sheet } = sheetMock([["a", "b", "c"]]);

      const seen: number[] = [];

      clearColumnsByConditional(sheet, (_values, position) => {
        seen.push(position);

        return false;
      });

      expect(seen).toStrictEqual([1, 2, 3]);
    });

    it("should read the sheet exactly once", () => {
      const { sheet, reads } = sheetMock([["a", "b", "c"]]);

      clearColumnsByConditional(sheet, () => true);

      expect(reads.count).toBe(1);
    });

    it("should clear adjacent columns as one range", () => {
      const { sheet, cleared } = sheetMock([["a", "x", "x", "x", "b"]]);

      expect(clearColumnsByConditional(sheet, (values) => values[0] === "x")).toBe(3);
      expect(cleared).toStrictEqual([{ row: 1, column: 2, numRows: 1, numColumns: 3 }]);
    });

    it("should clear separated columns as separate ranges", () => {
      const { sheet, cleared } = sheetMock([["x", "a", "x"]]);

      clearColumnsByConditional(sheet, (values) => values[0] === "x");

      expect(cleared.map((c: Cleared) => [c.column, c.numColumns])).toStrictEqual([
        [1, 1],
        [3, 1]
      ]);
    });

    it("should clear the full height of the sheet", () => {
      const { sheet, cleared } = sheetMock([
        ["a", "x"],
        ["b", "y"],
        ["c", "z"]
      ]);

      clearColumnsByConditional(sheet, (values) => values[0] === "x");

      expect(cleared).toStrictEqual([{ row: 1, column: 2, numRows: 3, numColumns: 1 }]);
    });

    it("should clear nothing when nothing matches", () => {
      const { sheet, cleared } = sheetMock([["a", "b"]]);

      expect(clearColumnsByConditional(sheet, () => false)).toBe(0);
      expect(cleared).toStrictEqual([]);
    });

    it("should clear every column as one range when all of them match", () => {
      const { sheet, cleared } = sheetMock([["a", "b", "c"]]);

      expect(clearColumnsByConditional(sheet, () => true)).toBe(3);
      expect(cleared).toStrictEqual([{ row: 1, column: 1, numRows: 1, numColumns: 3 }]);
    });

    it("should handle an empty sheet", () => {
      const { sheet, cleared } = sheetMock([]);

      expect(clearColumnsByConditional(sheet, () => true)).toBe(0);
      expect(cleared).toStrictEqual([]);
    });

    it("should key the column by the header column when one is configured", () => {
      const { sheet, cleared } = sheetMock([
        ["Region", "north", "n/a"],
        ["Sales", "10", "0"]
      ]);

      expect(
        clearColumnsByConditional(sheet, (_v, _p, record) => record?.Region === "n/a", {
          headerColumn: 1
        })
      ).toBe(1);
      expect(cleared).toStrictEqual([{ row: 1, column: 3, numRows: 2, numColumns: 1 }]);
    });

    it("should never offer the header column as a candidate", () => {
      const { sheet, cleared } = sheetMock([["Region", "north"]]);

      const seen: number[] = [];

      clearColumnsByConditional(
        sheet,
        (_values, position) => {
          seen.push(position);

          return true;
        },
        { headerColumn: 1 }
      );

      expect(seen).toStrictEqual([2]);
      expect(cleared).toStrictEqual([{ row: 1, column: 2, numRows: 1, numColumns: 1 }]);
    });

    it("should pass null as the record when no header is configured", () => {
      const { sheet } = sheetMock([["a"]]);

      let seen: unknown = "unset";

      clearColumnsByConditional(sheet, (_values, _position, record) => {
        seen = record;

        return false;
      });

      expect(seen).toBeNull();
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for anything that is not a sheet", () => {
      expect(() =>
        clearColumnsByConditional({} as GoogleAppsScript.Spreadsheet.Sheet, () => true)
      ).toThrow(InvalidSheetException);
    });

    it("should throw when the predicate is not a function", () => {
      const { sheet } = sheetMock([["a"]]);

      expect(() => clearColumnsByConditional(sheet, null as never)).toThrow(
        IllegalArgumentException
      );
    });

    it("should throw for a header column that is not a positive integer", () => {
      const { sheet } = sheetMock([["a"]]);

      expect(() => clearColumnsByConditional(sheet, () => true, { headerColumn: -1 })).toThrow(
        IllegalArgumentException
      );
      expect(() => clearColumnsByConditional(sheet, () => true, { headerColumn: 1.5 })).toThrow(
        IllegalArgumentException
      );
    });
  });
});

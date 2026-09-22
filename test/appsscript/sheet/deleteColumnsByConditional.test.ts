import { deleteColumnsByConditional } from "@/appsscript";
import { IllegalArgumentException, InvalidSheetException } from "@/exception";
import { describe, expect, it } from "vitest";

interface SheetMock {
  sheet: GoogleAppsScript.Spreadsheet.Sheet;
  deleted: Array<[number, number]>;
  reads: { count: number };
}

/**
 * A stand-in sheet whose data range reports the given values, recording every
 * deleteColumns call in the order it was made.
 */
function sheetMock(values: unknown[][], maxColumns = 26): SheetMock {
  const deleted: Array<[number, number]> = [];

  const reads = { count: 0 };

  const sheet = {
    toString: () => "Sheet",
    getMaxColumns: () => maxColumns,
    getDataRange: () => ({
      getValues: () => {
        reads.count += 1;

        return values.map((row: unknown[]) => [...row]);
      },
      getNumRows: () => values.length
    }),
    deleteColumns: (position: number, howMany: number) => {
      deleted.push([position, howMany]);
    }
  } as unknown as GoogleAppsScript.Spreadsheet.Sheet;

  return { sheet, deleted, reads };
}

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
});

import { deleteRowsByConditional } from "@/appsscript";
import { IllegalArgumentException, InvalidSheetException } from "@/exception";
import { describe, expect, it } from "vitest";

interface SheetMock {
  sheet: GoogleAppsScript.Spreadsheet.Sheet;
  deleted: Array<[number, number]>;
  reads: { count: number };
}

/**
 * A stand-in sheet whose data range reports the given values, recording every
 * deleteRows call in the order it was made.
 */
function sheetMock(values: unknown[][], maxRows = 1000): SheetMock {
  const deleted: Array<[number, number]> = [];

  const reads = { count: 0 };

  const sheet = {
    toString: () => "Sheet",
    getMaxRows: () => maxRows,
    getDataRange: () => ({
      getValues: () => {
        reads.count += 1;

        return values.map((row: unknown[]) => [...row]);
      },
      getNumColumns: () => (values.length === 0 ? 0 : values[0].length)
    }),
    deleteRows: (position: number, howMany: number) => {
      deleted.push([position, howMany]);
    }
  } as unknown as GoogleAppsScript.Spreadsheet.Sheet;

  return { sheet, deleted, reads };
}

describe("deleteRowsByConditional", () => {
  describe("Correct input data", () => {
    it("should delete the rows the predicate selects", () => {
      const { sheet, deleted } = sheetMock([["keep"], ["drop"], ["keep"]]);

      expect(deleteRowsByConditional(sheet, (values) => values[0] === "drop")).toBe(1);
      expect(deleted).toStrictEqual([[2, 1]]);
    });

    it("should delete consecutive matches in one call", () => {
      const { sheet, deleted } = sheetMock([["a"], ["x"], ["x"], ["x"], ["b"]]);

      expect(deleteRowsByConditional(sheet, (values) => values[0] === "x")).toBe(3);
      expect(deleted).toStrictEqual([[2, 3]]);
    });

    it("should delete separated matches from the bottom upwards", () => {
      const { sheet, deleted } = sheetMock([["x"], ["a"], ["x"], ["b"], ["x"]]);

      expect(deleteRowsByConditional(sheet, (values) => values[0] === "x")).toBe(3);
      expect(deleted).toStrictEqual([
        [5, 1],
        [3, 1],
        [1, 1]
      ]);
    });

    it("should not skip the row after a match", () => {
      const { sheet, deleted } = sheetMock([["x"], ["x"], ["a"], ["x"], ["x"]]);

      expect(deleteRowsByConditional(sheet, (values) => values[0] === "x")).toBe(4);
      expect(deleted).toStrictEqual([
        [4, 2],
        [1, 2]
      ]);
    });

    it("should delete the last row", () => {
      const { sheet, deleted } = sheetMock([["a"], ["b"], ["x"]]);

      expect(deleteRowsByConditional(sheet, (values) => values[0] === "x")).toBe(1);
      expect(deleted).toStrictEqual([[3, 1]]);
    });

    it("should delete every data row when the sheet has spare rows below", () => {
      const { sheet, deleted } = sheetMock([["x"], ["x"], ["x"]], 1000);

      expect(deleteRowsByConditional(sheet, () => true)).toBe(3);
      expect(deleted).toStrictEqual([[1, 3]]);
    });

    it("should delete nothing when nothing matches", () => {
      const { sheet, deleted } = sheetMock([["a"], ["b"]]);

      expect(deleteRowsByConditional(sheet, () => false)).toBe(0);
      expect(deleted).toStrictEqual([]);
    });

    it("should read the sheet exactly once", () => {
      const { sheet, reads } = sheetMock([["a"], ["b"], ["c"]]);

      deleteRowsByConditional(sheet, () => true);

      expect(reads.count).toBe(1);
    });

    it("should handle an empty sheet", () => {
      const { sheet, deleted } = sheetMock([]);

      expect(deleteRowsByConditional(sheet, () => true)).toBe(0);
      expect(deleted).toStrictEqual([]);
    });

    it("should key the row by the header row when one is configured", () => {
      const { sheet, deleted } = sheetMock([
        ["Name", "Status"],
        ["Ada", "void"],
        ["Grace", "live"]
      ]);

      expect(
        deleteRowsByConditional(sheet, (_v, _p, record) => record?.Status === "void", {
          headerRow: 1
        })
      ).toBe(1);
      expect(deleted).toStrictEqual([[2, 1]]);
    });

    it("should never offer the header row as a candidate", () => {
      const { sheet, deleted } = sheetMock([["Name"], ["Ada"]]);

      deleteRowsByConditional(sheet, () => true, { headerRow: 1 });

      expect(deleted).toStrictEqual([[2, 1]]);
    });
  });

  describe("Incorrect input data", () => {
    it("should refuse to delete every row the sheet has", () => {
      const { sheet, deleted } = sheetMock([["x"], ["x"]], 2);

      expect(() => deleteRowsByConditional(sheet, () => true)).toThrow(IllegalArgumentException);
      expect(deleted).toStrictEqual([]);
    });

    it("should throw for anything that is not a sheet", () => {
      expect(() =>
        deleteRowsByConditional({} as GoogleAppsScript.Spreadsheet.Sheet, () => true)
      ).toThrow(InvalidSheetException);
    });

    it("should throw when the predicate is not a function", () => {
      const { sheet } = sheetMock([["a"]]);

      expect(() => deleteRowsByConditional(sheet, null as never)).toThrow(IllegalArgumentException);
    });

    it("should throw for a header row that is not a positive integer", () => {
      const { sheet } = sheetMock([["a"]]);

      expect(() => deleteRowsByConditional(sheet, () => true, { headerRow: -1 })).toThrow(
        IllegalArgumentException
      );
      expect(() => deleteRowsByConditional(sheet, () => true, { headerRow: 1.5 })).toThrow(
        IllegalArgumentException
      );
    });
  });
});

import { updateFormulas } from "@/appsscript";
import { IllegalArgumentException, InvalidSheetException } from "@/exception";
import { describe, expect, it } from "vitest";

interface WrittenRun {
  row: number;
  column: number;
  numRows: number;
  numColumns: number;
  formulas: string[][];
}

interface SheetMock {
  sheet: GoogleAppsScript.Spreadsheet.Sheet;
  runs: WrittenRun[];
}

/**
 * A stand-in sheet whose data range reports the given formulas, and which
 * records every setFormulas call.
 */
function sheetMock(formulas: string[][]): SheetMock {
  const runs: WrittenRun[] = [];

  const sheet = {
    toString: () => "Sheet",
    getDataRange: () => ({
      getFormulas: () => formulas.map((row: string[]) => [...row])
    }),
    getRange: (row: number, column: number, numRows: number, numColumns: number) => ({
      setFormulas: (written: string[][]) => {
        runs.push({ row, column, numRows, numColumns, formulas: written });
      }
    })
  } as unknown as GoogleAppsScript.Spreadsheet.Sheet;

  return { sheet, runs };
}

describe("updateFormulas", () => {
  describe("Correct input data", () => {
    it("should rewrite every formula the transformer changes", () => {
      const { sheet, runs } = sheetMock([["=A1"], ["=A2"]]);

      expect(updateFormulas(sheet, (f: string) => f.replace("A", "B"))).toBe(2);
      expect(runs).toStrictEqual([
        { row: 1, column: 1, numRows: 2, numColumns: 1, formulas: [["=B1"], ["=B2"]] }
      ]);
    });

    it("should give the transformer the one-based row and column", () => {
      const { sheet } = sheetMock([
        ["", "=B1"],
        ["=A2", ""]
      ]);

      const seen: Array<[string, number, number]> = [];

      updateFormulas(sheet, (formula: string, row: number, column: number) => {
        seen.push([formula, row, column]);

        return formula;
      });

      expect(seen).toStrictEqual([
        ["=B1", 1, 2],
        ["=A2", 2, 1]
      ]);
    });

    it("should leave cells holding a value untouched", () => {
      // getFormulas reports an empty string for a cell that holds a value.
      const { sheet, runs } = sheetMock([
        ["", "=A1"],
        ["", ""]
      ]);

      updateFormulas(sheet, (f: string) => `${f}+1`);

      expect(runs).toStrictEqual([
        { row: 1, column: 2, numRows: 1, numColumns: 1, formulas: [["=A1+1"]] }
      ]);
    });

    it("should write nothing when the transformer changes nothing", () => {
      const { sheet, runs } = sheetMock([["=A1"], ["=A2"]]);

      expect(updateFormulas(sheet, (f: string) => f)).toBe(0);
      expect(runs).toStrictEqual([]);
    });

    it("should write nothing for a sheet with no formulas", () => {
      const { sheet, runs } = sheetMock([
        ["", ""],
        ["", ""]
      ]);

      expect(updateFormulas(sheet, (f: string) => `${f}!`)).toBe(0);
      expect(runs).toStrictEqual([]);
    });

    it("should group a filled column into a single call", () => {
      const { sheet, runs } = sheetMock([["=A1"], ["=A2"], ["=A3"], ["=A4"]]);

      updateFormulas(sheet, (f: string) => f.replace("A", "B"));

      expect(runs).toHaveLength(1);
      expect(runs[0].numRows).toBe(4);
    });

    it("should break a column into runs around an unchanged cell", () => {
      const { sheet, runs } = sheetMock([["=A1"], ["=KEEP"], ["=A3"]]);

      updateFormulas(sheet, (f: string) => (f === "=KEEP" ? f : f.replace("A", "B")));

      expect(runs.map((r: WrittenRun) => [r.row, r.numRows])).toStrictEqual([
        [1, 1],
        [3, 1]
      ]);
    });

    it("should write one run per column", () => {
      const { sheet, runs } = sheetMock([
        ["=A1", "=B1"],
        ["=A2", "=B2"]
      ]);

      updateFormulas(sheet, (f: string) => `${f}+1`);

      expect(runs.map((r: WrittenRun) => r.column)).toStrictEqual([1, 2]);
      expect(runs.every((r: WrittenRun) => r.numRows === 2)).toBe(true);
    });

    it("should replace exact formulas given as a map", () => {
      const { sheet, runs } = sheetMock([["=SUM(A1:A10)"], ["=AVERAGE(A1:A10)"]]);

      expect(updateFormulas(sheet, { "=SUM(A1:A10)": "=SUM(A1:A20)" })).toBe(1);
      expect(runs).toStrictEqual([
        { row: 1, column: 1, numRows: 1, numColumns: 1, formulas: [["=SUM(A1:A20)"]] }
      ]);
    });

    it("should leave a formula the map does not name", () => {
      const { sheet, runs } = sheetMock([["=A1"]]);

      expect(updateFormulas(sheet, { "=B1": "=C1" })).toBe(0);
      expect(runs).toStrictEqual([]);
    });

    it("should not treat an inherited key as a replacement", () => {
      const { sheet, runs } = sheetMock([["=A1"]]);

      expect(
        updateFormulas(sheet, { toString: "=OOPS" } as unknown as Record<string, string>)
      ).toBe(0);
      expect(runs).toStrictEqual([]);
    });

    it("should handle an empty sheet", () => {
      const { sheet, runs } = sheetMock([]);

      expect(updateFormulas(sheet, (f: string) => f)).toBe(0);
      expect(runs).toStrictEqual([]);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for anything that is not a sheet", () => {
      expect(() =>
        updateFormulas({} as GoogleAppsScript.Spreadsheet.Sheet, (f: string) => f)
      ).toThrow(InvalidSheetException);
    });

    it("should throw when the rewrite is neither a function nor an object", () => {
      const { sheet } = sheetMock([["=A1"]]);

      expect(() => updateFormulas(sheet, null as unknown as Record<string, string>)).toThrow(
        IllegalArgumentException
      );
      expect(() => updateFormulas(sheet, "=B1" as unknown as Record<string, string>)).toThrow(
        IllegalArgumentException
      );
      expect(() => updateFormulas(sheet, 42 as unknown as Record<string, string>)).toThrow(
        IllegalArgumentException
      );
    });
  });
});

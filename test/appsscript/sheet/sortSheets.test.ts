import { sortSheets } from "@/appsscript";
import { IllegalArgumentException } from "@/exception";
import { describe, expect, it } from "vitest";

/**
 * A stand-in spreadsheet that records the moves requested of it.
 */
function spreadsheetOf(names: string[]): {
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
  moves: Array<[string, number]>;
} {
  const moves: Array<[string, number]> = [];

  let active = "";

  const sheets = names.map((name, i) => ({
    getName: () => name,
    getIndex: () => i + 1
  }));

  const spreadsheet = {
    toString: () => "Spreadsheet",
    getSheets: () => sheets,
    getSheetByName: (name: string) => sheets.find((s) => s.getName() === name) ?? null,
    setActiveSheet: (sheet: { getName: () => string }) => {
      active = sheet.getName();
    },
    moveActiveSheet: (position: number) => {
      moves.push([active, position]);
    }
  } as unknown as GoogleAppsScript.Spreadsheet.Spreadsheet;

  return { spreadsheet, moves };
}

describe("sortSheets", () => {
  describe("Correct input data", () => {
    it("should move sheets into alphabetical order", () => {
      const { spreadsheet, moves } = spreadsheetOf(["c", "a", "b"]);

      sortSheets(spreadsheet);

      expect(moves).toEqual([
        ["a", 1],
        ["b", 2],
        ["c", 3]
      ]);
    });

    it("should move nothing when the order is already correct", () => {
      const { spreadsheet, moves } = spreadsheetOf(["a", "b", "c"]);

      sortSheets(spreadsheet);

      expect(moves).toEqual([]);
    });

    it("should do nothing for a single sheet", () => {
      const { spreadsheet, moves } = spreadsheetOf(["only"]);

      sortSheets(spreadsheet);

      expect(moves).toEqual([]);
    });

    it("should honour a custom comparator", () => {
      const { spreadsheet, moves } = spreadsheetOf(["a", "b", "c"]);

      sortSheets(spreadsheet, (x, y) => y.localeCompare(x));

      expect(moves[0]).toEqual(["c", 1]);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw when called without arguments", () => {
      // @ts-expect-error - testing invalid arity
      expect(() => sortSheets()).toThrow(IllegalArgumentException);
    });

    it("should throw for anything that is not a Spreadsheet", () => {
      // @ts-expect-error - testing invalid types
      expect(() => sortSheets({})).toThrow();
      // @ts-expect-error - testing invalid types
      expect(() => sortSheets(null)).toThrow();
      // @ts-expect-error - testing invalid types
      expect(() => sortSheets({ toString: () => "Sheet" })).toThrow();
    });
  });
});

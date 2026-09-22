import { requireCellGridRange } from "@/appsscript";
import { InvalidGridRangeException } from "@/exception";
import { describe, expect, it } from "vitest";

const cell = { startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 1 };

describe("requireCellGridRange", () => {
  describe("Correct input data", () => {
    it("should return the same object reference", () => {
      expect(requireCellGridRange(cell)).toBe(cell);
    });

    it("should accept a single cell away from the origin", () => {
      const away = {
        startRowIndex: 9,
        endRowIndex: 10,
        startColumnIndex: 4,
        endColumnIndex: 5
      };

      expect(requireCellGridRange(away)).toBe(away);
    });

    it("should accept a range carrying extra members", () => {
      const withSheet = { ...cell, sheetId: 0, sheetName: "Sheet1" };

      expect(requireCellGridRange(withSheet)).toBe(withSheet);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for a multi-row or multi-column range", () => {
      expect(() => requireCellGridRange({ ...cell, endRowIndex: 5 })).toThrow(
        InvalidGridRangeException
      );
      expect(() => requireCellGridRange({ ...cell, endColumnIndex: 3 })).toThrow(
        InvalidGridRangeException
      );
    });

    it("should throw when a bound is open-ended", () => {
      expect(() => requireCellGridRange({ startRowIndex: 0 })).toThrow(InvalidGridRangeException);
      expect(() => requireCellGridRange({})).toThrow(InvalidGridRangeException);
    });

    it("should throw for non-object input", () => {
      expect(() => requireCellGridRange(null)).toThrow(InvalidGridRangeException);
      expect(() => requireCellGridRange("A1")).toThrow(InvalidGridRangeException);
      expect(() => requireCellGridRange(42)).toThrow(InvalidGridRangeException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireCellGridRange({})).toThrow(
        "Expected a grid range covering exactly one cell."
      );
    });

    it("should use a custom message when provided", () => {
      expect(() => requireCellGridRange({}, "Select a single cell first.")).toThrow(
        "Select a single cell first."
      );
    });
  });
});

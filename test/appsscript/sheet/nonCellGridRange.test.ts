import { nonCellGridRange } from "@/appsscript";
import { describe, expect, it } from "vitest";

const cell = { startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 1 };

describe("nonCellGridRange", () => {
  describe("Correct input data", () => {
    it("should return false for a range spanning exactly one cell", () => {
      expect(nonCellGridRange(cell)).toBe(false);
    });

    it("should return false for a single cell away from the origin", () => {
      expect(
        nonCellGridRange({
          startRowIndex: 9,
          endRowIndex: 10,
          startColumnIndex: 4,
          endColumnIndex: 5
        })
      ).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for a multi-row range", () => {
      expect(nonCellGridRange({ ...cell, endRowIndex: 5 })).toBe(true);
    });

    it("should return true for a multi-column range", () => {
      expect(nonCellGridRange({ ...cell, endColumnIndex: 3 })).toBe(true);
    });

    it("should return true when a bound is open-ended", () => {
      expect(nonCellGridRange({ startRowIndex: 0, startColumnIndex: 0 })).toBe(true);
      expect(nonCellGridRange({})).toBe(true);
    });

    it("should return true for non-object input rather than throwing", () => {
      // @ts-expect-error - testing invalid types
      expect(nonCellGridRange(null)).toBe(true);
      // @ts-expect-error - testing invalid types
      expect(nonCellGridRange("A1")).toBe(true);
    });
  });
});

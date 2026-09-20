import { nonGridRangeSameDimensions } from "@/appsscript";
import { describe, expect, it } from "vitest";

const cell = { startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 1 };

describe("nonGridRangeSameDimensions", () => {
  describe("Correct input data", () => {
    it("should return false for identical ranges", () => {
      expect(nonGridRangeSameDimensions(cell, cell)).toBe(false);
    });

    it("should return false for the same shape at a different position", () => {
      expect(
        nonGridRangeSameDimensions(
          { startRowIndex: 0, endRowIndex: 3, startColumnIndex: 0, endColumnIndex: 2 },
          { startRowIndex: 10, endRowIndex: 13, startColumnIndex: 5, endColumnIndex: 7 }
        )
      ).toBe(false);
    });

    it("should return false for the same shape on different sheets", () => {
      expect(nonGridRangeSameDimensions({ ...cell, sheetId: 0 }, { ...cell, sheetId: 12345 })).toBe(
        false
      );
    });
  });

  describe("Incorrect input data", () => {
    it("should return true when the heights differ", () => {
      expect(nonGridRangeSameDimensions(cell, { ...cell, endRowIndex: 2 })).toBe(true);
    });

    it("should return true when the widths differ", () => {
      expect(nonGridRangeSameDimensions(cell, { ...cell, endColumnIndex: 4 })).toBe(true);
    });

    it("should return true when either range has an open-ended bound", () => {
      expect(nonGridRangeSameDimensions(cell, { startRowIndex: 0 })).toBe(true);
      expect(nonGridRangeSameDimensions({}, cell)).toBe(true);
    });

    it("should return true for an inverted range", () => {
      expect(nonGridRangeSameDimensions(cell, { ...cell, startRowIndex: 5, endRowIndex: 2 })).toBe(
        true
      );
    });

    it("should return true for non-object input in either position", () => {
      // @ts-expect-error - testing invalid types
      expect(nonGridRangeSameDimensions(null, cell)).toBe(true);
      // @ts-expect-error - testing invalid types
      expect(nonGridRangeSameDimensions(cell, null)).toBe(true);
    });
  });
});

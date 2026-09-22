import { isGridRangeSameDimensions } from "@/appsscript";
import { describe, expect, it } from "vitest";

const cell = { startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 1 };

describe("isGridRangeSameDimensions", () => {
  describe("Correct input data", () => {
    it("should return true for identical ranges", () => {
      expect(isGridRangeSameDimensions(cell, cell)).toBe(true);
    });

    it("should compare shape, not position", () => {
      expect(
        isGridRangeSameDimensions(
          { startRowIndex: 0, endRowIndex: 3, startColumnIndex: 0, endColumnIndex: 2 },
          { startRowIndex: 10, endRowIndex: 13, startColumnIndex: 5, endColumnIndex: 7 }
        )
      ).toBe(true);
    });

    it("should ignore the sheet the ranges belong to", () => {
      expect(isGridRangeSameDimensions({ ...cell, sheetId: 0 }, { ...cell, sheetId: 12345 })).toBe(
        true
      );
    });
  });

  describe("Incorrect input data", () => {
    it("should return false when the heights differ", () => {
      expect(
        isGridRangeSameDimensions(cell, {
          startRowIndex: 0,
          endRowIndex: 2,
          startColumnIndex: 0,
          endColumnIndex: 1
        })
      ).toBe(false);
    });

    it("should return false when the widths differ", () => {
      expect(
        isGridRangeSameDimensions(cell, {
          startRowIndex: 0,
          endRowIndex: 1,
          startColumnIndex: 0,
          endColumnIndex: 4
        })
      ).toBe(false);
    });

    it("should return false when either range has an open-ended bound", () => {
      expect(isGridRangeSameDimensions(cell, { startRowIndex: 0 })).toBe(false);
      expect(isGridRangeSameDimensions({}, cell)).toBe(false);
    });

    it("should return false for an inverted range", () => {
      expect(
        isGridRangeSameDimensions(cell, {
          startRowIndex: 5,
          endRowIndex: 2,
          startColumnIndex: 0,
          endColumnIndex: 1
        })
      ).toBe(false);
    });

    it("should return false for non-object input in either position", () => {
      // @ts-expect-error - testing invalid types
      expect(isGridRangeSameDimensions(null, cell)).toBe(false);
      // @ts-expect-error - testing invalid types
      expect(isGridRangeSameDimensions(cell, null)).toBe(false);
      // @ts-expect-error - testing invalid types
      expect(isGridRangeSameDimensions("A1", "B2")).toBe(false);
    });
  });
});

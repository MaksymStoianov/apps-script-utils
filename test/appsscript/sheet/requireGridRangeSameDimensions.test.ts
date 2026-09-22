import { requireGridRangeSameDimensions } from "@/appsscript";
import { InvalidGridRangeException } from "@/exception";
import { describe, expect, it } from "vitest";

const cell = { startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 1 };

describe("requireGridRangeSameDimensions", () => {
  describe("Correct input data", () => {
    it("should return without throwing for identical ranges", () => {
      expect(() => requireGridRangeSameDimensions(cell, cell)).not.toThrow();
    });

    it("should accept the same shape at a different position", () => {
      expect(() =>
        requireGridRangeSameDimensions(
          { startRowIndex: 0, endRowIndex: 3, startColumnIndex: 0, endColumnIndex: 2 },
          { startRowIndex: 10, endRowIndex: 13, startColumnIndex: 5, endColumnIndex: 7 }
        )
      ).not.toThrow();
    });
  });

  describe("Incorrect input data", () => {
    it("should throw when the shapes differ", () => {
      expect(() => requireGridRangeSameDimensions(cell, { ...cell, endRowIndex: 4 })).toThrow(
        InvalidGridRangeException
      );
    });

    it("should report both shapes in the default message", () => {
      expect(() =>
        requireGridRangeSameDimensions(
          { startRowIndex: 0, endRowIndex: 3, startColumnIndex: 0, endColumnIndex: 2 },
          cell
        )
      ).toThrow("Expected grid ranges of equal dimensions, but received 3 × 2 and 1 × 1.");
    });

    it("should report an unmeasurable range as unknown", () => {
      expect(() => requireGridRangeSameDimensions(cell, {})).toThrow(
        "but received 1 × 1 and unknown."
      );
    });

    it("should throw for non-object input in either position", () => {
      // @ts-expect-error - testing invalid types
      expect(() => requireGridRangeSameDimensions(null, cell)).toThrow(InvalidGridRangeException);
      // @ts-expect-error - testing invalid types
      expect(() => requireGridRangeSameDimensions(cell, null)).toThrow(InvalidGridRangeException);
    });

    it("should use a custom message when provided", () => {
      expect(() =>
        requireGridRangeSameDimensions(cell, {}, "Source and target must match.")
      ).toThrow("Source and target must match.");
    });
  });
});

import { isCellGridRange } from "@/appsscript";
import { describe, expect, it } from "vitest";

describe("isCellGridRange", () => {
  describe("Correct input data", () => {
    it("should return true for a range spanning exactly one cell", () => {
      expect(
        isCellGridRange({
          startRowIndex: 0,
          endRowIndex: 1,
          startColumnIndex: 0,
          endColumnIndex: 1
        })
      ).toBe(true);
    });

    it("should return true for a single cell away from the origin", () => {
      expect(
        isCellGridRange({
          startRowIndex: 9,
          endRowIndex: 10,
          startColumnIndex: 4,
          endColumnIndex: 5
        })
      ).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for a multi-row or multi-column range", () => {
      expect(
        isCellGridRange({
          startRowIndex: 0,
          endRowIndex: 2,
          startColumnIndex: 0,
          endColumnIndex: 1
        })
      ).toBe(false);

      expect(
        isCellGridRange({
          startRowIndex: 0,
          endRowIndex: 1,
          startColumnIndex: 0,
          endColumnIndex: 3
        })
      ).toBe(false);
    });

    it("should return false when a bound is open-ended", () => {
      expect(isCellGridRange({ startRowIndex: 0, startColumnIndex: 0 })).toBe(false);
      expect(isCellGridRange({})).toBe(false);
    });

    it("should return false for non-object input rather than throwing", () => {
      // @ts-expect-error - testing invalid types
      expect(isCellGridRange(null)).toBe(false);
      // @ts-expect-error - testing invalid types
      expect(isCellGridRange(undefined)).toBe(false);
      // @ts-expect-error - testing invalid types
      expect(isCellGridRange("A1")).toBe(false);
      // @ts-expect-error - testing invalid types
      expect(isCellGridRange(42)).toBe(false);
    });
  });
});

import { nonGridRangeContainedIn } from "@/appsscript";
import { describe, expect, it } from "vitest";

const outer = { startRowIndex: 0, endRowIndex: 10, startColumnIndex: 0, endColumnIndex: 5 };
const inner = { startRowIndex: 2, endRowIndex: 4, startColumnIndex: 1, endColumnIndex: 3 };

describe("nonGridRangeContainedIn", () => {
  describe("Correct input data", () => {
    it("should return false for a range strictly inside another", () => {
      expect(nonGridRangeContainedIn(inner, outer)).toBe(false);
    });

    it("should return false for a range equal to its container", () => {
      expect(nonGridRangeContainedIn(outer, outer)).toBe(false);
    });

    it("should return false when the container has no bounds at all", () => {
      expect(nonGridRangeContainedIn(inner, {})).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for a range extending past its container", () => {
      expect(nonGridRangeContainedIn({ ...inner, endRowIndex: 20 }, outer)).toBe(true);
      expect(nonGridRangeContainedIn({ ...inner, startColumnIndex: -1 }, outer)).toBe(true);
    });

    it("should return true when the ranges name different sheets", () => {
      expect(nonGridRangeContainedIn({ ...inner, sheetId: 1 }, { ...outer, sheetId: 2 })).toBe(
        true
      );
    });

    it("should return true for non-object input in either position", () => {
      // @ts-expect-error - testing invalid types
      expect(nonGridRangeContainedIn(null, outer)).toBe(true);
      // @ts-expect-error - testing invalid types
      expect(nonGridRangeContainedIn(inner, null)).toBe(true);
    });
  });
});

import { isGridRangeContainedIn } from "@/appsscript";
import { describe, expect, it } from "vitest";

const outer = {
  startRowIndex: 0,
  endRowIndex: 10,
  startColumnIndex: 0,
  endColumnIndex: 5
};

const inner = {
  startRowIndex: 2,
  endRowIndex: 4,
  startColumnIndex: 1,
  endColumnIndex: 3
};

describe("isGridRangeContainedIn", () => {
  describe("Correct input data", () => {
    it("should return true for a range strictly inside another", () => {
      expect(isGridRangeContainedIn(inner, outer)).toBe(true);
    });

    it("should return true for a range equal to its container", () => {
      expect(isGridRangeContainedIn(outer, outer)).toBe(true);
    });

    it("should treat missing bounds on the container as unbounded", () => {
      expect(isGridRangeContainedIn(inner, {})).toBe(true);
    });

    it("should return true when both ranges name the same sheet", () => {
      expect(isGridRangeContainedIn({ ...inner, sheetId: 7 }, { ...outer, sheetId: 7 })).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for a range extending past its container", () => {
      expect(isGridRangeContainedIn({ ...inner, endRowIndex: 20 }, outer)).toBe(false);

      expect(isGridRangeContainedIn({ ...inner, startColumnIndex: -1 }, outer)).toBe(false);
    });

    it("should return false when the ranges name different sheets", () => {
      expect(isGridRangeContainedIn({ ...inner, sheetId: 1 }, { ...outer, sheetId: 2 })).toBe(
        false
      );

      expect(
        isGridRangeContainedIn({ ...inner, sheetName: "A" }, { ...outer, sheetName: "B" })
      ).toBe(false);
    });

    it("should return false for non-object input in the first position", () => {
      // @ts-expect-error - testing invalid types
      expect(isGridRangeContainedIn(null, outer)).toBe(false);
      // @ts-expect-error - testing invalid types
      expect(isGridRangeContainedIn("A1", outer)).toBe(false);
    });

    it("should return false for non-object input in the container position", () => {
      // @ts-expect-error - testing invalid types
      expect(isGridRangeContainedIn(inner, null)).toBe(false);
      // @ts-expect-error - testing invalid types
      expect(isGridRangeContainedIn(inner, undefined)).toBe(false);
    });
  });
});

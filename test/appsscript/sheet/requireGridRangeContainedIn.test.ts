import { requireGridRangeContainedIn } from "@/appsscript";
import { InvalidGridRangeException } from "@/exception";
import { describe, expect, it } from "vitest";

const outer = { startRowIndex: 0, endRowIndex: 10, startColumnIndex: 0, endColumnIndex: 5 };
const inner = { startRowIndex: 2, endRowIndex: 4, startColumnIndex: 1, endColumnIndex: 3 };

describe("requireGridRangeContainedIn", () => {
  describe("Correct input data", () => {
    it("should return the inner range unchanged", () => {
      expect(requireGridRangeContainedIn(inner, outer)).toBe(inner);
    });

    it("should accept a range equal to its container", () => {
      expect(requireGridRangeContainedIn(outer, outer)).toBe(outer);
    });

    it("should accept any range when the container has no bounds", () => {
      expect(requireGridRangeContainedIn(inner, {})).toBe(inner);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for a range extending past its container", () => {
      expect(() => requireGridRangeContainedIn({ ...inner, endRowIndex: 20 }, outer)).toThrow(
        InvalidGridRangeException
      );
    });

    it("should describe both ranges in the default message", () => {
      expect(() => requireGridRangeContainedIn({ ...inner, endRowIndex: 20 }, outer)).toThrow(
        "Expected rows 2–20, columns 1–3 to lie within rows 0–10, columns 0–5."
      );
    });

    it("should render an open bound as an ellipsis", () => {
      expect(() =>
        requireGridRangeContainedIn({ startRowIndex: 2 }, { ...outer, endRowIndex: 1 })
      ).toThrow("rows 2–…, columns …–…");
    });

    it("should throw when the ranges name different sheets", () => {
      expect(() =>
        requireGridRangeContainedIn({ ...inner, sheetId: 1 }, { ...outer, sheetId: 2 })
      ).toThrow(InvalidGridRangeException);
    });

    it("should throw for non-object input in either position", () => {
      // @ts-expect-error - testing invalid types
      expect(() => requireGridRangeContainedIn(null, outer)).toThrow(InvalidGridRangeException);
      // @ts-expect-error - testing invalid types
      expect(() => requireGridRangeContainedIn(inner, null)).toThrow(InvalidGridRangeException);
    });

    it("should use a custom message when provided", () => {
      expect(() =>
        requireGridRangeContainedIn({ ...inner, endRowIndex: 20 }, outer, "Out of bounds.")
      ).toThrow("Out of bounds.");
    });
  });
});

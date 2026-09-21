import { toA1Notation } from "@/appsscript";
import { IllegalArgumentException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("toA1Notation", () => {
  describe("Correct input data", () => {
    it("should render a single cell", () => {
      expect(
        toA1Notation({
          startRowIndex: 0,
          endRowIndex: 1,
          startColumnIndex: 0,
          endColumnIndex: 1
        })
      ).toBe("A1");
    });

    it("should render a multi-cell range", () => {
      expect(
        toA1Notation({
          startRowIndex: 0,
          endRowIndex: 3,
          startColumnIndex: 0,
          endColumnIndex: 2
        })
      ).toBe("A1:B3");
    });

    it("should prefix the sheet name when present", () => {
      expect(
        toA1Notation({
          sheetName: "Data",
          startRowIndex: 0,
          endRowIndex: 1,
          startColumnIndex: 0,
          endColumnIndex: 1
        })
      ).toBe("Data!A1");
    });

    it("should render a range away from the origin", () => {
      expect(
        toA1Notation({
          startRowIndex: 9,
          endRowIndex: 10,
          startColumnIndex: 26,
          endColumnIndex: 27
        })
      ).toBe("AA10");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw when called without arguments", () => {
      // @ts-expect-error - testing invalid arity
      expect(() => toA1Notation()).toThrow(IllegalArgumentException);
    });

    it("should throw for a non-object", () => {
      // @ts-expect-error - testing invalid types
      expect(() => toA1Notation("A1")).toThrow();
      // @ts-expect-error - testing invalid types
      expect(() => toA1Notation(null)).toThrow();
    });

    it("should throw for a range with no bounds at all", () => {
      expect(() => toA1Notation({})).toThrow();
    });

    it("should throw when the row bounds are missing", () => {
      expect(() => toA1Notation({ startColumnIndex: 0, endColumnIndex: 2 })).toThrow();
    });
  });
});

import { doGridRangesIntersect, GridRange } from "@/appsscript";
import { describe, expect, it } from "vitest";

describe("doGridRangesIntersect", () => {
  describe("Correct input data", () => {
    it("should return true for overlapping ranges (partial overlap)", () => {
      const rangeA: GridRange = {
        startRowIndex: 0,
        endRowIndex: 5,
        startColumnIndex: 0,
        endColumnIndex: 5
      }; // A1:E5

      const rangeB: GridRange = {
        startRowIndex: 3,
        endRowIndex: 8,
        startColumnIndex: 3,
        endColumnIndex: 8
      }; // D4:H8

      expect(doGridRangesIntersect(rangeA, rangeB)).toBe(true);
    });

    it("should return true for one range fully contained within another", () => {
      const rangeA: GridRange = {
        startRowIndex: 0,
        endRowIndex: 10,
        startColumnIndex: 0,
        endColumnIndex: 10
      }; // A1:J10

      const rangeB: GridRange = {
        startRowIndex: 2,
        endRowIndex: 5,
        startColumnIndex: 2,
        endColumnIndex: 5
      }; // C3:E5

      expect(doGridRangesIntersect(rangeA, rangeB)).toBe(true);
    });

    it("should return true for identical ranges", () => {
      const rangeA: GridRange = {
        startRowIndex: 1,
        endRowIndex: 6,
        startColumnIndex: 1,
        endColumnIndex: 6
      }; // B2:F6

      const rangeB: GridRange = {
        startRowIndex: 1,
        endRowIndex: 6,
        startColumnIndex: 1,
        endColumnIndex: 6
      }; // B2:F6

      expect(doGridRangesIntersect(rangeA, rangeB)).toBe(true);
    });

    it("should return true for ranges sharing a single cell", () => {
      const rangeA: GridRange = {
        startRowIndex: 0,
        endRowIndex: 1,
        startColumnIndex: 0,
        endColumnIndex: 1
      }; // A1

      const rangeB: GridRange = {
        startRowIndex: 0,
        endRowIndex: 1,
        startColumnIndex: 0,
        endColumnIndex: 1
      }; // A1

      expect(doGridRangesIntersect(rangeA, rangeB)).toBe(true);
    });

    it("should return true for ranges sharing a common border (row)", () => {
      const rangeA: GridRange = {
        startRowIndex: 0,
        endRowIndex: 5,
        startColumnIndex: 0,
        endColumnIndex: 5
      }; // A1:E5

      const rangeB: GridRange = {
        startRowIndex: 4,
        endRowIndex: 9,
        startColumnIndex: 0,
        endColumnIndex: 5
      }; // A5:E9 (sharing row 5)

      expect(doGridRangesIntersect(rangeA, rangeB)).toBe(true);
    });

    it("should return true for ranges sharing a common border (column)", () => {
      const rangeA: GridRange = {
        startRowIndex: 0,
        endRowIndex: 5,
        startColumnIndex: 0,
        endColumnIndex: 5
      }; // A1:E5

      const rangeB: GridRange = {
        startRowIndex: 0,
        endRowIndex: 5,
        startColumnIndex: 4,
        endColumnIndex: 9
      }; // E1:I5 (sharing col E)

      expect(doGridRangesIntersect(rangeA, rangeB)).toBe(true);
    });

    it("should return false for non-overlapping ranges (separated horizontally)", () => {
      const rangeA: GridRange = {
        startRowIndex: 0,
        endRowIndex: 5,
        startColumnIndex: 0,
        endColumnIndex: 5
      }; // A1:E5

      const rangeB: GridRange = {
        startRowIndex: 0,
        endRowIndex: 5,
        startColumnIndex: 6,
        endColumnIndex: 10
      }; // G1:J5

      expect(doGridRangesIntersect(rangeA, rangeB)).toBe(false);
    });

    it("should return false for non-overlapping ranges (separated vertically)", () => {
      const rangeA: GridRange = {
        startRowIndex: 0,
        endRowIndex: 5,
        startColumnIndex: 0,
        endColumnIndex: 5
      }; // A1:E5

      const rangeB: GridRange = {
        startRowIndex: 6,
        endRowIndex: 10,
        startColumnIndex: 0,
        endColumnIndex: 5
      }; // A7:E10

      expect(doGridRangesIntersect(rangeA, rangeB)).toBe(false);
    });

    it("should handle full column ranges intersecting", () => {
      const rangeA: GridRange = { startColumnIndex: 0, endColumnIndex: 5 }; // A:E

      const rangeB: GridRange = { startColumnIndex: 3, endColumnIndex: 8 }; // D:H

      expect(doGridRangesIntersect(rangeA, rangeB)).toBe(true);
    });

    it("should handle full column ranges not intersecting", () => {
      const rangeA: GridRange = { startColumnIndex: 0, endColumnIndex: 5 }; // A:E

      const rangeB: GridRange = { startColumnIndex: 6, endColumnIndex: 10 }; // G:J

      expect(doGridRangesIntersect(rangeA, rangeB)).toBe(false);
    });

    it("should handle full row ranges intersecting", () => {
      const rangeA: GridRange = { startRowIndex: 0, endRowIndex: 5 }; // 1:5

      const rangeB: GridRange = { startRowIndex: 3, endRowIndex: 8 }; // 4:8

      expect(doGridRangesIntersect(rangeA, rangeB)).toBe(true);
    });

    it("should handle full row ranges not intersecting", () => {
      const rangeA: GridRange = { startRowIndex: 0, endRowIndex: 5 }; // 1:5

      const rangeB: GridRange = { startRowIndex: 6, endRowIndex: 10 }; // 7:10

      expect(doGridRangesIntersect(rangeA, rangeB)).toBe(false);
    });

    it("should handle partial column range intersecting with full column range", () => {
      const rangeA: GridRange = { startColumnIndex: 0, endColumnIndex: 5 }; // A:E

      const rangeB: GridRange = {
        startRowIndex: 0,
        endRowIndex: 5,
        startColumnIndex: 3,
        endColumnIndex: 8
      }; // D1:H5

      expect(doGridRangesIntersect(rangeA, rangeB)).toBe(true);
    });

    it("should handle partial row range intersecting with full row range", () => {
      const rangeA: GridRange = { startRowIndex: 0, endRowIndex: 5 }; // 1:5

      const rangeB: GridRange = {
        startRowIndex: 3,
        endRowIndex: 8,
        startColumnIndex: 0,
        endColumnIndex: 5
      }; // A4:E8

      expect(doGridRangesIntersect(rangeA, rangeB)).toBe(true);
    });

    it("should handle ranges where one is a full sheet and the other is partial", () => {
      const fullSheet: GridRange = {
        startRowIndex: 0,
        endRowIndex: Infinity,
        startColumnIndex: 0,
        endColumnIndex: Infinity
      };

      const partialRange: GridRange = {
        startRowIndex: 10,
        endRowIndex: 20,
        startColumnIndex: 5,
        endColumnIndex: 15
      };

      expect(doGridRangesIntersect(fullSheet, partialRange)).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false if sheetId mismatch (both specified)", () => {
      const rangeA: GridRange = {
        sheetId: 100,
        startRowIndex: 0,
        endRowIndex: 5,
        startColumnIndex: 0,
        endColumnIndex: 5
      };

      const rangeB: GridRange = {
        sheetId: 101,
        startRowIndex: 0,
        endRowIndex: 5,
        startColumnIndex: 0,
        endColumnIndex: 5
      };

      expect(doGridRangesIntersect(rangeA, rangeB)).toBe(false);
    });

    it("should return false if sheetName mismatch (both specified, no sheetId)", () => {
      const rangeA: GridRange = {
        sheetName: "Sheet1",
        startRowIndex: 0,
        endRowIndex: 5,
        startColumnIndex: 0,
        endColumnIndex: 5
      };

      const rangeB: GridRange = {
        sheetName: "Sheet2",
        startRowIndex: 0,
        endRowIndex: 5,
        startColumnIndex: 0,
        endColumnIndex: 5
      };

      expect(doGridRangesIntersect(rangeA, rangeB)).toBe(false);
    });

    it("should return false if sheetId mismatch (one specified, one null)", () => {
      const rangeA: GridRange = {
        sheetId: 100,
        startRowIndex: 0,
        endRowIndex: 5,
        startColumnIndex: 0,
        endColumnIndex: 5
      };

      const rangeB: GridRange = {
        sheetId: null,
        startRowIndex: 0,
        endRowIndex: 5,
        startColumnIndex: 0,
        endColumnIndex: 5
      };

      expect(doGridRangesIntersect(rangeA, rangeB)).toBe(true);
    });

    it("should return false if sheetName mismatch (one specified, one null)", () => {
      const rangeA: GridRange = {
        sheetName: "Sheet1",
        startRowIndex: 0,
        endRowIndex: 5,
        startColumnIndex: 0,
        endColumnIndex: 5
      };

      const rangeB: GridRange = {
        sheetName: null,
        startRowIndex: 0,
        endRowIndex: 5,
        startColumnIndex: 0,
        endColumnIndex: 5
      };

      expect(doGridRangesIntersect(rangeA, rangeB)).toBe(true);
    });

    it("should return false if sheetId and sheetName mismatch (both specified)", () => {
      const rangeA: GridRange = {
        sheetId: 1,
        sheetName: "Sheet1",
        startRowIndex: 0,
        endRowIndex: 5,
        startColumnIndex: 0,
        endColumnIndex: 5
      };

      const rangeB: GridRange = {
        sheetId: 2,
        sheetName: "Sheet2",
        startRowIndex: 0,
        endRowIndex: 5,
        startColumnIndex: 0,
        endColumnIndex: 5
      };

      expect(doGridRangesIntersect(rangeA, rangeB)).toBe(false);
    });

    it("should return false if sheetId matches but sheetName mismatches (both specified) - unlikely scenario", () => {
      const rangeA: GridRange = {
        sheetId: 1,
        sheetName: "SheetA",
        startRowIndex: 0,
        endRowIndex: 5,
        startColumnIndex: 0,
        endColumnIndex: 5
      };

      const rangeB: GridRange = {
        sheetId: 1,
        sheetName: "SheetB",
        startRowIndex: 0,
        endRowIndex: 5,
        startColumnIndex: 0,
        endColumnIndex: 5
      };

      expect(doGridRangesIntersect(rangeA, rangeB)).toBe(false);
    });

    it("should return true if sheet info is completely omitted", () => {
      const rangeA: GridRange = {
        startRowIndex: 0,
        endRowIndex: 1,
        startColumnIndex: 0,
        endColumnIndex: 1
      };

      const rangeB: GridRange = {
        startRowIndex: 0,
        endRowIndex: 1,
        startColumnIndex: 0,
        endColumnIndex: 1
      };

      expect(doGridRangesIntersect(rangeA, rangeB)).toBe(true);
    });
  });
});

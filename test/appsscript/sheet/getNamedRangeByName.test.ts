import { getNamedRangeByName } from "@/appsscript";
import { EmptyStringException } from "@/exception";
import { InvalidSpreadsheetException } from "@/exception";
import { describe, expect, it } from "vitest";

interface SpreadsheetMock {
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
  calls: { count: number };
}

/**
 * A stand-in spreadsheet exposing the given named ranges, and counting how
 * often they were asked for.
 */
function spreadsheetMock(names: string[]): SpreadsheetMock {
  const calls = { count: 0 };

  const spreadsheet = {
    toString: () => "Spreadsheet",
    getNamedRanges: () => {
      calls.count += 1;

      return names.map((name: string) => ({ getName: () => name }));
    }
  } as unknown as GoogleAppsScript.Spreadsheet.Spreadsheet;

  return { spreadsheet, calls };
}

describe("getNamedRangeByName", () => {
  describe("Correct input data", () => {
    it("should return the named range whose name matches", () => {
      const { spreadsheet } = spreadsheetMock(["rates", "totals"]);

      expect(getNamedRangeByName(spreadsheet, "totals")?.getName()).toBe("totals");
    });

    it("should return null when no named range matches", () => {
      const { spreadsheet } = spreadsheetMock(["rates"]);

      expect(getNamedRangeByName(spreadsheet, "missing")).toBeNull();
    });

    it("should return null when the spreadsheet has no named ranges", () => {
      const { spreadsheet } = spreadsheetMock([]);

      expect(getNamedRangeByName(spreadsheet, "rates")).toBeNull();
    });

    it("should match exactly and case-sensitively", () => {
      const { spreadsheet } = spreadsheetMock(["rates"]);

      expect(getNamedRangeByName(spreadsheet, "Rates")).toBeNull();
      expect(getNamedRangeByName(spreadsheet, "rate")).toBeNull();
      expect(getNamedRangeByName(spreadsheet, "rates ")).toBeNull();
    });

    it("should find a sheet-scoped range by its prefixed name", () => {
      const { spreadsheet } = spreadsheetMock(["Sheet1!rates", "rates"]);

      expect(getNamedRangeByName(spreadsheet, "Sheet1!rates")?.getName()).toBe("Sheet1!rates");
    });

    it("should not return a sheet-scoped range for the bare name", () => {
      const { spreadsheet } = spreadsheetMock(["Sheet1!rates"]);

      expect(getNamedRangeByName(spreadsheet, "rates")).toBeNull();
    });

    it("should ask for the named ranges exactly once", () => {
      const { spreadsheet, calls } = spreadsheetMock(["rates"]);

      getNamedRangeByName(spreadsheet, "rates");

      expect(calls.count).toBe(1);
    });

    it("should ask for the named ranges exactly once on a miss too", () => {
      const { spreadsheet, calls } = spreadsheetMock(["rates"]);

      getNamedRangeByName(spreadsheet, "missing");

      expect(calls.count).toBe(1);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for anything that is not a spreadsheet", () => {
      expect(() =>
        getNamedRangeByName({} as GoogleAppsScript.Spreadsheet.Spreadsheet, "rates")
      ).toThrow(InvalidSpreadsheetException);
      expect(() =>
        getNamedRangeByName(null as unknown as GoogleAppsScript.Spreadsheet.Spreadsheet, "rates")
      ).toThrow(InvalidSpreadsheetException);
    });

    it("should throw for an empty name", () => {
      const { spreadsheet } = spreadsheetMock(["rates"]);

      expect(() => getNamedRangeByName(spreadsheet, "")).toThrow(EmptyStringException);
      expect(() => getNamedRangeByName(spreadsheet, "   ")).toThrow(EmptyStringException);
    });

    it("should throw for a name that is not a string", () => {
      const { spreadsheet } = spreadsheetMock(["rates"]);

      expect(() => getNamedRangeByName(spreadsheet, null as unknown as string)).toThrow(
        EmptyStringException
      );
      expect(() => getNamedRangeByName(spreadsheet, 42 as unknown as string)).toThrow(
        EmptyStringException
      );
    });

    it("should reject an invalid name before reaching the spreadsheet", () => {
      const { spreadsheet, calls } = spreadsheetMock(["rates"]);

      expect(() => getNamedRangeByName(spreadsheet, "")).toThrow(EmptyStringException);
      expect(calls.count).toBe(0);
    });
  });
});

import { requireSpreadsheet } from "@/appsscript";
import { InvalidSpreadsheetException } from "@/exception";
import { describe, expect, it } from "vitest";

/**
 * Apps Script service objects report their class name from `toString()`.
 */
const match = { toString: (): string => "Spreadsheet" };

describe("requireSpreadsheet", () => {
  describe("Correct input data", () => {
    it("should return the same object reference", () => {
      expect(requireSpreadsheet(match)).toBe(match);
    });

    it("should accept it with other members present", () => {
      const extended = { ...match, extra: (): number => 1 };

      expect(requireSpreadsheet(extended)).toBe(extended);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for a different service object", () => {
      expect(() => requireSpreadsheet({ toString: (): string => "Sheet" })).toThrow(
        InvalidSpreadsheetException
      );
    });

    it("should throw for plain objects, the bare string and nil values", () => {
      expect(() => requireSpreadsheet({})).toThrow(InvalidSpreadsheetException);
      expect(() => requireSpreadsheet("Spreadsheet")).toThrow(InvalidSpreadsheetException);
      expect(() => requireSpreadsheet(null)).toThrow(InvalidSpreadsheetException);
      expect(() => requireSpreadsheet(undefined)).toThrow(InvalidSpreadsheetException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireSpreadsheet(null)).toThrow(
        "Required Spreadsheet object is missing or invalid."
      );
    });

    it("should use a custom message when provided", () => {
      expect(() => requireSpreadsheet(null, "Open the file first.")).toThrow(
        "Open the file first."
      );
    });
  });
});

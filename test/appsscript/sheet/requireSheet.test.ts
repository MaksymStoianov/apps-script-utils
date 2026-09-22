import { requireSheet } from "@/appsscript";
import { InvalidSheetException } from "@/exception";
import { describe, expect, it } from "vitest";

/**
 * Apps Script service objects report their class name from `toString()`.
 */
const match = { toString: (): string => "Sheet" };

describe("requireSheet", () => {
  describe("Correct input data", () => {
    it("should return the same object reference", () => {
      expect(requireSheet(match)).toBe(match);
    });

    it("should accept it with other members present", () => {
      const extended = { ...match, extra: (): number => 1 };

      expect(requireSheet(extended)).toBe(extended);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for a different service object", () => {
      expect(() => requireSheet({ toString: (): string => "Spreadsheet" })).toThrow(
        InvalidSheetException
      );
    });

    it("should throw for plain objects, the bare string and nil values", () => {
      expect(() => requireSheet({})).toThrow(InvalidSheetException);
      expect(() => requireSheet("Sheet")).toThrow(InvalidSheetException);
      expect(() => requireSheet(null)).toThrow(InvalidSheetException);
      expect(() => requireSheet(undefined)).toThrow(InvalidSheetException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireSheet(null)).toThrow("Invalid Sheet object provided.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireSheet(null, "Open the file first.")).toThrow("Open the file first.");
    });
  });
});

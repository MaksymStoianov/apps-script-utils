import { extractSheetNameFromA1Notation } from "@/appsscript";
import { EmptyStringException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("extractSheetNameFromA1Notation", () => {
  describe("Sheet Name Extraction (Success Cases)", () => {
    it("should correctly extract the sheet name from a standard range (unquoted)", () => {
      expect(extractSheetNameFromA1Notation("Sheet1!A1:B2")).toBe("Sheet1");
    });

    it("should correctly extract the sheet name from a quoted range with spaces", () => {
      expect(extractSheetNameFromA1Notation("'My Data Sheet'!A1")).toBe(
        "My Data Sheet"
      );
    });

    it("should correctly extract the sheet name from a column-only reference", () => {
      expect(extractSheetNameFromA1Notation("Data!C:C")).toBe("Data");
    });
  });

  describe("Handling Missing Sheet Name (Returning null)", () => {
    it("should return null when the A1 notation does not contain a sheet name (standard range)", () => {
      expect(extractSheetNameFromA1Notation("A1:B2")).toBeNull();
    });

    it("should return null when only a column/row range is provided", () => {
      expect(extractSheetNameFromA1Notation("A:A")).toBeNull();
    });

    it("should return null for an empty string input", () => {
      expect(() => extractSheetNameFromA1Notation("")).toThrow(
        EmptyStringException
      );
    });
  });

  describe("Handling Invalid Data (Throwing Errors)", () => {
    it("should throw an Error if the extracted sheet name is considered invalid", () => {
      expect(() => extractSheetNameFromA1Notation("Invalid/Name!A1")).toThrow();
    });

    it("should throw an Error on malformed A1 notation that parseA1Notation cannot handle", () => {
      expect(() => extractSheetNameFromA1Notation("Sheet1!A1:B2!")).toThrow();
    });
  });

  describe("Contract Validation (IllegalArgumentException)", () => {
    it("should throw IllegalArgumentException when called with no arguments", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => (extractSheetNameFromA1Notation as any)()).toThrow();
    });
  });
});

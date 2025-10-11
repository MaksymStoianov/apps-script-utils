import { updateSheetNameInA1Notation } from "@/appsscript";
import { describe, expect, it } from "vitest";

describe("updateSheetNameInA1Notation", () => {
  describe("Adding/Replacing Sheet Name", () => {
    it("should add a simple sheet name to a plain range", () => {
      expect(updateSheetNameInA1Notation("B5", "Data")).toBe("Data!B5");
    });

    it("should replace an existing simple name with a new simple name", () => {
      expect(updateSheetNameInA1Notation("OldSheet!A1:C10", "NewSheet")).toBe(
        "NewSheet!A1:C10"
      );
    });

    it("should handle full column ranges correctly", () => {
      expect(updateSheetNameInA1Notation("A:A", "ColumnData")).toBe(
        "ColumnData!A:A"
      );
    });
  });

  describe("Sheet Name Escaping Logic", () => {
    it("should enclose a name with spaces in single quotes", () => {
      expect(updateSheetNameInA1Notation("A1", "My Data")).toBe("'My Data'!A1");
    });

    it("should enclose a name containing ! in single quotes", () => {
      expect(updateSheetNameInA1Notation("C1", "Alert!")).toBe("'Alert!'!C1");
    });

    it("should enclose a name with a single quote (') but no double quotes (\") in double quotes", () => {
      expect(updateSheetNameInA1Notation("B2", "Jon's Data")).toBe(
        '"Jon\'s Data"!B2'
      );
    });

    it("should escape a name containing both single and double quotes by doubling single quotes", () => {
      expect(
        updateSheetNameInA1Notation("D3:F3", "Data with ' and \"quotes")
      ).toBe("'Data with '' and \"quotes'!D3:F3");
    });

    it("should handle a name that only contains a single quote", () => {
      expect(updateSheetNameInA1Notation("A1", "O'Malley")).toBe(
        '"O\'Malley"!A1'
      );
    });
  });

  describe("Removing Sheet Name", () => {
    it("should return only the range when sheetName is null", () => {
      expect(updateSheetNameInA1Notation("Sheet1!A1:B2", null)).toBe("A1:B2");
    });

    it("should return only the range when sheetName is undefined", () => {
      expect(updateSheetNameInA1Notation("'Complex Name'!C:C", undefined)).toBe(
        "C:C"
      );
    });

    it("should return only the range when sheetName is an empty string (invalid)", () => {
      expect(updateSheetNameInA1Notation("Sheet1!A1", "")).toBe("A1");
    });

    it("should handle a plain range without a sheet name when removing", () => {
      expect(updateSheetNameInA1Notation("A1:B2", null)).toBe("A1:B2");
    });
  });
});

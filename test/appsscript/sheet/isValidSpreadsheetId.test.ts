import { isValidSpreadsheetId } from "@/appsscript";
import { describe, expect, it } from "vitest";

/** 44 characters, the usual shape of a Drive file id. */
const validId = "1AbCdEfGhIjKlMnOpQrStUvWxYz0123456789AbCdEfG";

describe("isValidSpreadsheetId", () => {
  describe("Correct input data", () => {
    it("should return true for a realistic spreadsheet id", () => {
      expect(isValidSpreadsheetId(validId)).toBe(true);
    });

    it("should return true at exactly the minimum length", () => {
      expect(isValidSpreadsheetId("a".repeat(25))).toBe(true);
    });

    it("should return true for ids containing hyphens and underscores", () => {
      expect(isValidSpreadsheetId("1Ab-Cd_Ef-Gh_Ij-Kl_Mn-Op_Qr")).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false one character below the minimum length", () => {
      expect(isValidSpreadsheetId("a".repeat(24))).toBe(false);
    });

    it("should return false for an ordinary sentence, which the old check accepted", () => {
      expect(isValidSpreadsheetId("hello world!")).toBe(false);
      expect(isValidSpreadsheetId("this is definitely not an id")).toBe(false);
    });

    it("should return false for a full Sheets URL", () => {
      expect(
        isValidSpreadsheetId(`https://docs.google.com/spreadsheets/d/${validId}/edit#gid=0`)
      ).toBe(false);
    });

    it("should return false for disallowed characters and padding", () => {
      expect(isValidSpreadsheetId(`${validId}!`)).toBe(false);
      expect(isValidSpreadsheetId(` ${validId} `)).toBe(false);
    });

    it("should return false for an empty string and non-string types", () => {
      expect(isValidSpreadsheetId("")).toBe(false);
      expect(isValidSpreadsheetId(null)).toBe(false);
      expect(isValidSpreadsheetId(undefined)).toBe(false);
      expect(isValidSpreadsheetId(42)).toBe(false);
    });
  });
});

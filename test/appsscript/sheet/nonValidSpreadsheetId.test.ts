import { nonValidSpreadsheetId } from "@/appsscript";
import { describe, expect, it } from "vitest";

/** 44 characters, the usual shape of a Drive file id. */
const validId = "1AbCdEfGhIjKlMnOpQrStUvWxYz0123456789AbCdEfG";

describe("nonValidSpreadsheetId", () => {
  describe("Correct input data", () => {
    it("should return false for a realistic spreadsheet id", () => {
      expect(nonValidSpreadsheetId(validId)).toBe(false);
    });

    it("should return false at exactly the minimum length", () => {
      expect(nonValidSpreadsheetId("a".repeat(25))).toBe(false);
    });

    it("should return false for ids containing hyphens and underscores", () => {
      expect(nonValidSpreadsheetId("1Ab-Cd_Ef-Gh_Ij-Kl_Mn-Op_Qr")).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true one character below the minimum length", () => {
      expect(nonValidSpreadsheetId("a".repeat(24))).toBe(true);
    });

    it("should return true for an ordinary sentence", () => {
      expect(nonValidSpreadsheetId("hello world!")).toBe(true);
      expect(nonValidSpreadsheetId("this is definitely not an id")).toBe(true);
    });

    it("should return true for a full Sheets URL", () => {
      expect(
        nonValidSpreadsheetId(`https://docs.google.com/spreadsheets/d/${validId}/edit#gid=0`)
      ).toBe(true);
    });

    it("should return true for disallowed characters and padding", () => {
      expect(nonValidSpreadsheetId(`${validId}!`)).toBe(true);
      expect(nonValidSpreadsheetId(` ${validId} `)).toBe(true);
    });

    it("should return true for an empty string and non-string types", () => {
      expect(nonValidSpreadsheetId("")).toBe(true);
      expect(nonValidSpreadsheetId(null)).toBe(true);
      expect(nonValidSpreadsheetId(42)).toBe(true);
    });
  });
});

import { requireValidSpreadsheetId } from "@/appsscript";
import { IllegalArgumentException } from "@/exception";
import { describe, expect, it } from "vitest";

/** 44 characters, the usual shape of a Drive file id. */
const validId = "1AbCdEfGhIjKlMnOpQrStUvWxYz0123456789AbCdEfG";

describe("requireValidSpreadsheetId", () => {
  describe("Correct input data", () => {
    it("should return a realistic id unchanged", () => {
      expect(requireValidSpreadsheetId(validId)).toBe(validId);
    });

    it("should accept exactly the minimum length", () => {
      const minimum = "a".repeat(25);

      expect(requireValidSpreadsheetId(minimum)).toBe(minimum);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw one character below the minimum length", () => {
      expect(() => requireValidSpreadsheetId("a".repeat(24))).toThrow(IllegalArgumentException);
    });

    it("should throw for an ordinary sentence", () => {
      expect(() => requireValidSpreadsheetId("hello world!")).toThrow(IllegalArgumentException);
    });

    it("should throw for an empty string and non-string types", () => {
      expect(() => requireValidSpreadsheetId("")).toThrow(IllegalArgumentException);
      expect(() => requireValidSpreadsheetId(null)).toThrow(IllegalArgumentException);
      expect(() => requireValidSpreadsheetId(42)).toThrow(IllegalArgumentException);
    });

    it("should use the generic message for input that is not URL-like", () => {
      expect(() => requireValidSpreadsheetId("hello world!")).toThrow(
        "Expected a valid spreadsheet id."
      );
    });
  });

  describe("A Sheets URL gets its own message", () => {
    it("should name the mistake when given a full URL", () => {
      expect(() =>
        requireValidSpreadsheetId(`https://docs.google.com/spreadsheets/d/${validId}/edit`)
      ).toThrow("Expected a spreadsheet id, but received a Sheets URL.");
    });

    it("should recognise the URL without the scheme or path", () => {
      expect(() => requireValidSpreadsheetId(`docs.google.com/spreadsheets/d/${validId}`)).toThrow(
        "Extract the id from it first."
      );
    });

    it("should still prefer a caller-supplied message", () => {
      expect(() =>
        requireValidSpreadsheetId(
          `https://docs.google.com/spreadsheets/d/${validId}/edit`,
          "Bad id."
        )
      ).toThrow("Bad id.");
    });
  });
});

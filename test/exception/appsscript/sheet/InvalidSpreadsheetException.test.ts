import { Exception, RuntimeException, InvalidSpreadsheetException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("InvalidSpreadsheetException", () => {
  describe("Message", () => {
    it("should carry its default message when none is provided", () => {
      expect(new InvalidSpreadsheetException().message).toBe(
        "Invalid Spreadsheet object provided."
      );
    });

    it("should carry a custom message when provided", () => {
      expect(new InvalidSpreadsheetException("Something specific.").message).toBe(
        "Something specific."
      );
    });

    it("should fall back to the default for an empty string", () => {
      expect(new InvalidSpreadsheetException("").message).toBe(
        "Invalid Spreadsheet object provided."
      );
    });

    it("should expose the message through getMessage and toString", () => {
      const exception = new InvalidSpreadsheetException("Something specific.");

      expect(exception.getMessage()).toBe("Something specific.");
      expect(exception.toString()).toBe("Something specific.");
    });
  });

  describe("Identity", () => {
    it("should report its own class name", () => {
      expect(new InvalidSpreadsheetException().name).toBe("InvalidSpreadsheetException");
    });

    it("should be an instance of its whole ancestry", () => {
      const exception = new InvalidSpreadsheetException();

      expect(exception).toBeInstanceOf(InvalidSpreadsheetException);
      expect(exception).toBeInstanceOf(RuntimeException);
      expect(exception).toBeInstanceOf(Exception);
      expect(exception).toBeInstanceOf(Error);
    });

    it("should be recognised by the Exception type guard", () => {
      expect(Exception.isException(new InvalidSpreadsheetException())).toBe(true);
    });

    it("should carry a stack trace", () => {
      expect(new InvalidSpreadsheetException().stack).toBeTypeOf("string");
    });

    it("should be catchable as a plain Error", () => {
      expect(() => {
        throw new InvalidSpreadsheetException();
      }).toThrow(Error);
    });
  });
});

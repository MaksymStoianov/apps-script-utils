import { Exception, RuntimeException, InvalidSheetException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("InvalidSheetException", () => {
  describe("Message", () => {
    it("should carry its default message when none is provided", () => {
      expect(new InvalidSheetException().message).toBe("Invalid Sheet object provided.");
    });

    it("should carry a custom message when provided", () => {
      expect(new InvalidSheetException("Something specific.").message).toBe("Something specific.");
    });

    it("should fall back to the default for an empty string", () => {
      expect(new InvalidSheetException("").message).toBe("Invalid Sheet object provided.");
    });

    it("should expose the message through getMessage and toString", () => {
      const exception = new InvalidSheetException("Something specific.");

      expect(exception.getMessage()).toBe("Something specific.");
      expect(exception.toString()).toBe("Something specific.");
    });
  });

  describe("Identity", () => {
    it("should report its own class name", () => {
      expect(new InvalidSheetException().name).toBe("InvalidSheetException");
    });

    it("should be an instance of its whole ancestry", () => {
      const exception = new InvalidSheetException();

      expect(exception).toBeInstanceOf(InvalidSheetException);
      expect(exception).toBeInstanceOf(RuntimeException);
      expect(exception).toBeInstanceOf(Exception);
      expect(exception).toBeInstanceOf(Error);
    });

    it("should be recognised by the Exception type guard", () => {
      expect(Exception.isException(new InvalidSheetException())).toBe(true);
    });

    it("should carry a stack trace", () => {
      expect(new InvalidSheetException().stack).toBeTypeOf("string");
    });

    it("should be catchable as a plain Error", () => {
      expect(() => {
        throw new InvalidSheetException();
      }).toThrow(Error);
    });
  });
});

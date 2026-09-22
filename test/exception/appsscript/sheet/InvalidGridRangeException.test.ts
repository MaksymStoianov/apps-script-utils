import { Exception, RuntimeException, InvalidGridRangeException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("InvalidGridRangeException", () => {
  describe("Message", () => {
    it("should carry its default message when none is provided", () => {
      expect(new InvalidGridRangeException().message).toBe("Invalid GridRange object provided.");
    });

    it("should carry a custom message when provided", () => {
      expect(new InvalidGridRangeException("Something specific.").message).toBe(
        "Something specific."
      );
    });

    it("should fall back to the default for an empty string", () => {
      expect(new InvalidGridRangeException("").message).toBe("Invalid GridRange object provided.");
    });

    it("should expose the message through getMessage and toString", () => {
      const exception = new InvalidGridRangeException("Something specific.");

      expect(exception.getMessage()).toBe("Something specific.");
      expect(exception.toString()).toBe("Something specific.");
    });
  });

  describe("Identity", () => {
    it("should report its own class name", () => {
      expect(new InvalidGridRangeException().name).toBe("InvalidGridRangeException");
    });

    it("should be an instance of its whole ancestry", () => {
      const exception = new InvalidGridRangeException();

      expect(exception).toBeInstanceOf(InvalidGridRangeException);
      expect(exception).toBeInstanceOf(RuntimeException);
      expect(exception).toBeInstanceOf(Exception);
      expect(exception).toBeInstanceOf(Error);
    });

    it("should be recognised by the Exception type guard", () => {
      expect(Exception.isException(new InvalidGridRangeException())).toBe(true);
    });

    it("should carry a stack trace", () => {
      expect(new InvalidGridRangeException().stack).toBeTypeOf("string");
    });

    it("should be catchable as a plain Error", () => {
      expect(() => {
        throw new InvalidGridRangeException();
      }).toThrow(Error);
    });
  });
});

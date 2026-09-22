import { Exception, RuntimeException, InvalidRangeException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("InvalidRangeException", () => {
  describe("Message", () => {
    it("should carry its default message when none is provided", () => {
      expect(new InvalidRangeException().message).toBe("Invalid Range object provided.");
    });

    it("should carry a custom message when provided", () => {
      expect(new InvalidRangeException("Something specific.").message).toBe("Something specific.");
    });

    it("should fall back to the default for an empty string", () => {
      expect(new InvalidRangeException("").message).toBe("Invalid Range object provided.");
    });

    it("should expose the message through getMessage and toString", () => {
      const exception = new InvalidRangeException("Something specific.");

      expect(exception.getMessage()).toBe("Something specific.");
      expect(exception.toString()).toBe("Something specific.");
    });
  });

  describe("Identity", () => {
    it("should report its own class name", () => {
      expect(new InvalidRangeException().name).toBe("InvalidRangeException");
    });

    it("should be an instance of its whole ancestry", () => {
      const exception = new InvalidRangeException();

      expect(exception).toBeInstanceOf(InvalidRangeException);
      expect(exception).toBeInstanceOf(RuntimeException);
      expect(exception).toBeInstanceOf(Exception);
      expect(exception).toBeInstanceOf(Error);
    });

    it("should be recognised by the Exception type guard", () => {
      expect(Exception.isException(new InvalidRangeException())).toBe(true);
    });

    it("should carry a stack trace", () => {
      expect(new InvalidRangeException().stack).toBeTypeOf("string");
    });

    it("should be catchable as a plain Error", () => {
      expect(() => {
        throw new InvalidRangeException();
      }).toThrow(Error);
    });
  });
});

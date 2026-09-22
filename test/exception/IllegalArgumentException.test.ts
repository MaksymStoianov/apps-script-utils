import { Exception, RuntimeException, IllegalArgumentException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("IllegalArgumentException", () => {
  describe("Message", () => {
    it("should carry its default message when none is provided", () => {
      expect(new IllegalArgumentException().message).toBe("Invalid argument");
    });

    it("should carry a custom message when provided", () => {
      expect(new IllegalArgumentException("Something specific.").message).toBe(
        "Something specific."
      );
    });

    it("should fall back to the default for an empty string", () => {
      expect(new IllegalArgumentException("").message).toBe("Invalid argument");
    });

    it("should expose the message through getMessage and toString", () => {
      const exception = new IllegalArgumentException("Something specific.");

      expect(exception.getMessage()).toBe("Something specific.");
      expect(exception.toString()).toBe("Something specific.");
    });
  });

  describe("Identity", () => {
    it("should report its own class name", () => {
      expect(new IllegalArgumentException().name).toBe("IllegalArgumentException");
    });

    it("should be an instance of its whole ancestry", () => {
      const exception = new IllegalArgumentException();

      expect(exception).toBeInstanceOf(IllegalArgumentException);
      expect(exception).toBeInstanceOf(RuntimeException);
      expect(exception).toBeInstanceOf(Exception);
      expect(exception).toBeInstanceOf(Error);
    });

    it("should be recognised by the Exception type guard", () => {
      expect(Exception.isException(new IllegalArgumentException())).toBe(true);
    });

    it("should carry a stack trace", () => {
      expect(new IllegalArgumentException().stack).toBeTypeOf("string");
    });

    it("should be catchable as a plain Error", () => {
      expect(() => {
        throw new IllegalArgumentException();
      }).toThrow(Error);
    });
  });
});

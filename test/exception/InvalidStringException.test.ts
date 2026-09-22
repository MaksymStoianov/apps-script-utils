import { Exception, RuntimeException, InvalidStringException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("InvalidStringException", () => {
  describe("Message", () => {
    it("should carry its default message when none is provided", () => {
      expect(new InvalidStringException().message).toBe("Invalid string provided.");
    });

    it("should carry a custom message when provided", () => {
      expect(new InvalidStringException("Something specific.").message).toBe("Something specific.");
    });

    it("should fall back to the default for an empty string", () => {
      expect(new InvalidStringException("").message).toBe("Invalid string provided.");
    });

    it("should expose the message through getMessage and toString", () => {
      const exception = new InvalidStringException("Something specific.");

      expect(exception.getMessage()).toBe("Something specific.");
      expect(exception.toString()).toBe("Something specific.");
    });
  });

  describe("Identity", () => {
    it("should report its own class name", () => {
      expect(new InvalidStringException().name).toBe("InvalidStringException");
    });

    it("should be an instance of its whole ancestry", () => {
      const exception = new InvalidStringException();

      expect(exception).toBeInstanceOf(InvalidStringException);
      expect(exception).toBeInstanceOf(RuntimeException);
      expect(exception).toBeInstanceOf(Exception);
      expect(exception).toBeInstanceOf(Error);
    });

    it("should be recognised by the Exception type guard", () => {
      expect(Exception.isException(new InvalidStringException())).toBe(true);
    });

    it("should carry a stack trace", () => {
      expect(new InvalidStringException().stack).toBeTypeOf("string");
    });

    it("should be catchable as a plain Error", () => {
      expect(() => {
        throw new InvalidStringException();
      }).toThrow(Error);
    });
  });
});

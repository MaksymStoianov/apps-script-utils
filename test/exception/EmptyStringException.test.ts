import { Exception, RuntimeException, EmptyStringException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("EmptyStringException", () => {
  describe("Message", () => {
    it("should carry its default message when none is provided", () => {
      expect(new EmptyStringException().message).toBe("String is null, undefined, or empty.");
    });

    it("should carry a custom message when provided", () => {
      expect(new EmptyStringException("Something specific.").message).toBe("Something specific.");
    });

    it("should fall back to the default for an empty string", () => {
      expect(new EmptyStringException("").message).toBe("String is null, undefined, or empty.");
    });

    it("should expose the message through getMessage and toString", () => {
      const exception = new EmptyStringException("Something specific.");

      expect(exception.getMessage()).toBe("Something specific.");
      expect(exception.toString()).toBe("Something specific.");
    });
  });

  describe("Identity", () => {
    it("should report its own class name", () => {
      expect(new EmptyStringException().name).toBe("EmptyStringException");
    });

    it("should be an instance of its whole ancestry", () => {
      const exception = new EmptyStringException();

      expect(exception).toBeInstanceOf(EmptyStringException);
      expect(exception).toBeInstanceOf(RuntimeException);
      expect(exception).toBeInstanceOf(Exception);
      expect(exception).toBeInstanceOf(Error);
    });

    it("should be recognised by the Exception type guard", () => {
      expect(Exception.isException(new EmptyStringException())).toBe(true);
    });

    it("should carry a stack trace", () => {
      expect(new EmptyStringException().stack).toBeTypeOf("string");
    });

    it("should be catchable as a plain Error", () => {
      expect(() => {
        throw new EmptyStringException();
      }).toThrow(Error);
    });
  });
});

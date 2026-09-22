import { Exception, RuntimeException, NullPointerException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("NullPointerException", () => {
  describe("Message", () => {
    it("should carry its default message when none is provided", () => {
      expect(new NullPointerException().message).toBe("Object is null or undefined.");
    });

    it("should carry a custom message when provided", () => {
      expect(new NullPointerException("Something specific.").message).toBe("Something specific.");
    });

    it("should fall back to the default for an empty string", () => {
      expect(new NullPointerException("").message).toBe("Object is null or undefined.");
    });

    it("should expose the message through getMessage and toString", () => {
      const exception = new NullPointerException("Something specific.");

      expect(exception.getMessage()).toBe("Something specific.");
      expect(exception.toString()).toBe("Something specific.");
    });
  });

  describe("Identity", () => {
    it("should report its own class name", () => {
      expect(new NullPointerException().name).toBe("NullPointerException");
    });

    it("should be an instance of its whole ancestry", () => {
      const exception = new NullPointerException();

      expect(exception).toBeInstanceOf(NullPointerException);
      expect(exception).toBeInstanceOf(RuntimeException);
      expect(exception).toBeInstanceOf(Exception);
      expect(exception).toBeInstanceOf(Error);
    });

    it("should be recognised by the Exception type guard", () => {
      expect(Exception.isException(new NullPointerException())).toBe(true);
    });

    it("should carry a stack trace", () => {
      expect(new NullPointerException().stack).toBeTypeOf("string");
    });

    it("should be catchable as a plain Error", () => {
      expect(() => {
        throw new NullPointerException();
      }).toThrow(Error);
    });
  });
});

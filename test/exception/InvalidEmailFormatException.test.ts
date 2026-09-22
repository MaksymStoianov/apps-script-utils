import { Exception, RuntimeException, InvalidEmailFormatException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("InvalidEmailFormatException", () => {
  describe("Message", () => {
    it("should carry its default message when none is provided", () => {
      expect(new InvalidEmailFormatException().message).toBe("Invalid email format.");
    });

    it("should carry a custom message when provided", () => {
      expect(new InvalidEmailFormatException("Something specific.").message).toBe(
        "Something specific."
      );
    });

    it("should fall back to the default for an empty string", () => {
      expect(new InvalidEmailFormatException("").message).toBe("Invalid email format.");
    });

    it("should expose the message through getMessage and toString", () => {
      const exception = new InvalidEmailFormatException("Something specific.");

      expect(exception.getMessage()).toBe("Something specific.");
      expect(exception.toString()).toBe("Something specific.");
    });
  });

  describe("Identity", () => {
    it("should report its own class name", () => {
      expect(new InvalidEmailFormatException().name).toBe("InvalidEmailFormatException");
    });

    it("should be an instance of its whole ancestry", () => {
      const exception = new InvalidEmailFormatException();

      expect(exception).toBeInstanceOf(InvalidEmailFormatException);
      expect(exception).toBeInstanceOf(RuntimeException);
      expect(exception).toBeInstanceOf(Exception);
      expect(exception).toBeInstanceOf(Error);
    });

    it("should be recognised by the Exception type guard", () => {
      expect(Exception.isException(new InvalidEmailFormatException())).toBe(true);
    });

    it("should carry a stack trace", () => {
      expect(new InvalidEmailFormatException().stack).toBeTypeOf("string");
    });

    it("should be catchable as a plain Error", () => {
      expect(() => {
        throw new InvalidEmailFormatException();
      }).toThrow(Error);
    });
  });
});

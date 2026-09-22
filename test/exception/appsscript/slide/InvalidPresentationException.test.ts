import { Exception, RuntimeException, InvalidPresentationException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("InvalidPresentationException", () => {
  describe("Message", () => {
    it("should carry its default message when none is provided", () => {
      expect(new InvalidPresentationException().message).toBe(
        "Invalid Presentation object provided."
      );
    });

    it("should carry a custom message when provided", () => {
      expect(new InvalidPresentationException("Something specific.").message).toBe(
        "Something specific."
      );
    });

    it("should fall back to the default for an empty string", () => {
      expect(new InvalidPresentationException("").message).toBe(
        "Invalid Presentation object provided."
      );
    });

    it("should expose the message through getMessage and toString", () => {
      const exception = new InvalidPresentationException("Something specific.");

      expect(exception.getMessage()).toBe("Something specific.");
      expect(exception.toString()).toBe("Something specific.");
    });
  });

  describe("Identity", () => {
    it("should report its own class name", () => {
      expect(new InvalidPresentationException().name).toBe("InvalidPresentationException");
    });

    it("should be an instance of its whole ancestry", () => {
      const exception = new InvalidPresentationException();

      expect(exception).toBeInstanceOf(InvalidPresentationException);
      expect(exception).toBeInstanceOf(RuntimeException);
      expect(exception).toBeInstanceOf(Exception);
      expect(exception).toBeInstanceOf(Error);
    });

    it("should be recognised by the Exception type guard", () => {
      expect(Exception.isException(new InvalidPresentationException())).toBe(true);
    });

    it("should carry a stack trace", () => {
      expect(new InvalidPresentationException().stack).toBeTypeOf("string");
    });

    it("should be catchable as a plain Error", () => {
      expect(() => {
        throw new InvalidPresentationException();
      }).toThrow(Error);
    });
  });
});

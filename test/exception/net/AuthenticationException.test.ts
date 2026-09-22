import { Exception, RuntimeException, AuthenticationException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("AuthenticationException", () => {
  describe("Message", () => {
    it("should carry its default message when none is provided", () => {
      expect(new AuthenticationException().message).toBe("Authentication failed.");
    });

    it("should carry a custom message when provided", () => {
      expect(new AuthenticationException("Something specific.").message).toBe(
        "Something specific."
      );
    });

    it("should fall back to the default for an empty string", () => {
      expect(new AuthenticationException("").message).toBe("Authentication failed.");
    });

    it("should expose the message through getMessage and toString", () => {
      const exception = new AuthenticationException("Something specific.");

      expect(exception.getMessage()).toBe("Something specific.");
      expect(exception.toString()).toBe("Something specific.");
    });
  });

  describe("Identity", () => {
    it("should report its own class name", () => {
      expect(new AuthenticationException().name).toBe("AuthenticationException");
    });

    it("should be an instance of its whole ancestry", () => {
      const exception = new AuthenticationException();

      expect(exception).toBeInstanceOf(AuthenticationException);
      expect(exception).toBeInstanceOf(RuntimeException);
      expect(exception).toBeInstanceOf(Exception);
      expect(exception).toBeInstanceOf(Error);
    });

    it("should be recognised by the Exception type guard", () => {
      expect(Exception.isException(new AuthenticationException())).toBe(true);
    });

    it("should carry a stack trace", () => {
      expect(new AuthenticationException().stack).toBeTypeOf("string");
    });

    it("should be catchable as a plain Error", () => {
      expect(() => {
        throw new AuthenticationException();
      }).toThrow(Error);
    });
  });
});

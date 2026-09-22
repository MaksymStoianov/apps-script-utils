import {
  AuthenticationException,
  AuthorizationException,
  Exception,
  RuntimeException
} from "@/exception";
import { describe, expect, it } from "vitest";

describe("AuthorizationException", () => {
  describe("Message", () => {
    it("should carry a default message when none is provided", () => {
      expect(new AuthorizationException().message).toBe(
        "The current user is not authorized to perform this action."
      );
    });

    it("should carry a custom message when provided", () => {
      expect(new AuthorizationException("Domain admin required.").message).toBe(
        "Domain admin required."
      );
    });

    it("should expose the message through getMessage and toString", () => {
      const exception = new AuthorizationException("Domain admin required.");

      expect(exception.getMessage()).toBe("Domain admin required.");
      expect(exception.toString()).toBe("Domain admin required.");
    });
  });

  describe("Identity", () => {
    it("should report its own class name", () => {
      expect(new AuthorizationException().name).toBe("AuthorizationException");
    });

    it("should be an instance of its whole ancestry", () => {
      const exception = new AuthorizationException();

      expect(exception).toBeInstanceOf(AuthorizationException);
      expect(exception).toBeInstanceOf(RuntimeException);
      expect(exception).toBeInstanceOf(Exception);
      expect(exception).toBeInstanceOf(Error);
    });

    it("should not be confused with AuthenticationException", () => {
      expect(new AuthorizationException()).not.toBeInstanceOf(AuthenticationException);
      expect(new AuthenticationException()).not.toBeInstanceOf(AuthorizationException);
    });

    it("should be recognised by the Exception type guard", () => {
      expect(Exception.isException(new AuthorizationException())).toBe(true);
    });

    it("should be catchable as a plain Error", () => {
      expect(() => {
        throw new AuthorizationException();
      }).toThrow(Error);
    });
  });
});

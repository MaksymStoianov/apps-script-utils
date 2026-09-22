import { Exception, RuntimeException, AdminDirectoryException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("AdminDirectoryException", () => {
  describe("Message", () => {
    it("should carry its default message when none is provided", () => {
      expect(new AdminDirectoryException().message).toBe(
        "Admin SDK Directory Service is not available or not enabled."
      );
    });

    it("should carry a custom message when provided", () => {
      expect(new AdminDirectoryException("Something specific.").message).toBe(
        "Something specific."
      );
    });

    it("should fall back to the default for an empty string", () => {
      expect(new AdminDirectoryException("").message).toBe(
        "Admin SDK Directory Service is not available or not enabled."
      );
    });

    it("should expose the message through getMessage and toString", () => {
      const exception = new AdminDirectoryException("Something specific.");

      expect(exception.getMessage()).toBe("Something specific.");
      expect(exception.toString()).toBe("Something specific.");
    });
  });

  describe("Identity", () => {
    it("should report its own class name", () => {
      expect(new AdminDirectoryException().name).toBe("AdminDirectoryException");
    });

    it("should be an instance of its whole ancestry", () => {
      const exception = new AdminDirectoryException();

      expect(exception).toBeInstanceOf(AdminDirectoryException);
      expect(exception).toBeInstanceOf(RuntimeException);
      expect(exception).toBeInstanceOf(Exception);
      expect(exception).toBeInstanceOf(Error);
    });

    it("should be recognised by the Exception type guard", () => {
      expect(Exception.isException(new AdminDirectoryException())).toBe(true);
    });

    it("should carry a stack trace", () => {
      expect(new AdminDirectoryException().stack).toBeTypeOf("string");
    });

    it("should be catchable as a plain Error", () => {
      expect(() => {
        throw new AdminDirectoryException();
      }).toThrow(Error);
    });
  });
});

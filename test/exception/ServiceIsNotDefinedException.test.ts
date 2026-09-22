import { Exception, RuntimeException, ServiceIsNotDefinedException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("ServiceIsNotDefinedException", () => {
  describe("Message", () => {
    it("should carry its default message when none is provided", () => {
      expect(new ServiceIsNotDefinedException().message).toBe("Service is not defined.");
    });

    it("should carry a custom message when provided", () => {
      expect(new ServiceIsNotDefinedException("Something specific.").message).toBe(
        "Something specific."
      );
    });

    it("should fall back to the default for an empty string", () => {
      expect(new ServiceIsNotDefinedException("").message).toBe("Service is not defined.");
    });

    it("should expose the message through getMessage and toString", () => {
      const exception = new ServiceIsNotDefinedException("Something specific.");

      expect(exception.getMessage()).toBe("Something specific.");
      expect(exception.toString()).toBe("Something specific.");
    });
  });

  describe("Identity", () => {
    it("should report its own class name", () => {
      expect(new ServiceIsNotDefinedException().name).toBe("ServiceIsNotDefinedException");
    });

    it("should be an instance of its whole ancestry", () => {
      const exception = new ServiceIsNotDefinedException();

      expect(exception).toBeInstanceOf(ServiceIsNotDefinedException);
      expect(exception).toBeInstanceOf(RuntimeException);
      expect(exception).toBeInstanceOf(Exception);
      expect(exception).toBeInstanceOf(Error);
    });

    it("should be recognised by the Exception type guard", () => {
      expect(Exception.isException(new ServiceIsNotDefinedException())).toBe(true);
    });

    it("should carry a stack trace", () => {
      expect(new ServiceIsNotDefinedException().stack).toBeTypeOf("string");
    });

    it("should be catchable as a plain Error", () => {
      expect(() => {
        throw new ServiceIsNotDefinedException();
      }).toThrow(Error);
    });
  });
});

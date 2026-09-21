import {
  Exception,
  IllegalArgumentException,
  IllegalStateException,
  RuntimeException
} from "@/exception";
import { describe, expect, it } from "vitest";

describe("IllegalStateException", () => {
  describe("Message", () => {
    it("should carry a default message when none is provided", () => {
      expect(new IllegalStateException().message).toBe("Illegal state");
    });

    it("should carry a custom message when provided", () => {
      expect(new IllegalStateException("Already running.").message).toBe("Already running.");
    });

    it("should expose the message through getMessage and toString", () => {
      const exception = new IllegalStateException("Already running.");

      expect(exception.getMessage()).toBe("Already running.");
      expect(exception.toString()).toBe("Already running.");
    });
  });

  describe("Identity", () => {
    it("should report its own class name", () => {
      expect(new IllegalStateException().name).toBe("IllegalStateException");
    });

    it("should be an instance of its whole ancestry", () => {
      const exception = new IllegalStateException();

      expect(exception).toBeInstanceOf(IllegalStateException);
      expect(exception).toBeInstanceOf(RuntimeException);
      expect(exception).toBeInstanceOf(Exception);
      expect(exception).toBeInstanceOf(Error);
    });

    it("should not be confused with IllegalArgumentException", () => {
      expect(new IllegalStateException()).not.toBeInstanceOf(IllegalArgumentException);
      expect(new IllegalArgumentException()).not.toBeInstanceOf(IllegalStateException);
    });

    it("should be recognised by the Exception type guard", () => {
      expect(Exception.isException(new IllegalStateException())).toBe(true);
    });

    it("should be catchable as a plain Error", () => {
      expect(() => {
        throw new IllegalStateException();
      }).toThrow(Error);
    });
  });
});

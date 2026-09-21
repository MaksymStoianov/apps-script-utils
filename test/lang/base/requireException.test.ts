import {
  Exception,
  IllegalArgumentException,
  InvalidStringException,
  RuntimeException
} from "@/exception";
import { requireException } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireException", () => {
  describe("Correct input data", () => {
    it("should return the same exception", () => {
      const exception = new Exception("boom");

      expect(requireException(exception)).toBe(exception);
    });

    it("should accept subclasses of Exception", () => {
      expect(requireException(new RuntimeException())).toBeInstanceOf(Exception);
      expect(requireException(new InvalidStringException())).toBeInstanceOf(Exception);
      expect(requireException(new IllegalArgumentException())).toBeInstanceOf(Exception);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for native errors", () => {
      expect(() => requireException(new Error("boom"))).toThrow(IllegalArgumentException);
      expect(() => requireException(new TypeError("boom"))).toThrow(IllegalArgumentException);
    });

    it("should throw for the Exception constructor itself", () => {
      expect(() => requireException(Exception)).toThrow(IllegalArgumentException);
    });

    it("should throw for an object merely shaped like an exception", () => {
      expect(() => requireException({ name: "Exception", message: "boom" })).toThrow(
        IllegalArgumentException
      );
    });

    it("should throw for nil values and primitives", () => {
      expect(() => requireException(null)).toThrow(IllegalArgumentException);
      expect(() => requireException(undefined)).toThrow(IllegalArgumentException);
      expect(() => requireException("boom")).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireException("boom")).toThrow("Expected an Exception.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireException("boom", "A library exception is required.")).toThrow(
        "A library exception is required."
      );
    });
  });
});

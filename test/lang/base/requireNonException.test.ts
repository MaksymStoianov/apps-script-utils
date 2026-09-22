import { Exception, IllegalArgumentException, RuntimeException } from "@/exception";
import { requireNonException } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNonException", () => {
  describe("Correct input data", () => {
    it("should return ordinary values unchanged", () => {
      const input = { ok: true };

      expect(requireNonException(input)).toBe(input);
      expect(requireNonException("boom")).toBe("boom");
      expect(requireNonException(null)).toBeNull();
    });

    it("should accept native errors", () => {
      const error = new Error("boom");

      expect(requireNonException(error)).toBe(error);
      expect(requireNonException(new TypeError("boom"))).toBeInstanceOf(TypeError);
    });

    it("should accept the Exception constructor itself", () => {
      expect(requireNonException(Exception)).toBe(Exception);
    });

    it("should accept an object merely shaped like an exception", () => {
      const lookalike = { name: "Exception", message: "boom" };

      expect(requireNonException(lookalike)).toBe(lookalike);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for Exception instances", () => {
      expect(() => requireNonException(new Exception("boom"))).toThrow(IllegalArgumentException);
    });

    it("should throw for subclasses of Exception", () => {
      expect(() => requireNonException(new RuntimeException())).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireNonException(new Exception())).toThrow(
        "Expected a value that is not an Exception."
      );
    });

    it("should use a custom message when provided", () => {
      expect(() => requireNonException(new Exception(), "A result was expected.")).toThrow(
        "A result was expected."
      );
    });
  });
});

import { IllegalArgumentException } from "@/exception";
import { requireNonString } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNonString", () => {
  describe("Correct input data", () => {
    it("should return numbers and booleans unchanged", () => {
      expect(requireNonString(42)).toBe(42);
      expect(requireNonString(0)).toBe(0);
      expect(requireNonString(false)).toBe(false);
    });

    it("should return nil values unchanged", () => {
      expect(requireNonString(null)).toBeNull();
      expect(requireNonString(undefined)).toBeUndefined();
    });

    it("should return the same object reference", () => {
      const input = { a: 1 };

      expect(requireNonString(input)).toBe(input);
    });

    it("should accept a boxed String object", () => {
      // eslint-disable-next-line no-new-wrappers
      const boxed = new String("abc");

      expect(requireNonString(boxed)).toBe(boxed);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for string primitives", () => {
      expect(() => requireNonString("abc")).toThrow(IllegalArgumentException);
      expect(() => requireNonString("42")).toThrow(IllegalArgumentException);
    });

    it("should throw for an empty string", () => {
      expect(() => requireNonString("")).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireNonString("abc")).toThrow("Expected a non-string value.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireNonString("42", "The value must already be parsed.")).toThrow(
        "The value must already be parsed."
      );
    });
  });
});

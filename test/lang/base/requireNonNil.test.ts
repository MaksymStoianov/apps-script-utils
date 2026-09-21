import { IllegalArgumentException } from "@/exception";
import { requireNonNil } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNonNil", () => {
  describe("Correct input data", () => {
    it("should return falsy values unchanged", () => {
      expect(requireNonNil(0)).toBe(0);
      expect(requireNonNil("")).toBe("");
      expect(requireNonNil(false)).toBe(false);
      expect(requireNonNil(NaN)).toBeNaN();
    });

    it("should return empty collections unchanged", () => {
      expect(requireNonNil([])).toEqual([]);
      expect(requireNonNil({})).toEqual({});
    });

    it("should return the same object reference", () => {
      const input = { a: 1 };

      expect(requireNonNil(input)).toBe(input);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for both nil values", () => {
      expect(() => requireNonNil(null)).toThrow(IllegalArgumentException);
      expect(() => requireNonNil(undefined)).toThrow(IllegalArgumentException);
    });

    it("should throw for a missing property", () => {
      expect(() => requireNonNil(({} as { missing?: unknown }).missing)).toThrow(
        IllegalArgumentException
      );
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireNonNil(null)).toThrow(
        "Expected a value that is neither null nor undefined."
      );
    });

    it("should use a custom message when provided", () => {
      expect(() => requireNonNil(null, "A target is required.")).toThrow("A target is required.");
    });
  });
});

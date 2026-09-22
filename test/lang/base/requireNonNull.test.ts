import { NullPointerException } from "@/exception";
import { requireNonNull } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNonNull", () => {
  describe("Correct input data", () => {
    it("should return falsy values that are not nil", () => {
      expect(requireNonNull(0)).toBe(0);
      expect(requireNonNull("")).toBe("");
      expect(requireNonNull(false)).toBe(false);
      expect(requireNonNull(NaN)).toBeNaN();
    });

    it("should return the same object reference", () => {
      const input = { a: 1 };

      expect(requireNonNull(input)).toBe(input);
    });

    it("should return empty collections", () => {
      expect(requireNonNull([])).toEqual([]);
      expect(requireNonNull({})).toEqual({});
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for both nil values", () => {
      expect(() => requireNonNull(null)).toThrow(NullPointerException);
      expect(() => requireNonNull(undefined)).toThrow(NullPointerException);
    });

    it("should throw when called with no argument at all", () => {
      expect(() => requireNonNull()).toThrow(NullPointerException);
    });

    it("should carry the exception default message when none is provided", () => {
      expect(() => requireNonNull(null)).toThrow("Object is null or undefined.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireNonNull(null, "The sheet was not resolved.")).toThrow(
        "The sheet was not resolved."
      );
    });
  });
});

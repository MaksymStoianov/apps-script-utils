import { IllegalArgumentException } from "@/exception";
import { requireNonUndefined } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNonUndefined", () => {
  describe("Correct input data", () => {
    it("should accept null, which is a set absence", () => {
      expect(requireNonUndefined(null)).toBeNull();
    });

    it("should return falsy values unchanged", () => {
      expect(requireNonUndefined(0)).toBe(0);
      expect(requireNonUndefined("")).toBe("");
      expect(requireNonUndefined(false)).toBe(false);
      expect(requireNonUndefined(NaN)).toBeNaN();
    });

    it("should return the same object reference", () => {
      const input = { a: 1 };

      expect(requireNonUndefined(input)).toBe(input);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for undefined", () => {
      expect(() => requireNonUndefined(undefined)).toThrow(IllegalArgumentException);
    });

    it("should throw for a missing property", () => {
      expect(() => requireNonUndefined(({} as { missing?: unknown }).missing)).toThrow(
        IllegalArgumentException
      );
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireNonUndefined(undefined)).toThrow("Expected a defined value.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireNonUndefined(undefined, "The option must be set.")).toThrow(
        "The option must be set."
      );
    });
  });
});

import { IllegalArgumentException } from "@/exception";
import { requireNil } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNil", () => {
  describe("Correct input data", () => {
    it("should accept both nil values", () => {
      expect(requireNil(null)).toBeNull();
      expect(requireNil(undefined)).toBeUndefined();
    });

    it("should accept a missing property", () => {
      expect(requireNil(({} as { missing?: unknown }).missing)).toBeUndefined();
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for falsy values that are not nil", () => {
      expect(() => requireNil(0)).toThrow(IllegalArgumentException);
      expect(() => requireNil("")).toThrow(IllegalArgumentException);
      expect(() => requireNil(false)).toThrow(IllegalArgumentException);
      expect(() => requireNil(NaN)).toThrow(IllegalArgumentException);
    });

    it("should throw for empty objects and arrays", () => {
      expect(() => requireNil({})).toThrow(IllegalArgumentException);
      expect(() => requireNil([])).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireNil(0)).toThrow("Expected null or undefined.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireNil(0, "This field must be left unset.")).toThrow(
        "This field must be left unset."
      );
    });
  });
});

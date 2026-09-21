import { IllegalArgumentException } from "@/exception";
import { requireNull } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNull", () => {
  describe("Correct input data", () => {
    it("should return null", () => {
      expect(requireNull(null)).toBeNull();
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for undefined", () => {
      expect(() => requireNull(undefined)).toThrow(IllegalArgumentException);
    });

    it("should throw for falsy values that are not null", () => {
      expect(() => requireNull(0)).toThrow(IllegalArgumentException);
      expect(() => requireNull("")).toThrow(IllegalArgumentException);
      expect(() => requireNull(false)).toThrow(IllegalArgumentException);
      expect(() => requireNull(NaN)).toThrow(IllegalArgumentException);
    });

    it("should throw for objects and primitives", () => {
      expect(() => requireNull({})).toThrow(IllegalArgumentException);
      expect(() => requireNull([])).toThrow(IllegalArgumentException);
      expect(() => requireNull("null")).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireNull(0)).toThrow("Expected null.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireNull(0, "The slot must still be empty.")).toThrow(
        "The slot must still be empty."
      );
    });
  });
});

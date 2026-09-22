import { IllegalArgumentException } from "@/exception";
import { requireBoolean } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireBoolean", () => {
  describe("Correct input data", () => {
    it("should return the value unchanged", () => {
      expect(requireBoolean(true)).toBe(true);
      expect(requireBoolean(false)).toBe(false);
    });

    it("should accept the result of a comparison", () => {
      expect(requireBoolean(1 > 0)).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for truthy and falsy stand-ins", () => {
      expect(() => requireBoolean(1)).toThrow(IllegalArgumentException);
      expect(() => requireBoolean(0)).toThrow(IllegalArgumentException);
      expect(() => requireBoolean("true")).toThrow(IllegalArgumentException);
      expect(() => requireBoolean("")).toThrow(IllegalArgumentException);
    });

    it("should throw for nil values", () => {
      expect(() => requireBoolean(null)).toThrow(IllegalArgumentException);
      expect(() => requireBoolean(undefined)).toThrow(IllegalArgumentException);
    });

    it("should throw for other types", () => {
      expect(() => requireBoolean([])).toThrow(IllegalArgumentException);
      expect(() => requireBoolean({})).toThrow(IllegalArgumentException);
      expect(() => requireBoolean(() => true)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireBoolean(1)).toThrow("Expected a boolean.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireBoolean(1, "The flag must be a boolean.")).toThrow(
        "The flag must be a boolean."
      );
    });
  });
});

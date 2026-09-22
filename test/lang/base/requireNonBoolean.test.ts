import { IllegalArgumentException } from "@/exception";
import { requireNonBoolean } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNonBoolean", () => {
  describe("Correct input data", () => {
    it("should return truthy and falsy non-booleans unchanged", () => {
      expect(requireNonBoolean(1)).toBe(1);
      expect(requireNonBoolean(0)).toBe(0);
      expect(requireNonBoolean("true")).toBe("true");
      expect(requireNonBoolean("")).toBe("");
    });

    it("should return nil values unchanged", () => {
      expect(requireNonBoolean(null)).toBeNull();
      expect(requireNonBoolean(undefined)).toBeUndefined();
    });

    it("should accept a boxed Boolean object", () => {
      // eslint-disable-next-line no-new-wrappers
      const boxed = new Boolean(true);

      expect(requireNonBoolean(boxed)).toBe(boxed);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for boolean primitives", () => {
      expect(() => requireNonBoolean(true)).toThrow(IllegalArgumentException);
      expect(() => requireNonBoolean(false)).toThrow(IllegalArgumentException);
    });

    it("should throw for a comparison result", () => {
      expect(() => requireNonBoolean(1 > 0)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireNonBoolean(true)).toThrow("Expected a non-boolean value.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireNonBoolean(true, "A value was expected, not a flag.")).toThrow(
        "A value was expected, not a flag."
      );
    });
  });
});

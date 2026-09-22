import { isBoolean } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isBoolean", () => {
  describe("Correct input data", () => {
    it("should return true for boolean primitives", () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
    });

    it("should return true for a comparison result", () => {
      expect(isBoolean(1 > 0)).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for a boxed Boolean object", () => {
      expect(isBoolean(new Boolean(true))).toBe(false);
    });

    it("should return false for truthy and falsy stand-ins", () => {
      expect(isBoolean(1)).toBe(false);
      expect(isBoolean(0)).toBe(false);
      expect(isBoolean("true")).toBe(false);
      expect(isBoolean("")).toBe(false);
    });

    it("should return false for nil values and objects", () => {
      expect(isBoolean(null)).toBe(false);
      expect(isBoolean(undefined)).toBe(false);
      expect(isBoolean({})).toBe(false);
    });
  });
});

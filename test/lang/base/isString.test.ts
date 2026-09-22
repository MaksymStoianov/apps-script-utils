import { isString } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isString", () => {
  describe("Correct input data", () => {
    it("should return true for string primitives", () => {
      expect(isString("")).toBe(true);
      expect(isString("abc")).toBe(true);
      expect(isString(`template`)).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for a boxed String object", () => {
      expect(isString(new String("abc"))).toBe(false);
    });

    it("should return false for values that stringify readily", () => {
      expect(isString(42)).toBe(false);
      expect(isString(["abc"])).toBe(false);
      expect(isString({ toString: () => "abc" })).toBe(false);
    });

    it("should return false for nil values", () => {
      expect(isString(null)).toBe(false);
      expect(isString(undefined)).toBe(false);
    });
  });
});

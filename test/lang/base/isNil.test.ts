import { isNil } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isNil", () => {
  describe("Correct input data", () => {
    it("should return true for both nil values", () => {
      expect(isNil(null)).toBe(true);
      expect(isNil(undefined)).toBe(true);
    });

    it("should return true for a missing property", () => {
      expect(isNil(({} as { missing?: unknown }).missing)).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for the other falsy values", () => {
      expect(isNil(0)).toBe(false);
      expect(isNil(-0)).toBe(false);
      expect(isNil("")).toBe(false);
      expect(isNil(false)).toBe(false);
      expect(isNil(NaN)).toBe(false);
    });

    it("should return false for empty containers", () => {
      expect(isNil({})).toBe(false);
      expect(isNil([])).toBe(false);
    });
  });
});

import { isCountable } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isCountable", () => {
  describe("Correct input data", () => {
    it("should accept zero and positive whole numbers", () => {
      expect(isCountable(0)).toBe(true);
      expect(isCountable(-0)).toBe(true);
      expect(isCountable(1)).toBe(true);
      expect(isCountable(1000)).toBe(true);
    });

    it("should accept the maximum safe integer", () => {
      expect(isCountable(Number.MAX_SAFE_INTEGER)).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should reject negatives", () => {
      expect(isCountable(-1)).toBe(false);
    });

    it("should reject fractions", () => {
      expect(isCountable(1.5)).toBe(false);
    });

    it("should reject values past the safe integer range", () => {
      expect(isCountable(Number.MAX_SAFE_INTEGER + 2)).toBe(false);
      expect(isCountable(Infinity)).toBe(false);
    });

    it("should reject NaN and non-numeric types", () => {
      expect(isCountable(NaN)).toBe(false);
      expect(isCountable("1")).toBe(false);
      expect(isCountable(null)).toBe(false);
    });
  });
});

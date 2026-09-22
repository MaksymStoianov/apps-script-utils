import { nonNegative } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonNegative", () => {
  describe("Correct input data", () => {
    it("should accept zero and positive numbers", () => {
      expect(nonNegative(0)).toBe(true);
      expect(nonNegative(-0)).toBe(true);
      expect(nonNegative(1)).toBe(true);
      expect(nonNegative(3.14)).toBe(true);
    });

    it("should accept positive infinity", () => {
      expect(nonNegative(Infinity)).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should reject negatives", () => {
      expect(nonNegative(-1)).toBe(false);
      expect(nonNegative(-0.1)).toBe(false);
      expect(nonNegative(-Infinity)).toBe(false);
    });

    it("should reject NaN, which is neither negative nor not", () => {
      expect(nonNegative(NaN)).toBe(false);
    });

    it("should reject numeric strings and other types", () => {
      expect(nonNegative("1")).toBe(false);
      expect(nonNegative(null)).toBe(false);
      expect(nonNegative(true)).toBe(false);
    });
  });
});

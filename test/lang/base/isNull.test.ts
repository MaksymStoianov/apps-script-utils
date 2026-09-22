import { isNull } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isNull", () => {
  describe("Correct input data", () => {
    it("should return true only for null", () => {
      expect(isNull(null)).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for undefined", () => {
      expect(isNull(undefined)).toBe(false);
    });

    it("should return false for the other falsy values", () => {
      expect(isNull(0)).toBe(false);
      expect(isNull("")).toBe(false);
      expect(isNull(false)).toBe(false);
      expect(isNull(NaN)).toBe(false);
    });

    it("should return false for the string null and empty containers", () => {
      expect(isNull("null")).toBe(false);
      expect(isNull({})).toBe(false);
      expect(isNull([])).toBe(false);
    });
  });
});

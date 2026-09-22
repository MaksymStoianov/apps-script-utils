import { isUndefined } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isUndefined", () => {
  describe("Correct input data", () => {
    it("should return true for undefined", () => {
      expect(isUndefined(undefined)).toBe(true);
    });

    it("should return true for a missing property", () => {
      expect(isUndefined(({} as { missing?: unknown }).missing)).toBe(true);
    });

    it("should return true for a missing argument", () => {
      const takesOne = (first?: unknown): unknown => first;

      expect(isUndefined(takesOne())).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for null", () => {
      expect(isUndefined(null)).toBe(false);
    });

    it("should return false for the other falsy values", () => {
      expect(isUndefined(0)).toBe(false);
      expect(isUndefined("")).toBe(false);
      expect(isUndefined(false)).toBe(false);
    });

    it("should return false for the string undefined", () => {
      expect(isUndefined("undefined")).toBe(false);
    });
  });
});

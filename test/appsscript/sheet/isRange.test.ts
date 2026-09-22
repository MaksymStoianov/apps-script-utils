import { isRange } from "@/appsscript";
import { describe, expect, it } from "vitest";

/**
 * Apps Script service objects report their class name from `toString()`.
 */
const match = { toString: (): string => "Range" };

describe("isRange", () => {
  describe("Correct input data", () => {
    it("should accept an object reporting itself as Range", () => {
      expect(isRange(match)).toBe(true);
    });

    it("should accept it with other members present", () => {
      expect(isRange({ ...match, extra: (): number => 1 })).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should reject a different service object", () => {
      expect(isRange({ toString: (): string => "Sheet" })).toBe(false);
    });

    it("should reject a differently-cased name", () => {
      expect(isRange({ toString: (): string => "range" })).toBe(false);
    });

    it("should reject a plain object, whose tag is [object Object]", () => {
      expect(isRange({})).toBe(false);
    });

    it("should reject the bare string Range", () => {
      expect(isRange("Range")).toBe(false);
    });

    it("should reject nil values, primitives and arrays", () => {
      expect(isRange(null)).toBe(false);
      expect(isRange(undefined)).toBe(false);
      expect(isRange(42)).toBe(false);
      expect(isRange([])).toBe(false);
    });
  });
});

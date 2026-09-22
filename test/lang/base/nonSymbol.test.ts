import { nonSymbol } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonSymbol", () => {
  describe("Correct input data", () => {
    it("should return false for a symbol literal", () => {
      expect(nonSymbol(Symbol())).toBe(false);
      expect(nonSymbol(Symbol("description"))).toBe(false);
    });

    it("should return false for a well-known symbol", () => {
      expect(nonSymbol(Symbol.iterator)).toBe(false);
      expect(nonSymbol(Symbol.asyncIterator)).toBe(false);
    });

    it("should return false for a registered symbol", () => {
      expect(nonSymbol(Symbol.for("app"))).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for nil values", () => {
      expect(nonSymbol(null)).toBe(true);
      expect(nonSymbol(undefined)).toBe(true);
    });

    it("should return true for primitives", () => {
      expect(nonSymbol("symbol")).toBe(true);
      expect(nonSymbol(0)).toBe(true);
      expect(nonSymbol(false)).toBe(true);
      expect(nonSymbol(0n)).toBe(true);
    });

    it("should return true for objects and functions", () => {
      expect(nonSymbol({})).toBe(true);
      expect(nonSymbol([])).toBe(true);
      expect(nonSymbol(() => {})).toBe(true);
      expect(nonSymbol(Symbol)).toBe(true);
    });

    it("should return true for a boxed symbol object", () => {
      expect(nonSymbol(Object(Symbol("boxed")))).toBe(true);
    });
  });
});

import { isSymbol } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isSymbol", () => {
  describe("Correct input data", () => {
    it("should return true for symbols", () => {
      expect(isSymbol(Symbol())).toBe(true);
      expect(isSymbol(Symbol("id"))).toBe(true);
    });

    it("should return true for well-known and registered symbols", () => {
      expect(isSymbol(Symbol.iterator)).toBe(true);
      expect(isSymbol(Symbol.for("app"))).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for a boxed symbol object", () => {
      expect(isSymbol(Object(Symbol("boxed")))).toBe(false);
    });

    it("should return false for the Symbol constructor itself", () => {
      expect(isSymbol(Symbol)).toBe(false);
    });

    it("should return false for nil values and primitives", () => {
      expect(isSymbol(null)).toBe(false);
      expect(isSymbol(undefined)).toBe(false);
      expect(isSymbol("symbol")).toBe(false);
    });
  });
});

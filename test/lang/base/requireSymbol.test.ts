import { IllegalArgumentException } from "@/exception";
import { requireSymbol } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireSymbol", () => {
  describe("Correct input data", () => {
    it("should return the same symbol", () => {
      const symbol = Symbol("id");

      expect(requireSymbol(symbol)).toBe(symbol);
    });

    it("should accept well-known and registered symbols", () => {
      expect(requireSymbol(Symbol.iterator)).toBe(Symbol.iterator);
      expect(requireSymbol(Symbol.for("app"))).toBe(Symbol.for("app"));
    });

    it("should accept a symbol without a description", () => {
      expect(requireSymbol(Symbol())).toBeTypeOf("symbol");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for the Symbol constructor itself", () => {
      expect(() => requireSymbol(Symbol)).toThrow(IllegalArgumentException);
    });

    it("should throw for a boxed symbol object", () => {
      expect(() => requireSymbol(Object(Symbol("boxed")))).toThrow(IllegalArgumentException);
    });

    it("should throw for nil values and primitives", () => {
      expect(() => requireSymbol(null)).toThrow(IllegalArgumentException);
      expect(() => requireSymbol(undefined)).toThrow(IllegalArgumentException);
      expect(() => requireSymbol("id")).toThrow(IllegalArgumentException);
      expect(() => requireSymbol(0)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireSymbol("id")).toThrow("Expected a symbol.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireSymbol("id", "The key must be a symbol.")).toThrow(
        "The key must be a symbol."
      );
    });
  });
});

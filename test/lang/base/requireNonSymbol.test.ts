import { IllegalArgumentException } from "@/exception";
import { requireNonSymbol } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNonSymbol", () => {
  describe("Correct input data", () => {
    it("should return primitives unchanged", () => {
      expect(requireNonSymbol("id")).toBe("id");
      expect(requireNonSymbol(0)).toBe(0);
      expect(requireNonSymbol(false)).toBe(false);
    });

    it("should return nil values unchanged", () => {
      expect(requireNonSymbol(null)).toBeNull();
      expect(requireNonSymbol(undefined)).toBeUndefined();
    });

    it("should accept the Symbol constructor and a boxed symbol", () => {
      expect(requireNonSymbol(Symbol)).toBe(Symbol);
      expect(requireNonSymbol(Object(Symbol("boxed")))).toBeTypeOf("object");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for symbols", () => {
      expect(() => requireNonSymbol(Symbol())).toThrow(IllegalArgumentException);
      expect(() => requireNonSymbol(Symbol("id"))).toThrow(IllegalArgumentException);
    });

    it("should throw for well-known and registered symbols", () => {
      expect(() => requireNonSymbol(Symbol.iterator)).toThrow(IllegalArgumentException);
      expect(() => requireNonSymbol(Symbol.for("app"))).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireNonSymbol(Symbol("id"))).toThrow("Expected a non-symbol value.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireNonSymbol(Symbol("id"), "A serialisable value is required.")).toThrow(
        "A serialisable value is required."
      );
    });
  });
});

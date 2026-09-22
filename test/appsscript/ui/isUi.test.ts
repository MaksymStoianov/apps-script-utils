import { isUi } from "@/appsscript";
import { describe, expect, it } from "vitest";

/**
 * Apps Script service objects report their class name from `toString()`.
 */
const match = { toString: (): string => "Ui" };

describe("isUi", () => {
  describe("Correct input data", () => {
    it("should accept an object reporting itself as Ui", () => {
      expect(isUi(match)).toBe(true);
    });

    it("should accept it with other members present", () => {
      expect(isUi({ ...match, extra: (): number => 1 })).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should reject a different service object", () => {
      expect(isUi({ toString: (): string => "Sheet" })).toBe(false);
    });

    it("should reject a differently-cased name", () => {
      expect(isUi({ toString: (): string => "ui" })).toBe(false);
    });

    it("should reject a plain object, whose tag is [object Object]", () => {
      expect(isUi({})).toBe(false);
    });

    it("should reject the bare string Ui", () => {
      expect(isUi("Ui")).toBe(false);
    });

    it("should reject nil values, primitives and arrays", () => {
      expect(isUi(null)).toBe(false);
      expect(isUi(undefined)).toBe(false);
      expect(isUi(42)).toBe(false);
      expect(isUi([])).toBe(false);
    });
  });
});

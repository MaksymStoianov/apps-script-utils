import { isSheet } from "@/appsscript";
import { describe, expect, it } from "vitest";

/**
 * Apps Script service objects report their class name from `toString()`.
 */
const match = { toString: (): string => "Sheet" };

describe("isSheet", () => {
  describe("Correct input data", () => {
    it("should accept an object reporting itself as Sheet", () => {
      expect(isSheet(match)).toBe(true);
    });

    it("should accept it with other members present", () => {
      expect(isSheet({ ...match, extra: (): number => 1 })).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should reject a different service object", () => {
      expect(isSheet({ toString: (): string => "Spreadsheet" })).toBe(false);
    });

    it("should reject a differently-cased name", () => {
      expect(isSheet({ toString: (): string => "sheet" })).toBe(false);
    });

    it("should reject a plain object, whose tag is [object Object]", () => {
      expect(isSheet({})).toBe(false);
    });

    it("should reject the bare string Sheet", () => {
      expect(isSheet("Sheet")).toBe(false);
    });

    it("should reject nil values, primitives and arrays", () => {
      expect(isSheet(null)).toBe(false);
      expect(isSheet(undefined)).toBe(false);
      expect(isSheet(42)).toBe(false);
      expect(isSheet([])).toBe(false);
    });
  });
});

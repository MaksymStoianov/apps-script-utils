import { isSpreadsheet } from "@/appsscript";
import { describe, expect, it } from "vitest";

/**
 * Apps Script service objects report their class name from `toString()`.
 */
const match = { toString: (): string => "Spreadsheet" };

describe("isSpreadsheet", () => {
  describe("Correct input data", () => {
    it("should accept an object reporting itself as Spreadsheet", () => {
      expect(isSpreadsheet(match)).toBe(true);
    });

    it("should accept it with other members present", () => {
      expect(isSpreadsheet({ ...match, extra: (): number => 1 })).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should reject a different service object", () => {
      expect(isSpreadsheet({ toString: (): string => "Sheet" })).toBe(false);
    });

    it("should reject a differently-cased name", () => {
      expect(isSpreadsheet({ toString: (): string => "spreadsheet" })).toBe(false);
    });

    it("should reject a plain object, whose tag is [object Object]", () => {
      expect(isSpreadsheet({})).toBe(false);
    });

    it("should reject the bare string Spreadsheet", () => {
      expect(isSpreadsheet("Spreadsheet")).toBe(false);
    });

    it("should reject nil values, primitives and arrays", () => {
      expect(isSpreadsheet(null)).toBe(false);
      expect(isSpreadsheet(undefined)).toBe(false);
      expect(isSpreadsheet(42)).toBe(false);
      expect(isSpreadsheet([])).toBe(false);
    });
  });
});

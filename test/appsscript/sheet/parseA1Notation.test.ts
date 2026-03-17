import { parseA1Notation } from "@/appsscript/sheet/parseA1Notation";
import { describe, expect, it } from "vitest";

describe("parseA1Notation", () => {
  describe("valid cases", () => {
    it("should parse 'A1:AZ10'", () => {
      expect(parseA1Notation("A1:AZ10")).toEqual({
        sheetName: null,
        a1Notation: "A1:AZ10",
        startRowIndex: 0,
        endRowIndex: 10,
        startColumnIndex: 0,
        endColumnIndex: 52
      });
    });

    it("should parse 'B5'", () => {
      expect(parseA1Notation("B5")).toEqual({
        sheetName: null,
        a1Notation: "B5",
        startRowIndex: 4,
        endRowIndex: 5,
        startColumnIndex: 1,
        endColumnIndex: 2
      });
    });

    it("should parse '5:15'", () => {
      expect(parseA1Notation("5:15")).toEqual({
        sheetName: null,
        a1Notation: "5:15",
        startRowIndex: 4,
        endRowIndex: 15,
        startColumnIndex: 0,
        endColumnIndex: null
      });
    });

    it("should parse 'M:X'", () => {
      expect(parseA1Notation("M:X")).toEqual({
        sheetName: null,
        a1Notation: "M:X",
        startRowIndex: 0,
        endRowIndex: null,
        startColumnIndex: 12,
        endColumnIndex: 24
      });
    });

    it("should parse 'Sheet1!A1:B2'", () => {
      expect(parseA1Notation("Sheet1!A1:B2")).toEqual({
        sheetName: "Sheet1",
        a1Notation: "A1:B2",
        startRowIndex: 0,
        endRowIndex: 2,
        startColumnIndex: 0,
        endColumnIndex: 2
      });
    });

    it("should parse \"'Sheet name'!A1:B2\"", () => {
      expect(parseA1Notation("'Sheet name'!A1:B2")).toEqual({
        sheetName: "Sheet name",
        a1Notation: "A1:B2",
        startRowIndex: 0,
        endRowIndex: 2,
        startColumnIndex: 0,
        endColumnIndex: 2
      });
    });

    it("should parse 'A1:B'", () => {
      expect(parseA1Notation("A1:B")).toEqual({
        sheetName: null,
        a1Notation: "A1:B",
        startRowIndex: 0,
        endRowIndex: null,
        startColumnIndex: 0,
        endColumnIndex: 2
      });
    });

    it("should parse 'A:B10'", () => {
      expect(parseA1Notation("A:B10")).toEqual({
        sheetName: null,
        a1Notation: "A:B10",
        startRowIndex: 0,
        endRowIndex: 10,
        startColumnIndex: 0,
        endColumnIndex: 2
      });
    });

    it("should parse lowercase 'a1:b2'", () => {
      expect(parseA1Notation("a1:b2")).toEqual({
        sheetName: null,
        a1Notation: "A1:B2",
        startRowIndex: 0,
        endRowIndex: 2,
        startColumnIndex: 0,
        endColumnIndex: 2
      });
    });
  });

  describe("invalid cases", () => {
    it("should throw SyntaxError for '10:B20' (not supported by original logic)", () => {
      expect(() => parseA1Notation("10:B20")).toThrow(SyntaxError);
    });

    it("should throw IllegalArgumentException if no arguments", () => {
      // @ts-expect-error: Testing missing argument
      expect(() => parseA1Notation()).toThrow();
    });

    it("should throw SyntaxError for '15:M5' (as in original code it seems to fail specific matches)", () => {
      expect(() => parseA1Notation("15:M5")).toThrow(SyntaxError);
    });

    it("should throw SyntaxError for invalid notation", () => {
      expect(() => parseA1Notation("!!!")).toThrow(SyntaxError);
    });
  });

  describe("edge cases", () => {
    it("should parse 'B2:B2'", () => {
      expect(parseA1Notation("B2:B2")).toEqual({
        sheetName: null,
        a1Notation: "B2",
        startRowIndex: 1,
        endRowIndex: 2,
        startColumnIndex: 1,
        endColumnIndex: 2
      });
    });

    it("should parse 'B'", () => {
      expect(parseA1Notation("B")).toEqual({
        sheetName: null,
        a1Notation: "B:B",
        startRowIndex: 0,
        endRowIndex: null,
        startColumnIndex: 1,
        endColumnIndex: 2
      });
    });

    it("should parse '5'", () => {
      expect(parseA1Notation("5")).toEqual({
        sheetName: null,
        a1Notation: "5:5",
        startRowIndex: 4,
        endRowIndex: 5,
        startColumnIndex: 0,
        endColumnIndex: null
      });
    });

    it("should parse '15:5' (reverse order)", () => {
      expect(parseA1Notation("15:5")).toEqual({
        sheetName: null,
        a1Notation: "5:15",
        startRowIndex: 4,
        endRowIndex: 15,
        startColumnIndex: 0,
        endColumnIndex: null
      });
    });

    it("should parse '10:1' (reverse order)", () => {
      expect(parseA1Notation("10:1")).toEqual({
        sheetName: null,
        a1Notation: "1:10",
        startRowIndex: 0,
        endRowIndex: 10,
        startColumnIndex: 0,
        endColumnIndex: null
      });
    });
  });
});

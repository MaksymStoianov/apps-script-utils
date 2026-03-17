import { extractRangeFromA1Notation } from "@/appsscript";
import { IllegalArgumentException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("extractRangeFromA1Notation", () => {
  describe("Range Extraction (Success Cases)", () => {
    it("should correctly extract the range from a full A1 notation with unquoted sheet name", () => {
      expect(extractRangeFromA1Notation("Sheet1!A1:B2")).toBe("A1:B2");
    });

    it("should correctly extract the range from a notation with a quoted sheet name", () => {
      expect(extractRangeFromA1Notation("'My Sheet'!C1:D4")).toBe("C1:D4");
    });

    it("should return the range when no sheet name is present", () => {
      expect(extractRangeFromA1Notation("E:E")).toBe("E:E");
    });

    it("should correctly extract a single cell reference", () => {
      expect(extractRangeFromA1Notation("SingleCell!Z99")).toBe("Z99");
    });
  });

  describe("Error and Exception Handling", () => {
    it("should throw IllegalArgumentException when called with no arguments", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => (extractRangeFromA1Notation as any)()).toThrow(
        IllegalArgumentException
      );
    });

    it("should throw an exception if the extracted range is an empty string", () => {
      expect(() => extractRangeFromA1Notation("Sheet1!")).toThrow();
    });

    it("should throw an exception if the input A1 notation is an empty string", () => {
      expect(() => extractRangeFromA1Notation("")).toThrow();
    });

    it("should throw an error on malformed A1 notation that parseA1Notation cannot handle", () => {
      expect(() => extractRangeFromA1Notation("Sheet1!A1:B2!")).toThrow();
    });
  });
});

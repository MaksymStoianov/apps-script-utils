import { parseA1Notations } from "@/appsscript/sheet/parseA1Notations";
import { EmptyStringException } from "@/exception/EmptyStringException";
import { IllegalArgumentException } from "@/exception/IllegalArgumentException";
import { describe, expect, it } from "vitest";

describe("parseA1Notations", () => {
  it("should parse multiple notations", () => {
    const result = parseA1Notations("A1, B2:C3", {});

    expect(result).toHaveLength(2);
    expect(result[0].a1Notation).toBe("A1");
    expect(result[1].a1Notation).toBe("B2:C3");
  });

  it("should throw IllegalArgumentException if no arguments", () => {
    // @ts-expect-error: Testing missing argument
    expect(() => parseA1Notations()).toThrow(IllegalArgumentException);
  });

  it("should throw Error if sheet name is missing but required", () => {
    expect(() => parseA1Notations("A1", { includeSheetNames: true })).toThrow(
      'Missing sheet name in "A1". Ranges must include a sheet name.'
    );
  });

  it("should throw Error if sheet name is present but not allowed", () => {
    expect(() => parseA1Notations("Sheet1!A1", { includeSheetNames: false })).toThrow(
      'Sheet names are not allowed. Found a sheet name in "A1".'
    );
  });

  it("should support custom missingSheetNameError", () => {
    expect(() =>
      parseA1Notations("A1", {
        includeSheetNames: true,
        missingSheetNameError: "Custom error: %s is missing sheet"
      })
    ).toThrow("Custom error: A1 is missing sheet");
  });

  it("should support custom unexpectedSheetNameError", () => {
    expect(() =>
      parseA1Notations("Sheet1!A1", {
        includeSheetNames: false,
        unexpectedSheetNameError: "Custom error: %s has unexpected sheet"
      })
    ).toThrow("Custom error: A1 has unexpected sheet");
  });

  it("should throw EmptyStringException for empty string", () => {
    // @ts-expect-error: Testing empty string
    expect(() => parseA1Notations("", {})).toThrow(EmptyStringException);
  });
});

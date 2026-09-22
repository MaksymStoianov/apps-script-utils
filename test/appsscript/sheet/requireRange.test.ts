import { requireRange } from "@/appsscript";
import { InvalidRangeException } from "@/exception";
import { describe, expect, it } from "vitest";

/**
 * Apps Script service objects report their class name from `toString()`.
 */
const match = { toString: (): string => "Range" };

describe("requireRange", () => {
  describe("Correct input data", () => {
    it("should return the same object reference", () => {
      expect(requireRange(match)).toBe(match);
    });

    it("should accept it with other members present", () => {
      const extended = { ...match, extra: (): number => 1 };

      expect(requireRange(extended)).toBe(extended);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for a different service object", () => {
      expect(() => requireRange({ toString: (): string => "Sheet" })).toThrow(
        InvalidRangeException
      );
    });

    it("should throw for plain objects, the bare string and nil values", () => {
      expect(() => requireRange({})).toThrow(InvalidRangeException);
      expect(() => requireRange("Range")).toThrow(InvalidRangeException);
      expect(() => requireRange(null)).toThrow(InvalidRangeException);
      expect(() => requireRange(undefined)).toThrow(InvalidRangeException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireRange(null)).toThrow("Invalid Range object provided.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireRange(null, "Open the file first.")).toThrow("Open the file first.");
    });
  });
});

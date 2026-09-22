import { EmptyStringException } from "@/exception";
import { requireNonEmptyString } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNonEmptyString", () => {
  describe("Correct input data", () => {
    it("should return the string unchanged", () => {
      expect(requireNonEmptyString("abc")).toBe("abc");
      expect(requireNonEmptyString("  padded  ")).toBe("  padded  ");
    });

    it("should accept a string of non-whitespace symbols", () => {
      expect(requireNonEmptyString("0")).toBe("0");
      expect(requireNonEmptyString("-")).toBe("-");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for empty and whitespace-only strings", () => {
      expect(() => requireNonEmptyString("")).toThrow(EmptyStringException);
      expect(() => requireNonEmptyString("   ")).toThrow(EmptyStringException);
      expect(() => requireNonEmptyString("\t\n")).toThrow(EmptyStringException);
    });

    it("should throw for nil values and other types", () => {
      expect(() => requireNonEmptyString(null)).toThrow(EmptyStringException);
      expect(() => requireNonEmptyString(undefined)).toThrow(EmptyStringException);
      // @ts-expect-error - testing invalid types
      expect(() => requireNonEmptyString(42)).toThrow(EmptyStringException);
    });

    it("should carry the exception default message when none is provided", () => {
      expect(() => requireNonEmptyString("")).toThrow("String is null, undefined, or empty.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireNonEmptyString("", "A title is required.")).toThrow(
        "A title is required."
      );
    });
  });
});

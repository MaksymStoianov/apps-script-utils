import { EmptyStringException, IllegalArgumentException } from "@/exception";
import { requireValidLocale } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireValidLocale", () => {
  describe("Correct input data", () => {
    it("should return two-letter language codes unchanged", () => {
      expect(requireValidLocale("en")).toBe("en");
      expect(requireValidLocale("uk")).toBe("uk");
    });

    it("should accept either case without altering the value", () => {
      expect(requireValidLocale("EN")).toBe("EN");
      expect(requireValidLocale("Uk")).toBe("Uk");
    });
  });

  describe("Incorrect input data", () => {
    it("should report emptiness rather than a format error for empty input", () => {
      expect(() => requireValidLocale("")).toThrow(EmptyStringException);
      expect(() => requireValidLocale("   ")).toThrow(EmptyStringException);
      expect(() => requireValidLocale(null)).toThrow(EmptyStringException);
      expect(() => requireValidLocale(undefined)).toThrow(EmptyStringException);
    });

    // Inherited from isValidLocale, which accepts a bare language code only.
    // These assertions change if the pattern is widened — see issue #363.
    it("should throw for tags carrying a region or script subtag", () => {
      expect(() => requireValidLocale("en-US")).toThrow(IllegalArgumentException);
      expect(() => requireValidLocale("zh-Hant")).toThrow(IllegalArgumentException);
    });

    it("should throw for three-letter language codes", () => {
      expect(() => requireValidLocale("fil")).toThrow(IllegalArgumentException);
    });

    it("should throw for malformed input", () => {
      expect(() => requireValidLocale("e")).toThrow(IllegalArgumentException);
      expect(() => requireValidLocale("en1")).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireValidLocale("en-US")).toThrow("Expected a valid locale.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireValidLocale("en-US", "Unsupported locale.")).toThrow(
        "Unsupported locale."
      );
    });
  });
});

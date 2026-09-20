import { InvalidStringException } from "@/exception";
import { requireString } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireString", () => {
  describe("Correct input data", () => {
    it("should return the string unchanged", () => {
      expect(requireString("abc")).toBe("abc");
      expect(requireString("")).toBe("");
      expect(requireString("   ")).toBe("   ");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for a boxed String object", () => {
      expect(() => requireString(new String("abc"))).toThrow(InvalidStringException);
    });

    it("should throw for nil values and other types", () => {
      expect(() => requireString(null)).toThrow(InvalidStringException);
      expect(() => requireString(undefined)).toThrow(InvalidStringException);
      expect(() => requireString(42)).toThrow(InvalidStringException);
      expect(() => requireString(["abc"])).toThrow(InvalidStringException);
    });

    it("should carry the exception default message when none is provided", () => {
      expect(() => requireString(42)).toThrow("Invalid string provided.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireString(42, "The label must be text.")).toThrow("The label must be text.");
    });
  });

  describe("Relationship to requireNonEmptyString", () => {
    it("should accept an empty string, unlike the non-empty variant", () => {
      expect(requireString("")).toBe("");
    });
  });
});

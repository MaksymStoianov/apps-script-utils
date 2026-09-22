import { InvalidStringException } from "@/exception";
import { nonEmptyString } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonEmptyString", () => {
  describe("Correct input data", () => {
    it("should return the string unchanged", () => {
      expect(nonEmptyString("hello")).toBe("hello");
      expect(nonEmptyString("  padded  ")).toBe("  padded  ");
    });

    it("should accept a string made of non-whitespace symbols", () => {
      expect(nonEmptyString("0")).toBe("0");
      expect(nonEmptyString("-")).toBe("-");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for an empty or whitespace-only string", () => {
      expect(() => nonEmptyString("")).toThrow(InvalidStringException);
      expect(() => nonEmptyString("   ")).toThrow(InvalidStringException);
      expect(() => nonEmptyString("\n\t")).toThrow(InvalidStringException);
    });

    it("should throw for non-string types", () => {
      expect(() => nonEmptyString(null)).toThrow(InvalidStringException);
      expect(() => nonEmptyString(undefined)).toThrow(InvalidStringException);
      expect(() => nonEmptyString(0)).toThrow(InvalidStringException);
      expect(() => nonEmptyString(["a"])).toThrow(InvalidStringException);
    });

    it("should use the provided name in the error message", () => {
      expect(() => nonEmptyString("", "login")).toThrow("login must be a non-empty string.");
      expect(() => nonEmptyString("")).toThrow("value must be a non-empty string.");
    });
  });
});

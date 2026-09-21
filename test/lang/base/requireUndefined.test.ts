import { IllegalArgumentException } from "@/exception";
import { requireUndefined } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireUndefined", () => {
  describe("Correct input data", () => {
    it("should return undefined", () => {
      expect(requireUndefined(undefined)).toBeUndefined();
    });

    it("should accept a missing argument", () => {
      expect(requireUndefined(({} as { missing?: unknown }).missing)).toBeUndefined();
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for null", () => {
      expect(() => requireUndefined(null)).toThrow(IllegalArgumentException);
    });

    it("should throw for falsy values that are not undefined", () => {
      expect(() => requireUndefined(0)).toThrow(IllegalArgumentException);
      expect(() => requireUndefined("")).toThrow(IllegalArgumentException);
      expect(() => requireUndefined(false)).toThrow(IllegalArgumentException);
      expect(() => requireUndefined(NaN)).toThrow(IllegalArgumentException);
    });

    it('should throw for objects and the string "undefined"', () => {
      expect(() => requireUndefined({})).toThrow(IllegalArgumentException);
      expect(() => requireUndefined("undefined")).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireUndefined(null)).toThrow("Expected undefined.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireUndefined(null, "This option must not be set.")).toThrow(
        "This option must not be set."
      );
    });
  });
});

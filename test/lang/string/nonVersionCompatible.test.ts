import { nonVersionCompatible } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonVersionCompatible", () => {
  describe("Correct input data", () => {
    it("should return false when the current version is higher", () => {
      expect(nonVersionCompatible("1.2.0", "1.0.0")).toBe(false);
      expect(nonVersionCompatible("2.0.0", "1.9.9")).toBe(false);
    });

    it("should return false when the versions are equal", () => {
      expect(nonVersionCompatible("1.0.0", "1.0.0")).toBe(false);
    });

    it("should return false when the versions are equal despite differing segment counts", () => {
      expect(nonVersionCompatible("1.0", "1.0.0")).toBe(false);
      expect(nonVersionCompatible("1", "1.0.0")).toBe(false);
    });

    it("should return true when the current version is lower", () => {
      expect(nonVersionCompatible("1.0.0", "1.2.0")).toBe(true);
      expect(nonVersionCompatible("1.9.9", "2.0.0")).toBe(true);
    });

    it("should compare segments numerically, not lexically", () => {
      expect(nonVersionCompatible("1.10.0", "1.9.0")).toBe(false);
      expect(nonVersionCompatible("1.9.0", "1.10.0")).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw when either version is malformed", () => {
      expect(() => nonVersionCompatible("abc", "1.0.0")).toThrow(TypeError);
      expect(() => nonVersionCompatible("1.0.0", "abc")).toThrow(TypeError);
      expect(() => nonVersionCompatible("v1.0.0", "1.0.0")).toThrow(TypeError);
    });

    it("should throw for empty strings", () => {
      expect(() => nonVersionCompatible("", "1.0.0")).toThrow(TypeError);
    });

    it("should throw for non-string types", () => {
      // @ts-expect-error - testing invalid types
      expect(() => nonVersionCompatible(null, "1.0.0")).toThrow(TypeError);
      // @ts-expect-error - testing invalid types
      expect(() => nonVersionCompatible(1, "1.0.0")).toThrow(TypeError);
    });
  });
});

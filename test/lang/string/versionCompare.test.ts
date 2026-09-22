import { versionCompare } from "@/lang";
import { describe, expect, it } from "vitest";

describe("versionCompare", () => {
  describe("Valid version comparisons", () => {
    it("should return 0 for equal version strings", () => {
      expect(versionCompare("1.0.0", "1.0.0")).toBe(0);
      expect(versionCompare("1.0", "1.0.0")).toBe(0);
      expect(versionCompare("1.0.0", "1.0")).toBe(0);
      expect(versionCompare("1", "1.0.0")).toBe(0);
      expect(versionCompare("2.1.0", "2.1")).toBe(0);
    });

    it("should return 1 when first version is greater", () => {
      expect(versionCompare("1.0.1", "1.0.0")).toBe(1);
      expect(versionCompare("1.1.0", "1.0.9")).toBe(1);
      expect(versionCompare("2.0.0", "1.9.9")).toBe(1);
      expect(versionCompare("1.0.0.1", "1.0.0")).toBe(1);
      expect(versionCompare("1.1", "1.0.5")).toBe(1);
    });

    it("should return -1 when first version is less", () => {
      expect(versionCompare("1.0.0", "1.0.1")).toBe(-1);
      expect(versionCompare("1.0.9", "1.1.0")).toBe(-1);
      expect(versionCompare("1.9.9", "2.0.0")).toBe(-1);
      expect(versionCompare("1.0.0", "1.0.0.1")).toBe(-1);
      expect(versionCompare("1.0.5", "1.1")).toBe(-1);
    });
  });

  describe("Invalid input data", () => {
    it("should throw TypeError for invalid version1 parameter", () => {
      // @ts-expect-error - testing invalid types
      expect(() => versionCompare("", "1.0.0")).toThrow(TypeError);
      // @ts-expect-error - testing invalid types
      expect(() => versionCompare(null, "1.0.0")).toThrow(TypeError);
      // @ts-expect-error - testing invalid types
      expect(() => versionCompare(undefined, "1.0.0")).toThrow(TypeError);
      // @ts-expect-error - testing invalid types
      expect(() => versionCompare(123, "1.0.0")).toThrow(TypeError);
      // @ts-expect-error - testing invalid types
      expect(() => versionCompare("abc", "1.0.0")).toThrow(TypeError);
    });

    it("should throw TypeError for invalid version2 parameter", () => {
      // @ts-expect-error - testing invalid types
      expect(() => versionCompare("1.0.0", "")).toThrow(TypeError);
      // @ts-expect-error - testing invalid types
      expect(() => versionCompare("1.0.0", null)).toThrow(TypeError);
      // @ts-expect-error - testing invalid types
      expect(() => versionCompare("1.0.0", undefined)).toThrow(TypeError);
      // @ts-expect-error - testing invalid types
      expect(() => versionCompare("1.0.0", 123)).toThrow(TypeError);
      // @ts-expect-error - testing invalid types
      expect(() => versionCompare("1.0.0", "abc")).toThrow(TypeError);
    });
  });
});

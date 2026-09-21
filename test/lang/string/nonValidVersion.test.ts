import { nonValidVersion } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonValidVersion", () => {
  describe("Correct input data", () => {
    it("should return false for versions of any segment count", () => {
      expect(nonValidVersion("1")).toBe(false);
      expect(nonValidVersion("1.0")).toBe(false);
      expect(nonValidVersion("1.0.0")).toBe(false);
      expect(nonValidVersion("1.2.3.4.5")).toBe(false);
    });

    it("should return false for zero and multi-digit segments", () => {
      expect(nonValidVersion("0")).toBe(false);
      expect(nonValidVersion("10.20.30")).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for a leading v", () => {
      expect(nonValidVersion("v1.0.0")).toBe(true);
    });

    it("should return true for pre-release and build suffixes", () => {
      expect(nonValidVersion("1.0.0-alpha")).toBe(true);
      expect(nonValidVersion("1.0.0-beta.1")).toBe(true);
      expect(nonValidVersion("1.0.0+build")).toBe(true);
    });

    it("should return true for misplaced dots", () => {
      expect(nonValidVersion(".1.0")).toBe(true);
      expect(nonValidVersion("1.0.")).toBe(true);
      expect(nonValidVersion("1..0")).toBe(true);
      expect(nonValidVersion(".")).toBe(true);
    });

    it("should return true for whitespace and empty input", () => {
      expect(nonValidVersion("")).toBe(true);
      expect(nonValidVersion(" 1.0.0 ")).toBe(true);
      expect(nonValidVersion("1. 0.0")).toBe(true);
    });

    it("should return true for non-string types", () => {
      // @ts-expect-error - testing invalid types
      expect(nonValidVersion(null)).toBe(true);
      // @ts-expect-error - testing invalid types
      expect(nonValidVersion(undefined)).toBe(true);
      // @ts-expect-error - testing invalid types
      expect(nonValidVersion(1.0)).toBe(true);
    });
  });
});

import { isValidVersion } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isValidVersion", () => {
  describe("Correct input data", () => {
    it("should return true for single segment version", () => {
      expect(isValidVersion("1")).toBe(true);
      expect(isValidVersion("0")).toBe(true);
    });

    it("should return true for two-segment version", () => {
      expect(isValidVersion("1.0")).toBe(true);
      expect(isValidVersion("2.1")).toBe(true);
    });

    it("should return true for semantic version (three segments)", () => {
      expect(isValidVersion("1.0.0")).toBe(true);
      expect(isValidVersion("0.0.1")).toBe(true);
      expect(isValidVersion("10.20.30")).toBe(true);
    });

    it("should return true for versions with four or more segments", () => {
      expect(isValidVersion("1.0.0.1")).toBe(true);
      expect(isValidVersion("1.2.3.4.5")).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for an empty string", () => {
      expect(isValidVersion("")).toBe(false);
    });

    it("should return false for whitespace strings", () => {
      expect(isValidVersion(" ")).toBe(false);
      expect(isValidVersion(" 1.0.0 ")).toBe(false);
      expect(isValidVersion("1. 0.0")).toBe(false);
    });

    it("should return false for non-numeric characters", () => {
      expect(isValidVersion("abc")).toBe(false);
      expect(isValidVersion("v1.0.0")).toBe(false);
      expect(isValidVersion("1.0.0-alpha")).toBe(false);
      expect(isValidVersion("1.0.0-beta.1")).toBe(false);
      expect(isValidVersion("1.a.0")).toBe(false);
    });

    it("should return false for invalid dot placements", () => {
      expect(isValidVersion(".1.0.0")).toBe(false);
      expect(isValidVersion("1.0.0.")).toBe(false);
      expect(isValidVersion("1..0")).toBe(false);
      expect(isValidVersion(".")).toBe(false);
    });

    it("should return false for non-string types", () => {
      // @ts-expect-error - testing invalid types
      expect(isValidVersion(null)).toBe(false);
      // @ts-expect-error - testing invalid types
      expect(isValidVersion(undefined)).toBe(false);
      // @ts-expect-error - testing invalid types
      expect(isValidVersion(123)).toBe(false);
      // @ts-expect-error - testing invalid types
      expect(isValidVersion(true)).toBe(false);
      // @ts-expect-error - testing invalid types
      expect(isValidVersion([])).toBe(false);
      // @ts-expect-error - testing invalid types
      expect(isValidVersion({})).toBe(false);
    });
  });
});

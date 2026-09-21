import { toInteger } from "@/lang";
import { describe, expect, it } from "vitest";

describe("toInteger", () => {
  describe("Strings", () => {
    it("should parse an integer string", () => {
      expect(toInteger("42")).toBe(42);
      expect(toInteger("-7")).toBe(-7);
      expect(toInteger("0")).toBe(0);
    });

    it("should parse a padded string", () => {
      expect(toInteger("  42  ")).toBe(42);
    });

    it("should return null for a non-numeric string", () => {
      expect(toInteger("abc")).toBeNull();
    });

    it("should return null for an empty or whitespace-only string", () => {
      expect(toInteger("")).toBeNull();
      expect(toInteger("   ")).toBeNull();
    });
  });

  describe("Nil values and unsupported types", () => {
    it("should return null", () => {
      expect(toInteger(null)).toBeNull();
      expect(toInteger(undefined)).toBeNull();
      expect(toInteger(true)).toBeNull();
      expect(toInteger([42])).toBeNull();
      expect(toInteger({})).toBeNull();
    });
  });

  // `toInteger` returns numbers untouched, so a fraction survives. Tracked in
  // #443; these assertions change when it is fixed.
  describe("Known defect: numbers are not converted", () => {
    it("should currently return a fraction unchanged", () => {
      expect(toInteger(1.9)).toBe(1.9);
      expect(toInteger(-1.9)).toBe(-1.9);
    });

    it("should currently return NaN and Infinity unchanged", () => {
      expect(toInteger(NaN)).toBeNaN();
      expect(toInteger(Infinity)).toBe(Infinity);
    });
  });

  // `parseInt` stops at the first non-digit. Also noted in #443.
  describe("Known leniency: a numeric prefix is accepted", () => {
    it("should currently parse the leading digits of a mixed string", () => {
      expect(toInteger("42px")).toBe(42);
    });
  });
});

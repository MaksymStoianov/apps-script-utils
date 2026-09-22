import { nonFunction } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonFunction", () => {
  describe("Correct input data", () => {
    it("should return true for non-callable values", () => {
      expect(nonFunction({})).toBe(true);
      expect(nonFunction([])).toBe(true);
      expect(nonFunction("fn")).toBe(true);
      expect(nonFunction(null)).toBe(true);
      expect(nonFunction(undefined)).toBe(true);
    });

    it("should return true for an object merely carrying call and apply", () => {
      expect(nonFunction({ call: () => {}, apply: () => {} })).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for every callable shape", () => {
      expect(nonFunction(() => {})).toBe(false);
      expect(nonFunction(function named() {})).toBe(false);
      expect(nonFunction(function* generator() {})).toBe(false);
      expect(nonFunction(async () => {})).toBe(false);
      expect(nonFunction(async function* asyncGenerator() {})).toBe(false);
    });

    it("should return false for classes and built-in constructors", () => {
      expect(nonFunction(class Sample {})).toBe(false);
      expect(nonFunction(Array)).toBe(false);
    });
  });

  describe("Relationship to typeof", () => {
    it("should agree with a typeof check for every fixture", () => {
      const fixtures: unknown[] = [
        undefined,
        null,
        0,
        "abc",
        {},
        [],
        () => {},
        class Sample {},
        Array,
        async () => {}
      ];

      for (const value of fixtures) {
        expect(nonFunction(value)).toBe(typeof value !== "function");
      }
    });
  });
});

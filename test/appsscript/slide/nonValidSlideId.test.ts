import { nonValidSlideId } from "@/appsscript";
import { describe, expect, it } from "vitest";

describe("nonValidSlideId", () => {
  describe("Correct input data", () => {
    it("should return false for identifiers in the Slides format", () => {
      expect(nonValidSlideId("p1")).toBe(false);
      expect(nonValidSlideId("g1a2b3c4d5e_0")).toBe(false);
      expect(nonValidSlideId("SLIDES_API123-456")).toBe(false);
    });

    it("should return false for a single character, which the pattern allows", () => {
      expect(nonValidSlideId("a")).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for an empty string", () => {
      expect(nonValidSlideId("")).toBe(true);
    });

    it("should return true for characters outside the allowed set", () => {
      expect(nonValidSlideId("p1 p2")).toBe(true);
      expect(nonValidSlideId("p1.p2")).toBe(true);
      expect(nonValidSlideId("p1/p2")).toBe(true);
      expect(nonValidSlideId("слайд")).toBe(true);
    });

    it("should return true for whitespace-padded identifiers", () => {
      expect(nonValidSlideId(" p1 ")).toBe(true);
    });

    it("should return true for non-string types", () => {
      expect(nonValidSlideId(null)).toBe(true);
      expect(nonValidSlideId(undefined)).toBe(true);
      expect(nonValidSlideId(42)).toBe(true);
      expect(nonValidSlideId(["p1"])).toBe(true);
    });
  });
});

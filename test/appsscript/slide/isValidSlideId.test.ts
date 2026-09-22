import { isValidSlideId } from "@/appsscript";
import { describe, expect, it } from "vitest";

describe("isValidSlideId", () => {
  describe("Correct input data", () => {
    it("should accept identifiers in the Slides format", () => {
      expect(isValidSlideId("p1")).toBe(true);
      expect(isValidSlideId("g1a2b3c4d5e_0")).toBe(true);
      expect(isValidSlideId("SLIDES_API123-456")).toBe(true);
    });

    it("should accept a single character, since there is no length rule", () => {
      expect(isValidSlideId("a")).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should reject an empty string", () => {
      expect(isValidSlideId("")).toBe(false);
    });

    it("should reject characters outside the allowed set", () => {
      expect(isValidSlideId("p1 p2")).toBe(false);
      expect(isValidSlideId("p1.p2")).toBe(false);
      expect(isValidSlideId("слайд")).toBe(false);
    });

    it("should reject whitespace-padded identifiers", () => {
      expect(isValidSlideId(" p1 ")).toBe(false);
    });

    it("should reject non-string types", () => {
      expect(isValidSlideId(null)).toBe(false);
      expect(isValidSlideId(undefined)).toBe(false);
      expect(isValidSlideId(42)).toBe(false);
    });
  });
});

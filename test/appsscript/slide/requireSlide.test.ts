import { requireSlide } from "@/appsscript";
import { SlideNotFoundException } from "@/exception";
import { describe, expect, it } from "vitest";

/**
 * A stand-in carrying the two methods `isSlide` probes for.
 */
const slideMock = {
  getObjectId: (): string => "p1",
  getPageElementById: (): unknown => undefined
};

describe("requireSlide", () => {
  describe("Correct input data", () => {
    it("should return the same object reference", () => {
      expect(requireSlide(slideMock)).toBe(slideMock);
    });

    it("should accept extra members", () => {
      const extended = { ...slideMock, getShapes: (): unknown[] => [] };

      expect(requireSlide(extended)).toBe(extended);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for a Presentation-shaped object", () => {
      expect(() =>
        requireSlide({ getId: (): string => "abc", getSlides: (): unknown[] => [] })
      ).toThrow(SlideNotFoundException);
    });

    it("should throw when a probed method is missing", () => {
      expect(() => requireSlide({ getObjectId: (): string => "p1" })).toThrow(
        SlideNotFoundException
      );
    });

    it("should throw for nil values, primitives and empty objects", () => {
      expect(() => requireSlide(null)).toThrow(SlideNotFoundException);
      expect(() => requireSlide(undefined)).toThrow(SlideNotFoundException);
      expect(() => requireSlide("Slide")).toThrow(SlideNotFoundException);
      expect(() => requireSlide({})).toThrow(SlideNotFoundException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireSlide(null)).toThrow("Required Slide context is missing or invalid.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireSlide(null, "Select a slide first.")).toThrow("Select a slide first.");
    });
  });
});

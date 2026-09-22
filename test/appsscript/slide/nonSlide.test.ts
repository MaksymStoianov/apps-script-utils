import { nonSlide } from "@/appsscript";
import { describe, expect, it } from "vitest";

/** A stand-in carrying the two methods `isSlide` probes for. */
const slideMock = {
  getObjectId: (): string => "p1",
  getPageElementById: (): unknown => undefined
};

/** A `Presentation` carries a different pair of methods. */
const presentationMock = {
  getId: (): string => "abc",
  getSlides: (): unknown[] => []
};

describe("nonSlide", () => {
  describe("Correct input data", () => {
    it("should return false for an object carrying both probed methods", () => {
      expect(nonSlide(slideMock)).toBe(false);
    });

    it("should return false when extra members are present", () => {
      expect(nonSlide({ ...slideMock, getShapes: (): unknown[] => [] })).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for a Presentation-shaped object", () => {
      expect(nonSlide(presentationMock)).toBe(true);
    });

    it("should return true when a probed method is missing", () => {
      expect(nonSlide({ getObjectId: (): string => "p1" })).toBe(true);
      expect(nonSlide({ getPageElementById: (): unknown => undefined })).toBe(true);
    });

    it("should return true when a probed member is not callable", () => {
      expect(nonSlide({ ...slideMock, getObjectId: "p1" })).toBe(true);
    });

    it("should return true for nil values and primitives", () => {
      expect(nonSlide(null)).toBe(true);
      expect(nonSlide(undefined)).toBe(true);
      expect(nonSlide("Slide")).toBe(true);
      expect(nonSlide(42)).toBe(true);
    });

    it("should return true for an empty object and an array", () => {
      expect(nonSlide({})).toBe(true);
      expect(nonSlide([])).toBe(true);
    });
  });
});

import { nonPresentation } from "@/appsscript";
import { describe, expect, it } from "vitest";

/** A stand-in carrying the two methods `isPresentation` probes for. */
const presentationMock = {
  getId: (): string => "1AbCdEfGhIjKlMnOpQrStUvWxYz",
  getSlides: (): unknown[] => []
};

/** A `Slide` carries a different pair of methods. */
const slideMock = {
  getObjectId: (): string => "p1",
  getPageElementById: (): unknown => undefined
};

describe("nonPresentation", () => {
  describe("Correct input data", () => {
    it("should return false for an object carrying both probed methods", () => {
      expect(nonPresentation(presentationMock)).toBe(false);
    });

    it("should return false when extra members are present", () => {
      expect(nonPresentation({ ...presentationMock, getName: (): string => "Deck" })).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for a Slide-shaped object", () => {
      expect(nonPresentation(slideMock)).toBe(true);
    });

    it("should return true when a probed method is missing", () => {
      expect(nonPresentation({ getId: (): string => "abc" })).toBe(true);
      expect(nonPresentation({ getSlides: (): unknown[] => [] })).toBe(true);
    });

    it("should return true when a probed member is not callable", () => {
      expect(nonPresentation({ ...presentationMock, getId: "abc" })).toBe(true);
    });

    it("should return true for nil values and primitives", () => {
      expect(nonPresentation(null)).toBe(true);
      expect(nonPresentation(undefined)).toBe(true);
      expect(nonPresentation("Presentation")).toBe(true);
      expect(nonPresentation(42)).toBe(true);
    });

    it("should return true for an empty object and an array", () => {
      expect(nonPresentation({})).toBe(true);
      expect(nonPresentation([])).toBe(true);
    });
  });
});

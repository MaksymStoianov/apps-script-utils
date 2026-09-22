import { isPresentation } from "@/appsscript";
import { describe, expect, it } from "vitest";

/**
 * A stand-in carrying the methods `isPresentation` probes for.
 */
const match = {
  getId: (): unknown => undefined,
  getSlides: (): unknown => undefined
};

describe("isPresentation", () => {
  describe("Correct input data", () => {
    it("should accept an object carrying every probed method", () => {
      expect(isPresentation(match)).toBe(true);
    });

    it("should accept it with extra members present", () => {
      expect(isPresentation({ ...match, extra: (): number => 1 })).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should reject an object missing a probed method", () => {
      expect(isPresentation({ getSlides: (): unknown => undefined })).toBe(false);
      expect(isPresentation({ getId: (): unknown => undefined })).toBe(false);
    });

    it("should reject an object whose probed member is not callable", () => {
      expect(isPresentation({ ...match, getId: "not a function" })).toBe(false);
    });

    it("should reject nil values, primitives and empty containers", () => {
      expect(isPresentation(null)).toBe(false);
      expect(isPresentation(undefined)).toBe(false);
      expect(isPresentation("x")).toBe(false);
      expect(isPresentation({})).toBe(false);
      expect(isPresentation([])).toBe(false);
    });
  });
});

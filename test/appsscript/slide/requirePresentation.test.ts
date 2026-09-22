import { requirePresentation } from "@/appsscript";
import { InvalidPresentationException } from "@/exception";
import { describe, expect, it } from "vitest";

/** A stand-in carrying the two methods `isPresentation` probes for. */
const presentationMock = {
  getId: (): string => "1AbCdEfGhIjKlMnOpQrStUvWxYz",
  getSlides: (): unknown[] => []
};

describe("requirePresentation", () => {
  describe("Correct input data", () => {
    it("should return the same object reference", () => {
      expect(requirePresentation(presentationMock)).toBe(presentationMock);
    });

    it("should accept an object carrying extra members", () => {
      const extended = { ...presentationMock, getName: (): string => "Deck" };

      expect(requirePresentation(extended)).toBe(extended);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for a Slide-shaped object", () => {
      expect(() =>
        requirePresentation({
          getObjectId: (): string => "p1",
          getPageElementById: (): unknown => undefined
        })
      ).toThrow(InvalidPresentationException);
    });

    it("should throw when a probed method is missing", () => {
      expect(() => requirePresentation({ getId: (): string => "abc" })).toThrow(
        InvalidPresentationException
      );
    });

    it("should throw when a probed member is not callable", () => {
      expect(() => requirePresentation({ ...presentationMock, getId: "abc" })).toThrow(
        InvalidPresentationException
      );
    });

    it("should throw for nil values, primitives and empty objects", () => {
      expect(() => requirePresentation(null)).toThrow(InvalidPresentationException);
      expect(() => requirePresentation(undefined)).toThrow(InvalidPresentationException);
      expect(() => requirePresentation("Presentation")).toThrow(InvalidPresentationException);
      expect(() => requirePresentation({})).toThrow(InvalidPresentationException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requirePresentation(null)).toThrow(
        "Required Presentation object is missing or invalid."
      );
    });

    it("should use a custom message when provided", () => {
      expect(() => requirePresentation(null, "Open the deck first.")).toThrow(
        "Open the deck first."
      );
    });
  });
});

import { getSlideIndex } from "@/appsscript";
import { describe, expect, it } from "vitest";

/**
 * A stand-in slide with the shape `isSlide` probes for.
 */
const slide = (id: string): GoogleAppsScript.Slides.Slide =>
  ({
    getObjectId: () => id,
    getPageElementById: () => undefined
  }) as unknown as GoogleAppsScript.Slides.Slide;

/**
 * A stand-in presentation with the shape `isPresentation` probes for.
 */
const presentation = (...ids: string[]): GoogleAppsScript.Slides.Presentation =>
  ({
    getId: () => "deck",
    getSlides: () => ids.map(slide)
  }) as unknown as GoogleAppsScript.Slides.Presentation;

describe("getSlideIndex", () => {
  describe("Correct input data", () => {
    it("should find a slide by identity of its object id", () => {
      expect(getSlideIndex(presentation("a", "b", "c"), slide("b"))).toBe(1);
    });

    it("should return zero for the first slide", () => {
      expect(getSlideIndex(presentation("a", "b"), slide("a"))).toBe(0);
    });

    it("should return null when the slide is not in the presentation", () => {
      expect(getSlideIndex(presentation("a", "b"), slide("z"))).toBeNull();
    });

    it("should return null for a presentation with no slides", () => {
      expect(getSlideIndex(presentation(), slide("a"))).toBeNull();
    });
  });

  describe("Incorrect input data", () => {
    it("should return null rather than throw when the slide is not one", () => {
      // @ts-expect-error - testing invalid types
      expect(getSlideIndex(presentation("a"), {})).toBeNull();
      // @ts-expect-error - testing invalid types
      expect(getSlideIndex(presentation("a"), null)).toBeNull();
    });

    it("should return null rather than throw when the presentation is not one", () => {
      // @ts-expect-error - testing invalid types
      expect(getSlideIndex({}, slide("a"))).toBeNull();
      // @ts-expect-error - testing invalid types
      expect(getSlideIndex(null, slide("a"))).toBeNull();
    });
  });
});

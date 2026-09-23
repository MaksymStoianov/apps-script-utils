import { getSlideIndex } from "@/appsscript";
import { afterEach, describe, expect, it } from "vitest";

type Mutable = Record<string, unknown>;

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

afterEach(() => {
  delete (globalThis as Mutable).SlidesApp;
});

describe("getSlideIndex", () => {
  describe("Correct input data", () => {
    it("should find a slide by identity of its object id", () => {
      expect(getSlideIndex(slide("b"), presentation("a", "b", "c"))).toBe(1);
    });

    it("should return zero for the first slide", () => {
      expect(getSlideIndex(slide("a"), presentation("a", "b"))).toBe(0);
    });

    it("should return null when the slide is not in the presentation", () => {
      expect(getSlideIndex(slide("z"), presentation("a", "b"))).toBeNull();
    });

    it("should return null for a presentation with no slides", () => {
      expect(getSlideIndex(slide("a"), presentation())).toBeNull();
    });
  });

  describe("Incorrect input data", () => {
    it("should return null rather than throw when the slide is not one", () => {
      // @ts-expect-error - testing invalid types
      expect(getSlideIndex({}, presentation("a"))).toBeNull();
      // @ts-expect-error - testing invalid types
      expect(getSlideIndex(null, presentation("a"))).toBeNull();
    });

    it("should return null rather than throw when the presentation is not one", () => {
      // @ts-expect-error - testing invalid types
      expect(getSlideIndex(slide("a"), {})).toBeNull();
      // @ts-expect-error - testing invalid types
      expect(getSlideIndex(slide("a"), null)).toBeNull();
    });
  });

  describe("The active presentation", () => {
    it("should look in it when none is given", () => {
      (globalThis as Mutable).SlidesApp = {
        getActivePresentation: () => presentation("a", "b", "c")
      };

      expect(getSlideIndex(slide("c"))).toBe(2);
    });

    it("should prefer the presentation it was given", () => {
      (globalThis as Mutable).SlidesApp = {
        getActivePresentation: () => presentation("x", "y")
      };

      expect(getSlideIndex(slide("b"), presentation("a", "b"))).toBe(1);
    });

    it("should return null when there is no active presentation", () => {
      (globalThis as Mutable).SlidesApp = {
        getActivePresentation: () => null
      };

      expect(getSlideIndex(slide("a"))).toBeNull();
    });

    it("should return null when asking for one throws", () => {
      (globalThis as Mutable).SlidesApp = {
        getActivePresentation: () => {
          throw new Error("No active presentation.");
        }
      };

      expect(getSlideIndex(slide("a"))).toBeNull();
    });
  });
});

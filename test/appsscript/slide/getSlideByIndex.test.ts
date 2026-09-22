import { getSlideByIndex } from "@/appsscript";
import { describe, expect, it } from "vitest";

/**
 * A stand-in presentation holding slides with the given object ids.
 */
const presentation = (...ids: string[]): GoogleAppsScript.Slides.Presentation =>
  ({
    getId: () => "deck",
    getSlides: () =>
      ids.map((id) => ({
        getObjectId: () => id,
        getPageElementById: () => undefined
      }))
  }) as unknown as GoogleAppsScript.Slides.Presentation;

const idOf = (slide: unknown): string | undefined =>
  (slide as { getObjectId?: () => string })?.getObjectId?.();

// Note the argument order: this function takes the presentation first, while
// its sheet counterpart takes the index first. Tracked in #449.
describe("getSlideByIndex", () => {
  describe("Correct input data", () => {
    it("should return the slide at the given position", () => {
      expect(idOf(getSlideByIndex(presentation("a", "b", "c"), 1))).toBe("b");
    });

    it("should treat the index as zero-based", () => {
      expect(idOf(getSlideByIndex(presentation("a", "b"), 0))).toBe("a");
    });

    it("should return null past the last slide", () => {
      expect(getSlideByIndex(presentation("a"), 5)).toBeNull();
    });

    it("should return null for a presentation with no slides", () => {
      expect(getSlideByIndex(presentation(), 0)).toBeNull();
    });
  });

  describe("Incorrect input data", () => {
    it("should return null for a negative index", () => {
      expect(getSlideByIndex(presentation("a"), -1)).toBeNull();
    });

    it("should return null when the presentation is not one", () => {
      // @ts-expect-error - testing invalid types
      expect(getSlideByIndex({}, 0)).toBeNull();
      // @ts-expect-error - testing invalid types
      expect(getSlideByIndex(null, 0)).toBeNull();
    });
  });
});

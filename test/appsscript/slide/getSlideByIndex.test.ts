import { getSlideByIndex } from "@/appsscript";
import { afterEach, describe, expect, it } from "vitest";

type Mutable = Record<string, unknown>;

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

afterEach(() => {
  delete (globalThis as Mutable).SlidesApp;
});

describe("getSlideByIndex", () => {
  describe("Correct input data", () => {
    it("should return the slide at the given position", () => {
      expect(idOf(getSlideByIndex(1, presentation("a", "b", "c")))).toBe("b");
    });

    it("should treat the index as zero-based", () => {
      expect(idOf(getSlideByIndex(0, presentation("a", "b")))).toBe("a");
    });

    it("should return null past the last slide", () => {
      expect(getSlideByIndex(5, presentation("a"))).toBeNull();
    });

    it("should return null for a presentation with no slides", () => {
      expect(getSlideByIndex(0, presentation())).toBeNull();
    });
  });

  describe("The active presentation", () => {
    it("should look in it when none is given", () => {
      (globalThis as Mutable).SlidesApp = {
        getActivePresentation: () => presentation("a", "b")
      };

      expect(idOf(getSlideByIndex(1))).toBe("b");
    });

    it("should prefer the presentation it was given", () => {
      (globalThis as Mutable).SlidesApp = {
        getActivePresentation: () => presentation("x", "y")
      };

      expect(idOf(getSlideByIndex(0, presentation("a")))).toBe("a");
    });

    it("should return null when there is no active presentation", () => {
      (globalThis as Mutable).SlidesApp = {
        getActivePresentation: () => null
      };

      expect(getSlideByIndex(0)).toBeNull();
    });

    it("should return null when asking for one throws", () => {
      (globalThis as Mutable).SlidesApp = {
        getActivePresentation: () => {
          throw new Error("No active presentation.");
        }
      };

      expect(getSlideByIndex(0)).toBeNull();
    });
  });

  describe("Incorrect input data", () => {
    it("should return null for a negative index", () => {
      expect(getSlideByIndex(-1, presentation("a"))).toBeNull();
    });

    it("should return null when the presentation is not one", () => {
      // @ts-expect-error - testing invalid types
      expect(getSlideByIndex(0, {})).toBeNull();
      // @ts-expect-error - testing invalid types
      expect(getSlideByIndex(0, "deck")).toBeNull();
    });
  });
});

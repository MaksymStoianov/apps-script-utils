import { findReplaceAllTextInSlide } from "@/appsscript";
import { describe, expect, it } from "vitest";

/**
 * A stand-in slide recording the replacement it was asked to perform.
 */
interface SlideMock {
  slide: GoogleAppsScript.Slides.Slide;
  calls: Array<[string, string, boolean]>;
}

function slideMock(replacements = 3): SlideMock {
  const calls: Array<[string, string, boolean]> = [];

  const slide = {
    getObjectId: () => "p1",
    getPageElementById: () => undefined,
    replaceAllText: (find: string, replace: string, matchCase: boolean) => {
      calls.push([find, replace, matchCase]);

      return replacements;
    }
  } as unknown as GoogleAppsScript.Slides.Slide;

  return { slide, calls };
}

describe("findReplaceAllTextInSlide", () => {
  describe("Correct input data", () => {
    it("should return the number of replacements made", () => {
      const { slide } = slideMock(3);

      expect(findReplaceAllTextInSlide(slide, "old", "new")).toBe(3);
    });

    it("should pass the search and replacement text through", () => {
      const { slide, calls } = slideMock();

      findReplaceAllTextInSlide(slide, "old", "new");

      expect(calls[0][0]).toBe("old");
      expect(calls[0][1]).toBe("new");
    });

    it("should match case by default", () => {
      const { slide, calls } = slideMock();

      findReplaceAllTextInSlide(slide, "old", "new");

      expect(calls[0][2]).toBe(true);
    });

    it("should pass a case-insensitive request through", () => {
      const { slide, calls } = slideMock();

      findReplaceAllTextInSlide(slide, "old", "new", false);

      expect(calls[0][2]).toBe(false);
    });

    it("should return zero when nothing matched", () => {
      const { slide } = slideMock(0);

      expect(findReplaceAllTextInSlide(slide, "absent", "new")).toBe(0);
    });
  });

  describe("Incorrect input data", () => {
    it("should return zero rather than throw when the slide is not one", () => {
      // @ts-expect-error - testing invalid types
      expect(findReplaceAllTextInSlide({}, "old", "new")).toBe(0);
      // @ts-expect-error - testing invalid types
      expect(findReplaceAllTextInSlide(null, "old", "new")).toBe(0);
      // @ts-expect-error - testing invalid types
      expect(findReplaceAllTextInSlide("slide", "old", "new")).toBe(0);
    });

    it("should not attempt a replacement on an invalid slide", () => {
      const { calls } = slideMock();

      // @ts-expect-error - testing invalid types
      findReplaceAllTextInSlide({}, "old", "new");

      expect(calls).toEqual([]);
    });
  });
});

import { isSlide } from "@/appsscript/slide/isSlide";
import { describe, expect, it } from "vitest";

describe("isSlide", () => {
  it("should return true for valid slide object", () => {
    const slide = {
      getObjectId: () => "slide-id",
      getPageElementById: () => ({})
    };

    expect(isSlide(slide)).toBe(true);
  });

  it("should return false for invalid objects", () => {
    expect(isSlide({})).toBe(false);
    expect(isSlide(null)).toBe(false);
    expect(isSlide(undefined)).toBe(false);
    expect(isSlide("not-a-slide")).toBe(false);
  });
});

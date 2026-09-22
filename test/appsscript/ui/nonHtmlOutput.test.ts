import { nonHtmlOutput } from "@/appsscript";
import { describe, expect, it } from "vitest";

/** A stand-in carrying the three methods `isHtmlOutput` probes for. */
const htmlOutputMock = {
  getContent: (): string => "",
  setTitle: (): unknown => undefined,
  setXFrameOptionsMode: (): unknown => undefined
};

describe("nonHtmlOutput", () => {
  describe("Correct input data", () => {
    it("should return false for an object carrying every probed method", () => {
      expect(nonHtmlOutput(htmlOutputMock)).toBe(false);
    });

    it("should return false when extra members are present", () => {
      expect(nonHtmlOutput({ ...htmlOutputMock, append: (): unknown => undefined })).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true when any probed method is missing", () => {
      const { setTitle: _omitted, ...withoutSetTitle } = htmlOutputMock;

      expect(nonHtmlOutput(withoutSetTitle)).toBe(true);
      expect(nonHtmlOutput({ getContent: (): string => "" })).toBe(true);
    });

    it("should return true when a probed member is not callable", () => {
      expect(nonHtmlOutput({ ...htmlOutputMock, setTitle: "not a function" })).toBe(true);
    });

    it("should return true for a TextOutput-shaped object", () => {
      expect(
        nonHtmlOutput({ getMimeType: (): unknown => undefined, getContent: (): string => "" })
      ).toBe(true);
    });

    it("should return true for nil values and primitives", () => {
      expect(nonHtmlOutput(null)).toBe(true);
      expect(nonHtmlOutput(undefined)).toBe(true);
      expect(nonHtmlOutput("HtmlOutput")).toBe(true);
      expect(nonHtmlOutput(42)).toBe(true);
    });

    it("should return true for an empty object and an array", () => {
      expect(nonHtmlOutput({})).toBe(true);
      expect(nonHtmlOutput([])).toBe(true);
    });
  });
});

import { nonTextOutput } from "@/appsscript";
import { describe, expect, it } from "vitest";

/** A stand-in carrying the two methods `isTextOutput` probes for. */
const textOutputMock = {
  getMimeType: (): unknown => undefined,
  getContent: (): string => ""
};

describe("nonTextOutput", () => {
  describe("Correct input data", () => {
    it("should return false for an object carrying both probed methods", () => {
      expect(nonTextOutput(textOutputMock)).toBe(false);
    });

    it("should return false when extra members are present", () => {
      expect(nonTextOutput({ ...textOutputMock, append: (): unknown => undefined })).toBe(false);
    });

    it("should return false for an HtmlOutput-shaped object, which also has getContent", () => {
      expect(
        nonTextOutput({
          getContent: (): string => "",
          setTitle: (): unknown => undefined,
          setXFrameOptionsMode: (): unknown => undefined,
          getMimeType: (): unknown => undefined
        })
      ).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true when a probed method is missing", () => {
      expect(nonTextOutput({ getContent: (): string => "" })).toBe(true);
      expect(nonTextOutput({ getMimeType: (): unknown => undefined })).toBe(true);
    });

    it("should return true when a probed member is not callable", () => {
      expect(nonTextOutput({ ...textOutputMock, getMimeType: "text/plain" })).toBe(true);
    });

    it("should return true for nil values and primitives", () => {
      expect(nonTextOutput(null)).toBe(true);
      expect(nonTextOutput(undefined)).toBe(true);
      expect(nonTextOutput("TextOutput")).toBe(true);
      expect(nonTextOutput(42)).toBe(true);
    });

    it("should return true for an empty object and an array", () => {
      expect(nonTextOutput({})).toBe(true);
      expect(nonTextOutput([])).toBe(true);
    });
  });
});

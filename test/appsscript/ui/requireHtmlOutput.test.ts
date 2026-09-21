import { requireHtmlOutput } from "@/appsscript";
import { IllegalArgumentException } from "@/exception";
import { describe, expect, it } from "vitest";

/** A stand-in carrying the three methods `isHtmlOutput` probes for. */
const htmlOutputMock = {
  getContent: (): string => "",
  setTitle: (): unknown => undefined,
  setXFrameOptionsMode: (): unknown => undefined
};

describe("requireHtmlOutput", () => {
  describe("Correct input data", () => {
    it("should return the same object reference", () => {
      expect(requireHtmlOutput(htmlOutputMock)).toBe(htmlOutputMock);
    });

    it("should accept an object carrying extra members", () => {
      const extended = { ...htmlOutputMock, append: (): unknown => undefined };

      expect(requireHtmlOutput(extended)).toBe(extended);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw when a probed method is missing", () => {
      expect(() => requireHtmlOutput({ getContent: (): string => "" })).toThrow(
        IllegalArgumentException
      );
    });

    it("should throw when a probed member is not callable", () => {
      expect(() => requireHtmlOutput({ ...htmlOutputMock, setTitle: "x" })).toThrow(
        IllegalArgumentException
      );
    });

    it("should throw for a TextOutput-shaped object", () => {
      expect(() =>
        requireHtmlOutput({
          getMimeType: (): unknown => undefined,
          getContent: (): string => ""
        })
      ).toThrow(IllegalArgumentException);
    });

    it("should throw for nil values, primitives and empty objects", () => {
      expect(() => requireHtmlOutput(null)).toThrow(IllegalArgumentException);
      expect(() => requireHtmlOutput(undefined)).toThrow(IllegalArgumentException);
      expect(() => requireHtmlOutput("HtmlOutput")).toThrow(IllegalArgumentException);
      expect(() => requireHtmlOutput({})).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireHtmlOutput({})).toThrow("Expected an HtmlOutput object.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireHtmlOutput({}, "doGet must return HTML.")).toThrow(
        "doGet must return HTML."
      );
    });
  });
});

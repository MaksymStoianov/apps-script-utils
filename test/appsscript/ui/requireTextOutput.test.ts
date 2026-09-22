import { requireTextOutput } from "@/appsscript";
import { IllegalArgumentException } from "@/exception";
import { describe, expect, it } from "vitest";

/** A stand-in carrying the two methods `isTextOutput` probes for. */
const textOutputMock = {
  getMimeType: (): unknown => undefined,
  getContent: (): string => ""
};

describe("requireTextOutput", () => {
  describe("Correct input data", () => {
    it("should return the same object reference", () => {
      expect(requireTextOutput(textOutputMock)).toBe(textOutputMock);
    });

    it("should accept an object carrying extra members", () => {
      const extended = { ...textOutputMock, append: (): unknown => undefined };

      expect(requireTextOutput(extended)).toBe(extended);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw when a probed method is missing", () => {
      expect(() => requireTextOutput({ getContent: (): string => "" })).toThrow(
        IllegalArgumentException
      );
      expect(() => requireTextOutput({ getMimeType: (): unknown => undefined })).toThrow(
        IllegalArgumentException
      );
    });

    it("should throw when a probed member is not callable", () => {
      expect(() => requireTextOutput({ ...textOutputMock, getMimeType: "text/plain" })).toThrow(
        IllegalArgumentException
      );
    });

    it("should throw for nil values, primitives and empty objects", () => {
      expect(() => requireTextOutput(null)).toThrow(IllegalArgumentException);
      expect(() => requireTextOutput(undefined)).toThrow(IllegalArgumentException);
      expect(() => requireTextOutput("TextOutput")).toThrow(IllegalArgumentException);
      expect(() => requireTextOutput({})).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireTextOutput({})).toThrow("Expected a TextOutput object.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireTextOutput({}, "doGet must return text.")).toThrow(
        "doGet must return text."
      );
    });
  });
});

import { isTextOutput } from "@/appsscript";
import { describe, expect, it } from "vitest";

/**
 * A stand-in carrying the methods `isTextOutput` probes for.
 */
const match = {
  getMimeType: (): unknown => undefined,
  getContent: (): unknown => undefined
};

describe("isTextOutput", () => {
  describe("Correct input data", () => {
    it("should accept an object carrying every probed method", () => {
      expect(isTextOutput(match)).toBe(true);
    });

    it("should accept it with extra members present", () => {
      expect(isTextOutput({ ...match, extra: (): number => 1 })).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should reject an object missing a probed method", () => {
      expect(isTextOutput({ getContent: (): unknown => undefined })).toBe(false);
      expect(isTextOutput({ getMimeType: (): unknown => undefined })).toBe(false);
    });

    it("should reject an object whose probed member is not callable", () => {
      expect(isTextOutput({ ...match, getMimeType: "not a function" })).toBe(false);
    });

    it("should reject nil values, primitives and empty containers", () => {
      expect(isTextOutput(null)).toBe(false);
      expect(isTextOutput(undefined)).toBe(false);
      expect(isTextOutput("x")).toBe(false);
      expect(isTextOutput({})).toBe(false);
      expect(isTextOutput([])).toBe(false);
    });
  });
});

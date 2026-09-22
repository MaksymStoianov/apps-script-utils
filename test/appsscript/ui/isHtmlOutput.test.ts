import { isHtmlOutput } from "@/appsscript";
import { describe, expect, it } from "vitest";

/**
 * A stand-in carrying the methods `isHtmlOutput` probes for.
 */
const match = {
  getContent: (): unknown => undefined,
  setTitle: (): unknown => undefined,
  setXFrameOptionsMode: (): unknown => undefined
};

describe("isHtmlOutput", () => {
  describe("Correct input data", () => {
    it("should accept an object carrying every probed method", () => {
      expect(isHtmlOutput(match)).toBe(true);
    });

    it("should accept it with extra members present", () => {
      expect(isHtmlOutput({ ...match, extra: (): number => 1 })).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should reject an object missing a probed method", () => {
      expect(
        isHtmlOutput({
          setTitle: (): unknown => undefined,
          setXFrameOptionsMode: (): unknown => undefined
        })
      ).toBe(false);
      expect(
        isHtmlOutput({
          getContent: (): unknown => undefined,
          setXFrameOptionsMode: (): unknown => undefined
        })
      ).toBe(false);
      expect(
        isHtmlOutput({ getContent: (): unknown => undefined, setTitle: (): unknown => undefined })
      ).toBe(false);
    });

    it("should reject an object whose probed member is not callable", () => {
      expect(isHtmlOutput({ ...match, getContent: "not a function" })).toBe(false);
    });

    it("should reject nil values, primitives and empty containers", () => {
      expect(isHtmlOutput(null)).toBe(false);
      expect(isHtmlOutput(undefined)).toBe(false);
      expect(isHtmlOutput("x")).toBe(false);
      expect(isHtmlOutput({})).toBe(false);
      expect(isHtmlOutput([])).toBe(false);
    });
  });
});

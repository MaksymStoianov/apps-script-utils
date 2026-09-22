import { requireUi } from "@/appsscript";
import { IllegalArgumentException } from "@/exception";
import { describe, expect, it } from "vitest";

/** `isUi` identifies its target by the string an Apps Script `Ui` reports. */
const uiMock = {
  toString: (): string => "Ui"
};

describe("requireUi", () => {
  describe("Correct input data", () => {
    it("should return the same object reference", () => {
      expect(requireUi(uiMock)).toBe(uiMock);
    });

    it("should accept an object carrying other members", () => {
      const extended = { ...uiMock, alert: (): unknown => undefined };

      expect(requireUi(extended)).toBe(extended);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for an object reporting a different name", () => {
      expect(() => requireUi({ toString: (): string => "Sheet" })).toThrow(
        IllegalArgumentException
      );
      expect(() => requireUi({ toString: (): string => "ui" })).toThrow(IllegalArgumentException);
    });

    it("should throw for a plain object", () => {
      expect(() => requireUi({})).toThrow(IllegalArgumentException);
      expect(() => requireUi({ alert: (): unknown => undefined })).toThrow(
        IllegalArgumentException
      );
    });

    it("should throw for the bare string Ui", () => {
      expect(() => requireUi("Ui")).toThrow(IllegalArgumentException);
    });

    it("should throw for nil values, which is the no-UI-context case", () => {
      expect(() => requireUi(null)).toThrow(IllegalArgumentException);
      expect(() => requireUi(undefined)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireUi(null)).toThrow("Expected a Ui object.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireUi(null, "This action needs a spreadsheet UI.")).toThrow(
        "This action needs a spreadsheet UI."
      );
    });
  });
});

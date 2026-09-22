import { nonUi } from "@/appsscript";
import { describe, expect, it } from "vitest";

/** `isUi` identifies its target by the string an Apps Script `Ui` reports. */
const uiMock = {
  toString: (): string => "Ui"
};

describe("nonUi", () => {
  describe("Correct input data", () => {
    it("should return false for an object reporting itself as Ui", () => {
      expect(nonUi(uiMock)).toBe(false);
    });

    it("should return false when the object carries other members too", () => {
      expect(nonUi({ ...uiMock, alert: (): unknown => undefined })).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for an object reporting a different name", () => {
      expect(nonUi({ toString: (): string => "Sheet" })).toBe(true);
      expect(nonUi({ toString: (): string => "ui" })).toBe(true);
    });

    it("should return true for a plain object, whose tag is [object Object]", () => {
      expect(nonUi({})).toBe(true);
      expect(nonUi({ alert: (): unknown => undefined })).toBe(true);
    });

    it("should return true for the bare string Ui", () => {
      expect(nonUi("Ui")).toBe(true);
    });

    it("should return true for nil values and primitives", () => {
      expect(nonUi(null)).toBe(true);
      expect(nonUi(undefined)).toBe(true);
      expect(nonUi(42)).toBe(true);
    });

    it("should return true for an array", () => {
      expect(nonUi([])).toBe(true);
    });
  });
});

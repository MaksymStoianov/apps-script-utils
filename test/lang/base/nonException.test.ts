import { Exception, InvalidStringException, RuntimeException } from "@/exception";
import { nonException } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonException", () => {
  describe("Correct input data", () => {
    it("should return false for an Exception instance", () => {
      expect(nonException(new Exception())).toBe(false);
      expect(nonException(new Exception("boom"))).toBe(false);
    });

    it("should return false for subclasses of Exception", () => {
      expect(nonException(new RuntimeException())).toBe(false);
      expect(nonException(new InvalidStringException())).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for a native Error", () => {
      expect(nonException(new Error("native"))).toBe(true);
      expect(nonException(new TypeError("native"))).toBe(true);
    });

    it("should return true for the Exception constructor itself", () => {
      expect(nonException(Exception)).toBe(true);
    });

    it("should return true for nil values", () => {
      expect(nonException(null)).toBe(true);
      expect(nonException(undefined)).toBe(true);
    });

    it("should return true for primitives and plain objects", () => {
      expect(nonException("Exception")).toBe(true);
      expect(nonException(0)).toBe(true);
      expect(nonException({ name: "Exception", message: "boom" })).toBe(true);
      expect(nonException([])).toBe(true);
    });
  });
});

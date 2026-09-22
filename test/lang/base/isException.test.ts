import { Exception, InvalidStringException, RuntimeException } from "@/exception";
import { isException } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isException", () => {
  describe("Correct input data", () => {
    it("should return true for Exception and its subclasses", () => {
      expect(isException(new Exception())).toBe(true);
      expect(isException(new RuntimeException())).toBe(true);
      expect(isException(new InvalidStringException())).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for native errors", () => {
      expect(isException(new Error("boom"))).toBe(false);
      expect(isException(new TypeError("boom"))).toBe(false);
    });

    it("should return false for the Exception constructor itself", () => {
      expect(isException(Exception)).toBe(false);
    });

    it("should return false for an object merely shaped like one", () => {
      expect(isException({ name: "Exception", message: "boom" })).toBe(false);
    });

    it("should return false for nil values and primitives", () => {
      expect(isException(null)).toBe(false);
      expect(isException(undefined)).toBe(false);
      expect(isException("Exception")).toBe(false);
    });
  });
});

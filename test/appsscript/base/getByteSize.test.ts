import { getByteSize } from "@/appsscript";
import { InvalidStringException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("getByteSize", () => {
  describe("Correct input data", () => {
    it("should count ASCII characters", () => {
      expect(getByteSize("")).toBe(0);
      expect(getByteSize("a")).toBe(1);
      expect(getByteSize("hello")).toBe(5);
    });

    it("should count characters in the basic multilingual plane", () => {
      expect(getByteSize("привет")).toBe(6);
      expect(getByteSize("中文")).toBe(2);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for non-string input", () => {
      // @ts-expect-error - testing invalid types
      expect(() => getByteSize(null)).toThrow(InvalidStringException);
      // @ts-expect-error - testing invalid types
      expect(() => getByteSize(42)).toThrow(InvalidStringException);
      // @ts-expect-error - testing invalid types
      expect(() => getByteSize(undefined)).toThrow(InvalidStringException);
    });
  });
});

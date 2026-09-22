import { IllegalArgumentException } from "@/exception";
import { requireVersionCompatible } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireVersionCompatible", () => {
  describe("Correct input data", () => {
    it("should return the current version when it is higher", () => {
      expect(requireVersionCompatible("1.2.0", "1.0.0")).toBe("1.2.0");
      expect(requireVersionCompatible("2.0.0", "1.9.9")).toBe("2.0.0");
    });

    it("should return the current version when the versions are equal", () => {
      expect(requireVersionCompatible("1.0.0", "1.0.0")).toBe("1.0.0");
    });

    it("should treat missing segments as zero", () => {
      expect(requireVersionCompatible("1.0", "1.0.0")).toBe("1.0");
      expect(requireVersionCompatible("1", "1.0.0")).toBe("1");
    });

    it("should compare segments numerically, not lexically", () => {
      expect(requireVersionCompatible("1.10.0", "1.9.0")).toBe("1.10.0");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw when the current version is lower", () => {
      expect(() => requireVersionCompatible("1.0.0", "1.2.0")).toThrow(IllegalArgumentException);
      expect(() => requireVersionCompatible("1.9.0", "1.10.0")).toThrow(IllegalArgumentException);
    });

    it("should name both versions in the default message", () => {
      expect(() => requireVersionCompatible("1.0.0", "1.2.0")).toThrow(
        "Version 1.0.0 is lower than the required 1.2.0."
      );
    });

    it("should use a custom message when provided", () => {
      expect(() =>
        requireVersionCompatible("1.0.0", "1.2.0", "Please update the library.")
      ).toThrow("Please update the library.");
    });

    it("should throw a TypeError when either version is malformed", () => {
      expect(() => requireVersionCompatible("abc", "1.0.0")).toThrow(TypeError);
      expect(() => requireVersionCompatible("1.0.0", "v2")).toThrow(TypeError);
      expect(() => requireVersionCompatible("", "1.0.0")).toThrow(TypeError);
    });
  });
});

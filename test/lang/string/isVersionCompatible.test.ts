import { isVersionCompatible } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isVersionCompatible", () => {
  describe("Correct input data", () => {
    it("should accept a higher current version", () => {
      expect(isVersionCompatible("1.2.0", "1.0.0")).toBe(true);
      expect(isVersionCompatible("2.0.0", "1.9.9")).toBe(true);
    });

    it("should accept an equal version", () => {
      expect(isVersionCompatible("1.0.0", "1.0.0")).toBe(true);
    });

    it("should treat missing segments as zero", () => {
      expect(isVersionCompatible("1.0", "1.0.0")).toBe(true);
      expect(isVersionCompatible("1", "1.0.0")).toBe(true);
    });

    it("should compare segments numerically, not lexically", () => {
      expect(isVersionCompatible("1.10.0", "1.9.0")).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should reject a lower current version", () => {
      expect(isVersionCompatible("1.0.0", "1.2.0")).toBe(false);
      expect(isVersionCompatible("1.9.0", "1.10.0")).toBe(false);
    });

    it("should throw for malformed versions", () => {
      expect(() => isVersionCompatible("abc", "1.0.0")).toThrow(TypeError);
      expect(() => isVersionCompatible("1.0.0", "v2")).toThrow(TypeError);
      expect(() => isVersionCompatible("", "1.0.0")).toThrow(TypeError);
    });
  });
});

import { requireValidSlideId } from "@/appsscript";
import { IllegalArgumentException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("requireValidSlideId", () => {
  describe("Correct input data", () => {
    it("should return the identifier unchanged", () => {
      expect(requireValidSlideId("p1")).toBe("p1");
      expect(requireValidSlideId("g1a2b3c4d5e_0")).toBe("g1a2b3c4d5e_0");
      expect(requireValidSlideId("SLIDES_API123-456")).toBe("SLIDES_API123-456");
    });

    it("should accept a single character, which the pattern allows", () => {
      expect(requireValidSlideId("a")).toBe("a");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for an empty string", () => {
      expect(() => requireValidSlideId("")).toThrow(IllegalArgumentException);
    });

    it("should throw for characters outside the allowed set", () => {
      expect(() => requireValidSlideId("p1 p2")).toThrow(IllegalArgumentException);
      expect(() => requireValidSlideId("p1.p2")).toThrow(IllegalArgumentException);
      expect(() => requireValidSlideId("слайд")).toThrow(IllegalArgumentException);
    });

    it("should throw for whitespace-padded identifiers", () => {
      expect(() => requireValidSlideId(" p1 ")).toThrow(IllegalArgumentException);
    });

    it("should throw for non-string types", () => {
      expect(() => requireValidSlideId(null)).toThrow(IllegalArgumentException);
      expect(() => requireValidSlideId(undefined)).toThrow(IllegalArgumentException);
      expect(() => requireValidSlideId(42)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireValidSlideId("")).toThrow("Expected a valid slide id.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireValidSlideId("", "The slide id is malformed.")).toThrow(
        "The slide id is malformed."
      );
    });
  });
});

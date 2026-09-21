import { EmptyStringException, IllegalArgumentException } from "@/exception";
import { requireValidVersion } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireValidVersion", () => {
  describe("Correct input data", () => {
    it("should return versions of any segment count unchanged", () => {
      expect(requireValidVersion("1")).toBe("1");
      expect(requireValidVersion("1.0")).toBe("1.0");
      expect(requireValidVersion("1.0.0")).toBe("1.0.0");
      expect(requireValidVersion("1.2.3.4.5")).toBe("1.2.3.4.5");
    });

    it("should accept zero and multi-digit segments", () => {
      expect(requireValidVersion("0")).toBe("0");
      expect(requireValidVersion("10.20.30")).toBe("10.20.30");
    });
  });

  describe("Incorrect input data", () => {
    it("should report emptiness rather than a format error for empty input", () => {
      expect(() => requireValidVersion("")).toThrow(EmptyStringException);
      expect(() => requireValidVersion("   ")).toThrow(EmptyStringException);
      expect(() => requireValidVersion(null)).toThrow(EmptyStringException);
      expect(() => requireValidVersion(undefined)).toThrow(EmptyStringException);
    });

    it("should throw for a leading v", () => {
      expect(() => requireValidVersion("v1.0.0")).toThrow(IllegalArgumentException);
    });

    it("should throw for pre-release and build suffixes", () => {
      expect(() => requireValidVersion("1.0.0-alpha")).toThrow(IllegalArgumentException);
      expect(() => requireValidVersion("1.0.0+build")).toThrow(IllegalArgumentException);
    });

    it("should throw for misplaced dots", () => {
      expect(() => requireValidVersion(".1.0")).toThrow(IllegalArgumentException);
      expect(() => requireValidVersion("1.0.")).toThrow(IllegalArgumentException);
      expect(() => requireValidVersion("1..0")).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireValidVersion("v1.0.0")).toThrow("Expected a valid version.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireValidVersion("v1.0.0", "The manifest version is malformed.")).toThrow(
        "The manifest version is malformed."
      );
    });
  });
});

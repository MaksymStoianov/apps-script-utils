import { IllegalArgumentException } from "@/exception";
import { requireAbsolute } from "@/net";
import { describe, expect, it } from "vitest";

describe("requireAbsolute", () => {
  describe("Correct input data", () => {
    it("should return slash-rooted paths unchanged", () => {
      expect(requireAbsolute("/")).toBe("/");
      expect(requireAbsolute("/var/log")).toBe("/var/log");
    });

    it("should return paths carrying a scheme unchanged", () => {
      expect(requireAbsolute("https://example.com")).toBe("https://example.com");
      expect(requireAbsolute("mailto:someone@example.com")).toBe("mailto:someone@example.com");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for relative paths", () => {
      expect(() => requireAbsolute("docs/readme.md")).toThrow(IllegalArgumentException);
      expect(() => requireAbsolute("./docs")).toThrow(IllegalArgumentException);
      expect(() => requireAbsolute("../docs")).toThrow(IllegalArgumentException);
    });

    it("should throw for empty and whitespace-only input", () => {
      expect(() => requireAbsolute("")).toThrow(IllegalArgumentException);
      expect(() => requireAbsolute("   ")).toThrow(IllegalArgumentException);
    });

    it("should throw for non-string input", () => {
      expect(() => requireAbsolute(null)).toThrow(IllegalArgumentException);
      expect(() => requireAbsolute(undefined)).toThrow(IllegalArgumentException);
      expect(() => requireAbsolute(42)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireAbsolute("docs")).toThrow("Expected an absolute path.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireAbsolute("docs", "The root must be absolute.")).toThrow(
        "The root must be absolute."
      );
    });
  });
});

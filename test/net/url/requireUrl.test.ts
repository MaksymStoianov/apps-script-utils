import { IllegalArgumentException } from "@/exception";
import { requireUrl } from "@/net";
import { describe, expect, it } from "vitest";

describe("requireUrl", () => {
  describe("Correct input data", () => {
    it("should return the value unchanged for valid URLs", () => {
      expect(requireUrl("https://www.example.com")).toBe("https://www.example.com");
      expect(requireUrl("https://example.com/path")).toBe("https://example.com/path");
      expect(requireUrl("http://localhost:3000/path")).toBe("http://localhost:3000/path");
      expect(requireUrl("ftp://ftp.example.org/file.txt")).toBe("ftp://ftp.example.org/file.txt");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for malformed URLs", () => {
      expect(() => requireUrl("invalid-url")).toThrow(IllegalArgumentException);
      expect(() => requireUrl("example.com")).toThrow(IllegalArgumentException);
      expect(() => requireUrl("//example.com")).toThrow(IllegalArgumentException);
    });

    it("should throw for an unsupported scheme", () => {
      expect(() => requireUrl("mailto:someone@example.com")).toThrow(IllegalArgumentException);
      expect(() => requireUrl("file:///etc/hosts")).toThrow(IllegalArgumentException);
    });

    it("should throw for a scheme without an authority", () => {
      expect(() => requireUrl("https://")).toThrow(IllegalArgumentException);
    });

    it("should throw when whitespace surrounds an otherwise valid URL", () => {
      expect(() => requireUrl("  https://example.com ")).toThrow(IllegalArgumentException);
    });

    it("should throw for the empty string", () => {
      expect(() => requireUrl("")).toThrow(IllegalArgumentException);
      expect(() => requireUrl("   ")).toThrow(IllegalArgumentException);
    });

    it("should throw for non-string types", () => {
      expect(() => requireUrl(null)).toThrow(IllegalArgumentException);
      expect(() => requireUrl(undefined)).toThrow(IllegalArgumentException);
      expect(() => requireUrl(123)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireUrl("invalid-url")).toThrow("Expected a valid URL.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireUrl(null, "Endpoint is not set.")).toThrow("Endpoint is not set.");
    });
  });
});

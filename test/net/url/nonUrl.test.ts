import { nonUrl } from "@/net";
import { describe, expect, it } from "vitest";

describe("nonUrl", () => {
  describe("Correct input data", () => {
    it("should return true for malformed URLs", () => {
      expect(nonUrl("invalid-url")).toBe(true);
      expect(nonUrl("example.com")).toBe(true);
      expect(nonUrl("//example.com")).toBe(true);
      expect(nonUrl("/path/only")).toBe(true);
    });

    it("should return true for an unsupported scheme", () => {
      expect(nonUrl("mailto:someone@example.com")).toBe(true);
      expect(nonUrl("file:///etc/hosts")).toBe(true);
    });

    it("should return true for a scheme without an authority", () => {
      expect(nonUrl("https://")).toBe(true);
      expect(nonUrl("https:///path")).toBe(true);
    });

    it("should return true when whitespace surrounds an otherwise valid URL", () => {
      expect(nonUrl("  https://whitespace.com ")).toBe(true);
      expect(nonUrl("https://exa mple.com")).toBe(true);
    });

    it("should return true for the empty string", () => {
      expect(nonUrl("")).toBe(true);
      expect(nonUrl("   ")).toBe(true);
    });

    it("should return true for non-string types", () => {
      expect(nonUrl(null)).toBe(true);
      expect(nonUrl(undefined)).toBe(true);
      expect(nonUrl(123)).toBe(true);
      expect(nonUrl(["https://example.com"])).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for valid URLs", () => {
      expect(nonUrl("https://www.example.com")).toBe(false);
      expect(nonUrl("https://example.com/path")).toBe(false);
      expect(nonUrl("http://localhost:3000/path")).toBe(false);
      expect(nonUrl("ftp://ftp.example.org/file.txt")).toBe(false);
    });
  });
});

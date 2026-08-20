import { isUrl } from "@/net";
import { describe, expect, it } from "vitest";

describe("isUrl", () => {
  describe("Correct input data", () => {
    it("should return true for standard HTTP/HTTPS URLs", () => {
      expect(isUrl("https://www.example.com")).toBe(true);
      expect(isUrl("https://example.com/path")).toBe(true);
      expect(isUrl("http://example.com")).toBe(true);
    });

    it("should return true for localhost URLs with or without ports", () => {
      expect(isUrl("http://localhost:3000/path")).toBe(true);
      expect(isUrl("http://localhost")).toBe(true);
      expect(isUrl("https://localhost:8080")).toBe(true);
    });

    it("should return true for FTP URLs", () => {
      expect(isUrl("ftp://ftp.example.org/file.txt")).toBe(true);
      expect(isUrl("ftp://example.com")).toBe(true);
    });

    it("should return true for URLs with query parameters and fragments", () => {
      expect(isUrl("https://example.com?query=1")).toBe(true);
      expect(isUrl("https://example.com#section")).toBe(true);
      expect(isUrl("https://example.com/path?foo=bar#section")).toBe(true);
    });

    it("should return true for URLs with subdomains and complex paths", () => {
      expect(isUrl("https://sub.domain.example.co.uk/path/to/resource")).toBe(true);
    });

    it("should return true for URLs with IP addresses", () => {
      expect(isUrl("http://127.0.0.1:8080")).toBe(true);
      expect(isUrl("http://192.168.1.1")).toBe(true);
    });

    it("should return true for URLs with uppercase or mixed-case protocols", () => {
      expect(isUrl("HTTPS://EXAMPLE.COM")).toBe(true);
      expect(isUrl("hTtP://ExAmPlE.CoM/Path")).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for an empty string", () => {
      expect(isUrl("")).toBe(false);
    });

    it("should return false for a whitespace-only string", () => {
      expect(isUrl("   ")).toBe(false);
      expect(isUrl("\t\n")).toBe(false);
    });

    it("should return false for URLs with leading or trailing whitespace", () => {
      expect(isUrl("  https://whitespace.com ")).toBe(false);
      expect(isUrl(" https://whitespace.com")).toBe(false);
      expect(isUrl("https://whitespace.com ")).toBe(false);
    });

    it("should return false for URLs containing spaces", () => {
      expect(isUrl("http://example .com")).toBe(false);
      expect(isUrl("http://example.com/path with spaces")).toBe(false);
    });

    it("should return false for invalid URL strings", () => {
      expect(isUrl("invalid-url")).toBe(false);
      expect(isUrl("http://")).toBe(false);
      expect(isUrl("https://")).toBe(false);
      expect(isUrl("ftp://")).toBe(false);
      expect(isUrl("http:///")).toBe(false);
    });

    it("should return false for unsupported protocols", () => {
      expect(isUrl("javascript:alert(1)")).toBe(false);
      expect(isUrl("mailto:user@example.com")).toBe(false);
      expect(isUrl("file:///path/to/file")).toBe(false);
    });

    it("should return false for relative paths", () => {
      expect(isUrl("/path/to/file")).toBe(false);
      expect(isUrl("./relative/path")).toBe(false);
      expect(isUrl("../parent/path")).toBe(false);
    });

    it("should return false for non-string values", () => {
      expect(isUrl(null)).toBe(false);
      expect(isUrl(undefined)).toBe(false);
      expect(isUrl(123)).toBe(false);
      expect(isUrl(true)).toBe(false);
      expect(isUrl(false)).toBe(false);
      expect(isUrl([])).toBe(false);
      expect(isUrl({})).toBe(false);
      expect(isUrl(() => {})).toBe(false);
      expect(isUrl(Symbol("test"))).toBe(false);
    });

    it("should handle potentially malicious strings safely and quickly without ReDoS", () => {
      const startTime = performance.now();

      const maliciousInput = "https://" + "a.".repeat(100) + "@".repeat(100);

      isUrl(maliciousInput);

      const elapsed = performance.now() - startTime;

      expect(elapsed).toBeLessThan(100);
    });
  });
});

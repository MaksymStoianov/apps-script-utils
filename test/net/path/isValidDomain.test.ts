import { isValidDomain } from "@/net";
import { describe, expect, it } from "vitest";

describe("isValidDomain", () => {
  describe("Correct input data", () => {
    it("should validate a standard domain", () => {
      expect(isValidDomain("example.com")).toBe(true);
    });

    it("should validate a domain with subdomains", () => {
      expect(isValidDomain("sub.example.com")).toBe(true);
    });

    it("should validate a domain with hyphens in labels", () => {
      expect(isValidDomain("my-domain.co.uk")).toBe(true);
    });

    it("should validate a domain with numbers in labels", () => {
      expect(isValidDomain("domain123.net")).toBe(true);
    });

    it("should validate a domain with a single-character subdomain", () => {
      expect(isValidDomain("a.example.com")).toBe(true);
    });

    it("should validate a domain with a numeric TLD (though rare)", () => {
      expect(isValidDomain("test.io")).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for an empty string", () => {
      expect(isValidDomain("")).toBe(false);
    });

    it("should return false for null", () => {
      // @ts-expect-error: Testing invalid input type
      expect(isValidDomain(null)).toBe(false);
    });

    it("should return false for undefined", () => {
      // @ts-expect-error: Testing invalid input type
      expect(isValidDomain(undefined)).toBe(false);
    });

    it("should return false for a number", () => {
      // @ts-expect-error: Testing invalid input type
      expect(isValidDomain(123)).toBe(false);
    });

    it("should return false for a boolean", () => {
      // @ts-expect-error: Testing invalid input type
      expect(isValidDomain(true)).toBe(false);
    });

    it("should return false for an array", () => {
      // @ts-expect-error: Testing invalid input type
      expect(isValidDomain([])).toBe(false);
    });

    it("should return false for an object", () => {
      // @ts-expect-error: Testing invalid input type
      expect(isValidDomain({})).toBe(false);
    });

    it("should return false for consecutive dots (..)", () => {
      expect(isValidDomain("example..com")).toBe(false);
      expect(isValidDomain("sub..domain.com")).toBe(false);
    });

    it("should return false for a domain starting with a hyphen", () => {
      expect(isValidDomain("-example.com")).toBe(false);
    });

    it("should return false for a domain ending with a hyphen", () => {
      expect(isValidDomain("example-.com")).toBe(false);
      expect(isValidDomain("example.com-")).toBe(false);
    });

    it("should return false for a domain starting with a dot", () => {
      expect(isValidDomain(".example.com")).toBe(false);
    });

    it("should return false for a domain ending with a dot", () => {
      expect(isValidDomain("example.com.")).toBe(false);
    });

    it("should return false for a domain with a hyphen at the start of a subdomain", () => {
      expect(isValidDomain("sub.-example.com")).toBe(false);
    });

    it("should return false for a domain with a hyphen at the end of a subdomain", () => {
      expect(isValidDomain("sub-.example.com")).toBe(false);
    });

    it("should return false for a domain with an invalid character in a label", () => {
      expect(isValidDomain("exa_mple.com")).toBe(false);
      expect(isValidDomain("ex@mple.com")).toBe(false);
    });

    it("should return false for a domain with less than two parts (missing TLD)", () => {
      expect(isValidDomain("example")).toBe(false);
    });

    it("should return false for a TLD with less than 2 characters", () => {
      expect(isValidDomain("example.c")).toBe(false);
    });

    it("should return false for a TLD with numbers or hyphens (based on current regex)", () => {
      expect(isValidDomain("example.c1m")).toBe(false);
      expect(isValidDomain("example.co-m")).toBe(false);
    });

    it("should return false for a single label domain (e.g., just a TLD)", () => {
      expect(isValidDomain("com")).toBe(false);
    });
  });
});

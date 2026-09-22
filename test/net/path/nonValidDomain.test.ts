import { nonValidDomain } from "@/net";
import { describe, expect, it } from "vitest";

describe("nonValidDomain", () => {
  describe("Correct input data", () => {
    it("should return false for ordinary domains", () => {
      expect(nonValidDomain("example.com")).toBe(false);
      expect(nonValidDomain("sub.example.com")).toBe(false);
      expect(nonValidDomain("a.co")).toBe(false);
    });

    it("should return false for labels containing digits and hyphens", () => {
      expect(nonValidDomain("my-site1.example.com")).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true when there is no top-level domain", () => {
      expect(nonValidDomain("example")).toBe(true);
      expect(nonValidDomain("localhost")).toBe(true);
    });

    it("should return true for a hyphen at a label edge", () => {
      expect(nonValidDomain("-example.com")).toBe(true);
      expect(nonValidDomain("example-.com")).toBe(true);
      expect(nonValidDomain("sub.-example.com")).toBe(true);
    });

    it("should return true for a dot at an edge or doubled", () => {
      expect(nonValidDomain(".example.com")).toBe(true);
      expect(nonValidDomain("example.com.")).toBe(true);
      expect(nonValidDomain("example..com")).toBe(true);
    });

    it("should return true for a one-letter or non-alphabetic TLD", () => {
      expect(nonValidDomain("example.c")).toBe(true);
      expect(nonValidDomain("example.c0m")).toBe(true);
      expect(nonValidDomain("example.123")).toBe(true);
    });

    it("should return true for characters outside the allowed set", () => {
      expect(nonValidDomain("exa mple.com")).toBe(true);
      expect(nonValidDomain("exa_mple.com")).toBe(true);
      expect(nonValidDomain("пример.рф")).toBe(true);
    });

    it("should return true for empty input and non-string types", () => {
      expect(nonValidDomain("")).toBe(true);
      // @ts-expect-error - testing invalid types
      expect(nonValidDomain(null)).toBe(true);
      // @ts-expect-error - testing invalid types
      expect(nonValidDomain(undefined)).toBe(true);
      // @ts-expect-error - testing invalid types
      expect(nonValidDomain(42)).toBe(true);
    });
  });
});

import { IllegalArgumentException } from "@/exception";
import { requireValidDomain } from "@/net";
import { describe, expect, it } from "vitest";

describe("requireValidDomain", () => {
  describe("Correct input data", () => {
    it("should return the domain unchanged", () => {
      expect(requireValidDomain("example.com")).toBe("example.com");
      expect(requireValidDomain("sub.example.com")).toBe("sub.example.com");
      expect(requireValidDomain("a.co")).toBe("a.co");
    });

    it("should accept labels containing digits and hyphens", () => {
      expect(requireValidDomain("my-site1.example.com")).toBe("my-site1.example.com");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw when there is no top-level domain", () => {
      expect(() => requireValidDomain("example")).toThrow(IllegalArgumentException);
      expect(() => requireValidDomain("localhost")).toThrow(IllegalArgumentException);
    });

    it("should throw for a hyphen or dot at a label edge", () => {
      expect(() => requireValidDomain("-example.com")).toThrow(IllegalArgumentException);
      expect(() => requireValidDomain("example.com.")).toThrow(IllegalArgumentException);
      expect(() => requireValidDomain("example..com")).toThrow(IllegalArgumentException);
    });

    it("should throw for a one-letter or non-alphabetic TLD", () => {
      expect(() => requireValidDomain("example.c")).toThrow(IllegalArgumentException);
      expect(() => requireValidDomain("example.123")).toThrow(IllegalArgumentException);
    });

    it("should throw for an internationalised domain", () => {
      expect(() => requireValidDomain("пример.рф")).toThrow(IllegalArgumentException);
    });

    it("should throw for empty input and non-string types", () => {
      expect(() => requireValidDomain("")).toThrow(IllegalArgumentException);
      expect(() => requireValidDomain(null)).toThrow(IllegalArgumentException);
      expect(() => requireValidDomain(undefined)).toThrow(IllegalArgumentException);
      expect(() => requireValidDomain(42)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireValidDomain("localhost")).toThrow("Expected a valid domain name.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireValidDomain("localhost", "A public domain is required.")).toThrow(
        "A public domain is required."
      );
    });
  });
});

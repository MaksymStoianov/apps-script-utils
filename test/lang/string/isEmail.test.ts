import { isEmail } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isEmail", () => {
  describe("Correct input data", () => {
    it("should validate a standard email", () => {
      expect(isEmail("test@example.com")).toBe(true);
    });

    it("should validate an email with a subdomain", () => {
      expect(isEmail("john.doe@sub.domain.co.uk")).toBe(true);
    });

    it("should validate an email with a single letter domain", () => {
      expect(isEmail("info@e.org")).toBe(true);
    });

    it("should validate an email with mixed case characters (case-insensitive by default for regex)", () => {
      expect(isEmail("TeSt@ExAmPlE.cOm")).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for an empty string", () => {
      expect(isEmail("")).toBe(false);
    });

    it('should return false for an email without "@" symbol', () => {
      expect(isEmail("invalid-email.com")).toBe(false);
    });

    it("should return false for an email without a domain", () => {
      expect(isEmail("user@")).toBe(false);
    });

    it("should return false for an email without a top-level domain (TLD)", () => {
      expect(isEmail("user@domain")).toBe(false);
    });

    it("should return false for an email with an invalid TLD (less than 2 characters)", () => {
      expect(isEmail("user@domain.c")).toBe(false);
    });

    it("should return false for an email with spaces", () => {
      expect(isEmail("user name@example.com")).toBe(false);
      expect(isEmail("user@exam ple.com")).toBe(false);
    });

    it('should return false for an email starting with "@"', () => {
      expect(isEmail("@example.com")).toBe(false);
    });

    it('should return false for an email ending with "."', () => {
      expect(isEmail("user@example.com.")).toBe(false);
    });

    it('should return false for an email with multiple "@" symbols', () => {
      expect(isEmail("user@example@domain.com")).toBe(false);
    });

    it("should return false for an email with consecutive dots in domain", () => {
      expect(isEmail("user@example..com")).toBe(false);
    });

    it("should return false for null", () => {
      expect(isEmail(null)).toBe(false);
    });

    it("should return false for undefined", () => {
      expect(isEmail(undefined)).toBe(false);
    });

    it("should return false for a number", () => {
      expect(isEmail(123)).toBe(false);
    });

    it("should return false for a boolean", () => {
      expect(isEmail(true)).toBe(false);
    });

    it("should return false for an array", () => {
      expect(isEmail([])).toBe(false);
    });

    it("should return false for an object", () => {
      expect(isEmail({})).toBe(false);
    });
  });
});

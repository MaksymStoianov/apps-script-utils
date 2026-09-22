import { nonValidEmail } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonValidEmail", () => {
  describe("Correct input data", () => {
    it("should return false for ordinary addresses", () => {
      expect(nonValidEmail("user@example.com")).toBe(false);
      expect(nonValidEmail("first.last@example.co.uk")).toBe(false);
    });

    it("should return false for addresses carrying a plus alias", () => {
      expect(nonValidEmail("user+tag@example.com")).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true when the at sign is missing or repeated", () => {
      expect(nonValidEmail("userexample.com")).toBe(true);
      expect(nonValidEmail("user@@example.com")).toBe(true);
      expect(nonValidEmail("a@b@example.com")).toBe(true);
    });

    it("should return true for a missing or malformed domain", () => {
      expect(nonValidEmail("user@")).toBe(true);
      expect(nonValidEmail("user@example")).toBe(true);
      expect(nonValidEmail("user@-example.com")).toBe(true);
    });

    it("should return true for a malformed local part", () => {
      expect(nonValidEmail("@example.com")).toBe(true);
      expect(nonValidEmail(".user@example.com")).toBe(true);
      expect(nonValidEmail("user.@example.com")).toBe(true);
    });

    it("should return true for empty and whitespace-padded input", () => {
      expect(nonValidEmail("")).toBe(true);
      expect(nonValidEmail(" user@example.com ")).toBe(true);
    });

    it("should return true for non-string types", () => {
      expect(nonValidEmail(null)).toBe(true);
      expect(nonValidEmail(undefined)).toBe(true);
      expect(nonValidEmail(42)).toBe(true);
      expect(nonValidEmail({ email: "user@example.com" })).toBe(true);
    });
  });
});

import { isValidSlug } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isValidSlug", () => {
  describe("Correct input data", () => {
    it("should accept ordinary slugs", () => {
      expect(isValidSlug("post")).toBe(true);
      expect(isValidSlug("my-post")).toBe(true);
      expect(isValidSlug("my_post")).toBe(true);
      expect(isValidSlug("post-2024")).toBe(true);
    });

    it("should accept a single letter", () => {
      expect(isValidSlug("a")).toBe(true);
    });

    it("should accept uppercase, since the pattern is case-insensitive", () => {
      expect(isValidSlug("My-Post")).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should reject a slug not starting with a letter", () => {
      expect(isValidSlug("2024-post")).toBe(false);
      expect(isValidSlug("-post")).toBe(false);
      expect(isValidSlug("_post")).toBe(false);
    });

    it("should reject characters outside the allowed set", () => {
      expect(isValidSlug("my post")).toBe(false);
      expect(isValidSlug("my.post")).toBe(false);
      expect(isValidSlug("пост")).toBe(false);
    });

    it("should reject empty and whitespace-only strings", () => {
      expect(isValidSlug("")).toBe(false);
      expect(isValidSlug("   ")).toBe(false);
    });

    it("should reject non-string types", () => {
      // @ts-expect-error - testing invalid types
      expect(isValidSlug(null)).toBe(false);
      // @ts-expect-error - testing invalid types
      expect(isValidSlug(42)).toBe(false);
    });
  });
});

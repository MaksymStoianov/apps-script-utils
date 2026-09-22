import { nonValidSlug } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonValidSlug", () => {
  describe("Correct input data", () => {
    it("should return false for ordinary slugs", () => {
      expect(nonValidSlug("post")).toBe(false);
      expect(nonValidSlug("my-post")).toBe(false);
      expect(nonValidSlug("my_post")).toBe(false);
      expect(nonValidSlug("post-2024")).toBe(false);
    });

    it("should return false for a single letter", () => {
      expect(nonValidSlug("a")).toBe(false);
    });

    it("should return false for uppercase, which the pattern allows", () => {
      expect(nonValidSlug("My-Post")).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true when the slug does not start with a letter", () => {
      expect(nonValidSlug("2024-post")).toBe(true);
      expect(nonValidSlug("-post")).toBe(true);
      expect(nonValidSlug("_post")).toBe(true);
    });

    it("should return true for characters outside the allowed set", () => {
      expect(nonValidSlug("my post")).toBe(true);
      expect(nonValidSlug("my.post")).toBe(true);
      expect(nonValidSlug("my/post")).toBe(true);
      expect(nonValidSlug("пост")).toBe(true);
    });

    it("should return true for an empty string", () => {
      expect(nonValidSlug("")).toBe(true);
      expect(nonValidSlug("   ")).toBe(true);
    });

    it("should return true for non-string types", () => {
      // @ts-expect-error - testing invalid types
      expect(nonValidSlug(null)).toBe(true);
      // @ts-expect-error - testing invalid types
      expect(nonValidSlug(undefined)).toBe(true);
      // @ts-expect-error - testing invalid types
      expect(nonValidSlug(42)).toBe(true);
    });
  });
});

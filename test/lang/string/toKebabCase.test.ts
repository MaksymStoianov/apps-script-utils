import { EmptyStringException } from "@/exception";
import { toKebabCase } from "@/lang";
import { describe, expect, it } from "vitest";

describe("toKebabCase", () => {
  describe("Correct input data", () => {
    it("should replace spaces and underscores with hyphens", () => {
      expect(toKebabCase("hello world")).toBe("hello-world");
      expect(toKebabCase("hello_world")).toBe("hello-world");
    });

    it("should split camelCase at the case boundary", () => {
      expect(toKebabCase("myPostTitle")).toBe("my-post-title");
    });

    it("should lowercase the result", () => {
      expect(toKebabCase("HELLO WORLD")).toBe("hello-world");
    });

    it("should leave an already-kebab string unchanged", () => {
      expect(toKebabCase("my-post-title")).toBe("my-post-title");
    });
  });

  describe("Options", () => {
    it("should keep punctuation by default", () => {
      expect(toKebabCase("hello, world!")).toBe("hello,-world!");
    });

    it("should strip it when cleaning is requested", () => {
      expect(toKebabCase("hello, world!", { clean: true })).toBe("hello-world");
    });

    it("should collapse runs of hyphens when trimming", () => {
      expect(toKebabCase("a   b", { trim: true })).toBe("a-b");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for empty and non-string input", () => {
      expect(() => toKebabCase("")).toThrow(EmptyStringException);
      // @ts-expect-error - testing invalid types
      expect(() => toKebabCase(null)).toThrow(EmptyStringException);
    });
  });

  // Spaces become hyphens before `trim()` runs, so there is no whitespace left
  // to trim and edge separators survive. Noted in #441.
  describe("Known limitation: trim does not strip edge separators", () => {
    it("should currently keep leading and trailing hyphens", () => {
      expect(toKebabCase("  a   b  ", { trim: true })).toBe("-a-b-");
    });
  });
});

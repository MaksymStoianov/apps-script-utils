import { EmptyStringException } from "@/exception";
import { toCamelCase } from "@/lang";
import { describe, expect, it } from "vitest";

describe("toCamelCase", () => {
  describe("Correct input data", () => {
    it("should join space-separated words", () => {
      expect(toCamelCase("hello world")).toBe("helloWorld");
      expect(toCamelCase("one two three")).toBe("oneTwoThree");
    });

    it("should join hyphen-separated words", () => {
      expect(toCamelCase("my-post-title")).toBe("myPostTitle");
    });

    it("should lowercase the remainder of each word", () => {
      expect(toCamelCase("HELLO WORLD")).toBe("helloWorld");
    });

    it("should leave a single lowercase word untouched", () => {
      expect(toCamelCase("hello")).toBe("hello");
    });
  });

  describe("Options", () => {
    it("should keep the first word capitalised when asked", () => {
      expect(toCamelCase("hello world", { firstWordToLowerCase: false })).toBe("HelloWorld");
    });

    it("should strip non-alphanumerics by default", () => {
      expect(toCamelCase("hello, world!")).toBe("helloWorld");
    });

    it("should keep them when cleaning is disabled", () => {
      expect(toCamelCase("hello, world!", { clean: false })).toBe("hello,World!");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for empty and non-string input", () => {
      expect(() => toCamelCase("")).toThrow(EmptyStringException);
      expect(() => toCamelCase("   ")).toThrow(EmptyStringException);
      // @ts-expect-error - testing invalid types
      expect(() => toCamelCase(null)).toThrow(EmptyStringException);
    });
  });

  // `\w` includes the underscore, so `\b\w+\b` treats a snake_case string as
  // one word and never splits it. Tracked in #441; this assertion changes
  // when that is fixed.
  describe("Known defect: snake_case is not split", () => {
    it("should currently flatten underscored input", () => {
      expect(toCamelCase("my_post_title")).toBe("myposttitle");
    });
  });
});

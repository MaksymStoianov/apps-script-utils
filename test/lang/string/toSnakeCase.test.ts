import { EmptyStringException } from "@/exception";
import { toSnakeCase } from "@/lang";
import { describe, expect, it } from "vitest";

describe("toSnakeCase", () => {
  describe("Correct input data", () => {
    it("should replace spaces and hyphens with underscores", () => {
      expect(toSnakeCase("hello world")).toBe("hello_world");
      expect(toSnakeCase("hello-world")).toBe("hello_world");
    });

    it("should split camelCase at the case boundary", () => {
      expect(toSnakeCase("myPostTitle")).toBe("my_post_title");
    });

    it("should lowercase the result", () => {
      expect(toSnakeCase("HELLO WORLD")).toBe("hello_world");
    });

    it("should leave an already-snake string unchanged", () => {
      expect(toSnakeCase("my_post_title")).toBe("my_post_title");
    });
  });

  describe("Options", () => {
    it("should keep punctuation by default", () => {
      expect(toSnakeCase("hello, world!")).toBe("hello,_world!");
    });

    it("should strip it when cleaning is requested", () => {
      expect(toSnakeCase("hello, world!", { clean: true })).toBe("hello_world");
    });

    it("should collapse runs of underscores when trimming", () => {
      expect(toSnakeCase("a   b", { trim: true })).toBe("a_b");
    });

    it("should accept an omitted options object", () => {
      expect(toSnakeCase("hello world", undefined)).toBe("hello_world");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for empty and non-string input", () => {
      expect(() => toSnakeCase("")).toThrow(EmptyStringException);
      // @ts-expect-error - testing invalid types
      expect(() => toSnakeCase(null)).toThrow(EmptyStringException);
    });
  });
});

import { EmptyStringException } from "@/exception";
import { normalize } from "@/net";
import { describe, expect, it } from "vitest";

describe("normalize", () => {
  describe("Correct input data", () => {
    it("should resolve a current-directory reference", () => {
      expect(normalize("/a/./b")).toBe("/a/b");
    });

    it("should resolve a parent reference", () => {
      expect(normalize("/a/b/../c")).toBe("/a/c");
    });

    it("should collapse repeated separators", () => {
      expect(normalize("/a//b")).toBe("/a/b");
    });

    it("should drop a trailing separator", () => {
      expect(normalize("/a/b/")).toBe("/a/b");
    });

    it("should trim surrounding whitespace", () => {
      expect(normalize("  /a/b  ")).toBe("/a/b");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for empty and non-string input", () => {
      expect(() => normalize("")).toThrow(EmptyStringException);
      expect(() => normalize("   ")).toThrow(EmptyStringException);
      // @ts-expect-error - testing invalid types
      expect(() => normalize(null)).toThrow(EmptyStringException);
    });
  });

  // `normalize` is implemented as `join("/", path)`, so every result is
  // absolute and a parent reference cannot escape the root. Tracked in #444.
  describe("Known defect: relative input becomes absolute", () => {
    it("should currently root a relative path", () => {
      expect(normalize("a/b")).toBe("/a/b");
      expect(normalize("./a")).toBe("/a");
    });

    it("should currently swallow an attempt to escape above the root", () => {
      expect(normalize("../a")).toBe("/a");
    });
  });
});

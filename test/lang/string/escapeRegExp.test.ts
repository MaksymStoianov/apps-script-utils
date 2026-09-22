import { EmptyStringException } from "@/exception";
import { escapeRegExp } from "@/lang";
import { describe, expect, it } from "vitest";

describe("escapeRegExp", () => {
  describe("Correct input data", () => {
    it("should escape every regular expression metacharacter", () => {
      expect(escapeRegExp("a.b*c+d?e^f$g|h(i)j[k]l{m}n\\o")).toBe(
        "a\\.b\\*c\\+d\\?e\\^f\\$g\\|h\\(i\\)j\\[k\\]l\\{m\\}n\\\\o"
      );
    });

    it("should leave ordinary text untouched", () => {
      expect(escapeRegExp("abc")).toBe("abc");
      expect(escapeRegExp("hello world 123")).toBe("hello world 123");
    });

    it("should escape a lone hyphen", () => {
      expect(escapeRegExp("a-b")).toBe("a\\-b");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for empty and whitespace-only input", () => {
      expect(() => escapeRegExp("")).toThrow(EmptyStringException);
      expect(() => escapeRegExp("   ")).toThrow(EmptyStringException);
    });

    it("should throw for non-string types", () => {
      // @ts-expect-error - testing invalid types
      expect(() => escapeRegExp(null)).toThrow(EmptyStringException);
      // @ts-expect-error - testing invalid types
      expect(() => escapeRegExp(42)).toThrow(EmptyStringException);
    });
  });

  describe("Round trip", () => {
    it("should produce a pattern matching the original literally", () => {
      const literal = "price: $9.99 (50% off?)";

      expect(new RegExp(escapeRegExp(literal)).test(literal)).toBe(true);
    });

    it("should stop metacharacters from acting as wildcards", () => {
      expect(new RegExp(escapeRegExp("a.c")).test("abc")).toBe(false);
      expect(new RegExp(escapeRegExp("a.c")).test("a.c")).toBe(true);
    });

    it("should neutralise a quantifier", () => {
      expect(new RegExp(escapeRegExp("a+")).test("aaa")).toBe(false);
      expect(new RegExp(escapeRegExp("a+")).test("a+")).toBe(true);
    });
  });
});

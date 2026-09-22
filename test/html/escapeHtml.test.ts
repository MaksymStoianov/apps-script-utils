import { EmptyStringException } from "@/exception";
import { escapeHtml, escapeXml } from "@/html";
import { describe, expect, it } from "vitest";

describe("escapeHtml", () => {
  describe("Correct input data", () => {
    it("should escape the five markup characters", () => {
      expect(escapeHtml("<")).toBe("&lt;");
      expect(escapeHtml(">")).toBe("&gt;");
      expect(escapeHtml("&")).toBe("&amp;");
      expect(escapeHtml('"')).toBe("&quot;");
      expect(escapeHtml("'")).toBe("&apos;");
    });

    it("should escape a tag with attributes", () => {
      expect(escapeHtml(`<a href="x">'&'</a>`)).toBe(
        "&lt;a href=&quot;x&quot;&gt;&apos;&amp;&apos;&lt;/a&gt;"
      );
    });

    it("should escape the ampersand first, so entities are not double-escaped wrongly", () => {
      expect(escapeHtml("&lt;")).toBe("&amp;lt;");
    });

    it("should leave ordinary text untouched", () => {
      expect(escapeHtml("hello world")).toBe("hello world");
      expect(escapeHtml("привет")).toBe("привет");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for empty and non-string input", () => {
      expect(() => escapeHtml("")).toThrow(EmptyStringException);
      // @ts-expect-error - testing invalid types
      expect(() => escapeHtml(null)).toThrow(EmptyStringException);
    });
  });

  // The two functions are character-for-character identical today.
  describe("Relationship to escapeXml", () => {
    it("should produce the same output as escapeXml for every fixture", () => {
      const fixtures = ["<", ">", "&", '"', "'", `<a href="x">'&'</a>`, "plain"];

      for (const value of fixtures) {
        expect(escapeHtml(value)).toBe(escapeXml(value));
      }
    });
  });
});

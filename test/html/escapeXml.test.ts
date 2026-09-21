import { EmptyStringException } from "@/exception";
import { escapeXml } from "@/html";
import { describe, expect, it } from "vitest";

describe("escapeXml", () => {
  describe("Correct input data", () => {
    it("should escape the five predefined XML entities", () => {
      expect(escapeXml("<")).toBe("&lt;");
      expect(escapeXml(">")).toBe("&gt;");
      expect(escapeXml("&")).toBe("&amp;");
      expect(escapeXml('"')).toBe("&quot;");
      expect(escapeXml("'")).toBe("&apos;");
    });

    it("should escape an element with an attribute", () => {
      expect(escapeXml(`<node attr="v">text</node>`)).toBe(
        "&lt;node attr=&quot;v&quot;&gt;text&lt;/node&gt;"
      );
    });

    it("should leave ordinary text untouched", () => {
      expect(escapeXml("hello world")).toBe("hello world");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for empty and non-string input", () => {
      expect(() => escapeXml("")).toThrow(EmptyStringException);
      // @ts-expect-error - testing invalid types
      expect(() => escapeXml(null)).toThrow(EmptyStringException);
    });
  });
});

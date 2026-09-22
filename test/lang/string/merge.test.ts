import { IllegalArgumentException } from "@/exception";
import { escapeHtml } from "@/html";
import { merge } from "@/lang";
import { describe, expect, it } from "vitest";

describe("merge", () => {
  describe("Correct input data", () => {
    it("should substitute a top-level key", () => {
      expect(merge("Hello, {{ name }}!", { name: "Ada" })).toBe("Hello, Ada!");
    });

    it("should ignore whitespace inside the braces", () => {
      expect(merge("{{name}} {{  name  }}", { name: "Ada" })).toBe("Ada Ada");
    });

    it("should resolve a dotted path", () => {
      expect(
        merge("{{ user.name }} <{{ user.email }}>", { user: { name: "Ada", email: "a@b.c" } })
      ).toBe("Ada <a@b.c>");
    });

    it("should resolve a deep path", () => {
      expect(merge("{{ a.b.c.d }}", { a: { b: { c: { d: "deep" } } } })).toBe("deep");
    });

    it("should fill every occurrence of a repeated placeholder", () => {
      expect(merge("{{ n }}-{{ n }}-{{ n }}", { n: 7 })).toBe("7-7-7");
    });

    it("should stringify non-string values", () => {
      expect(merge("{{ n }} {{ b }}", { n: 42, b: false })).toBe("42 false");
    });

    it("should substitute zero and the empty string", () => {
      expect(merge("[{{ n }}][{{ s }}]", { n: 0, s: "" })).toBe("[0][]");
    });

    it("should leave a template without placeholders alone", () => {
      expect(merge("nothing here", { a: 1 })).toBe("nothing here");
    });

    it("should return an empty string for an empty template", () => {
      expect(merge("", { a: 1 })).toBe("");
    });

    it("should leave an empty placeholder alone", () => {
      expect(merge("{{}} {{   }}", { a: 1 })).toBe("{{}} {{   }}");
    });

    it("should not reinterpret dollar patterns in the substituted value", () => {
      expect(merge("{{ v }}", { v: "$& $1 $$" })).toBe("$& $1 $$");
    });
  });

  describe("Missing keys", () => {
    it("should keep the placeholder by default", () => {
      expect(merge("Hello, {{ name }}!", {})).toBe("Hello, {{ name }}!");
      expect(merge("{{ a.b }}", { a: {} })).toBe("{{ a.b }}");
    });

    it("should keep the placeholder for null and undefined", () => {
      expect(merge("{{ a }}", { a: null })).toBe("{{ a }}");
      expect(merge("{{ a }}", { a: undefined })).toBe("{{ a }}");
    });

    it("should substitute an empty string when asked", () => {
      expect(merge("Hello, {{ name }}!", {}, { onMissing: "empty" })).toBe("Hello, !");
      expect(merge("{{ a }}", { a: null }, { onMissing: "empty" })).toBe("");
    });
  });

  describe("Escaping", () => {
    it("should not escape by default", () => {
      expect(merge("<p>{{ bio }}</p>", { bio: "<b>" })).toBe("<p><b></p>");
    });

    it("should apply the given escape function", () => {
      const escaped = escapeHtml("<b>");

      expect(merge("<p>{{ bio }}</p>", { bio: "<b>" }, { escape: escapeHtml })).toBe(
        `<p>${escaped}</p>`
      );
    });

    it("should not escape a placeholder it leaves standing", () => {
      expect(merge("{{ missing }}", {}, { escape: escapeHtml })).toBe("{{ missing }}");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw when the template is not a string", () => {
      expect(() => merge(null as unknown as string, {})).toThrow(IllegalArgumentException);
      expect(() => merge(42 as unknown as string, {})).toThrow(IllegalArgumentException);
    });

    it("should throw when the data is not an object", () => {
      expect(() => merge("{{ a }}", null as unknown as object)).toThrow(IllegalArgumentException);
      expect(() => merge("{{ a }}", "text" as unknown as object)).toThrow(IllegalArgumentException);
    });
  });
});

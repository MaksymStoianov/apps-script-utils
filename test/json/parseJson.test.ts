import { parseJson } from "@/json";
import { describe, expect, it } from "vitest";

// parseJson is deprecated, but it still ships and still has behaviour worth
// pinning until it is removed.
describe("parseJson", () => {
  describe("Valid JSON", () => {
    it("should parse an object", () => {
      expect(parseJson('{"a":1}')).toEqual({ a: 1 });
    });

    it("should parse an array", () => {
      expect(parseJson("[1,2]")).toEqual([1, 2]);
    });

    it("should parse nested structures", () => {
      expect(parseJson('{"a":{"b":[1,2]}}')).toEqual({ a: { b: [1, 2] } });
    });
  });

  describe("Lenient forms it repairs", () => {
    it("should accept single-quoted keys and values", () => {
      expect(parseJson("{'a':1}")).toEqual({ a: 1 });
    });

    it("should accept unquoted keys", () => {
      expect(parseJson("{a:1}")).toEqual({ a: 1 });
    });

    it("should keep double quotes inside a single-quoted value", () => {
      expect(parseJson(`{'a':'say "hi"'}`)).toEqual({ a: 'say "hi"' });
    });

    it("should keep double quotes inside a single-quoted key", () => {
      expect(parseJson(`{'say "hi"':1}`)).toEqual({ 'say "hi"': 1 });
    });

    it("should unescape an escaped single quote in a single-quoted value", () => {
      expect(parseJson(String.raw`{'a':'it\'s'}`)).toEqual({ a: "it's" });
    });

    it("should keep backslash escapes in a single-quoted value", () => {
      expect(parseJson(String.raw`{'a':'C:\\dir\n'}`)).toEqual({ a: "C:\\dir\n" });
    });

    it("should keep an escaped double quote in a double-quoted value", () => {
      expect(parseJson(String.raw`{a:"x\"y"}`)).toEqual({ a: 'x"y' });
    });

    it("should keep a backslash before a double quote in a single-quoted value", () => {
      expect(parseJson(String.raw`{'a':'x\\"y'}`)).toEqual({ a: 'x\\"y' });
    });

    it("should accept mixed quoted and unquoted keys", () => {
      expect(parseJson(`{ "foo": "bar", baz: true, 'qux': null }`)).toEqual({
        foo: "bar",
        baz: true,
        qux: null
      });
    });
  });

  describe("Input it rejects", () => {
    it("should throw for text that is not JSON at all", () => {
      expect(() => parseJson("not json")).toThrow(SyntaxError);
    });

    it("should throw for a trailing comma", () => {
      expect(() => parseJson('{"a":1,}')).toThrow(SyntaxError);
    });
  });
});

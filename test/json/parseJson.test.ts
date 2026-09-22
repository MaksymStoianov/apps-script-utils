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

import { getPath } from "@/lang";
import { describe, expect, it } from "vitest";

describe("getPath", () => {
  describe("Correct input data", () => {
    it("should read a nested value by a dotted path", () => {
      expect(getPath({ a: { b: { c: 1 } } }, "a.b.c")).toBe(1);
    });

    it("should read a nested value by an array path", () => {
      expect(getPath({ a: { b: { c: 1 } } }, ["a", "b", "c"])).toBe(1);
    });

    it("should index arrays with numeric segments", () => {
      expect(getPath({ a: [{ b: 2 }] }, ["a", 0, "b"])).toBe(2);
      expect(getPath([[1, 2]], [0, 1])).toBe(2);
    });

    it("should index arrays from a dotted path too", () => {
      expect(getPath({ a: [{ b: 2 }] }, "a.0.b")).toBe(2);
    });

    it("should return a top-level value for a single segment", () => {
      expect(getPath({ a: 1 }, "a")).toBe(1);
    });

    it("should return the source itself for an empty path", () => {
      const source = { a: 1 };

      expect(getPath(source, [])).toBe(source);
    });

    it("should read falsy values rather than falling back", () => {
      expect(getPath({ a: 0 }, "a", 9)).toBe(0);
      expect(getPath({ a: "" }, "a", "x")).toBe("");
      expect(getPath({ a: false }, "a", true)).toBe(false);
      expect(getPath({ a: null }, "a", "x")).toBeNull();
    });
  });

  describe("Missing paths", () => {
    it("should return undefined when a level is missing", () => {
      expect(getPath({ a: 1 }, "a.b.c")).toBeUndefined();
      expect(getPath({}, "a.b")).toBeUndefined();
    });

    it("should return the fallback when a level is missing", () => {
      expect(getPath({}, "a.b", "missing")).toBe("missing");
      expect(getPath({ a: null }, "a.b", "missing")).toBe("missing");
    });

    it("should stop rather than throw at a primitive level", () => {
      expect(getPath({ a: 1 }, "a.b", "missing")).toBe("missing");
      expect(getPath({ a: "text" }, "a.b.c", "missing")).toBe("missing");
    });

    it("should handle a nil source", () => {
      expect(getPath(null, "a.b", "missing")).toBe("missing");
      expect(getPath(undefined, "a", "missing")).toBe("missing");
    });

    it("should return the fallback for an index beyond an array", () => {
      expect(getPath({ a: [1] }, ["a", 5], "missing")).toBe("missing");
    });
  });
});

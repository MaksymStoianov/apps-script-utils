import { IllegalStateException } from "@/exception";
import { requireState } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireState", () => {
  describe("Correct input data", () => {
    it("should return nothing when the condition is truthy", () => {
      for (const condition of [true, 1, -1, "a", " ", {}, [], () => {}, Symbol("s"), 1n]) {
        expect(requireState(condition)).toBeUndefined();
      }
    });

    it("should narrow the type of the expression it asserts", () => {
      const value: string | null = Math.random() < 2 ? "loaded" : null;

      requireState(value !== null);

      // Compiles only if the assertion narrowed `value` to string.
      expect(value.length).toBe(6);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw IllegalStateException for every falsy condition", () => {
      for (const condition of [false, 0, -0, 0n, "", null, undefined, NaN]) {
        expect(() => requireState(condition)).toThrow(IllegalStateException);
      }
    });

    it("should carry the default message when none is given", () => {
      expect(() => requireState(false)).toThrow("Illegal state");
    });

    it("should carry the message it was given", () => {
      expect(() => requireState(false, "Sheet has not been loaded.")).toThrow(
        "Sheet has not been loaded."
      );
    });

    it("should throw when called without arguments", () => {
      // @ts-expect-error - testing invalid types
      expect(() => requireState()).toThrow(IllegalStateException);
    });
  });
});

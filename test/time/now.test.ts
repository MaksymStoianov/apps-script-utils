import { now } from "@/time";
import { describe, expect, it } from "vitest";

describe("now", () => {
  describe("Return value", () => {
    it("should return a number", () => {
      expect(now()).toBeTypeOf("number");
    });

    it("should return an integer millisecond timestamp", () => {
      expect(Number.isInteger(now())).toBe(true);
    });

    it("should be close to Date.now", () => {
      expect(Math.abs(now() - Date.now())).toBeLessThan(1000);
    });

    it("should be after the epoch by a plausible margin", () => {
      expect(now()).toBeGreaterThan(1_600_000_000_000);
    });
  });

  describe("Monotonicity", () => {
    it("should not go backwards across successive calls", () => {
      const first = now();

      const second = now();

      expect(second).toBeGreaterThanOrEqual(first);
    });
  });
});

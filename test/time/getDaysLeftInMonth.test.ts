import { IllegalArgumentException } from "@/exception";
import { getDaysLeftInMonth } from "@/time";
import { describe, expect, it } from "vitest";

describe("getDaysLeftInMonth", () => {
  describe("Correct input data", () => {
    it("should exclude the given day by default", () => {
      expect(getDaysLeftInMonth(new Date(2024, 0, 30))).toBe(1);
      expect(getDaysLeftInMonth(new Date(2024, 0, 1))).toBe(30);
    });

    it("should include the given day when asked", () => {
      expect(getDaysLeftInMonth(new Date(2024, 0, 30), true)).toBe(2);
      expect(getDaysLeftInMonth(new Date(2024, 0, 1), true)).toBe(31);
    });

    it("should return zero on the last day of the month", () => {
      expect(getDaysLeftInMonth(new Date(2024, 0, 31))).toBe(0);
      expect(getDaysLeftInMonth(new Date(2024, 3, 30))).toBe(0);
    });

    it("should return one on the last day of the month when inclusive", () => {
      expect(getDaysLeftInMonth(new Date(2024, 0, 31), true)).toBe(1);
    });

    it("should follow February of a leap year", () => {
      expect(getDaysLeftInMonth(new Date(2024, 1, 1))).toBe(28);
      expect(getDaysLeftInMonth(new Date(2024, 1, 28))).toBe(1);
      expect(getDaysLeftInMonth(new Date(2024, 1, 29))).toBe(0);
    });

    it("should follow February of a common year", () => {
      expect(getDaysLeftInMonth(new Date(2023, 1, 1))).toBe(27);
      expect(getDaysLeftInMonth(new Date(2023, 1, 28))).toBe(0);
    });

    it("should ignore the time of day", () => {
      expect(getDaysLeftInMonth(new Date(2024, 0, 30, 0, 0, 0))).toBe(1);
      expect(getDaysLeftInMonth(new Date(2024, 0, 30, 23, 59, 59, 999))).toBe(1);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for an invalid Date", () => {
      expect(() => getDaysLeftInMonth(new Date("nonsense"))).toThrow(IllegalArgumentException);
    });

    it("should throw for values that are not Dates", () => {
      expect(() => getDaysLeftInMonth(null as unknown as Date)).toThrow(IllegalArgumentException);
      expect(() => getDaysLeftInMonth(Date.now() as unknown as Date)).toThrow(
        IllegalArgumentException
      );
    });
  });
});

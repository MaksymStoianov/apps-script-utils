import { IllegalArgumentException } from "@/exception";
import { getDaysInMonth } from "@/time";
import { describe, expect, it } from "vitest";

describe("getDaysInMonth", () => {
  describe("Correct input data", () => {
    it("should return the length of every month of a common year", () => {
      const lengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      lengths.forEach((length: number, month: number): void => {
        expect(getDaysInMonth(new Date(2023, month, 15))).toBe(length);
      });
    });

    it("should return 29 days for February of a leap year", () => {
      expect(getDaysInMonth(new Date(2024, 1, 15))).toBe(29);
      expect(getDaysInMonth(new Date(2020, 1, 1))).toBe(29);
    });

    it("should return 28 days for February of a common year", () => {
      expect(getDaysInMonth(new Date(2023, 1, 15))).toBe(28);
      expect(getDaysInMonth(new Date(2100, 1, 15))).toBe(28);
    });

    it("should apply the century rules", () => {
      expect(getDaysInMonth(new Date(2000, 1, 15))).toBe(29);

      const nineteenHundred = new Date(0);

      nineteenHundred.setFullYear(1900, 1, 15);

      expect(getDaysInMonth(nineteenHundred)).toBe(28);
    });

    it("should ignore the time of day and the day of the month", () => {
      expect(getDaysInMonth(new Date(2024, 1, 1, 0, 0, 0))).toBe(29);
      expect(getDaysInMonth(new Date(2024, 1, 29, 23, 59, 59))).toBe(29);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for an invalid Date", () => {
      expect(() => getDaysInMonth(new Date("nonsense"))).toThrow(IllegalArgumentException);
    });

    it("should throw for values that are not Dates", () => {
      expect(() => getDaysInMonth(null as unknown as Date)).toThrow(IllegalArgumentException);
      expect(() => getDaysInMonth(undefined as unknown as Date)).toThrow(IllegalArgumentException);
      expect(() => getDaysInMonth(Date.now() as unknown as Date)).toThrow(IllegalArgumentException);
      expect(() => getDaysInMonth("2024-02-15" as unknown as Date)).toThrow(
        IllegalArgumentException
      );
    });
  });
});

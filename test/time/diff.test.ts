import { IllegalArgumentException } from "@/exception";
import { diff } from "@/time";
import { describe, expect, it } from "vitest";

describe("diff", () => {
  describe("Correct input data", () => {
    it("should default to milliseconds", () => {
      expect(diff(new Date(2024, 0, 1, 0, 0, 1), new Date(2024, 0, 1, 0, 0, 0))).toBe(1000);
    });

    it("should return zero for the same moment", () => {
      const moment = new Date(2024, 0, 15, 10, 30);

      expect(diff(moment, new Date(moment.getTime()), "day")).toBe(0);
      expect(diff(moment, new Date(moment.getTime()), "month")).toBe(0);
    });

    it("should measure the fixed units by division", () => {
      const right = new Date(2024, 0, 1, 0, 0, 0, 0);

      expect(diff(new Date(2024, 0, 1, 0, 0, 0, 250), right, "millisecond")).toBe(250);
      expect(diff(new Date(2024, 0, 1, 0, 1, 30), right, "second")).toBe(90);
      expect(diff(new Date(2024, 0, 1, 2, 30), right, "minute")).toBe(150);
      expect(diff(new Date(2024, 0, 1, 5), right, "hour")).toBe(5);
    });

    it("should truncate towards zero rather than rounding", () => {
      const right = new Date(2024, 0, 1, 0, 0, 0);

      expect(diff(new Date(2024, 0, 1, 0, 0, 59), right, "minute")).toBe(0);
      expect(diff(new Date(2023, 11, 31, 23, 59, 1), right, "minute")).toBe(0);
    });

    it("should keep the fraction when asked", () => {
      const right = new Date(2024, 0, 1, 0, 0, 0);

      expect(diff(new Date(2024, 0, 1, 0, 0, 30), right, "minute", true)).toBe(0.5);
      expect(diff(new Date(2024, 0, 1, 12), right, "day", true)).toBeCloseTo(0.5, 10);
    });

    it("should be negative when the left date is the earlier one", () => {
      expect(diff(new Date(2024, 0, 1), new Date(2024, 0, 2), "day")).toBe(-1);
      expect(diff(new Date(2024, 0, 15), new Date(2024, 2, 15), "month")).toBe(-2);
      expect(diff(new Date(2023, 0, 1), new Date(2024, 0, 1), "year")).toBe(-1);
    });

    it("should count calendar days", () => {
      expect(diff(new Date(2024, 0, 2), new Date(2024, 0, 1), "day")).toBe(1);
      expect(diff(new Date(2024, 1, 1), new Date(2024, 0, 1), "day")).toBe(31);
    });

    it("should count a day across a daylight-saving transition as one day", () => {
      expect(diff(new Date(2024, 2, 31, 12), new Date(2024, 2, 30, 12), "day")).toBe(1);
      expect(diff(new Date(2024, 9, 27, 12), new Date(2024, 9, 26, 12), "day")).toBe(1);
    });

    it("should span a leap year in days", () => {
      expect(diff(new Date(2025, 0, 1), new Date(2024, 0, 1), "day")).toBe(366);
      expect(diff(new Date(2024, 0, 1), new Date(2023, 0, 1), "day")).toBe(365);
    });

    it("should count whole months, not started ones", () => {
      expect(diff(new Date(2024, 2, 15), new Date(2024, 0, 15), "month")).toBe(2);
      expect(diff(new Date(2024, 2, 14), new Date(2024, 0, 15), "month")).toBe(1);
      expect(diff(new Date(2024, 1, 1), new Date(2024, 0, 15), "month")).toBe(0);
    });

    it("should clamp at the end of the month, asymmetrically", () => {
      expect(diff(new Date(2024, 1, 29), new Date(2024, 0, 31), "month")).toBe(1);
      expect(diff(new Date(2024, 0, 31), new Date(2024, 1, 29), "month")).toBe(0);
    });

    it("should count whole years", () => {
      expect(diff(new Date(2025, 0, 1), new Date(2024, 0, 1), "year")).toBe(1);
      expect(diff(new Date(2024, 11, 31), new Date(2024, 0, 1), "year")).toBe(0);
      expect(diff(new Date(2034, 5, 1), new Date(2024, 5, 1), "year")).toBe(10);
    });

    it("should interpolate a fractional month between the month boundaries", () => {
      const result = diff(new Date(2024, 1, 1), new Date(2024, 0, 15), "month", true);

      expect(result).toBeGreaterThan(0.5);
      expect(result).toBeLessThan(0.7);
    });

    it("should interpolate a fractional month in the negative direction", () => {
      const result = diff(new Date(2024, 0, 10), new Date(2024, 2, 15), "month", true);

      expect(result).toBeLessThan(-2);
      expect(result).toBeGreaterThan(-2.5);
    });

    it("should never mutate its arguments", () => {
      const left = new Date(2024, 2, 15);

      const right = new Date(2024, 0, 31);

      const before = [left.getTime(), right.getTime()];

      diff(left, right, "month", true);

      expect([left.getTime(), right.getTime()]).toStrictEqual(before);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for an invalid Date on either side", () => {
      expect(() => diff(new Date("nonsense"), new Date(), "day")).toThrow(IllegalArgumentException);
      expect(() => diff(new Date(), new Date("nonsense"), "day")).toThrow(IllegalArgumentException);
    });

    it("should throw for values that are not Dates", () => {
      expect(() => diff(null as unknown as Date, new Date(), "day")).toThrow(
        IllegalArgumentException
      );
      expect(() => diff(new Date(), Date.now() as unknown as Date, "day")).toThrow(
        IllegalArgumentException
      );
    });

    it("should throw for an unknown unit", () => {
      expect(() => diff(new Date(), new Date(), "fortnight" as never)).toThrow(
        IllegalArgumentException
      );
    });
  });
});

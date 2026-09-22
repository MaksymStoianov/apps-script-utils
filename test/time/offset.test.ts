import { IllegalArgumentException } from "@/exception";
import { offset } from "@/time";
import { describe, expect, it } from "vitest";

describe("offset", () => {
  describe("Correct input data", () => {
    it("should never mutate the input", () => {
      const input = new Date(2024, 0, 15, 10, 30);

      const before = input.getTime();

      const result = offset(input, 1, "day");

      expect(input.getTime()).toBe(before);
      expect(result).not.toBe(input);
    });

    it("should shift by the fixed units", () => {
      const start = new Date(2024, 0, 15, 10, 0, 0, 0);

      expect(offset(start, 500, "millisecond").getMilliseconds()).toBe(500);
      expect(offset(start, 30, "second").getSeconds()).toBe(30);
      expect(offset(start, 90, "minute").getHours()).toBe(11);
      expect(offset(start, 90, "minute").getMinutes()).toBe(30);
      expect(offset(start, 3, "hour").getHours()).toBe(13);
    });

    it("should shift by days across a month boundary", () => {
      expect(offset(new Date(2024, 0, 31), 1, "day").getMonth()).toBe(1);
      expect(offset(new Date(2024, 0, 31), 1, "day").getDate()).toBe(1);
    });

    it("should shift backwards for a negative amount", () => {
      expect(offset(new Date(2024, 0, 15), -1, "day").getDate()).toBe(14);
      expect(offset(new Date(2024, 0, 15), -1, "month").getFullYear()).toBe(2023);
      expect(offset(new Date(2024, 0, 15), -1, "month").getMonth()).toBe(11);
      expect(offset(new Date(2024, 0, 15), -2, "hour").getHours()).toBe(22);
    });

    it("should return an equal date for an amount of zero", () => {
      const start = new Date(2024, 0, 15, 10, 30);

      expect(offset(start, 0, "day").getTime()).toBe(start.getTime());
      expect(offset(start, 0, "month").getTime()).toBe(start.getTime());
    });

    it("should shift by months, keeping the day when it exists", () => {
      const result = offset(new Date(2024, 0, 15), 1, "month");

      expect(result.getMonth()).toBe(1);
      expect(result.getDate()).toBe(15);
    });

    it("should clamp to the end of the month rather than overflowing", () => {
      const leap = offset(new Date(2024, 0, 31), 1, "month");

      expect(leap.getMonth()).toBe(1);
      expect(leap.getDate()).toBe(29);

      const common = offset(new Date(2023, 0, 31), 1, "month");

      expect(common.getMonth()).toBe(1);
      expect(common.getDate()).toBe(28);

      const thirty = offset(new Date(2024, 4, 31), 1, "month");

      expect(thirty.getMonth()).toBe(5);
      expect(thirty.getDate()).toBe(30);
    });

    it("should clamp when shifting backwards too", () => {
      const result = offset(new Date(2024, 2, 31), -1, "month");

      expect(result.getMonth()).toBe(1);
      expect(result.getDate()).toBe(29);
    });

    it("should preserve the time of day when shifting by months", () => {
      const result = offset(new Date(2024, 0, 31, 23, 45, 30), 1, "month");

      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(45);
      expect(result.getSeconds()).toBe(30);
    });

    it("should shift by years, clamping 29 February", () => {
      expect(offset(new Date(2024, 0, 15), 1, "year").getFullYear()).toBe(2025);

      const leapDay = offset(new Date(2024, 1, 29), 1, "year");

      expect(leapDay.getFullYear()).toBe(2025);
      expect(leapDay.getMonth()).toBe(1);
      expect(leapDay.getDate()).toBe(28);
    });

    it("should keep the wall-clock time when shifting by a day across a transition", () => {
      const result = offset(new Date(2024, 2, 30, 12, 0, 0), 1, "day");

      expect(result.getDate()).toBe(31);
      expect(result.getHours()).toBe(12);

      const autumn = offset(new Date(2024, 9, 26, 12, 0, 0), 1, "day");

      expect(autumn.getDate()).toBe(27);
      expect(autumn.getHours()).toBe(12);
    });

    it("should shift absolute time when shifting by hours across a transition", () => {
      const start = new Date(2024, 2, 31, 0, 0, 0);

      expect(offset(start, 3, "hour").getTime() - start.getTime()).toBe(3 * 60 * 60 * 1000);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for an invalid Date", () => {
      expect(() => offset(new Date("nonsense"), 1, "day")).toThrow(IllegalArgumentException);
    });

    it("should throw for values that are not Dates", () => {
      expect(() => offset(null as unknown as Date, 1, "day")).toThrow(IllegalArgumentException);
      expect(() => offset(Date.now() as unknown as Date, 1, "day")).toThrow(
        IllegalArgumentException
      );
    });

    it("should throw when the amount is not an integer", () => {
      expect(() => offset(new Date(2024, 0, 15), 1.5, "day")).toThrow(IllegalArgumentException);
      expect(() => offset(new Date(2024, 0, 15), NaN, "day")).toThrow(IllegalArgumentException);
    });

    it("should throw for an unknown unit", () => {
      expect(() => offset(new Date(2024, 0, 15), 1, "fortnight" as never)).toThrow(
        IllegalArgumentException
      );
    });
  });
});

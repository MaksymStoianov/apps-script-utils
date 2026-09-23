import { IllegalArgumentException } from "../exception";
import { getDaysInMonth } from "./getDaysInMonth";
import type { TimeUnit } from "./types";

const SECOND: number = 1000;

const MINUTE: number = 60 * SECOND;

const HOUR: number = 60 * MINUTE;

/**
 * Returns the length of a fixed-length unit in milliseconds, or `undefined`
 * for the calendar units, which have no fixed length.
 *
 * @param   {TimeUnit} unit - The unit to measure.
 * @returns {number | undefined} The length in milliseconds, if the unit has one.
 */
function lengthOf(unit: TimeUnit): number | undefined {
  switch (unit) {
    case "millisecond":
      return 1;

    case "second":
      return SECOND;

    case "minute":
      return MINUTE;

    case "hour":
      return HOUR;

    default:
      return undefined;
  }
}

/**
 * Shifts a date by an interval and returns a **new** `Date`.
 *
 * The input is never mutated, which is the whole point of the function:
 * `date.setDate(date.getDate() + n)` changes the date in place, and a date
 * passed into a function coming back changed is the classic bug this avoids.
 *
 * `millisecond`, `second`, `minute` and `hour` shift absolute time.
 * `day`, `month` and `year` are calendar operations: shifting by a day keeps
 * the wall-clock time across a daylight-saving transition, even though the day
 * was 23 or 25 hours long.
 *
 * Month and year arithmetic **clamps** to the end of the target month rather
 * than overflowing into the next one: 31 January plus one month is 28
 * February — 29 in a leap year — not 3 March, which is what `Date` does when
 * left to itself.
 *
 * @example
 * ```javascript
 * offset(new Date(2024, 0, 15), 1, "day");     // => 16 January 2024
 * offset(new Date(2024, 0, 15), -1, "month");  // => 15 December 2023
 * offset(new Date(2024, 0, 31), 1, "month");   // => 29 February 2024 (clamped)
 * offset(new Date(2023, 0, 31), 1, "month");   // => 28 February 2023 (clamped)
 * offset(new Date(2024, 0, 15), 90, "minute"); // => 15 January 2024, 90 minutes later
 * ```
 *
 * @param   {Date} date - The date to shift. Left untouched.
 * @param   {number} amount - How far to shift, negative to go back.
 * @param   {TimeUnit} unit - The unit `amount` is expressed in.
 * @returns {Date} A new `Date` shifted by the interval.
 * @throws  {@link IllegalArgumentException} If the value is not a valid `Date`.
 * @throws  {@link IllegalArgumentException} If `amount` is not an integer.
 * @throws  {@link IllegalArgumentException} If `unit` is not a known time unit.
 * @see     {@link getDaysInMonth}
 * @see     [offset on the documentation site](https://maksymstoianov.github.io/apps-script-utils/offset.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function offset(date: Date, amount: number, unit: TimeUnit): Date {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new IllegalArgumentException("Expected a valid Date.");
  }

  if (!Number.isInteger(amount)) {
    throw new IllegalArgumentException("Expected 'amount' to be an integer.");
  }

  const result: Date = new Date(date.getTime());

  const milliseconds: number | undefined = lengthOf(unit);

  if (milliseconds !== undefined) {
    result.setTime(result.getTime() + amount * milliseconds);

    return result;
  }

  if (unit === "day") {
    result.setDate(result.getDate() + amount);

    return result;
  }

  if (unit !== "month" && unit !== "year") {
    const name: string = String(unit);

    throw new IllegalArgumentException(`Unknown time unit: ${name}.`);
  }

  const months: number = unit === "year" ? amount * 12 : amount;

  const day: number = result.getDate();

  // Move off the day of the month first: on the 31st, setMonth would overflow
  // into the month after the one asked for before the day is clamped.
  result.setDate(1);
  result.setMonth(result.getMonth() + months);
  result.setDate(Math.min(day, getDaysInMonth(result)));

  return result;
}

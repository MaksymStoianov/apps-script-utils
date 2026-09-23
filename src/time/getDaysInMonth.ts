import { IllegalArgumentException } from "../exception";

/**
 * Returns the number of calendar days in the month the given date falls in.
 *
 * The argument is a single `Date` rather than a month and a year, because the
 * two-number form invites the 0-based versus 1-based month mistake that this
 * function exists to avoid making.
 *
 * Leap years are handled by the calendar itself, century rules included:
 * February 2000 has 29 days and February 1900 has 28.
 *
 * @example
 * ```javascript
 * getDaysInMonth(new Date(2024, 0, 15));  // => 31 (January)
 * getDaysInMonth(new Date(2024, 1, 15));  // => 29 (February, a leap year)
 * getDaysInMonth(new Date(2023, 1, 15));  // => 28 (February)
 * getDaysInMonth(new Date(2024, 3, 15));  // => 30 (April)
 * ```
 *
 * @param   {Date} date - Any date within the month to measure.
 * @returns {number} The number of days in that month, between 28 and 31.
 * @throws  {@link IllegalArgumentException} If the value is not a valid `Date`.
 * @see     {@link getDaysLeftInMonth}
 * @see     [getDaysInMonth on the documentation site](https://maksymstoianov.github.io/apps-script-utils/getdaysinmonth.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function getDaysInMonth(date: Date): number {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new IllegalArgumentException("Expected a valid Date.");
  }

  // Day 0 of the following month is the last day of this one. setFullYear is
  // used rather than the Date constructor, which maps a year of 0 to 99 into
  // the twentieth century.
  const lastDay: Date = new Date(0);

  lastDay.setFullYear(date.getFullYear(), date.getMonth() + 1, 0);

  return lastDay.getDate();
}

import { IllegalArgumentException } from "../exception";
import { offset } from "./offset";
import type { TimeUnit } from "./types";

const SECOND: number = 1000;

const MINUTE: number = 60 * SECOND;

const HOUR: number = 60 * MINUTE;

const DAY: number = 24 * HOUR;

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
 * Counts the whole calendar units from `right` to `left`, truncated towards
 * zero.
 *
 * The first estimate is arithmetic and is wrong by at most one — a day that a
 * daylight-saving transition made 23 hours long, or a month whose day of the
 * month has not come round yet — so a single correction in each direction
 * settles it.
 *
 * @param   {Date} left - The later date, when the result is positive.
 * @param   {Date} right - The date to count from.
 * @param   {TimeUnit} unit - One of `day`, `month` or `year`.
 * @returns {number} The number of whole units between them.
 */
function wholeUnits(left: Date, right: Date, unit: TimeUnit): number {
  const target: number = left.getTime();

  const forwards: boolean = target >= right.getTime();

  let units: number;

  if (unit === "day") {
    units = Math.trunc((target - right.getTime()) / DAY);
  } else if (unit === "month") {
    units = (left.getFullYear() - right.getFullYear()) * 12 + (left.getMonth() - right.getMonth());
  } else {
    units = left.getFullYear() - right.getFullYear();
  }

  if (forwards) {
    if (offset(right, units, unit).getTime() > target) {
      units -= 1;
    }

    if (offset(right, units + 1, unit).getTime() <= target) {
      units += 1;
    }

    return units;
  }

  if (offset(right, units, unit).getTime() < target) {
    units += 1;
  }

  if (offset(right, units - 1, unit).getTime() >= target) {
    units -= 1;
  }

  return units;
}

/**
 * Returns the interval from `right` to `left`, expressed in the given unit.
 *
 * The result is positive when `left` is the later of the two, so
 * `diff(end, start)` reads the way it is spoken. It counts **whole** units and
 * truncates towards zero unless `float` asks for the fraction as well.
 *
 * `millisecond`, `second`, `minute` and `hour` are fixed lengths and are plain
 * division. `day`, `month` and `year` are calendar units and are counted by
 * the calendar, not by arithmetic: a day that a daylight-saving transition
 * made 23 or 25 hours long still counts as one day, which `ms / 86400000`
 * gets wrong.
 *
 * **The end-of-month case.** Counting stops at the day of the month, and when
 * that day does not exist in the target month it clamps to the last one. So
 * 31 January to 29 February is one whole month, while 29 February back to
 * 31 January is zero — the distance is not symmetric, because the calendar
 * is not.
 *
 * @example
 * ```javascript
 * diff(new Date(2024, 0, 2), new Date(2024, 0, 1), "day");           // => 1
 * diff(new Date(2024, 0, 1), new Date(2024, 0, 2), "day");           // => -1
 * diff(new Date(2025, 0, 1), new Date(2024, 0, 1), "day");           // => 366 (a leap year)
 * diff(new Date(2024, 2, 15), new Date(2024, 0, 15), "month");       // => 2
 * diff(new Date(2024, 1, 1), new Date(2024, 0, 15), "month");        // => 0
 * diff(new Date(2024, 1, 1), new Date(2024, 0, 15), "month", true);  // => 0.548...
 * ```
 *
 * @param   {Date} left - The date to measure to.
 * @param   {Date} right - The date to measure from.
 * @param   {TimeUnit} [unit="millisecond"] - The unit to express the interval in.
 * @param   {boolean} [float=false] - Whether to keep the fractional part instead of truncating it.
 * @returns {number} The interval from `right` to `left`, negative when `left` is the earlier date.
 * @throws  {@link IllegalArgumentException} If either value is not a valid `Date`.
 * @throws  {@link IllegalArgumentException} If `unit` is not a known time unit.
 * @see     {@link offset}
 * @since   1.11.0
 * @version 1.0.0
 */
export function diff(
  left: Date,
  right: Date,
  unit: TimeUnit = "millisecond",
  float: boolean = false
): number {
  if (!(left instanceof Date) || Number.isNaN(left.getTime())) {
    throw new IllegalArgumentException("Expected 'left' to be a valid Date.");
  }

  if (!(right instanceof Date) || Number.isNaN(right.getTime())) {
    throw new IllegalArgumentException("Expected 'right' to be a valid Date.");
  }

  const elapsed: number = left.getTime() - right.getTime();

  const milliseconds: number | undefined = lengthOf(unit);

  if (milliseconds !== undefined) {
    const exact: number = elapsed / milliseconds;

    if (float) {
      return exact;
    }

    const whole: number = Math.trunc(exact);

    // Math.trunc(-0.5) is -0, which is not what a zero interval should read as.
    return whole === 0 ? 0 : whole;
  }

  const isCalendarUnit: boolean = unit === "day" || unit === "month" || unit === "year";

  if (!isCalendarUnit) {
    const name: string = String(unit);

    throw new IllegalArgumentException(`Unknown time unit: ${name}.`);
  }

  if (elapsed === 0) {
    return 0;
  }

  const units: number = wholeUnits(left, right, unit);

  if (!float) {
    return units;
  }

  const step: number = elapsed > 0 ? 1 : -1;

  const anchor: number = offset(right, units, unit).getTime();

  const next: number = offset(right, units + step, unit).getTime();

  if (next === anchor) {
    return units;
  }

  return units + step * ((left.getTime() - anchor) / (next - anchor));
}

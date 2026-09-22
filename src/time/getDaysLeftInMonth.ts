import { IllegalArgumentException } from "../exception";
import { getDaysInMonth } from "./getDaysInMonth";

/**
 * Returns the number of calendar days between the given date and the end of
 * its month.
 *
 * Whether the given day itself counts is the whole question here, and both
 * answers are defensible, so it is a parameter rather than an assumption. By
 * default it does not: on the 30th of a 31-day month the answer is `1`, the
 * 31st being the only day still to come. Pass `inclusive` to count the given
 * day as well and get `2`.
 *
 * The time of day is ignored, so two moments on the same calendar day always
 * give the same answer.
 *
 * @example
 * ```javascript
 * getDaysLeftInMonth(new Date(2024, 0, 30));        // => 1
 * getDaysLeftInMonth(new Date(2024, 0, 30), true);  // => 2
 * getDaysLeftInMonth(new Date(2024, 0, 31));        // => 0
 * getDaysLeftInMonth(new Date(2024, 1, 1));         // => 28 (a leap February)
 * ```
 *
 * @param   {Date} date - The date to measure from.
 * @param   {boolean} [inclusive=false] - Whether the given day counts towards the total.
 * @returns {number} The number of days remaining in the month.
 * @throws  {@link IllegalArgumentException} If the value is not a valid `Date`.
 * @see     {@link getDaysInMonth}
 * @since   1.11.0
 * @version 1.0.0
 */
export function getDaysLeftInMonth(date: Date, inclusive: boolean = false): number {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new IllegalArgumentException("Expected a valid Date.");
  }

  const remaining: number = getDaysInMonth(date) - date.getDate();

  return inclusive ? remaining + 1 : remaining;
}

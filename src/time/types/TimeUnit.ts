/**
 * A unit of time an interval can be expressed in.
 *
 * The first four are fixed multiples of a millisecond. The last three are
 * calendar units and have no fixed length: a day is 23 or 25 hours across a
 * daylight-saving transition, and a month is anything from 28 to 31 days.
 * Functions taking a `TimeUnit` document which of the two they apply.
 *
 * @example
 * ```javascript
 * diff(a, b, "day");
 * offset(date, 1, "month");
 * ```
 *
 * @since   1.11.0
 * @version 1.0.0
 */
export type TimeUnit = "millisecond" | "second" | "minute" | "hour" | "day" | "month" | "year";

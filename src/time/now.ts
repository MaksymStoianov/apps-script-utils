/**
 * Returns the number of milliseconds elapsed since the epoch (January 1, 1970, UTC).
 *
 * @example
 * ```javascript
 * const started = now();
 *
 * // … work …
 *
 * const elapsed = now() - started; // milliseconds
 * ```
 *
 * @returns {number} The current timestamp in milliseconds.
 * @since   1.5.0
 * @version 1.0.0
 */
export function now(): number {
  return Date.now();
}

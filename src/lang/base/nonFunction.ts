/**
 * Checks if the provided value is NOT `function`.
 *
 * @template T
 * @param   {T} value - The value to check.
 * @returns {boolean} `true` if the value is not `function`; otherwise, `false`.
 * @see     {@link isFunction}
 * @since   1.4.0
 * @version 1.0.0
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function nonFunction<T>(value: T): value is Exclude<T, Function> {
  return typeof value !== "function";
}

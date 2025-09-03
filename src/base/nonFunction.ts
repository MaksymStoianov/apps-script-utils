/**
 * ## nonFunction
 *
 * Checks if the provided value is NOT `function`.
 *
 * @param   value - The value to check.
 * @returns `true` if the value is not `function`; otherwise, `false`.
 * @see     isFunction
 * @since   1.4.0
 * @version 1.0.0
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function nonFunction<T>(value: T): value is Exclude<T, Function> {
  return typeof value !== "function";
}

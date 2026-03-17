import { isSymbol } from "./isSymbol";

/**
 * Checks if the provided value is NOT `Symbol`.
 *
 * @param   value - The value to check.
 * @returns `true` if the value is not `Symbol`; otherwise, `false`.
 * @see     {@link isSymbol}
 * @since   1.4.0
 * @version 1.0.0
 */
export function nonSymbol<T>(value: T | symbol): value is T {
  return !isSymbol(value);
}

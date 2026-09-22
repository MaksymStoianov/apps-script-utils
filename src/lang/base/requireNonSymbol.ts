import { IllegalArgumentException } from "../../exception";
import { isSymbol } from "./isSymbol";

/**
 * Ensures that the provided value is NOT a `Symbol`, throwing an exception otherwise.
 *
 * Useful where a value will be serialised or written out: symbols survive
 * neither `JSON.stringify` nor a spreadsheet cell, and fail silently rather
 * than loudly.
 *
 * @example
 * ```javascript
 * requireNonSymbol("id");           // => "id"
 * requireNonSymbol(Symbol("id"));   // Throws IllegalArgumentException
 * ```
 *
 * @template T - The type of the value once the symbol case is excluded.
 * @param    {T | symbol} value - The value to validate as a non-symbol.
 * @param    {string} [message="Expected a non-symbol value."] - Optional custom error message if the validation fails.
 * @returns  {T} The validated value.
 * @throws   {@link IllegalArgumentException} If the value is a `Symbol`.
 * @see      {@link isSymbol}
 * @see      {@link nonSymbol}
 * @see      {@link requireSymbol}
 * @since    1.11.0
 * @version  1.0.0
 */
export function requireNonSymbol<T>(
  value: T | symbol,
  message: string = "Expected a non-symbol value."
): T {
  if (isSymbol(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}

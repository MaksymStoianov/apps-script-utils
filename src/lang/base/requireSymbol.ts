import { IllegalArgumentException } from "../../exception";
import { isSymbol } from "./isSymbol";

/**
 * Ensures that the provided value is a `Symbol`, throwing an exception otherwise.
 *
 * @example
 * ```javascript
 * requireSymbol(Symbol("id"));   // => the same symbol
 * requireSymbol(Symbol.iterator); // => Symbol.iterator
 * requireSymbol("id");           // Throws IllegalArgumentException
 * ```
 *
 * @param   {unknown} value - The value to validate as a `Symbol`.
 * @param   {string} [message="Expected a symbol."] - Optional custom error message if the validation fails.
 * @returns {symbol} The validated symbol.
 * @throws  {@link IllegalArgumentException} If the value is not a `Symbol`.
 * @see     {@link isSymbol}
 * @see     {@link nonSymbol}
 * @see     [requireSymbol on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireSymbol.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function requireSymbol(value: unknown, message: string = "Expected a symbol."): symbol {
  if (!isSymbol(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}

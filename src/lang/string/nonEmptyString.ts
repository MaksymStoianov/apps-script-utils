import { InvalidStringException } from "../../exception";
import { isString } from "../base/isString";

/**
 * Validates that the given value is a non-empty string.
 *
 * Despite the `non` prefix, this function does not behave like the other
 * `nonX` guards: those return a `boolean`, whereas this one validates and
 * returns the value, throwing on failure. It is therefore a `requireX`
 * function under a misleading name.
 *
 * @example
 * ```javascript
 * nonEmptyString("Data", "sheetName"); // => "Data"
 * ```
 *
 * @deprecated Use {@link requireNonEmptyString} instead. It expresses the same
 * intent under the naming convention used across the library. This function is
 * kept as-is for backwards compatibility and will be removed in a future major
 * release.
 * @param   {unknown} value The value to check.
 * @param   {string} [name="value"] The name of the value for the error message.
 * @returns {string} The non-empty string.
 * @throws  {InvalidStringException} If the value is not a string or is empty.
 * @see     {@link requireNonEmptyString}
 * @see     [nonEmptyString on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonEmptyString.html)
 * @since   1.5.0
 * @version 1.1.0
 */
export function nonEmptyString(value: unknown, name: string = "value"): string {
  if (!isString(value) || value.trim().length === 0) {
    throw new InvalidStringException(`${name} must be a non-empty string.`);
  }

  return value;
}

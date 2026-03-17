import { requireString } from "../../lang";

/**
 * Returns the length of a string in `UTF-8` encoding, measured in bytes.
 *
 * @param       {string} value - The string whose length will be calculated in bytes.
 * @returns     {number} The length of the input string in bytes.
 * @since       1.0.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function getByteSize(value: string): number {
  return (
    requireString(value)
      // 0
      // .replace(/[\u{0000}-\u{007F}]/u, '0')

      // 00
      // .replace(/[\u{0080}-\u{07FF}]/u, '0')

      // 000
      // .replace(/[\u{0800}-\u{D7FF}\u{E000}-\u{FFFF}]/u, '0')

      // 0000
      .replace(/[\u{D800}-\u{DFFF}]/u, "00").length
  );
}

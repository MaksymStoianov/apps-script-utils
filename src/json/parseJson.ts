import { requireNonEmptyString } from "../lang";

/**
 * Parses a JSON string, including handling and attempting to fix common formatting errors
 * that might cause standard JSON.parse to fail (e.g., unquoted keys, single quotes).
 *
 * This function first attempts standard JSON.parse. If that fails, it applies common
 * "corrections" like converting single quotes to double quotes and quoting unquoted keys,
 * then tries parsing again.
 *
 * @example
 * ```javascript
 * const jsonString1 = `{key: 'value', "list": [1, 2, 3]}`;
 * const result1 = parseJson(jsonString1);
 * console.log(result1); // { key: 'value', list: [ 1, 2, 3 ] }
 *
 * const jsonString2 = `{ "foo": "bar", baz: true, 'qux': null }`;
 * const result2 = parseJson(jsonString2);
 * console.log(result2); // { foo: 'bar', baz: true, qux: null }
 *
 * const jsonString3 = `not valid json`;
 * const result3 = parseJson(jsonString3);
 * console.log(result3); // null
 * ```
 *
 * @param   value - The string containing the JSON to parse.
 * @returns The parsed object if successful, or `null` if the JSON could not be parsed even after attempted corrections.
 * @throws  {@link EmptyStringException}
 * @see     {@link stringifyJson}
 * @since   1.0.0
 * @version 1.0.0
 * @deprecated This function is deprecated and will be removed in future versions.
 */
export function parseJson(value: string): object {
  const result = requireNonEmptyString(value);

  try {
    return JSON.parse(result);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err: unknown) {
    /**
     * Checks if a token is a valid key format (either quoted or unquoted alphanumeric).
     * @param token The token string to check.
     * @returns `true` if the token is a valid key format; otherwise, `false`.
     */
    const isValidKey = (token: string): boolean =>
      /^"[^"]*"$/.test(token) || /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(token);

    /**
     * Checks if a token is a valid value format (boolean, null, number, or quoted string).
     * @param token The token string to check.
     * @returns `true` if the token is a valid value format; otherwise, `false`.
     */
    const isValidValue = (token: string): boolean =>
      token === "true" ||
      token === "false" ||
      token === "null" ||
      /^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(token) ||
      /^"[^"]*"$/.test(token) ||
      /^'[^']*'$/.test(token);

    const tokens = [];

    let currentToken = "";

    let isString = false;

    let isEscaped = false;

    let quoteType = null;

    for (let i = 0; i < result.length; i++) {
      const char = result[i];

      if (isEscaped) {
        currentToken += char;
        isEscaped = false;

        continue;
      }

      if (char === "\\") {
        currentToken += char;
        isEscaped = true;

        continue;
      }

      if (char === '"' || char === "'") {
        if (isString) {
          if (char === quoteType) {
            isString = false;
            currentToken += '"';
            tokens.push(currentToken);
            currentToken = "";
          } else {
            currentToken += char;
          }
        } else {
          isString = true;
          quoteType = char;
          currentToken += '"';
        }
      } else if (isString) {
        currentToken += char;
      } else if (char.match(/\s/)) {
        if (currentToken) {
          tokens.push(currentToken);
          currentToken = "";
        }
      } else if ([":", ",", "{", "}", "[", "]"].includes(char)) {
        if (currentToken) {
          tokens.push(currentToken);
          currentToken = "";
        }

        tokens.push(char);
      } else {
        currentToken += char;
      }
    }

    if (currentToken) {
      tokens.push(currentToken);
    }

    const correctedTokens = [];

    let expectingValue = false;

    let expectingKey = false;

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      if (token === "{" || token === "[") {
        correctedTokens.push(token);
        expectingKey = token === "{";
        expectingValue = token === "[";
      } else if (token === "}" || token === "]") {
        correctedTokens.push(token);
        expectingValue = false;
        expectingKey = false;
      } else if (token === ":") {
        correctedTokens.push(token);
        expectingValue = true;
        expectingKey = false;
      } else if (token === ",") {
        correctedTokens.push(token);
        expectingKey = correctedTokens[correctedTokens.length - 2] === "}";
        expectingValue = !expectingKey;
      } else if (expectingKey && isValidKey(token)) {
        correctedTokens.push(`"${token.replace(/"/g, "")}"`);
        expectingKey = false;
      } else if (expectingValue && isValidValue(token)) {
        correctedTokens.push(
          token.match(/^'[^']*'$/)
            ? `"${token.slice(1, -1).replace(/"/g, '\\"')}"`
            : token
        );
        expectingValue = false;
      } else if (isValidKey(token)) {
        correctedTokens.push(`"${token.replace(/"/g, "")}"`);
      } else if (isValidValue(token)) {
        correctedTokens.push(
          token.match(/^'[^']*'$/)
            ? `"${token.slice(1, -1).replace(/"/g, '\\"')}"`
            : token
        );
      } else {
        throw new Error(`Invalid token: ${token}`);
      }
    }

    const correctedJson = correctedTokens.join("");

    return JSON.parse(correctedJson);
  }
}

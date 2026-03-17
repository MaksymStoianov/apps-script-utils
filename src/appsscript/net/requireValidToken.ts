import { AuthenticationException } from "../../exception";
import { isString } from "../../lang";

/**
 * Ensures that a valid token is provided and matches the allowed keys.
 *
 * @param {unknown} token The token to check (may include "Bearer " prefix).
 * @param {string | string[] | Record<string, unknown>} allowedKeys A single key, an array of keys, or a record containing keys.
 * @param {string} [message="Invalid API key."] The error message to throw if the token is invalid.
 * @returns {string} The original token if validation succeeds.
 * @throws {AuthenticationException} If the token is missing or does not match any allowed keys.
 * @since 1.5.0
 */
export function requireValidToken(
  token: unknown,
  allowedKeys: string | string[] | Record<string, unknown>,
  message: string = "Invalid API key."
): string {
  if (!isString(token)) {
    throw new AuthenticationException("No token provided.");
  }

  const cleanToken = token.startsWith("Bearer ") ? token.replace("Bearer ", "") : token;

  const keysToCompare: string[] = Array.isArray(allowedKeys)
    ? (allowedKeys as string[])
    : typeof allowedKeys === "object" && allowedKeys !== null
      ? (Object.values(allowedKeys).filter(isString) as string[])
      : [allowedKeys as string];

  const isValid = keysToCompare.includes(cleanToken);

  if (!isValid) {
    throw new AuthenticationException(message);
  }

  return token as string;
}

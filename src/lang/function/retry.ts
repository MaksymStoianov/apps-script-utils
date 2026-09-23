import { IllegalArgumentException } from "../../exception";
import { isFunction } from "../base";

/**
 * Options for {@link retry}.
 *
 * @example
 * ```javascript
 * const options = {
 *   attempts: 4,
 *   delay: 500,
 *   multiplier: 2,
 *   maxDelay: 10000
 * };
 * ```
 *
 * @property {number} [attempts=3] - Total number of attempts, including the first.
 * @see [RetryOptions on the documentation site](https://maksymstoianov.github.io/apps-script-utils/RetryOptions.html)
 */
export interface RetryOptions {
  attempts?: number;

  /**
   * Wait before the second attempt, in milliseconds. Default `100`.
   */
  delay?: number;

  /**
   * Each later wait is the previous one multiplied by this. Default `2`.
   */
  multiplier?: number;

  /**
   * Upper bound on any single wait, in milliseconds. Default `30000`.
   */
  maxDelay?: number;

  /**
   * Decides whether a failed attempt is worth repeating. Receives the error and the attempt number
   * that failed, starting at `1`. Default: always retry.
   */
  shouldRetry?: (error: unknown, attempt: number) => boolean;

  /**
   * Performs the wait. Default: `Utilities.sleep` where it exists, otherwise no wait at all.
   * Injectable so that tests never have to.
   */
  sleep?: (milliseconds: number) => void;
}

const DEFAULT_ATTEMPTS = 3;

const DEFAULT_DELAY = 100;

const DEFAULT_MULTIPLIER = 2;

const DEFAULT_MAX_DELAY = 30000;

/**
 * Sleeps through the runtime's own facility when there is one; a browser has no synchronous wait.
 */
function defaultSleep(milliseconds: number): void {
  if (typeof Utilities !== "undefined" && isFunction(Utilities.sleep)) {
    Utilities.sleep(milliseconds);
  }
}

function requireCount(value: number, name: string): void {
  if (!Number.isInteger(value) || value < 1) {
    throw new IllegalArgumentException(`${name} must be a positive integer.`);
  }
}

function requireNonNegative(value: number, name: string): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new IllegalArgumentException(`${name} must be a non-negative number.`);
  }
}

/**
 * Calls a function until it succeeds, waiting longer between each failure.
 *
 * Sheets, Drive and the Admin SDK all fail transiently — quota exceeded, service unavailable, too many
 * requests — and the remedy is nearly always to wait and try again. This does that with exponential
 * back-off: the first wait is `delay`, each later wait is the previous one times `multiplier`, and no
 * wait exceeds `maxDelay`. When the attempts run out, the last error is rethrown unchanged.
 *
 * Synchronous, because the runtime is.
 *
 * @example
 * ```javascript
 * const values = retry(() => sheet.getRange("A1:C10").getValues());
 *
 * const user = retry(() => AdminDirectory.Users.get(email), {
 *   attempts: 5,
 *   shouldRetry: (error) => String(error).includes("Quota")
 * });
 * ```
 *
 * @template    T - The type the function returns.
 * @param       {(attempt: number) => T} fn - The function to call; receives the attempt number, starting at `1`.
 * @param       {RetryOptions} [options] - Attempts, waits and the retry decision.
 * @returns     {T} Whatever the first successful attempt returned.
 * @throws      {IllegalArgumentException} If `fn` is not a function or an option is out of range.
 * @throws      {unknown} The last error, once the attempts are exhausted or `shouldRetry` declines.
 * @see         {@link RetryOptions}
 * @see         [retry on the documentation site](https://maksymstoianov.github.io/apps-script-utils/retry.html)
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 * @author      Maksym Stoianov <stoianov.maksym@gmail.com>
 * @license     Apache-2.0
 */
export function retry<T>(fn: (attempt: number) => T, options: RetryOptions = {}): T {
  if (!isFunction(fn)) {
    throw new IllegalArgumentException("Expected a function to retry.");
  }

  const {
    attempts = DEFAULT_ATTEMPTS,
    delay = DEFAULT_DELAY,
    multiplier = DEFAULT_MULTIPLIER,
    maxDelay = DEFAULT_MAX_DELAY,
    shouldRetry = (): boolean => true,
    sleep = defaultSleep
  } = options;

  requireCount(attempts, "attempts");
  requireNonNegative(delay, "delay");
  requireNonNegative(maxDelay, "maxDelay");

  if (!Number.isFinite(multiplier) || multiplier < 1) {
    throw new IllegalArgumentException("multiplier must be a number of at least 1.");
  }

  let wait = Math.min(delay, maxDelay);

  for (let attempt = 1; ; attempt++) {
    try {
      return fn(attempt);
    } catch (error) {
      if (attempt >= attempts || !shouldRetry(error, attempt)) {
        throw error;
      }

      sleep(wait);

      wait = Math.min(wait * multiplier, maxDelay);
    }
  }
}

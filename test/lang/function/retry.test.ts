import { IllegalArgumentException } from "@/exception";
import { retry } from "@/lang";
import { afterEach, describe, expect, it, vi } from "vitest";

type Mutable = Record<string, unknown>;

/**
 * A function that fails a given number of times before succeeding, and a sleep that only records.
 */
function flaky(
  failures: number,
  result = "ok"
): {
  fn: (attempt: number) => string;
  calls: number[];
  errors: Error[];
  sleeps: number[];
  sleep: (ms: number) => void;
} {
  const calls: number[] = [];

  const errors: Error[] = [];

  const sleeps: number[] = [];

  return {
    calls,
    errors,
    sleeps,
    sleep: (ms) => {
      sleeps.push(ms);
    },
    fn: (attempt) => {
      calls.push(attempt);

      if (calls.length <= failures) {
        const error = new Error(`failure ${calls.length}`);

        errors.push(error);

        throw error;
      }

      return result;
    }
  };
}

describe("retry", () => {
  afterEach(() => {
    delete (globalThis as Mutable).Utilities;
  });

  describe("Correct input data", () => {
    it("should return the result of a first attempt that succeeds, without waiting", () => {
      const f = flaky(0);

      expect(retry(f.fn, { sleep: f.sleep })).toBe("ok");
      expect(f.calls).toStrictEqual([1]);
      expect(f.sleeps).toStrictEqual([]);
    });

    it("should pass the attempt number, starting at one", () => {
      const f = flaky(2);

      retry(f.fn, { sleep: f.sleep });

      expect(f.calls).toStrictEqual([1, 2, 3]);
    });

    it("should retry with the default back-off until an attempt succeeds", () => {
      const f = flaky(2);

      expect(retry(f.fn, { sleep: f.sleep })).toBe("ok");
      expect(f.sleeps).toStrictEqual([100, 200]);
    });

    it("should multiply the wait and cap it at maxDelay", () => {
      const f = flaky(4);

      retry(f.fn, { attempts: 5, delay: 100, multiplier: 3, maxDelay: 500, sleep: f.sleep });

      expect(f.sleeps).toStrictEqual([100, 300, 500, 500]);
    });

    it("should cap the very first wait at maxDelay too", () => {
      const f = flaky(1);

      retry(f.fn, { delay: 1000, maxDelay: 50, sleep: f.sleep });

      expect(f.sleeps).toStrictEqual([50]);
    });

    it("should keep the wait constant when the multiplier is one", () => {
      const f = flaky(3);

      retry(f.fn, { attempts: 4, delay: 250, multiplier: 1, sleep: f.sleep });

      expect(f.sleeps).toStrictEqual([250, 250, 250]);
    });

    it("should allow a zero delay", () => {
      const f = flaky(2);

      retry(f.fn, { delay: 0, sleep: f.sleep });

      expect(f.sleeps).toStrictEqual([0, 0]);
    });

    it("should give shouldRetry the error and the attempt that failed", () => {
      const f = flaky(2);

      const seen: [unknown, number][] = [];

      retry(f.fn, {
        sleep: f.sleep,
        shouldRetry: (error, attempt) => {
          seen.push([error, attempt]);

          return true;
        }
      });

      expect(seen).toStrictEqual([
        [f.errors[0], 1],
        [f.errors[1], 2]
      ]);
    });

    it("should use Utilities.sleep when the runtime provides it", () => {
      const sleep = vi.fn();

      (globalThis as Mutable).Utilities = { sleep };

      const f = flaky(1);

      retry(f.fn);

      expect(sleep).toHaveBeenCalledWith(100);
    });

    it("should not wait at all when the runtime has no sleep", () => {
      const f = flaky(1);

      expect(retry(f.fn)).toBe("ok");
      expect(f.calls).toStrictEqual([1, 2]);
    });
  });

  describe("Incorrect input data", () => {
    it("should rethrow the last error once the attempts are exhausted", () => {
      const f = flaky(10);

      expect(() => retry(f.fn, { sleep: f.sleep })).toThrow(f.errors[2]);
      expect(f.calls).toStrictEqual([1, 2, 3]);
      expect(f.sleeps).toStrictEqual([100, 200]);
    });

    it("should rethrow at once when shouldRetry declines, without waiting", () => {
      const f = flaky(10);

      expect(() => retry(f.fn, { sleep: f.sleep, shouldRetry: () => false })).toThrow(f.errors[0]);
      expect(f.calls).toStrictEqual([1]);
      expect(f.sleeps).toStrictEqual([]);
    });

    it("should honour a single attempt", () => {
      const f = flaky(10);

      expect(() => retry(f.fn, { attempts: 1, sleep: f.sleep })).toThrow(f.errors[0]);
      expect(f.calls).toStrictEqual([1]);
    });

    it("should reject a value that is not a function", () => {
      for (const value of [null, undefined, 0, "fn", {}, []]) {
        // @ts-expect-error - testing invalid types
        expect(() => retry(value)).toThrow(IllegalArgumentException);
      }

      // @ts-expect-error - testing invalid types
      expect(() => retry()).toThrow(IllegalArgumentException);
    });

    it("should reject attempts that are not a positive integer", () => {
      for (const attempts of [0, -1, 1.5, NaN, Infinity]) {
        expect(() => retry(() => 1, { attempts })).toThrow(IllegalArgumentException);
      }
    });

    it("should reject a negative or non-finite delay or maxDelay", () => {
      for (const value of [-1, NaN, Infinity]) {
        expect(() => retry(() => 1, { delay: value })).toThrow(IllegalArgumentException);
        expect(() => retry(() => 1, { maxDelay: value })).toThrow(IllegalArgumentException);
      }
    });

    it("should reject a multiplier below one", () => {
      for (const multiplier of [0, 0.5, -2, NaN, Infinity]) {
        expect(() => retry(() => 1, { multiplier })).toThrow(IllegalArgumentException);
      }
    });

    it("should validate the options before the first attempt", () => {
      const fn = vi.fn();

      expect(() => retry(fn, { attempts: 0 })).toThrow(IllegalArgumentException);
      expect(fn).not.toHaveBeenCalled();
    });
  });
});

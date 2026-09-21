import { checkMultipleAccount } from "@/appsscript";
import { EmptyStringException, InvalidEmailFormatException } from "@/exception";
import { afterEach, describe, expect, it } from "vitest";

type Mutable = Record<string, unknown>;

/**
 * Installs a stand-in Session reporting the given effective user.
 */
function mockEffectiveUser(email: unknown): void {
  (globalThis as Mutable).Session = {
    getEffectiveUser: () => ({ getEmail: () => email })
  };
}

afterEach(() => {
  delete (globalThis as Mutable).Session;
});

describe("checkMultipleAccount", () => {
  describe("Correct input data", () => {
    it("should return false when the addresses match", () => {
      mockEffectiveUser("user@example.com");

      expect(checkMultipleAccount("user@example.com")).toBe(false);
    });

    it("should return true when the addresses differ", () => {
      mockEffectiveUser("other@example.com");

      expect(checkMultipleAccount("user@example.com")).toBe(true);
    });

    it("should compare case-insensitively", () => {
      mockEffectiveUser("User@Example.com");

      expect(checkMultipleAccount("USER@EXAMPLE.COM")).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for an empty or missing initiator address", () => {
      mockEffectiveUser("user@example.com");

      expect(() => checkMultipleAccount("")).toThrow(EmptyStringException);
      // @ts-expect-error - testing invalid types
      expect(() => checkMultipleAccount(null)).toThrow(EmptyStringException);
    });

    it("should throw for a malformed initiator address", () => {
      mockEffectiveUser("user@example.com");

      expect(() => checkMultipleAccount("not-an-email")).toThrow(InvalidEmailFormatException);
    });

    it("should throw when the effective user has no usable address", () => {
      mockEffectiveUser(undefined);

      expect(() => checkMultipleAccount("user@example.com")).toThrow(EmptyStringException);
    });

    it("should name which address was at fault", () => {
      mockEffectiveUser("user@example.com");

      expect(() => checkMultipleAccount("not-an-email")).toThrow(
        "The initiator's email address format is invalid."
      );
    });
  });
});

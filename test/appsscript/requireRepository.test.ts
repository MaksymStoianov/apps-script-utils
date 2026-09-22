import { requireRepository } from "@/appsscript";
import { RepositoryIsNotDefinedException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("requireRepository", () => {
  describe("Correct input data", () => {
    it("should return the same object reference", () => {
      const value = { find: (): unknown => undefined };

      expect(requireRepository(value)).toBe(value);
    });

    it("should return falsy values that are not nil", () => {
      expect(requireRepository(0)).toBe(0);
      expect(requireRepository("")).toBe("");
      expect(requireRepository(false)).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for both nil values", () => {
      expect(() => requireRepository(null)).toThrow(RepositoryIsNotDefinedException);
      expect(() => requireRepository(undefined)).toThrow(RepositoryIsNotDefinedException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireRepository(null)).toThrow("Repository is not defined.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireRepository(null, "Wire it up in the entry point.")).toThrow(
        "Wire it up in the entry point."
      );
    });
  });
});

import { requireService } from "@/appsscript";
import { ServiceIsNotDefinedException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("requireService", () => {
  describe("Correct input data", () => {
    it("should return the same object reference", () => {
      const value = { find: (): unknown => undefined };

      expect(requireService(value)).toBe(value);
    });

    it("should return falsy values that are not nil", () => {
      expect(requireService(0)).toBe(0);
      expect(requireService("")).toBe("");
      expect(requireService(false)).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for both nil values", () => {
      expect(() => requireService(null)).toThrow(ServiceIsNotDefinedException);
      expect(() => requireService(undefined)).toThrow(ServiceIsNotDefinedException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireService(null)).toThrow("Service is not defined.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireService(null, "Wire it up in the entry point.")).toThrow(
        "Wire it up in the entry point."
      );
    });
  });
});

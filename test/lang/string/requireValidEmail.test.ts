import { EmptyStringException, InvalidEmailFormatException } from "@/exception";
import { requireValidEmail } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireValidEmail", () => {
  describe("Correct input data", () => {
    it("should return the address unchanged", () => {
      expect(requireValidEmail("user@example.com")).toBe("user@example.com");
      expect(requireValidEmail("first.last@example.co.uk")).toBe("first.last@example.co.uk");
    });

    it("should accept a plus alias", () => {
      expect(requireValidEmail("user+tag@example.com")).toBe("user+tag@example.com");
    });
  });

  describe("Incorrect input data", () => {
    it("should report emptiness rather than a format error for empty input", () => {
      expect(() => requireValidEmail("")).toThrow(EmptyStringException);
      expect(() => requireValidEmail("   ")).toThrow(EmptyStringException);
      expect(() => requireValidEmail(null)).toThrow(EmptyStringException);
      expect(() => requireValidEmail(undefined)).toThrow(EmptyStringException);
    });

    it("should throw a format error for a malformed address", () => {
      expect(() => requireValidEmail("userexample.com")).toThrow(InvalidEmailFormatException);
      expect(() => requireValidEmail("user@")).toThrow(InvalidEmailFormatException);
      expect(() => requireValidEmail("@example.com")).toThrow(InvalidEmailFormatException);
      expect(() => requireValidEmail("user@example")).toThrow(InvalidEmailFormatException);
    });

    it("should carry the exception default message when none is provided", () => {
      expect(() => requireValidEmail("user@")).toThrow("Invalid email format.");
    });

    it("should use a custom message for both failure kinds", () => {
      expect(() => requireValidEmail("", "Enter an address.")).toThrow("Enter an address.");
      expect(() => requireValidEmail("user@", "Enter an address.")).toThrow("Enter an address.");
    });
  });
});

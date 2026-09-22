import { requireValidPresentationId } from "@/appsscript";
import { IllegalArgumentException } from "@/exception";
import { describe, expect, it } from "vitest";

/** 44 characters, the usual shape of a Drive file id. */
const validId = "1AbCdEfGhIjKlMnOpQrStUvWxYz0123456789AbCdEfG";

describe("requireValidPresentationId", () => {
  describe("Correct input data", () => {
    it("should return a realistic id unchanged", () => {
      expect(requireValidPresentationId(validId)).toBe(validId);
    });

    it("should accept exactly the minimum length", () => {
      const minimum = "a".repeat(25);

      expect(requireValidPresentationId(minimum)).toBe(minimum);
    });

    it("should accept ids containing hyphens and underscores", () => {
      const mixed = "1Ab-Cd_Ef-Gh_Ij-Kl_Mn-Op_Qr";

      expect(requireValidPresentationId(mixed)).toBe(mixed);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw one character below the minimum length", () => {
      expect(() => requireValidPresentationId("a".repeat(24))).toThrow(IllegalArgumentException);
    });

    it("should throw for a short identifier", () => {
      expect(() => requireValidPresentationId("p1")).toThrow(IllegalArgumentException);
    });

    it("should throw for a full Slides URL", () => {
      expect(() =>
        requireValidPresentationId(`https://docs.google.com/presentation/d/${validId}/edit`)
      ).toThrow(IllegalArgumentException);
    });

    it("should throw for disallowed characters and padding", () => {
      expect(() => requireValidPresentationId(`${validId}!`)).toThrow(IllegalArgumentException);
      expect(() => requireValidPresentationId(` ${validId} `)).toThrow(IllegalArgumentException);
    });

    it("should throw for an empty string and non-string types", () => {
      expect(() => requireValidPresentationId("")).toThrow(IllegalArgumentException);
      expect(() => requireValidPresentationId(null)).toThrow(IllegalArgumentException);
      expect(() => requireValidPresentationId(42)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireValidPresentationId("p1")).toThrow("Expected a valid presentation id.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireValidPresentationId("p1", "Pass the deck id, not the URL.")).toThrow(
        "Pass the deck id, not the URL."
      );
    });
  });
});

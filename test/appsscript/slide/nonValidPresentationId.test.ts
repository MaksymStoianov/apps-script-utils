import { nonValidPresentationId } from "@/appsscript";
import { describe, expect, it } from "vitest";

/** 44 characters, the usual shape of a Drive file id. */
const validId = "1AbCdEfGhIjKlMnOpQrStUvWxYz0123456789AbCdEfG";

describe("nonValidPresentationId", () => {
  describe("Correct input data", () => {
    it("should return false for a realistic presentation id", () => {
      expect(nonValidPresentationId(validId)).toBe(false);
    });

    it("should return false at exactly the minimum length", () => {
      expect(nonValidPresentationId("a".repeat(25))).toBe(false);
    });

    it("should return false for ids containing hyphens and underscores", () => {
      expect(nonValidPresentationId("1Ab-Cd_Ef-Gh_Ij-Kl_Mn-Op_Qr")).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true one character below the minimum length", () => {
      expect(nonValidPresentationId("a".repeat(24))).toBe(true);
    });

    it("should return true for a short identifier", () => {
      expect(nonValidPresentationId("p1")).toBe(true);
    });

    it("should return true for a full Slides URL", () => {
      expect(nonValidPresentationId(`https://docs.google.com/presentation/d/${validId}/edit`)).toBe(
        true
      );
    });

    it("should return true for characters outside the allowed set", () => {
      expect(nonValidPresentationId(`${validId}!`)).toBe(true);
      expect(nonValidPresentationId(` ${validId} `)).toBe(true);
    });

    it("should return true for an empty string and non-string types", () => {
      expect(nonValidPresentationId("")).toBe(true);
      expect(nonValidPresentationId(null)).toBe(true);
      expect(nonValidPresentationId(undefined)).toBe(true);
      expect(nonValidPresentationId(42)).toBe(true);
    });
  });
});

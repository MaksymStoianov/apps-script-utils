import { isValidPresentationId } from "@/appsscript";
import { describe, expect, it } from "vitest";

/**
 * 44 characters, the usual shape of a Drive file id.
 */
const validId = "1AbCdEfGhIjKlMnOpQrStUvWxYz0123456789AbCdEfG";

describe("isValidPresentationId", () => {
  describe("Correct input data", () => {
    it("should accept a realistic id", () => {
      expect(isValidPresentationId(validId)).toBe(true);
    });

    it("should accept exactly the minimum length", () => {
      expect(isValidPresentationId("a".repeat(25))).toBe(true);
    });

    it("should accept hyphens and underscores", () => {
      expect(isValidPresentationId("1Ab-Cd_Ef-Gh_Ij-Kl_Mn-Op_Qr")).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should reject one character below the minimum", () => {
      expect(isValidPresentationId("a".repeat(24))).toBe(false);
    });

    it("should reject a full Slides URL", () => {
      expect(isValidPresentationId(`https://docs.google.com/presentation/d/${validId}/edit`)).toBe(
        false
      );
    });

    it("should reject disallowed characters and padding", () => {
      expect(isValidPresentationId(`${validId}!`)).toBe(false);
      expect(isValidPresentationId(` ${validId} `)).toBe(false);
    });

    it("should reject an empty string and non-string types", () => {
      expect(isValidPresentationId("")).toBe(false);
      expect(isValidPresentationId(null)).toBe(false);
      expect(isValidPresentationId(42)).toBe(false);
    });
  });
});

import { requireValidToken } from "@/appsscript";
import { AuthenticationException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("requireValidToken", () => {
  describe("Accepted tokens", () => {
    it("should accept a token matching a single allowed key", () => {
      expect(requireValidToken("secret", "secret")).toBe("secret");
    });

    it("should accept a token present in an array of keys", () => {
      expect(requireValidToken("b", ["a", "b"])).toBe("b");
    });

    it("should accept a token among the values of a record", () => {
      expect(requireValidToken("b", { first: "a", second: "b" })).toBe("b");
    });

    it("should strip the Bearer prefix before comparing", () => {
      expect(requireValidToken("Bearer secret", "secret")).toBe("Bearer secret");
    });

    it("should return the token exactly as supplied, prefix included", () => {
      expect(requireValidToken("Bearer secret", ["secret"])).toBe("Bearer secret");
    });
  });

  describe("Rejected tokens", () => {
    it("should throw when the token does not match", () => {
      expect(() => requireValidToken("wrong", "secret")).toThrow(AuthenticationException);
      expect(() => requireValidToken("wrong", ["a", "b"])).toThrow(AuthenticationException);
    });

    it("should throw for a non-string token", () => {
      expect(() => requireValidToken(null, "secret")).toThrow(AuthenticationException);
      expect(() => requireValidToken(undefined, "secret")).toThrow(AuthenticationException);
      expect(() => requireValidToken(42, "secret")).toThrow(AuthenticationException);
    });

    it("should report a missing token differently from a wrong one", () => {
      expect(() => requireValidToken(null, "secret")).toThrow("No token provided.");
      expect(() => requireValidToken("wrong", "secret")).toThrow("Invalid API key.");
    });

    it("should use a custom message for a wrong token", () => {
      expect(() => requireValidToken("wrong", "secret", "Access denied.")).toThrow(
        "Access denied."
      );
    });

    it("should ignore non-string values in a record of keys", () => {
      expect(() => requireValidToken("42", { a: 42 })).toThrow(AuthenticationException);
    });

    it("should reject an empty token against an empty allow list", () => {
      expect(() => requireValidToken("", [])).toThrow(AuthenticationException);
    });
  });
});

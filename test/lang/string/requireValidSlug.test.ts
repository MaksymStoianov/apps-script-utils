import { EmptyStringException, IllegalArgumentException } from "@/exception";
import { requireValidSlug } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireValidSlug", () => {
  describe("Correct input data", () => {
    it("should return the slug unchanged", () => {
      expect(requireValidSlug("post")).toBe("post");
      expect(requireValidSlug("my-post")).toBe("my-post");
      expect(requireValidSlug("my_post")).toBe("my_post");
      expect(requireValidSlug("post-2024")).toBe("post-2024");
    });

    it("should accept uppercase, which the pattern allows", () => {
      expect(requireValidSlug("My-Post")).toBe("My-Post");
    });
  });

  describe("Incorrect input data", () => {
    it("should report emptiness rather than a format error for empty input", () => {
      expect(() => requireValidSlug("")).toThrow(EmptyStringException);
      expect(() => requireValidSlug("   ")).toThrow(EmptyStringException);
      expect(() => requireValidSlug(null)).toThrow(EmptyStringException);
      expect(() => requireValidSlug(undefined)).toThrow(EmptyStringException);
    });

    it("should throw when the slug does not start with a letter", () => {
      expect(() => requireValidSlug("2024-post")).toThrow(IllegalArgumentException);
      expect(() => requireValidSlug("-post")).toThrow(IllegalArgumentException);
    });

    it("should throw for characters outside the allowed set", () => {
      expect(() => requireValidSlug("my post")).toThrow(IllegalArgumentException);
      expect(() => requireValidSlug("my.post")).toThrow(IllegalArgumentException);
      expect(() => requireValidSlug("пост")).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireValidSlug("my post")).toThrow("Expected a valid slug.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireValidSlug("my post", "The handle is malformed.")).toThrow(
        "The handle is malformed."
      );
    });
  });
});

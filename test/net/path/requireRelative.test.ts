import { IllegalArgumentException } from "@/exception";
import { requireRelative } from "@/net";
import { describe, expect, it } from "vitest";

describe("requireRelative", () => {
  describe("Correct input data", () => {
    it("should return relative paths unchanged", () => {
      expect(requireRelative("docs/readme.md")).toBe("docs/readme.md");
      expect(requireRelative("./docs")).toBe("./docs");
      expect(requireRelative("../docs")).toBe("../docs");
      expect(requireRelative("readme.md")).toBe("readme.md");
    });

    it("should accept an empty string, which counts as relative", () => {
      expect(requireRelative("")).toBe("");
      expect(requireRelative("   ")).toBe("   ");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for slash-rooted paths", () => {
      expect(() => requireRelative("/")).toThrow(IllegalArgumentException);
      expect(() => requireRelative("/var/log")).toThrow(IllegalArgumentException);
    });

    it("should throw for paths carrying a scheme", () => {
      expect(() => requireRelative("https://example.com")).toThrow(IllegalArgumentException);
      expect(() => requireRelative("file:///tmp")).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireRelative("/var")).toThrow("Expected a relative path.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireRelative("/var", "The path must not escape the root.")).toThrow(
        "The path must not escape the root."
      );
    });
  });

  describe("Non-string input", () => {
    // isRelative reports true for these — they are not absolute paths — but a
    // require* function promises a string, so they are rejected here.
    it("should throw for non-string input", () => {
      expect(() => requireRelative(null)).toThrow(IllegalArgumentException);
      expect(() => requireRelative(undefined)).toThrow(IllegalArgumentException);
      expect(() => requireRelative(42)).toThrow(IllegalArgumentException);
      expect(() => requireRelative(["docs"])).toThrow(IllegalArgumentException);
    });
  });
});

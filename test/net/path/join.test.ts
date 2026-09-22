import { join } from "@/net";
import { describe, expect, it } from "vitest";

describe("join", () => {
  describe("Correct input data", () => {
    it("should join two relative segments", () => {
      expect(join("a", "b")).toBe("a/b");
    });

    it("should keep an absolute first segment absolute", () => {
      expect(join("/a", "b")).toBe("/a/b");
    });

    it("should resolve a parent reference", () => {
      expect(join("a/b", "../c")).toBe("a/c");
      expect(join("a", "..", "b")).toBe("b");
    });

    it("should return a single segment unchanged", () => {
      expect(join("a")).toBe("a");
      expect(join("/")).toBe("/");
    });

    it("should return the current directory for no arguments", () => {
      expect(join()).toBe(".");
    });
  });

  // A later segment beginning with a separator resets the result, which is
  // `path.resolve` behaviour rather than `path.join`. Tracked in #445.
  describe("Known defect: a later absolute segment discards the earlier ones", () => {
    it("should currently drop everything to the left", () => {
      expect(join("a", "/b")).toBe("/b");
      expect(join("a/", "/b")).toBe("/b");
    });
  });
});

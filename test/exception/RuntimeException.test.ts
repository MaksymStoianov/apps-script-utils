import { Exception, IllegalArgumentException, RuntimeException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("RuntimeException", () => {
  describe("Message", () => {
    it("should carry its default message when none is provided", () => {
      expect(new RuntimeException().message).toBe("A runtime error occurred.");
    });

    // RuntimeException uses `message ?? default`, while every leaf class uses
    // `message || default` — so an explicitly empty message is honoured here
    // and replaced there. Tracked in #439.
    it("should currently honour an explicitly empty message", () => {
      expect(new RuntimeException("").message).toBe("");
    });

    it("should carry a custom message", () => {
      expect(new RuntimeException("boom").message).toBe("boom");
    });
  });

  describe("Identity", () => {
    it("should report its own class name", () => {
      expect(new RuntimeException().name).toBe("RuntimeException");
    });

    it("should be an instance of Exception and Error", () => {
      const exception = new RuntimeException();

      expect(exception).toBeInstanceOf(Exception);
      expect(exception).toBeInstanceOf(Error);
    });

    it("should not be an instance of a sibling subclass", () => {
      expect(new RuntimeException()).not.toBeInstanceOf(IllegalArgumentException);
    });
  });

  describe("Position in the hierarchy", () => {
    it("should be the base every concrete exception extends", () => {
      expect(new IllegalArgumentException()).toBeInstanceOf(RuntimeException);
    });
  });
});

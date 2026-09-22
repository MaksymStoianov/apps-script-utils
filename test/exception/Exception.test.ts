import { Exception, IllegalArgumentException, RuntimeException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("Exception", () => {
  describe("Message", () => {
    it("should have no message when constructed without one", () => {
      expect(new Exception().message).toBe("");
    });

    it("should carry a string message", () => {
      expect(new Exception("boom").message).toBe("boom");
    });

    it("should take the message from an Error passed in", () => {
      expect(new Exception(new Error("inner")).message).toBe("inner");
    });

    it("should take the message from another Exception passed in", () => {
      expect(new Exception(new IllegalArgumentException("inner")).message).toBe("inner");
    });

    it("should ignore a non-string, non-Error value", () => {
      expect(new Exception(42).message).toBe("");
      expect(new Exception({ message: "boom" }).message).toBe("");
    });
  });

  describe("Identity", () => {
    it("should report its own class name", () => {
      expect(new Exception().name).toBe("Exception");
    });

    it("should be an instance of Error", () => {
      expect(new Exception()).toBeInstanceOf(Error);
    });

    it("should expose a custom string tag", () => {
      expect(Object.prototype.toString.call(new Exception())).toBe("[object Exception]");
    });

    it("should expose the subclass name as the string tag", () => {
      expect(Object.prototype.toString.call(new RuntimeException())).toBe(
        "[object RuntimeException]"
      );
    });
  });

  describe("toString", () => {
    it("should return the message when there is one", () => {
      expect(new Exception("boom").toString()).toBe("boom");
    });

    // The fallback in `String(this.message ?? this.constructor.name)` is
    // unreachable: Error sets `message` to "", which is not nullish.
    // This assertion changes when #439 is fixed.
    it("should currently return an empty string when there is no message", () => {
      expect(new Exception().toString()).toBe("");
    });
  });

  describe("create", () => {
    it("should build an instance", () => {
      expect(Exception.create("boom")).toBeInstanceOf(Exception);
      expect(Exception.create("boom").message).toBe("boom");
    });
  });

  describe("isException", () => {
    it("should recognise instances and subclass instances", () => {
      expect(Exception.isException(new Exception())).toBe(true);
      expect(Exception.isException(new RuntimeException())).toBe(true);
    });

    it("should reject native errors and lookalikes", () => {
      expect(Exception.isException(new Error("boom"))).toBe(false);
      expect(Exception.isException({ name: "Exception", message: "boom" })).toBe(false);
    });

    it("should reject nil values, primitives and the constructor itself", () => {
      expect(Exception.isException(null)).toBe(false);
      expect(Exception.isException(undefined)).toBe(false);
      expect(Exception.isException("Exception")).toBe(false);
      expect(Exception.isException(Exception)).toBe(false);
    });
  });
});

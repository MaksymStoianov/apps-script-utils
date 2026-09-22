import { Exception, RuntimeException, SlideNotFoundException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("SlideNotFoundException", () => {
  describe("Message", () => {
    it("should carry its default message when none is provided", () => {
      expect(new SlideNotFoundException().message).toBe("Slide not found.");
    });

    it("should carry a custom message when provided", () => {
      expect(new SlideNotFoundException("Something specific.").message).toBe("Something specific.");
    });

    it("should fall back to the default for an empty string", () => {
      expect(new SlideNotFoundException("").message).toBe("Slide not found.");
    });

    it("should expose the message through getMessage and toString", () => {
      const exception = new SlideNotFoundException("Something specific.");

      expect(exception.getMessage()).toBe("Something specific.");
      expect(exception.toString()).toBe("Something specific.");
    });
  });

  describe("Identity", () => {
    it("should report its own class name", () => {
      expect(new SlideNotFoundException().name).toBe("SlideNotFoundException");
    });

    it("should be an instance of its whole ancestry", () => {
      const exception = new SlideNotFoundException();

      expect(exception).toBeInstanceOf(SlideNotFoundException);
      expect(exception).toBeInstanceOf(RuntimeException);
      expect(exception).toBeInstanceOf(Exception);
      expect(exception).toBeInstanceOf(Error);
    });

    it("should be recognised by the Exception type guard", () => {
      expect(Exception.isException(new SlideNotFoundException())).toBe(true);
    });

    it("should carry a stack trace", () => {
      expect(new SlideNotFoundException().stack).toBeTypeOf("string");
    });

    it("should be catchable as a plain Error", () => {
      expect(() => {
        throw new SlideNotFoundException();
      }).toThrow(Error);
    });
  });
});

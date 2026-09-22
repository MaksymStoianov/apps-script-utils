import { EmptyStringException } from "@/exception";
import { getTriggerById } from "@/appsscript";
import { afterEach, describe, expect, it, vi } from "vitest";

type Mutable = Record<string, unknown>;

/**
 * Installs a stand-in for `ScriptApp` exposing the given trigger ids, and
 * reports how many times the project triggers were asked for.
 */
function mockScriptApp(ids: string[]): { calls: number } {
  const counter = { calls: 0 };

  (globalThis as Mutable).ScriptApp = {
    getProjectTriggers: () => {
      counter.calls += 1;

      return ids.map((id: string) => ({ getUniqueId: () => id }));
    }
  };

  return counter;
}

afterEach(() => {
  delete (globalThis as Mutable).ScriptApp;

  vi.restoreAllMocks();
});

describe("getTriggerById", () => {
  describe("Correct input data", () => {
    it("should return the trigger whose id matches", () => {
      mockScriptApp(["one", "two", "three"]);

      expect(getTriggerById("two")?.getUniqueId()).toBe("two");
    });

    it("should return null when no trigger matches", () => {
      mockScriptApp(["one", "two"]);

      expect(getTriggerById("missing")).toBeNull();
    });

    it("should return null when the project has no triggers", () => {
      mockScriptApp([]);

      expect(getTriggerById("one")).toBeNull();
    });

    it("should ask for the project triggers exactly once", () => {
      const counter = mockScriptApp(["one"]);

      getTriggerById("one");

      expect(counter.calls).toBe(1);
    });

    it("should ask for the project triggers exactly once on a miss too", () => {
      const counter = mockScriptApp(["one"]);

      getTriggerById("missing");

      expect(counter.calls).toBe(1);
    });

    it("should match ids exactly", () => {
      mockScriptApp(["abc"]);

      expect(getTriggerById("ABC")).toBeNull();
      expect(getTriggerById("ab")).toBeNull();
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for an empty id", () => {
      mockScriptApp(["one"]);

      expect(() => getTriggerById("")).toThrow(EmptyStringException);
      expect(() => getTriggerById("   ")).toThrow(EmptyStringException);
    });

    it("should throw for an id that is not a string", () => {
      mockScriptApp(["one"]);

      expect(() => getTriggerById(null as unknown as string)).toThrow(EmptyStringException);
      expect(() => getTriggerById(undefined as unknown as string)).toThrow(EmptyStringException);
      expect(() => getTriggerById(42 as unknown as string)).toThrow(EmptyStringException);
    });

    it("should reject an invalid id before reaching ScriptApp", () => {
      const counter = mockScriptApp(["one"]);

      expect(() => getTriggerById("")).toThrow(EmptyStringException);
      expect(counter.calls).toBe(0);
    });
  });
});

import { nonAdmin } from "@/appsscript";
import { afterEach, describe, expect, it, vi } from "vitest";

type Mutable = Record<string, unknown>;

/** Installs stand-ins for the Apps Script globals `isAdmin` reaches for. */
function mockDirectory(isAdminFlag: boolean | undefined, email = "user@example.com"): void {
  (globalThis as Mutable).Session = {
    getActiveUser: () => ({ getEmail: () => email })
  };

  (globalThis as Mutable).AdminDirectory = {
    Users: {
      get: () => ({ isAdmin: isAdminFlag })
    }
  };
}

afterEach(() => {
  delete (globalThis as Mutable).Session;
  delete (globalThis as Mutable).AdminDirectory;

  vi.restoreAllMocks();
});

describe("nonAdmin", () => {
  describe("Correct input data", () => {
    it("should return false when the Directory Service reports an administrator", () => {
      mockDirectory(true);

      expect(nonAdmin()).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true when the Directory Service reports a regular user", () => {
      mockDirectory(false);

      expect(nonAdmin()).toBe(true);
    });

    it("should return true when isAdmin is absent from the response", () => {
      mockDirectory(undefined);

      expect(nonAdmin()).toBe(true);
    });

    it("should return true when the Directory Service is not enabled", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);

      expect(nonAdmin()).toBe(true);
      expect(warn).toHaveBeenCalled();
    });

    it("should return true when the lookup throws", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);

      (globalThis as Mutable).Session = {
        getActiveUser: () => ({ getEmail: () => "user@example.com" })
      };

      (globalThis as Mutable).AdminDirectory = {
        Users: {
          get: () => {
            throw new Error("Service unavailable");
          }
        }
      };

      expect(nonAdmin()).toBe(true);
      expect(warn).toHaveBeenCalled();
    });
  });
});

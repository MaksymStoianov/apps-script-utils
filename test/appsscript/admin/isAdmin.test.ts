import { isAdmin } from "@/appsscript";
import { afterEach, describe, expect, it, vi } from "vitest";

type Mutable = Record<string, unknown>;

/**
 * Installs stand-ins for the Apps Script globals `isAdmin` reaches for.
 */
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

describe("isAdmin", () => {
  describe("Correct input data", () => {
    it("should return true when the Directory Service reports an administrator", () => {
      mockDirectory(true);

      expect(isAdmin()).toBe(true);
    });

    it("should look the user up by their active email", () => {
      const seen: string[] = [];

      (globalThis as Mutable).Session = {
        getActiveUser: () => ({ getEmail: () => "admin@example.com" })
      };

      (globalThis as Mutable).AdminDirectory = {
        Users: {
          get: (email: string) => {
            seen.push(email);

            return { isAdmin: true };
          }
        }
      };

      isAdmin();

      expect(seen).toEqual(["admin@example.com"]);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for a regular user", () => {
      mockDirectory(false);

      expect(isAdmin()).toBe(false);
    });

    it("should coerce a missing isAdmin field to false", () => {
      mockDirectory(undefined);

      expect(isAdmin()).toBe(false);
    });
  });

  describe("Failure paths", () => {
    it("should return false and warn when the Directory Service is absent", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);

      expect(isAdmin()).toBe(false);
      expect(warn).toHaveBeenCalledTimes(1);
    });

    it("should return false and warn when the lookup throws", () => {
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

      expect(isAdmin()).toBe(false);
      expect(warn).toHaveBeenCalledTimes(1);
    });

    it("should not distinguish a denial from an outage", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);

      mockDirectory(false);

      const denied = isAdmin();

      delete (globalThis as Mutable).AdminDirectory;

      const unavailable = isAdmin();

      expect(denied).toBe(unavailable);
      expect(warn).toHaveBeenCalled();
    });
  });
});

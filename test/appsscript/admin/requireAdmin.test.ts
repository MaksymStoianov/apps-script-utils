import { requireAdmin } from "@/appsscript";
import { AuthorizationException } from "@/exception";
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

describe("requireAdmin", () => {
  describe("Correct input data", () => {
    it("should return without throwing for an administrator", () => {
      mockDirectory(true);

      expect(() => requireAdmin()).not.toThrow();
      expect(requireAdmin()).toBeUndefined();
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for a regular user", () => {
      mockDirectory(false);

      expect(() => requireAdmin()).toThrow(AuthorizationException);
    });

    it("should throw when isAdmin is absent from the response", () => {
      mockDirectory(undefined);

      expect(() => requireAdmin()).toThrow(AuthorizationException);
    });

    it("should fail closed when the Directory Service is not enabled", () => {
      vi.spyOn(console, "warn").mockImplementation(() => undefined);

      expect(() => requireAdmin()).toThrow(AuthorizationException);
    });

    it("should use the default message when none is provided", () => {
      mockDirectory(false);

      expect(() => requireAdmin()).toThrow(
        "The current user is not authorized to perform this action."
      );
    });

    it("should use a custom message when provided", () => {
      mockDirectory(false);

      expect(() => requireAdmin("Only a domain administrator may run this.")).toThrow(
        "Only a domain administrator may run this."
      );
    });
  });
});

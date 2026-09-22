import { EmptyStringException, IllegalStateException } from "@/exception";
import { createFolder } from "@/appsscript";
import { afterEach, describe, expect, it, vi } from "vitest";

type Mutable = Record<string, unknown>;

interface FakeFolder {
  name: string;
  children: FakeFolder[];
  queries: string[];
  getName(): string;
  getFoldersByName(name: string): { hasNext(): boolean; next(): FakeFolder };
  createFolder(name: string): FakeFolder;
}

/**
 * Builds a folder that records every lookup made against it, so the tests can
 * assert both the resulting tree and the number of Drive queries.
 */
function makeFolder(name: string, children: FakeFolder[] = []): FakeFolder {
  const folder: FakeFolder = {
    name,
    children,
    queries: [],
    getName: () => name,
    getFoldersByName(wanted: string) {
      folder.queries.push(wanted);

      const matches = folder.children.filter((child: FakeFolder) => child.name === wanted);

      let index = 0;

      return {
        hasNext: () => index < matches.length,
        next: () => matches[index++]
      };
    },
    createFolder(childName: string) {
      const child = makeFolder(childName);

      folder.children.push(child);

      return child;
    }
  };

  return folder;
}

let root: FakeFolder;

/**
 * Installs a stand-in for `DriveApp` whose root is the given folder.
 */
function mockDriveApp(rootFolder: FakeFolder): void {
  (globalThis as Mutable).DriveApp = {
    getRootFolder: () => rootFolder
  };
}

afterEach(() => {
  delete (globalThis as Mutable).DriveApp;

  vi.restoreAllMocks();
});

describe("createFolder", () => {
  describe("Correct input data", () => {
    it("should create a whole tree that does not exist yet", () => {
      root = makeFolder("root");
      mockDriveApp(root);

      const result = createFolder("Reports/2024/Q1") as unknown as FakeFolder;

      expect(result.getName()).toBe("Q1");
      expect(root.children.map((c: FakeFolder) => c.name)).toStrictEqual(["Reports"]);
      expect(root.children[0].children[0].name).toBe("2024");
    });

    it("should reuse the folders that already exist", () => {
      const existing = makeFolder("Reports", [makeFolder("2024")]);

      root = makeFolder("root", [existing]);
      mockDriveApp(root);

      createFolder("Reports/2024/Q1");

      expect(root.children).toHaveLength(1);
      expect(existing.children).toHaveLength(1);
      expect(existing.children[0].children.map((c: FakeFolder) => c.name)).toStrictEqual(["Q1"]);
    });

    it("should return an existing folder without creating anything", () => {
      const target = makeFolder("2024");

      root = makeFolder("root", [makeFolder("Reports", [target])]);
      mockDriveApp(root);

      expect((createFolder("Reports/2024") as unknown as FakeFolder).name).toBe("2024");
      expect(target.children).toHaveLength(0);
    });

    it("should ignore leading, trailing and doubled separators", () => {
      root = makeFolder("root");
      mockDriveApp(root);

      createFolder("/Reports//2024/");

      expect(root.children[0].name).toBe("Reports");
      expect(root.children[0].children[0].name).toBe("2024");
      expect(root.children[0].children[0].children).toHaveLength(0);
    });

    it("should start from the given root folder instead of the Drive root", () => {
      root = makeFolder("root");
      mockDriveApp(root);

      const parent = makeFolder("Parent");

      createFolder("Q1", parent as unknown as GoogleAppsScript.Drive.Folder);

      expect(parent.children.map((c: FakeFolder) => c.name)).toStrictEqual(["Q1"]);
      expect(root.children).toHaveLength(0);
    });

    it("should query each level exactly once", () => {
      const level = makeFolder("Reports", [makeFolder("2024")]);

      root = makeFolder("root", [level]);
      mockDriveApp(root);

      createFolder("Reports/2024/Q1");

      expect(root.queries).toStrictEqual(["Reports"]);
      expect(level.queries).toStrictEqual(["2024"]);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw when a level holds two folders of the same name", () => {
      root = makeFolder("root", [makeFolder("Reports"), makeFolder("Reports")]);
      mockDriveApp(root);

      expect(() => createFolder("Reports/2024")).toThrow(IllegalStateException);
    });

    it("should throw when the path names no segments", () => {
      root = makeFolder("root");
      mockDriveApp(root);

      expect(() => createFolder("///")).toThrow(IllegalStateException);
    });

    it("should throw for an empty path", () => {
      root = makeFolder("root");
      mockDriveApp(root);

      expect(() => createFolder("")).toThrow(EmptyStringException);
      expect(() => createFolder("   ")).toThrow(EmptyStringException);
    });

    it("should throw for a path that is not a string", () => {
      root = makeFolder("root");
      mockDriveApp(root);

      expect(() => createFolder(null as unknown as string)).toThrow(EmptyStringException);
      expect(() => createFolder(42 as unknown as string)).toThrow(EmptyStringException);
    });
  });
});

import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const DRIVER = "scripts/merge-module-index.mjs";

let workspace: string | null = null;

/**
 * Runs the driver over three versions of a module index, the way Git does.
 *
 * @param   {string} ancestor - The common ancestor's text.
 * @param   {string} ours - Our side's text; the driver writes its result here.
 * @param   {string} theirs - Their side's text.
 * @returns {{ status: number, text: string }} The exit status and the text the driver left behind.
 */
function merge(ancestor: string, ours: string, theirs: string): { status: number; text: string } {
  workspace = mkdtempSync(join(tmpdir(), "merge-driver-"));

  const paths = {
    ancestor: join(workspace, "base"),
    ours: join(workspace, "ours"),
    theirs: join(workspace, "theirs")
  };

  writeFileSync(paths.ancestor, ancestor);
  writeFileSync(paths.ours, ours);
  writeFileSync(paths.theirs, theirs);

  let status = 0;

  try {
    execFileSync(
      "node",
      [DRIVER, paths.ancestor, paths.ours, paths.theirs, "7", "src/lang/array/index.ts"],
      { encoding: "utf8" }
    );
  } catch (error) {
    status = (error as { status?: number }).status ?? 1;
  }

  return { status, text: readFileSync(paths.ours, "utf8") };
}

/**
 * The exports a merged index carries, in order.
 */
function exportsOf(text: string): string[] {
  return text
    .split("\n")
    .map((line: string): RegExpExecArray | null => /^export \* from "\.\/(.+)";$/.exec(line))
    .filter((match: RegExpExecArray | null): boolean => match !== null)
    .map((match): string => (match as RegExpExecArray)[1]);
}

afterEach(() => {
  if (workspace !== null) {
    rmSync(workspace, { recursive: true, force: true });

    workspace = null;
  }
});

describe("merge-module-index", () => {
  describe("Placeholders that carry a signature", () => {
    it("should merge two sides each flipping a different one", () => {
      const { status, text } = merge(
        'export * from "./chunk";\n\n// TODO: first(arr: Array)\n// TODO: last(arr: Array)\n',
        'export * from "./chunk";\n\nexport * from "./first";\n\n// TODO: last(arr: Array)\n',
        'export * from "./chunk";\n\n// TODO: first(arr: Array)\n\nexport * from "./last";\n'
      );

      expect(status).toBe(0);
      expect(text).not.toContain("<<<<<<<");
      expect(exportsOf(text)).toStrictEqual(["chunk", "first", "last"]);
    });

    it("should leave no placeholder for a member it exported", () => {
      const { text } = merge(
        "// TODO: first(arr: Array)\n// TODO: last(arr: Array)\n",
        'export * from "./first";\n\n// TODO: last(arr: Array)\n',
        '// TODO: first(arr: Array)\n\nexport * from "./last";\n'
      );

      expect(text).not.toContain("// TODO: first");
      expect(text).not.toContain("// TODO: last");
    });

    it("should merge a signature carrying commas, colons and pipes", () => {
      const { status, text } = merge(
        "// TODO: namespace(obj: Object | Array, path: string | number | Array)\n// TODO: flat(value: Array | Object, depth?: number)\n",
        'export * from "./namespace";\n\n// TODO: flat(value: Array | Object, depth?: number)\n',
        '// TODO: namespace(obj: Object | Array, path: string | number | Array)\n\nexport * from "./flat";\n'
      );

      expect(status).toBe(0);
      expect(exportsOf(text)).toStrictEqual(["namespace", "flat"]);
    });

    it("should keep a placeholder neither side implemented", () => {
      const { status, text } = merge(
        "// TODO: first(arr: Array)\n// TODO: last(arr: Array)\n// TODO: compact(arr: Array)\n",
        'export * from "./first";\n\n// TODO: last(arr: Array)\n// TODO: compact(arr: Array)\n',
        '// TODO: first(arr: Array)\n\nexport * from "./last";\n\n// TODO: compact(arr: Array)\n'
      );

      expect(status).toBe(0);
      expect(text).toContain("// TODO: compact(arr: Array)");
    });
  });

  describe("A placeholder left beside the export it should have replaced", () => {
    it("should write the export once when a side removes the leftover", () => {
      const { status, text } = merge(
        'export * from "./require2DArray";\n\n// TODO: require2DArray\nexport * from "./chunk";\n',
        'export * from "./require2DArray";\n\n// TODO: require2DArray\nexport * from "./chunk";\n',
        'export * from "./require2DArray";\n\nexport * from "./chunk";\n'
      );

      expect(status).toBe(0);
      expect(exportsOf(text)).toStrictEqual(["require2DArray", "chunk"]);
    });

    it("should write the export once when no side removes the leftover", () => {
      const { status, text } = merge(
        'export * from "./require2DArray";\n\n// TODO: require2DArray\n// TODO: chunk\n',
        'export * from "./require2DArray";\n\n// TODO: require2DArray\nexport * from "./chunk";\n',
        'export * from "./require2DArray";\n\n// TODO: require2DArray\n// TODO: chunk\n'
      );

      expect(status).toBe(0);
      expect(exportsOf(text)).toStrictEqual(["require2DArray", "chunk"]);
    });

    it("should still adopt an export the other side introduced", () => {
      const { status, text } = merge(
        "// TODO: unique\n// TODO: first\n",
        'export * from "./unique";\n\n// TODO: first\n',
        '// TODO: unique\n\nexport * from "./first";\n'
      );

      expect(status).toBe(0);
      expect(exportsOf(text)).toStrictEqual(["unique", "first"]);
      expect(text).not.toContain("// TODO:");
    });
  });

  describe("Comments that name no member", () => {
    it("should carry an Abstract note through untouched", () => {
      const { status, text } = merge(
        "// TODO: Abstract EventEmitter\n// TODO: Abstract URL\n// TODO: first(arr: Array)\n",
        '// TODO: Abstract EventEmitter\n// TODO: Abstract URL\nexport * from "./first";\n',
        "// TODO: Abstract EventEmitter\n// TODO: Abstract URL\n// TODO: first(arr: Array)\n"
      );

      expect(status).toBe(0);
      expect(text).toContain("// TODO: Abstract EventEmitter");
      expect(text).toContain("// TODO: Abstract URL");
      expect(exportsOf(text)).toStrictEqual(["first"]);
    });
  });

  describe("The cases that already worked", () => {
    it("should merge two sides each flipping a bare placeholder", () => {
      const { status, text } = merge(
        "// TODO: nonFloat\n// TODO: nonNaN\n",
        'export * from "./nonFloat";\n\n// TODO: nonNaN\n',
        '// TODO: nonFloat\n\nexport * from "./nonNaN";\n'
      );

      expect(status).toBe(0);
      expect(exportsOf(text)).toStrictEqual(["nonFloat", "nonNaN"]);
    });

    it("should keep an export both sides already had", () => {
      const { status, text } = merge(
        'export * from "./chunk";\n',
        'export * from "./chunk";\n',
        'export * from "./chunk";\n'
      );

      expect(status).toBe(0);
      expect(exportsOf(text)).toStrictEqual(["chunk"]);
    });
  });
});

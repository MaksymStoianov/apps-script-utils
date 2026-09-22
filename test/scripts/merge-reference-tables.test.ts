import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const DRIVER = "scripts/merge-reference-tables.mjs";

const HEAD =
  "| Function | Return type | Brief description |\n| :------- | :---------- | :---------------- |";

let workspace: string | null = null;

/**
 * Builds a row the way the reference tables write one.
 *
 * @param   {string} name - The function the row is for.
 * @returns {string} The table row.
 */
function row(name: string): string {
  const link = "https://example.invalid/" + name + ".ts";

  return "| [`" + name + "`](" + link + ") | `Boolean` | Describes " + name + ". |";
}

/**
 * Runs the driver over three versions of a reference topic, the way Git does.
 *
 * @param   {string} ancestor - The common ancestor's text.
 * @param   {string} ours - Our side's text; the driver writes its result here.
 * @param   {string} theirs - Their side's text.
 * @returns {{ status: number, text: string }} The exit status and the text the driver left behind.
 */
function merge(ancestor: string, ours: string, theirs: string): { status: number; text: string } {
  workspace = mkdtempSync(join(tmpdir(), "merge-tables-"));

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
      [
        DRIVER,
        paths.ancestor,
        paths.ours,
        paths.theirs,
        "7",
        "docs/writerside/topics/reference-appsscript.md"
      ],
      { encoding: "utf8" }
    );
  } catch (error) {
    status = (error as { status?: number }).status ?? 1;
  }

  return { status, text: readFileSync(paths.ours, "utf8") };
}

/**
 * The functions a merged topic lists, in order.
 */
function listed(text: string): string[] {
  return text
    .split("\n")
    .map((line: string): RegExpExecArray | null => /^\|\s*\[`([^`]+)`\]/.exec(line))
    .filter((match: RegExpExecArray | null): boolean => match !== null)
    .map((match): string => (match as RegExpExecArray)[1]);
}

afterEach(() => {
  if (workspace !== null) {
    rmSync(workspace, { recursive: true, force: true });

    workspace = null;
  }
});

/**
 * Builds a section: a heading, and either a table of the given rows or the
 * prose a section carries before it has one.
 *
 * @param   {string} title - The heading text.
 * @param   {string[]} rows - The rows of the section's table, if it has one.
 * @returns {string} The section's lines.
 */
function section(title: string, rows: string[] = []): string {
  const heading = "## " + title;

  return rows.length === 0
    ? [heading, "", "Nothing yet.", ""].join("\n")
    : [heading, "", HEAD, ...rows, ""].join("\n");
}

const AARDVARK = row("aardvark");

const BADGER = row("badger");

const CAMEL = row("camel");

const DINGO = row("dingo");

const ZEBRA = row("zebra");

describe("merge-reference-tables", () => {
  describe("A table one side adds", () => {
    const base = section("Alpha", [AARDVARK]) + "\n" + section("Beta");

    it("should not disturb the rows another section gained", () => {
      const { status, text } = merge(
        base,
        section("Alpha", [AARDVARK, BADGER]) + "\n" + section("Beta", [CAMEL]),
        section("Alpha", [AARDVARK, DINGO]) + "\n" + section("Beta")
      );

      expect(status).toBe(0);
      expect(text).not.toContain("<<<<<<<");
      expect(listed(text)).toStrictEqual(["aardvark", "badger", "dingo", "camel"]);
    });

    it("should keep the new table itself", () => {
      const { text } = merge(
        base,
        section("Alpha", [AARDVARK]) + "\n" + section("Beta", [CAMEL]),
        base
      );

      expect(listed(text)).toStrictEqual(["aardvark", "camel"]);
    });

    it("should merge a table both sides added, row by row", () => {
      const { status, text } = merge(
        base,
        section("Alpha", [AARDVARK]) + "\n" + section("Beta", [CAMEL]),
        section("Alpha", [AARDVARK]) + "\n" + section("Beta", [DINGO])
      );

      expect(status).toBe(0);
      expect(listed(text)).toStrictEqual(["aardvark", "camel", "dingo"]);
    });
  });

  describe("The cases that already worked", () => {
    const base = section("Alpha", [AARDVARK, ZEBRA]);

    it("should merge two rows landing between the same neighbours", () => {
      const { status, text } = merge(
        base,
        section("Alpha", [AARDVARK, BADGER, ZEBRA]),
        section("Alpha", [AARDVARK, CAMEL, ZEBRA])
      );

      expect(status).toBe(0);
      expect(listed(text)).toStrictEqual(["aardvark", "badger", "camel", "zebra"]);
    });

    it("should leave a file neither side touched alone", () => {
      const { status, text } = merge(base, base, base);

      expect(status).toBe(0);
      expect(listed(text)).toStrictEqual(["aardvark", "zebra"]);
    });
  });
});

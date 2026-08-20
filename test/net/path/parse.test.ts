import { EmptyStringException } from "@/exception";
import { parse } from "@/net";
import { describe, expect, it } from "vitest";

describe("parse", () => {
  describe("Correct input data", () => {
    it("should parse an absolute file path with an extension", () => {
      expect(parse("/home/user/dir/file.txt")).toEqual({
        root: "/",
        dir: "/home/user/dir",
        base: "file.txt",
        name: "file",
        ext: ".txt"
      });
    });

    it("should parse a relative file path with an extension", () => {
      expect(parse("home/user/dir/file.txt")).toEqual({
        root: undefined,
        dir: "home/user/dir",
        base: "file.txt",
        name: "file",
        ext: ".txt"
      });
    });

    it("should parse a single filename with an extension", () => {
      expect(parse("file.txt")).toEqual({
        root: undefined,
        dir: undefined,
        base: "file.txt",
        name: "file",
        ext: ".txt"
      });
    });

    it("should parse a single filename without an extension", () => {
      expect(parse("file")).toEqual({
        root: undefined,
        dir: undefined,
        base: "file",
        name: "file",
        ext: undefined
      });
    });

    it("should parse an absolute path without an extension", () => {
      expect(parse("/home/user/file")).toEqual({
        root: "/",
        dir: "/home/user",
        base: "file",
        name: "file",
        ext: undefined
      });
    });

    it("should parse a file directly at the root", () => {
      expect(parse("/file.txt")).toEqual({
        root: "/",
        dir: "/",
        base: "file.txt",
        name: "file",
        ext: ".txt"
      });

      expect(parse("/file")).toEqual({
        root: "/",
        dir: "/",
        base: "file",
        name: "file",
        ext: undefined
      });
    });

    it("should parse the root path", () => {
      expect(parse("/")).toEqual({
        root: "/",
        dir: "/",
        base: undefined,
        name: undefined,
        ext: undefined
      });
    });

    it("should parse a directory path with a trailing slash", () => {
      expect(parse("/home/user/dir/")).toEqual({
        root: "/",
        dir: "/home/user/dir",
        base: undefined,
        name: undefined,
        ext: undefined
      });

      expect(parse("dir/")).toEqual({
        root: undefined,
        dir: "dir",
        base: undefined,
        name: undefined,
        ext: undefined
      });
    });

    it("should handle multiple trailing slashes and multiple root slashes", () => {
      expect(parse("/home/user/dir///")).toEqual({
        root: "/",
        dir: "/home/user/dir",
        base: undefined,
        name: undefined,
        ext: undefined
      });

      expect(parse("///")).toEqual({
        root: "/",
        dir: "/",
        base: undefined,
        name: undefined,
        ext: undefined
      });
    });

    it("should parse files with multiple dots in extension", () => {
      expect(parse("archive.tar.gz")).toEqual({
        root: undefined,
        dir: undefined,
        base: "archive.tar.gz",
        name: "archive.tar",
        ext: ".gz"
      });

      expect(parse("/var/log/app.2026.01.log")).toEqual({
        root: "/",
        dir: "/var/log",
        base: "app.2026.01.log",
        name: "app.2026.01",
        ext: ".log"
      });
    });

    it("should parse dotfiles without extension", () => {
      expect(parse(".gitignore")).toEqual({
        root: undefined,
        dir: undefined,
        base: ".gitignore",
        name: ".gitignore",
        ext: undefined
      });

      expect(parse("/home/user/.bashrc")).toEqual({
        root: "/",
        dir: "/home/user",
        base: ".bashrc",
        name: ".bashrc",
        ext: undefined
      });
    });

    it("should parse dotfiles with extension", () => {
      expect(parse(".env.production")).toEqual({
        root: undefined,
        dir: undefined,
        base: ".env.production",
        name: ".env",
        ext: ".production"
      });
    });

    it("should handle relative dot segments", () => {
      expect(parse(".")).toEqual({
        root: undefined,
        dir: undefined,
        base: ".",
        name: ".",
        ext: undefined
      });

      expect(parse("..")).toEqual({
        root: undefined,
        dir: undefined,
        base: "..",
        name: "..",
        ext: undefined
      });

      expect(parse("/a/b/..")).toEqual({
        root: "/",
        dir: "/a/b",
        base: "..",
        name: "..",
        ext: undefined
      });

      expect(parse("/a/b/.")).toEqual({
        root: "/",
        dir: "/a/b",
        base: ".",
        name: ".",
        ext: undefined
      });
    });

    it("should handle filenames with trailing dots", () => {
      expect(parse("file.")).toEqual({
        root: undefined,
        dir: undefined,
        base: "file.",
        name: "file",
        ext: "."
      });
    });
  });

  describe("Incorrect input data", () => {
    it("should throw EmptyStringException for an empty string", () => {
      expect(() => parse("")).toThrow(EmptyStringException);
    });

    it("should throw EmptyStringException for whitespace-only strings", () => {
      expect(() => parse("   ")).toThrow(EmptyStringException);
      expect(() => parse("\t\n")).toThrow(EmptyStringException);
    });

    it("should throw EmptyStringException for non-string values", () => {
      // @ts-expect-error: Testing invalid input type
      expect(() => parse(null)).toThrow(EmptyStringException);
      // @ts-expect-error: Testing invalid input type
      expect(() => parse(undefined)).toThrow(EmptyStringException);
      // @ts-expect-error: Testing invalid input type
      expect(() => parse(123)).toThrow(EmptyStringException);
      // @ts-expect-error: Testing invalid input type
      expect(() => parse({})).toThrow(EmptyStringException);
      // @ts-expect-error: Testing invalid input type
      expect(() => parse([])).toThrow(EmptyStringException);
    });

    it("should process deeply nested or large paths quickly without ReDoS", () => {
      const startTime = performance.now();

      const largePath = "/" + "a/".repeat(1000) + "file.txt";

      const result = parse(largePath);

      const elapsed = performance.now() - startTime;

      expect(result.name).toBe("file");
      expect(result.ext).toBe(".txt");
      expect(elapsed).toBeLessThan(100);
    });
  });
});

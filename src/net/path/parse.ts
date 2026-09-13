import { requireNonEmptyString } from "../../lang";
import { ParsedPath } from "./types";

/**
 * Returns an object from a url string.
 *
 * @param       {string} path - The URL path string to evaluate.
 * @returns     {ParsedPath} An object conforming to {@link ParsedPath} type with the extracted components.
 * @throws      {@link EmptyStringException}
 * @see         {@link ParsedPath}
 * @environment `Google Apps Script`, `Browser`
 */
export function parse(path: string): ParsedPath {
  const result: string = requireNonEmptyString(path);

  let root: string | undefined;

  let dir: string | undefined;

  let base: string | undefined;

  let name: string | undefined;

  let ext: string | undefined;

  if (result.startsWith("/")) {
    root = "/";
  }

  const lastSlashIndex: number = result.lastIndexOf("/");

  if (lastSlashIndex === -1) {
    base = result;
  } else if (lastSlashIndex === result.length - 1) {
    let stripped: string = result;

    while (stripped.length > 1 && stripped.endsWith("/")) {
      stripped = stripped.slice(0, -1);
    }

    dir = stripped;
  } else {
    base = result.slice(lastSlashIndex + 1);

    if (lastSlashIndex === 0) {
      dir = "/";
    } else {
      dir = result.slice(0, lastSlashIndex);
    }
  }

  if (base !== undefined && base.length > 0) {
    const lastDotIndex: number = base.lastIndexOf(".");

    if (lastDotIndex > 0 && base !== "..") {
      name = base.slice(0, lastDotIndex);
      ext = base.slice(lastDotIndex);
    } else {
      name = base;
      ext = undefined;
    }
  }

  return { root, dir, base, name, ext } as ParsedPath;
}

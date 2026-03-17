import { requireNonEmptyString } from "../../lang";
import { ParsedPath } from "./types";

/**
 * Returns an object from a url string.
 *
 * @param       path - The URL path string to evaluate.
 * @returns     An object conforming to {@link ParsedPath} type with the extracted components.
 * @throws      {@link EmptyStringException}
 * @see         {@link ParsedPath}
 * @environment `Google Apps Script`, `Browser`
 */
export function parse(path: string): ParsedPath {
  const result = requireNonEmptyString(path);

  const reg =
    /^(?<dir>(?<root>\/)?(?:[^/]+\/)*)?(?<base>(?<name>[^/]+)(?<ext>\.\w+)?)?$/i;

  const match = reg.exec(result);

  if (!match || !match.groups) {
    return {
      root: undefined,
      dir: undefined,
      base: undefined,
      name: undefined,
      ext: undefined
    };
  }

  const { root, base, name, ext } = match.groups;

  let { dir } = match.groups;

  if (dir && dir.endsWith("/")) {
    dir = dir.slice(0, -1);
  }

  return { root, dir, base, name, ext } as ParsedPath;
}

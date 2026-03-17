import { isString } from "../../lang";

/**
 * Joins all given path segments into a single normalized path string.
 *
 * @param       {...string} paths - A variable number of string path segments to join.
 * @returns     {string} A new string representing the joined, normalized, and URL-encoded path.
 * @since       1.0.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 */
export function join(...paths: string[]): string {
  const resolvedParts: string[] = [];

  let isAbsoluteResult = false;

  for (const path of paths) {
    if (!isString(path)) {
      continue;
    }

    if (path.startsWith("/")) {
      resolvedParts.length = 0;
      isAbsoluteResult = true;
    }

    const segments = path.split("/").filter(Boolean);

    for (const segment of segments) {
      if (segment === ".") {
        continue;
      }

      if (segment === "..") {
        if (
          resolvedParts.length > 0 &&
          resolvedParts[resolvedParts.length - 1] !== ".."
        ) {
          resolvedParts.pop();
        } else if (!isAbsoluteResult) {
          resolvedParts.push("..");
        }
      } else {
        resolvedParts.push(encodeURIComponent(segment));
      }
    }
  }

  if (isAbsoluteResult) {
    return "/" + resolvedParts.join("/");
  } else {
    return resolvedParts.length === 0 ? "." : resolvedParts.join("/");
  }
}

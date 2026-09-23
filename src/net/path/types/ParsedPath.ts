/**
 * The parts a path breaks into, as {@link parse} reports them.
 *
 * Every part is optional: a path that has no directory, no extension or no root
 * simply comes back without that key rather than with an empty string.
 *
 * @example
 * ```javascript
 * parse("/a/b/c.txt");
 * // => { root: "/", dir: "/a/b", base: "c.txt", name: "c", ext: ".txt" }
 *
 * parse("readme.md");
 * // => { base: "readme.md", name: "readme", ext: ".md" }
 * ```
 *
 * @see [ParsedPath on the documentation site](https://maksymstoianov.github.io/apps-script-utils/ParsedPath.html)
 * @since   0.1.0
 * @version 0.1.0
 */
export type ParsedPath = {
  /**
   * The root of the url such as '/'.
   */
  root?: string | undefined;

  /**
   * The full directory url such as '/home/user/dir'.
   */
  dir?: string | undefined;

  /**
   * The filename including extension (if any) such as 'index.html'.
   */
  base?: string | undefined;

  /**
   * The filename without extension (if any) such as 'index'.
   */
  name?: string | undefined;

  /**
   * The file extension (if any) such as '.html'.
   */
  ext?: string | undefined;
};

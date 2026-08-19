/**
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
   * The file extension (if any) such as '.html'.
   */
  ext?: string | undefined;

  /**
   * The filename without extension (if any) such as 'index'.
   */
  name?: string | undefined;
};

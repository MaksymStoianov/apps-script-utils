import { IllegalStateException } from "../../exception";
import { requireNonEmptyString } from "../../lang";

/**
 * Resolves one level of the path, creating the folder when it is not there.
 *
 * @param   {GoogleAppsScript.Drive.Folder} parent - The folder to look inside.
 * @param   {string} name - The name of the child folder.
 * @returns {GoogleAppsScript.Drive.Folder} The existing or newly created folder.
 * @throws  {@link IllegalStateException} If `parent` holds more than one folder of that name.
 */
function resolveChild(
  parent: GoogleAppsScript.Drive.Folder,
  name: string
): GoogleAppsScript.Drive.Folder {
  const matches: GoogleAppsScript.Drive.FolderIterator = parent.getFoldersByName(name);

  if (!matches.hasNext()) {
    return parent.createFolder(name);
  }

  const found: GoogleAppsScript.Drive.Folder = matches.next();

  if (matches.hasNext()) {
    const parentName: string = parent.getName();

    throw new IllegalStateException(
      `More than one folder named "${name}" in "${parentName}": the path is ambiguous.`
    );
  }

  return found;
}

/**
 * Creates a nested folder structure from a path, reusing the folders that are
 * already there.
 *
 * The path is POSIX-like: segments are separated by `/`, and leading, trailing
 * and doubled separators are ignored, so `"/a//b/"` and `"a/b"` mean the same
 * thing.
 *
 * **Drive allows several folders with the same name in the same parent**, so
 * "does this folder exist" has no single answer. Rather than silently pick
 * one — which eventually writes files into the wrong place — this throws when
 * a level is ambiguous. Each level is looked up once, so a deep path costs one
 * query per segment and no more.
 *
 * @example
 * ```javascript
 * createFolder("Reports/2024/Q1");            // => the Q1 folder, creating what is missing
 * createFolder("Q1", DriveApp.getFolderById(id)); // => the Q1 folder under that parent
 * createFolder("/Reports//2024/");            // => the same as "Reports/2024"
 * ```
 *
 * @param       {string} path - The folder path to create, relative to `rootFolder`.
 * @param       {GoogleAppsScript.Drive.Folder} [rootFolder] - The folder to start from. Defaults to the Drive root.
 * @returns     {GoogleAppsScript.Drive.Folder} The folder named by the last segment of the path.
 * @throws      {@link EmptyStringException} If `path` is not a non-empty string.
 * @throws      {@link IllegalStateException} If `path` names no segments, or if any level is ambiguous.
 * @see         [Class Folder](https://developers.google.com/apps-script/reference/drive/folder)
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function createFolder(
  path: string,
  rootFolder?: GoogleAppsScript.Drive.Folder
): GoogleAppsScript.Drive.Folder {
  requireNonEmptyString(path);

  const segments: string[] = path.split("/").filter((segment: string): boolean => segment !== "");

  if (segments.length === 0) {
    throw new IllegalStateException("Expected a path naming at least one folder.");
  }

  let current: GoogleAppsScript.Drive.Folder = rootFolder ?? DriveApp.getRootFolder();

  for (const name of segments) {
    current = resolveChild(current, name);
  }

  return current;
}

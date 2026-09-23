import { isAdmin } from "./isAdmin";

/**
 * Checks if the current user is NOT an administrator of the Google Workspace domain.
 *
 * **Note:** Requires the [Admin SDK Directory Service](https://developers.google.cn/apps-script/advanced/admin-sdk-directory) to be enabled.
 *
 * Reports `true` in two different situations: the user genuinely is not an
 * administrator, and the Directory Service could not be reached. {@link isAdmin}
 * treats both as "not an administrator" — it logs the failure and returns
 * `false` — so a `true` here is not by itself proof of a non-administrator.
 *
 * @example
 * ```javascript
 * if (nonAdmin()) {
 *   return;
 * }
 * ```
 *
 * @returns     {boolean} `true` if the user is not an administrator; otherwise, `false`.
 * @see         {@link isAdmin}
 * @see         [Admin SDK Directory Service](https://developers.google.cn/apps-script/advanced/admin-sdk-directory)
 * @see         [nonAdmin on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonadmin.html)
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function nonAdmin(): boolean {
  return !isAdmin();
}

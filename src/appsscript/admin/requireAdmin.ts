import { AuthorizationException } from "../../exception";
import { isAdmin } from "./isAdmin";

/**
 * Ensures that the current user is an administrator of the Google Workspace
 * domain, throwing an exception otherwise.
 *
 * **Note:** Requires the [Admin SDK Directory Service](https://developers.google.cn/apps-script/advanced/admin-sdk-directory) to be enabled.
 *
 * The guard at the top of an administrator-only entry point, where the
 * alternative is an `if` that someone eventually forgets to write.
 *
 * Throws in two situations that {@link isAdmin} cannot tell apart: the user is
 * not an administrator, and the Directory Service could not be reached. Both
 * mean the action must not proceed, so failing closed is the correct outcome —
 * but the message cannot say which it was, and the reason is written to the
 * console by `isAdmin`.
 *
 * @example
 * ```javascript
 * function deleteAllUsers() {
 *   requireAdmin("Only a domain administrator may run this.");
 *   ...
 * }
 * ```
 *
 * @param       {string} [message="The current user is not authorized to perform this action."] - Optional custom error message if the validation fails.
 * @returns     {void}
 * @throws      {@link AuthorizationException} If the current user is not an administrator.
 * @see         {@link isAdmin}
 * @see         {@link nonAdmin}
 * @see         [Admin SDK Directory Service](https://developers.google.cn/apps-script/advanced/admin-sdk-directory)
 * @see         [requireAdmin on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireAdmin.html)
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function requireAdmin(message?: string): void {
  if (!isAdmin()) {
    throw new AuthorizationException(message);
  }
}

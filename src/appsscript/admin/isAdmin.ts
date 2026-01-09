import { AdminDirectoryException } from "../../exception";
import { nonFunction } from "../../lang";

/**
 * ## isAdmin
 *
 * Checks if the current user is an administrator of the Google Workspace domain.
 *
 * **Note:** Requires the [Admin SDK Directory Service](https://developers.google.cn/apps-script/advanced/admin-sdk-directory) to be enabled.
 *
 * @returns     `true` if the user is an administrator; otherwise, `false`.
 * @see         <a href="https://developers.google.com/apps-script/reference/base/user"><code>User</code></a>
 * @see         [Admin SDK Directory Service](https://developers.google.cn/apps-script/advanced/admin-sdk-directory)
 * @since       1.5.0
 * @version     1.1.0
 * @environment `Google Apps Script`
 */
export function isAdmin(): boolean {
  try {
    if (nonFunction(AdminDirectory?.Users?.get)) {
      throw new AdminDirectoryException();
    }

    const email = Session.getActiveUser().getEmail();
    const user = AdminDirectory.Users.get(email);

    return !!user.isAdmin;
  } catch (err: unknown) {
    console.warn(`[Error]: ${err}`);
  }

  return false;
}

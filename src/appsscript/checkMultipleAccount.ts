import { requireValidEmail } from "../base";

/**
 * If the user is logged into multiple accounts in the same browser session, `google.script.run` might execute under a different account than the one that initiated the UI display.
 *
 * @param       email - The email address of the account that initiated the display of the user interface.
 * @returns     `true` if the initiating account's email does not match the effective user's email, indicating a multi-account conflict; `false` otherwise.
 * @environment `Google Apps Script`
 */
export function checkMultipleAccount(email: string): boolean {
  return (
    requireValidEmail(
      email?.toLowerCase(),
      "The initiator's email address format is invalid."
    ) !==
    requireValidEmail(
      Session?.getEffectiveUser()?.getEmail()?.toLowerCase(),
      "The effective script user's email address format is invalid."
    )
  );
}

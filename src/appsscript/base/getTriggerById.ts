import { requireNonEmptyString } from "../../lang";

/**
 * Retrieves a project trigger by its unique id.
 *
 * <a href="https://developers.google.com/apps-script/reference/script/script-app#getprojecttriggers"><code>ScriptApp.getProjectTriggers</code></a>
 * offers no lookup by id, so finding one means scanning the whole array — and
 * that call is billed against the script's quota, which matters when the
 * lookup sits inside a loop. This makes exactly one such call per invocation.
 *
 * @example
 * ```javascript
 * const trigger = getTriggerById(properties.getProperty("triggerId"));
 *
 * if (trigger) {
 *   ScriptApp.deleteTrigger(trigger);
 * }
 * ```
 *
 * @param       {string} id - The unique id of the trigger to retrieve.
 * @returns     {GoogleAppsScript.Script.Trigger | null} The trigger if the project has one with that id, otherwise `null`.
 * @throws      {@link EmptyStringException} If `id` is not a non-empty string. Whitespace alone counts as empty.
 * @see         [Class Trigger](https://developers.google.com/apps-script/reference/script/trigger)
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function getTriggerById(id: string): GoogleAppsScript.Script.Trigger | null {
  requireNonEmptyString(id);

  const triggers: GoogleAppsScript.Script.Trigger[] = ScriptApp.getProjectTriggers();

  for (const trigger of triggers) {
    if (trigger.getUniqueId() === id) {
      return trigger;
    }
  }

  return null;
}

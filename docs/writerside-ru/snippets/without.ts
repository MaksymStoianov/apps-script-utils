import { without } from "apps-script-utils";

/**
 * Hides the internal columns from a header row before it is shown to a user.
 */
export function visibleHeader(header: string[]): string[] {
  return without(header, "internalNote", "_rowHash");
}

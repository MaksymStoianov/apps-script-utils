import { ServiceIsNotDefinedException } from "../exception";

/**
 * Ensures that a service is defined.
 *
 * @example
 * ```javascript
 * // An advanced service is a global that only exists once it has been enabled.
 * const directory = requireService(AdminDirectory, "Enable the Admin SDK service.");
 * ```
 *
 * @param {T | null | undefined} service The service object to check.
 * @param {string} [message="Service is not defined."] The error message to throw if the service is not defined.
 * @returns {T} The service object.
 * @throws {ServiceIsNotDefinedException} If the service is null or undefined.
 * @see [requireService on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireservice.html)
 * @since 1.5.0
 * @template T
 */
export function requireService<T>(
  service: T | null | undefined,
  message: string = "Service is not defined."
): T {
  if (service === null || service === undefined) {
    throw new ServiceIsNotDefinedException(message);
  }

  return service;
}

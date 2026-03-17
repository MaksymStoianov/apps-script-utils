import { RepositoryIsNotDefinedException } from "@/exception";

/**
 * Ensures that a repository is defined.
 *
 * @param {T | null | undefined} repository The repository object to check.
 * @param {string} [message="Repository is not defined."] The error message to throw if the repository is not defined.
 * @returns {T} The repository object.
 * @throws {RepositoryIsNotDefinedException} If the repository is null or undefined.
 * @since 1.5.0
 * @template T
 */
export function requireRepository<T>(
  repository: T | null | undefined,
  message: string = "Repository is not defined."
): T {
  if (repository === null || repository === undefined) {
    throw new RepositoryIsNotDefinedException(message);
  }

  return repository;
}

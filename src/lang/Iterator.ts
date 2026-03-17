/**
 * Interface for navigating through a collection, where backward navigation is optional.
 *
 * @interface
 * @template  T - type of elements in the collection.
 * @since     1.0.0
 * @version   1.0.0
 */
export interface Iterator<T> {

  /**
   * Gets the index of the current position in the collection.
   *
   * @returns The current index.
   */
  index?(): number;

  /**
   * Moves the iterator to the specified index.
   *
   * @param  {number} index - the index to move to.
   * @throws {@link RangeError} If the index is out of bounds.
   */
  moveTo?(index: number): void;

  /**
   * Moves to and retrieves the next element in the collection.
   *
   * @returns {T} The next element.
   * @throws  {@link Error} If there is no next element.
   */
  next(): T;

  /**
   * Gets the index of the next position in the collection.
   *
   * @returns {number} The index of the next element.
   */
  nextIndex?(): number;

  /**
   * Moves to and retrieves the previous element in the collection.
   *
   * @returns {T} The previous element.
   * @throws  {@link Error} If there is no previous element.
   */
  previous?(): T;

  /**
   * Gets the index of the previous position in the collection.
   *
   * @returns {number} The index of the previous element.
   */
  previousIndex?(): number;

  /**
   * Gets the total number of elements in the collection.
   *
   * @returns {number} The total element count.
   */
  size?(): number;

  /**
   * Checks if a next element exists in the collection.
   *
   * @returns {boolean} `true` if there is a next element, otherwise `false`.
   */
  hasNext(): boolean;

  /**
   * Checks if a previous element exists in the collection.
   *
   * @returns {boolean} `true` if there is a previous element, otherwise `false`.
   */
  hasPrevious?(): boolean;

  /**
   * Resets the iterator to the last element of the collection.
   */
  toEnd?(): void;

  /**
   * Resets the iterator to the first element of the collection.
   */
  toStart?(): void;
}

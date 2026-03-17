import { hashCode } from "./index";

/**
 * Abstract base class providing fundamental functionality for subclasses.
 * Intended to be extended by other classes.
 *
 * @abstract
 * @class    Class
 * @since    1.0.0
 * @version  1.0.0
 */
export abstract class Class {
  /**
   * Getter to retrieve a string representing the class instance tag.
   * Used in `Object.prototype.toString`.
   *
   * @returns The tag string.
   */
  get [Symbol.toStringTag](): string {
    return this.constructor.name;
  }

  /**
   * Creates a shallow copy of the current instance.
   *
   * __Note__ that the constructor is not called.
   *
   * @returns A new instance with the same properties as the original.
   */
  clone(): this {
    const proto = Object.getPrototypeOf(this);

    const result = Object.create(proto);

    Object.assign(result, this);

    return result;
  }

  /**
   * Checks if this object is equivalent to another.
   *
   * @param input The object to compare.
   * @returns
   *  - `true` if the objects are equivalent,
   *  - `false` otherwise.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  equals(input: any): boolean {
    if (this === input) {
      return true;
    }

    if (input === null || this.constructor !== input.constructor) {
      return false;
    }

    if (Object.keys(this).length !== Object.keys(input).length) {
      return false;
    }

    return this.hashCode() === hashCode(input);
  }

  /**
   * Calculates a hash code for the current instance of the class.
   *
   * @returns The calculated hash code for the instance.
   */
  hashCode(): number {
    return hashCode(this);
  }

  /**
   * Returns a plain object with the properties of the current instance.
   *
   * @returns {object} A plain object of the current instance's properties.
   */
  valueOf(): object {
    const result: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
    } = {};

    for (const key of Object.keys(this)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result[key] = (this as any)[key];
    }

    return result;
  }

  /**
   * Returns a string representing the current instance of the class.
   * Intended to be overridden by subclasses for locale-specific purposes.
   *
   * @returns A string representation of the current instance.
   */
  toLocaleString(): string {
    return this.constructor.name;
  }

  /**
   * Returns a string representing the current instance of the class.
   *
   * @returns A string representation of the current instance.
   */
  toString(): string {
    return this.constructor.name;
  }

  /**
   * Called when an instance of a class is converted to a primitive value.
   *
   * @param [hint] Desired primitive type:
   *  - `string`
   *  - `number`
   *  - `default`
   * @returns The primitive value.
   */
  [Symbol.toPrimitive](
    hint: "string" | "number" | "default" | undefined = "default"
  ): string | number {
    return hint === "number" ? this.hashCode() : this.constructor.name;
  }
}

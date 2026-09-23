/**
 * Enum representing `Object#toString` result references in uppercase.
 * Provides a standardized way to identify object types.
 *
 * @example
 * ```javascript
 * objectToString([]) === ObjectTag.ARRAY; // => true
 * objectToString(null) === ObjectTag.NULL; // => true
 * ```
 *
 * @enum
 * @since   1.0.0
 * @version 1.0.0
 */
export enum ObjectTag {
  ARGUMENTS = "[object Arguments]",
  ARRAY = "[object Array]",
  ASYNC_FUNCTION = "[object AsyncFunction]",
  ASYNC_GENERATOR_FUNCTION = "[object AsyncGeneratorFunction]",
  BOOLEAN = "[object Boolean]",
  DATE = "[object Date]",
  DOM_EXCEPTION = "[object DOMException]",
  ERROR = "[object Error]",
  FUNCTION = "[object Function]",
  GENERATOR_FUNCTION = "[object GeneratorFunction]",
  MAP = "[object Map]",
  NUMBER = "[object Number]",
  NULL = "[object Null]",
  OBJECT = "[object Object]",
  PROMISE = "[object Promise]",
  PROXY = "[object Proxy]",
  REG_EXP = "[object RegExp]",
  SET = "[object Set]",
  STRING = "[object String]",
  SYMBOL = "[object Symbol]",
  UNDEFINED = "[object Undefined]",
  WEAK_MAP = "[object WeakMap]",
  WEAK_SET = "[object WeakSet]",

  ARRAY_BUFFER = "[object ArrayBuffer]",
  DATA_VIEW = "[object DataView]",
  FLOAT_32_ARRAY = "[object Float32Array]",
  FLOAT_64_ARRAY = "[object Float64Array]",
  INT_8_ARRAY = "[object Int8Array]",
  INT_16_ARRAY = "[object Int16Array]",
  INT_32_ARRAY = "[object Int32Array]",
  UINT_8_ARRAY = "[object Uint8Array]",
  UINT_8_CLAMPED_ARRAY = "[object Uint8ClampedArray]",
  UINT_16_ARRAY = "[object Uint16Array]",
  UINT_32_ARRAY = "[object Uint32Array]"
}

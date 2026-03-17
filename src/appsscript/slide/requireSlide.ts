import { SlideNotFoundException } from "@/exception";
import { isSlide } from "./isSlide";

/**
 * Ensures that the given value is a {@link GoogleAppsScript.Slides.Slide|Slide} object.
 *
 * @param {unknown} value The value to check.
 * @param {string} [message="Required Slide context is missing or invalid."] The error message to throw if the value is not a {@link GoogleAppsScript.Slides.Slide|Slide}.
 * @returns {GoogleAppsScript.Slides.Slide} The {@link GoogleAppsScript.Slides.Slide|Slide} object.
 * @throws {SlideNotFoundException} If the value is not a {@link GoogleAppsScript.Slides.Slide|Slide}.
 * @since 1.5.0
 */
export function requireSlide(
  value: unknown,
  message: string = "Required Slide context is missing or invalid."
): GoogleAppsScript.Slides.Slide {
  if (!isSlide(value)) {
    throw new SlideNotFoundException(message);
  }

  return value;
}

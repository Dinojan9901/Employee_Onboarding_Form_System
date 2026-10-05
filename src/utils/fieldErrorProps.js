/**
 * Accessibility attributes for an input that may have a validation error.
 * Links the input to its error message (rendered with id `${name}-error`) so screen
 * readers announce the message when the field receives focus.
 *
 * @param {Object} errors - react-hook-form errors object
 * @param {string} name - The field name
 * @returns {Object} Props to spread onto the input
 */
export const fieldErrorProps = (errors, name) => ({
  'aria-invalid': Boolean(errors[name]),
  'aria-describedby': errors[name] ? `${name}-error` : undefined,
});

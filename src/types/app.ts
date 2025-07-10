// -----------------------------------------------------------------------------
// src/types/app.ts
//
// App Type Definitions
// -----------------------------------------------------------------------------
// Purpose:
// - Centralizes shared TypeScript interfaces and types used across the app.
//
// Features:
// - Defines the IOption interface for select/radio/checkbox options.
// - Defines the IFormField interface for dynamic form field configuration.
// - Defines the IFormFieldsVariables interface for form field variable usage.
//
// Usage:
//   Import these types in forms, UI components, and utilities to ensure type safety
//   and consistency when building dynamic forms or handling form data.
//
// Best Practices:
// - Keep all shared types and interfaces in a dedicated types directory.
// - Extend interfaces as needed for new form field types or options.
// -----------------------------------------------------------------------------

export interface IOption {
  label: string; // The display label of the option
  value: string; // The actual value of the option
}

export interface IFormField {
  name: string; // The name of the form field, used for form data submission
  label?: string; // The label of the form field, displayed to the user
  type:
    | "text" // Plain text input
    | "email" // Email input, validates email format
    | "password" // Password input, hides user input
    | "number" // Numeric input, allows only numbers
    | "date" // Date input, allows date selection
    | "time" // Time input, allows time selection
    | "datetime-local" // Date and time input, allows both to be set
    | "checkbox" // Checkbox input, allows boolean values
    | "radio" // Radio button input, allows selection of one option from many
    | "select" // Dropdown select input
    | "hidden" // Hidden input, not displayed to the user
    | "textarea"; // Multi-line text input
  placeholder?: string; // Placeholder text displayed when the field is empty
  disabled?: boolean; // If true, the field is disabled and not editable
  autoFocus?: boolean; // If true, the field receives focus automatically
  options?: IOption; // Options for select, radio, or checkbox types
  id?: string; // The id of the form field, used for label association and form data
  defaultValue?: string; // The default value of the form field
  readOnly?: boolean; // If true, the field is read-only and cannot be edited
}

export interface IFormFieldsVariables {
  slug: string; // A variable used in form field rendering or submission
}
// -----------------------------------------------------------------------------
// Note:
// - Use these interfaces to drive dynamic form rendering and validation logic.
// - The IFormField interface can be extended for custom field types or validation rules.
// -----------------------------------------------------------------------------

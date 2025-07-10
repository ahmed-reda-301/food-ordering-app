// -----------------------------------------------------------------------------
// src/components/form-fields/text-field.tsx
//
// TextField Component
// -----------------------------------------------------------------------------
// Purpose:
// - Renders a reusable text-based input field for forms (text, email, number, etc).
//
// Features:
// - Supports all standard input props (type, placeholder, disabled, autofocus, etc).
// - Displays a label and error message if validation fails.
// - Integrates with form validation logic via the error prop.
//
// Usage:
//   <TextField {...fieldProps} error={formErrors} />
//   Used in dynamic forms for login, signup, profile, admin, etc.
//
// Best Practices:
// - Use for all single-line text-based fields to ensure consistent UI/UX.
// - Pass localized labels/placeholders for i18n support.
// -----------------------------------------------------------------------------

import { IFormField } from "@/types/app";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
// import { ValidationErrors } from "@/validations/auth";

// interface Props extends IFormField {
//   error: ValidationErrors;
// }

const TextField = ({
  label,
  name,
  type,
  placeholder,
  disabled,
  autoFocus,
  error,
  defaultValue,
  readOnly,
}: Props) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="capitalize text-black mb-2">
        {label}
      </Label>
      <Input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        name={name}
        id={name}
        defaultValue={defaultValue}
        readOnly={readOnly}
      />
      {error && error[name] && (
        <p
          className={`text-accent mt-2 text-sm font-medium ${
            error[name] ? "text-destructive" : ""
          }`}
        >
          {error[name]}
        </p>
      )}
    </div>
  );
};

export default TextField;
// -----------------------------------------------------------------------------
// Note:
// - Extend this component for custom input types or additional validation logic.
// -----------------------------------------------------------------------------

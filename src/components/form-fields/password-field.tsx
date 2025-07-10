// -----------------------------------------------------------------------------
// src/components/form-fields/password-field.tsx
//
// PasswordField Component
// -----------------------------------------------------------------------------
// Purpose:
// - Renders a reusable password input field with optional show/hide toggle.
//
// Features:
// - Supports label, placeholder, disabled, autofocus, and error display.
// - Optionally allows toggling password visibility for better UX.
// - Integrates with form validation logic via the error prop.
//
// Usage:
//   <PasswordField {...fieldProps} error={formErrors} />
//   Used in forms for password and confirm password fields.
//
// Best Practices:
// - Use for all password fields to ensure consistent UI/UX and security.
// - Pass localized labels/placeholders for i18n support.
// -----------------------------------------------------------------------------
// Note:
// - Extend this component for custom password rules or strength indicators.
// -----------------------------------------------------------------------------

import { IFormField } from "@/types/app";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { ValidationErrors } from "@/validations/auth";
import { useParams } from "next/navigation";
import { Languages } from "@/constants/enums";

interface Props extends IFormField {
  error: ValidationErrors;
}
interface IState {
  showPassword: boolean;
}

const INITIAL_STATE: IState = { showPassword: false };

const PasswordField = ({
  label,
  name,
  placeholder,
  disabled,
  autoFocus,
  error,
  defaultValue,
}: Props) => {
  const [state, setState] = useState(INITIAL_STATE);
  const { showPassword } = state;
  const { locale } = useParams();
  const handleClickShowPassword = () =>
    setState((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="capitalize text-black">
        {label}
      </Label>
      <div className="relative flex items-center">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          autoComplete="off"
          name={name}
          id={name}
          defaultValue={defaultValue}
        />

        <button
          type="button"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          className={`absolute ${
            locale === Languages.ARABIC ? "left-3" : "right-3"
          }`}
        >
          {showPassword ? (
            <EyeOffIcon className="h-4 w-4" />
          ) : (
            <EyeIcon className="h-4 w-4" />
          )}
        </button>
      </div>
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

export default PasswordField;

// -----------------------------------------------------------------------------
// src/components/form-fields/checkbox.tsx
//
// Checkbox Component
// -----------------------------------------------------------------------------
// Purpose:
// - Renders a reusable checkbox input for forms.
//
// Features:
// - Supports label, checked/unchecked state, and error display.
// - Integrates with form validation and dynamic form rendering.
//
// Usage:
//   <Checkbox {...fieldProps} error={formErrors} />
//   Used in forms where boolean input is required (e.g., terms agreement).
//
// Best Practices:
// - Use for all boolean fields to ensure consistent UI/UX.
// - Pass localized labels for i18n support.
// -----------------------------------------------------------------------------
// Note:
// - Extend this component for custom checkbox styles or additional logic.
// -----------------------------------------------------------------------------

import { IFormField } from "@/types/app";
import { Label } from "../ui/label";
import { Checkbox as ShadcnCheckbox } from "../ui/checkbox";

interface Props {
  onClick?: () => void;
  checked: boolean;
  label: IFormField["label"];
  name: IFormField["name"];
}

const Checkbox = ({ label, name, checked, onClick }: Props) => {
  return (
    <div className="text-accent flex items-center gap-2">
      <ShadcnCheckbox
        type="button"
        id={name}
        name={name}
        onClick={onClick}
        checked={checked}
      />
      <Label htmlFor={name} className="text-sm font-normal">
        {label}
      </Label>
    </div>
  );
};

export default Checkbox;

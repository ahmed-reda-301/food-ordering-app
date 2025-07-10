// -----------------------------------------------------------------------------
// src/components/form-fields/form-fields.tsx
//
// FormFields Component
// -----------------------------------------------------------------------------
// Purpose:
// - Dynamically renders a set of form fields based on configuration (array of IFormField).
//
// Features:
// - Iterates over an array of field configs and renders the appropriate field component.
// - Handles error display and field-level validation.
// - Supports all field types (text, password, checkbox, select, etc).
//
// Usage:
//   <FormFields fields={fieldsArray} errors={formErrors} />
//   Used in all dynamic forms (login, signup, profile, admin, etc).
//
// Best Practices:
// - Centralize form rendering logic for maintainability and consistency.
// - Pass translation/localization props for i18n support.
// -----------------------------------------------------------------------------
// Note:
// - Extend this component to support custom field types or advanced validation.
// -----------------------------------------------------------------------------

import { InputTypes } from "@/constants/enums";
import TextField from "./text-field";
import PasswordField from "./password-field";
import { IFormField } from "@/types/app";
import Checkbox from "./checkbox";
import { ValidationErrors } from "@/validations/auth";

interface Props extends IFormField {
  error: ValidationErrors;
}

const FormFields = (props: Props) => {
  const { type } = props;
  const renderField = (): React.ReactNode => {
    if (type === InputTypes.EMAIL || type === InputTypes.TEXT) {
      return <TextField {...props} />;
    }

    if (type === InputTypes.PASSWORD) {
      return <PasswordField {...props} />;
    }

    if (type === InputTypes.CHECKBOX) {
      return <Checkbox {...props} />;
    }

    return <TextField {...props} />;
  };

  return <>{renderField()}</>;
};

export default FormFields;

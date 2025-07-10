// -----------------------------------------------------------------------------
// src/hooks/useFormFields.ts
//
// useFormFields Custom Hook
// -----------------------------------------------------------------------------
// Purpose:
// - Provides a centralized way to generate dynamic form field configurations for
//   authentication, profile, and admin product forms based on the current page/route.
//
// Features:
// - Returns the correct array of IFormField objects for login, signup, profile, or admin product forms.
// - Uses translation objects to localize all field labels and placeholders.
// - Supports extensibility for new forms by adding new field generators and cases.
//
// Usage:
//   const { getFormFields } = useFormFields({ slug, translations });
//   const fields = getFormFields();
//   Used in form components to render fields dynamically based on the current page.
//
// Best Practices:
// - Centralize all form field definitions for maintainability and consistency.
// - Use translation objects to ensure all UI text is localized.
// - Extend with new field generators as new forms are added to the app.
// -----------------------------------------------------------------------------

import { Pages, Routes } from "@/constants/enums";
import { IFormField, IFormFieldsVariables } from "@/types/app";
import { Translations } from "@/types/translations";

interface Props extends IFormFieldsVariables {
  translations: Translations;
}

const useFormFields = ({ slug, translations }: Props) => {
  // Returns fields for the login form
  const loginFields = (): IFormField[] => [
    {
      label: translations.auth.login.email.label,
      name: "email",
      type: "email",
      placeholder: translations.auth.login.email.placeholder,
      autoFocus: true,
    },
    {
      label: translations.auth.login.password.label,
      name: "password",
      placeholder: translations.auth.login.password.placeholder,
      type: "password",
    },
  ];
  // Returns fields for the signup/registration form
  const signupFields = (): IFormField[] => [
    {
      label: translations.auth.register.name.label,
      name: "name",
      type: "text",
      placeholder: translations.auth.register.name.placeholder,
      autoFocus: true,
    },
    {
      label: translations.auth.register.email.label,
      name: "email",
      type: "email",
      placeholder: translations.auth.register.email.placeholder,
    },
    {
      label: translations.auth.register.password.label,
      name: "password",
      type: "password",
      placeholder: translations.auth.register.password.placeholder,
    },
    {
      label: translations.auth.register.confirmPassword.label,
      name: "confirmPassword",
      type: "password",
      placeholder: translations.auth.register.confirmPassword.placeholder,
    },
  ];
  // Returns fields for the user profile form
  const profileFields = (): IFormField[] => [
    {
      label: translations.profile.form.name.label,
      name: "name",
      type: "text",
      placeholder: translations.profile.form.name.placeholder,
      autoFocus: true,
    },
    {
      label: translations.profile.form.email.label,
      name: "email",
      type: "email",
      placeholder: translations.profile.form.email.placeholder,
    },
    {
      label: translations.profile.form.phone.label,
      name: "phone",
      type: "text",
      placeholder: translations.profile.form.phone.placeholder,
    },
    {
      label: translations.profile.form.address.label,
      name: "streetAddress",
      type: "text",
      placeholder: translations.profile.form.address.placeholder,
    },
    {
      label: translations.profile.form.postalCode.label,
      name: "postalCode",
      type: "text",
      placeholder: translations.profile.form.postalCode.placeholder,
    },
    {
      label: translations.profile.form.city.label,
      name: "city",
      type: "text",
      placeholder: translations.profile.form.city.placeholder,
    },
    {
      label: translations.profile.form.country.label,
      name: "country",
      type: "text",
      placeholder: translations.profile.form.country.placeholder,
    },
  ];
  // Returns fields for the admin add/edit product form
  const addProductFields = (): IFormField[] => [
    {
      label: translations.admin["menu-items"].form.name.label,
      name: "name",
      type: "text",
      placeholder: translations.admin["menu-items"].form.name.placeholder,
      autoFocus: true,
    },
    {
      label: translations.admin["menu-items"].form.description.label,
      name: "description",
      type: "text",
      placeholder:
        translations.admin["menu-items"].form.description.placeholder,
    },
    {
      label: translations.admin["menu-items"].form.basePrice.label,
      name: "basePrice",
      type: "text",
      placeholder: translations.admin["menu-items"].form.basePrice.placeholder,
    },
  ];
  // Returns the correct form fields array based on the current slug (page/route)
  const getFormFields = (): IFormField[] => {
    switch (slug) {
      case Pages.LOGIN:
        return loginFields();
      case Pages.Register:
        return signupFields();
      case Routes.PROFILE:
        return profileFields();
      case `${Routes.ADMIN}/${Pages.MENU_ITEMS}`:
        return addProductFields();
      default:
        return [];
    }
  };
  return {
    getFormFields,
  };
};

export default useFormFields;
// -----------------------------------------------------------------------------
// Note:
// - This hook enables dynamic, localized form rendering for multiple app sections.
// - Add new field generators and cases to support more forms as the app grows.
// -----------------------------------------------------------------------------

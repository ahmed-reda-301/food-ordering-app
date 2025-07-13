/**
 * Category Form Component
 * -----------------------
 * Renders a form for adding new categories in the admin dashboard.
 * - Handles form submission and validation using addCategory action and schema.
 * - Displays validation errors and success messages using toast notifications.
 * - i18n-ready: Uses translations prop for all labels, placeholders, and messages.
 *
 * Props:
 *   - translations: Translations object for the current locale.
 *
 * Usage:
 *   <Form translations={translations} />
 *
 * Best Practices:
 *   - Keep form fields and validation logic in sync with backend requirements.
 *   - Ensure all UI text is translated for supported locales.
 */

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loader from "@/components/ui/loader";
import { toast } from "sonner";
import { Translations } from "@/types/translations";
import { ValidationError } from "next/dist/compiled/amphtml-validator";
import { useActionState, useEffect } from "react";
import { addCategory } from "../_actions/category";

type InitialStateType = {
  message?: string;
  error?: ValidationError;
  status?: number | null;
};
const initialState: InitialStateType = {
  message: "",
  error: {},
  status: null,
};
function Form({ translations }: { translations: Translations }) {
  const [state, action, pending] = useActionState(addCategory, initialState);

  useEffect(() => {
    if (state.message) {
    //   toast({
    //     title: state.message,
    //     className: state.status === 201 ? "text-green-400" : "text-destructive",
    //   });
      toast(state.message, {
        className: state.status === 201 ? "text-green-400" : "text-destructive",
      });
        
    }
  }, [state.message, state.status]);

  return (
    <form action={action}>
      <div className="space-y-2">
        <Label htmlFor="name">
          {translations.admin.categories.form.name.label}
        </Label>
        <div className="flex items-center gap-4">
          <Input
            type="text"
            name="name"
            id="name"
            placeholder={translations.admin.categories.form.name.placeholder}
          />
          <Button type="submit" size="lg" disabled={pending}>
            {pending ? <Loader /> : translations.create}
          </Button>
        </div>
        {state.error?.name && (
          <p className="text-sm text-destructive">{state.error.name}</p>
        )}
      </div>
    </form>
  );
}

export default Form;
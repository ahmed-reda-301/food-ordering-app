// -----------------------------------------------------------------------------
// src/app/[locale]/auth/signin/_components/Form.tsx
//
// Signin Form Component
// -----------------------------------------------------------------------------
// Purpose:
// - Renders the login form for user authentication with localized content.
//
// Features:
// - Handles form submission and validation for user login.
// - Displays dynamic form fields and error messages.
// - Shows loading state and disables submit button during authentication.
// - Integrates with NextAuth for credential-based login.
// - Uses Sonner toast notifications for feedback (success/error).
//
// Usage:
//   <Form translations={translations} />
//   Used in the /[locale]/auth/signin page.
//
// Best Practices:
// - Pass all translations and field configs for i18n and flexibility.
// - Use consistent error handling and feedback for better UX.
// -----------------------------------------------------------------------------

"use client";

import FormFields from "@/components/form-fields/form-fields";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Pages, Routes } from "@/constants/enums";
import { toast } from "sonner";
import useFormFields from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";
import { Translations } from "@/types/translations";
import { signIn } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";

function Form({ translations }: { translations: Translations }) {
  const router = useRouter();
  const { locale } = useParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { getFormFields } = useFormFields({
    slug: Pages.LOGIN,
    translations,
  });
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.error) {
        const validationError = JSON.parse(res?.error).validationError;
        setError(validationError);
        const responseError = JSON.parse(res?.error).responseError;
        if (responseError) {
          // toast({
          //   title: responseError,
          //   className: "text-destructive",
          // });
          toast.error(responseError, {
            className: "text-destructive",
          });
        }
      }
      if (res?.ok) {
        // toast({
        //   title: translations.messages.loginSuccessful,
        //   className: "text-green-400",
        // });
        toast.info(translations.messages.loginSuccessful, {
          className: "text-green-400",
        });

        router.replace(`/${locale}/${Routes.PROFILE}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={onSubmit} ref={formRef}>
      {getFormFields().map((field: IFormField) => (
        <div key={field.name} className="mb-3">
          <FormFields {...field} error={error} />
        </div>
      ))}
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? <Loader /> : translations.auth.login.submit}
      </Button>
    </form>
  );
}

export default Form;

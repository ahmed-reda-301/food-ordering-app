// -----------------------------------------------------------------------------
// src/components/edit-user-form/index.tsx
//
// EditUserForm Component
// -----------------------------------------------------------------------------
// Purpose:
//   Provides a user profile editing form with support for image upload, i18n, and admin controls.
//
// Features:
//   - Displays and allows editing of user profile fields (name, email, etc.)
//   - Supports image upload and preview for user avatar.
//   - Handles form state, validation, and submission using custom hooks and server actions.
//   - Shows validation errors and success messages via toast notifications.
//   - Supports admin role toggle (for admins only).
//   - Integrates with i18n for field labels and button text.
//   - Uses SSR/CSR session data for secure and consistent user state.
//
// Usage:
//   <EditUserForm user={session.user} translations={translations} />
//   Used in profile and admin pages for user management.
//
// Best Practices:
//   - Use FormData for flexible field handling and file uploads.
//   - Keep form fields and validation logic modular via hooks and types.
//   - Use React state for image preview and admin toggle.
//   - Always validate and sanitize user input on both client and server.
// -----------------------------------------------------------------------------

"use client";
import { InputTypes, Routes } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";
import { Translations } from "@/types/translations";
import { Session } from "next-auth";
import Image from "next/image";
import FormFields from "../form-fields/form-fields";
import { Button } from "../ui/button";
import { UserRole } from "@prisma/client";
import Checkbox from "../form-fields/checkbox";
import { useActionState, useEffect, useState } from "react";
import { ValidationErrors } from "@/validations/auth";
import { updateProfile } from "./_actions/profile";
import Loader from "../ui/loader";
import { CameraIcon } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

function EditUserForm({
  translations,
  user,
}: {
  translations: Translations;
  user: Session["user"];
}) {
  const session = useSession();
  const formData = new FormData();
  Object.entries(user).forEach(([key, value]) => {
    if (value !== null && value !== undefined && key !== "image") {
      formData.append(key, value.toString());
    }
  });

  const initialState: {
    message?: string;
    error?: ValidationErrors;
    status?: number | null;
    formData?: FormData | null;
  } = {
    message: "",
    error: {},
    status: null,
    formData,
  };
  const [selectedImage, setSelectedImage] = useState(user.image ?? "");
  const [isAdmin, setIsAdmin] = useState(user.role === UserRole.ADMIN);

  const [state, action, pending] = useActionState(
    updateProfile.bind(null, isAdmin),
    initialState
  );
  const { getFormFields } = useFormFields({
    slug: Routes.PROFILE,
    translations,
  });

  useEffect(() => {
    if (state.message && state.status && !pending) {
      //   toast({
      //     title: state.message,
      //     className: state.status === 200 ? "text-green-400" : "text-destructive",
      //   });
      toast(state.message, {
        className: state.status === 200 ? "text-green-400" : "text-destructive",
      });
    }
  }, [pending, state.message, state.status]);

  useEffect(() => {
    setSelectedImage(user.image as string);
  }, [user.image]);

  return (
    <form action={action} className="flex flex-col md:flex-row gap-10">
      <div className="group relative w-[200px] h-[200px] overflow-hidden rounded-full mx-auto">
        {selectedImage && (
          <Image
            src={selectedImage}
            alt={user.name}
            width={200}
            height={200}
            className="rounded-full object-cover"
          />
        )}

        <div
          className={`${
            selectedImage
              ? "group-hover:opacity-[1] opacity-0  transition-opacity duration-200"
              : ""
          } absolute top-0 left-0 w-full h-full bg-gray-50/40`}
        >
          <UploadImage setSelectedImage={setSelectedImage} />
        </div>
      </div>
      <div className="flex-1">
        {getFormFields().map((field: IFormField) => {
          const fieldValue =
            state?.formData?.get(field.name) ?? formData.get(field.name);
          return (
            <div key={field.name} className="mb-3">
              <FormFields
                {...field}
                defaultValue={fieldValue as string}
                error={state?.error}
                readOnly={field.type === InputTypes.EMAIL}
              />
            </div>
          );
        })}
        {session.data?.user.role === UserRole.ADMIN && (
          <div className="flex items-center gap-2 my-4">
            <Checkbox
              name="admin"
              checked={isAdmin}
              onClick={() => setIsAdmin(!isAdmin)}
              label="Admin"
            />
          </div>
        )}
        <Button type="submit" className="w-full">
          {pending ? <Loader /> : translations.save}
        </Button>
      </div>
    </form>
  );
}

export default EditUserForm;

const UploadImage = ({
  setSelectedImage,
}: {
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  };
  return (
    <>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="image-upload"
        onChange={handleImageChange}
        name="image"
      />
      <label
        htmlFor="image-upload"
        className="border rounded-full w-[200px] h-[200px] element-center cursor-pointer"
      >
        <CameraIcon className="!w-8 !h-8 text-accent" />
      </label>
    </>
  );
};

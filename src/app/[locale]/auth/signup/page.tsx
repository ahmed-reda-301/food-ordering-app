// -----------------------------------------------------------------------------
// src/app/[locale]/auth/signup/page.tsx
//
// Signup Page (Register)
// ---------------------
// Purpose:
// - Renders the user registration (sign up) page with localized content.
//
// Features:
// - Fetches the current locale and loads the appropriate translations.
// - Displays a registration form (to be implemented) and a link to the login page.
// - Uses Tailwind CSS and Shadcn UI for layout and styling.
//
// Usage:
//   Accessed via /[locale]/auth/signup
//   Used for new user registration in the app.
//
// Best Practices:
// - Keep all static text in translation files for i18n support.
// - Use semantic HTML and accessible markup for better UX.
// - Handle form validation and errors securely (to be implemented).
// -----------------------------------------------------------------------------

import Link from "@/components/link";
import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import Form from "./_components/Form";

async function SignupPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const translations = await getTrans(locale);
  return (
    <main>
      <div className="py-44 md:py-40 bg-gray-50 element-center">
        <div className="container element-center">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center text-black mb-4">
              {translations.auth.register.title}
            </h2>
            <Form translations={translations} />
            <p className="mt-2 flex items-center justify-center text-accent text-sm">
              <span>{translations.auth.register.authPrompt.message}</span>
              <Link
                href={`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`}
                className={`${buttonVariants({
                  variant: "link",
                  size: "sm",
                })} !text-black`}
              >
                {translations.auth.register.authPrompt.loginLinkText}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignupPage;

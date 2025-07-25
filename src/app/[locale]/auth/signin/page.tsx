// -----------------------------------------------------------------------------
// src/app/[locale]/auth/signin/page.tsx
//
// Signin Page (Login)
// -------------------
// Purpose:
// - Renders the user login (sign in) page with localized content.
//
// Features:
// - Fetches the current locale and loads the appropriate translations.
// - Displays a login form (to be implemented) and a link to the registration page.
// - Uses Tailwind CSS and Shadcn UI for layout and styling.
//
// Usage:
//   Accessed via /[locale]/auth/signin
//   Used for user authentication in the app.
//
// Best Practices:
// - Keep all static text in translation files for i18n support.
// - Use semantic HTML and accessible markup for better UX.
// - Handle form validation and errors securely (to be implemented).
// -----------------------------------------------------------------------------

import Link from "@/components/link";
import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import Form from "./_components/Form";

async function SigninPage() {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);
  return (
    <main>
      <div className="py-44 md:py-40 bg-gray-50 element-center">
        <div className="container element-center">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center text-black mb-4">
              {translations.auth.login.title}
            </h2>
            <Form translations={translations} />
            <p className="mt-2 flex items-center justify-center text-accent text-sm">
              <span>{translations.auth.login.authPrompt.message}</span>
              <Link
                href={`/${locale}/${Routes.AUTH}/${Pages.Register}`}
                className={`${buttonVariants({
                  variant: "link",
                  size: "sm",
                })} !text-black`}
              >
                {translations.auth.login.authPrompt.signUpLinkText}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SigninPage;

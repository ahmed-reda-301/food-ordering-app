// -----------------------------------------------------------------------------
// src/components/header/auth-buttons.tsx
//
// AuthButtons Component
// -----------------------------------------------------------------------------
// Purpose:
// - Renders authentication-related buttons (login, register, sign out) in the header.
//
// Features:
// - Shows sign out button if user is logged in, login/register if not.
// - Integrates with NextAuth for session management and sign out.
// - Uses translations for button labels (i18n support).
// - Handles navigation to login/register/profile/admin pages based on user state.
//
// Usage:
//   Used inside the Header component to display auth actions.
//
// Best Practices:
// - Use session-aware logic to show the correct buttons.
// - Keep button styles and navigation consistent with app design.
// -----------------------------------------------------------------------------

"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { Translations } from "@/types/translations";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Pages, Routes } from "@/constants/enums";
import { useClientSession } from "@/hooks/useClientSession";
import { Session } from "next-auth";

function AuthButtons({
  initialSession,
  translations,
}: {
  initialSession: Session | null;
  translations: Translations;
}) {
  const session = useClientSession(initialSession);
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams();
  return (
    <div>
      {session.data?.user && (
        <div className="flex items-center gap-10">
          <Button
            className="!px-8 !rounded-full"
            size="lg"
            onClick={() => signOut()}
          >
            {translations.navbar.signOut}
          </Button>
        </div>
      )}
      {!session.data?.user && (
        <div className="flex items-center gap-6">
          <Button
            className={`${
              pathname.startsWith(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)
                ? "text-primary"
                : "text-accent"
            } hover:text-primary duration-200 transition-colors font-semibold hover:no-underline !px-0`}
            size="lg"
            variant="link"
            onClick={() =>
              router.push(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)
            }
          >
            {translations.navbar.login}
          </Button>
          <Button
            className="!px-8 !rounded-full"
            size="lg"
            onClick={() =>
              router.push(`/${locale}/${Routes.AUTH}/${Pages.Register}`)
            }
          >
            {translations.navbar.register}
          </Button>
        </div>
      )}
    </div>
  );
}

export default AuthButtons;

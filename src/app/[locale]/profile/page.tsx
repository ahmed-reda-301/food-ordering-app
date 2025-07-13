// -----------------------------------------------------------------------------
// src/app/[locale]/profile/page.tsx
//
// Profile Page (User Profile & Edit Form)
// -----------------------------------------------------------------------------
// Purpose:
//   Provides a protected profile page for regular users to view and edit their information.
//
// Features:
//   - Server-side authentication and authorization using NextAuth.
//   - Redirects unauthenticated users to the login page.
//   - Redirects admin users to the admin page for proper access control.
//   - Loads translations and locale from route params for i18n support.
//   - Renders a localized page title and the EditUserForm component with the current user and translations.
//
// Usage:
//   Accessed via the /[locale]/profile route. Only authenticated non-admin users can access this page.
//
// Best Practices:
//   - Always check both authentication and user role before rendering profile content.
//   - Use server-side session fetching for secure access control.
//   - Pass translations and user data as props to child components for full i18n and type safety.
// -----------------------------------------------------------------------------

import EditUserForm from "@/components/edit-user-form";
import { Pages, Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import { authOptions } from "@/server/auth";
import { UserRole } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const session = await getServerSession(authOptions);
  const { locale } = await params;
  const translations = await getTrans(locale);

  if (!session) {
    redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
  }
  if (session && session.user.role === UserRole.ADMIN) {
    redirect(`/${locale}/${Routes.ADMIN}`);
  }
  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <h1 className="text-primary text-center font-bold text-4xl italic mb-10">
            {translations.profile.title}
          </h1>
          <EditUserForm user={session?.user} translations={translations} />
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;

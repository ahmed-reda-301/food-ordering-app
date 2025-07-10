// -----------------------------------------------------------------------------
// src/app/[locale]/admin/page.tsx
//
// Admin Page (Edit User Form)
// -----------------------------------------------------------------------------
// Purpose:
//   Provides a protected admin page for editing user information.
//
// Features:
//   - Server-side authentication and authorization using NextAuth.
//   - Redirects unauthenticated users to the login page.
//   - Redirects authenticated non-admin users to their profile page.
//   - Loads translations and locale from route params for i18n support.
//   - Renders the EditUserForm component with the current user and translations.
//
// Usage:
//   Accessed via the /[locale]/admin route. Only users with the ADMIN role can access this page.
//
// Best Practices:
//   - Always check both authentication and user role before rendering admin content.
//   - Use server-side session fetching for secure access control.
//   - Pass translations and user data as props to child components for full i18n and type safety.
// -----------------------------------------------------------------------------

// import EditUserForm from "@/components/edit-user-form";
import { Pages, Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import { authOptions } from "@/server/auth";
import { UserRole } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function AdminPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const translations = await getTrans(locale);
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
  }

  if (session && session.user.role !== UserRole.ADMIN) {
    redirect(`/${locale}/${Routes.PROFILE}`);
  }
  return (
    <main>
      <section className="section-gap">
        <div className="container">
          {/* <EditUserForm user={session?.user} translations={translations} /> */}
        </div>
      </section>
    </main>
  );
}

export default AdminPage;

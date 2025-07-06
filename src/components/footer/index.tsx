// -----------------------------------------------------------------------------
// src/components/footer/index.tsx
//
// Footer Component
// ----------------
// Purpose:
// - Renders the footer section with localized copyright text.
//
// Features:
// - Fetches the current locale and loads the appropriate translation for the copyright.
// - Uses semantic <footer> and Tailwind CSS for layout and style.
//
// Usage:
//   <Footer />
//   Used at the bottom of all pages for consistent branding and legal info.
//
// Best Practices:
// - Keep all static text in the translation files for full i18n support.
// - Use semantic HTML for accessibility and SEO.
// -----------------------------------------------------------------------------

import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

const Footer = async () => {
  const locale = await getCurrentLocale();
  const { copyRight } = await getTrans(locale);
  return (
    <footer className="border-t p-8 text-center text-accent">
      <div className="container">
        <p>{copyRight}</p>
      </div>
    </footer>
  );
};

export default Footer;

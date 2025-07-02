// -----------------------------------------------------------------------------
// src/components/contact/index.tsx
//
// Contact Component
// -----------------
// Purpose:
// - Renders the Contact section with localized content based on the current language.
//
// Features:
// - Fetches the current locale and loads the appropriate translations.
// - Displays a main heading and a clickable phone number.
// - Uses semantic sectioning and Tailwind CSS for layout and style.
//
// Usage:
//   <Contact />
//   Used in the Contact page or as a section in the homepage.
//
// Best Practices:
// - Keep all static text in the translation files for full i18n support.
// - Use semantic HTML and accessible markup for better SEO and UX.
// -----------------------------------------------------------------------------

import MainHeading from '@/components/main-heading';
import { Routes } from '@/constants/enums';
import { getCurrentLocale } from '@/lib/getCurrentLocale';
import getTrans from '@/lib/translation';

const Contact = async () => {
  const locale = await getCurrentLocale();
  const { home } = await getTrans(locale);
  const { contact } = home;
  return (
    <section className='section-gap' id={Routes.CONTACT}>
      <div className='container text-center'>
        <MainHeading
          subTitle={contact["Don'tHesitate"]}
          title={contact.contactUs}
        />
        <div className='mt-8'>
          <a className='text-4xl underline text-accent' href='tel:+201094597301'>
            +201094597301
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
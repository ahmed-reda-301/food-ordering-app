// -----------------------------------------------------------------------------
// src/components/about/index.tsx
//
// About Component
// ---------------
// Purpose:
// - Renders the About section with localized content based on the current language.
//
// Features:
// - Fetches the current locale and loads the appropriate translations.
// - Displays a main heading and three description paragraphs from the translation dictionary.
// - Uses semantic sectioning and Tailwind CSS for layout and style.
//
// Usage:
//   <About />
//   Used in the About page or as a section in the homepage.
//
// Best Practices:
// - Keep all static text in the translation files for full i18n support.
// - Use semantic HTML and accessible markup for better SEO and UX.
// -----------------------------------------------------------------------------

import { Routes } from "@/constants/enums";
import MainHeading from "../main-heading";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

async function About() {
  const locale = await getCurrentLocale();
  const { home } = await getTrans(locale);
  const { about } = home;
  return (
    <section className="section-gap" id={Routes.ABOUT}>
      <div className="container text-center">
        <MainHeading subTitle={about.ourStory} title={about.aboutUs} />
        <div className="text-accent max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>{about.descriptions.one}</p>
          <p>{about.descriptions.two}</p>
          <p>{about.descriptions.three}</p>
        </div>
      </div>
    </section>
  );
}

export default About;

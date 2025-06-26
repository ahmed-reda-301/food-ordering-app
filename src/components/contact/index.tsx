// -----------------------------------------------------------------------------
// src/components/contact/index.tsx
//
// Contact Component
// -----------------
// Purpose:
// - Renders the "Contact Us" section for the application, including a heading and contact information.
// - Provides users with a clear way to reach out to the restaurant.
//
// Features:
// - Uses the MainHeading component for a consistent section header.
// - Displays a prominent phone number as a clickable link.
// - Responsive and centered layout for accessibility and clarity.
//
// Usage:
//   <Contact />
//
// Example:
//   <section>
//     <div className="container text-center">
//       <MainHeading subTitle="Don't hesitate" title="Contact Us" />
//       <a href="tel:+2012121212">+201094597301</a>
//     </div>
//   </section>
//
// Notes:
// - This component is used in the Contact page and can be reused elsewhere if needed.
// -----------------------------------------------------------------------------

import MainHeading from '@/components/main-heading';
import { Routes } from '@/constants/enums';


const Contact = async () => {
  return (
    <section className='section-gap' id={Routes.CONTACT}>
      <div className='container text-center'>
        <MainHeading
          subTitle="Don't hesitate"
          title="Contact Us"
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
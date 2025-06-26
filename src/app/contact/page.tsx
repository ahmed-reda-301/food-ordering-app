// -----------------------------------------------------------------------------
// src/app/contact/page.tsx
//
// Contact Page
// ------------
// Purpose:
// - Serves as the dedicated Contact page route for the application.
// - Renders the Contact component to display contact information for the restaurant.
//
// Features:
// - Uses the Contact component for consistent content and styling.
// - Can be extended with additional contact methods or a contact form.
//
// Usage:
//   This page is accessible at /contact and is linked from the main navigation.
//
// Example:
//   <main>
//     <Contact />
//   </main>
//
// Notes:
// - Keeps the Contact section DRY by reusing the Contact component.
// -----------------------------------------------------------------------------

import Contact from '@/components/contact';

const ContactPage = () => {
  return (
    <main>
      <Contact />
    </main>
  );
};

export default ContactPage;
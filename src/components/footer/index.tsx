// -----------------------------------------------------------------------------
// src/components/footer/index.tsx
//
// Footer Component
// ----------------
// Purpose:
// - Renders the footer section for the application, displayed at the bottom of every page.
// - Provides copyright and branding information.
//
// Features:
// - Simple, responsive layout with a border and accent text.
// - Uses a container for consistent horizontal padding.
// - Easily extendable for links, social icons, or additional info.
//
// Usage:
//   <Footer />
//
// Example:
//   <footer className="border-t p-8 text-center text-accent">
//     <div className="container">
//       <p>© 2025 All rights reserved</p>
//     </div>
//   </footer>
//
// Notes:
// - This component is used in the main layout to appear on every page.
// -----------------------------------------------------------------------------

const Footer = () => {
  return (
    <footer className="border-t p-8 text-center text-accent">
      <div className="container">
        <p>© 2025 All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;

// -----------------------------------------------------------------------------
// src/app/not-found.tsx
//
// NotFound Page
// -------------
// Purpose:
// - Custom 404 page for handling routes that do not exist.
//
// Features:
// - Displays a user-friendly message when a page/resource is not found.
// - Provides a link to return to the homepage.
//
// Usage:
//   Automatically rendered by Next.js for unmatched routes.
//
// Best Practices:
// - Keep the design simple and clear for best UX.
// - Can be extended to support i18n or custom branding.
// -----------------------------------------------------------------------------

import Link from "next/link";

export default function NotFound() {
  return (
    <html>
      <body>
        <div>
          <h2>Not Found</h2>
          <p>Could not find requested resource</p>
          <Link href="/">Return Home</Link>
        </div>
      </body>
    </html>
  );
}

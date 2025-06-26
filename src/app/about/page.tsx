// -----------------------------------------------------------------------------
// src/app/about/page.tsx
//
// About Page
// ----------
// Purpose:
// - Serves as the dedicated About page route for the application.
// - Renders the About component to display information about the restaurant.
//
// Features:
// - Uses the About component for consistent content and styling.
// - Can be extended with additional info, images, or team details.
//
// Usage:
//   This page is accessible at /about and is linked from the main navigation.
//
// Example:
//   <main>
//     <About />
//   </main>
//
// Notes:
// - Keeps the About section DRY by reusing the About component.
// -----------------------------------------------------------------------------

import About from '@/components/about'
import React from 'react'

function AboutPage() {
  return (
    <main>
        <About />
    </main>

  )
}

export default AboutPage

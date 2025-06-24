// src/components/main-heading/index.tsx
//
// MainHeading Component
// ---------------------
// Purpose:
// - A reusable component for displaying section headings with a subtitle and a main title.
// - Used to keep section headers consistent across the app (e.g., in Hero, Best Sellers, About, etc.).
//
// Props:
// - title: string (the main heading text, styled bold, large, and italic)
// - subTitle: string (the subtitle, styled uppercase and accent color)
//
// Usage Example:
// <MainHeading title="Best Sellers" subTitle="Top Picks" />
//
// Styling:
// - Uses Tailwind CSS utility classes for color, font, and spacing.
// - Responsive and visually consistent with the app's design system.

function MainHeading({ title, subTitle }: Readonly<{ title: string; subTitle: string }>) {
  return (
    <>
      <span className='uppercase text-accent font-semibold leading-4'>
        {subTitle}
      </span>
      <h2 className='text-primary font-bold text-4xl italic'>{title}</h2>
    </>
  );
}

export default MainHeading;
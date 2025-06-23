# Step-by-Step Guide: Building a Food Ordering App with Next.js

This file provides a detailed explanation of how to build a Food Ordering App using Next.js, based on the Simple Arab Code video:
[Video Link](https://www.youtube.com/watch?v=0Uauw7LDAa4&ab_channel=SimpleArabCode)

---

## 00:00:00 - Introduction

- **Project idea:** An online food ordering app built with Next.js, featuring a modern UI, authentication, cart management, and integration with a database and payment system.

### Planned Features

The project will be developed in three main parts (videos), each focusing on a set of core features:

#### **Part 1: Core App Setup & UI Foundation**

- Project initialization and folder structure
- Next.js and TypeScript setup
- Tailwind CSS and Shadcn UI integration
- Building main layout: Header, Footer, Hero section
- Static pages: Home, About, Contact
- Menu page with static data

-localazation
-state management
-setup prisma
-Caching

#### **Part 2: Database, State Management & Cart**

- Setting up PostgreSQL and Prisma ORM
- Creating and migrating the database schema
- Connecting menu/products to the database
- Implementing Redux Toolkit for state management
- Building the shopping cart logic (add/remove items, cart summary)
- Next.js caching and performance optimizations

-Setup credentials Authentication
-Add Admin Page
-Add profile page
-Add Orders page

#### **Part 3: Authentication, Payments & Advanced Features**

- Adding authentication with NextAuth.js
- User registration and login flows
- Integrating Stripe for online payments
- Validating forms and API data with Zod
- Internationalization (i18n) for multi-language support
- Final touches, deployment, and pushing code to GitHub

-Add Payment method (Stripe)
-Deploy the app

> Each part will be covered in a dedicated video, allowing you to follow along step-by-step and build a complete, production-ready food ordering app.

### Project Structure Overview

The project is organized as follows:

- `public/` — Static assets (images, SVGs, etc.)
- `src/app/` — Main application pages and layout
  - `globals.css` — Global styles
  - `layout.tsx` — Main layout component
  - `page.tsx` — Home page
- `src/lib/` — Utility functions
- `prisma/` — Prisma schema and migrations (after setup)
- `components/` — Reusable UI components (Header, Footer, Hero, etc.)
- `package.json` — Project dependencies and scripts
- `tsconfig.json` — TypeScript configuration
- `.env` — Environment variables (database URL, API keys, etc.)

### How to Structure the Project

1. Keep all page routes inside `src/app/` (e.g., `about`, `contact`, `menu`).
2. Place shared UI components in a `components/` folder (e.g., `Header.tsx`, `Footer.tsx`).
3. Store utility/helper functions in `src/lib/`.
4. Use `public/` for images and static files.
5. Database schema and migrations will be managed in a `prisma/` folder (created after running `npx prisma init`).

---

### Tools & Technologies

| Tool/Tech         | Description                                                                  | Documentation Link                                                     |
| ----------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **Next.js**       | React framework for server-side rendering, routing, and full-stack features. | [Next.js Docs](https://nextjs.org/docs)                                |
| **Tailwind CSS**  | Utility-first CSS framework for rapid UI development.                        | [Tailwind Docs](https://tailwindcss.com/docs)                          |
| **Shadcn UI**     | Beautifully designed, customizable React components built on Radix UI.       | [Shadcn UI Docs](https://ui.shadcn.com/docs)                           |
| **Prisma**        | Type-safe ORM for Node.js and TypeScript, used for database access.          | [Prisma Docs](https://www.prisma.io/docs)                              |
| **PostgreSQL**    | Powerful open-source relational database system.                             | [PostgreSQL Docs](https://www.postgresql.org/docs/)                    |
| **Redux Toolkit** | Official, efficient Redux state management library for React.                | [Redux Toolkit Docs](https://redux-toolkit.js.org/)                    |
| **Stripe**        | Payment processing platform for online payments.                             | [Stripe Docs](https://stripe.com/docs)                                 |
| **NextAuth.js**   | Authentication for Next.js applications.                                     | [NextAuth Docs](https://next-auth.js.org/getting-started/introduction) |
| **Zod**           | TypeScript-first schema validation with static type inference.               | [Zod Docs](https://zod.dev/)                                           |

---

## 00:06:05 - Setup Next.js Project

1. Install Node.js and npm (if not already installed):
   - [Download Node.js](https://nodejs.org/)
2. Install vs code 
3. install extensions
    -Bracket Pair Color DLW
    -ES7+ React/Redux/React-Native snippets
    -ESLint
    -Material Icon Theme
    -Prettier - Code formatter
    -Prisma
    -Tailwind CSS IntelliSense
3. configer Default Formatter
    -Editor: Default Formatter
Defines a default formatter which takes precedence over all other formatter settings. Must be the identifier of an extension contributing a formatter.
            Prettier - Code formatter
    -in setting.json file :
        "[prisma]": {
        "editor.defaultFormatter": "prisma.prisma",
        "editor.formatOnSave": true

    },
4. Create a new Next.js project:
https://nextjs.org/docs/app/getting-started/installation

   ```bash
   npx create-next-app@latest food-ordering-app
   ```

✔ What is your project named? … food-ordering-app
✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like your code inside a `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to use Turbopack for `next dev`? … No / Yes
✔ Would you like to customize the import alias (`@/*` by default)? … No / Yes

5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open the app in your browser: [http://localhost:3000](http://localhost:3000)

7. Change font:
    -In `app/layout` change the font to `'Roboto'`:
        const roboto = Roboto({
        subsets: ["latin"],
        weight: ["400", "500", "700"],
        preload: true,
        });
    -remove unused fonts

8. remove unused content from `app/page.tsx` and  change to 

    <main>
      <h1>Hello World</h1>
    </main>

    for testing



## 00:20:57 - Setup Shadcn UI

1. Install shadcn/ui:
https://ui.shadcn.com/docs/installation/next
   ```bash
   npx shadcn-ui@latest init
   ```
2. Choose your preferred settings (theme, style, etc.).
 in [components.json](components.json)
3. Edit cssVariables (color) in [globals.css](src/app/globals.css)
        https://htmlcolors.com/hex-to-hsl
4. [Official Documentation](https://ui.shadcn.com/docs/installation)
5. Add Components
You can now start adding components to your project.

   ```bash
npx shadcn@latest add button
   ```
   


## 00:30:35 - Add Header Component

1. Create a new directiory :  `src/components/header`
2. Create a new file: `src/components/header/index.tsx`
2. Build the header component.
    use react snippet (rafce or rfce )  to fast create component with the same name of the file
    change name of component to Header

3. Import the header in `layout.tsx` or the main page.

## 00:55:21 - Add Hero Component

1. Create a new file: `src/components/Hero.tsx`
2. Design the hero section with an image and welcome text.
3. Use ready-made components from Shadcn UI.

## 01:06:48 - Add Best Sellers Component

1. Create a new file: `src/components/BestSellers.tsx`
2. Display the best-selling products in an attractive way.
3. Connect the data to the database later.

## 01:51:56 - Database Setup

1. Install Prisma:
   ```bash
   npm install prisma --save-dev
   npx prisma init
   ```
2. Set up a PostgreSQL database (locally or using a service like [Supabase](https://supabase.com/)).
3. Update the environment variables in `.env`:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/food_ordering"
   ```
4. Define your database schema in `prisma/schema.prisma`.

## 02:40:06 - Next.js Caching

- Use Next.js caching functions like `revalidate` and `getStaticProps` to improve performance.
- [Official Docs](https://nextjs.org/docs/app/building-your-application/caching)

## 02:54:42 - Update Database Schema

1. Edit `prisma/schema.prisma` to add new tables or columns.
2. Run Prisma commands to update the database:
   ```bash
   npx prisma migrate dev --name update-schema
   npx prisma generate
   ```

## 03:18:41 - About Page

1. Create a new page: `src/app/about/page.tsx`
2. Add information about the restaurant or app.

## 03:21:20 - Contact Page

1. Create a new page: `src/app/contact/page.tsx`
2. Add a contact form using Shadcn UI components.

## 03:22:26 - Add Footer Component

1. Create a new file: `src/components/Footer.tsx`
2. Design the footer and add it to `layout.tsx`.

## 03:23:33 - Menu Page

1. Create a new page: `src/app/menu/page.tsx`
2. Display the food menu with prices and images.

## 03:33:45 - Shopping Cart Logic

1. Create a context to manage the cart state.
2. Add buttons to add/remove products from the cart.
3. Show a cart summary in the header or a separate page.

## 05:31:15 - Add Internationalization in Next.js

1. Enable i18n in `next.config.js`:
   ```js
   i18n: {
     locales: ['ar', 'en'],
     defaultLocale: 'ar',
   },
   ```
2. Use a library like [next-intl](https://github.com/amannn/next-intl) or [react-i18next](https://react.i18next.com/).

## 06:23:53 - The Next Parts?

- Suggestions for future improvements (add payment, admin dashboard, etc.).

## 06:26:00 - Push the code into Github

1. Initialize git:
   ```bash
   git init
   git add .
   git commit -m "first commit"
   ```
2. Create a new repository on [Github](https://github.com/)
3. Link your project to the repository:
   ```bash
   git remote add origin https://github.com/USERNAME/REPO_NAME.git
   git push -u origin master
   ```

---

> You can add more detailed explanations or code samples under each step as needed.

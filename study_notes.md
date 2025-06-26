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

1.  Install Node.js and npm (if not already installed):
    - [Download Node.js](https://nodejs.org/)
2.  Install vs code
3.  install extensions
    -Bracket Pair Color DLW
    -ES7+ React/Redux/React-Native snippets
    -ESLint
    -Material Icon Theme
    -Prettier - Code formatter
    -Prisma
    -Tailwind CSS IntelliSense
4.  configer Default Formatter
    -Editor: Default Formatter
    Defines a default formatter which takes precedence over all other formatter settings. Must be the identifier of an extension contributing a formatter.
    Prettier - Code formatter
    -in setting.json file :
    "[prisma]": {
    "editor.defaultFormatter": "prisma.prisma",
    "editor.formatOnSave": true

        },

5.  Create a new Next.js project:
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

8. remove unused content from `app/page.tsx` and change to

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

1. Create a new directiory : `src/components/header`
2. Create a new file: `src/components/header/index.tsx`
3. Build the header component.
   use react snippet (rafce or rfce ) to fast create component with the same name of the file
   change name of component to Header

4. Import the header in `layout.tsx` or the main page.

## 00:55:21 - Add Hero Component

1. Create a new file: `src/app/_components/Hero.tsx`
2. Build the Hero component to serve as the main visual section at the top of the homepage.
   - The Hero section typically includes a catchy headline, a short description, and a call-to-action button.
   - You can use Shadcn UI and Tailwind CSS utility classes for layout and styling.
   - Make sure the Hero is fully responsive and visually appealing on all screen sizes.
3. Example features implemented:
   - Responsive layout using flex and grid utilities.
   - Prominent headline and subheadline to introduce the app.
   - Call-to-action button (e.g., "Order Now") styled with Shadcn UI button variants.
   - Optionally, an image or illustration relevant to food ordering.
4. Import and use the Hero component in your main page (e.g., `src/app/page.tsx`).

**Example usage:**

```tsx
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* Other sections... */}
    </main>
  );
}
```

> The Hero component is the first thing users see and sets the tone for your app, so focus on clarity, branding, and responsiveness.

## 01:06:48 - Add Best Sellers Component

1. Create a new file: `src/app/_components/BestSellers.tsx`
2. Build the BestSellers component to display a dedicated section for the most popular menu items.
   - The section uses the `MainHeading` component for a consistent and styled section header.
   - The layout is responsive and centered, making it visually appealing on all screen sizes.
   - The component is designed to be easily extended in the future to fetch and display real best seller data from the database.
3. Add and use the following subcomponents/utilities:
   - **MainHeading** (`src/components/main-heading/index.tsx`):
     - A reusable component for section titles and subtitles, ensuring consistent typography and style.
     - Props: `title` (main heading), `subTitle` (subtitle, accent color, uppercase).
   - **MenuItem** (`src/components/menu/MenuItem.tsx`):
     - Represents a single best seller item (e.g., pizza), displaying its image, name, price, and add-to-cart button.
     - Uses the `formatCurrency` utility for price formatting.
     - Integrates the AddToCartButton for cart actions.
   - **AddToCartButton** (`src/components/menu/add-to-cart-button.tsx`):
     - Button to add the item to the shopping cart, handling click events and UI feedback.
     - Can be extended to show loading or success states.
   - **formatCurrency** (`src/lib/formatters.ts`):
     - Utility function to format numbers as currency strings (e.g., $12.99) for consistent price display.
4. Example features implemented:
   - Responsive section layout using Tailwind CSS utility classes.
   - Centered heading with subtitle (e.g., "checkOut") and title (e.g., "Our Best Sellers").
   - Placeholder for future dynamic content (e.g., best seller cards or product grid).
   - Each MenuItem displays product info and an AddToCartButton.
5. Import and use the BestSellers component in your main page (e.g., `src/app/page.tsx`).

**Example usage:**

```tsx
import BestSellers from "./_components/BestSellers";

export default function Home() {
  return (
    <main>
      {/* ...other sections... */}
      <BestSellers />
    </main>
  );
}
```

> The BestSellers component helps highlight top products and can be expanded to show real data as your app grows. Subcomponents like MainHeading, MenuItem, and AddToCartButton keep the code modular and maintainable.

## 01:51:56 - Database Setup

1. **Install Prisma:**
   - Install the Prisma CLI as a dev dependency and initialize Prisma in your project.
   - Docs: [Prisma Getting Started](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgresql)
   ```bash
   npm install prisma --save-dev
   npx prisma init
   ```
2. **Set up a PostgreSQL database:**
   - You can use a local PostgreSQL instance or a cloud service like [Supabase](https://supabase.com/).
   - Create a new database and user for your app.
3. **Update environment variables:**
   - In your `.env` file, set the `DATABASE_URL` to match your database credentials.
   ```env
   # Example:
   DATABASE_URL="postgresql://food_ordering_app_user:207301@localhost:5432/food_ordering_app_database"
   ```
4. **Define your database schema:**
   - Edit `prisma/schema.prisma` to define your data models. For example:
   ```prisma
   model Product {
     id          String   @id @default(cuid())
     name        String
     description String
     imageUrl    String
     order       Int      @default(autoincrement())
     basePrice   Float
     createdAt   DateTime @default(now())
     updatedAt   DateTime @updatedAt
     categoryId  String
   }
   ```
   - Docs: [Prisma Introspection](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/introspection-typescript-postgresql)
5. **Create an initial migration:**
   - Run the migration command to create your database tables based on the schema.
   - Docs: [Prisma Migrate](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/baseline-your-database-typescript-postgresql)
   ```bash
   npx prisma migrate dev
   ```
6. **Connect to Prisma Client:**
   - (Optional) If you have a custom output in your generator block, comment it out for default behavior.
   - Run the following command to generate the Prisma client:
   ```bash
   npx prisma generate
   ```
7. **Create a Prisma Client Singleton for Next.js:**
   - Create a file like `src/lib/prisma.ts` to ensure a single PrismaClient instance is used (see [prisma.ts](src/lib/prisma.ts)).
8. **Test the connection:**
   - Try querying the database from a page or API route (e.g., [page.tsx](src/app/page.tsx)) to ensure everything is working.
9. enter data to database use Prisma Studio
    https://www.prisma.io/docs/orm/tools/prisma-studio

    Run npx prisma studio in your terminal.

```bash
   npx prisma studio
   ```

> This setup ensures your app is ready for robust, type-safe database access with Prisma and PostgreSQL.

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

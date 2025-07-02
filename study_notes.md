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
9. Seed your database using Prisma Studio or programmatically with Prisma commands:

   - You can use Prisma Studio for a user-friendly GUI to add and edit data:
     https://www.prisma.io/docs/orm/tools/prisma-studio

     Run the following command in your terminal:

     ```bash
     npx prisma studio
     ```

   - Alternatively, you can seed your database programmatically using Prisma commands in your code (see example in src/app/page.tsx):
     ```ts
     // Example: Add products, sizes, and extras directly from code
     await db.product.createMany({
       data: [
         {
           name: "Margherita Pizza",
           description: "Classic pizza with fresh mozzarella and basil",
           basePrice: 12.99,
           imageUrl: "/assets/images/margherita.png",
         },
         {
           name: "Pepperoni Pizza",
           description: "Spicy pepperoni with melted cheese",
           basePrice: 14.99,
           imageUrl: "/assets/images/pepperoni.png",
         },
         {
           name: "Veggie Supreme",
           description: "Loaded with fresh vegetables and herbs",
           basePrice: 11.99,
           imageUrl: "/assets/images/veggie.png",
         },
       ],
     });
     // Add sizes and extras in a similar way, linking them to products via productId
     ```
   - After any changes to your schema.prisma, update your database with:
     ```bash
     npx prisma migrate dev --name update-schema
     npx prisma generate
     ```
   - You can now fetch dynamic data in components like BestSellers using the Prisma Client.

> This setup ensures your app is ready for robust, type-safe database access with Prisma and PostgreSQL.

## 02:40:06 - Next.js Caching

    - For better maintainability and scalability, move all database-related functions (such as fetching products, best sellers, etc.) into dedicated files inside a folder like `src/server/db/`.
    - Example: Create a file `src/server/db/products.ts` and define functions like `getBestSellers` there.
    - Import and use these functions in your components or API routes instead of writing database logic directly in the component files.
    - This approach keeps your codebase clean, modular, and easier to test and extend.

    ```ts
    // Example: src/server/db/products.ts
    import { db } from "@/lib/prisma";

    export const getBestSellers = async () => {
    return db.product.findMany({
        include: { sizes: true, extras: true },
    });
    };
    ```

    ```ts
    // Usage in a component or API route
    import { getBestSellers } from "@/server/db/products";

    const bestSellers = await getBestSellers();
    ```

    > Always keep your database access logic in one place for consistency and easier updates.

- Use Next.js caching functions like `revalidate` and `getStaticProps` to improve performance.
- [Official Docs](https://nextjs.org/docs/app/building-your-application/caching)

## 02:50:00 - Add and Use Server-Side Caching

To improve performance and reduce database load, implement server-side caching for your data fetching functions:

1. **Create a cache utility:**

   - Add a new file at `src/lib/cache.ts` with the following code:

   ```ts
   import { unstable_cache as nextCache } from "next/cache";
   import { cache as reactCache } from "react";

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   type Callback = (...args: any[]) => Promise<any>;

   export function cache<T extends Callback>(
     cb: T,
     keyParts: string[],
     options: { revalidate?: number | false; tags?: string[] }
   ) {
     return nextCache(reactCache(cb), keyParts, options);
   }
   ```

   - This utility combines React and Next.js caching for optimal server-side data caching and revalidation.

2. **Refactor your database functions to use caching:**

   - In your database logic files (e.g., `src/server/db/products.ts`), wrap your data fetching functions with the new cache utility:

   ```ts
   import { cache } from "@/lib/cache";
   import { db } from "@/lib/prisma";

   export const getBestSellers = cache(
     () => {
       return db.product.findMany({
         include: { sizes: true, extras: true },
       });
     },
     ["best-sellers"],
     { revalidate: 3600 } // Revalidate every hour
   );
   ```

   - This ensures that repeated requests for best sellers are served from cache, and the data is refreshed every hour.

3. **Use the cached function in your components or API routes:**
   - Import and call the cached function as usual:
   ```ts
   import { getBestSellers } from "@/server/db/products";
   const bestSellers = await getBestSellers();
   ```

**Best Practices:**

- Use descriptive cache keys for each data set.
- Set appropriate revalidation intervals based on how often your data changes.
- Use cache tags if you need to invalidate specific cache entries programmatically.

> Adding server-side caching is essential for scaling your app and delivering fast, consistent data to users.

## 02:53:00 - Testing and Debugging Server-Side Caching

After implementing server-side caching, it's important to verify that your cache is working as expected and to know some useful cache-related shortcuts:

1. **How to test if caching works:**

   - Add a console log or timestamp inside your cached function. For example:

   ```ts
   export const getBestSellers = cache(
     () => {
       console.log("Fetching from database:", new Date().toISOString());
       return db.product.findMany({
         include: { sizes: true, extras: true },
       });
     },
     ["best-sellers"],
     { revalidate: 3600 }
   );
   ```

   - On the first request, you should see the log in your server console. Subsequent requests within the revalidation window should NOT trigger the log, indicating the data is served from cache.
   - After the revalidation period, the log should appear again, showing a fresh fetch.

2. **Cache invalidation and development shortcuts:**

   - In development, Next.js may automatically bypass or clear cache on file changes or server restarts.
   - To manually clear the cache in production press (ctrl + shift + r), you can use cache tags and the Next.js API for cache invalidation. See [Next.js Cache API](https://nextjs.org/docs/app/building-your-application/caching#on-demand-revalidation) for details.
   - You can also change the cache key (e.g., add a version or timestamp) to force a new cache entry.

3. **Useful tips:**
   - Use unique and descriptive cache keys for each dataset.
   - Use the `tags` option to group related cache entries for easier invalidation.
   - Monitor your server logs to ensure caching is reducing database calls as expected.

> Testing and understanding your cache behavior is crucial for reliable, high-performance data fetching in production.

## 02:54:42 - Update Database Schema

1. Edit `prisma/schema.prisma` to add new tables or columns.
2. Run Prisma commands to update the database:
   ```bash
   npx prisma migrate reset
   npx prisma generate
   npx prisma migrate dev
   npx prisma studio
   ```

// to delete all products, sizes, and extras from the database
await db.product.deleteMany();
await db.size.deleteMany();
await db.extra.deleteMany();

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

### State Management Overview

State management is a crucial part of any modern web application, especially for features like a shopping cart where you need to keep track of user actions, cart contents, and UI state across multiple components and pages.

#### Common State Management Options in React/Next.js:

1. **React Context API**

   - Built-in solution for sharing state globally.
   - Good for small to medium apps or simple global state (e.g., theme, user auth, cart).
   - Easy to set up, but can become hard to maintain with complex state logic.
   - [React Context Docs](https://react.dev/reference/react/createContext)

2. **Redux Toolkit**

   - The recommended way to use Redux in modern React apps.
   - Scalable, robust, and well-documented for large applications.
   - Centralizes state and logic, supports middleware, devtools, and async actions.
   - Great for complex state (cart, user, orders, etc.) and when you need predictable state updates.
   - [Redux Toolkit Docs](https://redux-toolkit.js.org/)

3. **Zustand**

   - Minimal, fast, and scalable state management library.
   - Simpler API than Redux, but less opinionated.
   - Good for both small and large apps.
   - [Zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction)

4. **Jotai, Recoil, MobX, etc.**

   - Other libraries with different paradigms and APIs.
   - Each has its own strengths for specific use cases.

5. **Server State (React Query, SWR, etc.)**
   - For data that lives on the server (e.g., fetching products, orders).
   - Not a replacement for client state (like cart), but can be combined with Redux/Context.

---

### Recommended Approach: Redux Toolkit for Shopping Cart

Redux Toolkit is the most robust and scalable solution for managing shopping cart state in a Next.js app. It provides a clear structure, powerful devtools, and is easy to test and extend.

#### How to Set Up Redux Toolkit for Cart State

1. **Install Redux Toolkit and React-Redux:**

   ```bash
   npm install @reduxjs/toolkit react-redux
   ```

2. **Create a Redux Store:**

   - Create a file: `src/store/index.ts`

   ```ts
   import { configureStore } from "@reduxjs/toolkit";
   import cartReducer from "./cartSlice";

   export const store = configureStore({
     reducer: {
       cart: cartReducer,
     },
   });

   export type RootState = ReturnType<typeof store.getState>;
   export type AppDispatch = typeof store.dispatch;
   ```

3. **Create a Cart Slice:**

   - Create a file: `src/store/cartSlice.ts`

   ```ts
   import { createSlice, PayloadAction } from "@reduxjs/toolkit";
   import type { ProductWithRelations } from "@/types/product";

   interface CartItem {
     product: ProductWithRelations;
     quantity: number;
   }

   interface CartState {
     items: CartItem[];
   }

   const initialState: CartState = {
     items: [],
   };

   const cartSlice = createSlice({
     name: "cart",
     initialState,
     reducers: {
       addToCart(state, action: PayloadAction<ProductWithRelations>) {
         const existing = state.items.find(
           (item) => item.product.id === action.payload.id
         );
         if (existing) {
           existing.quantity += 1;
         } else {
           state.items.push({ product: action.payload, quantity: 1 });
         }
       },
       removeFromCart(state, action: PayloadAction<string>) {
         state.items = state.items.filter(
           (item) => item.product.id !== action.payload
         );
       },
       clearCart(state) {
         state.items = [];
       },
     },
   });

   export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
   export default cartSlice.reducer;
   ```

4. **Provide the Store to Your App:**

   - In `src/app/layout.tsx` or a custom provider file:

   ```tsx
   import { Provider } from "react-redux";
   import { store } from "@/store";
   // ...
   <Provider store={store}>{/* your app */}</Provider>;
   ```

5. **Use Redux Hooks in Components:**

   - To read or update cart state:

   ```tsx
   import { useSelector, useDispatch } from "react-redux";
   import { RootState } from "@/store";
   import { addToCart, removeFromCart } from "@/store/cartSlice";

   const cart = useSelector((state: RootState) => state.cart.items);
   const dispatch = useDispatch();

   // Add to cart
   dispatch(addToCart(product));
   // Remove from cart
   dispatch(removeFromCart(productId));
   ```

---

**Advantages of Redux Toolkit:**

- Centralizes all cart logic and state.
- Easy to debug and extend (add discounts, user info, etc.).
- Works seamlessly with Next.js and server components.
- Supports middleware, async actions, and devtools.

> For most production apps, Redux Toolkit is the best choice for managing complex state like a shopping cart.

##### Project Implementation Details (مطابقة التنفيذ الفعلي)

In this project, Redux Toolkit was set up for the shopping cart state as follows:

- **Store Setup:**

  - The Redux store is defined in `src/redux/store.ts` using `configureStore` from Redux Toolkit.
  - The cart slice is imported from `src/redux/features/cart/cartSlice.ts` and added to the store's reducer.
  - Types for `RootState` and `AppDispatch` are exported from `store.ts` for use with typed hooks.

- **Cart Slice:**

  - The cart logic (add, remove, clear) is implemented in `src/redux/features/cart/cartSlice.ts`.
  - The slice uses TypeScript interfaces for strong typing and includes actions: `addToCart`, `removeFromCart`, and `clearCart`.
  - The cart state is an array of items, each with a product and quantity.

- **Typed Hooks:**

  - Custom hooks `useAppDispatch` and `useAppSelector` are defined in `src/redux/hooks.ts` for type-safe usage of Redux in components.

- **Provider Integration:**

  - The Redux `<Provider store={store}>` is added in `src/app/layout.tsx` to wrap the entire app, making the store available everywhere.

- **Usage in Components:**

  - Components use the typed hooks to read from and dispatch actions to the cart state.
  - Example usage:

    ```tsx
    import { useAppDispatch, useAppSelector } from "@/redux/hooks";
    import { addToCart, removeFromCart } from "@/redux/features/cart/cartSlice";

    const cart = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();

    // Add to cart
    dispatch(addToCart(product));
    // Remove from cart
    dispatch(removeFromCart(productId));
    ```

- **Best Practices:**
  - All Redux logic is kept in the `src/redux/` folder for clarity and scalability.
  - File-level comments are added to explain the purpose and usage of each file.
  - The cart logic is fully typed and ready for extension (discounts, persistence, etc.).

> This structure ensures a scalable, maintainable, and type-safe state management solution for the shopping cart, matching the actual implementation in the project.

---

## 05:31:15 - Add Internationalization in Next.js

https://nextjs.org/docs/app/guides/internationalization

create [middleware.ts ](src/middleware.ts) file 

create [[locale]](src/app/[locale]) folder and move all files and folder in [app](src/app) to it 

install  negotiator @formatjs/intl-localematcher

   ```bash
npm add negotiator @formatjs/intl-localematcher
   ```

create [i18n.config.ts](src/i18n.config.ts) file 

update [layout.tsx](src/app/[locale]/layout.tsx) with generateStaticParams function

create  [ dictionaries](src/dictionaries) folder 

create [getCurrentLocale](src/lib/getCurrentLocale.ts) and [translation](src/lib/translation.ts) files 
 
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



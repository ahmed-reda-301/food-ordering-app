# Step-by-Step Guide: Building a Food Ordering App with Next.js (Part 2)

**Video Reference:** [Simple Arab Code - Part 2](https://www.youtube.com/watch?v=hDrt1ifv94o&ab_channel=SimpleArabCode)

---

## ⏱️ Timestamps & Key Steps

### 00:00:00 - Introduction

- This part starts with a recap of what was built in Part 1 (UI, menu, cart, i18n, database setup).
- The instructor explains the new focus: adding authentication, admin features, and advanced data management.
- Key goals for Part 2:
  - Implement secure user authentication (sign in, sign up, session management).
  - Add protected routes so only logged-in users (or admins) can access certain pages.
  - Build an admin dashboard for managing users, categories, and menu items.
  - Enable CRUD operations for users, categories, and products directly from the dashboard.
  - Integrate NextAuth.js for authentication and Prisma for database operations.
- The video also highlights best practices:
  - Keeping authentication logic separate from UI components.
  - Using middleware for route protection.
  - Ensuring all admin actions are secure and validated.
- The instructor previews the final result: a full-stack food ordering app with real authentication, admin control, and scalable code structure.

### 00:04:13 - App Features

- Features added in this part:
  - User authentication (sign in/up)
  - Protected routes (middleware)
  - Admin dashboard
  - User, category, and product management

### 00:18:13 - Setup Next Auth

https://next-auth.js.org/getting-started/example

- Install NextAuth.js:
  ```bash
  npm install next-auth
  ```

https://next-auth.js.org/configuration/initialization#route-handlers-app

- Create [route.ts](src/app/api/auth/[...nextauth]/route.ts) in `app/api/auth/[...nextauth]`.
- Configure providers (CredentialsProvider) in [auth.ts](src/server/auth.ts)
- Update environment variables (NEXTAUTH_SECRET,NODE_ENV, etc) [.env](.env).
- Connect authentication to Prisma (Prisma Adapter).
  - install prisma-adapter
  ```bash
  npm i @next-auth/prisma-adapter
  ```

### 00:39:11 - Add JSX for Auth Pages

- Build sign in and sign up pages using Shadcn UI components.

  - create [signin](src/app/[locale]/auth/signin/page.tsx)
  - create [signup](src/app/[locale]/auth/signup/page.tsx)

### 00:48:30 - Build useFormFields Hook

- Create a custom hook for form field management (`useFormFields`) [useFormFields](src/hooks/useFormFields.ts).

- Simplifies handling of form values and changes.
- Example:
  ```ts
  const { fields, handleChange } = useFormFields({ email: "", password: "" });
  ```

### 01:20:03 - Add Signin Form (signin action)

- Implement sign in logic using NextAuth.
- Handle errors and responses.
- Redirect user after successful sign in.

### 02:24:09 - Add Signup Form (signup action)

- Implement sign up logic with validation.
  https://zod.dev/

  - install zod
    ```bash
    npm install zod
    ```
    https://www.npmjs.com/package/bcrypt
    https://www.npmjs.com/package/@types/bcrypt
  - install bcrypt
    ```bash
    npm i bcrypt
    npm i @types/bcrypt
    ```
  - create [auth.ts](src/validations/auth.ts)
  - create [translations.ts](src/types/translations.ts)

- Add new user to the database.

  - update [schema.prisma](prisma/schema.prisma)

    - After any changes to your schema.prisma, update your database with:

    ```bash
    npx prisma generate
    npx prisma migrate dev

    ```

- Auto sign in after registration.

### 03:02:27 - Protected Routes (Next Middleware)

- Use Next.js middleware to protect admin pages.
- Redirect unauthorized users to the login page.
- Example:
  ```ts
  // src/middleware.ts
  if (!session || !session.user.isAdmin) {
    return NextResponse.redirect("/auth/login");
  }
  ```

### 04:07:52 - Add EditUserForm Component

- Build a form to edit user data (name, email, role).
- Connect the form to the database for direct updates.
- cloudinary for images
- https://console.cloudinary.com/app/c-cd1141008d57cafd351eaf01472532/image/getting-started

-https://console.cloudinary.com/app/c-cd1141008d57cafd351eaf01472532/image/getting-started

- install cloudinary

````bash
   npm i cloudinary
   ```

### 05:52:55 - Add AdminTabs Component

- Created the `AdminTabs` component in `src/app/[locale]/admin/_components/AdminTabs.tsx`:
- Renders navigation tabs for the admin dashboard (Profile, Categories, Menu Items, Users, Orders).
- Uses translations from the current locale for tab labels (i18n-ready).
- Highlights the active tab based on the current route and locale.
- Utilizes Next.js client-side navigation and custom button variants for consistent UI.
- Added a detailed documentation header explaining the component's purpose, props, i18n support, and usage.

- Updated the admin layout in `src/app/[locale]/admin/layout.tsx`:
- Loads translations asynchronously for the current locale.
- Renders the `AdminTabs` component above all admin page content for consistent navigation.
- Ensures all admin pages are i18n-ready and follow a unified structure.
- Added a detailed documentation header describing the layout's role, props, async data loading, and best practices.

- See the source files for full documentation headers and implementation details:
- `src/app/[locale]/admin/_components/AdminTabs.tsx`
- `src/app/[locale]/admin/layout.tsx`

### 06:00:47 - Add Categories Page

- Build the categories management page (list, add, edit, delete).
- Connect the page to the database via Prisma.

### 06:46:45 - Add MenuItems Page

- Build the products management page (list, add, edit, delete).
- Support linking products to categories, sizes, and extras.

### 10:17:01 - Add Users Page

- Build the users management page (list, edit, delete, change role).
- Protect sensitive operations (role changes).

### 10:33:43 - Test App Scenarios

- Test all scenarios:
- Register a new user
- Sign in as user/admin
- Test protected routes
- Add/edit categories and products
- Manage users from the admin dashboard

---

> You can add more details or code samples under each step as needed. If you want a detailed explanation for any part, specify the step or timestamp.
````

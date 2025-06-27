// ReduxProvider.tsx
// -----------------
// This component is a custom provider for integrating Redux with Next.js App Router.
// It wraps the application with the Redux <Provider> and supplies the Redux store to all child components.
//
// Why use a separate ReduxProvider?
// - Next.js App Router (with server components) requires providers to be defined as client components ("use client").
// - This pattern keeps the layout clean and allows easy extension (e.g., adding more providers in the future).
//
// Usage:
// - Import and wrap your app's layout or root component with <ReduxProvider>.
// - All child components can now access the Redux store using hooks (useAppSelector, useAppDispatch).
//
// Example:
//   <ReduxProvider>
//     <App />
//   </ReduxProvider>

"use client";

import { store } from "@/redux/store";
import { Provider } from "react-redux";

export default function ReduxProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Provider store={store}>{children}</Provider>;
}

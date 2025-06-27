// -----------------------------------------------------------------------------
// src/redux/store.ts
//
// Redux Store Configuration
// -------------------------
// Purpose:
// - Sets up the Redux store for global state management in the application.
// - Integrates the cart slice reducer for managing cart state.
//
// Features:
// - Uses Redux Toolkit's configureStore for best practices and simplicity.
// - Enables Redux DevTools in development for easier debugging.
// - Exports RootState and AppDispatch types for use with hooks and components.
//
// Usage:
//   import { store } from '@/redux/store';
//   <Provider store={store}>...</Provider>
//
// Notes:
// - Add more reducers to the reducer object as your app grows.
// -----------------------------------------------------------------------------

import { Environments } from "@/constants/enums";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  devTools: process.env.NODE_ENV === Environments.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// -----------------------------------------------------------------------------
// src/redux/hooks.ts
//
// Typed Redux Hooks
// -----------------
// Purpose:
// - Provides strongly-typed versions of useDispatch and useSelector for use with the Redux store.
// - Ensures type safety and autocompletion in components that interact with Redux state.
//
// Features:
// - useAppDispatch: Typed dispatch hook for dispatching actions.
// - useAppSelector: Typed selector hook for accessing state.
//
// Usage:
//   import { useAppDispatch, useAppSelector } from '@/redux/hooks';
//   const dispatch = useAppDispatch();
//   const cart = useAppSelector(state => state.cart.items);
//
// Notes:
// - Always use these hooks instead of the base useDispatch/useSelector for type safety.
// -----------------------------------------------------------------------------

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

// src/lib/formatters.ts
//
// Currency Formatting Utility
// --------------------------
// Purpose:
// - Provides a utility function to format numbers as currency strings (e.g., $12.99).
// - Ensures consistent currency formatting across the app.
//
// Features:
// - Uses Intl.NumberFormat for locale-aware formatting.
// - Default is USD, but can be extended for other currencies/locales.
//
// Usage:
// import { formatCurrency } from '@/lib/formatters';
// formatCurrency(19.99); // "$19.99"

export const formatCurrency = (number: number) => {
  const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  });
  return CURRENCY_FORMATTER.format(number);
};

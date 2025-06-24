// src/constants/enums.ts
//
// This file contains all the main enums (enumerations) used throughout the project.
//
// Purpose:
// - Centralizes all constant values that represent a fixed set of options, types, or states.
// - Improves code readability, maintainability, and reduces the risk of typos or inconsistent values.
// - Makes it easy to update or extend options in one place.
//
// Enums included:
// - Directions: Text direction (RTL/LTR) for localization.
// - Languages: Supported language codes.
// - Routes: Main app routes for navigation and routing.
// - Pages: Page slugs for authentication and admin pages.
// - InputTypes: HTML input types for form fields.
// - Navigate: Navigation actions (next/prev) for paginated UIs.
// - Responses: Standard response types for API/UI feedback.
// - SortOrder: Sorting direction (ascending/descending).
// - SortBy: Fields used for sorting data in tables/lists.
// - AuthMessages: Standard authentication success messages.
// - Methods: HTTP methods for API requests.
// - Environments: App environment (production/development).
// - UserRole: User roles for authorization (user/admin).
//
// Usage Example:
//   import { Methods, UserRole } from '@/constants/enums';
//   fetch('/api/orders', { method: Methods.POST });
//   if (user.role === UserRole.ADMIN) { ... }
//
// Keeping all enums here ensures consistency and easier refactoring across the codebase.

export enum Directions {
  RTL = "rtl",
  LTR = "ltr",
}

export enum Languages {
  ENGLISH = "en",
  ARABIC = "ar",
}

export enum Routes {
  ROOT = "/",
  MENU = "menu",
  ABOUT = "about",
  CONTACT = "contact",
  AUTH = "auth",
  CART = "cart",
  PROFILE = "profile",
  ADMIN = "admin",
}

export enum Pages {
  LOGIN = "signin",
  Register = "signup",
  FORGOT_PASSWORD = "forgot-password",
  CATEGORIES = "categories",
  MENU_ITEMS = "menu-items",
  USERS = "users",
  ORDERS = "orders",
  NEW = "new",
  EDIT = "edit",
}

export enum InputTypes {
  TEXT = "text",
  EMAIL = "email",
  PASSWORD = "password",
  NUMBER = "number",
  DATE = "date",
  TIME = "time",
  DATE_TIME_LOCAL = "datetime-local",
  CHECKBOX = "checkbox",
  RADIO = "radio",
  SELECT = "select",
  TEXTAREA = "textarea",
  FILE = "file",
  IMAGE = "image",
  COLOR = "color",
  RANGE = "range",
  TEL = "tel",
  URL = "url",
  SEARCH = "search",
  MONTH = "month",
  WEEK = "week",
  HIDDEN = "hidden",
  MULTI_SELECT = "multi select",
}

export enum Navigate {
  NEXT = "next",
  PREV = "prev",
}
export enum Responses {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export enum SortBy {
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
  NAME = "name",
  EMAIL = "email",
  PHONE = "phone",
  STATUS = "status",
  START_DATE = "startDate",
  END_DATE = "endDate",
}

export enum AuthMessages {
  LOGIN_SUCCESS = "Login successfully",
  LOGOUT_SUCCESS = "Logout successfully",
  REGISTER_SUCCESS = "Register successfully",
  FORGET_PASSWORD_SUCCESS = "Forget password successfully",
  RESET_PASSWORD_SUCCESS = "Reset password successfully",
}

export enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export enum Environments {
  PROD = "production",
  DEV = "development",
}
export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

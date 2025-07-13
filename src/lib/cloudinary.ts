// -----------------------------------------------------------------------------
// src/lib/cloudinary.ts
//
// Cloudinary Configuration Utility
// -----------------------------------------------------------------------------
// Purpose:
//   Centralizes and manages the configuration for the Cloudinary SDK, enabling
//   secure image and file uploads to the Cloudinary cloud service.
//
// Features:
//   - Loads Cloudinary credentials (cloud name, API key, API secret) from environment variables.
//   - Exports a pre-configured Cloudinary instance for use throughout the app.
//   - Supports all Cloudinary SDK operations (upload, delete, transform, etc.).
//
// Usage:
//   Import the default export from this file wherever Cloudinary operations are needed:
//     import cloudinary from "@/lib/cloudinary";
//
// Best Practices:
//   - Never hardcode credentials; always use environment variables for secrets.
//   - Use this shared instance to avoid repeated configuration and for consistency.
//   - Ensure environment variables are set in all deployment environments.
// -----------------------------------------------------------------------------

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

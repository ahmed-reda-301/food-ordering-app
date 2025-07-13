// -----------------------------------------------------------------------------
// src/app/api/upload/route.ts
//
// API Route: Image Upload to Cloudinary
// -----------------------------------------------------------------------------
// Purpose:
//   Handles HTTP POST requests for uploading images to Cloudinary from the client.
//
// Features:
//   - Accepts multipart/form-data with a file and pathName from the client.
//   - Converts the uploaded file to a base64 string for Cloudinary compatibility.
//   - Uploads the image to a specified Cloudinary folder with transformation (resize/crop to 200x200, focus on face).
//   - Returns the secure Cloudinary URL of the uploaded image on success.
//   - Handles and returns errors with appropriate HTTP status codes.
//
// Usage:
//   POST to /api/upload with form-data: { file: <File>, pathName: <string> }
//   Used by profile and admin forms for user avatar/image uploads.
//
// Best Practices:
//   - Always validate file presence and type before upload.
//   - Use environment variables for Cloudinary credentials (see @/lib/cloudinary).
//   - Handle errors gracefully and never expose sensitive error details to the client.
// -----------------------------------------------------------------------------

import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

// Define the type for the form data file
type FormDataFile = Blob & {
  name?: string; // Optional: Some browsers may add this
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as FormDataFile | null;
    const pathName = formData.get("pathName") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    // Convert the file to a format Cloudinary can handle (Buffer or Base64)
    const fileBuffer = await file.arrayBuffer();
    const base64File = Buffer.from(fileBuffer).toString("base64");
    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(
      `data:${file.type};base64,${base64File}`,
      {
        folder: pathName,
        transformation: [
          { width: 200, height: 200, crop: "fill", gravity: "face" },
        ],
      }
    );
    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}

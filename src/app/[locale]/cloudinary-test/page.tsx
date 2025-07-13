"use client";
import { useState } from "react";

export default function CloudinaryTest() {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("pathName", "test_images");
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setImageUrl(data.url);
      } else {
        setError(data.error || "Upload failed");
      }
    } catch (err) {
      setError("Network error");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 32 }}>
      <h2>Test Cloudinary Upload</h2>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {loading && <p>Uploading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {imageUrl && (
        <div>
          <p>Uploaded Image:</p>
          <img
            src={imageUrl}
            alt="Uploaded"
            style={{ maxWidth: 300, borderRadius: 8 }}
          />
        </div>
      )}
    </div>
  );
}

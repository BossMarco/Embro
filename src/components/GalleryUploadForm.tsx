"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/admin/admin.module.css";

export function GalleryUploadForm() {
  const router = useRouter();
  const [status, setStatus] = useState<string>();
  const [uploading, setUploading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUploading(true);
    setStatus(undefined);
    const response = await fetch("/api/admin/gallery", {
      method: "POST",
      body: new FormData(event.currentTarget),
    });
    const result = (await response.json()) as { error?: string };
    setUploading(false);
    if (!response.ok) return setStatus(result.error ?? "Upload failed.");
    event.currentTarget.reset();
    setStatus("Image published to the gallery.");
    router.refresh();
  }

  return (
    <form className={styles.uploadForm} onSubmit={submit}>
      <label>
        Project image (JPG, PNG, or WebP; 4 MB max)
        <input
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          required
        />
      </label>
      <label>
        Caption
        <input
          name="caption"
          placeholder="Embroidered work uniforms"
          required
        />
      </label>
      <label>
        Image description
        <input
          name="altText"
          placeholder="Embroidered navy uniforms with client logo"
          required
        />
      </label>
      <div className={styles.formColumns}>
        <label>
          Service
          <select name="service" defaultValue="Custom Embroidery">
            <option>Custom Embroidery</option>
            <option>Screen Printing</option>
            <option>DTF Printing</option>
            <option>Custom apparel</option>
          </select>
        </label>
        <label>
          City
          <input name="city" defaultValue="McAllen, TX" required />
        </label>
      </div>
      {status ? <p className={styles.uploadStatus}>{status}</p> : null}
      <button type="submit" disabled={uploading}>
        {uploading ? "Uploading…" : "Publish image"}
      </button>
    </form>
  );
}

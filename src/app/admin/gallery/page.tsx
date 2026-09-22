import Link from "next/link";
import { redirect } from "next/navigation";
import { GalleryUploadForm } from "@/components/GalleryUploadForm";
import { hasAdminSession } from "@/lib/admin-auth";
import { getAdminGallery } from "@/lib/gallery";
import styles from "../admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  if (!(await hasAdminSession())) redirect("/admin/login");
  const images = await getAdminGallery();
  return (
    <main className={styles.shell}>
      <div className={styles.topline}>
        <Link className={styles.brand} href="/admin">
          Embro Xpress Admin
        </Link>
        <Link className={styles.back} href="/gallery">
          View public gallery
        </Link>
      </div>
      <h1 className={styles.heading}>
        Add gallery
        <br />
        <span>work.</span>
      </h1>
      <p className={styles.intro}>
        Upload a finished project and add the context customers need to
        understand it.
      </p>
      <section className={styles.uploadPanel}>
        <GalleryUploadForm />
      </section>
      <section className={styles.adminGallery}>
        <h2>Published images</h2>
        {images.length ? (
          <ul>
            {images.map((image) => (
              <li key={image.id}>
                <span>{image.caption}</span>
                <small>
                  {image.service} · {image.city}
                </small>
              </li>
            ))}
          </ul>
        ) : (
          <p>No gallery images yet.</p>
        )}
      </section>
    </main>
  );
}

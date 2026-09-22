import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getPublishedGallery } from "@/lib/gallery";
import styles from "./gallery.module.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Gallery | Custom Apparel Projects in the RGV",
  description:
    "Browse recent embroidery, screen printing, and DTF apparel projects from Embro Xpress in McAllen, Texas.",
};

export default async function GalleryPage() {
  const images = await getPublishedGallery();
  return (
    <div>
      <SiteHeader />
      <main>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>Recent projects</p>
          <h1>
            Work made
            <br />
            <span>to be seen.</span>
          </h1>
          <p>
            Browse custom embroidery, screen printing, and DTF apparel projects
            from the Embro Xpress shop in McAllen.
          </p>
        </section>
        {images.length ? (
          <section className={styles.grid}>
            {images.map((image) => (
              <article className={styles.card} key={image.id}>
                <div className={styles.imageWrap}>
                  <Image
                    src={image.image_url}
                    alt={image.alt_text}
                    fill
                    sizes="(max-width: 800px) 100vw, 33vw"
                  />
                </div>
                <div className={styles.copy}>
                  <b>{image.caption}</b>
                  <span>
                    {image.service} · {image.city}
                  </span>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className={styles.empty}>
            <h2>The next project could be yours.</h2>
            <p>New work is being added from the shop.</p>
            <Link href="/#contact">Start your project ↗</Link>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

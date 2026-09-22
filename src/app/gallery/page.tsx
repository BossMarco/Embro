import Image from "next/image";
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

const featuredWork = [
  {
    id: "stx-aero-caps",
    image_url: "/images/embroidered-caps-stx.jpg",
    alt_text: "Custom embroidered STX Aero caps",
    caption: "STX Aero caps",
    service: "Custom logo embroidery",
    city: "Rio Grande Valley",
  },
  {
    id: "raf-motors-caps",
    image_url: "/images/embroidered-caps-raf.jpg",
    alt_text: "Custom embroidered RAF Motors caps",
    caption: "RAF Motors caps",
    service: "Precision logo embroidery",
    city: "Rio Grande Valley",
  },
  {
    id: "embro-xpress-mcallen-shop",
    image_url: "/images/embro-xpress-storefront.jpg",
    alt_text: "Embro Xpress storefront in McAllen",
    caption: "McAllen shop",
    service: "Local RGV service",
    city: "McAllen, Texas",
  },
];

export default async function GalleryPage() {
  const images = await getPublishedGallery();
  const galleryImages = [...featuredWork, ...images];
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
        <section className={styles.grid}>
          {galleryImages.map((image) => (
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
      </main>
      <SiteFooter />
    </div>
  );
}

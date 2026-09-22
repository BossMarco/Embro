import { neon } from "@neondatabase/serverless";

export type GalleryImage = {
  id: number;
  image_url: string;
  alt_text: string;
  caption: string;
  service: string;
  city: string;
  created_at: string;
};

let gallerySchemaReady: Promise<void> | undefined;

function database() {
  const connectionString = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;
  return connectionString ? neon(connectionString) : null;
}

function clean(value: string, fallback: string) {
  return value.trim().slice(0, 180) || fallback;
}

async function ensureGallerySchema() {
  const sql = database();
  if (!sql) return false;
  gallerySchemaReady ??= sql`
    CREATE TABLE IF NOT EXISTS gallery_images (
      id BIGSERIAL PRIMARY KEY,
      image_url TEXT NOT NULL,
      alt_text TEXT NOT NULL,
      caption TEXT NOT NULL,
      service TEXT NOT NULL,
      city TEXT NOT NULL,
      published BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `.then(() => undefined);
  await gallerySchemaReady;
  return true;
}

export async function addGalleryImage(
  input: Omit<GalleryImage, "id" | "created_at">,
) {
  if (!(await ensureGallerySchema()))
    throw new Error("Gallery database is not configured.");
  const sql = database();
  if (!sql) throw new Error("Gallery database is not configured.");
  await sql`
    INSERT INTO gallery_images (image_url, alt_text, caption, service, city)
    VALUES (${input.image_url}, ${clean(input.alt_text, "Embro Xpress project")}, ${clean(input.caption, "New Embro Xpress project")}, ${clean(input.service, "Custom apparel")}, ${clean(input.city, "McAllen, TX")})
  `;
}

export async function getPublishedGallery(): Promise<GalleryImage[]> {
  if (!(await ensureGallerySchema())) return [];
  const sql = database();
  if (!sql) return [];
  return (await sql`SELECT id, image_url, alt_text, caption, service, city, created_at::text FROM gallery_images WHERE published = TRUE ORDER BY created_at DESC`) as GalleryImage[];
}

export async function getAdminGallery(): Promise<GalleryImage[]> {
  if (!(await ensureGallerySchema())) return [];
  const sql = database();
  if (!sql) return [];
  return (await sql`SELECT id, image_url, alt_text, caption, service, city, created_at::text FROM gallery_images ORDER BY created_at DESC`) as GalleryImage[];
}

import { del, put } from "@vercel/blob";
import { hasAdminSession } from "@/lib/admin-auth";
import { addGalleryImage } from "@/lib/gallery";

const imageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function POST(request: Request) {
  if (!(await hasAdminSession()))
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const formData = await request.formData();
    const image = formData.get("image");
    if (!(image instanceof File) || !image.size || !imageTypes.has(image.type))
      return Response.json(
        { error: "Upload a JPG, PNG, or WebP image." },
        { status: 400 },
      );
    if (image.size > 4 * 1024 * 1024)
      return Response.json(
        { error: "Images must be 4 MB or smaller." },
        { status: 400 },
      );
    const extension =
      image.name
        .split(".")
        .pop()
        ?.replace(/[^a-z0-9]/gi, "") || "jpg";
    const blob = await put(
      `gallery/${Date.now()}-${crypto.randomUUID()}.${extension}`,
      image,
      { access: "public", addRandomSuffix: false },
    );
    try {
      await addGalleryImage({
        image_url: blob.url,
        alt_text: text(formData, "altText"),
        caption: text(formData, "caption"),
        service: text(formData, "service"),
        city: text(formData, "city"),
      });
    } catch (error) {
      await del(blob.url);
      throw error;
    }
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Gallery upload failed", error);
    return Response.json(
      { error: "The image could not be saved. Please try again." },
      { status: 500 },
    );
  }
}

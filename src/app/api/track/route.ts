import { headers } from "next/headers";
import { recordVisit } from "@/lib/analytics";

export async function POST(request: Request) {
  const userAgent = request.headers.get("user-agent") ?? "";
  if (/bot|crawler|spider|preview|lighthouse/i.test(userAgent))
    return new Response(null, { status: 204 });
  try {
    const body = (await request.json()) as {
      path?: unknown;
      referrer?: unknown;
      search?: unknown;
    };
    if (
      typeof body.path !== "string" ||
      !body.path.startsWith("/") ||
      body.path.length > 300
    )
      return Response.json({ error: "Invalid visit" }, { status: 400 });
    const requestHeaders = await headers();
    const city = requestHeaders.get("x-vercel-ip-city")
      ? decodeURIComponent(requestHeaders.get("x-vercel-ip-city")!)
      : undefined;
    await recordVisit({
      path: body.path,
      referrer: typeof body.referrer === "string" ? body.referrer : undefined,
      search: typeof body.search === "string" ? body.search : undefined,
      city,
      state: requestHeaders.get("x-vercel-ip-country-region") ?? undefined,
    });
  } catch {
    return new Response(null, { status: 204 });
  }
  return new Response(null, { status: 204 });
}

import { neon } from "@neondatabase/serverless";

type Source = "Google" | "Facebook" | "Instagram" | "Direct" | "Referral";

type VisitInput = {
  path: string;
  referrer?: string;
  search?: string;
  city?: string;
  state?: string;
};

let schemaReady: Promise<void> | undefined;

function database() {
  const connectionString = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;
  return connectionString ? neon(connectionString) : null;
}

function tidy(value: string | null | undefined, fallback: string) {
  return value?.trim().slice(0, 100) || fallback;
}

function sourceFrom(
  referrer?: string,
  search?: string,
): { source: Source; host: string } {
  const params = new URLSearchParams(search);
  const utmSource = params.get("utm_source")?.toLowerCase();
  const knownSource = ["google", "facebook", "instagram"].find(
    (source) => source === utmSource,
  );
  if (knownSource)
    return {
      source: (knownSource[0].toUpperCase() + knownSource.slice(1)) as Source,
      host: `${knownSource} (UTM)`,
    };
  if (!referrer) return { source: "Direct", host: "Direct" };
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "").toLowerCase();
    if (host.includes("google.")) return { source: "Google", host };
    if (host.includes("facebook.com") || host.includes("fb.com"))
      return { source: "Facebook", host };
    if (host.includes("instagram.com")) return { source: "Instagram", host };
    return { source: "Referral", host };
  } catch {
    return { source: "Direct", host: "Direct" };
  }
}

async function ensureSchema() {
  const sql = database();
  if (!sql) return false;
  schemaReady ??= sql`
    CREATE TABLE IF NOT EXISTS visitor_events (
      id BIGSERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      path TEXT NOT NULL,
      source TEXT NOT NULL,
      referrer_host TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL
    )
  `.then(() => undefined);
  await schemaReady;
  return true;
}

export async function recordVisit(input: VisitInput) {
  if (!(await ensureSchema())) return;
  const sql = database();
  if (!sql) return;
  const referral = sourceFrom(input.referrer, input.search);
  await sql`
    INSERT INTO visitor_events (path, source, referrer_host, city, state)
    VALUES (${tidy(input.path, "/")}, ${referral.source}, ${tidy(referral.host, "Direct")}, ${tidy(input.city, "Unknown")}, ${tidy(input.state, "Unknown")})
  `;
}

type CountRow = { label: string; count: number };

export type DashboardStats = {
  total: number;
  sources: CountRow[];
  locations: CountRow[];
  pages: CountRow[];
  configured: boolean;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  if (!(await ensureSchema()))
    return {
      total: 0,
      sources: [],
      locations: [],
      pages: [],
      configured: false,
    };
  const sql = database();
  if (!sql)
    return {
      total: 0,
      sources: [],
      locations: [],
      pages: [],
      configured: false,
    };
  const [total, sources, locations, pages] = await Promise.all([
    sql`SELECT COUNT(*)::int AS count FROM visitor_events`,
    sql`SELECT source AS label, COUNT(*)::int AS count FROM visitor_events GROUP BY source ORDER BY count DESC, label ASC`,
    sql`SELECT CASE WHEN city = 'Unknown' THEN 'Unknown location' ELSE city || ', ' || state END AS label, COUNT(*)::int AS count FROM visitor_events GROUP BY city, state ORDER BY count DESC, label ASC LIMIT 12`,
    sql`SELECT path AS label, COUNT(*)::int AS count FROM visitor_events GROUP BY path ORDER BY count DESC, label ASC LIMIT 12`,
  ]);
  return {
    total: Number((total as { count?: number }[])[0]?.count ?? 0),
    sources: sources as CountRow[],
    locations: locations as CountRow[],
    pages: pages as CountRow[],
    configured: true,
  };
}

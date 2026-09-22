import Link from "next/link";
import { redirect } from "next/navigation";
import { logout } from "./actions";
import styles from "./admin.module.css";
import { hasAdminSession } from "@/lib/admin-auth";
import { getDashboardStats } from "@/lib/analytics";

export const dynamic = "force-dynamic";

function List({
  rows,
  empty,
}: {
  rows: { label: string; count: number }[];
  empty: string;
}) {
  return (
    <ul className={styles.list}>
      {rows.length ? (
        rows.map((row) => (
          <li key={row.label}>
            <span>{row.label}</span>
            <b>{row.count}</b>
          </li>
        ))
      ) : (
        <li>
          <span>{empty}</span>
        </li>
      )}
    </ul>
  );
}

export default async function AdminPage() {
  if (!(await hasAdminSession())) redirect("/admin/login");
  const stats = await getDashboardStats();
  return (
    <main className={styles.shell}>
      <div className={styles.topline}>
        <Link className={styles.brand} href="/">
          Embro Xpress
        </Link>
        <form action={logout}>
          <button className={styles.logout} type="submit">
            Log out
          </button>
        </form>
      </div>
      <h1 className={styles.heading}>
        Traffic
        <br />
        <span>at a glance.</span>
      </h1>
      <p className={styles.intro}>
        First-party visit data from this website. City and state are
        approximate, while source reflects browser referrer or UTM data.
      </p>
      <div className={styles.stat}>
        <b>{stats.total}</b>
        <span>Tracked visits</span>
      </div>
      <section className={styles.grid}>
        <article className={styles.panel}>
          <h2>Traffic source</h2>
          <List rows={stats.sources} empty="No visits tracked yet." />
        </article>
        <article className={styles.panel}>
          <h2>City and state</h2>
          <List rows={stats.locations} empty="No locations recorded yet." />
        </article>
        <article className={styles.panel}>
          <h2>Popular pages</h2>
          <List rows={stats.pages} empty="No page views tracked yet." />
        </article>
      </section>
      <aside className={styles.notice}>
        <b>
          {stats.configured
            ? "Tracking is connected."
            : "Database connection unavailable."}
        </b>
        {stats.configured
          ? "Data begins appearing as new visitors load public pages. No IP addresses, full user agents, or full referral URLs are saved."
          : "Confirm POSTGRES_URL is present in the Vercel project environment variables."}
      </aside>
    </main>
  );
}

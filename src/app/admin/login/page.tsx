import Link from "next/link";
import { login } from "../actions";
import styles from "../admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main className={styles.login}>
      <section className={styles.loginCard}>
        <Link className={styles.brand} href="/">
          Embro Xpress
        </Link>
        <h1>
          Admin
          <br />
          <span>access.</span>
        </h1>
        <p>Sign in to view first-party website traffic statistics.</p>
        {error ? (
          <p className={styles.error}>That password did not match.</p>
        ) : null}
        <form className={styles.form} action={login}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
          <button type="submit">Sign in</button>
        </form>
      </section>
    </main>
  );
}

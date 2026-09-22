import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import styles from "@/app/site.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} href="/">
        <Image
          src="/images/embro-xpress-logo.jpg"
          alt="Embro Xpress"
          width={56}
          height={56}
          priority
        />
        <span>
          EMBRO
          <br />
          <b>XPRESS</b>
        </span>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/services/custom-embroidery">Services</Link>
        <Link href="/service-areas">RGV service areas</Link>
        <Link href="/#portfolio">Our work</Link>
        <Link href="/#contact">Contact</Link>
      </nav>
      <a className={styles.headerCta} href={site.phoneHref}>
        Call {site.phone}
      </a>
    </header>
  );
}

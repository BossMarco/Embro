import Link from "next/link";
import { serviceAreas, services, site } from "@/lib/site";
import styles from "@/app/site.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div>
        <p className={styles.kicker}>Embro Xpress</p>
        <h2>
          Made for your
          <br />
          next shift.
        </h2>
        <a className={styles.buttonLight} href={site.phoneHref}>
          Call {site.phone} ↗
        </a>
      </div>
      <div className={styles.footerLinks}>
        <div>
          <b>Services</b>
          {services.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`}>
              {service.name}
            </Link>
          ))}
        </div>
        <div>
          <b>RGV areas</b>
          {serviceAreas.slice(0, 5).map((area) => (
            <Link key={area.slug} href={`/service-areas/${area.slug}`}>
              {area.name}
            </Link>
          ))}
        </div>
        <div>
          <b>Visit</b>
          <a href={site.maps} target="_blank" rel="noreferrer">
            401 W US Hwy 83
            <br />
            McAllen, TX
          </a>
          <a href={site.facebook} target="_blank" rel="noreferrer">
            Facebook ↗
          </a>
        </div>
      </div>
      <p className={styles.copyright}>
        © {new Date().getFullYear()} Embro Xpress · Embroidery, Screen Printing
        & DTF in the Rio Grande Valley
      </p>
    </footer>
  );
}

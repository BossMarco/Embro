import Image from "next/image";
import Link from "next/link";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { serviceAreas, services, site } from "@/lib/site";
import enhancements from "@/components/Enhancements.module.css";
import styles from "./site.module.css";

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    image: `${site.url}/images/embro-xpress-storefront.jpg`,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "401 W US Highway 83, Suite 130",
      addressLocality: "McAllen",
      addressRegion: "TX",
      postalCode: "78501",
      addressCountry: "US",
    },
    areaServed: serviceAreas.map((area) => area.name),
    sameAs: [site.facebook],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "08:00",
        closes: "14:00",
      },
    ],
  };
  return (
    <div className={styles.shell}>
      <SiteHeader />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>McAllen · Rio Grande Valley</p>
            <h1>
              Apparel that
              <br />
              <span>puts you to work.</span>
            </h1>
            <p>
              Embro Xpress brings your logo to life with custom embroidery,
              screen printing, and DTF printing for businesses, teams, and
              organizations across the RGV.
            </p>
            <div className={enhancements.heroActions}>
              <Link className={styles.button} href="#contact">
                Start your project ↗
              </Link>
              <a className={enhancements.buttonSecondary} href={site.phoneHref}>
                Call {site.phone}
              </a>
            </div>
            <div className={styles.trust}>
              <span>Embroidery</span>
              <span>Screen Printing</span>
              <span>DTF</span>
            </div>
          </div>
          <HeroSlideshow />
        </section>
        <div className={styles.band}>
          <span>CUSTOM EMBROIDERY</span>
          <i>✦</i>
          <span>SCREEN PRINTING</span>
          <i>✦</i>
          <span>DTF PRINTING</span>
          <i>✦</i>
          <span>RIO GRANDE VALLEY</span>
        </div>
        <section className={`${styles.section} ${styles.intro}`}>
          <p className={styles.kicker}>Your mark, made visible</p>
          <div>
            <h2>Branded apparel for the way RGV works.</h2>
            <p>
              From a sharp embroidered uniform to printed team shirts and
              detailed DTF graphics, we help local businesses and groups create
              apparel that feels intentional. Bring your logo or ask us about
              getting a project started.
            </p>
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <div>
              <p className={styles.kicker}>What we do</p>
              <h2>Built around your brand.</h2>
            </div>
            <p>
              Explore the decoration method that fits your apparel, logo, and
              project goals.
            </p>
          </div>
          <div className={styles.grid3}>
            {services.map((service) => (
              <article className={styles.serviceCard} key={service.slug}>
                <Image
                  src={service.image}
                  alt={service.name}
                  width={800}
                  height={600}
                  sizes="(max-width: 800px) 100vw, 33vw"
                />
                <div>
                  <h3>{service.name}</h3>
                  <p>{service.summary}</p>
                  <Link
                    className={styles.textLink}
                    href={`/services/${service.slug}`}
                  >
                    Explore {service.name} ↗
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <div>
              <p className={styles.kicker}>Across the RGV</p>
              <h2>
                Local shop.
                <br />
                Regional reach.
              </h2>
            </div>
            <p>
              Our shop is based in McAllen and serves organizations throughout
              the Rio Grande Valley.
            </p>
          </div>
          <div className={styles.areaLinks}>
            {serviceAreas.map((area) => (
              <Link key={area.slug} href={`/service-areas/${area.slug}`}>
                Custom apparel in {area.name} ↗
              </Link>
            ))}
          </div>
        </section>
        <section className={styles.contact} id="contact">
          <div className={styles.contactCopy}>
            <p className={styles.kicker}>Let’s make it happen</p>
            <h2>Ready to put your logo to work?</h2>
          </div>
          <div className={styles.contactInfo}>
            <a href={site.phoneHref}>{site.phone}</a>
            <a href={site.maps} target="_blank" rel="noreferrer">
              {site.address} ↗
            </a>
            <a href={site.facebook} target="_blank" rel="noreferrer">
              Message us on Facebook ↗
            </a>
            <div className={styles.hours}>
              <b>Shop hours</b>
              <br />
              Monday–Thursday: 8:00 AM–5:00 PM
              <br />
              Friday: 8:00 AM–2:00 PM
              <br />
              Saturday: By appointment only
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}

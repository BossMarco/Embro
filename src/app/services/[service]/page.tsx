import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import enhancements from "@/components/Enhancements.module.css";
import { serviceAreas, services, site } from "@/lib/site";
import styles from "../../site.module.css";

const details: Record<
  string,
  {
    heading: string;
    body: string;
    points: string[];
    faqs: { question: string; answer: string }[];
  }
> = {
  "custom-embroidery": {
    heading: "Custom embroidery that carries your name further.",
    body: "Embroidery adds a durable, elevated finish to work uniforms, polos, button-downs, caps, outerwear, and other apparel. Bring an existing logo or contact our McAllen shop to discuss your project.",
    points: [
      "Uniform and workwear logo embroidery",
      "Custom embroidered caps and headwear",
      "Polos, button-downs, and outerwear",
      "Business, team, and organization apparel",
    ],
    faqs: [
      {
        question: "What can be embroidered?",
        answer:
          "Embro Xpress can discuss embroidery for uniforms, polos, button-downs, caps, outerwear, and other apparel projects.",
      },
      {
        question: "Can I bring my logo?",
        answer:
          "Yes. Bring an existing logo to the McAllen shop or contact the team to start the conversation about your project.",
      },
      {
        question: "Who does Embro Xpress serve?",
        answer:
          "The shop works with businesses, teams, and organizations in McAllen and across the Rio Grande Valley.",
      },
    ],
  },
  "screen-printing": {
    heading:
      "Screen-printed apparel for teams, events, and everyday brand visibility.",
    body: "Screen printing is a practical way to bring your graphic, message, or logo to apparel for groups and organizations. Talk with Embro Xpress about your shirt or apparel project in the Rio Grande Valley.",
    points: [
      "Branded T-shirts and apparel",
      "Team and organization projects",
      "Event and group apparel",
      "Logo and graphic printing",
    ],
    faqs: [
      {
        question: "What is screen printing used for?",
        answer:
          "Screen printing is a practical option for branded T-shirts, team apparel, events, groups, logos, and graphic-driven projects.",
      },
      {
        question: "Can we discuss a group or event order?",
        answer:
          "Yes. Call or message Embro Xpress to discuss apparel for teams, organizations, and events.",
      },
      {
        question: "Where is the shop located?",
        answer:
          "Embro Xpress is located in McAllen and serves customers throughout the Rio Grande Valley.",
      },
    ],
  },
  "dtf-printing": {
    heading:
      "Detailed DTF prints for apparel projects that need color and flexibility.",
    body: "DTF printing gives apparel projects a way to reproduce detailed, full-color artwork. It is a strong option to discuss when your project includes a complex graphic or colorful design.",
    points: [
      "Full-color apparel graphics",
      "Detailed logo reproduction",
      "Flexible apparel decoration option",
      "Projects for businesses, groups, and teams",
    ],
    faqs: [
      {
        question: "When is DTF printing a good option?",
        answer:
          "DTF is a strong option to discuss for apparel projects with detailed, full-color artwork or complex graphics.",
      },
      {
        question: "Can I use a detailed logo?",
        answer:
          "Bring your logo or graphic to Embro Xpress so the team can discuss the best decoration method for the project.",
      },
      {
        question: "Does Embro Xpress serve the whole RGV?",
        answer:
          "The McAllen shop works with businesses, groups, and teams across the Rio Grande Valley.",
      },
    ],
  },
};
export function generateStaticParams() {
  return services.map((service) => ({ service: service.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const item = services.find((x) => x.slug === service);
  return item
    ? {
        title: `${item.name} in McAllen, TX`,
        description: `${item.summary} Serving McAllen and the Rio Grande Valley.`,
      }
    : {};
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: slug } = await params;
  const service = services.find((x) => x.slug === slug);
  const detail = details[slug];
  if (!service || !detail) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.name,
        description: service.summary,
        areaServed: serviceAreas.map((area) => area.name),
        provider: {
          "@type": "LocalBusiness",
          name: site.name,
          telephone: site.phone,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: detail.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };
  return (
    <div className={styles.shell}>
      <SiteHeader />
      <main>
        <section className={styles.pageHero}>
          <p className={styles.crumbs}>
            <Link href="/">Home</Link> / Services / {service.name}
          </p>
          <p className={styles.kicker}>Embro Xpress services</p>
          <h1>
            {service.name}
            <br />
            <span>in the RGV.</span>
          </h1>
          <p>
            {service.summary} Work with a McAllen shop serving the Rio Grande
            Valley.
          </p>
        </section>
        <section className={styles.contentGrid}>
          <article className={styles.prose}>
            <Image
              className={styles.serviceImage}
              src={service.image}
              alt={service.name}
              width={1200}
              height={800}
              priority
            />
            <h2>{detail.heading}</h2>
            <p>{detail.body}</p>
            <h2>What we can help with</h2>
            <ul>
              {detail.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <h2>Common questions</h2>
            <div className={enhancements.faqList}>
              {detail.faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
            <h2>Serving McAllen and the Rio Grande Valley</h2>
            <p>
              Embro Xpress is located in McAllen and works with customers across
              the RGV. Explore nearby service areas:{" "}
              {serviceAreas.slice(0, 4).map((area, index) => (
                <span key={area.slug}>
                  {index ? ", " : ""}
                  <Link
                    className={styles.textLink}
                    href={`/service-areas/${area.slug}`}
                  >
                    {area.name}
                  </Link>
                </span>
              ))}
              .
            </p>
          </article>
          <aside className={styles.sidebar}>
            <h2>Start a project</h2>
            <p>
              Call our McAllen shop or send us a message on Facebook to discuss
              your apparel needs.
            </p>
            <a href={site.phoneHref}>Call {site.phone}</a>
            <a href={site.facebook} target="_blank" rel="noreferrer">
              Facebook ↗
            </a>
            <a href={site.maps} target="_blank" rel="noreferrer">
              Get directions ↗
            </a>
          </aside>
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

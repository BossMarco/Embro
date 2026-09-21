import styles from "./page.module.css";

const phone = "+19565798717";
const facebook = "https://www.facebook.com/embroxpressrgv";
const maps = "https://www.google.com/maps/search/?api=1&query=401+W+US+Highway+83+Suite+130+McAllen+TX+78501";

function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function Home() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav} aria-label="Primary navigation">
        <a className={styles.brand} href="#top" aria-label="Embro Xpress home"><span className={styles.brandMark}>EX</span><span>EMBRO<br />XPRESS</span></a>
        <div className={styles.navLinks}><a href="#work">Our work</a><a href="#services">Services</a><a href="#visit">Visit us</a></div>
        <a className={styles.navCta} href={`tel:${phone}`}>Call now <Arrow /></a>
      </nav>

      <section className={styles.hero} id="top">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span /> McAllen, Texas · RGV</p>
          <h1>Wear your<br /><em>best work.</em></h1>
          <p className={styles.lede}>Custom embroidery and uniforms made for the people behind the work.</p>
          <div className={styles.heroActions}><a className={styles.primaryButton} href={facebook} target="_blank" rel="noreferrer">Start a project <Arrow /></a><a className={styles.textButton} href={`tel:${phone}`}>956 579 8717 <span>→</span></a></div>
        </div>
        <div className={styles.heroArt} aria-label="Abstract embroidered textile artwork"><div className={styles.stitchOne}>CREW</div><div className={styles.stitchTwo}>LOCAL</div><div className={styles.thread} /><div className={styles.swatch}>RGV<br /><span>EST. HERE</span></div><div className={styles.needle} aria-hidden="true" /></div>
        <p className={styles.heroNote}>GOOD THREADS,<br />BETTER IMPRESSIONS.</p>
      </section>

      <section className={styles.marquee} aria-label="Services"><span>EMBROIDERY</span><i>✳</i><span>UNIFORMS</span><i>✳</i><span>SHIRTS</span><i>✳</i><span>CAPS</span><i>✳</i><span>EMBROIDERY</span></section>

      <section className={styles.intro} id="work"><p className={styles.sectionLabel}>01 / WHAT WE MAKE</p><div><h2>Made to show up.</h2><p>From the first stitch to the final detail, your apparel should look as sharp as the people wearing it.</p></div><a href={facebook} target="_blank" rel="noreferrer" className={styles.outlineButton}>See the latest <Arrow /></a></section>

      <section className={styles.gallery} aria-label="Product categories">
        <article className={`${styles.galleryCard} ${styles.cardOne}`}><span className={styles.cardNumber}>01</span><div className={styles.shirtShape}><span>YOUR<br />MARK<br />HERE</span></div><h3>Team-ready uniforms</h3></article>
        <article className={`${styles.galleryCard} ${styles.cardTwo}`}><span className={styles.cardNumber}>02</span><div className={styles.capShape}><span>EX</span></div><h3>Caps with character</h3></article>
        <article className={`${styles.galleryCard} ${styles.cardThree}`}><span className={styles.cardNumber}>03</span><div className={styles.patchShape}>GOOD<br />WORK</div><h3>Details that last</h3></article>
      </section>

      <section className={styles.services} id="services"><div className={styles.servicesLead}><p className={styles.sectionLabel}>02 / THE SHOP</p><h2>Put your name<br />on it.</h2><p>Bring an idea, a logo, or a full team list. We’ll help you create apparel that feels like yours.</p></div><div className={styles.serviceList}>{[["01", "Custom embroidery", "A lasting mark for the work you’re proud of."], ["02", "Uniforms", "A pulled-together look for your crew."], ["03", "Shirts & caps", "Everyday pieces made more personal."]].map(([number, title, copy]) => <div className={styles.service} key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><Arrow /></div>)}</div></section>

      <section className={styles.visit} id="visit"><div><p className={styles.sectionLabel}>03 / COME BY</p><h2>Let’s make<br /><em>something</em> good.</h2></div><div className={styles.visitDetails}><p>401 W US Highway 83<br />Suite 130<br />McAllen, TX 78501</p><a href={maps} target="_blank" rel="noreferrer">Get directions <Arrow /></a><a href={`tel:${phone}`}>Call 956 579 8717 <Arrow /></a></div><div className={styles.locationStamp}>MCALLEN<br /><span>RIO GRANDE<br />VALLEY</span></div></section>

      <footer className={styles.footer}><a className={styles.brand} href="#top"><span className={styles.brandMark}>EX</span><span>EMBRO<br />XPRESS</span></a><p>Custom embroidery & uniforms<br /><span>Excelente calidad y servicio.</span></p><a href={facebook} target="_blank" rel="noreferrer">Facebook <Arrow /></a></footer>
    </main>
  );
}

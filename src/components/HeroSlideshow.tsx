"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./HeroSlideshow.module.css";

const slides = [
  { src: "/images/embroidered-uniforms.jpg", alt: "Embroidered Legacy Aero Avionics work uniforms", label: "Uniform embroidery" },
  { src: "/images/embroidered-caps-stx.jpg", alt: "Custom embroidered STX Aero caps", label: "Custom caps" },
  { src: "/images/embroidered-caps-raf.jpg", alt: "Custom embroidered RAF Motors caps", label: "Logo detail" },
];

export function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => { if (paused) return; const timer = window.setInterval(() => setActive(current => (current + 1) % slides.length), 5500); return () => window.clearInterval(timer); }, [paused]);
  return <section className={styles.slider} aria-label="Examples of Embro Xpress work">
    {slides.map((slide, index) => <Image key={slide.src} src={slide.src} alt={slide.alt} fill priority={index === 0} sizes="(max-width: 800px) 100vw, 50vw" className={`${styles.slide} ${active === index ? styles.slideActive : ""}`} />)}
    <div className={styles.slideInfo}><span>{String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span><b>{slides[active].label}</b></div>
    <div className={styles.slideControls} role="tablist" aria-label="Choose portfolio image">{slides.map((slide, index) => <button key={slide.src} type="button" role="tab" aria-label={`Show ${slide.label}`} aria-selected={active === index} className={active === index ? styles.slideDotActive : ""} onClick={() => setActive(index)} />)}<button className={styles.pauseButton} type="button" onClick={() => setPaused(value => !value)}>{paused ? "Play" : "Pause"}</button></div>
  </section>;
}

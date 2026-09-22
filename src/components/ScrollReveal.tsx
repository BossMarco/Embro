"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealProps = { children: ReactNode; className?: string };

export function ScrollReveal({ children, className }: ScrollRevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        !root.current
      )
        return;
      gsap.fromTo(
        root.current,
        { autoAlpha: 0.18, scale: 0.96, y: 34 },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.82,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 84%",
            once: true,
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}

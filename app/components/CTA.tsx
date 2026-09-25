"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import type Lenis from "lenis";

interface CTAProps {
  lenisRef: RefObject<Lenis | null>;
}

export default function CTA({ lenisRef }: CTAProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-title",
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current as HTMLElement,
            start: "top top+=100",
          },
        }
      );

      gsap.fromTo(
        ".cta-button",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current as HTMLElement,
            start: "top top+=100",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[80vh] flex-col items-center justify-center bg-dark px-6"
      aria-label="Call to action"
    >
      <div className="cta-title text-center">
        <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-bold tracking-tight text-light">
          HAVE AN IDEA?
        </h2>
        <p className="mt-4 text-[clamp(1.5rem,4vw,3.5rem)] font-bold tracking-tight text-accent">
          LET&apos;S BUILD IT.
        </p>
      </div>

      <div className="cta-button mt-12">
        <a
          href="mailto:hello@nexora.dev"
          className="group relative inline-block overflow-hidden rounded-full border border-light/20 px-12 py-5 transition-colors duration-300 hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-dark"
          aria-label="Start a project — contact us at hello@nexora.dev"
        >
          <span className="relative z-10 font-mono text-sm tracking-[0.2em] text-light transition-colors duration-300 group-hover:text-accent">
            START A PROJECT
          </span>
          <span className="absolute bottom-0 left-0 right-0 top-0 flex translate-y-full items-center justify-center bg-accent/10 font-mono text-sm tracking-[0.2em] text-accent transition-transform duration-300 group-hover:translate-y-0">
            LET&apos;S TALK
          </span>
        </a>
      </div>
    </section>
  );
}

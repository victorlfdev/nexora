"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import type Lenis from "lenis";

interface AboutProps {
  lenisRef: RefObject<Lenis | null>;
}

export default function About({ lenisRef: _lenisRef }: AboutProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-text",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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
      className="relative flex min-h-screen flex-col items-center justify-center bg-dark px-6"
      role="region"
      aria-label="About"
    >
      <div className="max-w-3xl text-center">
        <p className="about-text text-[clamp(1.5rem,3vw,3rem)] font-bold leading-[1.3] tracking-tight text-light">
          Technology should feel invisible.
          <span className="block mt-4 text-accent">
            The experience shouldn&apos;t.
          </span>
        </p>
        <p className="about-text mt-8 font-mono text-sm leading-relaxed text-light/40">
          We combine strategy, design and engineering to build digital products
          that solve real problems and feel effortless to use. Based in São
          Paulo, working globally.
        </p>
      </div>

      {/* Abstract depth visualization */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {[0, 1, 2, 3].map((layer) => (
          <div
            key={layer}
            className="absolute inset-0 opacity-[0.02]"
            style={{
              background: `radial-gradient(circle at ${50 + layer * 10}% ${50 + layer * 5}%, #4D7CFE 0%, transparent 60%)`,
              transform: `scale(${1 + layer * 0.1})`,
            }}
          />
        ))}
      </div>
    </section>
  );
}

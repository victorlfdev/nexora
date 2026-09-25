"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";
import type Lenis from "lenis";

interface ComplexityClarityProps {
  lenisRef: RefObject<Lenis | null>;
}

const elements = [
  "API",
  "DATABASE",
  "AI",
  "UX",
  "INFRA",
  "DATA",
  "SYSTEMS",
  "CLOUD",
  "SECURITY",
  "MONITORING",
];

function generatePositions(count: number) {
  const positions: { top: string; left: string }[] = [];
  for (let i = 0; i < count; i++) {
    positions.push({
      top: `${20 + Math.random() * 60}%`,
      left: `${10 + Math.random() * 80}%`,
    });
  }
  return positions;
}

export default function ComplexityClarity({ lenisRef }: ComplexityClarityProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [chaosPositions] = useState<{ top: string; left: string }[]>(() =>
    generatePositions(elements.length)
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current as HTMLElement,
          start: "top top+=100",
          end: `+=${window.innerHeight * 1.5}`,
          pin: true,
          scrub: 1,
        },
      });

      // Phase 1: Chaotic state - elements scattered
      tl.fromTo(
        ".chaos-element",
        {
          opacity: 0,
          scale: 0.5,
          rotation: () => gsap.utils.random(-30, 30),
          x: () => gsap.utils.random(-200, 200),
          y: () => gsap.utils.random(-100, 100),
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          x: 0,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
        }
      );

      // Phase 2: Elements start organizing
      tl.to(
        ".chaos-element",
        {
          opacity: 0.3,
          scale: 0.8,
          duration: 0.5,
          stagger: 0.05,
        },
        "+=0.5"
      );

      // Phase 3: Product emerges
      tl.fromTo(
        ".product-box",
        {
          opacity: 0,
          scale: 0.8,
          clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
        },
        {
          opacity: 1,
          scale: 1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1,
          ease: "power3.inOut",
        },
        "-=0.3"
      );

      // Phase 4: Tagline appears
      tl.fromTo(
        ".tagline",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center bg-light"
      role="region"
      aria-label="Complexity to Clarity"
    >
      {/* Main heading */}
      <div className="mb-24 text-center">
        <h2 className="text-[clamp(2rem,5vw,5rem)] font-bold tracking-tight text-dark">
          COMPLEXITY
        </h2>
      </div>

      {/* Chaotic elements */}
      <div className="relative flex h-96 w-full">
        {elements.map((el, i) => (
          <span
            key={el}
            className="chaos-element absolute font-mono text-xs tracking-widest text-dark/40"
            style={{
              top: chaosPositions[i]?.top ?? `${20 + Math.random() * 60}%`,
              left: chaosPositions[i]?.left ?? `${10 + Math.random() * 80}%`,
            }}
          >
            {el}
          </span>
        ))}
      </div>

      {/* Product box */}
      <div className="product-box relative mt-12 opacity-0">
        <div className="border-2 border-dark/20 px-16 py-12">
          <div className="mb-4 text-center">
            <span className="font-mono text-xs tracking-[0.3em] text-dark/60">
              PRODUCT
            </span>
          </div>
          <div className="text-center">
            <span className="text-2xl font-bold tracking-tight text-dark">
              SOLUTION
            </span>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div className="tagline mt-16 text-center">
        <p className="font-mono text-sm tracking-wider text-dark/60">
          Complex problems deserve simple experiences.
        </p>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const elements = ["API", "DATABASE", "AI", "UX", "INFRA", "DATA", "SYSTEMS", "CLOUD", "SECURITY", "MONITORING"];

function animateTransformation(element: HTMLElement) {
  gsap.timeline({
    scrollTrigger: {
      trigger: element, start: "top top", end: () => `+=${window.innerHeight * 0.7}`,
      pin: true, scrub: 0.6, invalidateOnRefresh: true,
    },
  })
    .to(".chaos-element", { y: (i) => (i % 2 ? -12 : 12), opacity: 0.35, stagger: 0.04, duration: 0.6 })
    .from(".product-box", { scale: 0.92, duration: 0.6, ease: "power2.out" }, "<")
    .to(".clarity-word", { color: "#4D7CFE", duration: 0.4 }, "<");
}

export default function ComplexityClarity() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollAnimation(sectionRef, animateTransformation);
  return (
    <section id="transformation" ref={sectionRef} className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-light px-6 py-20 text-dark md:py-24" aria-labelledby="transformation-heading">
      <div className="mx-auto w-full max-w-5xl text-center">
        <h2 id="transformation-heading" className="text-[clamp(2rem,5.5vw,5rem)] font-bold leading-tight tracking-tight">
          COMPLEXITY.<br /><span className="clarity-word text-dark/60">MEET CLARITY.</span>
        </h2>
        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-5 md:mt-16" aria-hidden="true">
          {elements.map((label) => <span key={label} className="chaos-element border border-dark/15 px-2 py-3 font-mono text-xs text-dark/65">{label}</span>)}
        </div>
        <div className="mx-auto h-12 w-px bg-dark/20 md:h-16" aria-hidden="true" />
        <div className="product-box mx-auto max-w-sm border border-dark/25 px-6 py-8">
          <span className="font-mono text-xs tracking-[0.2em] text-dark/65">PRODUCT</span>
          <p className="mt-2 text-2xl font-bold tracking-tight">SOLUTION</p>
        </div>
        <p className="mx-auto mt-10 max-w-md text-base leading-relaxed text-dark/70">Complex problems deserve simple experiences.</p>
      </div>
    </section>
  );
}

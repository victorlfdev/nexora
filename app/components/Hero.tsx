"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import ArrowIcon from "./ArrowIcon";

const Particles = dynamic(() => import("./Particles"), { ssr: false });

function animateHero(element: HTMLElement) {
  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: element,
      start: "top top",
      end: () => `+=${window.innerHeight}`,
      pin: true,
      scrub: 0.5,
      invalidateOnRefresh: true,
    },
  });
  // Timelines restore every property when reversing or jumping to an anchor.
  timeline.to(".hero-copy", { y: -45, opacity: 0.15, scale: 0.96, duration: 1 }, 0)
    .to(".scroll-indicator", { opacity: 0, duration: 0.25 }, 0)
    .to(".hero-surface", { backgroundColor: "#F5F5F2", duration: 0.35 }, 0.65)
    .to(".hero-copy", { opacity: 0, duration: 0.35 }, 0.65);
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  useScrollAnimation(heroRef, animateHero);

  return (
    <section id="top" ref={heroRef} className="hero relative flex min-h-svh items-center justify-center overflow-hidden bg-dark px-6 pb-28 pt-36" aria-labelledby="hero-heading">
      <div className="hero-surface absolute inset-0 bg-dark" aria-hidden="true" />
      <div className="particle-layer pointer-events-none absolute inset-0" aria-hidden="true">
        <Particles particleCount={100} particleSpread={8} speed={0.035} particleBaseSize={65} className="opacity-50" />
      </div>
      <div className="hero-copy relative z-10 mx-auto w-full max-w-6xl text-center">
        <h1 id="hero-heading" className="hero-title font-bold tracking-tight text-light">
          <span className="line-1 block">WE BUILD WHAT</span>
          <span className="line-2 mt-2 block">COMES</span>
          <span className="line-3 mt-2 block text-accent">NEXT.</span>
        </h1>
        <p className="hero-subtitle mt-8 text-sm text-light/70 md:text-base">Digital products · Software · AI</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          <a href="#work" className="primary-link">Explore our work <ArrowIcon /></a>
          <a href="#contact" className="secondary-link">Start a project <ArrowIcon /></a>
        </div>
      </div>
      <a href="#transformation" className="scroll-indicator absolute bottom-8 left-6 z-10 flex min-h-11 items-center gap-4 text-xs text-light/70 md:bottom-10 md:left-12">
        <span className="scroll-track" aria-hidden="true"><span /></span>
        Scroll to explore
      </a>
      <span className="absolute bottom-12 right-12 hidden font-mono text-xs text-light/60 md:block">São Paulo · Working globally</span>
    </section>
  );
}

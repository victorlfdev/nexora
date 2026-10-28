"use client";

import { useEffect, useRef } from "react";

const technologies = ["NEXT.JS", "REACT", "TYPESCRIPT", "NODE", "POSTGRESQL", "AI", "API", "CLOUD", "GSAP", "TAILWIND"];

export default function Technology() {
  const globeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    const observer = new IntersectionObserver(([entry]) => {
      globe.style.setProperty("--orbit-play-state", entry.isIntersecting ? "running" : "paused");
    });
    observer.observe(globe);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="technology" className="overflow-hidden bg-dark px-6 py-20 md:py-28" aria-labelledby="technology-heading">
      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h2 id="technology-heading" className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">BUILT TO<br />PERFORM.</h2>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4" aria-label="Technologies">
            {technologies.map((name) => <li key={name} className="border-b border-light/15 pb-3 font-mono text-xs tracking-wider text-light/75">{name}</li>)}
          </ul>
        </div>
        <div ref={globeRef} className="technology-globe relative mx-auto aspect-square w-full max-w-96" aria-hidden="true">
          <svg viewBox="0 0 400 400" className="size-full" fill="none">
            <circle cx="200" cy="200" r="158" stroke="currentColor" className="text-light/20" />
            {[45, 90, 130].map((radius) => <ellipse key={radius} cx="200" cy="200" rx={radius} ry="158" stroke="currentColor" className="text-light/15" />)}
            {[45, 90, 130].map((radius) => <ellipse key={radius} cx="200" cy="200" rx="158" ry={radius} stroke="currentColor" className="text-light/15" />)}
            <ellipse cx="200" cy="200" rx="185" ry="65" stroke="currentColor" className="text-accent/60" transform="rotate(-30 200 200)" />
          </svg>
          <div className="tech-orbit absolute inset-0">
            {[0, 1, 2, 3, 4].map((index) => (
              <span key={index} className="absolute size-2 rounded-full bg-accent" style={{ left: `${50 + 39.5 * Math.cos(index * Math.PI * 0.4)}%`, top: `${50 + 39.5 * Math.sin(index * Math.PI * 0.4)}%` }} />
            ))}
          </div>
          <span className="absolute inset-0 flex items-center justify-center bg-dark font-mono text-xs tracking-[0.2em] text-light/80 [clip-path:circle(48px)]">NEXORA</span>
        </div>
      </div>
    </section>
  );
}

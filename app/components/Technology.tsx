"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const technologies = [
  "NEXT.JS",
  "REACT",
  "TYPESCRIPT",
  "NODE",
  "POSTGRESQL",
  "AI",
  "API",
  "CLOUD",
  "GSAP",
  "TAILWIND",
];

export default function Technology() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        ".tech-title",
        {
          opacity: 0,
          y: 40,
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

      // Orbit animation
      technologies.forEach((tech, i) => {
        const angle = (i / technologies.length) * Math.PI * 2;
        const radius = window.innerWidth < 640 ? 110 : 160;
        const el = document.querySelector(`[data-tech="${tech}"]`);

        if (el) {
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          gsap.set(el, { x, y, opacity: 0 });

          gsap.to(el, {
            opacity: 1,
            duration: 0.6,
            delay: 0.2 + i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current as HTMLElement,
              start: "top top+=100",
            },
          });
        }
      });
    }, sectionRef);

    // Mouse parallax — only when motion is allowed
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        setMousePos({
          x: (e.clientX - centerX) / centerX,
          y: (e.clientY - centerY) / centerY,
        });
        rafRef.current = null;
      });
    };

    const handleMouseLeave = () => {
      setMousePos({ x: 0, y: 0 });
    };

    if (!prefersReducedMotion) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      ctx.revert();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (!prefersReducedMotion) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center bg-light px-6"
      role="region"
      aria-label="Technology"
    >
      {/* Title */}
      <div className="tech-title mb-20 text-center">
        <h2 className="text-[clamp(2rem,4vw,4rem)] font-bold tracking-tight text-dark">
          BUILT TO PERFORM.
        </h2>
      </div>

      {/* Orbit visualization */}
      <div
        ref={orbitRef}
        className="relative mx-auto flex h-72 w-72 sm:h-96 sm:w-96 items-center justify-center"
        style={{
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
        }}
      >
        {/* Center brand */}
        <div className="absolute z-10 text-center">
          <span className="block text-2xl font-bold tracking-widest text-dark">
            NEXORA
          </span>
        </div>

        {/* Orbiting technologies */}
        {technologies.map((tech, i) => {
          const angle = (i / technologies.length) * Math.PI * 2;
          const radius = window.innerWidth < 640 ? 110 : 160;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <span
              key={tech}
              data-tech={tech}
              className="absolute font-mono text-[10px] tracking-widest text-dark/30"
              style={{
                transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
              }}
            >
              {tech}
            </span>
          );
        })}

        {/* Orbit ring */}
        <div className="absolute h-72 w-72 sm:h-96 sm:w-96 rounded-full border border-dark/5" />
      </div>
    </section>
  );
}

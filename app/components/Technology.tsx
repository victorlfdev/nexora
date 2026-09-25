"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";
import type Lenis from "lenis";

interface TechnologyProps {
  lenisRef: RefObject<Lenis | null>;
}

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

export default function Technology({ lenisRef }: TechnologyProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
      const orbitCenter = { x: 0, y: 0 };

      technologies.forEach((tech, i) => {
        const angle = (i / technologies.length) * Math.PI * 2;
        const radius = 200;
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

    // Mouse parallax
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setMousePos({
        x: (e.clientX - centerX) / centerX,
        y: (e.clientY - centerY) / centerY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
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
        className="relative flex h-96 w-96 items-center justify-center"
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
          const radius = 160;
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
        <div className="absolute h-96 w-96 rounded-full border border-dark/5" />
      </div>
    </section>
  );
}

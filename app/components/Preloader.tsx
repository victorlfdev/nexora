"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const letters = "NEXORA".split("");

interface PreloaderProps {
  onExit?: () => void;
}

export default function Preloader({ onExit }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: () => {
              if (containerRef.current) {
                containerRef.current.style.display = "none";
              }
              onExit?.();
            },
          });
        },
      });

      // Letters appear one by one
      tl.fromTo(
        ".letter",
        {
          opacity: 0,
          y: 40,
          rotateX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
        }
      );

      // Hold, then letters converge
      tl.to(
        ".letter",
        {
          scale: 0.8,
          opacity: 0.3,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.in",
        },
        "+=0.3"
      );

      // Show full word
      tl.fromTo(
        ".full-word",
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // Subtitle appears
      tl.fromTo(
        ".subtitle",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-dark"
    >
      <div className="flex items-center gap-1">
        {letters.map((letter, i) => (
          <span
            key={i}
            className="letter text-6xl font-bold tracking-widest text-light"
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="full-word mt-2 text-5xl font-bold tracking-widest text-light opacity-0">
        NEXORA
      </div>
      <div className="subtitle mt-3 font-mono text-sm tracking-[0.3em] text-light/60 opacity-0">
        DIGITAL SYSTEMS & EXPERIENCES
      </div>
    </div>
  );
}

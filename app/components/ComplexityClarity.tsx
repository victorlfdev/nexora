"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

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
  const seeded = [
    { top: 15, left: 12 },
    { top: 25, left: 78 },
    { top: 45, left: 8 },
    { top: 55, left: 85 },
    { top: 35, left: 55 },
    { top: 70, left: 20 },
    { top: 10, left: 65 },
    { top: 80, left: 45 },
    { top: 50, left: 30 },
    { top: 65, left: 70 },
  ];
  return Array.from({ length: count }, (_, i) => {
    const seed = seeded[i % seeded.length];
    const jitter = 8;
    return {
      top: `${seed.top + (Math.random() * jitter - jitter / 2)}%`,
      left: `${seed.left + (Math.random() * jitter - jitter / 2)}%`,
    };
  });
}

export default function ComplexityClarity() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [chaosPositions] = useState(() => generatePositions(elements.length));
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: (e.clientX - (rect.left + rect.width / 2)) / rect.width,
      y: (e.clientY - (rect.top + rect.height / 2)) / rect.height,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top+=100",
          end: `+=${window.innerHeight * 1.5}`,
          pin: true,
          scrub: 1,
        },
      });

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

      tl.to(".chaos-element", {
        opacity: 0.3,
        scale: 0.8,
        duration: 0.5,
        stagger: 0.05,
      }, "+=0.5");

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

      tl.fromTo(
        ".tagline",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );
    }, sectionRef);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, [handleMouseMove]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center bg-light px-6"
      role="region"
      aria-label="Complexity to Clarity"
    >
      <div className="mb-20 text-center">
        <span className="font-mono text-xs tracking-[0.3em] text-dark/40">
          THE TRANSFORMATION
        </span>
        <h2 className="mt-20 text-[clamp(2rem,4vw,4rem)] font-bold leading-[1.1] tracking-tight text-dark">
          COMPLEXITY
        </h2>
      </div>

      <div className="chaos-field relative mx-auto min-h-[60vh] w-full max-w-5xl">
        {elements.map((el, i) => {
          const depth = (i % 3 + 1) * 0.5;
          return (
            <span
              key={el}
className="chaos-element absolute font-mono text-xs tracking-widest text-dark/40"
              style={{
                top: chaosPositions[i]?.top ?? "50%",
                left: chaosPositions[i]?.left ?? "50%",
                transform: `translate(${mousePos.x * depth * 30}px, ${mousePos.y * depth * 30}px)`,
              }}
            >
              {el}
            </span>
          );
        })}
      </div>

      <div className="product-box relative mt-20 opacity-0">
        <div className="border border-dark/10 px-20 py-12">
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

      <div className="tagline mt-20 text-center">
        <p className="font-mono text-xs tracking-[0.25em] text-dark/60 pb-2">
          Complex problems deserve simple experiences.
        </p>
      </div>
    </section>
  );
}

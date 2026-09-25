"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import type Lenis from "lenis";

interface ProcessProps {
  lenisRef: RefObject<Lenis | null>;
  isMobile?: boolean;
}

const scenes = [
  {
    number: "01",
    title: "DISCOVER",
    subtitle: "What are we actually solving?",
    body: "Understanding the problem space, the users, and the business context. We dig deep before we design.",
  },
  {
    number: "02",
    title: "DEFINE",
    subtitle: "Turning complexity into a clear product direction.",
    body: "Synthesizing research into a product strategy that balances ambition with feasibility.",
  },
  {
    number: "03",
    title: "DESIGN",
    subtitle: "Interface. Experience. Motion.",
    body: "Crafting every pixel, every interaction, every transition. Design is not decoration—it's how it works.",
  },
  {
    number: "04",
    title: "BUILD",
    subtitle: "React · TypeScript · Node · PostgreSQL · AI",
    body: "Solid engineering. Clean architecture. Scalable systems. We build what lasts.",
  },
  {
    number: "05",
    title: "LAUNCH",
    subtitle: "From idea to real product.",
    body: "Shipping with confidence. Monitoring, iterating, and evolving based on real data.",
  },
];

export default function Process({ lenisRef }: ProcessProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current as HTMLElement,
          start: "top top",
          end: `+=${window.innerHeight * scenes.length}`,
          pin: true,
          scrub: 1,
          markers: false,
        },
      });

      scenes.forEach((scene, i) => {
        const sceneEl = sectionRef.current?.querySelector(`[data-scene="${i}"]`);
        const prevSceneEl =
          i > 0
            ? sectionRef.current?.querySelector(
                `[data-scene="${i - 1}"]`
              )
            : null;

        // Fade out previous scene
        if (prevSceneEl) {
          tl.to(prevSceneEl, {
            opacity: 0,
            y: -40,
            duration: 0.3,
            ease: "power2.in",
          });
        }

        // Fade in current scene
        if (sceneEl) {
          tl.fromTo(
            sceneEl as Element,
            {
              opacity: 0,
              y: 40,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.1"
          );
        }
      });

      // Final fade out
      tl.to(
        `[data-scene="${scenes.length - 1}"]`,
        {
          opacity: 0,
          duration: 0.3,
        },
        "+=1"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center bg-light"
      role="region"
      aria-label="Our Process"
    >
      {/* Section header */}
      <div className="absolute top-8 left-0 right-0 text-center sm:top-12">
        <span className="font-mono text-[10px] tracking-[0.3em] text-dark/40 sm:text-xs">
          OUR PROCESS
        </span>
        <h2 className="mt-3 text-[clamp(2rem,4vw,4rem)] font-bold tracking-tight text-dark sm:mt-4">
          FROM IDEA TO IMPACT.
        </h2>
      </div>

      {/* Scenes */}
      {scenes.map((scene, i) => (
        <div
          key={scene.number}
          data-scene={i}
          className="scene absolute inset-0 flex flex-col items-center justify-center opacity-0 px-6"
          style={{ top: 0 }}
        >
          <span className="mb-4 font-mono text-5xl font-bold tracking-tight text-accent sm:text-6xl">
            {scene.number}
          </span>
          <h3 className="mb-3 text-center text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight text-dark sm:mb-4">
            {scene.title}
          </h3>
          <p className="mb-1.5 font-mono text-xs tracking-wider text-dark/60 sm:mb-2 sm:text-sm">
            {scene.subtitle}
          </p>
          <p className="mt-2 max-w-sm text-center text-xs leading-relaxed text-dark/40 sm:mt-4 sm:max-w-md sm:text-sm">
            {scene.body}
          </p>
        </div>
      ))}
    </section>
  );
}

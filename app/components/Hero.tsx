"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import type Lenis from "lenis";

interface HeroProps {
  lenisRef: RefObject<Lenis | null>;
}

export default function Hero({ lenisRef: _lenisRef }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const settersRef = useRef<Record<string, (v: number | string | Record<string, unknown>) => void>>({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cache batched quickSetters — each fires once per frame
      const qs = (target: string | HTMLElement, property: string, unit = "") =>
        gsap.quickSetter(target, property, unit) as (v: number | string | Record<string, unknown>) => void;
      const setters: Record<string, (v: number | string | Record<string, unknown>) => void> = {
        title: qs(".hero-title", "css"),
        line1: qs(".hero-title .line-1", "css"),
        line2: qs(".hero-title .line-2", "css"),
        line3: qs(".hero-title .line-3", "css"),
        subtitle: qs(".hero-subtitle", "css"),
        scrollInd: qs(".scroll-indicator", "opacity"),
        heroBg: qs(heroRef.current as HTMLElement, "backgroundColor"),
        titleColor: qs(".hero-title", "color"),
        subtitleColor: qs(".hero-subtitle", "color"),
        techColor: qs(".tech-elements .tech-item", "color"),
      };
      settersRef.current = setters;

      const _tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current as HTMLElement,
          start: "top top",
          end: `+=${window.innerHeight * 2}`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const sp = settersRef.current;

            // Phase 1 (0-0.2): Title grows
            if (progress < 0.2) {
              const p = progress / 0.2;
              sp.title({ scale: 1 + p * 0.3, opacity: 1 });
            }

            // Phase 2 (0.2-0.4): Words separate
            if (progress >= 0.2 && progress < 0.4) {
              const p = (progress - 0.2) / 0.2;
              sp.line1({ x: -p * 60, opacity: 1 - p * 0.5 });
              sp.line2({ x: p * 60, opacity: 1 - p * 0.5 });
              sp.line3({ y: p * 40, opacity: 1 - p * 0.8 });
            }

            // Phase 3 (0.4-0.6): Tech elements appear
            if (progress >= 0.4 && progress < 0.6) {
              const p = (progress - 0.4) / 0.2;
              gsap.to(".tech-elements .tech-item", {
                opacity: p,
                y: -20 * (1 - p),
                stagger: 0.05,
                duration: 0.3,
              });
            }

            // Phase 4 (0.6-0.8): Convergence
            if (progress >= 0.6 && progress < 0.8) {
              const p = (progress - 0.6) / 0.2;
              sp.title({ opacity: 1 - p, scale: 1.3 - p * 0.3 });
              sp.subtitle({ opacity: p, y: 20 * (1 - p) });
              sp.scrollInd(1 - p * 2);
            }

            // Phase 5 (0.8-1.0): Dark to Light transition
            if (progress >= 0.8) {
              const p = (progress - 0.8) / 0.2;
              sp.heroBg(gsap.utils.interpolate(["#050505", "#F5F5F2"], p));
              sp.titleColor(gsap.utils.interpolate(["#F5F5F2", "#050505"], p));
              sp.subtitleColor(gsap.utils.interpolate(["#F5F5F2", "#050505"], p));
              sp.techColor(gsap.utils.interpolate(["#F5F5F266", "#05050566"], p));
            }
          },
        },
      });

      // Initial state
      gsap.set(".hero-title .line-1, .hero-title .line-2, .hero-title .line-3", {
        opacity: 1,
      });
      gsap.set(".tech-elements .tech-item", { opacity: 0 });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-dark"
      role="region"
      aria-label="Hero"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,245,242,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,245,242,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Brand mark */}
      <div className="absolute top-12 left-12 z-10">
        <span className="font-mono text-xs tracking-[0.3em] text-light/40">
          NEXORA
        </span>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-12 right-12 z-10 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] tracking-[0.3em] text-light/40">
          SCROLL TO BEGIN
        </span>
        <div className="mt-2 h-8 w-[1px] bg-light/20">
          <div
            className="h-full w-full bg-accent"
            style={{
              animation: "scrollLine 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* Main title */}
      <h1 className="hero-title relative z-10 text-center">
        <div className="line-1 text-[clamp(3rem,8vw,8rem)] font-bold leading-[0.9] tracking-tight text-light">
          WE BUILD WHAT
        </div>
        <div className="line-2 mt-2 text-[clamp(3rem,8vw,8rem)] font-bold leading-[0.9] tracking-tight text-light">
          COMES
        </div>
        <div className="line-3 mt-2 text-[clamp(3rem,8vw,8rem)] font-bold leading-[0.9] tracking-tight text-accent">
          NEXT.
        </div>
      </h1>

      {/* Subtitle */}
      <div className="hero-subtitle mt-8 text-center">
        <p className="font-mono text-sm tracking-wider text-light/60">
          Digital products · Software · AI
        </p>
      </div>

      {/* Tech elements */}
      <div className="tech-elements absolute inset-0 pointer-events-none">
        {["API", "AI", "WEB", "DATA", "SYSTEMS", "SaaS", "Cloud"].map(
          (tech, i) => {
            const positions = [
              { top: "15%", left: "10%" },
              { top: "25%", right: "15%" },
              { top: "60%", left: "8%" },
              { top: "70%", right: "12%" },
              { top: "40%", left: "5%" },
              { top: "80%", left: "20%" },
              { top: "20%", right: "8%" },
            ];
            const pos = positions[i];
            return (
              <span
                key={tech}
                className="tech-item absolute font-mono text-xs tracking-widest text-light/0"
                style={{
                  ...pos,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {tech}
              </span>
            );
          }
        )}
      </div>
    </section>
  );
}

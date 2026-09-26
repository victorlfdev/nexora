"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

const technologies = [
  { name: "NEXT.JS", angle: 0, tilt: 0.2 },
  { name: "REACT", angle: Math.PI / 5, tilt: -0.3 },
  { name: "TYPESCRIPT", angle: (2 * Math.PI) / 5, tilt: 0.4 },
  { name: "NODE", angle: (3 * Math.PI) / 5, tilt: -0.1 },
  { name: "POSTGRESQL", angle: (4 * Math.PI) / 5, tilt: 0.35 },
  { name: "AI", angle: (5 * Math.PI) / 5, tilt: -0.25 },
  { name: "API", angle: (6 * Math.PI) / 5, tilt: 0.15 },
  { name: "CLOUD", angle: (7 * Math.PI) / 5, tilt: -0.35 },
  { name: "GSAP", angle: (8 * Math.PI) / 5, tilt: 0.25 },
  { name: "TAILWIND", angle: (9 * Math.PI) / 5, tilt: -0.15 },
];

function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mql.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);

  return prefersReduced;
}

function rotateY(x: number, y: number, z: number, angleDeg: number): [number, number, number] {
  const angleRad = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(angleRad);
  const sin = Math.sin(angleRad);
  return [
    x * cos + z * sin,
    y,
    -x * sin + z * cos,
  ];
}

export default function Technology({ isMobile }: { isMobile?: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const prefersReduced = useReducedMotion();
  const nodeRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const isMobileView = isMobile || typeof window !== "undefined" ? window.innerWidth < 768 : false;

  const handleMouseMove = useCallback((e: MouseEvent) => {
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
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".tech-title",
          { opacity: 0, y: 40 },
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

        technologies.forEach((tech, i) => {
          const el = document.querySelector(`[data-tech="${tech.name}"]`);
          if (el) {
            gsap.fromTo(
              el,
              { opacity: 0, scale: 0.5 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                delay: 0.3 + i * 0.08,
                ease: "back.out(1.7)",
                scrollTrigger: {
                  trigger: sectionRef.current as HTMLElement,
                  start: "top top+=100",
                },
              }
            );
          }
        });

        if (!prefersReduced) {
          const globe = globeRef.current;
          if (globe) {
            const sphereRadius = 160;
            const globeRotation = { rotationY: 0 };

            gsap.to(globeRotation, {
              rotationY: 360,
              duration: 60,
              ease: "none",
              repeat: -1,
              onUpdate: () => {
                const rotY = globeRotation.rotationY % 360;
                nodeRefs.current.forEach((el, name) => {
                  const tech = technologies.find((t) => t.name === name);
                  if (!tech) return;
                  const phi = tech.tilt * Math.PI * 0.6;
                  const theta = tech.angle;
                  const bx = Math.cos(phi) * Math.sin(theta) * sphereRadius;
                  const by = Math.sin(phi) * sphereRadius * 0.7;
                  const bz = Math.cos(phi) * Math.cos(theta) * sphereRadius;
                  const [rx, ry, rz] = rotateY(bx, by, bz, rotY);
                  const scale = 0.6 + (rz / sphereRadius) * 0.4;
                  const opacity = 0.4 + ((rz / sphereRadius) + 1) * 0.3;
                  const clampedScale = Math.max(0.5, Math.min(1.2, scale));
                  const clampedOpacity = Math.max(0.3, Math.min(1, opacity));
                  gsap.set(el, {
                    x: rx,
                    y: ry,
                    scale: clampedScale,
                    opacity: clampedOpacity,
                    zIndex: rz > 0 ? 10 : 1,
                    force3D: true,
                  });
                });
              },
            });
          }
        }
      }, sectionRef);

      const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (!mql.matches) {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", () => setMousePos({ x: 0, y: 0 }));
      }

      return () => {
        ctx.revert();
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", () => {});
      };
    });

    mm.add("(max-width: 767px)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".tech-title",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current as HTMLElement,
              start: "top top+=50",
            },
          }
        );

        const mobileNodes = document.querySelectorAll("[data-tech]");
        mobileNodes.forEach((el, i) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              delay: 0.2 + i * 0.06,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current as HTMLElement,
                start: "top top+=50",
              },
            }
          );
        });
      }, sectionRef);

      return () => {
        ctx.revert();
      };
    });

    return () => {
      mm.revert();
    };
  }, [prefersReduced, handleMouseMove]);

  const sphereRadius = 160;

  const projectedNodes = technologies.map((tech) => {
    const phi = tech.tilt * Math.PI * 0.6;
    const theta = tech.angle;
    const x = Math.cos(phi) * Math.sin(theta) * sphereRadius;
    const y = Math.sin(phi) * sphereRadius * 0.7;
    const z = Math.cos(phi) * Math.cos(theta) * sphereRadius;
    const scale = 0.6 + (z / sphereRadius) * 0.4;
    const opacity = 0.4 + ((z / sphereRadius) + 1) * 0.3;
    return { ...tech, x, y, z, scale: Math.max(0.5, Math.min(1.2, scale)), opacity: Math.max(0.3, Math.min(1, opacity)) };
  });

  const latLines = [
    { label: "equator", phi: 0, r: sphereRadius },
    { label: "tropic-n", phi: Math.PI / 6, r: sphereRadius * Math.cos(Math.PI / 6) },
    { label: "tropic-s", phi: -Math.PI / 6, r: sphereRadius * Math.cos(Math.PI / 6) },
    { label: "arctic", phi: Math.PI / 3, r: sphereRadius * Math.cos(Math.PI / 3) },
    { label: "antarctic", phi: -Math.PI / 3, r: sphereRadius * Math.cos(Math.PI / 3) },
  ];

  const longLines = Array.from({ length: 8 }, (_, i) => ({
    index: i,
    theta: (i * Math.PI) / 4,
  }));

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center bg-dark px-4 sm:px-6"
      role="region"
      aria-label="Technology"
    >
      <style>{`
        @keyframes node-glow {
          0%, 100% { filter: drop-shadow(0 0 3px rgba(77,124,254,0.6)); }
          50% { filter: drop-shadow(0 0 8px rgba(77,124,254,0.9)); }
        }
        @keyframes ring-pulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.3; }
        }
        .node-glow {
          animation: node-glow 3s ease-in-out infinite;
        }
        .ring-pulse {
          animation: ring-pulse 4s ease-in-out infinite;
        }
        .ring-pulse-delay {
          animation-delay: 2s;
        }
        @media (max-width: 767px) {
          .globe-desktop {
            display: none;
          }
        }
        @media (min-width: 768px) {
          .globe-mobile {
            display: none;
          }
        }
        .mobile-node {
          opacity: 0;
        }
      `}</style>

      <div className="tech-title mb-8 sm:mb-20 text-center">
        <h2 className="text-[clamp(1.8rem,4vw,4rem)] font-bold tracking-tight text-light">
          BUILT TO PERFORM.
        </h2>
      </div>

      <div
        ref={globeRef}
        className="relative globe-desktop"
        style={{
          width: `${sphereRadius * 2.5}px`,
          height: `${sphereRadius * 2.5}px`,
          perspective: "1000px",
          transform: `rotateX(${mousePos.y * -8}deg) rotateY(${mousePos.x * 8}deg)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
          }}
        >
          {latLines.map((line) => (
            <div
              key={line.label}
              className="absolute inset-0 rounded-full border border-light/10"
              style={{
                width: `${(line.r / sphereRadius) * 100}%`,
                height: `${(line.r / sphereRadius) * 100}%`,
                top: line.phi === 0 ? "50%" : `${50 - ((line.r * Math.sin(Math.abs(line.phi)) / sphereRadius) * 50)}%`,
                left: "50%",
                transform: "translate(-50%, -50%)",
                transformOrigin: "center center",
                borderColor: line.phi === 0 ? "rgba(77,124,254,0.2)" : "rgba(245,245,242,0.08)",
                borderWidth: line.phi === 0 ? "1.5px" : "1px",
              }}
            />
          ))}

          {longLines.map((line) => (
            <div
              key={`long-${line.index}`}
              className="absolute inset-0 rounded-full border border-light/10"
              style={{
                width: "100%",
                height: "100%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) rotateY(0deg)",
                transformOrigin: "center center",
                clipPath: `ellipse(${sphereRadius * 0.05}px ${sphereRadius * 0.95}px at 50% 50%)`,
                borderColor: "rgba(245,245,242,0.06)",
              }}
            />
          ))}

          {[0, 1, 2, 3].map((i) => (
            <div
              key={`vline-${i}`}
              className="absolute inset-0"
              style={{
                top: "50%",
                left: "50%",
                width: "2px",
                height: "100%",
                transform: `translate(-50%, -50%) rotateY(${i * 45}deg)`,
                transformStyle: "preserve-3d",
                borderLeft: "1px solid rgba(245,245,242,0.06)",
              }}
            />
          ))}

          <div
            className="absolute inset-0"
            style={{
              top: "50%",
              left: "50%",
              width: "100%",
              height: "2px",
              transform: "translate(-50%, -50%)",
              borderTop: "1px solid rgba(77,124,254,0.15)",
            }}
          />

          <div
            className="absolute inset-0 rounded-full ring-pulse"
            style={{
              width: "105%",
              height: "105%",
              top: "-2.5%",
              left: "-2.5%",
              border: "1px solid rgba(77,124,254,0.2)",
            }}
          />

          <div
            className="absolute inset-0 rounded-full ring-pulse ring-pulse-delay"
            style={{
              width: "115%",
              height: "115%",
              top: "-7.5%",
              left: "-7.5%",
              border: "1px solid rgba(245,245,242,0.06)",
              transform: "rotateX(60deg)",
            }}
          />

          <div
            className="absolute inset-0 rounded-full"
            style={{
              width: "30%",
              height: "30%",
              top: "35%",
              left: "35%",
              background: "radial-gradient(circle, rgba(77,124,254,0.12) 0%, transparent 70%)",
            }}
          />

          <div
            className="absolute z-20 flex items-center justify-center"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="text-center">
              <span className="block font-mono text-xs tracking-[0.3em] text-light/40">NEXORA</span>
            </div>
          </div>

          {projectedNodes.map((node) => (
            <div
              key={node.name}
              data-tech={node.name}
              ref={(el) => {
                if (el) nodeRefs.current.set(node.name, el);
              }}
              className="absolute node-glow"
              style={{
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%)`,
                opacity: node.opacity,
                zIndex: node.z > 0 ? 10 : 1,
              }}
            >
              <div className="flex flex-col items-center gap-1">
                <div
                  className="rounded-full"
                  style={{
                    width: "6px",
                    height: "6px",
                    background: "rgba(77,124,254,0.9)",
                    boxShadow: "0 0 6px rgba(77,124,254,0.6)",
                  }}
                />
                <span className="font-mono text-[10px] tracking-widest text-light/50 whitespace-nowrap">
                  {node.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="globe-mobile relative flex flex-col items-center justify-center gap-4 py-8 sm:hidden">
        {technologies.map((tech, i) => (
          <div
            key={tech.name}
            data-tech={tech.name}
            className="mobile-node flex items-center gap-2"
          >
            <div
              className="rounded-full"
              style={{
                width: "8px",
                height: "8px",
                background: "rgba(77,124,254,0.9)",
                boxShadow: "0 0 6px rgba(77,124,254,0.6)",
              }}
            />
            <span className="font-mono text-xs tracking-widest text-light/60">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

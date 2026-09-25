"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const cases = [
  {
    id: "01",
    name: "ORBIT",
    tag: "Enterprise Intelligence Platform",
    description:
      "A real-time operational dashboard for a logistics company. Visualizes supply chain data, predicts delays, and optimizes routes using ML.",
    metrics: [
      { label: "Revenue Growth", value: "+24.8%" },
      { label: "Data Points", value: "2.4M/day" },
      { label: "Uptime", value: "99.97%" },
    ],
    color: "var(--nexora-case-orbit)",
  },
  {
    id: "02",
    name: "FLUX",
    tag: "AI Workflow Platform",
    description:
      "An automation platform that connects AI models to business workflows. No-code interface for complex multi-step processes.",
    metrics: [
      { label: "Workflows Automated", value: "12K+" },
      { label: "Time Saved", value: "840hrs/mo" },
      { label: "Accuracy", value: "98.4%" },
    ],
    color: "var(--nexora-case-flux)",
  },
  {
    id: "03",
    name: "PULSE",
    tag: "Digital Operations System",
    description:
      "Internal operations platform for a fintech company. Manages user onboarding, compliance, and real-time transaction monitoring.",
    metrics: [
      { label: "Users Managed", value: "500K+" },
      { label: "Transactions", value: "1.2M/day" },
      { label: "Compliance", value: "100%" },
    ],
    color: "var(--nexora-case-pulse)",
  },
];

export default function Cases() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const totalWidth =
        wrapperRef.current?.querySelectorAll(".case-card").length ?? 0;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current as HTMLElement,
          start: "top top",
          end: `+=${window.innerWidth * totalWidth * 0.8}`,
          pin: true,
          scrub: 1,
        },
      });

      tl.to(".cases-wrapper", {
        xPercent: -75,
        ease: "none",
        duration: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-dark"
      role="region"
      aria-label="Selected Work"
    >
      {/* Section header */}
      <div className="px-6 pt-20 pb-12">
        <span className="font-mono text-xs tracking-[0.3em] text-light/40">
          SELECTED WORK
        </span>
        <h2 className="mt-4 text-[clamp(2rem,4vw,4rem)] font-bold tracking-tight text-light">
          CASES.
        </h2>
      </div>

      {/* Horizontal scroll wrapper */}
      <div
        ref={wrapperRef}
        className={`cases-wrapper ${
          isMobile
            ? "flex flex-col gap-8 px-6"
            : "flex gap-8 px-6"
        }`}
        role="region"
        aria-label="Case studies carousel"
      >
        {cases.map((caseItem) => (
          <div
            key={caseItem.id}
            className={`case-card ${
              isMobile
                ? "w-full rounded-xl border border-light/10 bg-dark-secondary p-6 sm:p-10"
                : "min-w-[85vw] max-w-[600px] flex-shrink-0 rounded-xl border border-light/10 bg-dark-secondary p-10"
            }`}
            role="article"
            aria-label={`Case ${caseItem.id}: ${caseItem.name}`}
          >
            {/* Case number */}
            <span className="font-mono text-xs tracking-[0.3em] text-light/30">
              CASE {caseItem.id}
            </span>

            {/* Case name */}
            <h3 className="mt-4 text-4xl font-bold tracking-tight text-light">
              {caseItem.name}
            </h3>
            <p className="mt-2 font-mono text-xs tracking-wider text-light/40">
              {caseItem.tag}
            </p>

            {/* Description */}
            <p className="mt-8 leading-relaxed text-light/60">
              {caseItem.description}
            </p>

            {/* Metrics */}
            <div className="mt-10 grid grid-cols-3 gap-6">
              {caseItem.metrics.map((metric) => (
                <div key={metric.label}>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: caseItem.color }}
                  >
                    {metric.value}
                  </div>
                  <div className="mt-1 font-mono text-[10px] tracking-widest text-light/30">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Visual placeholder */}
            <div
              className="mt-8 h-48 w-full rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${caseItem.color}10, ${caseItem.color}05)`,
                border: `1px solid ${caseItem.color}20`,
              }}
            >
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div
                    className="text-3xl font-bold"
                    style={{ color: caseItem.color }}
                  >
                    {caseItem.name}
                  </div>
                  <div className="mt-2 font-mono text-[10px] tracking-widest text-light/20">
                    PRODUCT PREVIEW
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

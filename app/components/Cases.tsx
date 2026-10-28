"use client";

import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

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

function animateCases(element: HTMLElement) {
  element.classList.add("cases-animated");
  const wrapper = element.querySelector<HTMLElement>(".cases-wrapper");
  if (!wrapper) return;
  const distance = () => Math.max(0, wrapper.scrollWidth - element.clientWidth);
  gsap.to(wrapper, {
    x: () => -distance(),
    ease: "none",
    scrollTrigger: {
      trigger: element, start: "top top", end: () => `+=${distance()}`,
      pin: true, scrub: 0.5, invalidateOnRefresh: true,
    },
  });
  return () => element.classList.remove("cases-animated");
}

function ProductPreview({ name, metrics }: { name: string; metrics: { label: string; value: string }[] }) {
  return (
    <div className="case-preview mt-7" aria-hidden="true">
      <div className="mb-5 flex items-center justify-between border-b border-light/15 pb-3">
        <span className="text-xs font-bold tracking-wider">{name} <span className="font-normal text-light/60">/ Overview</span></span>
        <span className="font-mono text-[10px] text-light/60">DEMO</span>
      </div>
      {name === "ORBIT" ? (
        <div>
          <div className="mb-3 flex items-baseline justify-between gap-2"><span className="text-xs text-light/70">Revenue growth</span><span className="font-mono text-sm" style={{ color: "var(--case-color)" }}>{metrics[0].value}</span></div>
          <div className="preview-bars">{[28, 40, 34, 55, 48, 72, 64, 84, 78, 100].map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}</div>
        </div>
      ) : name === "FLUX" ? (
        <div className="flex flex-wrap items-center gap-2 py-3">
          {["Trigger", "AI model", "Review", "Deliver"].map((label, index) => (
            <div key={label} className="flex items-center gap-2">
              {index > 0 ? <span className="text-light/60">→</span> : null}
              <span className="border border-light/20 px-3 py-3 text-xs" style={{ color: "var(--case-color)" }}>{label}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {["Onboarding", "Compliance", "Transactions"].map((label) => <div key={label} className="flex items-center justify-between border-b border-light/10 pb-2 text-xs"><span className="text-light/70">{label}</span><span style={{ color: "var(--case-color)" }}>Active</span></div>)}
        </div>
      )}
    </div>
  );
}

export default function Cases() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollAnimation(sectionRef, animateCases, "(min-width: 1024px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)");

  return (
    <section id="work" ref={sectionRef} className="relative overflow-hidden bg-dark pt-16 md:pt-20" aria-labelledby="work-heading">
      <div className="mx-auto max-w-5xl px-6 pb-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="work-heading" className="text-3xl font-bold tracking-tight md:text-5xl">SELECTED WORK.</h2>
          <span className="font-mono text-xs text-light/60">ORBIT / FLUX / PULSE</span>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-light/65">Concept projects. Products and metrics below are illustrative.</p>
      </div>
      <div className="cases-wrapper">
        {cases.map((caseItem) => (
          <article key={caseItem.id} className="case-card rounded-xl border border-light/15 bg-dark-secondary p-6 md:p-8" aria-labelledby={`case-${caseItem.id}`} style={{ "--case-color": caseItem.color } as CSSProperties}>
            <h3 id={`case-${caseItem.id}`} className="text-3xl font-bold tracking-tight md:text-4xl">{caseItem.name}</h3>
            <p className="mt-2 text-sm text-light/70">{caseItem.tag}</p>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-light/75">{caseItem.description}</p>
            <dl className="mt-6 grid grid-cols-1 gap-4 min-[400px]:grid-cols-3">
              {caseItem.metrics.map((metric) => (
                <div key={metric.label} className="min-w-0">
                  <dt className="text-xs leading-relaxed text-light/65">{metric.label}</dt>
                  <dd className="preview-metric mt-1 text-xl font-bold sm:text-2xl" style={{ color: "var(--case-color)" }}>{metric.value}</dd>
                </div>
              ))}
            </dl>
            <ProductPreview name={caseItem.name} metrics={caseItem.metrics} />
          </article>
        ))}
      </div>
    </section>
  );
}

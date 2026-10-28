"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const scenes = [
  { number: "01", title: "DISCOVER", subtitle: "What are we actually solving?", body: "Understanding the problem space, the users, and the business context. We dig deep before we design." },
  { number: "02", title: "DEFINE", subtitle: "Turning complexity into a clear product direction.", body: "Synthesizing research into a product strategy that balances ambition with feasibility." },
  { number: "03", title: "DESIGN", subtitle: "Interface. Experience. Motion.", body: "Crafting every pixel, every interaction, every transition. Design is not decoration—it's how it works." },
  { number: "04", title: "BUILD", subtitle: "React · TypeScript · Node · PostgreSQL · AI", body: "Solid engineering. Clean architecture. Scalable systems. We build what lasts." },
  { number: "05", title: "LAUNCH", subtitle: "From idea to real product.", body: "Shipping with confidence. Monitoring, iterating, and evolving based on real data." },
];

function animateProcess(element: HTMLElement) {
  element.classList.add("process-animated");
  const panels = element.querySelectorAll<HTMLElement>(".scene");
  gsap.set(panels, { autoAlpha: 0, y: 30 });
  gsap.set(panels[0], { autoAlpha: 1, y: 0 });
  const timeline = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    scrollTrigger: {
      trigger: element, start: "top top", end: () => `+=${window.innerHeight * 2.5}`,
      pin: true, scrub: 0.4, invalidateOnRefresh: true,
    },
  });
  panels.forEach((panel, index) => {
    if (index === 0) return;
    timeline.to(panels[index - 1], { autoAlpha: 0, y: -25, duration: 0.25 }, index - 0.25)
      .to(panel, { autoAlpha: 1, y: 0, duration: 0.35 }, index);
  });
  timeline.to({}, { duration: 0.5 });
  return () => element.classList.remove("process-animated");
}

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollAnimation(sectionRef, animateProcess);
  return (
    <section id="process" ref={sectionRef} className="process-section relative bg-light px-6 py-20 text-dark md:py-24" aria-labelledby="process-heading">
      <div className="mx-auto max-w-5xl">
        <h2 id="process-heading" className="mb-12 text-3xl font-bold tracking-tight md:text-center md:text-5xl">FROM IDEA TO IMPACT.</h2>
        <ol className="process-scenes">
          {scenes.map((scene, index) => (
            <li key={scene.number} data-scene={index} className="scene border-t border-dark/15 py-8">
              <span className="font-mono text-sm text-dark/65">STEP {scene.number} / 05</span>
              <h3 className="mb-3 mt-4 text-3xl font-bold tracking-tight md:text-5xl">{scene.title}</h3>
              <p className="max-w-xl text-base font-medium text-dark/80">{scene.subtitle}</p>
              <p className="mt-3 max-w-lg text-base leading-relaxed text-dark/65">{scene.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
